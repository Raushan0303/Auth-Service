const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const {user} = require('./models/index');
// const bcrypt = require('bcrypt');

const app = express();


const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async()=>{
        console.log(`server started at Port: ${PORT} `);

        // const incomingPassword = '123456';
        // const users = await user.findByPk(2);
        // const response = bcrypt.compareSync(incomingPassword, users.password);
        // console.log(response);
    });
}


prepareAndStartServer();