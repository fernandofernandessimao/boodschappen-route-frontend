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
import About from "./components/About";
import Lists from "./components/Lists";
import ListDetails from "./components/ListDetails";
import CreateShoppingList from "./components/CreateShoppingList";
import Location from "./components/Location";
import Home from "./components/Home";
import ShoppingRoute from "./components/ShoppingRoute";
import { selectToken } from "./store/user/selectors";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""
      ></script>
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        {token ? (
          <Route exact path="/" component={Lists} />
        ) : (
          <Route exact path="/" component={Home} />
        )}
        {token && <Route exact path="/lists" component={Lists} />}
        {token && <Route path="/list/:id" component={ListDetails} />}
        {token && <Route path="/products" component={CreateShoppingList} />}
        {token && <Route path="/location" component={Location} />}
        {token && <Route path="/route" component={ShoppingRoute} />}
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
