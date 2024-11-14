#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "GNXS-5G-187544"
#define WIFI_PASSWORD "B43D08187544"

// Insert Firebase project API Key
#define API_KEY "AIzaSyCn4ePpLlPxhUhf_bsMb4uTm121kUmfIjk"

// Insert RTDB URL
#define DATABASE_URL "https://emotionlights-3760e-default-rtdb.asia-southeast1.firebasedatabase.app"

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

// Variables
bool signupOK = false;

void setup() {
  Serial.begin(115200);
  pinMode(D1, OUTPUT);  // Assign pin D1 for output (GPIO5 on ESP8266)
  pinMode(D0, OUTPUT);  // Assign pin D0 for output (GPIO16 on ESP8266)

  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  // Set Firebase API key and database URL
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Sign up
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Sign up successful");
    signupOK = true;
  } else {
    Serial.printf("Sign up error: %s\n", config.signer.signupError.message.c_str());
  }

  // Set token status callback
  config.token_status_callback = tokenStatusCallback; // See TokenHelper.h

  // Initialize Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && signupOK) {
    // Read color data from Firebase
    if (Firebase.RTDB.getString(&fbdo, "/color")) {  // Get color as string
      if (fbdo.dataType() == "string") {
        String color = fbdo.stringData();
        Serial.println("Color: " + color);
      }
    } else {
      Serial.println("Error fetching color: " + fbdo.errorReason());
    }

    // Read light status from Firebase
    if (Firebase.RTDB.getBool(&fbdo, "/light")) {  // Get light status as boolean
      if (fbdo.dataType() == "boolean") {
        bool lightStatus = fbdo.boolData();
        Serial.println(lightStatus ? "Light is ON" : "Light is OFF");
        digitalWrite(D0, lightStatus ? HIGH : LOW);  // Control pin D0 based on light status
      }
    } else {
      Serial.println("Error fetching light status: " + fbdo.errorReason());
    }
  }
}
