import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "../components/layout";
import UpcomingOperations from "../components/upcomingops";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Armahtaja</title>
        <meta
          name="description"
          content="A site for upcoming Arma operations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UpcomingOperations />
    </Layout>
  );
}
