var Api = require('../utils/api');
var Reflux = require('reflux');
// use reflux to create our store
var Actions = require('../actions');


var Store = Reflux.createStore({
    listenables: [Actions],
    getTopics: function() {

        return Api.get('topics/defaults')
            .then(function(responseData) {
                this.topics = responseData.data;
                this.triggerChange();
            }.bind(this));
    },

    triggerChange: function(){
        this.trigger('change', this.topics);
    }
});
module.exports = Store;
