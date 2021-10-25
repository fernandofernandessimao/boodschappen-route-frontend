import { useParams } from "react-router";

export default function ArtworkDetails() {
  const { id } = useParams();

  return <div>Details of artwork {id} here</div>;
}
