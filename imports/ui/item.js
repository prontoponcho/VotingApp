import { Template } from 'meteor/templating';
import { Items } from '../api/items.js';

import './item.html';

Template.item.events({
    'click .vote-one' (event) {
        console.log(this._id);
        Meteor.call('voteOnItem', 'itemOne', this._id);
    },
    'click .vote-two' (event) {
        console.log(this._id);
        Meteor.call('voteOnItem', 'itemTwo', this._id);
    }
});
