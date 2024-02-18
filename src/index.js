const express = require('express');

const {PORT} = require('./config/serverConfig');
const app = express();


const prepareAndStartServer=()=>{

    app.listen(PORT, async()=>{
        console.log(`server started at Port: ${PORT} `);
    });
}


prepareAndStartServer();