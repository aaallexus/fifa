define('fifa-trade/controllers/index', ['exports'], function (exports) {
    exports['default'] = Ember.Controller.extend({
        restUrl: 'http://rest.fifa-trade.com/',
        isLoad: false,
        facebookAuth: function facebookAuth() {
            window.location = this.get('restUrl') + 'auth/fb.php';
        },
        vkAuth: function vkAuth() {
            window.location = this.get('restUrl') + 'auth/vk.php?session_id=' + this.get('sessionId');
        },
        actions: {
            showMenu: function showMenu() {
                var menu = $('#rightMenu');
                menu.show();
                $('<div  class="dialog-background"></div>').insertBefore(menu).click(function () {
                    menu.hide();
                    $(this).remove();
                });
                menu.show();
            },
            goTo: function goTo(router) {
                this.transitionToRoute(router);
            },
            auth: function auth(typeAuth) {
                switch (typeAuth) {
                    case 'facebook':
                        this.facebookAuth();
                        break;
                    case 'vk':
                        this.vkAuth();
                        break;
                }
            },
            goToCabinet: function goToCabinet(id_user) {
                this.transitionToRoute('index.user', id_user);
            },
            logout: function logout() {
                var self = this;
                $.ajax({
                    'url': this.get('restUrl') + 'logout',
                    'type': 'POST',
                    'dataType': 'json',
                    'data': {
                        'session_id': this.get('sessionId')
                    },
                    success: function success(data) {
                        self.transitionToRoute('index');
                        location.reload();
                    }
                });
            }
        }
    });
});