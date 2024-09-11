import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>Sorry, that page can't be found.</h1>
      <h3>
        <Link to="/">Click here to go back to Circula.</Link>
      </h3>
    </div>
  );
}
