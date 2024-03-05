const {user, Role} = require('../models/index');


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
                attributes: [`email`, `id`]
            });
            return users;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getByEmail(userEmail){
        try {
            const users = await user.findOne({where:{
                email: userEmail
            }});
            return users;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async isAdmin(userId) {
        try {
            const users = await user.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return users.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
