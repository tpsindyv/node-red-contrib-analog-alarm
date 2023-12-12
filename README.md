This is a simple node to generate alarms based on limits and a value.

The limits are stored in context-memory, and needs to be reapplied on start-up.

To set limits, send an object with this information 
{
    hihiLimit : 0,
    hiLimit: 0,
    loLimit: 0,
    loloLimit, 0
}

To evaluate an value, send an object with this structure:
{
    value: 0
}