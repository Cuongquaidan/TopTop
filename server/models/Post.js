const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    postId: { type: String, required: true, unique: true },//username+Date.now()

    user: {
        username: { type: String, required: true },
        display_name: { type: String, required: true },
        profile_picture: { type: String, required: true },
    },

    caption: { type: String, default: '' },
    tags: [{ type: String }],
    type: { type: String, enum: ['video'], default: 'video' },

    media: {
        url: { type: String, required: true },
        thumbnail: { type: String, required: true },
        duration: { type: Number, default: 0 }, // tính bằng giây
        publicity:{type:String,enum: ['Mọi người','Bạn bè','Chỉ mình bạn'], default: 'Mọi người'},
        location:{type:String,default:''}
    },

    numOfLikes: { type: Number, default: 0 },
    numOfComments: { type: Number, default: 0 },
    numOfSave: { type: Number, default: 0 },
    numOfShare: { type: Number, default: 0 }
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
