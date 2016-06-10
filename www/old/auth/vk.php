<?php
$client_id='5497420';
$client_secret='sHJ7zU48ujTwAeypCBva';
$redirect_uri='http://fifa-trade.com/auth/vk.php';
if(isset($_GET['code']))
{
	//header("Location: https://oauth.vk.com/access_token?client_id=5497420&client_secret=sHJ7zU48ujTwAeypCBva&redirect_uri=http://fifa-trade.com/auth/vk.php&code=".$_GET['code']);
	$params = array(
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'code' => $_GET['code'],
        'redirect_uri' => $redirect_uri
    );
    $token = json_decode(file_get_contents('https://oauth.vk.com/access_token'.'?'.urldecode(http_build_query($params))), true);
    if (isset($token['access_token'])) {
        $params = array(
            'uids'         => $token['user_id'],
            'fields'       => 'uid,first_name,last_name,screen_name,sex,bdate,photo_big',
            'access_token' => $token['access_token']
        );
        $userInfo = json_decode(file_get_contents('https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params))), true);
        print_r($userInfo);
    }
}
else
{
	$params = array(
        'client_id' => $client_id,
        'display' => 'popup',
        'scope' => 'friends',
        'redirect_uri' => $redirect_uri
    );
	header("Location: https://oauth.vk.com/authorize?".urldecode(http_build_query($params)));
}
?>