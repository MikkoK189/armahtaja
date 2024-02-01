import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { getOperationData, getOperationPaths } from '../../lib/jointops';
import Layout from '../../components/layout';
import router, { Router } from 'next/router';
import { useUser } from '../../contexts/UserContext';
import dynamic from 'next/dynamic';
import { Remark } from "react-remark"
import adminStyle from '../../styles/admin.module.css'

type Slot = {
    id: string;
    title: string;
    participant: string;
    accepted: boolean;
    groupId: string;
}

type Group = {
    id: string;
    title: string;
    slots: Slot[];
    operationId?: string;
}

interface JointOperationData {
    title: string;
    id: string;
    content: string;
    groups: Group[];
}

const Editor = dynamic(() => import('../../components/Editor'), { ssr: false }) 

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
    const [removedGroups, setRemovedGroups] = useState<string[]>([]);
    const [removedSlots, setRemovedSlots] = useState<string[]>([]);
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


      const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const body = {operation, removedGroups, removedSlots};
          await fetch('/api/user/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          await router.push('/');
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <Layout 
            home={false}
            hideFilters={true}
            staticBackground={true}
        >
            <div className={adminStyle.container}>
                <form onSubmit={submitData}>
                    <input 
                        type="text"
                        value={operation.title}
                        onChange={(e) => setOperation((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Editor content={operation.content}
                    onChange={(e: any) => setOperation((prev) => ({ ...prev, content: e }))} />
                    <div className={adminStyle.groupContainer}>
                        {operation.groups.map((group) => {
                            return (
                                <div key={group.id} className={adminStyle.group}>
                                    <input value={group.title} 
                                    onChange={(e) => setOperation((prev) => ({ ...prev, groups: prev.groups.map((g) => {
                                        if(g.id === group.id) {
                                            return { ...g, title: e.target.value }
                                        }
                                        return g;
                                    }
                                    )}))}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOperation((prev) => ({ ...prev, groups: prev.groups.filter((g) => g.id !== group.id) }));
                                            setRemovedGroups((prev) => [...prev, group.id]);
                                            setRemovedSlots((prev) => [...prev, ...group.slots.map((s) => s.id)]);
                                        }}
                                    >Remove group</button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            //Duplicate group and slots, set new unique id for every slot
                                            setOperation((prev) => ({ ...prev, groups: [...prev.groups, { id: String(Date.now()), title: group.title, slots: group.slots.map((slot, i) => ({ ...slot, groupId: Date.now().toString(), id: Date.now() + i.toString()})), operationId: operation.id }] }));
                                        }}
                                    >
                                        Duplicate group
                                    </button>
                                    <ul>
                                        {group.slots.map((slot) => {
                                            return (
                                                <li key={slot.id}>
                                                    <input 
                                                        type="text"
                                                        value={slot.title}
                                                        // Edit slot title within operation.groups.slots.title
                                                        onChange={(e) => setOperation((prev) => ({ ...prev, groups: prev.groups.map((group) => {
                                                            if(group.id === slot.groupId) {
                                                                return { ...group, slots: group.slots.map((s) => {
                                                                    if(s.id === slot.id) {
                                                                        return { ...s, title: e.target.value }
                                                                    }
                                                                    return s;
                                                                })}
                                                            }
                                                            return group;
                                                        })}))}
                                                    />
                                                        <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setOperation((prev) => ({ ...prev, groups: prev.groups.map((group) => {
                                                                if(group.id === slot.groupId) {
                                                                    return { ...group, slots: group.slots.filter((s) => s.id !== slot.id) }
                                                                }
                                                                return group;
                                                            })}));
                                                            setRemovedSlots((prev) => [...prev, slot.id]);
                                                        }}
                                                        >Remove slot</button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOperation((prev) => ({ ...prev, groups: prev.groups.map((g) => {
                                                if(g.id === group.id) {
                                                    return { ...g, slots: [...g.slots, { id: String(Date.now()), title: '', participant: '', accepted: false, groupId: group.id }] }
                                                }
                                                return g;
                                            })}));
                                        }}
                                    >Add Slot</button>
                                </div>
                            );
                        })}
                                            <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOperation((prev) => ({ ...prev, groups: [...prev.groups, { id: String(Date.now()), title: '', slots: [], operationId: operation.id }] }));
                        }}>Add group</button>
                    </div>
                    <button type="submit">Save</button>
                </form>
                <div>
                    <h1>{ operation.title }</h1>
                    <Remark>{operation.content}</Remark>
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
            </div>
        </Layout>
    );
};

export default JointOpsPage;
