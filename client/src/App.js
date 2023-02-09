import "./App.css";
import "./normal.css";
import { useState } from "react";
function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?",
    },
    {
      user: "me",
      message: "I wanted to use ChatGpt today",
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput("");
    setChatLog([...chatLog, { user: "me", message: input }]);
    const response = await fetch("http://localhost:3080", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chatLog.map((message) => message.message).join(""),
      }),
    });

    const data = await response.json();
    setChatLog([...chatLog, { user: "gpt", message: data.message }]);
  };
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span> New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => {
            console.log(chatLog);
            return <ChatMessage message={message} />;
          })}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              rows="1"
              className="chat-input-textarea"
            />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message, index }) => {
  return (
    <div
      key={index}
      className={`chat-message ${message.user === "gpt" && "chatgpt"}`}
    >
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}></div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};
export default App;
