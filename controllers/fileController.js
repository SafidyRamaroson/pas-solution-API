import { google } from 'googleapis';
import { storeFileToDatabase } from '../middleware/storeFileToDatabase.js';
import { connection } from '../database/connection.js';
import fs from 'fs';


export const getDriveFilesAndStoreToDB = async(req,res,next) => {
  
  try{
      const auth = new google.auth.JWT({
        email:"google-drive-api@pocket-base-407515.iam.gserviceaccount.com",
        key:  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCn7L7EDmoqurUj\nyQDWL7IFcIfxo9xND2Arj3IEEeXaqArIzfut9XDv5Nq2cz529eL+w0l1ihoEna2E\n2RHfCAqWpXaHPXzXPQ6saolMz9cOtSBJJjm0fgzBBNITwy5gs3/Svd1tDEOQZLRN\ni+FPwWahbs4EEg6/cBEvyfRgr9n9/zl9OZVmbJywc37SDmUg+6GHcTvdBCmvZEz1\nJIumjqocZACGmDEiinYRE1WGvfE+ReYiIGEj5JLhF//P0p9X+xD7/GJ2F5+pxaB3\n7/wR975CzAR8jfPodecytYRJNjN6hoTXnwU/dk9lutV2ADfxJVj7dd7CO58WSKSz\n9L2kCgyDAgMBAAECggEAEJ8DeiwZFcCkREtVd13Xh5KjX2ds21MdyEIAXZHDSA4g\n/yOQTqAq0maQasW5FZTx/Rh+/BDe0WfQBdm8hfBpp+PvJE9m53ZmLj+0oQiOIf5g\nmIzy4kAlwAcw9Kl5kjMXgFhbAzusW62ewRw1gYDu889KufwVlJz26TLaqvqiSkcg\nlgAIzlFM6s8YbbzWys/8YF1qSBWgMxDJIkMxbcVe/wdgXFSyH2yuoBQxhzkXS6wN\n1ZwQOfE1xsnn8CM8TWQGJ3ELbttphMbNDo9sx+HdSc1rV7Cc5Rs2aA2I/WDnkugP\n8tnJ3KAIoZLxR6H7rFJgfxRRqYGjudRpSAD1Tu4c1QKBgQDfAw65QpgGJjPffcZP\nWM9rwT68krtQ8zrDSXJ0mt/oY63QcqXyW/iQtiLFNfYWqPEBHJ2Km/IcMwwGUOCi\n/mdDGCSeFRZRfHWA8j47dlC+zZBRopI/qo0yN8sY2dhwphNQIkKFDXfvIMyBrYVs\n5kG8gNqLgieHGIUqEYDMH3cDtwKBgQDAw6pYPEtT353O7hjnbnBluROyKPXcdqOy\n8t7IXH6FPvz/h0C99xYML0QjjEZ+r7F8GulXLBAgL8/rmkYxO+gocVrahA5Ej1fu\nN31NvapA6O9hseVD3vq3J0NU5cioxWAyPs6Y+dHqatITkJMGhElkFEhNTfwC2/Tv\n2QDR0AA1lQKBgG/8yxIA/PJpkLb0I/eIc3B69BQh4up9mc6jPVSMyU+bbpc0W1zf\nDm0s6Tz7If6zC4MxaXNHaEb841bwmj1/Xz90Cj9P+4sj4qXD/7hAa7/E3moAJ0zN\nSmYjWlu6WVQIMb6V1a2W29k7MTcVeeD7p5sPYa+Yxlyy1XwQmgrm6g71AoGBAJdO\nfr13xmD1m7c76UxvwcX2+mDUCfidH21tejWndKA+ivRARC9YbXPu/fsxNnxmiFgz\n/4ivS5EYNopmtEYdEeP85iWzlkd2hLy1zaNiBuuga5YxvxYBRqbRKObQ3yqqkxGd\nfylQntb0NiWpS97Ho5vs17vmRLQx1xcVLLGEJUXpAoGAbob+oCzdK/DkFZWUqySj\nqdO8HdOxKkzkcJOdIPK+euU7fLH2kD1j5PRwW+IggpWLpikU7/jVr+5kgZO1xVC2\n3YCCbwbf30JtO74Jk/c1w7zZA6f9Ubl1UpRpe/7FE8R4D2+KkCi1dFOyWd1+Xuw0\nG7uHRxo3OK8miPL36HT634k=\n-----END PRIVATE KEY-----\n",
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