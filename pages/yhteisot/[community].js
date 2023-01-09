import Layout from "../../components/layout";
import Head from "next/head";
import Image from "next/image";
import communityStyle from '../../styles/community.module.css'
import { getCommunityPaths, getCommunityData } from "../../lib/communities";

export async function getStaticProps({ params }) {
    const data = await getCommunityData(params.community);
    return {
        props: data
    };
}

export async function getStaticPaths() {
    const paths = await getCommunityPaths();
    return {
        paths,
        fallback: false,
    };
}

export default function Community(communityData) {
    if(communityData) {
    return (
    <Layout>
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