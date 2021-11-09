export function selectLists(reduxState) {
  return reduxState.shoppingList.lists;
}

export function selectListDetails(reduxState) {
  return reduxState.shoppingList.listDetails;
}

export function selectProducts(reduxState) {
  return reduxState.shoppingList.products;
}

export function selectCategories(reduxState) {
  return reduxState.shoppingList.categories;
}

export function selectChosenList(reduxState) {
  return reduxState.shoppingList.chosenList;
}

export function selectSupermarketCategories(reduxState) {
  return reduxState.shoppingList.supermarketCategories;
}
