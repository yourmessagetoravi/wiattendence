const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/attendance', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error', error);
  });

// Define the attendance schema
const attendanceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
});

// Create the attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Define the API route for attendance update
app.post('/attendance', (req, res) => {
  // Create a new attendance record
  const newAttendance = new Attendance();
  newAttendance.save((error) => {
    if (error) {
      console.error('Failed to update attendance', error);
      res.status(500).json({ message: 'Failed to update attendance' });
    } else {
      console.log('Attendance updated successfully');
      res.status(200).json({ message: 'Attendance updated successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
