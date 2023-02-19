#include <SoftwareSerial.h>

SoftwareSerial bt_connection(7,6);
int throttle, steering, data, junk = 0;
bool end = false;

int speed[4] = {0, 120, 185, 255};


void setup() {
  Serial.begin(9600);
  bt_connection.begin(9600);
  Serial.println("start");
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);

}

void loop() {
  if(bt_connection.available()){
    if(bt_connection.peek() == 43){
      end = true;
    }
    if(!end){
      data = bt_connection.read();
      throttle = ((data - 44) % 7) -3;
      steering = ((data - 44) / 7) -3;

      Serial.print(throttle);
      Serial.println(steering);
    }
    else{
      ++junk;
      bt_connection.read();
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
    digitalWrite(12, HIGH);
  }
  else{
    digitalWrite(8, HIGH);
    digitalWrite(12, LOW);
  }
    
  if(rightIndex < 0){
    rightIndex *= -1;
    digitalWrite(9, LOW);
    digitalWrite(13, HIGH);
  }
  else{
    digitalWrite(9, HIGH);
    digitalWrite(13, LOW);
  }

  if(leftIndex < 0)
    leftIndex = 0;
  if(leftIndex > 3)
    leftIndex = 3;
  if(rightIndex < 0)
    rightIndex = 0;
  if(rightIndex > 3)
    rightIndex = 3;

  analogWrite(10, speed[leftIndex]);
  analogWrite(11, speed[rightIndex]);

}
