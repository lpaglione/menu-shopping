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
		this.appIngredients = [];
		//this.tableIngredients = tableIngredients;
	}

	initIngredientsPage(tableIngredients) {
		this.listIngredients(tableIngredients);
	}

	addIngredient(name, description) {
		console.log("In add ingredient function");
		console.log($(name).val());

		// Create a new incredient object and save it to the database

		const ingredientCloudObj = new CB.CloudObject("MSIngredient");
		const ingredientObj = new MSIngredient($(name).val(), $(description).val(), ingredientCloudObj);
		ingredientObj.save();

		// Add it to the active appIngredents list
		this.appIngredients.push(ingredientObj);

		//this.appIngredients.push(new MSIngredient($(name).val(), $(description).val()));
		console.log(this.appIngredients);
	}

	listIngredients(tableIngredients) { 
		console.log("in the list");
		//clear the table and replace the headers
		$(tableIngredients+" tbody").remove();
		$(tableIngredients).append(`<tr><th>Name</th><th>Description</th></tr>`)

		for (let z=0; z<this.appIngredients.length; z++) {
			console.log(this.appIngredients[z].name);
			$(tableIngredients).append(`<tr><td>${this.appIngredients[z].name}</td><td>${this.appIngredients[z].description}</td></tr>`)
		}

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
