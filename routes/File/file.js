import express from 'express'
import { getDriveFilesAndStoreToDB } from './../../controllers/fileController.js';
import { retrieveFileFromDatabase } from './../../controllers/fileController.js';

const router = express.Router();
router.get('/getFilesFromDabatase',getDriveFilesAndStoreToDB,retrieveFileFromDatabase)

export default router ;
