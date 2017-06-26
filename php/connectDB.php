<?php

include('config.php');

/**
 * @return null|PDO
 */
function db()
{
    $config = [
        "host" => DB_HOST,
        "dbname" => DB_NAME,
        "username" => DB_USER,
        "password" => DB_PASS
    ];

    $db = null;
    try {
        $db = new PDO('mysql:host=' . $config['host']
            . ';dbname=' . $config['dbname']
            . ';charser=utf8',
            $config['username'],
            $config['password']);
    } catch (Exception $e) {

    }

    return $db;
}