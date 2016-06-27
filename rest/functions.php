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
    if(isset($_SESSION['user_id']))
    {
        echo mysqlPatternToJson('select users.id,users.login,users.name,users.surname,users.photo_big photo,users.birthday,users.date_reg,users.last_visit,city.name city,country.name country,club.name club from users left join city on users.city_id=city.id  left join country on users.country_id=country.id left join club on users.favorite_club=club.id where users.id=? limit 1',array($_POST['id']),false);
    }
}
function logout(){
    unset($_SESSION['user_id']);
    unset($_SESSION['type_auth']);
    unset($_SESSION['user_photo']);
    echo '{"result":"Ok"}';
}
conectToDB();
?>