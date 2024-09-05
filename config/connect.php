<?php
include '.env';

try {
	$conn = new PDO('mysql:host=' . HOST . ';dbname=' . DATABASE . ';charset=utf8', USERNAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	echo "connection error: " . $e->getMessage();
}
