<!DOCTYPE html>
<html>
<?php
	include '../mysql.php';
?>
<head>
	<title>Player</title>
	<style type="text/css">
		table{
			border-collapse: collapse;
		}
		td{
			padding:7px;
		}
		.first-row th{
			font-size:11px;
		}
		.first-row td{
			vertical-align: middle;
			font-size: 16px;
			font-weight: 800;
		}
		td{
			border-bottom:1px solid #000;
			vertical-align: top;
		}

	</style>
</head>
<body>
<table>
<thead>
</thead>
<?php
$quer=mysql_query("select * from player where base_id=".$_GET['id']);
while($query=mysql_fetch_array($quer))
{
	echo "<tr class='first-row'><td rowspan=2><img src='".$query['mediumFoto']."'></td><td rowspan=2>".$query['name']."</td><th>Поз</th><th>Общ</th><th>Скр</th><th>Дрб</th><th>Уд</th><th>Защ</th><th>Прд</th><th>Физ</th></tr>\n";
	echo "<tr class='second-row'><td>".$query['raiting']."</td><td>".$query['position']."</td><td>".$query['speed']."</td><td>".$query['dribling']."</td><td>".$query['shotpower']."</td><td>".$query['defense']."</td><td>".$query['pass']."</td><td>".$query['physical']."</td></tr>\n";
}
?>
<table>
</body>
</html>