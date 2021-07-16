import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import "./styles.scss";

export function Faq() {
  return (
    <>
      <Navbar>
        <Link to="/">Login</Link>
      </Navbar>
      <h1>FAQ</h1>
    </>
  );
}
