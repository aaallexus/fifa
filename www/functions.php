<?php
include "config/config.php";
function addScript($scripts){
    global $scriptsArray;
    if(!isset($scriptsArray))
        $scriptsArray=array();
    foreach($scripts as $value)
    {
        $scriptsArray[]=$value;
    }
}
function loadScripts(){
    $ret='';
    global $scriptsArray;
    foreach($scriptsArray as $value)
    {
        $ret.='<script src="'.$value.'"></script>'."\n";
    }
    echo $ret;
}
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
function topMenu(){
?>
    <ul>
<?php
    $quer= DB()->query('select * from topmenu order by pos');
    while ($query = $quer->fetch())
    {
        echo "<li><a href=''>".$query['title']."</a></li>";
    }
?>
    </ul>
<?php
}
function showTemplate($url){
    require_once 'routers.php';
    $template='';
    foreach ($routers as $key => $value) {
        $temp=explode('%',$key);
        if(sizeof($temp)==1 && $url==$key)
        {
            $template=$value;
            break;
        }
        if(sizeof($temp)==2)
        {
            if(preg_match('/^'.str_replace('/','\\/',$temp[0]).'/', $url))
            {
                //echo str_replace($temp[0],'',$url);
                $id=preg_replace('/^'.str_replace('/','\\/',$temp[0]).'/', '', $url);
                if(is_numeric($id))
                {
                    $_GET['id']=$id;
                    $template=$value;
                    break;
                }
                
            }
        }
    }
    if($template!='')
    {
        include 'templates/'.$template.'.php';
        if(is_file('controllers/'.$template.'.php'))
            require_once 'controllers/'.$template.'.php';
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

function CheckLogin($base='users')
{
    if(isset($_POST['login']) && isset($_POST['password']))
    {
        $quer=mysql_query("select * from $base where login='".$_POST['login']."' and password=md5('".$_POST['password']."')");
        if($query=mysql_fetch_array($quer))
        {
            $_SESSION['login']=$_POST['login'];
            $_SESSION['password']=md5($_POST['password']);
            $_SESSION['user_id']=$query['id'];
            return true;
        }
        else
            return false;
    }
}
conectToDB();
?>