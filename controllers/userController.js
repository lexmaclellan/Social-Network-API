const { User } = require('../models');

module.export = {

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID.' });
                }

                res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) { 
                res.status(404).json({ message: 'No user with this ID.' });
            }

            //await User.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'User and Thoughts deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}