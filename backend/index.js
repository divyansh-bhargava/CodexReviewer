require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/response')
const cors = require('cors')

const port = process.env.PORT || 3000;

app.use(cors())


app.use(express.json());

app.use('/api/v1/ai', routes);

app.listen( port , ()=>{
    console.log("server start at port no " ,port);
})

app.get('/', (req, res) => {
    res.status(200).json({
        success : true,
        message : "server testing route"
    })
});