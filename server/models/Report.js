const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reporter: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
  reportedUser: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
  reportedPost: {type: mongoose.Schema.Types.ObjectId,ref:'Post'},
  reason: {
    type: String,
    enum: ['nudity', 'violence', 'spam', 'harassment', 'other'],
    required: true
  },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'action_taken'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,ref:'User',
    default: null
  },
  action: {
    type: String,
    enum: ['none', 'warned', 'removed'],
    default: 'none'
  },
  deletedAt:{
    type: Date,
    default: null
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Report=mongoose.model('Report', ReportSchema);
module.exports=Report
