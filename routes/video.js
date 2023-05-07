import express from 'express'

import { addVideo, addView, deleteVideo, getVideo, randomVideo, sub, trendVideos, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post("/",verifyToken, addVideo)
router.put("/:id",verifyToken, updateVideo)
router.delete("/:id",verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put('/view/:id', addView)
router.get('/trend', trendVideos)
router.get('/random', randomVideo)
router.get('/sub', verifyToken, sub )

export default router;