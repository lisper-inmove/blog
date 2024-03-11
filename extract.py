import os
import sys
import base64
import re
import json

home = os.environ["HOME"]
posts_directory = os.environ.get("POSTS_DIRECTORY")
metadata_directory = f"./posts"
if posts_directory:
    directory_path = posts_directory
else:
    directory_path = f'./posts'
if (not os.path.exists(directory_path)):
    print(f"{directory_path} not exists")
    sys.exit(-1)
metadata = []

pattern = re.compile(r'^#\+(TITLE|CATEGORIES|DATE|KEYWORDS|DIFFICULTY|SUBTITLE|DISPLAY|TRANSSHIP): (.+)$')

for foldername, subfolders, filenames in os.walk(directory_path):
    for filename in filenames:
        if not filename.endswith("org"):
            continue
        if filename.startswith(".#"):
            continue
        file_path = os.path.join(foldername, filename)
        encoded_string = base64.b64encode(file_path.encode()).decode().rstrip('=')
        file_metadata = {
            'path': file_path,
            'id': encoded_string,
            'title': '',
            'categories': '',
            'date': '',
            'keywords': '',
            'difficulty': '',
            'subtitle': '',
            'display': '',
            'transship': '',
        }

        with open(file_path, 'r') as file:
            while True:
                line = file.readline()
                if not line.startswith('#+'):
                    break
                match = pattern.match(line)
                if match:
                    key = match.group(1)
                    value = match.group(2).strip()
                    file_metadata[key.lower()] = value

        title = file_metadata.get("title")
        t = title.split(".")[0]
        sort = 9999
        if t.isdigit():
            sort = int(t)
        file_metadata.update({"sort": sort})
        metadata.append(file_metadata)

metadata.sort(key=lambda x: (x.get("categories"), x.get("sort")))

with open(f'{metadata_directory}/metadata.json', 'w') as json_file:
    json.dump(metadata, json_file, indent=4, ensure_ascii=False)

print('Metadata has been saved to metadata.json')
