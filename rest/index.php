<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
require_once 'functions.php';
if(isset($_GET['q']))
{
	$params=explode('/',$_GET['q']);
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

		default:
			break;
	}
}
else
{
}

?>
