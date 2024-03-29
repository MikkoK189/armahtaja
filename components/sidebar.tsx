import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import sidebarStyle from "../styles/sidebar.module.css";
import Link from "next/link";


type SidebarProps = {
  activeFilters?: string[];
  filterFunction?: Function;
  home: boolean;
}

type DataItem = {
  serverId: string;
  slug: string;
  logoUrl: string;
  name: string;
}

export default function Sidebar(props: SidebarProps) {
  const [data, setData] = useState<DataItem[]|null>(null);

  const currentPage = useRouter().query;
  const activeFilters = props.activeFilters || [];

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch("/api/communities");
      const json = await data.json();

      // set state with the result
      setData(json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const applyFilter = props.filterFunction;

  if (data) {
    const siteContent = data.map((communityData) => {
      return (
        <Link
          key={communityData.serverId}
          className={
            currentPage?.community === communityData.slug
              ? sidebarStyle.activeListItem
              : sidebarStyle.listItem
          }
          href={`/yhteisot/${communityData.slug}`}
        >
          <Image
            src={communityData.logoUrl}
            width={50}
            height={50}
            alt="Logo"
          />
          <h3>{communityData.name}</h3>
        </Link>
      );
    });

    const filters = data.map((communityData) => {
      return (
        <button
          key={communityData.serverId}
          className={
            activeFilters.includes(communityData.slug)
              ? `${sidebarStyle.filter} ${sidebarStyle.active}`
              : sidebarStyle.filter
          }
          onClick={() => {
            if(applyFilter) applyFilter(communityData.slug);
          }}
        >
          <Image
            src={communityData.logoUrl}
            width={50}
            height={50}
            alt="Logo"
          />
        </button>
      );
    });

    return (
      <aside className={sidebarStyle.sidebar}>
        <nav className={sidebarStyle.linksContainer}>
          {!props.home ? (
            <div className={sidebarStyle.listItem}>
              <Link href={"/"}>
                <h3>Etusivulle</h3>
              </Link>
            </div>
          ) : (
            ""
          )}
          <h2>Yhteisöt:</h2>
          {siteContent}
        </nav>
        {props.home ? (
          <div className={sidebarStyle.filterContainer}>
            <h2>Suodattimet:</h2>
            <div className={sidebarStyle.filters}>{filters}</div>
          </div>
        ) : (
          ""
        )}
      </aside>
    );
  }
  return <div></div>
}
