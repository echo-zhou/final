import glob
import json

# big thanks to Elisabeth, helps me organize the json

def cat_json(output_filename, input_filenames):
    with open(output_filename, "w") as outfile:
        first = True
        for infile_name in input_filenames:
            with open(infile_name) as infile:
                if first:
                    outfile.write('[')
                    first = False
                else:
                    outfile.write(',')
                outfile.write(infile.read())
        outfile.write(']')

cat_json('merged_theaters.json', ['formatted-ch.json', 'formatted-durham.json', 'formatted-raleigh.json'])
