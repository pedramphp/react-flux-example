var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashhistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Topic = require('./components/topic');
var ImageDetail = require('./components/image-detail');

var Main = require('./components/main');

module.exports = (
    <Router history={new HashHistory}>
        <Route path="/" component={Main}>
            <Route path="/topics/:id" component={Topic}>
            </Route>
            <Route path="/image/:id" component={ImageDetail}>
            </Route>
        </Route>
    </Router>
);
