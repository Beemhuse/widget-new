import React from "react";
import { useState } from "react";

const message = [
  {
    sender: "bot",
    text: "Frank, I’m Sky, your product specialist at Andro media.",
    image:
      "https://res.cloudinary.com/dj3zrsni6/image/upload/v1751466254/chat/logo-nano_oe3lyd.png",
    avatar:
      "https://res.cloudinary.com/dj3zrsni6/image/upload/v1751466254/chat/logo-nano_oe3lyd.png",
    bgColor: "#F3F4F6",
  },
  {
    sender: "user",
    text: "I have a question",
    avatar:
      "https://res.cloudinary.com/dj3zrsni6/image/upload/v1751466254/chat/logo-nano_oe3lyd.png",
    bgColor: "#10B981",
  },
  {
    sender: "user",
    text: "Tell me more",
    avatar:
      "https://res.cloudinary.com/dj3zrsni6/image/upload/v1751466254/chat/logo-nano_oe3lyd.png",
    bgColor: "#10B981",
  },
];

const WidgetComponent = () => {
  const [activeView, setActiveView] = useState("chat");
  const [messages, setMessages] = useState(message);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="andro-widget-container ">
      <ChatHeader activeView={activeView} setActiveView={setActiveView} />

      <div className="flex-1 p-4  overflow-y-auto">
        {activeView === "chat" && <ChatBody messages={messages} />}
        {activeView === "call" && <CallView />}
        {activeView === "video" && <VideoView />}
      </div>

      {/* Input (only shown in chat view) */}
      {activeView === "chat" && (
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
      {/* Footer Component */}
      <ChatFooter />
    </div>
  );
};

// Header Component
const ChatHeader = ({
  activeView,
  setActiveView,
  backgroundColor = "#4789F2",
}) => {
  return (
    <div className="chat-header" style={{ background: backgroundColor }}>
      <div className="chat-header__top">
        <img
          onClick={() => setActiveView("chat")}
          src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1751533431/chat/left_jmrjga.png"
          className="chat-header_back_arrow"
        />
        <div className="chat-header__images">
          <img
            className="chat-header__image chat-header__image--first"
            src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1751530690/chat/img_y7jhj2.png"
            alt=""
          />
          <img
            className="chat-header__image chat-header__image--second"
            src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1751530690/chat/img_y7jhj2.png"
            alt=""
          />
          {/* Add more images if needed */}
        </div>
        <div className="chat-header__content">
          <h1 className="chat-header__title">Nanocodes</h1>
          <div className="chat-header__status">
            <div className="chat-circle__dot">
              <div className="chat-circle__box"></div>
            </div>
            <p className="chat-header__subtitle">We reply immediately</p>
          </div>
        </div>
        <div className="chat-header__buttons">
          <IconButton
            icon="call"
            active={activeView === "call"}
            onClick={() => setActiveView("call")}
          />
          <IconButton
            icon="video"
            active={activeView === "video"}
            onClick={() => setActiveView("video")}
          />
          {/* <IconButton
            icon="chat"
            active={activeView === "chat"}
            onClick={() => setActiveView("chat")}
          /> */}
        </div>
      </div>
    </div>
  );
};

const IconButton = ({ icon, active, onClick }) => {
  const icons = {
    call: (
      <img
        src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1751529735/chat/call2_bdceia.png"
        className="icon"
      />
    ),
    video: (
      <img
        src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1705675483/chat/video_glwvph.png"
        className="icon"
      />
    ),
    chat: (
      <svg
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M8 12h.01M12 12h.01..." />
      </svg>
    ),
  };

  return (
    <button
      className={`chat-header__button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icons[icon]}
    </button>
  );
};

const ChatMessages = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`chat-message-wrapper ${
            msg.sender === "user" ? "user" : "bot"
          }`}
        >
          {msg.sender === "bot" && (
            <div className="chat-bubble">
              {msg.image && (
                <img src={msg.image} alt="chat visual" className="chat-image" />
              )}
              <p className="chat-text">{msg.text}</p>
            </div>
          )}

          {msg.sender === "user" && (
            <div
              className="chat-bubble user-bubble"
              style={{ backgroundColor: msg.bgColor || "#e0e0e0" }}
            >
              <p className="chat-text">{msg.text}</p>
            </div>
          )}

          <div className="avatar-container">
            <img src={msg.avatar} alt="avatar" className="avatar-img" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Chat Body Component
const ChatBody = ({ messages }) => {
  return (
    <div className="chat-body">
      {/* {messages.length !== 0 && (
        <div className="empty-state">
          <img
            src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1751466254/chat/logo-nano_oe3lyd.png"
            className="chat-logo"
            alt="Chat Logo"
          />
          <p>Ask us anything - we'll get back to you.</p>
        </div>
      )} */}
      {/* Uncomment if needed */}
      <ChatMessages messages={messages} />
    </div>
  );
};

// Call View Component
const CallView = () => {
  return (
    <div className="text-center py-8 h-96">
      <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </div>
      <h3 className="font-bold text-lg mb-2">Call Support</h3>
      <p className="text-gray-600 mb-4">Click below to start a call</p>
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition">
        Start Call
      </button>
    </div>
  );
};

// Video View Component
const VideoView = () => {
  return (
    <div className="text-center py-8 h-96">
      <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="font-bold text-lg mb-2">Video Support</h3>
      <p className="text-gray-600 mb-4">Click below to start video chat</p>
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition">
        Start Video
      </button>
    </div>
  );
};

// Input Component
import { Paperclip, Smile, Send } from "lucide-react";

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <form onSubmit={handleSendMessage} className="chat-input-form">
      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="chat-input-field"
        />
        <div className="chat-icons">
          <span className="emoji">
            <Smile />
          </span>
          <label className="attachment-icon">
            <Paperclip />

            <input type="file" style={{ display: "none" }} />
          </label>
        </div>
      </div>
      <button type="submit" className="chat-send-button">
        <Send />
      </button>
    </form>
  );
};

// Footer Component
const ChatFooter = () => {
  return (
    <div className="chat-footer__bottom">
      POWERED BY <span> ANDROMEDIA</span>
    </div>
  );
};

export default WidgetComponent;
