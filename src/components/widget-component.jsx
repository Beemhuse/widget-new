import React, { useEffect } from "react";
import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
// import WebSocketService from "../services/websocket_services";
import { v4 as uuidv4 } from "uuid";
import { WebSocketService } from "../services/websocket_services";

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

const WidgetComponent = ({ data }) => {
  const [activeView, setActiveView] = useState("chat");
  const [messages, setMessages] = useState(message); // Start with empty messages
  const [newMessage, setNewMessage] = useState("");
  const [webSocketService, setWebSocketService] = useState(null);
  const [chatStarted, setChatStarted] = useState(false); // Track if chat has started
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [session, setSessionId] = useState("");
  const [visitorId, setVisitorId] = useState("");

  // Initialize visitor ID on component mount
  useEffect(() => {
    const initializeVisitorId = () => {
      // Check if visitor ID exists in local storage
      const storedGuestId = localStorage.getItem("guest_id");
      const storedSessionId = localStorage.getItem("session_id");

      if (storedGuestId, storedSessionId) {
        setVisitorId(storedGuestId);
        setSessionId(storedSessionId);
      } else {
        // Generate new UUID if none exists
        // const newGuestId = uuidv4();
        // localStorage.setItem("guest_id", newGuestId);
        // setVisitorId(newGuestId);
      }
    };

    initializeVisitorId();
  }, []);
  const startChat = async () => {
    if (!visitorId) return; // Don't proceed without visitor ID

    const payload = {
      visitor_id: visitorId,
      business: data?.data?.id,
    };

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://django-andromedia.onrender.com/chat/start-session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other required headers (like authorization if needed)
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // Parse the JSON response
      console.log(responseData)
      localStorage.setItem("guest_id", responseData?.data?.end_user?.guest_id);
      localStorage.setItem("session_id", responseData?.data?.id);
      // If API call is successful, initialize chat
      setChatStarted(true);
      initializeWebSocket();

      setMessages([
        {
          sender: "bot",
          text:
            responseData.welcome_message || "Hello! How can I help you today?",
          avatar:
            "https://django-andromedia.onrender.com/media/business-logo/IMG_2610.PNG",
          bgColor: "#F3F4F6",
        },
      ]);
    } catch (error) {
      console.error("Failed to start chat:", error);
      setMessages([
        {
          sender: "bot",
          text: "Sorry, we couldn't start the chat. Please try again later.",
          avatar:
            "https://django-andromedia.onrender.com/media/business-logo/IMG_2610.PNG",
          bgColor: "#F3F4F6",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
const initializeWebSocket = () => {
  const wsUrl = "wss://django-andromedia.onrender.com/ws/visitor-chat/";
  let wsService;

  // Only proceed if session and visitorId exist
  if (session && visitorId) {
    wsService = new WebSocketService(wsUrl, session, visitorId);
    // wsService = new WebSocketService(wsUrl, "428336e8-c71a-4069-8832-7a6364d0c20d", "18626c5a-888c-4d2a-b65c-43a56371f0c6");
    setWebSocketService(wsService);

    // Add debug listeners
    wsService.on("open", (event) => {
      console.log("WebSocket connection opened", event);
    });

    wsService.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    wsService.on("close", (event) => {
      console.warn("WebSocket connection closed", event);
    });

    wsService.on("message", (data) => {
      console.log("Received WebSocket message:", data);
       if (!data.message?.trim() && !data.text?.trim()) {
        console.warn('Received empty message, skipping');
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          text: data.message || data.text,
          sender: data.sender || "bot",
          avatar: data.avatar || "https://django-andromedia.onrender.com/media/business-logo/IMG_2610.PNG",
        },
      ]);
    });

    // Start connection
    wsService.connect();
  } else {
    console.error("Cannot initialize WebSocket: session or visitorId missing");
  }

  // Cleanup function
  return () => {
    if (wsService) {
      wsService.disconnect();
    }
  };
};
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatStarted) return; // Don't allow sending messages if chat hasn't started

    if (newMessage.trim()) {
      const userMessage = {
        text: newMessage,
        sender: "user",
        avatar:
          "https://django-andromedia.onrender.com/media/business-logo/IMG_2610.PNG",
      };

      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");

      if (webSocketService) {
        try {
          webSocketService.send({
            type: "user_message",
            content: newMessage,
          });
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      }
    }
  };

  return (
    <div className="andro-widget-container">
      <ChatHeader
        activeView={activeView}
        setActiveView={setActiveView}
        data={data}
      />

      <div className="flex-1 p-4 overflow-y-auto">
        {activeView === "chat" && (
          <div className="chat-view-container">
            {!chatStarted ? (
              <div className="start-chat-container">
                <img
                  src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1751466254/chat/logo-nano_oe3lyd.png"
                  className="start-chat-logo"
                  alt="Chat Logo"
                />
                <p className="start-chat-text">
                  Click below to start chatting with our support team
                </p>
                <button
                  onClick={startChat}
                  disabled={isLoading}
                  className={`start-chat-button ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? "Starting..." : "Start Chat"}
                </button>
              </div>
            ) : (
              <ChatBody messages={messages} data={data} />
            )}
          </div>
        )}
        {activeView === "call" && <CallView />}
        {activeView === "video" && <VideoView />}
      </div>
      {/* Only show input if chat has started */}
      {activeView === "chat" && chatStarted && (
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      )}

      <ChatFooter />
    </div>
  );
};

// Header Component
const ChatHeader = ({
  activeView,
  setActiveView,
  backgroundColor = "#4789F2",
  data,
}) => {
  console.log(data?.data);
  return (
    <div className="chat-header" style={{ background: backgroundColor }}>
      <div className="chat-header__top">
        <img
          onClick={() => setActiveView("chat")}
          src={
            "https://res.cloudinary.com/dj3zrsni6/image/upload/v1751533431/chat/left_jmrjga.png"
          }
          className="chat-header_back_arrow"
        />
        <div className="chat-header__images">
          <img
            className="chat-header__image chat-header__image--first"
            src={
              "https://django-andromedia.onrender.com/media/business-logo/IMG_2610.PNG"
            }
            alt="avatar"
          />
          {/* <img
            className="chat-header__image chat-header__image--second"
            src="https://res.cloudinary.com/dj3zrsni6/image/upload/v1751530690/chat/img_y7jhj2.png"
            alt=""
          /> */}
          {/* Add more images if needed */}
        </div>
        <div className="chat-header__content">
          <h1 className="chat-header__title">{data?.data?.business_name}</h1>
          <div className="chat-header__status">
            <div className="chat-circle__dot">
              <div className="chat-circle__box"></div>
            </div>
            <p className="chat-header__subtitle">{data?.data?.online_status}</p>
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
            <img
              src={
                "https://django-andromedia.onrender.com/media/business-logo/IMG_2610.PNG"
              }
              alt="avatar"
              className="avatar-img"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Chat Body Component
const ChatBody = ({ messages, data }) => {
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
