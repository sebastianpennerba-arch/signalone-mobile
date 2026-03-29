# SignalOne – Mobile Viewer (GitHub Build Ready)

A production-ready mobile viewer for the SignalOne SaaS platform.
Built with **React Native (Expo)** for iOS and Android.

---

## Features

- **Web-based Authentication**: Secure login via `app.signalone.cloud/login`.
- **Secure Token Storage**: Auth tokens are stored in the device's Secure Enclave / Keystore.
- **Read-Only Dashboard**: Overview, Insights, and Campaigns screens.
- **Automatic APK Build**: Configured for GitHub Actions to generate an installable APK.

---

## So erhalten Sie Ihre APK (Schritt-für-Schritt für Windows)

Da Sie keine lokale Entwicklungsumgebung haben, nutzt dieses Projekt **GitHub Actions**, um die App in der Cloud zu bauen.

### 1. Repository erstellen
1. Loggen Sie sich bei [GitHub](https://github.com) ein.
2. Erstellen Sie ein neues Repository (z.B. `signalone-mobile`).
3. Laden Sie alle Dateien aus diesem Paket in das Repository hoch.

### 2. Expo Token einrichten (WICHTIG)
Damit GitHub die App bauen kann, benötigt es einen Zugang zu Expo:
1. Erstellen Sie ein kostenloses Konto auf [expo.dev](https://expo.dev).
2. Gehen Sie zu **User Settings** -> **Access Tokens**.
3. Erstellen Sie einen neuen Token und kopieren Sie ihn.
4. Gehen Sie in Ihrem GitHub-Repository zu **Settings** -> **Secrets and variables** -> **Actions**.
5. Klicken Sie auf **New repository secret**.
6. Name: `EXPO_TOKEN` | Value: (Ihr kopierter Token).

### 3. Build starten
1. Klicken Sie in Ihrem GitHub-Repository auf den Reiter **Actions**.
2. Wählen Sie links den Workflow **Build Android APK** aus.
3. Klicken Sie auf **Run workflow**.
4. Sobald der Build fertig ist (ca. 10-15 Min.), finden Sie unter dem Punkt **Artifacts** die Datei `signalone-android-apk`.
5. Laden Sie diese herunter, entpacken Sie sie und installieren Sie die `.apk` auf Ihrem Android-Handy.

---

## API & Sicherheit

- **API URL**: `https://app.signalone.cloud`
- **Auth**: Die App sendet den Token im Header: `Authorization: Bearer <token>`.
- **Fehlerbehandlung**: Wenn der Token abläuft (401 Unauthorized), leitet die App Sie automatisch zurück zum Login-Screen.
- **Stabilität**: Alle Datenfelder sind optional. Die App stürzt nicht ab, wenn Daten fehlen, sondern zeigt Platzhalter an.

---

## Critical Rules

- **Read-only**: Keine Datenänderung möglich.
- **Keine Business-Logik**: Die App zeigt Daten exakt so an, wie sie vom Server kommen.
- **Crash-safe**: Umfangreiche Null-Checks für alle API-Antworten.
