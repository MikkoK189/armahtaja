import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import style from "./upcomingops.module.css";
import { Remark } from "react-remark";
import { getOperationDateString, getOperationTimeString } from "../lib/ops";

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const request = await fetch(
    `https://raid-helper.dev/api/v1/1060997064290488360/events/`,
    {
      method: "post",
      headers: new Headers({
        Authorization: "x1Z2KCnjHukoyRmCC1Z2zSgeff7i4CozDZ9GxHkq",
      }),
    }
  );
  const aaa = await request.json();
  console.log("RUN?");

  return {
    props: { test: "test" }, // will be passed to the page component as props
  };
}

export default function UpcomingOperations({ aaa }) {
  console.log(aaa);
  //const [data, setData] = useState(null);

  // const getOperationData = useCallback(async () => {
  //   const response = await fetch("/api/operations");
  //   const data = await response.json();

  //   setData(data);
  // }, []);

  // useEffect(() => {
  //   getOperationData().catch(console.error);
  // }, [getOperationData]);

  if (!aaa) return <p>No data</p>;

  const pageContent = aaa.map((event) => {
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
