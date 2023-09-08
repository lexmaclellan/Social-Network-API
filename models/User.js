const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Invalid email address.'],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },

        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;