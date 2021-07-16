import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/MyAlbum.svg";
import leaveImg from "../../assets/images/logout_black_24dp.svg";
import { useAuth } from "../../hooks/useAuth";
import "./styles.scss";

type NavbarProps = {
  children?: ReactNode;
};
export function Navbar({ children }: NavbarProps) {
  const { user, logoutGoogle, logoutNormal } = useAuth();
  return (
    <header>
      <div className="logo">
        <img src={logoImg} alt="Logo MyAlbum" />
      </div>
      <div className="nav">
        <ul className="list">
          {children}
          {user?.email && user?.password && user.id ?
            (
              <Link to="/" onClick={logoutNormal}>
                <img src={leaveImg} alt="Sign out" />
              </Link>
            ) 
            : null
            }
            {
              user?.avatar && user?.email ?
              (
                <Link to="/" onClick={logoutGoogle}>
                  <img src={leaveImg} alt="Sign out" />
                </Link>
              ) :
              null
            }
        </ul>
      </div>
    </header>
  );
}
