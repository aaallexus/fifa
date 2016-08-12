App.Router.map(function() {
    this.resource( 'login' ,{ path: '/login' });
    this.resource( 'index' ,{ path: '/' },function(){
        this.resource('user',{path: '/user/:id'},function(){
            this.route('profile', {path:'/'});
            this.route('players', {path:'/players'});
            this.route('friends', {path:'/friends'});
        });
        this.resource('players',{path: '/players'});
        this.resource('myplayers',{path: '/my-players'});
        this.resource('messages',{path: '/messages'});
    });
});
App.Router.reopen({
  location: 'history'
});