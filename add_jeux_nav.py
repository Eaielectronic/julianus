#!/usr/bin/env python3
import glob
import re

files = glob.glob("/home/tronix/julianous/*.html")

for filepath in files:
    if filepath.endswith("jeux.html"):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'href="jeux.html"' in content:
        continue
    
    # Insert before livre-dor.html link
    if '<a href="livre-dor.html"' in content:
        def replacer(match):
            full_match = match.group(0)
            style_m = re.search(r'style="([^"]*)"', full_match)
            style_str = f' style="{style_m.group(1)}"' if style_m else ''
            new_link = f'<a href="jeux.html"{style_str}>Le Clavecin</a> | \n        '
            return new_link + full_match
            
        pattern = r'(<a href="livre-dor\.html"[^>]*>Livre d\'or</a>)'
        new_content = re.sub(pattern, replacer, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated nav in {filepath}")

print("Nav update for jeux.html complete.")
