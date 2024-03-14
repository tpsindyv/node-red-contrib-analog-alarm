# Analog alarm node

This is a simple node to generate alarms based on alarm limits (HiHi, Hi, Lo, LoLo) and a analog value.

## Installation

The node is installed from the palette manager, simply search for `@thingspal/node-red-contrib-analog-alarm`

## Use

The node can be used for multiple sensors by setting the sensor name in `msg.topic`.
The limits are stored in context-memory, and needs to be reapplied on start-up.

To set limits, send an object with this information (values are only examples)

```json
{
	"hihiLimit": 30,
	"hiLimit": 28,
	"loLimit": 20,
	"loloLimit": 18,
	"hysteresis": 0.5
}
```

To evaluate an value, send an object with this structure:

```json
{
	"value": 29
}
```

If the value exceeds one of the limits, the alarm will become true. If it returns below the limit minus the hysteresis, the alarm will return to false.

In this instance, the node will return this object:

```json
{
	"alarmStatus": {
		"hihiAlarm": false,
		"hiAlarm": true,
		"loAlarm": false,
		"loloAlarm": false
	},

	"limits": {
		"hysteresis": 0.5,
		"hihiLimit": 30,
		"hiLimit": 27,
		"loLimit": 20,
		"loloLimit": 18
	},

	"value": 29
}
```

If passed the value `25`, all alarms will return false. If passed the value `17`, both lo- and loloAlarm will be true.
