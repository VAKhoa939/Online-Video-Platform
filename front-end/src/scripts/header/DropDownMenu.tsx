import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
const ICON_SIZE = 24;
const DropdownMenu = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <div className="icon-container">
        <FaUserCircle size={ICON_SIZE} onClick={() => navigate("#")} />
        <div className="tooltip">User email</div>
      </div>
      <ul className="dropdown-menu">
        <li onClick={() => navigate(``)}>
          <p>Change Avatar</p>
        </li>
        <li onClick={() => navigate(``)}>
          <p>Change Information</p>
        </li>
        <li
          onClick={() => {
            localStorage.clear();
            toast.success("Log out successfully!");
            setAuth((previous) => ({ ...previous, email: "" }));
            navigate("/login");
          }}
        >
          <p>Log out</p>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
