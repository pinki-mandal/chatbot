import Message from "./Message";

const MessageList = () => {
  const messages = [
    {
      role: "assistant",
      content: "Hello! How can I help you?"
    }
  ];

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;