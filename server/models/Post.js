const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
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
    numOfShare: { type: Number, default: 0 },
    likeList:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    saveList:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    shareList:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date,default:null},
    state:{type:String,enum:['recommended','normal','restricted'],default:'normal'}
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
