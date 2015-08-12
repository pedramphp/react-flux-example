'use strict';
var React = require('react');
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var TopicList = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onTopicStoreChange')
    ],
    getInitialState: function() {
        return {
            topics: []
        };
    },

    componentWillMount: function(){
        Actions.getTopics();
    },

    render: function(){
        return <div>
            Topic List
            {this.renderTopics()}
        </div>;
    },

    renderTopics: function(){
        return this.state.topics.slice(0, 4).map(function(topic) {
            return <Link to={'/topics/' + topic.id} className='list-group-item' key={topic.id}>
                <h4>{topic.name}</h4>
                <p>{topic.description}</p>

            </Link>;
        });
    },

    onTopicStoreChange: function(event, topics){
        this.setState({
            topics: topics
        });
    }
});

module.exports = TopicList;
