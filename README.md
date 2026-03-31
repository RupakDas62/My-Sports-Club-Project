# 🏆 Sports Club Management System

A full-stack web application designed to manage sports club activities including player registration, event organization, and performance tracking across multiple sports.

---

## 🚀 Features

### 🔐 Authentication System
- User Signup & Login (bcrypt hashed passwords)
- Admin Login System
- Session-based authentication
- Flash messages for alerts

### 👤 Player Management
- Register players with profile images
- View all players
- View individual player details
- Edit player details
- Delete players (Admin only)

### 🏏 Multi-Sport Support
Supports:
- Cricket
- Chess
- Archery

Each sport includes custom performance tracking.

### 🏆 Event Management
- Create Cricket, Chess, and Archery events
- Chess auto pairing system
- Team-based Cricket matches
- View all events

### 🔍 Search
- Search players by name

### 📁 File Upload
- Profile image upload using multer

---

## 🛠️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend     | EJS, HTML, CSS, JS |
| Backend      | Node.js, Express.js |
| Database     | MongoDB (Mongoose) |
| Auth         | bcrypt, express-session |
| File Upload  | multer |
| Middleware   | cookie-parser, connect-flash, method-override |

---

## 📂 Project Structure

```
rupakdas62-my-sports-club-project/
├── README.md
├── app.js
├── package.json
│
├── controllers/
│   ├── adminController.js
│   ├── archeryEventController.js
│   ├── chessEventController.js
│   ├── cricketEventController.js
│   ├── indexController.js
│   ├── loginController.js
│   ├── logoutController.js
│   ├── playerController.js
│   ├── searchController.js
│   ├── showEventController.js
│   └── signupController.js
│
├── middlewares/
│   ├── auth.js
│   └── upload.js
│
├── models/
│   ├── Admin.js
│   ├── ArcheryEvent.js
│   ├── ArcheryPlayer.js
│   ├── Campus.js
│   ├── ChessEvent.js
│   ├── ChessPlayer.js
│   ├── CricketEvent.js
│   ├── CricketPlayer.js
│   ├── Player.js
│   └── Team.js
│
├── routes/
│   ├── adminRouter.js
│   ├── archeryEventRouter.js
│   ├── chessEventRouter.js
│   ├── cricketEventRouter.js
│   ├── indexRouter.js
│   ├── loginRouter.js
│   ├── logoutRouter.js
│   ├── playerRouter.js
│   ├── searchRouter.js
│   ├── showEventRouter.js
│   └── signupRouter.js
│
├── public/
│   ├── javascript/
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── loginAdmin.js
│   │   ├── showEvent.js
│   │   └── signup.js
│   │
│   └── stylesheet/
│       ├── index.css
│       ├── login.css
│       ├── loginAdmin.css
│       ├── onePlayer.css
│       └── signup.css
│
├── views/
│   ├── allPlayers.ejs
│   ├── createArcheryEvent.ejs
│   ├── createChessEvent.ejs
│   ├── createCricketEvent.ejs
│   ├── editForm.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── loginAdmin.ejs
│   ├── onePlayer.ejs
│   ├── showEvent.ejs
│   └── signup.ejs
│
├── images/
├── profile pics/
│   ├── abir pic.avif
│   ├── alapan pic.avif
│   ├── aniket pic.avif
│   ├── ankit pic.avif
│   ├── ayush pic.avif
│   ├── bishal pic.avif
│   ├── hadi pic.avif
│   ├── rajib pic.avif
│   ├── ripan pic.avif
│   ├── sandipan pic.avif
│   ├── sayan pic.avif
│   ├── sourav pic.avif
│   ├── souvagya pic.avif
│   ├── spandan pic.avif
│   ├── sumantan pic.avif
│   ├── sumit pic.avif
│   ├── tanmay pic.avif
│   ├── tuhin pic.avif
│   └── virat pic.avif
│
└── uploads/
    └── (uploaded images...)
```
## 🧠 Models

### Player
| Field | Type |
|------|------|
| name | String |
| age | Number |
| gender | String |
| sport | String |
| email | String |
| password | String |
| profileImage | String |

### ArcheryPlayer
| Field | Type |
|------|------|
| basicDetails | ObjectId |
| totalArrowsShot | Number |
| bullsEyes | Number |
| accuracy | Number |

### ChessPlayer
| Field | Type |
|------|------|
| basicDetails | ObjectId |
| gamesPlayed | Number |
| gamesWon | Number |
| rating | Number |

### CricketPlayer
| Field | Type |
|------|------|
| basicDetails | ObjectId |
| runs | Number |
| wickets | Number |
| strikeRate | Number |

### CricketEvent
| Field | Type |
|------|------|
| name | String |
| date | Date |
| teams | ObjectId[] |

### ChessEvent
| Field | Type |
|------|------|
| name | String |
| date | Date |
| pairings | Array |

### ArcheryEvent
| Field | Type |
|------|------|
| name | String |
| date | Date |

### Team
| Field | Type |
|------|------|
| name | String |
| players | ObjectId[] |

### Admin
| Field | Type |
|------|------|
| username | String |
| email | String |
| password | String |

---

## ⚙️ Controllers

- indexController → Homepage
- signupController → Register users
- loginController → Login
- logoutController → Logout
- adminController → Admin login
- playerController → Player CRUD
- searchController → Search players
- cricketEventController → Cricket events
- chessEventController → Chess events & pairing logic
- archeryEventController → Archery events
- showEventController → Show all events

---

## 🛣️ Routes

### Auth
| Method | Route |
|------|------|
| GET | /login |
| POST | /login |
| GET | /signup |
| POST | /signup |
| GET | /logout |

### Player
| Method | Route |
|------|------|
| GET | /player/:id |
| GET | /player/:id/edit |
| PUT | /player/:id/edit |
| DELETE | /player/:id |

### Events
| Method | Route |
|------|------|
| GET | /createCricketEvent |
| POST | /cricketEvent |
| GET | /createChessEvent |
| POST | /createChessEvent |
| GET | /createArcheryEvent |
| POST | /createArcheryEvent |

### Admin
| Method | Route |
|------|------|
| GET | /admin |
| POST | /admin |

### Search
| Method | Route |
|------|------|
| GET | /search |

---

## 🧩 Middlewares

### Auth Middleware
- checkAdminAuthorization → Admin-only access
- checkUserOrAdminAuthorization → User/Admin access

### Upload Middleware
- Uses multer
- Stores files in /uploads

---

## ⚡ Key Functionalities

### Chess Pairing System
- Round-robin pairing
- Handles odd players with "Bye"
- Randomized match generation

### Cricket Event Logic
- Dynamic team creation
- Team references stored in DB

### Archery Events
- Simple event scheduling

---

## ⚙️ Installation

git clone <repo-url>
cd project
npm install

---

## 🌐 Run

npm run dev

---

## ⚠️ Limitations

- Basic UI
- No pagination
- No API versioning
- No test cases

---

## 📌 Future Improvements

- JWT Authentication
- REST API architecture
- Pagination & filters
- Role-based access control
- Cloudinary integration
- Docker deployment

---

## 👨‍💻 Author

Rupak Das
