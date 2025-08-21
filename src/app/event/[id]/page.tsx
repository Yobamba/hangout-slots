"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import EventDetails from "../../../components/EventDetails";
import Response from "../../../components/Response"


interface EventInterface {
    id: string;
    name: string;
    dates: string[];
}

export default function EventPage() {

  const [existingEvents, setExistingEvents] = useState<EventInterface[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  // const [eventId, setEventId] = useState<string>("");

  const params = useParams();
  const id = params.id as string; // Extract the ID from the URL
  // setEventId(id);

  useEffect(() => {
    const existingEventsString = localStorage.getItem("events");
    const events: EventInterface[] = existingEventsString ? JSON.parse(existingEventsString) : [];
    setExistingEvents(events);
    // setEventId(id);
    console.log("event id", id);

    const savedResponses = JSON.parse(localStorage.getItem("responses") || "[]");
    setResponses(savedResponses);
    console.log("saved ", savedResponses);

    
  }, []);

  const currentEvent = existingEvents.find(event => event.id === id);
  

  return <div>
    <Header headerText={currentEvent?.name || "Event"} />
    <EventDetails 
      responses={responses.length}
      dates={currentEvent?.dates || []}
    />
    <Response eventId={id}/>
 
  </div>;
}