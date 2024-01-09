import Login from "./login";
import headerStyle from "../styles/header.module.css";

export default function Header() {
    return (
    <header className={headerStyle.header}>
        <div>Namiskoja</div>
        <Login />
    </header>
    )
}
