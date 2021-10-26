const initialState = {
  artworks: [],
  artworkDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ARTWORK/list": {
      return {
        ...state,
        artworks: [...action.payload],
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
