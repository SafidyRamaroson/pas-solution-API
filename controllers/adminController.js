import{ connection } from './../database/connection.js';
//method post
export const createAdmin = (req,res) =>{
    const { name , email, password } = req.body;

    connection.query(
        'INSERT INTO admin (name, email , password) VALUES (?, ?, ?)',
        [name, email , password ],
        (err, result) => {
            if(err) {
                console.error("Error occured through insertion");
            }else {
                res.status(201).json({
                    message:"Admin created successfully"
                })
            }
        }
    )
}



