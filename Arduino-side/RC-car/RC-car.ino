#include <SoftwareSerial.h>

SoftwareSerial bt_connection(5,4);
int throttle, steering, data, junk = 0;
bool end = false;

int speed[4] = {0, 85, 170, 255};


void setup() {
  Serial.begin(9600);
  bt_connection.begin(9600);
  Serial.println("start");
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);

}

void loop() {
  if(bt_connection.available()){
    data = bt_connection.peek();
    Serial.println(data);
    if(data == 43){
      end = true;
    }
    if(data < 43 || data > 92){
      data = bt_connection.read();
      throttle = 0;
      steering = 0;
    }
    else if(!end){
      data = bt_connection.read();
      throttle = ((data - 44) % 7) -3;
      steering = ((data - 44) / 7) -3;
    }
    else{
      bt_connection.read();
      throttle = 0;
      steering = 0;
      ++junk;
      if(junk == 19){
        junk = 0;
        end = false;
      }
    }
  }

  int leftIndex, rightIndex;

  if(throttle >= 0){
    leftIndex = throttle + steering;
    rightIndex = throttle - steering;
  }
  else{
    leftIndex = throttle - steering;
    rightIndex = throttle + steering;
  }

  if(leftIndex < 0){
    leftIndex *= -1;
    digitalWrite(8, LOW);
    digitalWrite(7, HIGH);
  }
  else{
    digitalWrite(8, HIGH);
    digitalWrite(7, LOW);
  }
    
  if(rightIndex < 0){
    rightIndex *= -1;
    digitalWrite(10, LOW);
    digitalWrite(9, HIGH);
  }
  else{
    digitalWrite(10, HIGH);
    digitalWrite(9, LOW);
  }

  if(leftIndex < 0)
    leftIndex = 0;
  if(leftIndex > 3)
    leftIndex = 3;
  if(rightIndex < 0)
    rightIndex = 0;
  if(rightIndex > 3)
    rightIndex = 3;

  analogWrite(6, speed[leftIndex]);
  analogWrite(11, speed[rightIndex]);

}
