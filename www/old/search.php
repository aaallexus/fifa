<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
include 'mysql.php';
$ret='';
if(isset($_POST['name']))
{
	if(mb_strlen($_POST['name'],'utf8')>3)
	{
		$quer=mysql_query("select * from player where search_name like '%".$_POST['name']."%' group by base_id");
		$array=array();
		while($query=mysql_fetch_assoc($quer))
		{
			$array[]='{"id":'.$query['base_id'].',"name":"'.$query['name'].'","foto":"'.$query['smallFoto'].'"}';
		}
		$ret.='['.implode(',',$array).']';
	}
	else
	{
		$ret.='[]';
	}
}
echo $ret;
?>