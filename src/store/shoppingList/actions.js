import axios from "axios";
import { appDoneLoading, appLoading } from "../appState/actions";
import { selectToken, selectUser } from "../user/selectors";

const URL = "http://localhost:4000";

export const getListsFetched = (lists) => {
  return {
    type: "SHOPPINGLIST/lists",
    payload: lists,
  };
};

export const getLists = async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/lists`);  
    dispatch(getListsFetched(response.data));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const getListDetailsFetched = (listDetails) => {
  return {
    type: "SHOPPINGLIST/details",
    payload: listDetails,
  };
};

export const getListDetails = (id) => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/list/${id}`);
    console.log("details", response.data)
    dispatch(getListDetailsFetched(response.data));
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
    const listResponse = await axios.get(
      `${URL}/shoppinglists/product/${id}`
    );
    
    dispatch(updateQuantityFetched(listResponse.data));

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
    dispatch(getCategoriesFetched(response.data));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const createShoppingListFetched = (shoppingList) => {
  return {
    type: "SHOPPINGLIST/create",
    payload: shoppingList,
  };
};

export const createShoppingList =
  (myShoppingList) => async (dispatch, getState) => {
    dispatch(appLoading);
    const token = selectToken(getState());
    const userId = selectUser(getState()).id;
    console.log("shoppingList",myShoppingList)
    try {
      const response = await axios.post(
        `${URL}/shoppinglist/${userId}`,
        {
          myShoppingList,          
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("categories", response.data);
      // dispatch(getCategoriesFetched(response.data));
      // dispatch(appDoneLoading);
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
