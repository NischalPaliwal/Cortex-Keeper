import mongoose from "mongoose";
import bcrypt from "bcrypt";

const contentTypes = ['image', 'video', 'article', 'audio'];

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: contentTypes
    },
    title: {
        type: String,
        required: true
    },
    tags: [tagSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const contentModel = mongoose.model("Content", contentSchema);
const userModel = mongoose.model("User", userSchema);
const tagModel = mongoose.model("Tag", tagSchema);
const linkModel = mongoose.model("Link", linkSchema);

userSchema.pre('save', function(next) {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
});

contentSchema.pre('save', async function(next) {
    const user = await userModel.findById(this.userId);
    if (!user) {
      throw new Error('User does not exist');
    }
    next();
});

export { userModel, contentModel, tagModel, linkModel };