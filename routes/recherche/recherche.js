import express from "express";
import {searchDocAndVideo} from './../../middleware/search.js'

const router = express.Router();

router.get('/search',searchDocAndVideo);

export default router;