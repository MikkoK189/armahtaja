import { useSession, signIn, signOut } from "next-auth/react"
import { useUser } from "../contexts/UserContext"
export default function Component() {
  const { data: session } = useSession()
  const usr = useUser();
  if (session) {
    return (
      <>
        Kirjaunut sisään {usr?.name} <br />
        <button onClick={() => signOut()}>Kirjaudu ulos</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
