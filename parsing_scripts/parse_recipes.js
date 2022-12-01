const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
  
    //console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
  
    return arr;
  }

class Recipe {
    constructor(name, ingredients, preparation, url) {
        this.name = name;
        this.ingredients = ingredients; 
        this.preparation = preparation;
        this.url = url;
    }
}




var recipes = [];

var a = syncReadFile('current_recipes');
var i = 0;
var name_flag = false;
var ingredient_flag = false;
var prep_flag = false;
var prep = "";
var name = "";
var ings = []
var url = "";
while (i != a.length) {
    line = a[i];
    if(line == ""){
        ingredient_flag = false;
    }
    if (line[0] == "h" && 
        line[1] == "t" &&
        line[2] == "t" &&
        line[3] == "p") {
        prep_flag = false;
    }
    if (name_flag){
        name = line;
        name_flag = false;
    }
    if (ingredient_flag) {
        ings.push(line)
    }
    if(prep_flag){
        prep += line;
        prep += '\n';
    }
    if (line[0] == "h" && 
        line[1] == "t" &&
        line[2] == "t" &&
        line[3] == "p") {
        recipes.push(new Recipe(name, ings, prep, url))
        url = line;
        name = "";
        ings = [];
        prep = "";
        name_flag = true;
    }
    if(line == 'ingredients'){
        ingredient_flag = true;
    }
    if (line == "preparation"){
        prep_flag = true;
    }
    i += 1;
}
recipes.push(new Recipe(name, ings, prep))


function searchRecipe(ingredient, recipe) {
    const lower_recipe = recipe.toLowerCase();
    var result = lower_recipe.includes(ingredient);
    return result;
}


function search_matches(pantry) {
    var matches = []
    var i = 0;
    while(i != recipes.length){
        var j = 0;
        var count = 0;
        while(j != pantry.length){
            var k = 0;
            while(k != recipes[i].ingredients.length){
                var flag = searchRecipe(pantry[j], recipes[i].ingredients[k])
                if(flag){
                    count += 1;
                }
                k += 1;
            }
            j += 1;
        }
        matches.push(count);
        i += 1;
    }
    return matches
}

function find_min(values, index) {
    var min = 0
    var i = 1
    while (i != index.length){
        if(values[index[i]] < values[index[min]]){
            min = i;
        }
        i += 1;
    }
    return min;
}

function top_five(arr) {
    if(arr.length < 5){
        return;
    }
    var index = [0, 1, 2, 3, 4];
    var i = 5;
    while (i != arr.length){
        min = find_min(arr, index);
        if(arr[i] > arr[index[min]]) {
            index[min] = i;
        }
        i += 1;
    }

    return index;
}

function parse_recipes(pantry){
    matches = search_matches(pantry);
    top = top_five(matches);
    var i = 0;
    final = []
    while(i != top.length){
        final.push(recipes[top[i]]);
        i += 1;
    }
    return final;
}


const pantry = ["egg", "vanilla", "pumpkin"]

final = parse_recipes(pantry);


var i = 0;
while(i != final.length){
    console.log(final[i].url);
    console.log(final[i].name);
    var j = 0;
    while(j != final[i].ingredients.length){
        console.log(final[i].ingredients[j]);
        j += 1;
    }
    console.log(final[i].preparation);
    i += 1;
}
