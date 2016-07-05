App.Router.map(function() {
    this.resource( 'login' ,{ path: '/login' });
    this.resource( 'index' ,{ path: '/' },function(){
        this.resource('user',{path: '/user/:id'},function(){
            this.route('edit', {path:'/:id'});
        });
    });
});
App.Router.reopen({
  location: 'history'
});