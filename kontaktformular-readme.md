# ReifenFlex Kontaktformular

## E-Mail-Funktionalität

Das Kontaktformular auf der Seite `kontakt.html` ist so konfiguriert, dass es Terminanfragen per E-Mail an `m.fouad@live.de` sendet.

### Wie es funktioniert

1. Das Formular sammelt die vom Benutzer eingegebenen Daten und sendet diese per AJAX an `send-email.php`
2. Das PHP-Script verarbeitet die Anfrage und versucht, eine E-Mail zu senden
3. Bei Erfolg wird dem Benutzer eine Erfolgsmeldung angezeigt

### Lokale Entwicklung

Auf einem lokalen Entwicklungsserver ohne konfigurierten Mail-Server wird das System:

- Versuchen, die `mail()`-Funktion zu nutzen (falls verfügbar)
- Bei Fehlschlag die E-Mail-Inhalte in einer Datei speichern (`email_content_[Zeitstempel].html`)
- Alle Anfragen in einer Log-Datei protokollieren (`email_log.txt`)

### Für die Produktivumgebung

Für den produktiven Einsatz:

1. Stellen Sie sicher, dass der Web-Server über einen konfigurierten Mail-Server verfügt
2. Die Debug-Funktionen in `send-email.php` können für die Produktion entfernt werden:
   - Entfernen Sie die Log-Datei Erstellung
   - Entfernen Sie den Fallback zur Speicherung der E-Mail-Inhalte in Dateien

### Sicherheit

- Das Formular verwendet grundlegende Input-Filterung mit `filter_input`
- Für eine Produktivumgebung sollten weitere Sicherheitsmaßnahmen wie CSRF-Schutz implementiert werden

### Troubleshooting

Bei Problemen mit dem E-Mail-Versand:

- Überprüfen Sie die `email_log.txt` für detaillierte Informationen
- Stellen Sie sicher, dass die E-Mail-Empfängeradresse korrekt ist
- Überprüfen Sie die Server-Konfiguration für den E-Mail-Versand
