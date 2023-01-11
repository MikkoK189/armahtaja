import { getAllCommunities } from "./communities";

export async function getEventData() {
      const serverData = await getAllCommunities();
    
      const eventData = [];
      const curTime = new Date();
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    
      for (const server of serverData) {
        const request = await fetch(
          `https://raid-helper.dev/api/v1/${server.serverId}/events/`,
          {
            method: "post",
            headers: new Headers({
              Authorization: process.env[server.slug],
            }),
          }
        );
        const json = await request.json();
        const upcomingEvents = [];
    
        if (json.postedEvents?.length > 0) {
          json.postedEvents.forEach((event) => {
            const endTime = new Date(event.endTime * 1000);
    
            // if (endTime > curTime) {
            //   event.serverName = server.serverName;
            //   event.serverId = server.serverId;
            //   upcomingEvents.push(event);
            // }
    
            event.serverName = server.name;
            event.serverId = server.serverId;
            event.slug = server.slug;
            upcomingEvents.push(event);
          });
        }
    
        await sleep(1500);
    
        if (upcomingEvents.length === 0) continue;
    
        eventData.push(...upcomingEvents);
      }
    
      eventData.sort((a, b) => a.startTime - b.startTime);
    
      return eventData;
}