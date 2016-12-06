const assert = require('assert');//import assertion library - to make assertion of it block
const User = require('../src/user');

describe('Creating records', () => { //testing in creating records - to make sure that our user model can create record in the database
    it('saves a user', (done) => {
        const joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => {
                //has joe been saved succesfully?
                assert(!joe.isNew);
                done();//assert to look at isNew flag
            });
    });
});