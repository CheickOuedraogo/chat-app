interface Imessage {
  direction: "left" | "right";
  details: string;
  time: string;
  state: "send" | "receive" | "read";
}

export { Imessage };
