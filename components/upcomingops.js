import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./upcomingops.module.css";
import { Remark } from "react-remark";

export default function UpcomingOperations() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://raid-helper.dev/api/v1/event/1059111611333345301")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  console.log(JSON.stringify(data, null, 2));
  if (!data) return <p>No data</p>;
  return (
    <div className={style.operationinfo}>
      <Image
        className={style.img}
        src={data.advancedSettings.image}
        width={1000}
        height={300}
      />
      <div className={style.operationDescription}>
        <Remark>{data.description}</Remark>
      </div>
    </div>
  );
}
