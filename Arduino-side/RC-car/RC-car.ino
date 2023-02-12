#include <SoftwareSerial.h>

SoftwareSerial bt_connection(7,6);
char data1, data2, d1, d2;
int i = 0;

void setup() {
  Serial.begin(9600);
  bt_connection.begin(9600);
  Serial.println("start");

}

void loop() {
  while(bt_connection.available()){
    ++i;
    if(i % 2 == 0)
      data1 = bt_connection.read();
    else
      data2 = bt_connection.read();
  }
  if(data1 != d1 || data2 != d2){
    Serial.print(data1);
    Serial.println(data2);
    Serial.flush();
    d1 = data1;
    d2 = data2;
  }

}
