<?php

declare(strict_types=1);

$host = strtolower((string)($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
$local = in_array(preg_replace('/:\d+$/', '', $host), ['localhost', '127.0.0.1'], true);
$base = dirname(__DIR__, 2);
$privateDir = (string)(getenv('BFF_PRIVATE_DIR') ?: ($local ? $base : $base . '/bff'));
$entry = rtrim($privateDir, '/\\') . '/index.php';
if (!is_file($entry) || !is_readable($entry)) {
    error_log('BFF private entry unavailable: ' . $entry);
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo '{"ok":false,"error":{"code":"bff_private_missing","message":"El BFF privado no esta disponible."}}';
    exit;
}
require $entry;
