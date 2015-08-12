'use strict';

var Api = require('../utils/api');
var Reflux = require('reflux');
// use reflux to create our store
var Actions = require('../actions');
var _ = require('lodash');

var Store = Reflux.createStore({
    listenables: [Actions],
    getImages: function(topicId) {

        return Api.get('topics/' + topicId)
            .then(function(responseData) {
                this.images = _.reject(responseData.data, function(image){
                    return image.is_album;
                });

                this.triggerChange();
            }.bind(this));
    },
    // get an image from store
    find: function(imageId){
        var image = _.findWhere(this.images, {
            id: imageId
        });

        if(image){
            return image;
        }else{
            this.getImage(imageId);
            return null;
        }
    },

    // update this.images and if it's successful tire an event
    getImage: function(imageId) {

        return Api.get('gallery/image/' + imageId)
            .then(function(json) {
                if(!json.data || json.data.error){
                    console.error(json);
                    return;
                }
                if(this.images){
                    this.images.push(json.data);
                } else {
                    this.images = [json.data];
                }

                this.triggerChange();
            }.bind(this));
    },

    triggerChange: function(){
       this.trigger('change', this.images);
    }
});
module.exports = Store;
