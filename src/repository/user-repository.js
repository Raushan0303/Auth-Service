const {user} = require('../models/index');


class UserRepository{
    async create(data){
        try {
            const users = await user.create(data);
            return users;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async destroy(userId){
        try {
           await user.destroy({
            where:{
                id: userId
            }
           });
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getById(userId){
        try {
            const users = await user.findByPk(userId, {
                attributes: [`email`, `id`, `password`]
            });
            return users;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
