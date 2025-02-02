import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import {
  IoChatbubbleEllipses,
  IoClose,
  IoSend,
  IoPersonCircle,
} from "react-icons/io5";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const botResponse = {
        text: "Thank you for your message! I'm a demo AI assistant. In a real implementation, this would be connected to an AI service.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I apologize, but I encountered an error. Please try again.",
          sender: "bot",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={toggleChatbot}>
          <IoChatbubbleEllipses className="icon" />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="ai-header-content">
              <div className="bot-avatar">
                <IoPersonCircle size={24} />
              </div>
              <div className="header-text">
                <h3>AI Assistant</h3>
                <span className="status">Online</span>
              </div>
            </div>
            <button className="close-button" onClick={toggleChatbot}>
              <IoClose size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-container ${msg.sender}`}>
                <div className="message-avatar">
                  <IoPersonCircle />
                </div>
                <div className="message-content">
                  <div className={`message ${msg.isError ? "error" : ""}`}>
                    {msg.text}
                  </div>
                  <div className="message-timestamp">
                    {formatTimestamp(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-container bot">
                <div className="message-avatar">
                  <IoPersonCircle />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              className="ai-chatbot-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className={`send-button ${input.trim() ? "active" : ""}`}
              onClick={handleSendMessage}
              disabled={!input.trim()}
            >
              <IoSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
