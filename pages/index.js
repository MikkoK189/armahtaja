import Layout from "../components/layout";
import Head from "next/head";
import style from "../components/upcomingops.module.css";
import { useState, useEffect } from "react";
import Event from "../components/event";
import { getEventData } from "../lib/eventData";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=7200"
  );

  const eventData = await getEventData();

  return {
    props: { data: eventData }, // will be passed to the page component as props
  };
}

export default function UpcomingOperations({ data }) {
  const [filters, setFilters] = useState([]);
  const [imageUrls, setImageUrls] = useState({})

  const curTime = new Date();
  const router = useRouter();
  const parameters = router.query;

  // A hacky fix for the broken image links from raid-helper API
  useEffect(() => {
    const getImages = async () => {
      const _curTime = new Date();
      for(const event of data) {
        const endTime = new Date(event.endTime * 1000);
        if (endTime > _curTime) {
          const request = await fetch (`https://raid-helper.dev/api/event/${event.id}`);
          const json = await request.json();
          
          setImageUrls((prevState) => {
            return {
              ...prevState,
              [event.id]: json.advanced.image,
            }
          });
        }
      }
    }

    getImages();
  }, [data])

  if (!data) return <p>No data</p>;

  const applyFilters = function (filter) {
    if (filters.includes(filter)) {
      const idx = filters.indexOf(filter);

      setFilters((prevState, newState) => {
        return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
      });
    } else {
      setFilters((prevState, newState) => {
        return [...prevState, filter];
      });
    }
  };

  const pageContent = data.map((event) => {
    const endTime = new Date(event.endTime * 1000);
    if (endTime < curTime && parameters?.history !== "1") return "";

    if (!filters.length || filters.includes(event.slug)) {
      return <Event key={event.id} event={event} imageUrl={event.id in imageUrls ? imageUrls[event.id] : null} />;
    }
  });

  return (
    <Layout home={true} filterFunction={applyFilters} activeFilters={filters}>
      <Head>
        <title>Armahtaja</title>
        <meta
          name="description"
          content="A site for upcoming Arma operations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.operationContainer}>{pageContent}</main>
    </Layout>
  );
}
