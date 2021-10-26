import axios from "axios";
import { appDoneLoading, appLoading } from "../appState/actions";

const URL = "http://localhost:4000";

export const artworksFetched = (artworks) => {
  return {
    type: "ARTWORK/list",
    payload: artworks,
  };
};

export const getArtworks = async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/`);
    //  console.log(response.data)
    dispatch(artworksFetched(response.data));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};

export const artworkDetailsFetched = (artwork) => {
  return {
    type: "ARTWORK/details",
    payload: artwork,
  };
};

export const getArtworkDetails = (id) => async (dispatch, getState) => {
  dispatch(appLoading);
  try {
    const response = await axios.get(`${URL}/artworks/${id}`);
    dispatch(artworkDetailsFetched(response.data));
    dispatch(appDoneLoading);
  } catch (e) {
    console.log(e.message);
  }
};
