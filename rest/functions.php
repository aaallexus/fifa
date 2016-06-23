<?php
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
function mysqlRequestToJson($request){
    $ret='[';
    $array=array();
    $quer= DB()->query($request);
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
        $ret.=']';
    return $ret;
}

function getMenu(){
    echo mysqlRequestToJson("select title,url from topmenu order by pos");
}
conectToDB();
?>