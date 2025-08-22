import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Paper, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

interface EventDetailsProps {
  responses: number;
  dates: string[];
}

function EventDetails(props: EventDetailsProps) {  
  return (
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
        Event Details
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <PeopleAltIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight="medium">
          Responses: {props.responses}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center">
        <CalendarMonthIcon sx={{ mr: 1 }} />
        <Typography variant="body1" fontWeight="medium">
          Dates: {props.dates.join(", ")}
        </Typography>
      </Box>
    </Paper>
  );
}

export default EventDetails;
