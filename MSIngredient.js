// --------------------------------------
// Laura Paglione (MENTOR)            
// NanoHacker Academy	
// Fall 2016: Object oriented
// November 23, 2016	
// Ingredient class         
// --------------------------------------

/* Initialize CloudBoost */
CB.CloudApp.init('fhioibnbvdrp', '4bb21293-3165-4d27-9b74-e173bf153fa8');

class MSIngredient {
	constructor(name, description, cloudObj) {
		this._cloudObj = cloudObj;
		this.image = "http://imgc.allpostersimages.com/images/P-473-488-90/75/7570/I9JD300Z/posters/marilyna-large-health-food-selection-in-white-porcelain-bowls-and-dishes-over-papyrus-background.jpg"
		this.purchaseUnits = "oz"; //the units used when purchasing this item, default=ounces
		this.storeLocation = ""; //the location within the store to find this item, default=undefined
		this.meals = []; //the list of meals that this ingredient is in, default=undefined

		//special getter/setter
		this.name = name; //name of the ingredient
		this.description = description; //description of the ingredient
	}

	// **************************************
	// Getters & setters - NAME
	// **************************************
	get name() {
		return this._cloudObj.get("name");
	}

	set name(name) {
		this._name = name;
		this._cloudObj.set("name", name);
		console.log("I'm setting the name!")
	}

	// **************************************
	// Getters & setters - DESCRIPTION
	// **************************************
	get description() {
		return this._cloudObj.get("description");
	}

	set description(description) {
		this._description = description;
		this._cloudObj.set("description", description);
	}

	// **************************************
	// CLOUDBOOST - save & delete object
	// **************************************
	save() {
		this._cloudObj.save({
			succes: (obj) => {},
			error: (err) => {
				console.log(err);
			}
		});
	}

	delete() {
		this._cloudObj.delete({
			success: (obj) => {},
			error: (err) => {
				console.log(err);
				$(".error").html(err);
			}
		});
	}

	// **************************************
	// Other object functions
	// **************************************
	inPurchaseUnits(amount, units) {
		//converts the amount to the equivalent amount in the purchase units for the ingredient
	}

/*	entryForm(formDomID) {
    	<div class="form-group">
        	<input type="text" placeholder="Ingredient name" class="form-control" id="ingName">
     	</div>
      	<div class="form-group">
        	<input type="text" placeholder="Ingredient description" class="form-control" id="ingDesc">
      	</div>
      	<button type="submit" class="btn btn-primary" onclick="myApp.addIngredient('input#ingName', 'input#ingDesc')">Add ingredient</button>
      	<!--<button type="submit" class="btn btn-primary" onclick="myApp.addIngredient('Salt', 'a spice')">Add ingredient</button>-->
      	
      	return this;
	}*/
}

// export { MSIngredient };