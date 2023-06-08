import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function DropDown() {
  const [isOpened, setIsopened] = useState(false);
  const { isLoggedIn, logout } = useContext(SessionContext);

  const toggleMenu = () => {
    setIsopened(!isOpened);
  };

  return (
    <div className="dropDown">
      <div className="hamburger" 
        onClick={() => toggleMenu()}>
        <img src="/images/icon-menu.png"></img>
      </div>
      <nav className={`menu-container ${isOpened ? "opened" : "closed"} `}>
        <div className="drop-menus">
          {!isLoggedIn && <Link to="/signup">Signup</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && <Link to="/profile">Profile</Link>}
          {isLoggedIn && <Link to="/allskills">Skills Venue</Link>}
          {isLoggedIn && <Link to="/allevents">Events Venue</Link>}
          {isLoggedIn && <button onClick={logout}>Logout</button>}
        </div>
      </nav>
    </div>
  );
}
