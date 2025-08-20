import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";

// Define a type for a single event to be saved
interface Event {
    id: string; // Unique ID for each event
    name: string;
    dates: string[];
}

function Event(props: Event) {
    return (
        <Link href={`/event/${props.id}`}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid black", padding: "10px", margin: "10px" }}>
     
            {props.name}
            {props.dates.map((date, index) => (
                <li key={index}>
                   {dayjs(date).format("MMMM D, YYYY, HH:mm")}
                </li>
            ))}

        </div>
        </Link>

    )
}


export default Event