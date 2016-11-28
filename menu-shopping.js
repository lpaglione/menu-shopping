// --------------------------------------
// Laura Paglione (MENTOR)            
// NanoHacker Academy	
// Fall 2016: Object oriented
// November 23, 2016	
// MenuShopping application                  
// --------------------------------------

//import * as ingredient from 'MSIngredient';

/* Initialize CloudBoost */
CB.CloudApp.init('fhioibnbvdrp', '4bb21293-3165-4d27-9b74-e173bf153fa8');

class MenuShopping {
	constructor() {
		this.appIngredients = []
		this.getAllDBIngredients();
	}

	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// FUNCTION: addIngredient
	// Adds a single ingredient to the appIngredient list, the 
	// database, and to the display on the ingredient list page
	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	addIngredient(name, description, image) {
		// Check if the ingredient already exists
		let query = new CB.CloudQuery("MSIngredient");
		query.equalTo('name', name); //is the name already in the database?
		query.find({
			success: (list) => {
				if (list.length > 0) {
					// The item is already in the list - alert the user
					alert(name+" already exists in the Available ingredients list.");
					// TO DO: Make this a Boostrap alert
				} else {
					//item doesn't already exist. Add it!
					// Create a new ingredient object and save it to the database
					let ingredientCloudObj = new CB.CloudObject("MSIngredient");
					let ingredientObj = new MSIngredient(name, description, image, ingredientCloudObj);
					ingredientObj.save();

					// Add it to the active appIngredients list
					this.appIngredients.push(ingredientObj);

					console.log(this.appIngredients);

					// Add the item to the already-displayed list
					ingredientObj.ingredientDisplayAsMedia("#ingredientList");
				}
				
			},
			error: (err) => {
				console.log(err);
			}
		});
	}

	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// FUNCTION: removeIngredient
	// Removes a single ingredient from the appIngredient list, the 
	// database, and the display on the ingredient list page
	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// TO DO: add this function

	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// FUNCTION: editIngredient
	// Edit an ingredient on the appIngredient list, the 
	// database, and the display on the ingredient list page
	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// TO DO: add this function

	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// FUNCTION: displayList
	// Displays all of the ingredients in the list as Bootstrap
	// media objects to location identified by ID #ingredientList
	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	displayList() {
		// Now display the ingredient list in the table with the ID #ingredientList
		// clear the list
		$("#ingredientList").html("");

		// and list the ingredients as Bootstrap mediea as defined by the MSIngredients object
		for (let z=0; z<this.appIngredients.length; z++) {
			this.appIngredients[z].ingredientDisplayAsMedia("#ingredientList")
		}
	}

	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// FUNCTION: getAllDBIngredients
	// Gets all of the ingredients stored in the database and stores
	// them in this application object
	// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	getAllDBIngredients() {
		const query = new CB.CloudQuery("MSIngredient");
		query.exists('name');
		query.find({
			success: (list) => {
				// iterate through the list to add the items from the database to the object
				this.appIngredients = list.map((obj) => {
					return new MSIngredient(obj.get("name"), obj.get("description"), obj.get("image"), obj)
				});
				this.displayList("#ingredientList");
			},
			error: function(err) {
				console.log(err);
			}
		})
	}
}