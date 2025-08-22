import { useState } from "react";
import { TextField, Box, Typography, Paper, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from 'uuid'; // Import a library for creating unique IDs
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

// Define the type for the current form data
interface EventData {
    name: string;
    dates: (Dayjs | null)[];
}

// Define a type for a single event to be saved
interface Event {
    id: string; // Unique ID for each event
    name: string;
    dates: string[];
}


function SuggestTimeSlot() {

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
        // Initialize state for the new event form, starting with a clean slate
        const [eventData, setEventData] = useState<EventData>({
            name: "",
            dates: [null]
        });
        
  return <Paper
        elevation={3}
        sx={{
          maxWidth: "600px",
          mx: "auto",
          p: 4,
          mb: 2,
          borderRadius: 2,
        }}
      ><Typography 
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 2 }}>Suggest New Time Slot</Typography>
        
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
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveEvent}
                            disabled={!eventData.name || eventData.dates.every(d => d === null)}
                        >
                            Save Event
                        </Button>
                        <Link href="/">
                            <Button variant="outlined" sx={{ ml: 2 }}>
                                Go to Home
                            </Button>
                        </Link>
                    </Box>

                </LocalizationProvider>
        
        </Paper>;



}

export default SuggestTimeSlot;
