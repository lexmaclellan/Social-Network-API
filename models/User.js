const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            default: "New User",
        },

        email: {
            type: String,
            required: true,
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
            },

        ]

    }
)

const User = model('user', userSchema);

module.exports = User;