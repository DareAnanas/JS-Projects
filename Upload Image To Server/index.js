const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

// Middleware to handle form data
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (request, response) => {
   // Read the list of images from the 'uploads' directory
   const images = fs.readdirSync('uploads');
   response.render('index', { images });
});

app.post('/upload', upload.single('image'), (request, response) => {
   // After successful upload, redirect to the home page
   response.redirect('/');
});

app.get('/uploads/:imageName', (request, response) => {
    const imageName = request.params.imageName;
    response.sendFile(path.join(__dirname, 'uploads', imageName));
})

app.get('/delete/:filename', (req, res) => {
   const filename = req.params.filename;
   const filePath = path.join(__dirname, 'uploads', filename);

   // Delete the file
   fs.unlinkSync(filePath);

   // Redirect to the home page
   res.redirect('/');
});

// Start the server
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});