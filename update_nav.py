import glob
import os
import re

files = glob.glob("/home/tronix/julianous/*.html")

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # We will use regex to find the Livre d'or link and inject the Auditions link right before it, preserving styles
    # <a href="livre-dor.html" ...>Livre d'or</a>
    
    pattern = r'(<a href="livre-dor\.html"[^>]*>Livre d\'or</a>)'
    
    # Check if 'Auditions' is already there
    if 'href="auditions.html"' not in content:
        # For standard links
        if 'style=' not in content:
            # We just do a simple replacement if we find the exact block but regex is safer
            pass
            
        def replacer(match):
            original = match.group(1)
            style_match = re.search(r'style="([^"]*)"', original)
            style_str = f' style="{style_match.group(1)}"' if style_match else ''
            
            return f'<a href="auditions.html"{style_str}>Auditions</a> | \n        {original}'
            
        new_content = re.sub(pattern, replacer, content)
        
        if new_content != content:
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Updated nav in {f}")
