/* jshint node:true */
'use strict';

var _ = require('lodash');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = mongoose.Schema.Types;

/**
 * A role for account to act on a system.
 */
var role_schema = new Schema({

    account: {
        ref: 'Account',
        type: types.ObjectId,
        required: true,
    },

    system: {
        ref: 'System',
        type: types.ObjectId,
        required: true,
    },

    role: {
        enum: ['admin', 'agent', 'user', 'viewer'],
        type: String,
        required: true,
    },

});

role_schema.index({
    account: 1,
    system: 1,
}, {
    unique: true
});

var Role = module.exports = mongoose.model('Role', role_schema);
