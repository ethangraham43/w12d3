import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";

const Navigation = () => {
  const token = sessionStorage.getItem("X-CSRF-Token");
  const currentUser = sessionStorage.getItem("currentUser");
  // useSelector()
  // if (token === )
  // const loggedIn =
  // const dispatch = useDispatch();
  // const logout = (e) => {
  //   dispatch(sessionActions.logout());
  // };

  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      <ProfileButton user={sessionUser} />
      <ul>
        <NavLink to="/">Home Page</NavLink>
        {sessionLinks}
      </ul>
    </>
  );
};

export default Navigation;
