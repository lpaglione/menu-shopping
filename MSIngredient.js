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
  constructor(name, description, image, cloudObj) {
    // TO DO: refactor functions so that all attributes are set via the cloudObj to remove redundancy
    this._cloudObj = cloudObj;
    this.purchaseUnits = "oz"; //the units used when purchasing this item, default=ounces
    this.storeLocation = ""; //the location within the store to find this item, default=undefined
    this.meals = []; //the list of meals that this ingredient is in, default=undefined

    //special getter/setter
    this.name = name; //name of the ingredient
    this.description = description; //description of the ingredient
    this.image = image; // the image for the ingredient
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
  // Getters & setters - IMAGE
  // **************************************
  get image() {
    return this._cloudObj.get("image");
  }

  set image(image) {
    const defaultImage = "http://imgc.allpostersimages.com/images/P-473-488-90/75/7570/I9JD300Z/posters/marilyna-large-health-food-selection-in-white-porcelain-bowls-and-dishes-over-papyrus-background.jpg"

    if(image =="") image = defaultImage; //set to the default image if blank

    this._image = image;
    this._cloudObj.set("image", image);
  }

  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  // FUNCTION: ingredientDisplayAsMedia
  // Append to the HTML at the location passed to display the 
  // ingredient as a bootstrap media object
  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  ingredientDisplayAsMedia(locationID){
    $(locationID).append(`<div class='media'><div class='media-left media-top'><a href='#' data-toggle="tooltip" title="View ingredient"><div style='width: 64px'><img class='media-object img-rounded center-block' src=${this.image} alt='image' style='max-width: 64px; max-height: 64px;'></div></a></div><div class='media-body'><h4 class='media-heading'>${this.name}</h4><button type='button' class='btn btn-default btn-sm pull-right' data-toggle='tooltip' title='Edit this ingredient'><span class='glyphicon glyphicon glyphicon-edit' aria-hidden='true'></span> Edit</button><p>${this.description}<br/></p><hr/></div></div>`)
  }

  // **************************************
  // CLOUDBOOST - save & delete object
  // **************************************
  save() {
    this._cloudObj.save({
      success: (obj) => {
        console.log("saved ingredient: " + this._cloudObj.get("name"))
      },
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
}

// export { MSIngredient };