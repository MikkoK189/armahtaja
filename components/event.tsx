import Image from "next/image"
import Link from "next/link"
import { Remark } from "react-remark"
import style from "./upcomingops.module.css";
import { EventInterface } from "../lib/eventData";
import { getOperationDateString, getOperationTimeString } from "../lib/ops";

type Event = {
    event: EventInterface,
    imageUrl: string | null | undefined;
}


export default function Event({ event, imageUrl } : Event) {
    return (
        <div className={style.operationinfo}>
        {event.imageUrl ? (
        <Image
            className={style.img}
            src={imageUrl ? imageUrl : event.imageUrl}
            alt="Operation image"
            width={1000}
            height={300}
        />
        ) : (
        ""
        )}
        <div className={style.infoContainer}>
        <div className={style.timeInfo}>
            <div className={style.titleSlot}>
            <h1>{event.title}</h1>
            <h1>
                <Link
                className={style.linkSlot}
                href={`/yhteisot/${event.slug}`}
                >
                {event.serverName}
                </Link>
            </h1>
            </div>
            <p>
            {getOperationDateString(event.startTime)}{" "}
            {getOperationTimeString(event.startTime)} Ilmoittautuneita: {event.signUpsAmount}
            </p>
        </div>

        <div className={style.operationDescription}>
            <Remark>{event.description}</Remark>
        </div>
        </div>
    </div>);
}