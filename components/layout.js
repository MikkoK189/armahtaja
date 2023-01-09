import { useEffect, useState } from "react";
import Image from "next/image";

export default function Layout({ children }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch('/api/background');
      const json = await data.json();
  
      // set state with the result
      setData(json);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])

  if(data) {
    const randomBg = data.directory[Math.floor(Math.random()*data.directory.length)];
    return (
    <div className="layout">
      <div className="bgOverlay" />
      <Image className="bgImage" src={randomBg} width={1920} height={1080} alt="lol"/>
      
      {children}
      <footer className="footer">Haluatko yhteisösi mukaan listaukseen? Ota yhteys MikkoK#8632 Discordissa.</footer>
    </div>
  );}
}
