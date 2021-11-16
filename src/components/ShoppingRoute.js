import { useSelector } from "react-redux";
import { selectChosenList } from "../store/shoppingList/selectors";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import {
  selectSupermarketCategories,
  selectCategories,
} from "../store/shoppingList/selectors";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";


export default function ShoppingRoute() {
  const productList = useSelector(selectChosenList);
  const categories = useSelector(selectSupermarketCategories);
  const categoriesName = useSelector(selectCategories);

  // useState was returning data not the way it was supposed to
  let catProd = [];
  const history = useHistory();
  const [checkedProduct, setCheckedProduct] = useState([]);

  // a product has only one category
  const categoryProduct = () => {
    categories.map((c) => {
      productList.map((p) => {
        if (c.categoryId === p.categoryId && !catProd.includes(c.categoryId)) {
          catProd = [...catProd, c.categoryId];
        }
      });
    });
  };
  // just styling for ui
  const checkList = (id) => {
    if (!checkedProduct.includes(id)) {
      setCheckedProduct([...checkedProduct, id]);
    } else {
      const filter = [...checkedProduct].filter((f) => f !== id);
      setCheckedProduct(filter);
    }
  };

  console.log(checkedProduct);
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
            <li key={c}>
              Category
              {categoriesName.map((name) => {
                if (name.id === c) return <h6><i>{name.description}</i></h6>;
              })}
              {productList.map((p) => {
                if (p.categoryId === c) {
                  return (
                    <li>
                      {p.name}{" "}
                      <input onChange={() => checkList(p.id)} type="checkbox" />
                    </li>
                  );
                }
              })}
              <p />
            </li>
          );
        })}
      </ol>
      <Button onClick={() => history.push("/lists")} variant="primary">
        Done!
      </Button>
    </div>
  );
}
