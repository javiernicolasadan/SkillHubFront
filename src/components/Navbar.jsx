import { Link } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import DropDown from "./DropDrown";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(SessionContext);

  return (
    <nav className="nav-menus">
      <div className="home">
        <Link to={"/"}>SkillHub</Link>
      </div>
      <DropDown />
    </nav>
  );
}
