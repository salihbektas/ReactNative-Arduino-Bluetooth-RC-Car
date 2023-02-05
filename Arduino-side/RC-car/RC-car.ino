#include <SoftwareSerial.h>

SoftwareSerial bt_connection(7,6);
char data;

void setup() {
  Serial.begin(9600);
  bt_connection.begin(9600);
  Serial.println("start");

}

void loop() {
  if(bt_connection.available()){
    data = bt_connection.read();
    Serial.print(data);
  }
}
