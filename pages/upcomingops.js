import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import style from "../components/upcomingops.module.css";
import { Remark } from "react-remark";
import { getOperationDateString, getOperationTimeString } from "../lib/ops";

const servers = [
  {
    serverName: "test",
    key: process.env.test,
    serverId: "1060997064290488360",
  },
  {
    serverName: "Arma Gorillat",
    key: process.env.gorillat,
    serverId: "705083686931923046",
  },
];

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3600"
  );

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

        if (endTime > curTime) {
          event.serverName = server.serverName;
          event.serverId = server.serverId;
          console.log(event.imageUrl);
          upcomingEvents.push(event);
        }
      });
    }

    await sleep(1500);

    if (upcomingEvents.length === 0) continue;

    eventData.push(...upcomingEvents);
  }

  eventData.sort((a, b) => a.startTime - b.startTime);
  console.log(eventData);

  return {
    props: { data: eventData }, // will be passed to the page component as props
  };
}

export default function UpcomingOperations({ data }) {
  if (!data) return <p>No data</p>;

  const pageContent = data.map((event) => {
    return (
      <div className={style.operationinfo}>
        <div className={style.timeInfo}>
          <h1>Yhteisö: {event.serverName}</h1>
          <p>
            Päivämäärä: {getOperationDateString(event.startTime)} Aika:{" "}
            {getOperationTimeString(event.startTime)}
          </p>
        </div>
        {event.imageUrl ? (
          <Image
            className={style.img}
            src={event.imageUrl}
            alt="Operation image"
            width={1000}
            height={300}
          />
        ) : (
          ""
        )}

        <div className={style.operationDescription}>
          <Remark>{event.description}</Remark>
        </div>
      </div>
    );
  });

  console.log(JSON.stringify(data, null, 2));

  return pageContent;
}
