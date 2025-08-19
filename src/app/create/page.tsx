"use client";

import { useState, useEffect } from "react";
import { TextField, Box, Typography, Paper } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// Define a type for our event data
interface EventData {
    name: string;
    dates: (Dayjs | null)[];
}

function CreateEventPage() {

    // 1. Retrieve data from localStorage on initial load
    const [eventData, setEventData] = useState<EventData>(() => {
        if (typeof window !== 'undefined') {
            const savedEventData = localStorage.getItem("eventData");
            if (savedEventData) {
                const parsedData = JSON.parse(savedEventData);
                // Convert date strings back to Dayjs objects
                const dates = parsedData.dates.map((dateStr: string) => dateStr ? dayjs(dateStr) : null);
                return { name: parsedData.name, dates: dates };
            }
        }
        // Default initial state if no data is found
        return { name: "", dates: [null] };
    });

    // 2. Save data to localStorage whenever the eventData state changes
    useEffect(() => {
        // Convert Dayjs objects to ISO 8601 strings for storage
        const datesToSave = eventData.dates.map((date: Dayjs | null) => date ? date.toISOString() : null);
        const dataToSave = {
            name: eventData.name,
            dates: datesToSave,
        };
        localStorage.setItem("eventData", JSON.stringify(dataToSave));
    }, [eventData]); // The dependency array ensures this effect runs when eventData changes

    function handleAddDatePicker() {
        setEventData(prevData => ({
            ...prevData,
            dates: [...prevData.dates, null]
        }));
    }

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
            <form>
                <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
                    <Typography variant="h4">Create Event</Typography>
                    <TextField 
                    label="Event Name" 
                    variant="outlined" 
                    fullWidth 
                    value={eventData.name}
                    onChange={handleNameChange}
                />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {eventData.dates.map((date: Dayjs | null | undefined, index: number) => {
                            return (
                                <DateTimePicker 
                                    key={index}
                                    label="Proposed Event Date"
                                    value={date} // Control the component with the state
                                    onChange={(newDate) => handleDateChange(newDate, index)} // Update state on change
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            ); 
                        })}

                        <IconButton onClick={handleAddDatePicker}>
                            <AddIcon />
                        </IconButton>
                    </LocalizationProvider>
                </Box>
            </form>
        </>
    );
}

export default CreateEventPage;