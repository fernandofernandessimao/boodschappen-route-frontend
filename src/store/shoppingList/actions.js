import axios from "axios";
import { appDoneLoading, appLoading } from "../appState/actions";
import { selectToken } from "../user/selectors";

const URL = "http://localhost:4000";

export const shoppingListsFetched = (artworks) => {
  return {
    type: "SHOPPINGLIST/list",
    payload: artworks,
  };
};

export const getShoppingLists = async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/lists`);
    console.log(response.data);
    dispatch(shoppingListsFetched(response.data));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const shoppingListDetailsFetched = (shoppingList) => {
  return {
    type: "SHOPPINGLIST/details",
    payload: shoppingList,
  };
};

export const getShoppingListDetails = (id) => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/shoppinglists/${id}`);
    dispatch(shoppingListDetailsFetched(response.data));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const updateQuantityFetched = (quantity) => {
  return {
    type: "SHOPPINGLIST/quantity",
    payload: quantity,
  };
};

export const updateQuantity = (id, quantity) => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.patch(
      `${URL}/shoppinglists/product/${id}/${quantity}`
    );
    console.log("resposta", response.data);
    dispatch(updateQuantityFetched(response.data));

    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const getProductsFetched = (products) => {
  return {
    type: "SHOPPINGLIST/products",
    payload: products,
  };
};

export const getProducts = () => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/products`);
   // console.log("products", response.data);
    dispatch(getProductsFetched(response.data));

    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const getCategoriesFetched = (categories) => {
  return {
    type: "SHOPPINGLIST/categories",
    payload: categories,
  };
};

export const getCategories = () => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/categories`);
   // console.log("categories", response.data);
    dispatch(getCategoriesFetched(response.data));

    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};



// export const createBidFetched = (bid) => {
//   return {
//     type: "ARTWORK/newBid",
//     payload: bid,
//   };
// };

// export const createBid = (email, amount, artworkId) => {
//   return async (dispatch, getState) => {
//     dispatch(appLoading());
//     try {
//       // const response = await axios.post(`${URL}/artworks/${artworkId}/bid`, {
//       //   email,
//       //   amount,
//       //   artworkId
//       // });
//       const token = selectToken(getState());
//       const response = await axios.post(
//         `${URL}/artworks/${artworkId}/bid`,
//         { email, amount, artworkId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       dispatch(createBidFetched(response.data));
//       dispatch(appDoneLoading());
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// };
