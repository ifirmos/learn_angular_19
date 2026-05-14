"""
Separate inline template/styles from Angular component .ts files into external .html/.scss files.
Usage: python scripts/separate-components.py
"""

import re
import os
import sys

ROOT = os.path.join(os.path.dirname(__file__), '..', 'src')

# --------------------------------------------------------------------- #
# Helpers                                                                #
# --------------------------------------------------------------------- #

def find_block_end(src: str, open_pos: int) -> int:
    """
    Given the position of an opening backtick (`) or quote in a template literal,
    find the matching closing backtick accounting for nested template expressions.
    Returns the index AFTER the closing backtick.
    """
    # Detect delimiter: backtick, single-quote, or double-quote
    delim = src[open_pos]
    i = open_pos + 1
    depth = 0  # depth of ${ } nesting inside template literals
    while i < len(src):
        ch = src[i]
        if delim == '`':
            if ch == '\\':
                i += 2
                continue
            if ch == '$' and src[i+1:i+2] == '{':
                depth += 1
                i += 2
                continue
            if ch == '}' and depth > 0:
                depth -= 1
                i += 1
                continue
            if ch == '`' and depth == 0:
                return i + 1
        else:
            if ch == '\\':
                i += 2
                continue
            if ch == delim:
                return i + 1
        i += 1
    return -1


def extract_decorator_property(src: str, prop: str):
    """
    Extract the value of a @Component property like template or styles.
    Returns (value_str, start_idx, end_idx) of the entire key: value expression,
    or None if not found.
    
    For `template`: returns the raw string content (without surrounding backtick/quote).
    For `styles`: returns the raw CSS string content inside the array.
    """
    # Match:  template:  or  styles:
    pattern = re.compile(
        r'(?<!\w)' + re.escape(prop) + r'\s*:\s*',
    )
    match = pattern.search(src)
    if not match:
        return None

    key_start = match.start()
    val_start = match.end()
    ch = src[val_start]

    if prop == 'template':
        if ch not in ('`', "'", '"'):
            return None
        val_end = find_block_end(src, val_start)
        raw_value = src[val_start + 1: val_end - 1]
        return raw_value, key_start, val_end

    if prop == 'styles':
        # styles: [`...`] or styles: ['...']
        if ch != '[':
            return None
        # find closing ]
        bracket_start = val_start
        i = val_start + 1
        depth = 1
        while i < len(src) and depth > 0:
            if src[i] == '[':
                depth += 1
            elif src[i] == ']':
                depth -= 1
            i += 1
        bracket_end = i
        inside = src[bracket_start + 1: bracket_end - 1].strip()
        # Extract first string literal inside the array
        if not inside:
            css_content = ''
        else:
            first_delim_pos = inside.index(inside[0] if inside[0] in ('`', "'", '"') else '`')
            css_end = find_block_end(inside, first_delim_pos)
            css_content = inside[first_delim_pos + 1: css_end - 1]
        return css_content, key_start, bracket_end

    return None


def write_if_new(path: str, content: str):
    """Write file only if it doesn't exist yet."""
    if os.path.exists(path):
        print(f'  SKIP (exists): {os.path.relpath(path, ROOT)}')
        return
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  CREATED: {os.path.relpath(path, ROOT)}')


# --------------------------------------------------------------------- #
# Main processing                                                        #
# --------------------------------------------------------------------- #

def process_file(ts_path: str):
    with open(ts_path, 'r', encoding='utf-8') as f:
        src = f.read()

    # Only process @Component files
    if '@Component' not in src:
        return

    # Skip if already uses templateUrl
    has_template_url = bool(re.search(r'templateUrl\s*:', src))
    # Check if there's inline template
    has_template = bool(re.search(r'(?<!\w)template\s*:', src))

    # Skip if already uses styleUrl(s)
    has_style_url = bool(re.search(r'styleUrl(s)?\s*:', src))
    has_styles = bool(re.search(r'(?<!\w)styles\s*:', src))

    if not has_template and not has_styles:
        return

    base = os.path.splitext(ts_path)[0]  # strip .ts
    html_path = base + '.html'
    scss_path = base + '.scss'
    ts_rel = os.path.relpath(ts_path, ROOT)

    print(f'\nProcessing: {ts_rel}')

    new_src = src

    # ---- template ----
    if has_template and not has_template_url:
        result = extract_decorator_property(new_src, 'template')
        if result:
            tmpl_content, t_start, t_end = result
            write_if_new(html_path, tmpl_content)
            html_rel = './' + os.path.basename(html_path)
            replacement = f"templateUrl: '{html_rel}'"
            new_src = new_src[:t_start] + replacement + new_src[t_end:]
        else:
            print(f'  WARNING: could not extract template from {ts_rel}')

    # ---- styles ----
    if has_styles and not has_style_url:
        result = extract_decorator_property(new_src, 'styles')
        if result:
            css_content, s_start, s_end = result
            if css_content.strip():
                write_if_new(scss_path, css_content)
                scss_rel = './' + os.path.basename(scss_path)
                replacement = f"styleUrl: '{scss_rel}'"
            else:
                # Empty styles array — just remove it
                # Remove trailing comma if any
                replacement = ''
                # Also eat a trailing comma + optional whitespace/newline
                tail = new_src[s_end:]
                tail_match = re.match(r'\s*,', tail)
                if tail_match:
                    s_end += tail_match.end()
                # Also eat a leading comma if replacement is empty
                prefix = new_src[:s_start]
                prefix_match = re.search(r',\s*$', prefix)
                if prefix_match:
                    s_start = prefix_match.start()
            new_src = new_src[:s_start] + replacement + new_src[s_end:]
        else:
            print(f'  WARNING: could not extract styles from {ts_rel}')

    if new_src != src:
        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(new_src)
        print(f'  UPDATED: {ts_rel}')


def main():
    for dirpath, _, filenames in os.walk(ROOT):
        for fname in filenames:
            if fname.endswith('.component.ts'):
                process_file(os.path.join(dirpath, fname))
    print('\nDone.')


if __name__ == '__main__':
    main()
