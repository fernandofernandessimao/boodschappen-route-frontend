import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectArtworkDetails } from "../store/artwork/selectors";
import { getArtworkDetails } from "../store/artwork/actions";
import Loading from "./Loading";

export default function ArtworkDetails(params) {
  const { id } = useParams();
  const artworkDetails = useSelector(selectArtworkDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtworkDetails(id));
  }, [dispatch]);

  if (!artworkDetails) return <Loading />;

  return (
    <div>
      <img
        src={`${artworkDetails.imageUrl}`}
        alt=""
        width="500px"
        height="500px"
      />
      <h1>{artworkDetails.title}</h1>
      <p>Hearts: {artworkDetails.hearts}</p>
      <p> Bids: {artworkDetails.bids.length}</p>
    </div>
  );
}
