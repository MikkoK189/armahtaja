import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "./sidebar";

export default function Layout({
  children,
  home,
  filterFunction,
  activeFilters,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch("/api/background");
      const json = await data.json();

      // set state with the result
      setData(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  if (data) {
    const randomBg =
      data.directory[Math.floor(Math.random() * data.directory.length)];
    return (
      <div className="layout" 
      style={{
        backgroundImage: `url(${randomBg})`,
      }}>
        <Sidebar
          home={home}
          filterFunction={filterFunction}
          activeFilters={activeFilters}
        />

        {children}
        <footer className="footer">
          Haluatko yhteisösi mukaan listaukseen? Ota yhteys MikkoK#8632
          Discordissa.
        </footer>
      </div>
    );
  }
}
