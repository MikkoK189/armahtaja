import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { getOperationData, getOperationPaths } from '../../lib/jointops';

type Slot = {
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
    return (
        <div>
            <h1>{ props.title }</h1>
            { props.content }

            {props.groups.map((group) => {
                return (
                    <div key={group.id}>
                        <h2>{group.title}</h2>
                        <ul>
                            {group.slots.map((slot) => {
                                return (
                                    <li key={slot.title}>
                                        {slot.title} - {slot.participant}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default JointOpsPage;
