<?php

namespace Zacha\Problem4;

require_once __DIR__.'/database.config.php';

$connection = new mysqli($host, $username, $password, $dbName);

if ($connection->connect_error) {
    include 'unrecoverable.include.php';
    exit();
}

echo 'Connected successfully';
