# Smart City & Traffic Control powered by Deep Learning

## How to setup:
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
  
## How to start:
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
Go to ```root\config.json```
```
{
	"imageLocation": "<YOUR IMAGE OUTPUT LOCATION>"
}
```

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
