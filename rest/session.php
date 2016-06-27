<?php
header('Connection: Keep-Alive');
header('Content-Type: application/json; charset=UTF-8');
header('access-control-allow-origin: *');
session_start();
echo '{"session_id":"'.session_id().'"}';
?>