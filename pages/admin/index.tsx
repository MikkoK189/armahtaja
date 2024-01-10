import { useRouter } from 'next/router';
import { useUser } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import adminStyle from '../../styles/admin.module.css'

type Operation = {
    title: string;
    id: string;
}

export default function AdminPage(props: any): JSX.Element {
    const router = useRouter();
    const { admin, id } = useUser();
    const [operations, setOperations ] = useState<Operation[]>([])

    useEffect(() => {
        if (!admin) {
            router.push('/');
        }

        const fetchOps = async () => {
            if(!id) return;

            const data = await fetch("/api/user/operations?userId="+id);
            const json = await data.json();
            setOperations(json);
        }

        fetchOps();
    
      }, [admin, router, id]);

    return (
        <Layout home={false} hideFilters={true}>
            <div className={adminStyle.container}>
                <div>
                {operations.length > 0 &&
                    operations.map((operation) => {
                        return(
                        <Link key={operation.id} href={`/admin/${operation.id}`}>
                            {operation.title}
                        </Link>
                        );})}
                </div>
            </div>
        </Layout>
    );
};

