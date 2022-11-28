#!/usr/bin/python

def add_new_recipe(name, ingredients):
    # firebase

def input_into_firebase(recipes_txt):
    with open(recipes_txt) as file:
        recipe = False
        ingredients = False
        name = ""
        ingredients_list = set()
        for line in file.readlines():
            if line[:4] == "https":
                recipe = True
                continue
            if recipe:
                name = line.strip()
                recipe = False
                continue
            if line[:10] == "ingredients":
                ingredients = True
                continue
            if line = '\n':
                ingredients = False
            if ingredients:
                ingredients_list.append(line.strip())
        add_new_recipe(name, ingredients)
    return
