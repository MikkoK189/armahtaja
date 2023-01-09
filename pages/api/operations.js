const servers = [
  {
    serverName: "test",
    key: process.env.test,
    serverId: "1060997064290488360",
  },
  {
    serverName: "Arma Gorillat",
    key: process.env.gorillat,
    serverId: "705083686931923046",
  },
];

export default async function handler(req, res) {
  const eventData = [];
  const curTime = new Date();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  for (const server of servers) {
    const request = await fetch(
      `https://raid-helper.dev/api/v1/${server.serverId}/events/`,
      {
        method: "post",
        headers: new Headers({
          Authorization: server.key,
        }),
      }
    );
    const json = await request.json();
    const upcomingEvents = [];

    if (json.postedEvents?.length > 0) {
      json.postedEvents.forEach((event) => {
        const endTime = new Date(event.endTime * 1000);

        if (endTime > curTime) {
          event.serverName = server.serverName;
          event.serverId = server.serverId;
          upcomingEvents.push(event);
        }
      });
    }

    await sleep(1500);

    if (upcomingEvents.length === 0) continue;

    eventData.push(...upcomingEvents);
  }

  eventData.sort((a, b) => a.startTime - b.startTime);

  if (eventData.length > 0) {
    res.status(200).json(eventData);
  } else {
    res.status(204).json({ message: "No upcoming events found" });
  }
}
