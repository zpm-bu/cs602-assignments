<?php

try {
    require_once __DIR__ . "database.config.inc";
    $db = new PDO(("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbpass));
    $db.beginTransaction();
    $a = $db->exec("insert …");
    $b = $db->exec("update …");
} catch(PDOException $e) {
    $logger->info("Exception:" . $e->getMessage() );
    $db->rollback();
}
