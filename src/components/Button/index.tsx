import { ButtonHTMLAttributes } from "react";
import "./styles.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props : ButtonProps) {
    return (
        <button {...props} className={`${props.className ? `${props.className} button` : 'button'}`}>
            {props.children}
        </button>
    );
}