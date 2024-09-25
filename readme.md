<p align="center">
  <img alt="Canavar The color logo" src="./Canavar/assets/icon.png" width="208">
</p>

> [!NOTE]
> If you are looking for a remote control car project that uses Bluetooth, you can check out my other project, [Yaratık](https://github.com/salihbektas/react-native-esp32-bluetooth-RC-car). This project cannot provide a reliable connection due to the power hunger of the HC-06 module.

# Canavar

Canavar (monster in Turkish) is a remote control toy car project that works over bluetooth using react native and arduino.

## Required parts list

[ARDUINO UNO](https://www.amazon.com/Arduino-A000066-ARDUINO-UNO-R3/dp/B008GRTSV6/ref=sr_1_3?keywords=arduino&qid=1695223998&sr=8-3&th=1)

[HC-06 Bluetooth Module ](https://www.amazon.com/DSD-TECH-HC-06-Bluetooth-Raspberry/dp/B074J5WMH1/ref=sr_1_1_sspa?crid=23OWG9K28IDER&keywords=hc+06&qid=1678993542&sprefix=hc+0%2Caps%2C199&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExT1lJNjFVN0lQQ0U3JmVuY3J5cHRlZElkPUEwOTcwODk2MldLVjNJOTBLOEFKNiZlbmNyeXB0ZWRBZElkPUEwNzA1OTA0MUVPV0JTMEhFTVk1QSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=)

[L298N Motor Drive Controller](https://www.amazon.com/Qunqi-Controller-Module-Stepper-Arduino/dp/B014KMHSW6/ref=sr_1_7?crid=179K8ERLOZ22Z&keywords=L298N&qid=1678993275&sprefix=l298n%2Caps%2C204&sr=8-7)

[Car Chassis Kit](https://www.amazon.com/YIKESHU-Smart-Chassis-Encoder-Battery/dp/B075LD4FPN/ref=sr_1_31_sspa?keywords=car+chassis&qid=1678993174&sprefix=car+chas%2Caps%2C203&sr=8-31-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzUVJFNFdaMFhESkgmZW5jcnlwdGVkSWQ9QTA1MjQyMzNHSDQ0S0I2R1RUNVcmZW5jcnlwdGVkQWRJZD1BMDE0MzIwNENVTEFFNEQyNjFHNSZ3aWRnZXROYW1lPXNwX210ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=) (including motors, wheels)

[11.1V Batteries](https://www.amazon.com/Spektrum-11-1V-850mAh-Smart-Battery/dp/B08V8TJPR5/ref=sr_1_1?crid=391E6FHN71596&dib=eyJ2IjoiMSJ9.CJmD_nFdmTdFZZJqj77Pm-tx4ILEKUarq3Yql5NGmqu2ThzBHQ88SZCChgAjvspTcNX0_hqukM5b6XVy40zaf443ZYphnbTtzxfak0D9QnN0M8A0XUGH4Xq9wjWZb8buri6EoTptIO-3RB4nM9H-Hj0eYt1gi1hw1O9NnpS_snqPquL5NApkGjMddwp5dyRh6sqof8x2eRkU7l4d10BONHW4sBROqFwvbbssXTMDDj1lXsaEKivn4aXQQf-bW6lDsO4nemPJW86rEwEZn1JYeA4r-MbQng1w_4I-0p8Zpd8.hC3MriRG6omqVVWJCjLpY2OF2Q6uJv9-JGR27U54CDY&dib_tag=se&keywords=11.1v+battery&qid=1727109380&sprefix=11.1v%2Caps%2C198&sr=8-1)

[9-Volt Battery](https://www.amazon.com/Eveready-Heavy-1222BP-9-Volt-Battery/dp/B00004YK3J/ref=sr_1_29?keywords=9v+batteries&qid=1678993634&sprefix=9v+bat%2Caps%2C213&sr=8-29)

[9-Volt Battery to Arduino Plug](https://www.amazon.com/5pack-Battery-2-1mm-Arduino-Corpco/dp/B01AXIEDX8/ref=sr_1_3?keywords=9v+to+arduino&qid=1678993719&sprefix=9v+to+ar%2Caps%2C201&sr=8-3)

[1k Ohm Resistors](https://www.amazon.com/Projects-10EP5121K00-Ohm-Resistors-Pack/dp/B0185FK65K/ref=sr_1_9?crid=15WG1OF5D6KCM&keywords=1k+ohm&qid=1678994710&sprefix=1k+ohm%2Caps%2C229&sr=8-9)

## How To Build

Required to have Node.js pre-installed on your system

run:

```
>npm i
>npx react-native run-android
```

For more detailed information:

[react native environment setup](https://reactnative.dev/docs/environment-setup)

## Circuit Diagram

![Circuit Diagram](/Canavar/assets/diagram.png)

## Screenshots

![Screenshots](/Canavar/assets/screenshots.png)

## Photograph

![Canavar](/Canavar/assets/canavar.jpg)
