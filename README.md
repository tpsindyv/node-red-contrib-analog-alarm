# Analog alarm node
This is a simple node to generate alarms based on alarm limits (HiHi, Hi, Lo, LoLo) and a analog value.

## Installation
The node is installed from the palette manager, simply searc for `@thingspal/node-red-contrib-analog-alarm`

## Use
The limits are stored in context-memory, and needs to be reapplied on start-up.

To set limits, send an object with this information (values are only examples)
`{
    hihiLimit : 30,
    hiLimit: 28,
    loLimit: 20,
    loloLimit, 18,
    hysteresis: 0.5
}`

To evaluate an value, send an object with this structure:
`{
    value: 29
}`

In this instance, the node will return this object:
`{
    "alarmStatus":{
        "hihiAlarm":false,
        "hiAlarm":true,
        "loAlarm":false,
        "loloAlarm":false
    },

    "limits":{
        "hysteresis":0.5,
        "hihiLimit":30,
        "hiLimit":27,
        "loLimit":20,
        "loloLimit":18
    },

"value":29
}`

If passed the value `'5`, all alarms will return false. If passed the value `17`, both lo- and loloAlarm will be true.

