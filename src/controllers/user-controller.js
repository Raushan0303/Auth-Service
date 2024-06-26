const UserService = require('../services/user-service')
const { response } = require('express');

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
     return res.status(error.statusCode).json({
        message: error.message,
        data: {},
        success: false,
        err: error.explanation
     })
   }
}
const signIn = async(req,res)=>{
    try {
        const response = await userservice.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            success: true,
            message: 'successfully signed in',
            data: response,
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

const isAuthenticated = async(req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        // const isVarified = userservice.verifyToken(token); //{email: '',id: '',exp: ''}
        const response = await userservice.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is authenticated and token is valid'
        });

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
const isAdmin = async(req, res) => {
    try {
        const response = await userservice.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched whether user is admin or not'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}