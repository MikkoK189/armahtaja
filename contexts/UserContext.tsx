import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

interface UserContextProps {
    id: string | null;
    admin: boolean | null;
    name: string | null;
}

const UserContext = createContext<UserContextProps>({
    id: null,
    admin: false,
    name: null,
});

type UserProviderProps = { 
    children: ReactNode 
};

export function UserProvider({ children }: UserProviderProps): JSX.Element {
    const [user, setUser] = useState<UserContextProps>({ id: null, admin: false, name: null });
    const { data: session } = useSession();

    useEffect(() => {
        console.log(session?.user)
        if(!session) return;
        const fetchUserData: any = async () => {
            console.log("ASYNC")
            if(!session.user?.email) return;

            const data = await fetch("/api/user/userid?email="+session.user?.email);
            const json = await data.json();
            setUser(json);
        }

        fetchUserData();
    }, [session]);

    // Use memo
    const memoedValue = useMemo(() => (user), [user]);

    return (
        <UserContext.Provider value={memoedValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
