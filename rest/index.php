<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
include 'functions.php';
if(isset($_GET['q']))
{
	$params=explode('/',$_GET['q']);
	switch($params[1])
	{
		case 'getMenu':
			getMenu();
			break;
	}
}
?>
