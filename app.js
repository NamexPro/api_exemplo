import * as dotenv from 'dotenv'
dotenv.config()
import dayjs from 'dayjs'
import express from 'express'
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from "body-parser";
import cors from "cors"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/healthy', async function (req, res) {

    let data = dayjs().subtract(1,'year').format('DD-MM-YYYY HH:mm:ss')
    let response = {
        "status": true,
        "date": data
    }

    await res.status(200).json(response)
     
})

app.post('/create-user', function (req, res) {

    let conteudo = req.body
    conteudo = JSON.stringify(conteudo)

    let uuidCode = uuidv4()

    fs.writeFile(`./files/${uuidCode}.txt`, conteudo, function (err) {
        if (err) throw err
    });

    res.status(201).send('ok')

})

app.listen(3000)
