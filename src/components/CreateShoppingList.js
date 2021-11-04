import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  selectCategories,
} from "../store/shoppingList/selectors";
import { getProducts, getCategories } from "../store/shoppingList/actions";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { createShoppingList } from "../store/shoppingList/actions";

export default function CreateShoppingList() {
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const [filterCategories, setFilterCategories] = useState(products);
  const [myShoppingList, setMyShoppingList] = useState([]);
  
  const dispatch = useDispatch();

  const options = categories.map((c) => {
    return {
      value: c.id,
      label: `${c.id}-${c.description}`,
    };
  });

  const formatProducts = (p) => {
    return {
      value: p.id,
      label: p.name,
    };
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [filterCategories, dispatch]);

  const handleChangeCategories = (value) => {
    // adding only the id
    setFilterCategories(value.map((v) => v.value));
  };

  const handleChangeProducts = (value) => {
    setMyShoppingList(value.map((x) => x));
  };

  const productsByCategory = products
    .filter((p) => filterCategories.includes(p.categoryId))
    .map((p) => formatProducts(p));

  const saveList = () => {
    dispatch(createShoppingList(myShoppingList))
    
    // if (!shoppingList.length) {
    //   window.alert("your list is empty");
    // }
    // console.log(productsByCategory);
    // console.log(filterCategories);
    //dispatch(createShoppingList())
    //console.log()
  };

  return (
    <div>
      Categories
      <Select
        placeholder="select categories"
        //  value={filterCategories}
        options={options}
        isMulti={true}
        onChange={handleChangeCategories}
      />
      Products
      <Select
        placeholder="select products"
        // value={filterProducts}
        options={
          filterCategories.length
            ? productsByCategory
            : products.map((p) => formatProducts(p))
        }
        isMulti={true}
        //getValue={() => saveList}
        onChange={handleChangeProducts}
      />
      <br />
      <Button
        onClick={saveList}
        variant="primary"
        style={{ margin: "auto", display: "block" }}
      >
        Save
      </Button>
    </div>
  );
}
