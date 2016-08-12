<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
require_once 'functions.php';
if(isset($_GET['q']))
{
	$actions=array(
		'getMenu',
		'getCurUser',
		'getUser',
		'getNationsList',
		'getLeagueList',
		'getClubList',
		'getUserList',
		'addToFriend',
		'logout',
		'getFriends',
		'getPositionList',
		'search',
		'findPlayers',
		'getPlayers',
		'getPlayer',
		'addPlayer',
		'deletePlayer',
		'changeLogin',
		'getMessages',
		'getMessageUsers',
		'sendMessageToUser',
		'getCountUnreadMessages'
	);
	$params=explode('/',$_GET['q']);
	if(in_array($params[1],$actions))
	{
		if(function_exists($params[1]))
			$params[1]();
	}
	//sleep(1);
}
else
{
}

?>
