import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRoutes from './routes/@type/user.js';
import adminsRoutes from './routes/@type/admin.js';
import filesRoutes from './routes/File/file.js';
import messageRoutes from './routes/message/sendMessage.js'
import { corsMiddleware } from './middleware/cors.js';
import videosRoutes from './routes/video/video.js';
import searchRoutes from './routes/recherche/recherche.js'
import "dotenv/config" 

//db.query (sqlQuery,callBack function (err,result))

const app = express();
const PORT = process.env.PORT || 5000;
app.use(session({
    secret: 'pasSolutionMada',
    resave:true,
    saveUninitialized: true
}))
app.use(corsMiddleware)
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }))
app.use(bodyParser.json());
app.use('/user', usersRoutes);
app.use('/admin' , adminsRoutes);
app.use('/message', messageRoutes);
app.use('/files', filesRoutes);
app.use('/videos',videosRoutes);
app.use('/api',searchRoutes);

app.listen(PORT, () =>{ console.log(`server running on port :htpps://locahost:${PORT}`)});

