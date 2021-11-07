import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectListDetails } from "../store/shoppingList/selectors";
import { getListDetails } from "../store/shoppingList/actions";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../store/shoppingList/actions";
import Loading from "./Loading";
import { Button } from "react-bootstrap";

export default function ListDetails(params) {
  const { id } = useParams();
  const listDetails = useSelector(selectListDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListDetails(id));
  }, [dispatch]);

  if (!listDetails) return <Loading />;
  return (
    <div
      style={{
        textAlign: "left",
        padding: "15px",
      }}
    >
      <h4>List #{id}</h4>
      <ul style={{ listStyle: "none" }}>
        {listDetails.map((product) => {
          return (
            <div key={product.id}>
              <li>
                {product.name}
                <Button
                  variant="primary"
                  onClick={() => dispatch(increaseQuantity(product.id))}
                >
                  -
                </Button>
                {product.quantity}
                <Button
                  variant="primary"
                  onClick={() => dispatch(decreaseQuantity(product.id))}
                >
                  +
                </Button>
                <input
                  style={{ marginLeft: "10px" }}
                  class="form-check-input"
                  type="checkbox"
                  id={product.id}
                />
              </li>
            </div>
          );
        })}
      </ul>
      <Button variant="primary">Done</Button>
    </div>
  );
}
