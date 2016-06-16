<?php
	$quer = DB()->prepare('select users.*, city.name city,country.name country,club.name club from users left join city on users.city_id=city.id  left join country on users.country_id=country.id left join club on users.favorite_club=club.id where users.id=? limit 1');
	$quer->execute(array($_GET['id']));
	if($user=$quer->fetch(PDO::FETCH_ASSOC)) :

	$now=new DateTime();
	$age=$now->diff(new DateTime($user['birthday']));
	$age='('.$age->y.')';
	
?>
<div class='cabinet'>
	<div class='col-md-3'>
		<div class='row'>
			<img class='user-photo' src="<?php echo $user['photo_big']?>">
			<button id='sendMessage'>Написать сообщение</button>
			<button id='addFriend'>Добавить в друзья</button>
		</div>
	</div>
	<div class='col-md-9'>
		<ul class="nav nav-tabs">
	        <li class="active"><a href="#main-tab" data-toggle="tab" aria-expanded="true">Общие</a></li>
	        <li class=""><a href="#dealings-tab" data-toggle="tab" aria-expanded="false">Сделки</a></li>
	        <li class=""><a href="#players-tab" data-toggle="tab" aria-expanded="false">Игроки</a></li>
	        <li class=""><a href="#friends-tab" data-toggle="tab" aria-expanded="false">Друзья</a></li>
	        <li class=""><a href="#settings-tab" data-toggle="tab" aria-expanded="false">Настройки</a></li>
	    </ul>
		<div class="tab-content">
        	<div class="tab-pane active" id="main-tab">
				<?php include 'templates/cabinet/main.php'; ?>
			</div>
			<div class="tab-pane" id="dealings-tab">
				<?php include 'templates/cabinet/dealings.php'; ?>
			</div>
			<div class="tab-pane" id="players-tab">
				<?php include 'templates/cabinet/players.php'; ?>
			</div>
			<div class="tab-pane" id="friends-tab">
				<?php include 'templates/cabinet/friends.php'; ?>
			</div>
			<div class="tab-pane" id="settings-tab">
				<?php include 'templates/cabinet/settings.php'; ?>
			</div>
		</div>
	</div>
</div>
<?php
	endif
?>