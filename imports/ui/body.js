import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '../api/items.js';

import { Session } from 'meteor/session';

import './body.html';
import './item.js';


Template.body.onCreated(function() {
    // state var limited to the scope of the template
    // useful for interactive UI
    this.state = new ReactiveDict();

    // Subscribe to a DB collection
    Meteor.subscribe('allItems');
});

// can use 'hello' in html to reference JS objects
// useful for rendering things like MongoDB data
// inside the template body.html
Template.body.helpers({
    items() {
        return Items.find({}, {
            limit: 1,
            sort: { lastUpdated: 1 }
        });
    },
    loggedIn() {
        return Meteor.userId();
    },
    showForm() {
        const instance = Template.instance();
        return instance.state.get('showForm');
    },
    bgColor() {
        return Session.get('bgColor');
    }
});

// events for submitting forms, updating content, etc
Template.body.events({
    'click .show-form' (event, instance) {
        Session.set('bgColor', 'green');
        instance.state.set('showForm', true);
    },
    'submit .new-items' (event, instance) {
        // w/out this, the page would refresh on submit
        event.preventDefault();

        // for calling server methods from the client
        Meteor.call('createNewItem', event.target.item1.value, event.target.item2.value, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                instance.state.set('showForm', false);
                // clear form when done
                event.target.item1.value = '';
                event.target.item2.value = '';
            }
        });
    }

});
