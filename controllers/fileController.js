import { google } from 'googleapis';
import { storeFileToDatabase } from '../middleware/storeFileToDatabase.js';
import { connection } from '../database/connection.js';
import fs from 'fs';


export const getDriveFilesAndStoreToDB = async(req,res,next) => {
  
  try{
      const auth = new google.auth.JWT({
        email: process.env.SERVICE_ACCOUNT_EMAIL,
        key: process.env.KEY,
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      
      console.log(auth)
      const drive = google.drive({
          version:"v3",
          auth:auth
        });

      console.log(drive)

      const sharedFolderId ="1Uth8yUMAGgVu4Bu4EylDe6_ULRjTMGN_";

      const response = await drive.files.list({
        q: `'${sharedFolderId}' in parents`, 
        pageSize:10,
        fields:'files(id,name)',
      });

      const files = response.data.files;
      storeFileToDatabase(files);
      next();
    }catch(error){
      console.error(error);
    }
}


export const retrieveFileFromDatabase = (req,res) =>{
  const selectAllQuery = "SELECT id_file,file_name FROM file";

  connection.query(selectAllQuery,(error,results,fields) =>{
     if (error) throw error;

     const filesFromDB = results.map(file => (
        {
        id:file.id_file,
        name:file.file_name
        }
    ))
     res.json({filesFromDB})
  });
}