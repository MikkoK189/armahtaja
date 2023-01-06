import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./upcomingops.module.css";
import { Remark } from "react-remark";
import getOperationDateString from "../lib/ops";

export default function UpcomingOperations() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getOperationData = async () => {
      const response = await fetch(
        "https://raid-helper.dev/api/v1/event/1059111611333345301"
      );
      const data = await response.json();

      setData(data);
    };

    getOperationData().catch(console.error);
  }, []);

  if (!data) return <p>No data</p>;

  console.log(data.startTime);
  return (
    <div className={style.operationinfo}>
      <div className={style.timeInfo}>
        <h1>Yhteisö: VRESK</h1>
        <p>
          Päivämäärä: {getOperationDateString(data.startTime)} Aika: {data.time}
        </p>
      </div>
      <Image
        className={style.img}
        src={data?.advancedSettings.image}
        alt="Operation image"
        width={1000}
        height={300}
      />
      <div className={style.operationDescription}>
        <Remark>{data?.description}</Remark>
      </div>
    </div>
  );
}
