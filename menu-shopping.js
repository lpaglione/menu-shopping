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
		//this.fetchIngredients(function() {console.log("in the callback");});
		//let listTemp = [];
		//this.getAllDBIngredients(listTemp, this.setIngredients, this);
		//this.appIngredients = this.getAllDBIngredients(); // In cache list of ingredients
		console.log("appIngredients in constructor: " + this.appIngredients)
	}

	initIngredientsPage(tableIDIngredients) {
		//**************************
		// would like to initialize the appIngredients array with info from Cloud boost
		// and then list the ingredients in appIngredients using the listIngredients()
		// function BUT, can't get the info to load before displaying...

		//let ingredientCloudObj = new CB.CloudObject("MSIngredient");
		//let ingredientObj = new MSIngredient("blah", "super blah", ingredientCloudObj);
		//this.appIngredients.push(ingredientObj);
		this.listIngredients(tableIDIngredients);
	}

	addIngredient(name, description) {
		console.log("In add ingredient function");
		console.log(name);

		//**********************************************************
		// Code without checking first if the ingredient exists
		//**********************************************************
		// NOTE: was working - now always returns an error because the object is undefined
		// by the time it gets to incredientObj.save() UGH!
		let ingredientCloudObj = new CB.CloudObject("MSIngredient");
		let ingredientObj = new MSIngredient(name, description, ingredientCloudObj);
		ingredientObj.save();

		// Add it to the active appIngredients list
		this.appIngredients.push(ingredientObj);

		console.log(this.appIngredients);

		//**********************************************************
		// Add it to the active appIngredients list
		//**********************************************************
		/*this.appIngredients.push(ingredientObj);

		console.log(this.appIngredients);

		// Check if the ingredient already exists
		let query = new CB.CloudQuery("MSIngredient");
		query.equalTo('name', name); //is the name already in the database?
		query.find({
			success: function(list) {
				alert(name+" already exists in the Available ingredients list.");
			},
			error: function(err) {
				//item doesn't already exist. Add it!
				console.log("item doesn't already exist. Add it!")

				// Create a new ingredient object and save it to the database
				let ingredientCloudObj = new CB.CloudObject("MSIngredient");
				let ingredientObj = new MSIngredient(name, description, ingredientCloudObj);
				ingredientObj.save();

				// Add it to the active appIngredients list
				this.appIngredients.push(ingredientObj);

				console.log(this.appIngredients);
			}
		});*/
	}

	displayList(tableIDIngredients) {
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

	listIngredients(tableIDIngredients) { 
		console.log(this.appIngredients);

		// see if the list of ingredients is already in the MenuShopping object
		if (this.appIngredients.length == 0) {
			console.log("nothing to list")
			/* 
			// ORIGINAL CODE - worked okay until I needed this to finish before continuing
			// Moved into a separate function getAllDBIngredients()

			console.log("calling the getAllDBIngredients function")

			// would promises help me?
			var myPromise = new Promise(
				function(resolve, reject) {
					console.log("In-cache list is empty - loading from DB")
					let ingredientList = [];

					let query = new CB.CloudQuery("MSIngredient");
					query.exists('name');
					query.find(deferred.resolve, {
						success: function(list) {
							// iterate through the list to add the items from the database to the object
							console.log("getting items from the database - " + list.length + " items available")
							for (let z=0; z<list.length; z++) {
								let ingredientObj = new MSIngredient(list[z].get('name'), list[z].get('description'), list[z]);
								ingredientList.push(ingredientObj);
							}

							console.log(ingredientList);
							resolve();
							//return ingredientList;
						},
						error: function(err) {
							console.log(err);
							resolve();
						}
					});

				})

			myPromise.then(displayList());

			//this.getAllDBIngredients().then(displayList());

			let tempList = this.getAllDBIngredients(deferred.resolve);
			tempList.done(function(){
				this.appIngredients = tempList;
				this.displayList(tableIDIngredients);
			});*/
		} else {
			this.displayList(tableIDIngredients);
		}
	}

	fetchIngredients() {
		let deferred = $.Deferred();
		this.getAllDBIngredients(deferred.resolve, this.setIngredients, this);
		console.log("fetched ")
		return deferred.promise();
	}

	setIngredients(list) {
		console.log(list)
		this.appIngredients = list;
		console.log("in setIngredients. The appIngredients list is " + this.appIngredients)
		this.listIngredients("table#itemList")
	}

	getAllDBIngredients(ingredientList, callback, callbackObj) {
		console.log("In-cache list is empty - loading from DB")
		//let ingredientList = [];

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

					console.log("from the DB " +ingredientList)
					//callbackObj.appIngredients = ingredientList;
					//console.log(callbackObj.appIngredients)
					//callbackObj.displayList.apply(callbackObj, "table#itemList");
					callback.apply(callbackObj,ingredientList);
					//callback.apply(callbackObj, ingredientList);
				//console.log("the ingredent list from the DB is " + ingredientList)
				//return ingredientList;
			},
			error: function(err) {
				console.log(err);
			}
		})

		//callback.apply(callbackObj, ingredientList);
		//console.log("final list in DB set is " +ingredientList)
		//callback.apply(callbackObj, ingredientList);
		//this.appIngredients = ingredientList;
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
