import mailer from 'nodemailer';


const receiverEmail = process.env.RECEIVER_EMAIL;
const transporter = mailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:receiverEmail,
        pass:"kwkubansqsmezoxt"
    },
    tls:{
        rejectUnauthorized:false
    }
});



export const sendMessage = (req, res) => {
    const { firstName, lastName , email , subjectEmail, message} = req.body;

    console.log(firstName, lastName, email , subjectEmail, message);
    const data = {
        from :email,
        to : receiverEmail,
        subject :subjectEmail,
        html:`<h1>You receive message from pas solution website</h1>
              <br/>
              <h4>Full Name of the sender:${firstName} ${lastName}</h4>
              <h4>Email sender: ${email} </h4>
              <br/>
              <p> ${message}</p>
            `
    }

    transporter.sendMail(data, (err) =>{
        if(err){
            return res.status(200).send(err);
        }else{
            return res.send("Sending message");
        }
    })
}