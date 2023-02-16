import Layout from "../../components/layout";
import Head from "next/head";
import Image from "next/image";
import communityStyle from '../../styles/community.module.css'
import { getCommunityPaths, getCommunityData, Community } from "../../lib/communities";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticProps : GetStaticProps = async ({ params } ) => {
    const data = await getCommunityData(String(params?.community));
    return {
        props: data
    };
}

export const getStaticPaths : GetStaticPaths = async () => {
    const paths = await getCommunityPaths();
    return {
        paths,
        fallback: false,
    };
}

export default function CommunityComponent(communityData : Community) {
    if(communityData) {
        return (
        <Layout home={false}>
            <Head>
                <title>{communityData.name}</title>
            </Head>
            <div className={communityStyle.communityCard}>
                <Image 
                className={communityStyle.img}
                src={communityData.logoUrl}
                alt="Community logo"
                width="500"
                height="500"
                />
                <div className={communityStyle.infoContainer}>
                    <div className={communityStyle.title}>
                        <h1>{communityData.name}</h1>
                        <p>{communityData.description}</p>
                    </div>
                    <a>{communityData.joiningInstruction}</a>
                </div>
            </div>
        </Layout>);
    }
}