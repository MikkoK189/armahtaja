import Layout from "../components/layout";
import Head from "next/head";
import style from "../components/upcomingops.module.css";
import { useState } from "react";
import Event from "../components/event";

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3600"
  );

  const servers = [
    {
      serverName: "test",
      key: process.env["test"],
      serverId: "1060997064290488360",
      slug: "test",
    },
    {
      serverName: "Arma Gorillat",
      key: process.env["gorillat"],
      serverId: "705083686931923046",
      slug: "gorillat",
    },
  ];

  const eventData = [];
  const curTime = new Date();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  for (const server of servers) {
    const request = await fetch(
      `https://raid-helper.dev/api/v1/${server.serverId}/events/`,
      {
        method: "post",
        headers: new Headers({
          Authorization: server.key,
        }),
      }
    );
    const json = await request.json();
    const upcomingEvents = [];

    if (json.postedEvents?.length > 0) {
      json.postedEvents.forEach((event) => {
        const endTime = new Date(event.endTime * 1000);

        // if (endTime > curTime) {
        //   event.serverName = server.serverName;
        //   event.serverId = server.serverId;
        //   upcomingEvents.push(event);
        // }

        event.serverName = server.serverName;
        event.serverId = server.serverId;
        event.slug = server.slug;
        upcomingEvents.push(event);
      });
    }

    await sleep(1500);

    if (upcomingEvents.length === 0) continue;

    eventData.push(...upcomingEvents);
  }

  eventData.sort((a, b) => a.startTime - b.startTime);

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
