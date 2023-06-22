import { describe, expect, test } from '@jest/globals';
import { EventStore } from '../src/EventStore';

describe('EventStore Module', () => {

  test('addEvents_eventCountToMatch_outputtedPayloadToMatch', () => {
    const eventStore = new EventStore();

    const num = 1;
    const obj = { stuff: 'things' };
    const numTopic = 'numberTopic';
    const objTopic = 'objectTopic';

    eventStore.addEvent(numTopic, num);
    eventStore.addEvent(objTopic, obj);

    expect(eventStore.length).toBe(2);

    const firstEvent = eventStore.next().value;
    expect(firstEvent.payload).toBe(num);
    expect(firstEvent.topic).toBe(numTopic);
    expect(firstEvent.timeStamp instanceof Date).toBe(true);

    const secondEvent = eventStore.next().value;
    expect(secondEvent.payload).toStrictEqual(obj);
    expect(secondEvent.topic).toBe(objTopic);
    expect(secondEvent.timeStamp instanceof Date).toBe(true);
  });

  test('addManyEvents_eventCountMatches_outputInRightOrder', () => {
    const eventStore = new EventStore();

    for (let i = 0; i < 50; i++) {
      eventStore.addEvent('test', i);
    }

    let count = 0;
    eventStore.forEach((event) => {
      expect(event.payload).toBe(count);
      count++;
    });

    expect(eventStore.length).toBe(50);
  });

  test('EventStore_rewind_correctEvent', async () => {
    const eventStore = new EventStore();

    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      eventStore.addEvent('test', i);
    }

    for (let i = 0; i < 5; i++) {
      eventStore.next();
    }

    eventStore.rewind(new Date(new Date().getTime() - 150));

    expect(eventStore.next().value.payload).toBe(3);
    expect(eventStore.next().value.payload).toBe(4);
  });

  test('EventStore_rewind_invalidDate', () => {
    const eventStore = new EventStore();

    for (let i = 0; i < 5; i++) {
      eventStore.addEvent('test', i);
    }

    for (let i = 0; i < 4; i++) {
      eventStore.next();
    }

    eventStore.rewind(new Date('invalid'));

    expect(eventStore.next().value.payload).toBe(4);
    expect(eventStore.next().done).toBe(true);
  });
});