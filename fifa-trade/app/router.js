import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' },function(){
  	this.route('load');
  	this.route('user', { path: '/id/:id'});
  });
  this.route('load');
});

export default Router;
