import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import {
  IoChatbubbleEllipses,
  IoClose,
  IoSend,
  IoPersonCircle,
} from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";

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
            text: "Hello! I'm your AI assistant. You can ask me any questions related to education.",
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

  // Function to check if the question is education-related
  const isEducationRelated = (question) => {
    const educationalKeywords = [
      "math",
      "science",
      "history",
      "geography",
      "physics",
      "chemistry",
      "biology",
      "literature",
      "education",
      "school",
      "college",
      "study",
      "learn",
      "teach",
      "homework",
      "assignment",
    ];

    return educationalKeywords.some((keyword) =>
      question.toLowerCase().includes(keyword)
    );
  };

  // Function to call the Gemini API
  const fetchBotResponse = async (userMessage) => {
    const apiKey = "AIzaSyBTfZH0je29tQxLGvmXgXElF6HfNa_nJSA"; // Replace with your API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.candidates[0].content.parts[0].text;

      return botResponseText;
    } catch (error) {
      console.error("Error fetching bot response:", error);
      throw error;
    }
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

    try {
      // Check if the question is education-related
      if (!isEducationRelated(input.trim())) {
        const botResponse = {
          text: "I can only answer questions related to education. Please ask me something related to your studies.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        return;
      }

      // Fetch response from Gemini API
      const botResponseText = await fetchBotResponse(input.trim());
      const botResponse = {
        text: botResponseText,
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

  // Sanitize and render Markdown content
  const renderMarkdown = (text) => {
    const sanitizedText = DOMPurify.sanitize(text);
    return <ReactMarkdown>{sanitizedText}</ReactMarkdown>;
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
                    {renderMarkdown(msg.text)}
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
