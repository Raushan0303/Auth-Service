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
            const user = await this.userRepository.findOne(email);
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
}

module.exports = UserService;