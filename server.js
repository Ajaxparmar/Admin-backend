// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5500;

// app.use(cors());
// app.use(express.json());


// const voiceBotRoutes = require('./routes/voiceBotRoutes');
// app.use('/voicebot', voiceBotRoutes);

// const mongoURI = 'mongodb+srv://thesupermilla:79yhZPP3pIKCsQI9@cluster.bvidkli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected...');
// }).catch(err => {
//   console.error(err.message);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://thesupermilla:79yhZPP3pIKCsQI9@cluster.bvidkli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.error(err.message);
  });

// Multer Storage Setup for File Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); // Folder to save uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    const fixedName = 'demo1.png'; // Fixed filename
    cb(null, fixedName);
  },
});

const upload = multer({ storage });

// Serve static files and uploaded files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Routes for VoiceBot API
const voiceBotRoutes = require('./routes/voiceBotRoutes');
app.use('/voicebot', voiceBotRoutes);

// File Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
