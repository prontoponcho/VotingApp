import { Mongo } from 'meteor/mongo';

import './methods';

export const Items = new Mongo.Collection('items');

// returns true if on the server
if (Meteor.isServer) {
    // name publication something that makes sense
    Meteor.publish('allItems', function() {
        // Must return a MongoDB cursor, not a record
        // Can restrict number of records or type of info published
        return Items.find({});
    });
}
