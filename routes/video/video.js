import express from 'express'

import { getVideoFromYoutubeAndStoreToDB } from '../../controllers/videoController.js';
import { retrieveVideoFromDatabase } from '../../controllers/videoController.js';

const router = express.Router();

router.get('/getVideoFromDabatase',getVideoFromYoutubeAndStoreToDB,retrieveVideoFromDatabase)

export default router ;
