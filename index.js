import express from 'express'
import 'dotenv/config'
import _db from './db.js'
import { User, Comment, Work, Likes } from './models/models.js'
import cors from 'cors'
import router from './routes/index.js'
import fileUpload from 'express-fileupload'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3004

const app = express()
app.use(cors())
app.use(express.static('./static'))
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)


// app.use(express.static('./build'));
// app.get("*", (req, res) => {
//     // res.writeHead(200, {'Content-Type': 'text/javascript'})
//     res.sendFile(path.resolve(__dirname, "./build/index.html"));
//   });

const start = async () => {
    try {
        await _db.authenticate()
        await _db.sync()
        app.listen(PORT, ()=>console.log(`бэк работает на ${PORT} порту`))
    } catch (err) {
        console.log(err)
    }
}

start()