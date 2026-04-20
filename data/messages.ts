export type ChatMessage = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  lastTime: string;
  unread?: number;
  online?: boolean;
  messages: ChatMessage[];
};

export const conversations: Conversation[] = [
  {
    id: "naijasole",
    name: "NaijaSole Co.",
    initials: "NS",
    lastMessage: "Thanks for reaching out to us",
    lastTime: "2h ago",
    unread: 2,
    online: true,
    messages: [
      {
        id: "1",
        fromMe: true,
        text: "I did a business with Ahmed textiles but he has not been forthcoming kindly look into it",
        time: "10:32 AM",
      },
      {
        id: "2",
        fromMe: false,
        text: "Good morning, our team will look into this and give you a feedback before the end of today",
        time: "10:30 AM",
      },
      { id: "3", fromMe: true, text: "Alright noted", time: "10:33 AM" },
      {
        id: "4",
        fromMe: false,
        text: "Thanks for reaching out to us",
        time: "10:35 AM",
      },
    ],
  },
  {
    id: "luxe",
    name: "Luxe Leatherworks",
    initials: "LL",
    lastMessage: "Do you need recommendations",
    lastTime: "1 day ago",
    messages: [
      { id: "1", fromMe: false, text: "Hello, how can we help?", time: "Yesterday" },
      {
        id: "2",
        fromMe: true,
        text: "Do you need recommendations",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "velmora",
    name: "Velmora Garments",
    initials: "VG",
    lastMessage: "Yes it is Available",
    lastTime: "2 days ago",
    unread: 1,
    messages: [
      {
        id: "1",
        fromMe: false,
        text: "Is the fabric still in stock?",
        time: "2 days ago",
      },
      { id: "2", fromMe: true, text: "Yes it is Available", time: "2 days ago" },
    ],
  },
];
