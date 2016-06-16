<?php
	session_start();
	if(isset($_GET['logout']))
	{
		unset($_SESSION['user_id']);
		header("Location: .");
	}
	require_once 'functions.php';
	addScript(array(
		'libs/jquery/2.2.4/jquery.min.js',
		'libs/bootstrap/3.3.6/js/bootstrap.js',
		'js/app.js'
	));
?>
<!DOCTYPE html>
<html>
<head>
	<title>Fifa trade</title>
	<link rel="stylesheet" type="text/css" href="libs/bootstrap/3.3.6/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="libs/bootstrap/3.3.6/css/bootstrap-theme.css">
	<link rel="stylesheet" type="text/css" href="css/fonts.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<?php
	include 'templates/main/header.php';
	include 'templates/main/body.php';
	//include 'templates/main/footer.php';
?>
<?php
	loadScripts();
?>
</body>
</html>