import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { selectUser, selectToken } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { startAnAuction } from "../store/user/actions";

export default function Auction() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImage] = useState("");
  const [minimumBid, setBid] = useState(1);

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const userId = user.id;

  function submitForm(event) {
    event.preventDefault();
    dispatch(startAnAuction(title, imageUrl, minimumBid, userId));
    setTitle("");
    setImage("");
    setBid(1);
  }
  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Start an auction</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Enter title"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImage(event.target.value)}
            type="text"
            placeholder="Enter image url"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Minimun bid</Form.Label>
          <Form.Control
            value={minimumBid}
            onChange={(event) => setBid(event.target.value)}
            type="number"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
