import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Auction from "./components/Auction";
import About from "./components/About";
import ShoppingLists from "./components/ShoppingLists";
import ShoppingListDetails from "./components/ShoppingListDetails";
import CreateShoppingList from "./components/CreateShoppingList";


function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={ShoppingLists} />
        <Route path="/shoppinglists/:id" component={ShoppingListDetails} />
        <Route path="/auction" component={Auction} />
        <Route path="/products" component={CreateShoppingList} />       
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
