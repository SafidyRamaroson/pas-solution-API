import{ connection } from './../database/connection.js';

export const storeFileToDatabase = (files) =>{

        console.log (files)
        files.forEach(file =>{
            const {id, name} = file;

            const selectQuery = "SELECT * FROM file WHERE id_file = ?";

            connection.query(selectQuery,[id],(error, results,fields) =>{
                if (error) throw error;

                if (results.length === 0) {
                    const insertQuery = "INSERT INTO file(id_file,file_name,id_type) VALUES (?,?,?)";
                    const values = [id,name,1];
                    connection.query(insertQuery,values,(error , result) => {
                        if(error) throw error;
                        console.log("file inserted");
                    });
                }else{
                    console.log("file already exist");
                }
            });

        });
}