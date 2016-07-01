<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
require_once "../functions.php";
if(isset($_POST['login']) && isset($_POST['password']) && isset($_POST['email']) && $_POST['login']!=='' && $_POST['password']!=='' && $_POST['email']!=='')
{
	$DB=DB();
	$quer = $DB->prepare('SELECT id FROM users WHERE login = ? and type_record=3');
	$quer->execute(array($_POST['login']));
	if(!$quer->fetchColumn())
	{
		$fifaVersion=getConfig('default_fifa_version');
	    if($fifaVersion==null)
	        $fifaVersion=2016;
		$date=date('Y-m-d');
		$salt=substr(md5(date("Ymdhis")),0,8);
		$hash=crypt($_POST['password'],'$1$'.$salt.'$');
	    $params=array(
	        $_POST['login'],
	        $hash,
	        $date,
	        $date,
	        0,
	        $_POST['email'],
	        $fifaVersion
	    );
	    $quer = $DB->prepare('insert into users values(null,3,0,?,?,"","","","","","","0000-00-00",?,?,?,"",?,"","","","","","",0,0,0,0,0,0,?)');
	    $quer->execute($params);
	    $userId=$DB->lastInsertId('users');
        $_SESSION['type_auth']='3';
        $_SESSION['user_id']=$userId;
        $_SESSION['user_photo']='';
        getCurUser();
	}
	else
	{
		echo '{"result":false}';
	}
}
?>