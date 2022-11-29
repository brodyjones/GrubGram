#!/usr/bin/python

import pyrebase

firebaseConfig = {
    "apiKey": "AIzaSyDgw2Pva8wCPCHHSDa6CUqmCjUsZ3JkzOk",
    "authDomain": "grubgram-2bccc.firebaseapp.com",
    "projectId": "grubgram-2bccc",
    "databaseURL":"https://grubgram-2bccc-default-rtdb.firebaseio.com/",
    "storageBucket": "grubgram-2bccc.appspot.com",
    "messagingSenderId": "12941980945",
    "appId": "1:12941980945:web:6be4c61e23fe9dd57948b0",
    "measurementId": "G-TJY8Z1B1VJ"
  };

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

def add_new_recipe(name, ingredients):
    data = {"name": name, "ingredients": ingredients}
    db.push(data)


def input_into_firebase(recipes_txt):
    with open(recipes_txt) as file:
        recipe = False
        ingredients = False
        add_new = False
        name = ""
        ingredients_list = set()
        for line in file:
            if line[:5] == "https":
                add_new = True
                recipe = True
                continue
            if recipe:
                name = line.strip()
                recipe = False
                continue
            if line[:11] == "ingredients":
                ingredients = True
                continue
            if line == "\n":
                if add_new:
                    add_new_recipe(name, ingredients_list)
                    name = ""
                    ingredients_list = set()
                    add_new = False
                    ingredients = False
                    continue
            if ingredients:
                ingredients_list.add(line.strip())
    return


if __name__ == '__main__':
    recipes_txt = '.\recipes'
    input_into_firebase(recipes_txt)
