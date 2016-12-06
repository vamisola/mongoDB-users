const mongoose = require('mongoose');
const PostSchema = require('./post')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two charactes.'
        },
        required: [true, 'Name is required.']
    }, //global variable
   // postCount: Number,
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');
    //this === joe
    BlogPost.remove({ _id: { $in: this.blogPosts }})
        .then(() => next());
    
});

const User = mongoose.model('user', UserSchema); //where mongo makes it happen //User represents the entire collection of data


module.exports = User;


