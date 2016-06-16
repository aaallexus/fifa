<?php
require_once "../functions.php";
$client_id='979927728772566';
$client_secret='25b304a08a805c36edad0be86398070a';
$redirect_uri='http://fifa-trade.com/auth/fb.php';
//$redirect_uri='http://62.149.25.5:8080/auth/fb.php';
$DB=DB();
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
			'fields'         => 'birthday,first_name,last_name,email,cover,hometown,location,link',
			'access_token' => $token['access_token']
		);
		$userInfo = json_decode(file_get_contents('https://graph.facebook.com/v2.6/me' . '?' . urldecode(http_build_query($params))), true);
		//print_r($userInfo);
		$city='';
		$country='';
		$city_id=0;
		if(isset($userInfo['location']['id']))
		{
			$params = array(
				'fields'=>'location,name',
				'locale'=>'ru',
				'access_token' => $token['access_token']
			);	
			$cityInfo=json_decode(file_get_contents('https://graph.facebook.com/v2.6/'.$userInfo['location']['id']. '?' . urldecode(http_build_query($params))), true);
			if(isset($cityInfo['name']))
				$city=$cityInfo['name'];
			if(isset($cityInfo['location']['country']))
				$country=$cityInfo['location']['country'];
			$quer = $DB->prepare('SELECT id FROM city WHERE name = ? order by id limit 1');
			$quer->execute(array($city));
			$city_id = $quer->fetchColumn();
		}
		$smallPhotoData = json_decode(file_get_contents('https://graph.facebook.com/v2.6/'.$userInfo['id'].'/picture?type=small&redirect' ), true);
		$smallPhoto=$smallPhotoData['data']['url'];
		$bigPhotoData = json_decode(file_get_contents('https://graph.facebook.com/v2.6/'.$userInfo['id'].'/picture?type=large&redirect'), true);
		$bigPhoto=$bigPhotoData['data']['url'];
		$quer = $DB->prepare('SELECT id FROM users WHERE social_id = ? and type_record=1');
        $quer->execute(array($userInfo['id']));
        $birthday=$userInfo['birthday'];
        $temp=explode("/",$birthday);
        if(sizeof($temp)===3)
            $birthday=$temp[2].'-'.$temp[1].'-'.$temp[0];
        else
            $birthday='0000-00-00';
        $date=date('Y-m-d');
        $userId=0;
        if($user = $quer->fetchColumn())
        {
            $params=array(
                $userInfo['first_name'],
                $userInfo['last_name'],
                $smallPhoto,
                $bigPhoto,
                0,
                $city_id,
                $birthday,
                $date,
                $userInfo['id']
            );
            $quer = $DB->prepare('update users set name=?, surname=?, photo_small=?, photo_big=?, country_id=?, city_id=?, birthday=?, last_visit=? where social_id = ? and type_record=1');
            $quer->execute($params);
            $userId=$user;
        }
        else
        {
        	$fifaVersion=getConfig('default_fifa_version');
            if($fifaVersion==null)
                $fifaVersion=2016;
            $params=array(
                $userInfo['id'],
                '',
                '',
                $userInfo['first_name'],
                $userInfo['last_name'],
                $smallPhoto,
                $bigPhoto,
                0,
                $city_id,
                $birthday,
                $date,
                $date,
                0,
                '',
                '',
                '',
                '',
                '',
                '',
                $userInfo['link'],
                '',
                $fifaVersion
            );
            $quer = $DB->prepare('insert into users values(null,1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0,0,0,?)');
            $quer->execute($params);
            $userId=$DB->lastInsertId('users');
        }
        session_start();
        $_SESSION['type_auth']='1';
        $_SESSION['user_id']=$userId;
        $_SESSION['user_photo']=$smallPhoto;
?>
<script language='javascript'>
    window.location='/';
</script>
<?php

	}
}
else
{
	$params = array(
	    'client_id'     => $client_id,
	    'redirect_uri'  => $redirect_uri,
	    'response_type' => 'code',
	    'scope'         => 'user_location,user_hometown'
	);
	header("Location: https://www.facebook.com/dialog/oauth?".urldecode(http_build_query($params)));
}
?>