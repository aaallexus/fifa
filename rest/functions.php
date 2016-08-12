<?php
if(isset($_POST['session_id']))
{
    $session_id=$_POST['session_id'];
}
if(isset($_GET['session_id']))
{
    $session_id=$_GET['session_id'];
}
if(isset($session_id))
{
    session_id($session_id);
    session_start();
}

include "config/config.php";
function getConfig($var){
    //include "config/config.php";
    global $$var;
    if(isset($$var))
        return $$var;
    else
        return null;
}
function conectToDB()
{
    $connection=getConfig('db_connection');
    if($connection!==null)
    {
        switch($connection['type'])
        {
            case 'mysql':
                include 'config/mysql.php';
                break;
            default:
                echo "Type db is wrong";
                exit;
        }
    }
    else
    {
        echo "No config for DB connection";
        exit;
    }
}
function showDate($date){
    $date_format=getConfig('date_format');
    if($date_format==null)
        $date_format='Y-m-d';
    if($date=='0000-00-00')
    {
        return '';
    }
    else
    {
        $temp=explode('-',$date);
        return date($date_format,mktime(12,0,0,$temp[1],$temp[2],$temp[0]));
    }
}
function mysqlRequestToJson($request,$isArray=true){
    
    $array=array();
    $quer= DB()->query($request);
    return mysqlToJson($quer,$isArray);
}
function mysqlPatternToJson($request,$params,$isArray=true,$debug=false){
    $quer = DB()->prepare($request);
    $quer->execute($params);
    if($debug)
        $quer->debugDumpParams();
    return mysqlToJson($quer,$isArray);
}
function mysqlDateFormat($field,$alias=''){
    $formats=array("d.m.Y"=>'%d.%m.%Y');
    $format='%d.%m.%Y';
    $date_format=getConfig('date_format');
    if($alias=='')
        $alias=$field;
    if(isset($formats[$date_format]))
    {
        $format=$formats[$date_format];
    }
    return "DATE_FORMAT(".$field.",'".$format."') ".$alias;
}
function mysqlToJson($quer,$isArray=true){
    $ret='';
    $array=array();
    if($isArray)
        $ret.='[';
    while($query = $quer->fetch(PDO::FETCH_ASSOC))
    {
        $element=array();
        foreach ($query as $key => $value) {
            if(!is_numeric($value) || strpos($value,'+')!==false)
                $value='"'.$value.'"';
            if($value=='""')
                $value='null';
            $element[]='"'.$key.'":'.str_replace("\n","\\n",$value);
        }
        $array[]='{'.implode(',', $element).'}';
        if(!$isArray)
        {
            break;
        }
    }
    if(sizeof($array)>0)
        $ret.=implode(',', $array);
    if($isArray)
        $ret.=']';
    return $ret;
}
function getMenu(){
    echo mysqlRequestToJson("select title,url from topmenu order by pos");
}
function getCurUser(){
    if(isset($_SESSION['user_id']))
    {
        echo mysqlRequestToJson("select id,login,name,surname,photo_small,score from users where id=".$_SESSION['user_id'].' limit 1',false);
    }
    else
    {
        echo "{}";
    }
}
function getUser(){
    if(!isset($_SESSION["user_id"]))
        $_SESSION["user_id"]=0;
    echo mysqlPatternToJson('select users.id,users.login,users.name,users.surname,users.photo_big photo,users.birthday,users.date_reg,users.last_visit,users.score, users.sales, users.bought, users.violation, users.sold, users.skype, users.email, users.phone, users.icq, users.vkontakte, users.facebook, users.googleplus, users.twitter, city.name city,country.name country,club.name club ,friends.status is_friend from users left join city on users.city_id=city.id  left join country on users.country_id=country.id left join club on users.favorite_club=club.id left join friends on ((friends.id1=:id and friends.id2=:id_user) or (friends.id2=:id and friends.id1=:id_user)) where users.id=:id limit 1',array('id'=>$_POST['id'],'id_user'=>$_SESSION["user_id"]),false);
}
function changeLogin(){
    if(isset($_SESSION['user_id']) && isset($_POST['login']))
    {
        $DB=DB();
        $quer = $DB->prepare("select login from users where id=? limit 1");
        $quer->execute(array($_SESSION['user_id']));
        $login = $quer->fetchColumn();
        if($login==null)
        {
            $quer = $DB->prepare("select count(id) from users where login=?");
            $quer->execute(array($_POST['login']));
            $count=$quer->fetchColumn();
            if($count==0)
            {
                $quer = $DB->prepare("update users set login=? where id=? limit 1");
                $quer->execute(array($_POST['login'],$_SESSION['user_id']));
                if($quer->rowCount()>0)
                {
                    echo '{"result":"ok"}';
                }
            }
            else
            {
                errorCode('5.2');
            }
        }
        else
        {
            errorCode('5.1');
        }
    }
}
function getNationsList(){
    echo mysqlRequestToJson("select id,name from fifa_nations order by name");
}
function getLeagueList(){
    echo mysqlRequestToJson("select id,name from fifa_ligues order by name");
}
function getClubList(){
    if(isset($_POST['id_league']))
    {
        echo mysqlPatternToJson("select id,short_name name from fifa_club where id_ligue=? order by name",array($_POST['id_league']));
    }
    else
    {
        echo mysqlRequestToJson("select id,short_name name from fifa_club order by name");
    }
}
function getUserList(){
    echo mysqlRequestToJson("select id,login from users where login!=''");
}
function getPositionList(){
    echo mysqlRequestToJson("select position from player group by position order by position");
}
function addToFriend(){
    if(isset($_POST['id']) && isset($_SESSION['user_id']) && $_POST['id']!=$_SESSION['user_id'])
    {
        $quer = DB()->prepare("select id1 from friends where (id1=:id1 or id2=:id1) and (id2=:id2 or id1=:id2) limit 1");
        $quer->execute(array(
            "id1"=>$_POST['id'],
            "id2"=>$_SESSION['user_id']
        ));
        if($quer->fetch(PDO::FETCH_ASSOC))
        {
            echo '{"result":"Error"}';
        }
        else
        {
            $quer = DB()->prepare("insert into friends values(?,?,0)");
            $quer->execute(array(
                $_POST['id'],
                $_SESSION['user_id']
            ));
            if($quer->rowCount()==1)
            {
                echo '{"result":"Ok1"}';
            }
        }
    }
    else
    {
        errorCode(2);
    }
}
function getFriends(){
    if(isset($_POST['id']))
    {
        echo mysqlPatternToJson('select id,login,photo_small photo,name, sales deals, score from users where id in(select id from ((select id2 id from friends where id1=:id and status=1) union (select id1 id from friends where id2=:id and status=1)) as tbl)',array('id'=>$_POST['id']));
    }
    else
    {
        errorCode(3);
    }
}
function search(){
    $params=array(
        "club_id"=>"player.club_id=",
        "league_id"=>"fifa_ligues.id=",
        "nation_id"=>"player.nation_id=",
        "position_id"=>"player.position=",
        "user_id"=>"users.id=",
        "min_rait"=>"player.raiting>=",
        "max_rait"=>"player.raiting<=",
        "min_speed"=>"player.speed>=",
        "max_speed"=>"player.speed<=",
        "min_shotpower"=>"player.shotpower>=",
        "max_shotpower"=>"player.shotpower<=",
        "min_pass"=>"player.pass>=",
        "max_pass"=>"player.pass<=",
        "min_dribling"=>"player.dribling>=",
        "max_dribling"=>"player.dribling<=",
        "min_defense"=>"player.defense>=",
        "max_defense"=>"player.defense<=",
        "min_price"=>"sales.price>=",
        "max_price"=>"sales.price<="
    );
    $query=array();
    $array=array();
    foreach($params as $name => $field)
    {
        if(isset($_POST[$name]) && $_POST[$name]!='0' && $_POST[$name]!='Все')
        {
            $array[$name]=$_POST[$name];
            $query[]=$field.":".$name;
        }
    }
    //print_r($_POST['position_id']);
    if(sizeof($query)!=0)
        $query="where ".implode(' and ',$query);
    else
        $query='';
    echo mysqlPatternToJson("select player.*, player.mediumFoto photo,player.name,fifa_club.name club,fifa_club.flag club_emblem, fifa_ligues.name league, fifa_nations.flag nation_flag,users.login,users.score user_raiting,sales.price, sales.user_id from sales left join player on (sales.player_id=player.id and sales.status=0) left join fifa_club on (player.club_id=fifa_club.id) left join fifa_ligues on (fifa_club.id_ligue=fifa_ligues.id) left join fifa_nations on(player.nation_id=fifa_nations.id) left join users on(sales.user_id=users.id) ".$query." limit 30",$array);
}
function getPlayers(){
    if(isset($_SESSION['user_id']) || isset($_POST['user_id']))
    {
        $array=array(0);
        if(isset($_SESSION['user_id']))
            $array=array($_SESSION['user_id']);
        if(isset($_POST['user_id']))
            $array=array($_POST['user_id']);
        echo mysqlPatternToJson("select player.*, player.mediumFoto photo,player.name,fifa_club.name club,fifa_club.flag club_emblem, fifa_ligues.name league, fifa_nations.flag nation_flag,users.login,users.score user_raiting,sales.price, sales.user_id, sales.id id_record, DATE_FORMAT(sales.date,'%d.%m.%Y') date_sale from sales left join player on (sales.player_id=player.id and sales.status=0) left join fifa_club on (player.club_id=fifa_club.id) left join fifa_ligues on (fifa_club.id_ligue=fifa_ligues.id) left join fifa_nations on(player.nation_id=fifa_nations.id) left join users on(sales.user_id=users.id) where sales.user_id=? order by id desc",$array);
    }
}
function findPlayers(){
    if(isset($_POST['search']))
    {
        echo mysqlPatternToJson("select player.*, player.smallFoto photo,player.name,fifa_club.name club,fifa_club.flag club_emblem, fifa_ligues.name league, fifa_nations.flag nation_flag from player left join fifa_club on (player.club_id=fifa_club.id) left join fifa_ligues on (fifa_club.id_ligue=fifa_ligues.id) left join fifa_nations on(player.nation_id=fifa_nations.id) where player.search_name like ? order by player.name",array("%".$_POST['search']."%"),true);
    }
}
function getPlayer(){
    if(isset($_POST['id']))
    {
        echo mysqlPatternToJson("select * from player where id=? limit 1",array($_POST['id']),false);
    }
}
function addPlayer(){
    if(isset($_SESSION['user_id']) && $_POST['id'])
    {
        $quer = DB()->prepare("insert into sales values(null,?,?,0,0,?,?)");
        $quer->execute(array(
            $_SESSION['user_id'],
            $_POST['id'],
            $_POST['price'],
            date('Y-m-d')
        ));
        getPlayers();
    }
    else
    {
        errorCode(4);
    }
}
function getCountUnreadMessages(){
    if(isset($_SESSION['user_id']))
    {
        echo mysqlPatternToJson("select count(id) count from messages where id_reciever=? and status=0",array($_SESSION['user_id']),false);
    }
}
function getMessages(){
    if(isset($_SESSION['user_id']) && isset($_POST['id_sender']) && isset($_POST['type']))
    {
        echo mysqlPatternToJson("select id,subject,message,status,".mysqlDateFormat('date').",time from messages where id_reciever=? and id_sender=? and type=? order by date,time",array($_SESSION['user_id'],$_POST['id_sender'],$_POST['type']),true);
    }
}
function getMessageUsers(){
    if(isset($_SESSION['user_id']) && isset($_POST['type']))
    {
        echo mysqlPatternToJson("select users.login,users.id user_id, users.photo_small photo, users.score from messages left join users on(messages.id_sender=users.id) where id_reciever=? and type=? group by id_sender",array($_SESSION['user_id'],$_POST['type']),true);
    }
}
function sendMessageToUser(){
    if(isset($_SESSION['user_id']) && isset($_POST['user_id']) && isset($_POST['message']))
    {
        $quer = DB()->prepare("insert into messages values(null,?,?,'',?,2,0,?,?)");
        $quer->execute(array(
            $_SESSION['user_id'],
            $_POST['user_id'],
            $_POST['message'],
            date('Y-m-d'),
            date('H:i:s')
        ));
        if($quer->rowCount()==1)
        {
            echo '{"result":"Ok"}';
        }
    }
}
function deletePlayer(){
    if(isset($_SESSION['user_id']) && $_POST['id']){
        $quer = DB()->prepare("delete from sales where id=? and user_id=? limit 1");
        $quer->execute(array(
            $_POST['id'],
            $_SESSION['user_id']
        ));
        getPlayers();
    }
}
function errorCode($code='1')
{
    header("HTTP/1.0 404 Not Found");
    echo '{"code":"'.$code.'","message":"'.$code.'"}';
}
function logout(){
    unset($_SESSION['user_id']);
    unset($_SESSION['type_auth']);
    unset($_SESSION['user_photo']);
    echo '{"result":"Ok"}';
}
conectToDB();
?>