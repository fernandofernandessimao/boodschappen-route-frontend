import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectArtworks } from "../store/artwork/selectors";
import { getArtworks } from "../store/artwork/actions";
import Loading from "./Loading";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Artwork() {
  const dispatch = useDispatch();
  const artworks = useSelector(selectArtworks);

  useEffect(() => {
    dispatch(getArtworks);
  }, [dispatch]);

  if (!artworks) return <Loading />;

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
      }}
    >
      {artworks.map((artwork) => {
        return (
          <div key={artwork.id}>
            <img
              src={`${artwork.imageUrl}`}
              alt=""
              width="500px"
              height="500px"
            />
            <h1>{artwork.title}</h1>
            <Link to={`/artworks/${artwork.id}`}>
              <Button>See details</Button>
            </Link>
            <p>
              Hearts: {artwork.hearts} Bids: {artwork.bids.length}
            </p>
          </div>
        );
      })}
    </div>
  );
}
