const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: "thought"
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }

);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const users = model('user', userSchema);

module.exports = users;
