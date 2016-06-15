<?php
	$quer = DB()->prepare('select * from users where id=? limit 1');
	$quer->execute(array($_SESSION['user_id']));
	$user=$quer->fetch(PDO::FETCH_ASSOC);
	print_r($user);
?>
<div class='row'>
	<div class='col-md-4'>
		<div class='row'>
			<img class='user-photo' src="<?php echo $user['photo_big']?>">
		</div>
	</div>
	<div class='col-md-8'>
		<div class='row'>
		</div>
	</div>
</div>