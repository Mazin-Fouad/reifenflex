<?php
header('Content-Type: application/json');

// CORS headers für lokales Testing
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Für Debug-Zwecke - Log-Datei erstellen
$log_file = 'email_log.txt';
file_put_contents($log_file, "Anfrage erhalten um " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);

$response = ['success' => false, 'message' => ''];

// Überprüfe ob POST-Request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Formular-Daten ins Log schreiben
    file_put_contents($log_file, "POST-Daten: " . print_r($_POST, true) . "\n", FILE_APPEND);
    // Formulardaten sammeln
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $vehicle = filter_input(INPUT_POST, 'vehicle', FILTER_SANITIZE_STRING);
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);
    $time = filter_input(INPUT_POST, 'time', FILTER_SANITIZE_STRING);
    $service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // E-Mail Empfänger
    $to = 'm.fouad@live.de';

    // E-Mail Betreff
    $subject = 'Neue Terminanfrage auf ReifenFlex Website';

    // E-Mail Inhalt
    $email_content = "
        <html>
        <head>
            <title>Neue Terminanfrage</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h2 { color: #e30613; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>Neue Terminanfrage bei ReifenFlex</h2>
                
                <div class='field'>
                    <span class='label'>Name:</span> $name
                </div>
                
                <div class='field'>
                    <span class='label'>E-Mail:</span> $email
                </div>
                
                <div class='field'>
                    <span class='label'>Telefon:</span> $phone
                </div>
                
                <div class='field'>
                    <span class='label'>Fahrzeug:</span> $vehicle
                </div>
                
                <div class='field'>
                    <span class='label'>Wunschtermin:</span> $date
                </div>
                
                <div class='field'>
                    <span class='label'>Uhrzeit:</span> $time
                </div>
                
                <div class='field'>
                    <span class='label'>Reifenservice:</span> $service
                </div>";

    // Falls eine Nachricht vorhanden ist
    if (!empty($message)) {
        $email_content .= "
                <div class='field'>
                    <span class='label'>Zusätzliche Informationen:</span><br>
                    $message
                </div>";
    }

    $email_content .= "
            </div>
        </body>
        </html>
    ";

    // E-Mail Header
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ReifenFlex Webseite <noreply@reifenflex.de>',
        'Reply-To: ' . $email
    ];

    // E-Mail senden versuchen
    $mail_result = false;

    try {
        // Debug-Informationen speichern
        file_put_contents($log_file, "Versuche E-Mail zu senden an: $to\n", FILE_APPEND);

        // Für lokale Entwicklung - immer erfolgreich
        $is_localhost = $_SERVER['SERVER_NAME'] === 'localhost' ||
            $_SERVER['SERVER_NAME'] === '127.0.0.1' ||
            strpos($_SERVER['SERVER_NAME'], 'localhost:') === 0;

        if ($is_localhost) {
            // Im lokalen Modus speichern wir die E-Mail und melden Erfolg
            $email_file = 'email_content_' . date('Y-m-d_H-i-s') . '.html';
            file_put_contents($email_file, $email_content);
            file_put_contents($log_file, "Lokaler Modus: E-Mail in Datei gespeichert: $email_file\n", FILE_APPEND);
            $mail_result = true; // Im lokalen Modus immer erfolgreich
        } else {
            // Auf dem Live-Server wirklich senden
            if (mail($to, $subject, $email_content, implode("\r\n", $headers))) {
                $mail_result = true;
            }
        }
    } catch (Exception $e) {
        file_put_contents($log_file, "Fehler beim E-Mail-Versand: " . $e->getMessage() . "\n", FILE_APPEND);
    }

    if ($mail_result) {
        $response['success'] = true;
        $response['message'] = 'Ihre Anfrage wurde erfolgreich übermittelt. Wir werden Sie telefonisch kontaktieren.';
        file_put_contents($log_file, "E-Mail erfolgreich verarbeitet an: $to\n", FILE_APPEND);
    } else {
        $response['message'] = 'Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.';
        file_put_contents($log_file, "E-Mail konnte nicht gesendet werden\n", FILE_APPEND);
    }
} else {
    $response['message'] = 'Ungültige Anfragemethode. Nur POST-Anfragen sind erlaubt.';
}

echo json_encode($response);
?>