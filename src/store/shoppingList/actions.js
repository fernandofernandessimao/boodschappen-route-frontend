import axios from "axios";
import {
  appDoneLoading,
  appLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import { selectToken, selectUser } from "../user/selectors";

const URL = "https://shoppinglist-route.herokuapp.com";

export const setChosenList = (list) => {
  return {
    type: "SHOPPINGLIST/chosenList",
    payload: list,
  };
};

export const getListsFetched = (lists) => {
  return {
    type: "SHOPPINGLIST/lists",
    payload: lists,
  };
};

export const getLists = async (dispatch, getState) => {
  dispatch(appLoading);
  const token = selectToken(getState());
  const userId = selectUser(getState()).id;
  try {
    const response = await axios.get(`${URL}/lists/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    const response = await axios.get(`${URL}/productlist/${id}`);

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

export const updateQuantity =
  (listId, productId, update) => async (dispatch, getState) => {
    dispatch(appLoading);
    try {
      const response = await axios.patch(
        `${URL}/productlist/${listId}/${productId}/${update}`
      );

      console.log(response.data[0]);
      dispatch(updateQuantityFetched(response.data[0]));

      dispatch(appDoneLoading);
    } catch (e) {
      console.log(e.message);
    }
  };

export const increaseQuantity = (id) => {
  return {
    type: "SHOPPINGLIST/increaseQuantity",
    payload: id,
  };
};

export const decreaseQuantity = (id) => {
  return {
    type: "SHOPPINGLIST/decreaseQuantity",
    payload: id,
  };
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

export const deleteProductListFetched = (id) => {
  console.log("delete");
  return {
    type: "SHOPPINGLIST/delete",
    payload: id,
  };
};

export const createShoppingList =
  (myShoppingList) => async (dispatch, getState) => {
    dispatch(appLoading);
    const token = selectToken(getState());
    const userId = selectUser(getState()).id;
    // console.log("shoppingList", myShoppingList);
    try {
      const response = await axios.post(
        `${URL}/productlist/${userId}`,
        {
          myShoppingList,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        showMessageWithTimeout("success", false, "Shopping list created!", 1500)
      );
      console.log("categories", response.data);
      // dispatch(getCategoriesFetched(response.data));
      dispatch(appDoneLoading);
    } catch (e) {
      console.log(e.message);
    }
  };

//
export const deleteProductList = (id) => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.delete(
      `${URL}/productlist/${id}`
      // , {
      //   headers: { Authorization: `Bearer ${token}` },
      // }
    );
    dispatch(deleteProductListFetched(id));
    dispatch(getLists);
    dispatch(
      showMessageWithTimeout("success", false, "Shoppinglist deleted!", 1500)
    );
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const getSupermarketCategoriesFetched = (categories) => {
  return {
    type: "SHOPPINGLIST/supermarketCategories",
    payload: categories,
  };
};

export const getSupermarketCategories = (id) => async (dispatch, getState) => {
  dispatch(appLoading);
  const token = selectToken(getState());
  try {
    const response = await axios.get(`${URL}/supermarket/${id}/categories`);
    dispatch(getSupermarketCategoriesFetched(response.data));
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
