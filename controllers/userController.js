const { User } = require('../models');

module.exports = {

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
            const user = await User.findById(req.params.userId);
            
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
            const user = await User.findByIdAndDelete(req.params.userId);

            if (!user) { 
                return res.status(404).json({ message: 'No user with this ID.' });
            }

            await User.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'User and Thoughts deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            const friend = await User.findByIdAndUpdate(
                req.params.friendId,
                { $addToSet: { friends: req.params.userId } },
                { new: true }
            );

            if (!user || !friend) {
                return res.status(404).json({ message: 'No user with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            const friend = await User.findByIdAndUpdate(
                req.params.friendId,
                { $pull: { friends: req.params.userId } },
                { new: true }
            );

            if(!user || !friend) {
                return res.status(404).json({ message: 'No user with that ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}