import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useMap } from "react-leaflet";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getSupermarketCategories } from "../store/shoppingList/actions";
import { useDispatch } from "react-redux";

export default function Location() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [position, setPosition] = useState([
    52.223018186147456, 5.15734198263268,
  ]);
  const [area, setArea] = useState("Hilversum");
  const [supermarket, setSupermarket] = useState(0);
  const views = [
    {
      view: [52.223018186147456, 5.15734198263268], // hilversum
    },
    {
      view: [52.24006670402572, 5.112691431837667], // kortenhoef
    },
  ];

  const markers = [
    {
      id: 4,
      area: "Hilversum",
      name: "Lidl",
      position: [52.21629920829114, 5.14175694212389],
    },
    {
      id: 3,
      area: "Hilversum",
      name: "AH Kerkenlanden",
      position: [52.21713522767492, 5.140702051047473],
    },
    {
      id: 5,
      area: "Hilversum",
      name: "AH Langestraat",
      position: [52.222165841131144, 5.1756301357802705],
    },
    {
      id: 1,
      area: "Kortenhoef",
      name: "AH",
      position: [52.24006670402572, 5.112691431837667],
    },
    {
      id: 2,
      area: "Kortenhoef",
      name: "Jumbo",
      position: [52.24017647553218, 5.114063127278046],
    },
  ];

  const updateMarkers = [...markers].filter((item) => {
    return item.area === area;
  });

  const updateLocation = (event) => {
    setArea(event.target.value);
    setSupermarket(0);
    event.target.value === "Hilversum"
      ? setPosition(views[0].view)
      : setPosition(views[1].view);
  };

  const selectSupermarket = (id) => {
    setSupermarket(parseInt(id));
  };

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const enableButton = () => {
    return supermarket === 0;
  };

  const generateRoute = () => {
    dispatch(getSupermarketCategories(supermarket));    
    history.push("/route")
  };

  return (
    <div style={{ textAlign: "center", padding: "15px" }}>
      Region
      <select onChange={updateLocation} value={area}>
        <option value="Hilversum">Hilversum</option>
        <option value="Kortenhoef">Kortenhoef</option>
      </select>
      {/* Supermarket
      <select onChange={selectSupermarket}>
        {" "}
        value={supermarket}
        {updateMarkers.map((option) => {
          return <option value={option.name}>{option.name}</option>;
        })}
      </select> */}
      <link
        rel="stylesheet"
        href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
      />
      <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
      <MapContainer
        className="map"
        id="map"
        center={position}
        zoom={12}
        style={{ height: 600, width: 400 }}
      >
        <ChangeView center={position} zoom={13} />
        <TileLayer
          //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {updateMarkers.map((m) => {
          return (
            <Marker
              position={m.position}
              eventHandlers={{ click: () => selectSupermarket(m.id) }}
            >
              <Popup>{m.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <p />
      <p style={{ textAlign: "center" }}>
        {enableButton() ? (
          "select a supermarket"
        ) : (
          <Button onClick={() => generateRoute()} variant="primary">
            Generate Route
          </Button>
        )}
      </p>
    </div>
  );
}
