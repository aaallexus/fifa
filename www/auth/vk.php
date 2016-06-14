<?php
require_once "../functions.php";
$client_id='5497420';
$client_secret='sHJ7zU48ujTwAeypCBva';
$redirect_uri='http://fifa-trade.com/auth/vk.php';


function getCountries(){
    $params = array(
            'need_all'=>1,
            'count'=>1000
        );
    $countries = json_decode(file_get_contents('https://api.vk.com/method/database.getCountries' . '?' . urldecode(http_build_query($params))), true);
    print_r($countries);
}

getCountries();

if(isset($_GET['code1212']))
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
            'fields'       => 'uid,first_name,last_name,screen_name,bdate,photo_50,photo_max,city,country',
            'access_token' => $token['access_token']
        );
        $userInfo = json_decode(file_get_contents('https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params))), true);
        $quer = DB()->prepare('SELECT * FROM users WHERE social_id = ? and type_record=2');
        $quer->execute(array($userInfo['response'][0]['uid']));
        $curUser=$userInfo['response'][0];
        $birthday=$curUser['bdate'];
        $temp=explode(".",$birthday);
        if(sizeof($temp)===3)
            $birthday=$temp[2].'-'.$temp[1].'-'.$temp[0];
        else
            $birthday='0000-00-00';
        $date=date('Y-m-d');
        if($user = $quer->fetchColumn())
        {

            $params=array(
                $curUser['first_name'],
                $curUser['last_name'],
                $curUser['photo_50'],
                $curUser['photo_max'],
                $curUser['country'],
                $curUser['city'],
                $birthday,
                $date,
                $curUser['uid']
            );
            $quer = DB()->prepare('update users set name=?, surname=?, photo_small=?, photo_big=?, country_id=?, city_id=?, birthday=?, last_visit=? where social_id = ? and type_record=2');
            $quer->execute($params);
        }
        else
        {
            $fifaVersion=getConfig('default_fifa_version');
            if($fifaVersion==null)
                $fifaVersion=2016;
            $params=array(
                $curUser['uid'],
                '',
                '',
                $curUser['first_name'],
                $curUser['last_name'],
                $curUser['photo_50'],
                $curUser['photo_max'],
                $curUser['country'],
                $curUser['city'],
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
                '',
                '',
                $fifaVersion
            );
            $quer = DB()->prepare('insert into users values(null,2,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0,0,0,?)');
            $quer->execute($params);
        }
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