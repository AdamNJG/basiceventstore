# Basic Event Store

This is a simple package that implements an in memory event store, this is FIFO (First in First out), and can be rewound.

This is currently in beta, if you have any feeback drop me an email at: anjgoldsmith@gmail.com.

This is another module of the basiceventbus (name pending) project.

## Importing

To get started (after install) just import the library:

```
import { EventStore } from 'basiceventstore';
```

or

```
const { EventStore } = require('basiceventstore');
```

## Creating an instance of the EventStore

This has a perameterless constructor.

```
const eventStore = new EventStore();
```

## Adding an event to the store

The event being stored must have a topic and a payload, the payload can be anything.

```
let payload = ["hello", "there"];
let payload2 = 1

eventStore.addEvent('topic', payload);
eventStore.addEvent('topic2', payload1);
```

## Finding the amount of events stored in the EventStore

The event store has a .length parameter that can be called.

```
let eventCount = eventStore.length;
```

## Getting the events in order

The event store has a .next() function, that returns the next event in the instance of EventStore, it keeps count, supplying a done boolean to tell you if there is another event to use.
```
let result = eventStore.next();
while(!result.done){
    // do something with result.value.payload

    result = eventStore.next();
}
```

## Accessing the event properties

Once you have received the event from the store using .next, then you will need to access the topic and the paylod:

```
let event = eventStore.next().value; // this is due to the use of the iterator pattern.

let topic = event.topic;
let payload = event.payload;
```

## Rewinding the EventStore

The Rewind method allows you to reset the eventStores running possition to a certain date, using a Date object that is set to a time in the past (releative to system time).

Here is a description of date consturctors: 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

```
eventStore.rewind(new Date(new Date().getTime() - 1000)); // to rewind by 1 second
eventStore.rewind(new Date('December 17, 1995 03:24:00')); // to rewind to a specific date
```