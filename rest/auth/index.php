<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
require_once "../functions.php";
$DB=DB();
if(isset($_POST['session_id']) && isset($_POST['login']) && isset($_POST['password']) && $_POST['login']!=='' && $_POST['password']!=='')
{
	$quer = $DB->prepare('SELECT id,login,password, photo_small FROM users WHERE login = ? and type_record=3');
	$quer->execute(array($_POST['login']));
	if($user=$quer->fetch(PDO::FETCH_ASSOC))
	{
		if($user['password']==crypt($_POST['password'],$user['password']))
		{
        	$_SESSION['type_auth']='3';
        	$_SESSION['user_id']=$user['id'];
        	$_SESSION['user_photo']=$user['photo_small'];
        	getCurUser();
		}
	}
}
?>