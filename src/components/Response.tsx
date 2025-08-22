import { Box, Typography, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState} from "react";
import { useRouter } from "next/navigation";
import SuggestTimeSlot from "@/components/SuggestTimeSlot";

interface ResponseProps {
    eventId: string;
}

function Response(props: ResponseProps) {
    const router = useRouter();

    const [respondantame, setName] = useState("");
    const [availability, setAvailability] = useState("");   

    function handleSaveResponse(e: React.FormEvent) {
        e.preventDefault();
        const existingResponses = JSON.parse(localStorage.getItem("responses") || "[]");

        const {eventId} = props

      
   

        const updateResponses = [...existingResponses, { name: respondantame, availability: availability, event: eventId }];
        localStorage.setItem("responses", JSON.stringify(updateResponses));

        alert("Response saved successfully!");



        setName("");
        setAvailability("");

        // Redirect to home page
        router.push("/");


    };
    
  return (
    <>
    <Paper
      elevation={3}
      sx={{
        maxWidth: "600px",
        mx: "auto",
        p: 4,
        mb: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 2 }}
      >
        Your Response
      </Typography>

      <Typography variant="body1" fontWeight="medium" gutterBottom>
        Enter your name and mark your availability:
      </Typography>

      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          required
          label="Your Name"
          name="name"
          variant="outlined"
          value={respondantame}
          onChange={(e) => setName(e.target.value)}

        />

        {/* Availability */}
        <FormControl fullWidth required>
          <InputLabel id="availability-label">Your Availability</InputLabel>
          <Select
            labelId="availability-label"
            id="availability"
            name="availability"
            defaultValue=""
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            label="Your Availability"
            sx={{ mt: 2 }}
          >
            <MenuItem value="">Select your availability...</MenuItem>
            <MenuItem value="not-available">Not Available</MenuItem>
            <MenuItem value="maybe">Maybe</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="preferred">Preferred</MenuItem>
          </Select>
        </FormControl>



        <Button 
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSaveResponse}
        >
            Save Response
        </Button>
      </Box>
    </Paper>

    {availability === "not-available" || availability === "maybe" ? <SuggestTimeSlot /> : null}
    </>
    
  );
  
}

export default Response;
