#Menu Shopping List app

_This application was created to learn Javascript classes and bootstrap in preparation for mentoring for [Nano Hacker Academy](https://www.nanohackers.org/)._

The MenuShopping application allows users to develop shopping lists based on the needed ingredients based on the menus they expect to prepare for the week. The  app allows the user to store the ingredient lists for meals, add the meals to weekly menus and then view needed ingredients to prepare the week's meals. The user may select which ingredients are not in his/her pantry, thereby adding it to the weekly shopping list. The list is then presented by location in the selected grocery store, helping the user to shop efficiently, and check off things once added to a physical shopping cart. (future enhancement? use a fresh direct API to order the items?)

##CLASSES:

* [MenuShopping](menu-shopping.js) - Application class
* Menu - A class representing a (multi-week) menu of meals
* Meal - a meal containing several ingredients
* [Ingredient](MSIngredient.js) - individual ingredient used in one or more meals, and available in one or more stores
* Store - grocery store that sell ingredients
* StoreAisle - location in the store where an ingredient is located
* Preferences - the currently preferred menu and store

