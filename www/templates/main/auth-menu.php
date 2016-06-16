<ul class='form-horizontal'>
    <li class="dropdown staus-bar btn-notifi">
        <a class="dropdown-toggle account" id='showRightMenu' href="#">
            Войти в систему
        </a>
        <div class="dropdown-menu pull-right login-form">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#auth-tab" data-toggle="tab" aria-expanded="true">Авторизация</a></li>
                <li class=""><a href="#reg-tab" data-toggle="tab" aria-expanded="false">Регистрация</a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="auth-tab">
                    <form method='POST' action="auth/">
                        <div class="row">
                            <input class='form-control' name='login' placeholder="Логин">
                        </div>
                        <div class="row">
                            <input type='password' name='password' class='form-control' placeholder="Пароль">
                        </div>
                        <div class="row">
                            <div class='col-md-8'>
                                <input type='checkbox' id='savePassword'>
                                <label for='savePassword'>Запомнить</label>
                            </div>
                            <div class='col-md-4'>
                                <button class='btn btn-success'>Войти</button>
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class='auth-divider'>
                            <span>
                                или
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <a href="auth/fb.php">Facebook</a>
                        <a href="auth/vk.php">VKontakte</a>
                    </div>
                </div>
                <div class="tab-pane" id="reg-tab">
                    <form method="POST" id='regform' action='auth/reg.php'>
                        <div class="row">
                            <input class='form-control' type='text' name='login' placeholder="Логин">
                        </div>
                        <div class="row">
                            <input type='password' type='text' class='form-control' name='password' placeholder="Введите пароль">
                        </div>
                        <div class="row">
                            <input type='password' type='text' class='form-control' name='repeat_password' placeholder="Повторите пароль">
                        </div>
                        <div class="row">
                            <input class='form-control' type='text' name='email' placeholder="Введите E-mail">
                        </div>
                        <div class="row">
                            <div class='col-md-12'>
                                <input type='checkbox' id="reciveMessage">
                                <label for='reciveMessage'>Я хочу получать уведомления</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class='col-md-12'>
                                <input type='checkbox' id="reciveMessage">
                                <label for='reciveMessage'>Я соглашаюсь с правилами</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class='col-md-12'>
                                <input type='checkbox' id="reciveMessage">
                                <label for='reciveMessage'>Я не робот</label>
                            </div>
                        </div>
                        <div class='col-md-4'>
                            <button class='btn btn-success'>Зарегистрироваться</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </li>
</ul>