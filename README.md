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

## Output Image Location:
We capture images from webcam every second and save into this location for Karthik's algorithm. It is important to have the right location. Otherwise, car counting won't work.

Go to ```root\config.json```
```
{
	"imageLocation": "<YOUR IMAGE OUTPUT LOCATION>"
}
```

## Sensors:
We have three ardunio boards (two littlebits arduino and one UNO arduino) in this demo to check 6 parking lots. Based on the USB ports, each board might be assigned to different port. In Karthik machine, it should be ```ttyACM0```,  ```ttyACM1```, and ```ttyACM2```

## Sensors Adjustment:
The physical sensor sensitivity has been set to maximum (clockwise to the end), but there are few parameters which you can adjust in the applications based on the demo conditions.

Go to ```littlebits\config.json```
```
{
	// This value controls which value will trigger the event about status 'free' or 'occupired'. 
	// This value is scaled down to 0-10.
	"statusThreshold": 8,

	// This value controls how the status is changed so that we know that 'free' to 'occupied' or vice versa.
	// This value is between 0-1023 before scale down.
	"changeThreshold": 100,

	// This value controls how often we read sensor value. 
	// This value is based on milliseconds. 
	"checkFreq": 300
}
```
