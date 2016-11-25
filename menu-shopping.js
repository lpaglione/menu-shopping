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
		this.appIngredients = []; // In cache list of ingredients
	}

	initIngredientsPage(tableIDIngredients) {
		this.listIngredients(tableIDIngredients);
	}

	addIngredient(name, description) {
		console.log("In add ingredient function");
		console.log(name);

		// Check if the ingredient already exists
		let query = new CB.CloudQuery("MSIngredient");
		query.equalTo('name', name); //is the name already in the database?
		query.find({
			success: function(list) {
				alert(name+" already exists in the Available ingredients list.");
			},
			error: function(err) {
				//item doesn't already exist. Add it!

				// Create a new ingredient object and save it to the database
				let ingredientCloudObj = new CB.CloudObject("MSIngredient");
				let ingredientObj = new MSIngredient(name, description, ingredientCloudObj);
				ingredientObj.save();

				// Add it to the active appIngredents list
				this.appIngredients.push(ingredientObj);

				console.log(this.appIngredients);
			}
		});
	}

	listIngredients(tableIDIngredients) { 
		console.log(this.appIngredients);

		// see if the list of ingredients is already in the MenuShopping object
		if (this.appIngredients.length == 0) {
			console.log("calling the getAllDBIngredients function")
			this.appIngredients = this.getAllDBIngredients();
		}

		// Now display the ingredient list in the table with the ID tableIDIngredients
		console.log("in the list");
		//clear the table and replace the headers
		$(tableIDIngredients+" tbody").remove();
		$(tableIDIngredients).append(`<tr><th>Name</th><th>Description</th></tr>`);

		console.log(this.appIngredients);

		for (let z=0; z<this.appIngredients.length; z++) {
			console.log("Name: " + this.appIngredients[z].name + " Description: " + this.appIngredients[z].description);
			$(tableIDIngredients).append(`<tr><td>${this.appIngredients[z]._name}</td><td>${this.appIngredients[z]._description}</td></tr>`);
		}

	}

	getAllDBIngredients() {
		console.log("In-cache list is empty - loading from DB")
		let ingredientList = [];

		let query = new CB.CloudQuery("MSIngredient");
		query.exists('name');
		query.find({
			success: function(list) {
				// iterate through the list to add the items from the database to the object
				console.log("getting items from the database - " + list.length + " items available")
				for (let z=0; z<list.length; z++) {
					let ingredientObj = new MSIngredient(list[z].get('name'), list[z].get('description'), list[z]);
					ingredientList.push(ingredientObj);
				}

				console.log(ingredientList)
				return ingredientList;
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
}

/* COOKIES! */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

/*function checkCookie() {
    var username=getCookie("username");
    if (username!="") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}*/
