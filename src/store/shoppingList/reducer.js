const initialState = {
  shoppingLists: [],
  artworkDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOPPINGLIST/list": {
      return {
        ...state,
        shoppingLists: [...action.payload],
      };
    }
    case "ARTWORK/details": {
      return {
        ...state,
        artworkDetails: action.payload,
      };
    }
    case "ARTWORK/hearts": {
      return {
        ...state,
        artworkDetails: {
          ...state.artworkDetails,
          hearts: action.payload,
        },
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
