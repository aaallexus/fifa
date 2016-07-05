<?php
if(isset($_POST['session_id']))
{
    session_id($_POST['session_id']);
}
if(isset($_GET['session_id']))
{
    session_id($_GET['session_id']);
}
session_start();

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
function mysqlPatternToJson($request,$params,$isArray=true){
    $quer = DB()->prepare($request);
    $quer->execute($params);
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
    }
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
        echo mysqlRequestToJson("select id,name,surname,photo_small from users where id=".$_SESSION['user_id'].' limit 1',false);
    }
    else
    {
        $sessId=session_id();
        echo '{"result":false,"session_id":"'.$sessId.'"}';
    }
}
function getUser(){
    if(!isset($_SESSION["user_id"]))
        $_SESSION["user_id"]=0;
    echo mysqlPatternToJson('select users.id,users.login,users.name,users.surname,users.photo_big photo,users.birthday,users.date_reg,users.last_visit,city.name city,country.name country,club.name club ,friends.status is_friend from users left join city on users.city_id=city.id  left join country on users.country_id=country.id left join club on users.favorite_club=club.id left join friends on ((friends.id1=:id and friends.id2=:id_user) or (friends.id2=:id and friends.id1=:id_user)) where users.id=:id limit 1',array('id'=>$_POST['id'],'id_user'=>$_SESSION["user_id"]),false);
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
        echo mysqlPatternToJson('select id,login,photo_small photo,name, (sales+bought) deals from users where id in(select id from ((select id2 id from friends where id1=:id and status=1) union (select id1 id from friends where id2=:id and status=1)) as tbl)',array('id'=>$_POST['id']));
    }
    else
    {
        errorCode(3);
    }
}
function errorCode($code='1')
{
    echo '{"result":"Error","code":"'.$code.'"}';
}
function logout(){
    unset($_SESSION['user_id']);
    unset($_SESSION['type_auth']);
    unset($_SESSION['user_photo']);
    echo '{"result":"Ok"}';
}
conectToDB();
?>