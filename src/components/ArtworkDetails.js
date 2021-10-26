import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectArtworkDetails } from "../store/artwork/selectors";
import {
  getArtworkDetails,
  updateArtworkHeart,
} from "../store/artwork/actions";
import Loading from "./Loading";

export default function ArtworkDetails(params) {
  const { id } = useParams();
  const artworkDetails = useSelector(selectArtworkDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtworkDetails(id));
  }, [dispatch]);

  if (!artworkDetails) return <Loading />;

  function hearts() {
    return artworkDetails.hearts + 1;
  }
 
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
      <button onClick={() => dispatch(updateArtworkHeart(id, hearts()))}>
        Give heart
      </button>
      <br />
      Bids: <br />
      <ol style={{}}>
        {/* 3 hours to solve this rendering error, never again! */}
        {artworkDetails?.bids?.map((bid) => {
          return (
            <li>
              {bid.email} {bid.amount}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
