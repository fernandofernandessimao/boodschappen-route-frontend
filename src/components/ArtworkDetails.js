import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectArtworkDetails } from "../store/artwork/selectors";
import {
  getArtworkDetails,
  updateArtworkHeart,
} from "../store/artwork/actions";
import Loading from "./Loading";
import { Button } from "bootstrap";
import { selectToken, selectUser } from "../store/user/selectors";
import { createBid } from "../store/artwork/actions";
import { heartImage } from "../config/constants";

export default function ArtworkDetails(params) {
  const { id } = useParams();
  const [amount, setAmount] = useState();
  const artwork = useSelector(selectArtworkDetails);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const userEmail = user.email;

  useEffect(() => {
    dispatch(getArtworkDetails(id));
  }, [dispatch]);

  if (!artwork || !artwork.bids) return <Loading />;

  const sortedBid = [...artwork.bids].sort((a, b) => {
    return b.amount - a.amount;
  });

  function getMinimumBid() {
    if (sortedBid.length < 1) return artwork.minimumBid + 1;
    else {
      return sortedBid[0].amount + 1;
    }
  }

  return (
    <div >
      <img src={`${artwork.imageUrl}`} alt="" width="500px" height="500px" />
      <h1>{artwork.title}</h1>
      <img src={`${heartImage}`} alt="heart" width="50px%" height="50px" />{" "}
      {artwork.hearts}
      <button
        onClick={() => dispatch(updateArtworkHeart(id, artwork.hearts + 1))}
      >
        Give heart
      </button>
      <br />
      Bids: <br />
      <ol>
        {!artwork.bids
          ? "No bids so far..."
          : sortedBid.map((bid) => {
              return (
                <li key={bid.id}>
                  {bid.email} {bid.amount}
                </li>
              );
            })}
      </ol>
      {token && (
        <div>
          <label for="bid">Amount</label>
          <input
            name="bid"
            type="number"
            min={getMinimumBid()}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
          <button
            onClick={() => dispatch(createBid(userEmail, amount, artwork.id))}
          >
            Bid
          </button>
        </div>
      )}
    </div>
  );
}
