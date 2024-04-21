#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "test"
#define WIFI_PASSWORD "12345678"

// Insert Firebase project API Key
#define API_KEY ""

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "" 

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

//some importent variables
String sValue, sValue2;
bool signupOK = false;

void setup() {
  Serial.begin(115200);
  pinMode(D1,OUTPUT);
  pinMode(D0,OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  }
  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  Serial.printf("%d",signupOK);
  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && signupOK ) {
if (Firebase.RTDB.getString(&fbdo, "/color")) { // Change getBool to getString
  if (fbdo.dataType() == "string") {      // Check if the fetched data type is string
    String color = fbdo.stringData();     // Use stringData() to get the string value directly
    Serial.println(color);             // Use boolData() to get the boolean value directly     // Use the boolean directly to set pin state
  }
}
    else {
      Serial.println(fbdo.errorReason());
    }
     if (Firebase.RTDB.getBool(&fbdo, "/light")) { // Change getString to getBool
  if (fbdo.dataType() == "boolean") {      // Check if the fetched data type is boolean
    bool a = fbdo.boolData();              // Use boolData() to get the boolean value directly
    Serial.println(a ? "Light is True" : "Light isFalse");  // Print "True" or "False" instead of 1 or 0
    digitalWrite(D0, a ? HIGH : LOW);      // Use the boolean directly to set pin state
  }
}
    else {
      Serial.println(fbdo.errorReason());
    }
  } 
}
