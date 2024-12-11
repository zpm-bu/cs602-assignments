<?php

$pdo = new PDO('mysql:host=localhost;dbname=foo', 'username', 'password');

// First query part
$email = 'test1@bu.edu';
$password = 'boo2foo';

$query = 'INSERT INTO users (email, password) VALUES (:email, :password)';
$statement1 = $pdo->prepare($query);
$statement1->bindParam(':email', $email);
$statement1->bindParam(':password', $password);

$statement1->execute();

// Second query part
$changePasswordTo = 'foo2you!';

$query2 = 'UPDATE users SET password = :password WHERE email = :email';
$statement2 = $pdo->prepare($query2);
$statement2->bindParam(':email', $email);
$statement2->bindParam(':password', $changePasswordTo);

$statement2->execute();
