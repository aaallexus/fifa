<?php
function DB()
{
	$connection=getConfig('db_connection');
	try {
		/*$db = new PDO('mysql:host='.$connection['host'].';dbname='.$connection['database'], $connection['user'], $connection['password'], array(
			PDO::ATTR_PERSISTENT => true
		));*/
		$db = new PDO('mysql:host='.$connection['host'].';dbname='.$connection['database'], $connection['user'], $connection['password']);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  		$db->exec("set names utf8");
  		return $db;
	}
	catch(PDOException $e) {
    	echo $e->getMessage();
    	exit;
	}
}
function test(){
	$stmt = DB()->query('select * from player limit 2;');
	$query=$stmt->fetchAll(PDO::FETCH_ASSOC);
}
