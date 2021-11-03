export function selectShoppingLists(reduxState) {
  return reduxState.shoppingList.shoppingLists;
}

export function selectShoppingListDetails(reduxState) {
  return reduxState.shoppingList.shoppingListDetails;
}

export function selectProducts(reduxState) {
  return reduxState.shoppingList.products;
}

export function selectCategories(reduxState) {
  return reduxState.shoppingList.categories;
}