#!/usr/bin/python

#replace ingredients w pantry file

class Recipe:
    def __init__(self, name, ingredients_list):
        self.title = name 
        self.ingredients = ingredients_list


recipes = []

with open('recipes') as f:
    name_flag = False
    ingredient_flag = False
    name = ""
    ings = []
    for line in f:
        l = line.rstrip()
        if name_flag:
            name = l
            name_flag = False
        if ingredient_flag:
            ings.append(l)
        if l[:4] == "http":
            recipes.append(Recipe(name, ings))
            name = ""
            ings = []
            name_flag = True
        if l == 'ingredients':
            ingredient_flag = True
        if l == "":
            ingredient_flag = False


i = 0
while i != len(recipes):
    print(recipes[i].title)
    j = 0
    while j != len(recipes[i].ingredients):
        print(recipes[i].ingredients[j])
        j += 1
    i += 1
    

#return recipes

        
    