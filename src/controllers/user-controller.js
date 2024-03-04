const UserService = require('../services/user-service')


const userservice = new UserService();

const create = async(req,res)=>{
   try {
    const respone = await userservice.create({
        email: req.body.email,
        password: req.body.password
    });
    return res.status(201).json({
        success: true,
        message: 'successfully created a new user',
        data: respone,
        err: {}
    })
   } catch (error) {
     console.log(error)
     return res.status(500).json({
        message: 'something went wrong',
        data: {},
        success: false,
        err: error
     })
   }
}
const signIn = async(req,res)=>{
    try {
        const response = await userservice.signIn(req.body.email, req.body.password);
        return response;
    } catch (error) {
        console.log(error)
     return res.status(500).json({
        message: 'something went wrong',
        data: {},
        success: false,
        err: error
     })
    }
}

module.exports={
    create,
    signIn
}