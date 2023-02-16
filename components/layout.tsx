import { ReactElement, useEffect, useState } from "react";
import Sidebar from "./sidebar";

type LayoutProps = {
  children?: ReactElement[] | null;
  home: boolean;
  filterFunction?: Function;
  activeFilters?: string[];
}

type Data = {
  directory: string;
}

export default function Layout ({
  children,
  home,
  filterFunction,
  activeFilters,
} : LayoutProps) {
  const [data, setData] = useState<Data|null>(null);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData  = async () => {
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

  return <div>{children}</div>
}
