#!/usr/bin/env python3
import glob
import re

files = glob.glob("/home/tronix/julianous/*.html")

link_to_add = '<a href="latin.html">Déclinaisons & Mozart</a> |'

for filepath in files:
    if filepath.endswith("latin.html"):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'href="latin.html"' in content:
        continue
    
    # Insert before livre-dor.html link
    if '<a href="livre-dor.html"' in content:
        # Check if inside nav-menu
        def replacer(match):
            prefix = match.group(1)
            full_match = match.group(0)
            # Match existing link style if any
            style_m = re.search(r'style="([^"]*)"', full_match)
            style_str = f' style="{style_m.group(1)}"' if style_m else ''
            new_link = f'<a href="latin.html"{style_str}>Déclinaisons & Mozart</a> | \n        '
            return new_link + full_match
            
        pattern = r'(<a href="livre-dor\.html"[^>]*>Livre d\'or</a>)'
        new_content = re.sub(pattern, replacer, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated nav in {filepath}")

print("Navigation update complete.")
