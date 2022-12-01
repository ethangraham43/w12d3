import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const logout = (e) => {
    dispatch(sessionActions.logout());
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  return (
    <>
      <div onClick={openMenu} style={{ color: "orange", fontSize: "100px" }}>
        <i className="fa-solid fa-carrot"></i>
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;
