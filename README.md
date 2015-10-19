# Smart City & Traffic Control powered by Deep Learning

## Setup:
1. Go to ```root``` folder:
  ```
  npm install
  ```

2. Go to ```littlebits``` folder:
  ```
  npm install
  ```

3. Go to ```web``` folder
  ```
  bower install
  ```
  
## Startup:
1. Go to ```root``` folder:
  ```
  node index.js
  ```
  
2. Go to ```littlebits``` folder:
  ```
  node index.js
  ```
  
3. Go to [http://localhost:3000/index.html](http://localhost:3000/index.html) in Chrome

**NOTE**: Make sure that **NO** cars are in the parking lots before you start the website or restart the application. The free parking should always start with **6**.



## Output Image Location:
We capture images from webcam every second and save into this location for Karthik's algorithm. It is important to have the right location. Otherwise, car counting won't work.

Go to ```root\config.json```
```
{
	"imageLocation": "<YOUR IMAGE OUTPUT LOCATION>"
}
```

## Sensors:
We use one Ardunio board (UNO) to read 6 light sensors. Based on the USB ports, this board should be assigned to ```ttyACM0```. Please see the following circuit diagram for the light sensor setting. [https://github.com/rwaldron/johnny-five/blob/master/docs/photoresistor.md](https://github.com/rwaldron/johnny-five/blob/master/docs/photoresistor.md)

## Sensors Adjustment:
Go to ```littlebits\config.json```
```
{
	// This value is the Ubuntu USB port for Ardunio board.
	"port": "/dev/ttyACM0",

	// This threhold controls when the status change will be triggered. For example, 'free' or 'occupied'. 
	// This value is scaled down to 0-10.
	"statusThreshold": 5,

	// This threhold controls when the value is changed. For example, the change happens when the amount is over 500.
	// This value is between 0-1023 before scale down.
	"changeThreshold": 500,

	// This value controls how often we read sensor value. 
	// This value is based on milliseconds. 
	"checkFreq": 500
}
```

