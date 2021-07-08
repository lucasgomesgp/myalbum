import { ReactNode } from "react";
import logoImg from "../../assets/images/MyAlbum.svg";
import "./styles.scss";

type NavbarProps = {
    children?: ReactNode;
}
export function Navbar({ children }: NavbarProps) {
    return (
        <header>
            <div className="logo">
                <img src={logoImg} alt="Logo MyAlbum" />
            </div>
            <div className="nav">
                <ul>
                    {children}
                </ul>
            </div>
        </header>
    );
}