// Room.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Room.css";

const Room = ({
  roomName = "Professional Learning Environment",
  user = "Anonymous",
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [participants, setParticipants] = useState(3); // Mock participant count
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "System",
        text: "Welcome to the professional learning environment. Please maintain academic integrity and professional etiquette during discussions.",
        time: formatTime(new Date()),
        type: "system",
      },
      {
        id: 2,
        sender: "Dr. Smith",
        text: "Welcome to today's session on Advanced Computer Science Concepts. Please feel free to ask questions throughout the session.",
        time: formatTime(new Date()),
        type: "instructor",
      },
    ]);

    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  };

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      const { scrollHeight, clientHeight } = chatAreaRef.current;
      const maxScroll = scrollHeight - clientHeight;
      chatAreaRef.current.scrollTo({
        top: maxScroll,
        behavior: "smooth",
      });
    }
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?"
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else if (e.key === "Enter" && e.shiftKey) {
      setInput((prev) => prev + "\n");
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: user,
        text: input,
        time: formatTime(new Date()),
        type: "student",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setIsTyping(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <div className="learning-room">
      <header className="room-header">
        <div className="room-header-main">
          <div className="room-header-info">
            <h2>{roomName}</h2>
          </div>
          <div className="room-header-stats">
            <span className="room-status">Live Session</span>
            <span className="participant-count">
              {participants} Participants
            </span>
          </div>
        </div>
        <div className="room-header-subtitle">
          Facilitating collaborative learning and academic discussions
        </div>
      </header>

      <main className="chat-area" ref={chatAreaRef}>
        <div className="messages-container">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-group ${
                msg.sender === user ? "own-message" : ""
              }`}
            >
              <div className="message-wrapper">
                <div className={`avatar ${msg.type}`}>
                  {getInitials(msg.sender)}
                </div>
                <div className="message-content">
                  <div className="message-info">
                    <span className="sender">{msg.sender}</span>
                    <span className="timestamp">{msg.time}</span>
                  </div>
                  <div className="message-bubble">{msg.text}</div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="input-area">
        <div className="input-container">
          <textarea
            ref={inputRef}
            className="message-input"
            placeholder="Type your message (Shift + Enter for new line)..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button
            className={`send-button ${isTyping ? "active" : ""}`}
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            <span className="button-text">Send</span>
          </button>
        </div>
        <div className="input-info">
          Press Enter to send, Shift + Enter for new line
        </div>
      </footer>
    </div>
  );
};

export default Room;
