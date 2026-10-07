<?php

declare(strict_types=1);

$host = strtolower((string)($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
$local = in_array(preg_replace('/:\d+$/', '', $host), ['localhost', '127.0.0.1'], true);
$base = dirname(__DIR__, 2);
$privateDir = (string)(getenv('BFF_PRIVATE_DIR') ?: ($local ? $base : $base . '/bff'));
require rtrim($privateDir, '/\\') . '/index.php';
