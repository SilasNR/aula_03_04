
const { v4: uuidv4 } = require("uuid");
const UserService = require('./user.service');
const userService = new UserService();
const UserDTO = require("./user.dto.js");
const { GenericException } = require("../generic-exception.js");


class UserController {
    createUser(req, res) {
        req.body.id = uuidv4()
        try {
            const user = userService.create(new UserDTO(req.body));
            res.json(user);
            
        } catch (error) {
            console.log(error.message);
            res.status(400).send({msg: error.message});
            
        }
    }

    getAllUsers(req, res) {
        const users = userService.findAll();
        res.json(users);
    }

    getUserById(req, res) {
        const { id } = req.params;
        const user = userService.findOne(id);

        if(!user) {
            return res.status(404).send('register not found');
        }
        res.json(user);
    }

    updateUser(req, res) {
        const { id } = req.params;
        const { email, password } = req.body;
        const updatedUser = userService.update(id, email, password);
        if(!updatedUser) return res.status(404).send('User not found');
        res.status(200).json(updatedUser);
    }

    deleteUser(req, res) {
        const { id } = req.params;
        const result = userService.remove(id);
        if(!result) return res.status(404).send('User not found');
        res.status(204).send();
    }
}

module.exports = UserController;
