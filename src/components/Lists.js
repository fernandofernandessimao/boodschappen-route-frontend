import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLists } from "../store/shoppingList/selectors";
import { getLists } from "../store/shoppingList/actions";
import Loading from "./Loading";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Lists() {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);

  useEffect(() => {
    dispatch(getLists);
  }, [dispatch]);

  if (!lists) return <Loading />;

  return (
    <div
      style={{
        textAlign: "left",
        //display: "flex",
        padding: "15px",
      }}
    >
      {lists.map((list) => {
        return (
          <div key={list.id}>
            <p>{list.id}{" "} <Link to={`/list/${list.id}`}>
              <Button>See products...</Button>
            </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}
