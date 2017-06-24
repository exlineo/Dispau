<?php

/**
 * @return null|PDO
 */
function db()
{
    $config = [
        "host" => 'localhost',
        "dbname" => 'exlineodev',
        "username" => 'root',
        "password" => ''
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