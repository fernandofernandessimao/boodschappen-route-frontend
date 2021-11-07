const initialState = {
  lists: [],
  listDetails: [],
  products: [],
  categories: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOPPINGLIST/lists": {
      return {
        ...state,
        lists: [...action.payload],
      };
    }
    case "SHOPPINGLIST/details": {
      return {
        ...state,
        listDetails: [...action.payload],
      };
    }

    case "SHOPPINGLIST/quantity": {
      return {
        ...state,
        listDetails: state.listDetails.map((p) => {
          if (p.id === action.payload.id) {
            return { ...p, quantity: action.payload.quantity };
          }
          return p;
        }),
      };
    }
    case "SHOPPINGLIST/increaseQuantity": {
      return {
        ...state,
        listDetails: state.listDetails.map((p) => {
          if (p.id === action.payload.id) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        }),
      };
    }

    case "SHOPPINGLIST/decreaseQuantity": {
      const findProduct = state.listDetails.find(
        (p) => p.id === action.payload.id
      );
      const updateQuantity = {
        ...findProduct,
        quantity: findProduct.quantity - 1,
      };
      if (updateQuantity.quantity <= 0) {
        return {
          ...state,
          listDetails: state.listDetails.filter((p) => {
            return p.id !== action.payload.id;
          }),
        };
      } else {
        return {
          ...state,
          listDetails: state.listDetails.map((p) => {
            if (p.id === action.payload.id) {
              return { ...p, quantity: updateQuantity.quantity };
            }
            return p;
          }),
        };
      }
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
export default reducer;
