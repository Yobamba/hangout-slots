"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

function CreateEventPage() {
  return (
    <>
  <form>
    <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4">Create Event</Typography>
      <TextField label="Event Name" variant="outlined" fullWidth />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Available From" slotProps={{ textField: { fullWidth: true } }} />
      </LocalizationProvider>
      {/* <Button variant="contained" color="primary" fullWidth>
        Create Event
      </Button> */}
    </Box>
  </form>
  </>)
}

export default CreateEventPage;