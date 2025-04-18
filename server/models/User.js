const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true,index:true},
    display_name: { type: String, required: true },
    profile_picture: { type: String, default: '' }, // URL ảnh đại diện
    description: { type: String, default: '' },
    blue_tick: { type: Boolean, default: false },
    numOfFolloweds: { type: Number, default: 0 },
    numOfFollowers: { type: Number, default: 0 },
    numOfLikes: { type: Number, default: 0 },
    videos: [{ type: String }],
    saveVideos: [{ type: String }],
    likeVideos: [{ type: String }],
    password:{type:String,required:true,select:false},
    email:{type:String,unique:true,index:true,sparse:true},
    phone:{type:String,unique:true,index:true,sparse:true},
    state:{type:String,enum:['active','restricted','permanently_banned'],default:'active'},
    role:{type:String,enum:['user','admin'],default:'user'},
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date,default:null}
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
