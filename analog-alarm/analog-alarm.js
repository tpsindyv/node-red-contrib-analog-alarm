module.exports = function(RED) {
    function AnalogAlarmNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            // Create context
            let nodeContext = node.context()

            // fetch stored limits object or default
            let limits = nodeContext.get("limits") || {hysteresis: 0.5}

            // check if incoming message contains limits, if so, update context
            if (msg.payload.hihiLimit != null) {
                limits.hihiLimit = msg.payload.hihiLimit
            } 
            
            if (msg.payload.hiLimit != null) {
                limits.hiLimit = msg.payload.hiLimit
            }

            if (msg.payload.loLimit != null) {
                limits.loLimit = msg.payload.loLimit
            }

            if (msg.payload.loloLimit != null) {
                limits.loloLimit = msg.payload.loloLimit
            }

            if (msg.payload.hysteresis != null) {
                limits.hysteresis = msg.payload.hysteresis
            }
            nodeContext.set('limits', limits)

            // get alarm status
            const defaultAlarmStatus = {
                hihiAlarm : false,
                hiAlarm : false,
                loAlarm : false,
                loloAlarm : false
            }
            const alarmStatus = nodeContext.get('alarms') || defaultAlarmStatus
            
            if (msg.payload.value != null) {
                // set alarm state
                if (msg.payload.value > limits.hihiLimit) {
                    alarmStatus.hihiAlarm = true
                }

                if (msg.payload.value > limits.hiLimit) {
                    alarmStatus.hiAlarm = true
                }

                if (msg.payload.value < limits.loLimit) {
                    alarmStatus.loAlarm = true
                }

                if (msg.payload.value < limits.loloLimit) {
                    alarmStatus.loloAlarm = true
                }

                //reset alarm states
                if ((alarmStatus.hihiAlarm ?? false) && msg.payload.value < limits.hihiLimit - limits.hysteresis) {
                    alarmStatus.hihiAlarm = false
                }
                if ((alarmStatus.hiAlarm ?? false) && msg.payload.value < limits.hiLimit - limits.hysteresis) {
                    alarmStatus.hiAlarm = false
                }
                if ((alarmStatus.loAlarm ?? false) && msg.payload.value > limits.loLimit + limits.hysteresis) {
                    alarmStatus.loAlarm = false
                }
                if ((alarmStatus.loloAlarm ?? false) && msg.payload.value > limits.loloLimit + limits.hysteresis) {
                    alarmStatus.loloAlarm = false
                }
                
                // Save alarm status in context
                nodeContext.set('alarms', alarmStatus)
            }

            // return object
            msg.payload = {
                alarmStatus,
                limits,
                value: msg.payload.value ?? "no value sent"
            }

            node.send(msg)
        });
    }
    RED.nodes.registerType("analog-alarm",AnalogAlarmNode);
}