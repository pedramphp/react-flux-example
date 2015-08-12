'use strict';
var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');

var ImageStore = require('../stores/image-store');
var Actions = require('../actions');
var ImagePreview = require('./image-preview');

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
        Actions.getImages(nextProps.params.id);
    },

    render: function(){
        return <div className="topic">
            {this.renderImages()}
        </div>
    },

    renderImages: function(){
        if(!this.state.images){
            return;
        }

        return this.state.images.slice(0, 50).map(function(image){
            return <ImagePreview key={image.id} {...image} />;
        });

    },

    onImageStoreChange: function(event, images) {
        this.setState({
            images: images
        });
    }
});

module.exports = Topic;
