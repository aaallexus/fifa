<?php
require_once "../functions.php";
$client_id='5497420';
$client_secret='sHJ7zU48ujTwAeypCBva';
//$redirect_uri='http://fifa-trade.com/auth/vk.php';
$redirect_uri='http://62.149.25.5:8080/auth/vk.php';
$DB=DB();

function getCountries(){
    $params = array(
            'need_all'=>1,
            'count'=>1000,
            'v'=>'5.52'
        );
    $countries = json_decode(file_get_contents('https://api.vk.com/method/database.getCountries' . '?' . urldecode(http_build_query($params))), true);
    $quer = DB()->prepare('insert into country values(?,?,"")');
    foreach ($countries['response']['items'] as $country) {
        $quer->execute(array($country['id'],$country['title']));
    }
    exit;
}
function getCities(){
    $quer=DB()->query('select * from country');
    $countries=$quer->fetchAll(PDO::FETCH_ASSOC);
    foreach ($countries as $country) {
        $count=0;
        {
            $params = array(
                'need_all'=>1,
                'country_id'=>$country['id'],
                'count'=>1000,
                'offset'=>$count,
                'v'=>'5.52'
            );
            $cities = json_decode(file_get_contents('https://api.vk.com/method/database.getCities' . '?' . urldecode(http_build_query($params))), true);
            $quer = DB()->prepare('insert into city values(?,?,?)');
            foreach ($cities['response']['items'] as $city) {
                $count++;
                $quer->execute(array($city['id'],$country['id'],$city['title']));    
            }
            if($count<=$cities['response']['count'])
            {
                while($count<$cities['response']['count'])
                {
                    $params['offset']=$count;
                    $cities = json_decode(file_get_contents('https://api.vk.com/method/database.getCities' . '?' . urldecode(http_build_query($params))), true);
                    foreach ($cities['response']['items'] as $city) {
                        $count++;
                        $quer->execute(array($city['id'],$country['id'],$city['title']));    
                    }
                }
            }
        }
    }
    exit;
}
//getCountries();
//getCities();
if(isset($_GET['code']))
{
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
            'fields'       => 'uid,first_name,last_name,screen_name,bdate,photo_50,photo_max,photo_max_orig,city,country',
            'access_token' => $token['access_token']
        );
        $userInfo = json_decode(file_get_contents('https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params))), true);
        $quer = $DB->prepare('SELECT id FROM users WHERE social_id = ? and type_record=2');
        $quer->execute(array($userInfo['response'][0]['uid']));
        $curUser=$userInfo['response'][0];
        $birthday=$curUser['bdate'];
        $temp=explode(".",$birthday);
        if(sizeof($temp)===3)
            $birthday=$temp[2].'-'.$temp[1].'-'.$temp[0];
        else
            $birthday='0000-00-00';
        $date=date('Y-m-d');
        $userId=0;
        if($user = $quer->fetchColumn())
        {
            $params=array(
                $curUser['first_name'],
                $curUser['last_name'],
                $curUser['photo_50'],
                $curUser['photo_max_orig'],
                $curUser['country'],
                $curUser['city'],
                $birthday,
                $date,
                $curUser['uid']
            );
            $quer = $DB->prepare('update users set name=?, surname=?, photo_small=?, photo_big=?, country_id=?, city_id=?, birthday=?, last_visit=? where social_id = ? and type_record=2');
            $quer->execute($params);
            $userId=$user;
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
                $curUser['photo_max_orig'],
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
            $quer = $DB->prepare('insert into users values(null,2,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0,0,0,?)');
            $quer->execute($params);
            $userId=$DB->lastInsertId('users');
        }
        //print_r($curUser);
        session_start();
        $_SESSION['type_auth']='2';
        $_SESSION['user_id']=$userId;
        $_SESSION['user_photo']=$curUser['photo_50'];

?>
<script language='javascript'>
    window.location='/';
</script>
<?php
        //print_r($userInfo);

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