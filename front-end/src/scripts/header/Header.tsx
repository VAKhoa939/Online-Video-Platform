import "../../css/header.css";
import { FaUpload } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DropdownMenu from "./DropDownMenu";
const ICON_SIZE = 24;

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <header className="header">
      <div className="left-section">
        <h1 onClick={() => navigate("/")}>Ontube</h1>
      </div>

      <div className="middle-section">
        <SearchBar size={ICON_SIZE} />
      </div>

      <div className="right-section">
        {auth.email ? (
          <>
            <div className="icon-container">
              <FaUpload size={ICON_SIZE} onClick={() => navigate("/upload")} />
              <div className="tooltip">Create video</div>
            </div>
            <DropdownMenu />
          </>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
