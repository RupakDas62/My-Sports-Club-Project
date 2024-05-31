const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Importing all models
const Player = require('./models/Player');
const ArcheryPlayer = require('./models/ArcheryPlayer');
const ChessPlayer = require('./models/ChessPlayer');
const CricketPlayer = require('./models/CricketPlayer');
const Admin = require('./models/Admin');
const CricketEvent = require('./models/CricketEvent');
const ChessEvent = require('./models/ChessEvent');
const Team = require('./models/Team');
const ArcheryEvent = require('./models/ArcheryEvent');

const bcrypt = require('bcryptjs');
const multer = require('multer');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Importing all routes
const indexRouter = require('./routes/indexRouter');
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');
const searchRouter = require('./routes/searchRouter');
const logoutRouter = require('./routes/logoutRouter');
const adminRouter = require('./routes/adminRouter');
const playerRouter = require('./routes/playerRouter');
const cricketEventRouter = require('./routes/cricketEventRouter');
const chessEventRouter = require('./routes/chessEventRouter');
const archeryEventRouter = require('./routes/archeryEventRouter');
const showEventRouter = require('./routes/showEventRouter');

// Importing middlewares
const { checkAdminAuthorization, checkUserOrAdminAuthorization } = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/Player';

// Connect to MongoDB
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

const mongoStoreInstance = MongoStore.create({
    mongoUrl: MONGODB_URL,
    ttl: 60 * 60 * 24, // session TTL (optional)
});

// Session middleware setup
app.use(session({
    secret: 'verysecret',
    resave: false,
    saveUninitialized: true,
    store: mongoStoreInstance,
    cookie: {
        secure: false, // Change this to true if using HTTPS
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // Expiration time in milliseconds (1 hour in this example)
    }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Use flash messages
app.use(flash());

// Route middleware
app.use('/', indexRouter);
app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', searchRouter);
app.use('/', logoutRouter);
app.use('/', adminRouter);
app.use('/', playerRouter);
app.use('/', cricketEventRouter);
app.use('/', chessEventRouter);
app.use('/', archeryEventRouter);
app.use('/', showEventRouter);

app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
});
