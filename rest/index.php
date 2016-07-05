<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
require_once 'functions.php';
if(isset($_GET['q']))
{
	$params=explode('/',$_GET['q']);
	//sleep(1);
	switch($params[1])
	{
		case 'getMenu':
			getMenu();
			break;
		case 'facebook-auth':
			facebookAuth();
			break;
		case 'getCurUser':
			getCurUser();
			break;
		case 'getUser':
			getUser();
			break;


		case 'addToFriend':
			addToFriend();
			break;

			
		case 'logout':
			logout();
			break;
		case 'getFriends':
			getFriends();
			break;

		default:
			break;
	}
}
else
{
}

?>
