import { getAllCommunities } from "./communities";

export interface EventInterface {
  serverName: string;
  serverId: string;
  slug: string;
  startTime: number;
  id: string;
  endTime: number;
  imageUrl: string;
  title: string;
  signUpsAmount: number;
  description: string;
}

export async function getEventData() : Promise<EventInterface[]> {
  const serverData = await getAllCommunities();

  const eventData = <EventInterface[]>[];
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const beginTime = Date.now()
  let iterator = 0;

  for (const server of serverData) {
    const request = await fetch(
      `https://raid-helper.dev/api/v1/${server.serverId}/events/`,
      {
        method: "post",
        headers: new Headers({
          Authorization: String(process.env[server.slug]),
        }),
      }
    );
    const json = await request.json();
    
    iterator++;
    const upcomingEvents = <EventInterface[]>[];

    if (json.postedEvents?.length > 0) {
      json.postedEvents.forEach((event : EventInterface) => {
        event.serverName = server.name;
        event.serverId = server.serverId;
        event.slug = server.slug;
        upcomingEvents.push(event);
      });
    }

    if(iterator === 4) {
      const timer = 5100 - (Date.now() - beginTime);
      await sleep(timer);
      iterator = 0;
    }

    if (upcomingEvents.length === 0) continue;

    eventData.push(...upcomingEvents);
  }

  eventData.sort((a, b) => a.startTime - b.startTime);

  return eventData;
}
