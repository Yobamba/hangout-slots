"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextField, Box, Typography, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from 'uuid'; // Import a library for creating unique IDs


// Define a type for a single event to be saved
interface Event {
    id: string; // Unique ID for each event
    name: string;
    dates: string[];
}

// Define the type for the current form data
interface EventData {
    name: string;
    dates: (Dayjs | null)[];
}

function CreateEventPage() {

    // Initialize state for the new event form, starting with a clean slate
    const [eventData, setEventData] = useState<EventData>({
        name: "",
        dates: [null]
    });
    
    // Function to handle saving the event
    const handleSaveEvent = () => {
        // Retrieve existing events from localStorage
        const existingEventsString = localStorage.getItem("events");
        const existingEvents: Event[] = existingEventsString ? JSON.parse(existingEventsString) : [];

        // Prepare the new event to be saved
        const newEvent: Event = {
            id: uuidv4(), // Generate a unique ID
            name: eventData.name,
            dates: eventData.dates.filter(Boolean).map(date => date!.toISOString()),
        };

        // Add the new event to the existing array
        const updatedEvents = [...existingEvents, newEvent];

        // Save the updated array back to localStorage
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        // Clear the form for a new event
        setEventData({
            name: "",
            dates: [null]
        });

        alert("Event saved successfully!");

        
    };


    const handleAddDatePicker = () => {
        setEventData(prevData => ({
            ...prevData,
            dates: [...prevData.dates, null]
        }));
    };

    const handleDateChange = (newDate: Dayjs | null, index: number) => {
        const newDates = [...eventData.dates];
        newDates[index] = newDate;
        setEventData(prevData => ({
            ...prevData,
            dates: newDates
        }));
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventData(prevData => ({
            ...prevData,
            name: e.target.value
        }));
    };

    return (
        <>
            <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
                <Typography variant="h4">Create Event</Typography>
                <TextField 
                label="Event Name" 
                variant="outlined" 
                fullWidth 
                value={eventData.name}
                onChange={handleNameChange}
                sx={{ my: 2 }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {eventData.dates.map((date, index) => (
                        <DateTimePicker 
                            key={index}
                            label="Proposed Event Date"
                            value={date}
                            onChange={(newDate) => handleDateChange(newDate, index)}
                            slotProps={{ textField: { fullWidth: true, sx: { my: 1 } } }}
                        />
                    ))}

                    <IconButton onClick={handleAddDatePicker}>
                        <AddIcon /> Add Another Date
                    </IconButton>

                    <Box sx={{ mt: 2 }}>
                        <Link href="/">
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveEvent}
                            disabled={!eventData.name || eventData.dates.every(d => d === null)}
                        >
                            Save Event
                        </Button>
                        </ Link>


                        <Link href="/">
                            <Button variant="outlined" sx={{ ml: 2 }}>
                                Go to Home
                            </Button>
                        </Link>
                    </Box>

                </LocalizationProvider>
            </Box>
        </>
    );
}

export default CreateEventPage;