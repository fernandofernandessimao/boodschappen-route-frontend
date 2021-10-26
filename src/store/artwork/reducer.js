const initialState = {
  artworks: [],
  artworkDetails: {},
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
    default:
      return state;
  }
};
