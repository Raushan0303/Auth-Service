const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/serverConfig')
const bcrypt = require('bcrypt');

class UserService {
    constructor(){
          this.userRepository = new UserRepository();
    }
    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }catch (error){
            console.log("something went wrong in the service layer");
            throw error;
        }
    }
    async signIn(email, plainPassword){
        try {
            //step 1-> fetch the user using email
            const user = await this.userRepository.getByEmail(email);
            // step 2 -> compare incoming plain password with stores encrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password does not match");
                throw {error: 'Incorrect password'}
            }
            // step 3 -> if password match then create a token and send it to the user
            const newJwt = this.createToken({email: user.email, id: user.id});
            return newJwt;
        } catch (error) {
            console.log("something went wrong in sign in process")
        }

    }
    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;

        } catch (error) {
            
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '5h'});
            return result;
        } catch (error) {
            console.log("something went wrong in the token creation");
            throw error;
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation",error);
            throw error;
        }
    }
    checkPassword(userPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something went wrong in password checking");
            throw error;
        }
    }
    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;