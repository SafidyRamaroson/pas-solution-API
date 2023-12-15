import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    //folder's storage for uploaded file 
    destination: (req, file , cb) => {
            cb(null , 'uploaded_PDF_File');
    },
    //name of uploaded file on the  server 
    filename: (req, file , cb) => {
        cb(null, file.originalname);
    }
})

export const upload = multer({
    storage,
    fileFilter: (req,file, cb) => {

        //get the extension of file to upload 
        const ext = path.extname(file.originalname);
        // const {categorieFileToUpload} =  req.categorie;

        if(ext != ".pdf"){
            return cb(null,false);
        }

        cb(null,true);
    },
});