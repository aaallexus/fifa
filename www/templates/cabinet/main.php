<?php
if($user['birthday']==='0000-00-00')
{
	$age='';
}

?>
<div class='row'>
	<div>Мои данные</div>
	<table class='table table-striped'>
		<tr><td>Логин</td><td><?php echo $user['login'];?></td></tr>
		<tr><td>Имя</td><td><?php echo $user['name'];?></td></tr>
		<tr><td>Фамилия</td><td><?php echo $user['surname'];?></td></tr>
		<tr><td>Страна</td><td><?php echo $user['country'];?></td></tr>
		<tr><td>Город</td><td><?php echo $user['city'];?></td></tr>
		<tr><td>Дата рождения</td><td><?php echo showDate($user['birthday'])." ".$age;?></td></tr>
		<tr><td>Регистрация</td><td><?php echo showDate($user['date_reg']);?></td></tr>
		<tr><td>Последнее посещение</td><td><?php echo showDate($user['last_visit']);?></td></tr>
		<tr><td>Любимый клуб</td><td><?php echo $user['club'];?></td></tr>
	</table>
</div>
<div class='row'>
	<div class='col-md-6'>
		<div class='row'>
			<h5 class='title'>Для связи со мной</h5>
		</div>
		<div class='row'><?php echo $user['skype']?></div>
		<div class='row'><?php echo $user['email']?></div>
		<div class='row'><?php echo $user['phone']?></div>
		<div class='row'><?php echo $user['icq']?></div>
	</div>
	<div class='col-md-6'>
		<div class='row'>
			<h5 class='title'>Я в социальных сетях</h5>
		</div>
		<?php
		if($user['facebook']!='')
			echo "<a href='".$user['facebook']."'><img class='social-icon' src='img/facebook.png'></a>";
		if($user['twitter']!='')
			echo "<a href='".$user['twitter']."'><img class='social-icon' src='img/facebook.png'></a>";
		if($user['vkontakte']!='')
			echo "<a href='".$user['vkontakte']."'><img class='social-icon' src='img/vk.png'></a>";
		if($user['googleplus']!='')
			echo "<a href='".$user['googleplus']."'><img class='social-icon' src='img/vk.png'></a>";
		?>
	</div>
</div>