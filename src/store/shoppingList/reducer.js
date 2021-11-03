const initialState = {
  shoppingLists: [],
  shoppingListDetails: [],
  products: [],
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOPPINGLIST/list": {
      return {
        ...state,
        shoppingLists: [...action.payload],
      };
    }
    case "SHOPPINGLIST/details": {
      return {
        ...state,
        shoppingListDetails: [...action.payload],
      };
    }

    case "SHOPPINGLIST/quantity": {
      return {
        ...state,
        shoppingListDetails: [...state.shoppingListDetails, ...action.payload],
      };
    }

    case "SHOPPINGLIST/products": {
      return {
        ...state,
        products: [...action.payload],
      };
    }

    case "SHOPPINGLIST/categories": {
      return {
        ...state,
        categories: [...action.payload],
      };
    }

    case "ARTWORK/newBid": {
      console.log("payload", action.payload);
      return {
        ...state,
        artworkDetails: {
          ...state.artworkDetails,
          bids: [...state.artworkDetails.bids, action.payload],
        },
      };
    }
    default:
      return state;
  }
};