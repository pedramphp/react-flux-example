'use strict';

var Api = require('../utils/api');
var Reflux = require('reflux');
// use reflux to create our store
var Actions = require('../actions');
var _ = require('lodash');

var Store = Reflux.createStore({
    listenables: [Actions],
    getComments: function(imageId) {
        return Api.get('gallery/' + imageId + '/comments')
            .then(function(json) {
                this.comments = json.data;
                this.triggerChange();
            }.bind(this));
    },

    triggerChange: function(){
       this.trigger('change', this.comments);
    }
});
module.exports = Store;
