import Login from "./login";
import headerStyle from "../styles/header.module.css";
import { useUser } from "../contexts/UserContext";
import Link from "next/link";

export default function Header() {
    const user = useUser();
    return (
    <header className={headerStyle.header}>
        {user.admin &&
            <Link href={'/admin'}
            >Test</Link>
        }
        <Login />
    </header>
    )
}
