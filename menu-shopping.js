// --------------------------------------
// Laura Paglione (MENTOR)            
// NanoHacker Academy	
// Fall 2016: Object oriented
// November 23, 2016	
// MenuShopping application                  
// --------------------------------------

//import * as ingredient from 'MSIngredient';

class MenuShopping {
	constructor(tableIngredients) {
		this.appIngredients = [];
		this.tableIngredients = tableIngredients; // the table ID for ingredients
	}

	addIngredient(name, description) {
		console.log("In add ingredient function");
		console.log($(name).val());
		this.appIngredients.push(new MSIngredient($(name).val(), $(description).val()));
		console.log(this.appIngredients);
		this.listIngredients();
	}

	listIngredients() { 
		console.log("in the list");
		//clear the table and replace the headers
		$(this.tableIngredients+" tbody").remove();
		$(this.tableIngredients).append(`<tr><th>Name</th><th>Description</th></tr>`)

		for (let z=0; z<this.appIngredients.length; z++) {
			console.log(this.appIngredients[z].name);
			$(this.tableIngredients).append(`<tr><td>${this.appIngredients[z].name}</td><td>${this.appIngredients[z].description}</td></tr>`)
		}

	}
}
