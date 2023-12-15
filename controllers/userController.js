import { query } from 'express';
import{ connection } from './../database/connection.js';
import bcrypt, { hash } from 'bcrypt';

//method post
export const createUser = async(req,res) =>{
    const { name , email, password } = req.body;
    const saltRounds = 10 ;

    
    
    try{
        //verifier si l'user existe deja 
        connection.query("SELECT email FROM user WHERE email = ?", [email], (err , result) => {
            if(err){
               return  res.status(500).send("Error occured during the registration");
            }
    
            if(result.length > 0){
                return res.send("User already register")
            }
        })


        const hashedPassword = await bcrypt.hash(password, saltRounds) ;

        const query ="INSERT INTO user (name, email, password) VALUES (?, ? , ?)";

        connection.query(query, [name, email,hashedPassword],  (err, result) =>{
            if(err){
                console.log(err)
                res.status(500).send("Error during the registration");
            }else{
                res.send("successfully registered");
            }
        })
    } catch( error){
        console.error('Erreur:',error);
        res.status(500).send("Error occured during the registration")
    }
    
}

export const login = (req, res) =>{
    const { email, password } = req.body;

    const query = 'SELECT password FROM user WHERE  email= ?';
    connection.query(query,[email],(err, result) =>{
        if(err){
            console.error('Error of request :', err);
            return res.send("error");
        }

        if(result.length === 0){
           return res.status(400).json({
                error:"user not found to the database"
            })
        }

        const user = result[0];

        const passwordMatch = bcrypt.compareSync(password,user.password);

        if(passwordMatch) {
            return res.status(200).json({
                        message:"Connected successfully "
                    })
            //  res.send("user is able to enter the website")
        }else{
            return  res.status(400).json({
                error:"user not found to the database"
            })
            // res.send("password'user don't correspond into database");
        }
    })
}


//get all user
export const getUsers = (req, res) => {
    connection.query(
        "SELECT * FROM user ", (err , result) => {
            if(err) {console.error("Error occurred through get users")}
            else{ res.send(result)};
            
        }
    )
}

//get user
export const getUser = (req, res) => {
    const { id } = req.params ;

    connection.query(
        "SELECT * FROM user WHERE id = ? ",[id], (err , result) => {
            if(err) {console.error("Error occurred through get users")}
            else{ res.send(result)};
        }
    )
}
