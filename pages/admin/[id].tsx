import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { getOperationData, getOperationPaths } from '../../lib/jointops';
import Layout from '../../components/layout';
import router from 'next/router';
import { useUser } from '../../contexts/UserContext';

type Slot = {
    id: string;
    title: string;
    participant: string;
    accepted: boolean;
}

type Group = {
    id: string;
    title: string;
    slots: Slot[];
}

interface JointOperationData {
    title: string;
    id: string;
    content: string;
    groups: Group[];
}

export const getStaticProps : GetStaticProps = async ({ params } ) => {
    const data = await getOperationData(String(params?.id));
    if(data !== null) {
        return {
            props: data
        };
    }
    return { props: {} };
}

export const getStaticPaths : GetStaticPaths = async () => {
    const paths = await getOperationPaths();
    return {
        paths,
        fallback: false,
    };
}


const JointOpsPage = (props: JointOperationData) => {
    const { admin, id } = useUser();
    const [operation, setOperation ] = useState<JointOperationData>(props)

    useEffect(() => {
        if (!admin) {
            router.push('/');
        }

        const fetchOps = async () => {
            if(!id) return;

            const data = await fetch(`/api/user/operation?userId=${id}&operationId=${operation.id}`);
            if(data.status !== 200) {
                router.push('/')
            }
        }

        fetchOps();
    
      }, [admin, id, operation.id]);

    return (
        <Layout 
            home={false}
            hideFilters={true}
            staticBackground={true}
        >
            <form>
                <input 
                    type="text"
                    value={operation.title}
                    onChange={(e) => setOperation((prev) => ({ ...prev, title: e.target.value }))}
                ></input>
            </form>
            <div>
                <h1>{ operation.title }</h1>
                <p>{ operation.content }</p>
                <div>
                {operation.groups.map((group) => {
                    return (
                        <div key={group.id}>
                            <h2>{group.title}</h2>
                            <ul>
                                {group.slots.map((slot) => {
                                    return (
                                        <li key={slot.id}>
                                            {slot.title} - {slot.participant}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
                </div>
            </div>
        </Layout>
    );
};

export default JointOpsPage;
