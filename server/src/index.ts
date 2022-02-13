import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from 'cors'
import * as session from 'express-session'
import * as fs from 'fs';
import * as https from 'https';
import authRouter from './router/authRouter'
import userRouter from './router/userRouter'
import adminRouter from './router/adminRouter'
import axios from 'axios'
createConnection().then(async connection => {
    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');
    // create express app
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }))
    app.use(session({
        secret: 'adsfdghsgeartehetrt',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: true
        }
    }))
    app.get('/image', async (req, res) => {
        const result = await axios.get('https://imsea.herokuapp.com/api/1?q=airport', { withCredentials: false });
        const url = result.data.results[Math.floor(Math.random() * result.data.results.length)];
        return res.json({ url });
    })
    app.use('/auth', authRouter)
    app.use((request, response, next) => {
        const user = (request.session as any).user;
        if (!user) {
            response.sendStatus(401);
            return;
        }
        next();
    });
    app.use('/user', userRouter)
    app.use('/admin', adminRouter)

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)
    server.listen(8000, () => {
        console.log('Server is listening')
    })

}).catch(error => console.log(error));
