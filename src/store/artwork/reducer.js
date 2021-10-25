const initialState = {
  artworks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ARTWORK/list": {
      return {
        ...state,
        artworks: [...action.payload],
      };
    }
    default:
      return state;
  }
};
