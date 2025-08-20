"use client";

import { useEffect, useState } from "react";

interface EventInterface {
    id: string;
    name: string;
    dates: string[];
}

export default function EventPage() {
  const [existingEvents, setExistingEvents] = useState<EventInterface[]>([]);

  useEffect(() => {
    const existingEventsString = localStorage.getItem("events");
    const events: EventInterface[] = existingEventsString ? JSON.parse(existingEventsString) : [];
    setExistingEvents(events);
    console.log("Existing Events:", existingEvents);
  }, []);

  return <div>Event Page (View/Participate)</div>;
}