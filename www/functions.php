<?php
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
    include "config/config.php";
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
    if(isset($routers[$url]))
    {
        include 'templates/'.$routers[$url].'.php';
        if(is_file('controllers/'.$routers[$url].'.php'))
            require_once 'controllers/'.$routers[$url].'.php';
    }
}
conectToDB();
?>