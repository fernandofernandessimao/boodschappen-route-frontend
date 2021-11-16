import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectListDetails } from "../store/shoppingList/selectors";
import {
  getListDetails,
  setChosenList,
  deleteProductList,
} from "../store/shoppingList/actions";
import { showMessageWithTimeout, appLoading } from "../store/appState/actions";
import Loading from "./Loading";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function ListDetails(params) {
  const { id } = useParams();
  const listDetails = useSelector(selectListDetails);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getListDetails(id));
  }, []);

  if (!listDetails) return <Loading />;

  const handleChange = () => {
    dispatch(appLoading);
    dispatch(setChosenList([listDetails]));
    dispatch(
      showMessageWithTimeout(
        "success",
        false,
        `Shoppinglist #${id} selected!`,
        1500
      )
    );
    history.push("/location");
  };

  const handleDelete = () => {
    dispatch(deleteProductList(id));
    history.push("/lists");
  };

  return (
    <div
      style={{
        textAlign: "left",
        padding: "15px",
      }}
    >
      <h4>Shoppinglist #{id}</h4>
      <ul style={{ listStyle: "none" }}>
        {!listDetails
          ? "You have no shoppinglists yet..."
          : listDetails.map((product) => {
              return (
                <div key={product.id}>
                  <li>
                    {product.name}
                    {/* <Button
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
                /> */}
                  </li>
                </div>
              );
            })}
      </ul>
      <Button onClick={() => handleChange()} variant="primary">
        Select
      </Button>{" "}
      <Button onClick={() => handleDelete()} variant="primary">
        Delete
      </Button>
    </div>
  );
}
