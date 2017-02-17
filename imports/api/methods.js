import { Meteor } from 'meteor/meteor';
import { Items } from '../api/items';

// checks variables being passed in meteor methods
import { check } from 'meteor/check';

// Register methods for executing on the sever
// that the client can call with Meteor.call('methodName', args)
Meteor.methods({
    createNewItem(itemOne, itemTwo) {
        check(itemOne, String);
        check(itemTwo, String);

        Items.insert({
            itemOne: {
                text: itemOne,
                value: 0
            },
            itemTwo: {
                text: itemTwo,
                value: 0
            }
        });
    },
    voteOnItem(which, id) {
        check(which, String);
        check(id, String);
        let date = new Date();

        if (which === 'itemOne') {
            Items.update(id, {
                $inc: { 'itemOne.value': 1 },
                $set: { lastUpdated: date }
            });
        } else {
            Items.update(id, {
                $inc: { 'itemTwo.value': 1 },
                $set: { lastUpdated: date }
            });
        }

    }
});
