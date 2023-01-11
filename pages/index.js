import Layout from "../components/layout";
import Head from "next/head";
import style from "../components/upcomingops.module.css";
import { useState } from "react";
import Event from "../components/event";
import { getEventData } from "../lib/eventData";

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3600"
  );

  const eventData = await getEventData();

  return {
    props: { data: eventData }, // will be passed to the page component as props
  };
}

export default function UpcomingOperations({ data }) {
  const [filters, setFilters] = useState([]);

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
    if (!filters.length || filters.includes(event.slug)) {
      return (
        <Event key={event.id} event={event} />
      );
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
      <div className={style.operationContainer}>{pageContent}</div>
    </Layout>
  );
}
