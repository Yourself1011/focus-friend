#include <SoftwareSerial.h>

SoftwareSerial sSerial(2, 3);

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Native USB only
  }

  Serial.println("Goodnight moon!");

  // set the data rate for the SoftwareSerial port
  sSerial.begin(9600);
  sSerial.println("Hello, world?");
}

void loop() {
  if (sSerial.available()) {
    int msg = sSerial.read();
    Serial.write(msg);
    sSerial.write(msg);
  }
  if (Serial.available()) {
    int msg = Serial.read();
    Serial.write(msg);
    sSerial.write(msg);
  }
}