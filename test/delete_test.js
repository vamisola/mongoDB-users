const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(() => done())
    });

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
        });

    it('class method remove', (done) => {
        //Remove a bunch of records with some given criteria
        User.remove({ name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        //find a very particular record
        User.findOneAndRemove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        //no adding object just the raw _id
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            })
    });
});