import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import db from './config/db.js';
import session from "express-session";
dotenv.config()
import sequelizeStore from "connect-session-sequelize";

import aturanRoute from "./routes/aturanRoute.js";
import gejalaRoute from "./routes/gejalaRoute.js";
import penyakitRoute from "./routes/penyakitRoute.js";
import rekamRoute from "./routes/rekamRoute.js";
import userRoute from "./routes/userRoute.js";
import diagnosisRoute from "./routes/diagnosisRoute.js";
import authRoute from "./routes/Auth/auth.js";
import {verifyLogin,isAdmin} from "./middleware/authUser.js"

const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
    db : db
});

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'https://localhost:3000'
}))

app.use('/images',express.static('./images'));

app.use(express.json());
app.use(authRoute);
app.use('/aturan',verifyLogin,isAdmin,aturanRoute);
app.use('/gejala',gejalaRoute);
app.use('/penyakit',penyakitRoute);
app.use('/rekam',verifyLogin,rekamRoute);
app.use('/users',userRoute);
app.use('/diagnosis',diagnosisRoute);


// (async() => {
//     await db.sync();
// })();
// store.sync();
app.listen(process.env.APP_PORT, () => {
    console.log(`server running on ${process.env.APP_PORT}`);
});
