var React = require('react');

var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var Actions = require('../actions');
var ReactRouter = require('react-router');

var Topic = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onImageStoreChange')
    ],

    getInitialState: function() {
        return {
            images: []
        }
    },

    componentWillMount: function(){
        Actions.getImages(this.props.params.id);
    },

    componentWillReceiveProps: function(nextProps){
        console.log("nextProps", nextProps);
        Actions.getImages(nextProps.params.id);
    },

    render: function(){
        return <div>
            I am a topic with ID {this.props.params.id}
            {this.renderImages()}
        </div>
    },

    renderImages: function(){
        if(!this.state.images){
            return;
        }

        return this.state.images.slice(0, 20).map(function(image){
            return <img src={image.link} />
        });
    },

    onImageStoreChange: function(event, images) {
        console.log("images", images);
        this.setState({
            images: images
        });
    }
});

module.exports = Topic;
