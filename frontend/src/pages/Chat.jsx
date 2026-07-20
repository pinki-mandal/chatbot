import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";

const Chat = () => {
  return (
    <div className="app">
      <Sidebar />

      <div className="chat-container">
        <Navbar />

        <MessageList />

        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;