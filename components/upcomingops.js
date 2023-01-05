import { getOperationDescription } from "../lib/ops";
import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./upcomingops.module.css";

export default function UpcomingOperations() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://raid-helper.dev/api/v1/event/1059539511094300723")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        (async () => {
          const a = await getOperationDescription(data.description);
          setData((prevData) => {
            return {
              ...prevData,
              formattedDescription: a,
            };
          });
        })();
        setLoading(false);
      });
  }, []);

  console.log(JSON.stringify(data, null, 2));
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  return (
    <div className={style.operationinfo}>
      <Image
        className={style.img}
        src={data.advancedSettings.image}
        width={480}
        height={270}
      />
      <div
        className={style.operationDescription}
        dangerouslySetInnerHTML={{ __html: data.formattedDescription }}
      />
    </div>
  );
}
