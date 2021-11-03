import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingListDetails } from "../store/shoppingList/selectors";
import { getShoppingListDetails } from "../store/shoppingList/actions";
import { updateQuantity } from "../store/shoppingList/actions";
import Loading from "./Loading";
import { Button } from "bootstrap";

export default function ShoppingListDetails(params) {
  const { id } = useParams();
  const shoppingList = useSelector(selectShoppingListDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShoppingListDetails(id));
  }, [dispatch]);

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        padding: "15px",
      }}
    >
      <ol>
        {shoppingList.map((shoppingList) => {
          return (
            <div>
              <li>
                {shoppingList.product.name}
                <button
                  onClick={() =>
                    dispatch(updateQuantity(shoppingList.id, shoppingList.quantity - 1))
                  }
                >
                  -
                </button>
                {shoppingList.quantity}
                <button
                  onClick={() =>
                    dispatch(updateQuantity(shoppingList.id, shoppingList.quantity + 1))
                  }
                >
                  +
                </button>
              </li>
            </div>
          );
        })}
      </ol>
    </div>
  );
}
