class EventEntry<Type> {
  topic: string;
  payload: Type;
  timeStamp: Date;

  constructor (topic: string, payload: Type) {
    this.payload = payload;
    this.topic = topic;
    this.timeStamp = new Date();
  }
}

export { EventEntry };