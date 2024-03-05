const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');

// const UserService = require('./services/user-service')
const {user, Role} = require('./models/index');
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository')
const app = express();


const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async()=>{
        console.log(`server started at Port: ${PORT} `);

        const u1 = await user.findByPk(3);
        const r1 = await Role.findByPk(2);

        u1.addRole(r1);

        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alter: true});
        //  } 
        // const repo = new UserRepository();

        // const response = await repo.getById(1);
        // console.log(response);
        // const service = new UserService();

        // const newToken = service.createToken({email: 'raushan@admin.com', id: 1});
        // console.log("new token is", newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhdXNoYW5AYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTcwOTU3NTQwNCwiZXhwIjoxNzA5NTc5MDA0fQ.O56yxLNGLO6GUnXH1LQtg7ZepXICzJrBzsZAsTfwOck'
        // const response = service.verifyToken(token);
        // console.log(response);



        // const incomingPassword = '123456';
        // const users = await user.findByPk(2);
        // const response = bcrypt.compareSync(incomingPassword, users.password);
        // console.log(response);
    });
}


prepareAndStartServer();