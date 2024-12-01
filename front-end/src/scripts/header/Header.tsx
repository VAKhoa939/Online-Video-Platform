import "../../css/header.css";
import { FaUpload, FaBell, FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ICON_SIZE = 24;

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <header className="header">
      <div className="left-section">
        <h1 onClick={() => navigate("/")}>Online Video Platform</h1>
      </div>

      <div className="middle-section">
        <SearchBar size={ICON_SIZE} />
      </div>

      <div className="right-section">
        <div className="icon-container">
          <FaUpload size={ICON_SIZE} />
          <div className="tooltip">Create video</div>
        </div>
        <div className="icon-container">
          <FaBell size={ICON_SIZE} />
          <div className="notifications-count">3</div>
          <div className="tooltip">Notifications</div>
        </div>
        {auth.email ? (
          <div className="icon-container">
            <FaUserCircle size={ICON_SIZE} onClick={() => navigate("#")} />
            <div className="tooltip">User email</div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
