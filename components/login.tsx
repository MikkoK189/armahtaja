import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import loginStyle from "../styles/header.module.css";

export default function Login() {
  const { data: session } = useSession()

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
  }

  if (session) {
    return (
      <div className={loginStyle.login}>
        {session.user?.name} <br />
        {session.user?.image &&
        <Image 
            style={imageStyle}
            src={session.user?.image} 
            alt="Profile image"
            width={50}
            height={50}
        />}
        <button onClick={() => signOut()}>Kirjaudu ulos</button>
      </div>
    )
  }
  return (
    <div className={loginStyle.login}>
      Not signed in <br />
      <button onClick={() => signIn()}>Kirjaudu sisään</button>
    </div>
  )
}
