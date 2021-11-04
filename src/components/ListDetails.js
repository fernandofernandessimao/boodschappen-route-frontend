import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectListDetails } from "../store/shoppingList/selectors";
import { getListDetails } from "../store/shoppingList/actions";
import { updateQuantity } from "../store/shoppingList/actions";
import { Button } from "react-bootstrap";

export default function ListDetails(params) {
  const { id } = useParams();  
  const listDetails = useSelector(selectListDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListDetails(id));
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
        {listDetails.map((listDetail) => {
          return (
            <div>
              <li>
                {listDetail.product.name}
                {/* <Button
                  variant="primary"
                  onClick={() =>
                    dispatch(
                      updateQuantity(listDetail.id, listDetail.quantity - 1)
                    )
                  }
                >
                  -
                </Button>
                {listDetail.quantity}
                <Button
                  variant="primary"
                  onClick={() =>
                    dispatch(
                      updateQuantity(listDetail.id, listDetail.quantity + 1)
                    )
                  }
                >
                  +
                </Button> */}
              </li>
            </div>
          );
        })}
      </ol>
    </div>
  );
}
