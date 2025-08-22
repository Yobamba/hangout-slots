"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Event from "../components/Event";
import Header from "../components/Header"

// Define a type for a single event to be saved
interface EventInterface {
    id: string; // Unique ID for each event
    name: string;
    dates: string[];
}

// Define the type for the current form data
interface EventData {
    name: string;
    dates: (Dayjs | null)[];
}

export default function Home() {
	

		// 1. Retrieve data from localStorage on initial load
		const [events, setEvents] = useState<Event[]>([]);
		useEffect(() => {

				// Retrieve existing events from localStorage
				const existingEventsString = localStorage.getItem("events");
				const existingEvents: Event[] = existingEventsString ? JSON.parse(existingEventsString) : [];
		

				function populateEvents() {
				
					setEvents(existingEvents);
				};

				populateEvents();

				const mappedEvents = existingEvents.map((event, index) => {
					return <Event 
					key={index}
					name={event.name}
					dates={event.dates}
					id={event.id}
					
					/>
				})

				}, [])


				

				

				

			if (typeof window !== 'undefined') {
				
				// const savedEventData = localStorage.getItem("eventData");
				// if (savedEventData) {
				// 	const parsedData = JSON.parse(savedEventData);
				// 	// Convert date strings back to Dayjs objects
				// 	const dates = parsedData.dates.map((dateStr: string) => dateStr ? dayjs(dateStr) : null);
				// 	return { name: parsedData.name, dates: dates };
				// }
			}
			
	return (
		<>
	
	<Header headerText="Hangout Slots" />
		<main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
			<h1>Welcome to Hangout Slots</h1>
			{events.length > 0 ? events.map((event, index) => {
				return <Event 
				key={index}
				name={event.name}
				dates={event.dates}
				id={event.id}
				
				/>
			}	) : <h2>Else</h2>}
		</main>
		</>
	);
}



