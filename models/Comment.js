const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
    replyBody: {
      type: String,
      required: true,
      trim: true
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  }, {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
    required: true,
    trim: true
  },
  commentBody: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [ReplySchema]
  }, {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;