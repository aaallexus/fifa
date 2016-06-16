<?php

?>
<ul class='form-horizontal'>
    <li class="dropdown staus-bar btn-notifi">
        <a class="dropdown-toggle account" id='showRightMenu' href="#">
            <img class='userpic' src="<?php echo $_SESSION['user_photo']?>">Пользователь
        </a>
        <div class="dropdown-menu pull-right login-form">
        	<ul class='user-menu'>
        		<li><a href="/id<?php echo $_SESSION['user_id'];?>">Личный кабинет</a></li>
        		<li>Сообщения</li>
        		<li>Мои игроки</li>
        		<li class='divider'></li>
        		<li><a href="?logout">Выход</a></li>
        	</ul>
        </div>
    </li>
</ul>