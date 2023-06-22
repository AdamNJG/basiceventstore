import { EventEntry } from './EventEntry';

class EventStore<T> implements IterableIterator<EventEntry<T>> {
  private events: EventEntry<T>[];
  private currentIndex: number;

  constructor () {
    this.events = [];
    this.currentIndex = 0;
  }

  public forEach (callback: (event: EventEntry<T>) => void): void {
    for (const event of this) {
      callback(event);
    }
  }

  public [Symbol.iterator] (): IterableIterator<EventEntry<T>> {
    return this;
  }

  public next (): IteratorResult<EventEntry<T>> {
    if (this.currentIndex < this.events.length) {
      const value = this.events[this.currentIndex++];
      return { value, done: false };
    }

    return { value: undefined, done: true };
  }
  
  get length (): number {
    return this.events.length;
  }

  public addEvent (topic: string, payload: T) {
    this.events.push(new EventEntry(topic, payload));
  }

  public rewind (targetDate: Date ) {
    if (!isNaN(targetDate.getDate())) {
      this.resetIndex(this.events.findIndex((e) => e.timeStamp > targetDate));
    }
  }

  private resetIndex (newIndex: number) {
    this.currentIndex = newIndex;
  }
}

export { EventStore };