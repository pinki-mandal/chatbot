// import { useState } from "react";

// function App() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user's message to the UI
//     const userMessage = {
//       role: "user",
//       content: input,
//     };

//     setMessages((prev) => [...prev, userMessage]);

//     const currentInput = input;
//     setInput("");

//     try {
//       // Send message to your backend
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: currentInput,
//         }),
//       });

//       // const data = await response.json();
//       // console.log(data)
//       const data = await response.json();

//       console.log("Response Status:", response.status);
//       console.log("Response Data:", data);

//       // Add AI response to the UI
//       const aiMessage = {
//         role: "assistant",
//         content: data.reply,
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>ChatBot</h2>

//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.role}:</strong> {msg.content}
//           </p>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={input}
//         placeholder="Type your message..."
//         onChange={(e) => setInput(e.target.value)}
//       />

//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default App;



import { useEffect, useRef, useState } from "react";
import { FiMoon, FiSun, FiCopy, FiCheck, FiSend } from "react-icons/fi";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "dark"
);

const [copiedIndex, setCopiedIndex] = useState(null);

useEffect(() => {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}, [theme]);


const copyMessage = (text, index) => {
  navigator.clipboard.writeText(text);

  setCopiedIndex(index);

  setTimeout(() => {
    setCopiedIndex(null);
  }, 2000);
};

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const currentInput = input.trim();

    const userMessage = {
      role: "user",
      content: currentInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://chatbot-2-ye8f.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.reply || "No response received.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Something went wrong. Please try again.",
        },
      ]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleTheme = () => {
  setTheme((prev) => (prev === "dark" ? "light" : "dark"));
};

  return (
    <div className="app">

      {/* Header */}
      <header className="header">

  <h2>AI ChatBot</h2>

  <button
    className="theme-btn"
    onClick={toggleTheme}
  >
    {theme === "dark" ? <FiSun /> : <FiMoon />}
  </button>

</header>

      {/* Messages */}
      <main className="chat-area">

        {messages.length === 0 && (
          <div className="welcome">
            <h1>How can I help you today?</h1>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.role === "user" ? "user-row" : "bot-row"
            }`}
          >
            <div
className={`message-wrapper ${
msg.role === "user" ? "user-row" : "bot-row"
}`}
>

<div
className={`message-bubble ${
msg.role === "user" ? "user" : "bot"
}`}
>

{msg.content}

{msg.role === "assistant" && (

<button
className="copy-btn"
onClick={() => copyMessage(msg.content,index)}
>

{copiedIndex===index ? <FiCheck/> : <FiCopy/>}

<span>

{copiedIndex===index ? "Copied":"Copy"}

</span>

</button>

)}

</div>

</div>
          </div>
        ))}

        {loading && (
          <div className="message-row bot-row">
            <div className="message-bubble bot typing">
              AI is thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

      </main>

      {/* Footer */}
      <footer className="footer">

        <div className="input-wrapper">

          <textarea
            rows={1}
            placeholder="Message AI ChatBot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
          >
            <FiSend />
          </button>

        </div>

      </footer>

    </div>
  );
}

export default App;
