interface Imessage {
  direction: "left" | "right";
  details: string;
  time: Date;
  state: "send" | "receive" | "read";
}

export { Imessage };
