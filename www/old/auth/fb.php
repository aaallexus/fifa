<?php
$client_id='979927728772566';
$client_secret='25b304a08a805c36edad0be86398070a';
$redirect_uri='http://fifa-trade.com/auth/fb.php';
if(isset($_GET['code']))
{
	$params = array(
        'client_id'     => $client_id,
        'redirect_uri'  => $redirect_uri,
        'client_secret' => $client_secret,
        'code'          => $_GET['code']
    );
    $token = null;
	parse_str(file_get_contents('https://graph.facebook.com/oauth/access_token?' . http_build_query($params)), $token);
	if (count($token) > 0 && isset($token['access_token']))
	{
		$params = array(
			'fields'         => 'birthday,first_name,gender,email,about,age_range,bio,context,cover,currency,is_shared_login',
			'access_token' => $token['access_token']
		);
		$userInfo = json_decode(file_get_contents('https://graph.facebook.com/me' . '?' . urldecode(http_build_query($params))), true);
		print_r($userInfo);
	}
}
else
{
	$params = array(
	    'client_id'     => $client_id,
	    'redirect_uri'  => $redirect_uri,
	    'response_type' => 'code',
	    'scope'         => ''
	);
	header("Location: https://www.facebook.com/dialog/oauth?".urldecode(http_build_query($params)));
}
?>