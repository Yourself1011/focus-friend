#include <SoftwareSerial.h>

SoftwareSerial sSerial(2, 3);

void setup() {
  //   Serial.begin(9600);
  //   while (!Serial) {
  //     ; // wait for serial port to connect. Needed for Native USB only
  //   }

  // set the data rate for the SoftwareSerial port
  sSerial.begin(9600);
  //   sSerial.println("Hello, world?");
}

void loop() {
  int level = analogRead(0);
  sSerial.print(String(level, HEX) + ";");
}