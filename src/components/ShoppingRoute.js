import { useDispatch, useSelector } from "react-redux";
import { selectChosenList } from "../store/shoppingList/selectors";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { getSupermarketCategories } from "../store/shoppingList/actions";
import { selectSupermarketCategories } from "../store/shoppingList/selectors";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

export default function ShoppingRoute() {
  const dispatch = useDispatch();
  const productList = useSelector(selectChosenList);
  const categories = useSelector(selectSupermarketCategories);
  let catProd = [];
  const history = useHistory()

  const categoryProduct = () => {
    categories.map((c) => {
      productList.map((p) => {
        if (c.categoryId === p.categoryId && !catProd.includes(c.categoryId)) {
          catProd = [...catProd, c.categoryId];
        }
      });
    });
  };

  // console.log("produclist", productList);
  categoryProduct();

  useEffect(() => {});

  if (!productList) return <Loading />;

  // console.log("categories", categories);

  return (
    <div style={{ padding: "15px", textAlign: "center" }}>
      Shopping route
      <ol style={{ listStyle: "none" }}>
        {catProd.map((c) => {
          return (
            <li>
              Category #{c}
              {productList.map((p) => {
                if (p.categoryId === c) {
                  return (
                    <li>
                      {p.name} <input type="checkbox" />
                    </li>
                  );
                }
              })}
              <p />
            </li>
          );
        })}
      </ol>
      <Button onClick={()=> history.push("/lists")} variant="primary">Done!</Button>
    </div>
  );
}
