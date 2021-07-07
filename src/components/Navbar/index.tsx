import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/MyAlbum.svg";
import "./styles.scss";

type NavbarProps = {
    children?: ReactNode;
}
export function Navbar({ children }: NavbarProps) {
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src={logoImg} alt="Logo MyAlbum" />
                </Link>
            </div>
            <div className="nav">
                <ul>
                    {children}
                </ul>
            </div>
        </header>
    );
}