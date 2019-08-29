const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect DB
connectDB();

//init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('/api/room/types', require('./routes/api/room_types'));
app.use('/api/rooms', require('./routes/api/rooms'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/bookings', require('./routes/api/bookings'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started '+PORT));