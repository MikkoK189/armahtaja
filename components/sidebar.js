import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import sidebarStyle from "../styles/sidebar.module.css";
import Link from "next/link";

export default function Sidebar(props) {
  const [data, setData] = useState(null);

  const currentPage = useRouter().query;
  const activeFilters = props.activeFilters || [];
  console.log(activeFilters);

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
            applyFilter(communityData.slug);
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
      <div className={sidebarStyle.sidebar}>
        <div className={sidebarStyle.linksContainer}>
          {!props.home ? (
            <div className={sidebarStyle.listItem}>
              <Link href={"/"}>
                <h3>Etusivulle</h3>
              </Link>
            </div>
          ) : (
            ""
          )}
          <h3>Yhteisöt:</h3>
          {siteContent}
        </div>
        {props.home ? (
          <div className={sidebarStyle.filterContainer}>
            <h3>Suodattimet:</h3>
            <div className={sidebarStyle.filters}>{filters}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
