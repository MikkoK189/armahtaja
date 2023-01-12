import { getAllCommunities } from "./communities";

export async function getEventData() {
  const serverData = await getAllCommunities();

  const eventData = [];
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
    await sleep(1500);
    const upcomingEvents = [];

    if (json.postedEvents?.length > 0) {
      json.postedEvents.forEach((event) => {
        event.serverName = server.name;
        event.serverId = server.serverId;
        event.slug = server.slug;
        upcomingEvents.push(event);
      });
    }

    if (upcomingEvents.length === 0) continue;

    eventData.push(...upcomingEvents);
  }

  eventData.sort((a, b) => a.startTime - b.startTime);

  return eventData;
}
