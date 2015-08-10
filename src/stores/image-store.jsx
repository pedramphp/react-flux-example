var Api = require('../utils/api');
var Reflux = require('reflux');
// use reflux to create our store
var Actions = require('../actions');

var Store = Reflux.createStore({
    listenables: [Actions],
    getImages: function(topicId) {

        return Api.get('topics/' + topicId)
            .then(function(responseData) {
                this.images = responseData.data;
                this.triggerChange();
            }.bind(this));
    },

    triggerChange: function(){
        this.trigger('change', this.images);
    }
});
module.exports = Store;
