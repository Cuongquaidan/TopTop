const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
  reporter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedPost: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  reason: {
  type: String,
  enum: [
    'nudity',
    'violence',
    'harassment',
    'false_info',
    'hate_speech',
    'spam',
    'illegal',
    'other'
  ],
  required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'action_taken'],
    default: 'pending'
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  action: {
    type: String,
    enum: ['none', 'restrict_post', 'restrict_user', 'delete_post', 'ban_user'],
    default: 'none'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});


const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;

