import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingLists } from "../store/shoppingList/selectors";
import { getShoppingLists } from "../store/shoppingList/actions";
import Loading from "./Loading";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ShoppingLsts() {
  const dispatch = useDispatch();
  const shoppingLists = useSelector(selectShoppingLists);

  useEffect(() => {
    dispatch(getShoppingLists);
  }, [dispatch]);

  if (!shoppingLists) return <Loading />;

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        padding:"15px",
      }}
    >
      {shoppingLists.map((shoppingList) => {
        return (
          <div key={shoppingList.id}>
            {shoppingList.products.map((p) => (
              <p key={p.id}>{p.name} <button style={{ position:"flex"}}>-</button> {p.shoppingLists.quantity} <button>+</button> {p.price}</p> 
            ))}

            <Link to={`/shoppingLists/${shoppingList.id}`}>
              <Button>See details</Button>
            </Link>
            <p />
          </div>
        );
      })}
    </div>
  );
}
