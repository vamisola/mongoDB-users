const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => {done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
    });
});


//define a hook
beforeEach((done) => { // done is a magic function in mocha - after collections are dropped mocha runs done
    const {users, comments, blogposts} = mongoose.connection.collections;
    users.drop(() => {
       comments.drop(() => {
           blogposts.drop(()  => {
               done();
           });
       });
    });
});