// routers/playerRouter.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const upload = require('../middlewares/upload'); 

router.get('/player/:id', playerController.getPlayerDetails);
router.get('/player/:id/edit', playerController.getPlayerEditForm);
router.put('/player/:id/edit', upload.single('profileImage'), playerController.updatePlayerDetails);
router.delete("/player/:id/delete", playerController.deletePlayer);

module.exports = router;
