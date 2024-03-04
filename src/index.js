const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');


const UserService = require('./services/user-service')
// const {user} = require('./models/index');
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository')
const app = express();


const prepareAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async()=>{
        console.log(`server started at Port: ${PORT} `);
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