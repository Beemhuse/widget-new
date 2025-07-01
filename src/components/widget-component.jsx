import { useState } from 'react';

const WidgetComponent = () => {
  const [activeView, setActiveView] = useState('chat');
  const [messages, setMessages] = useState([
    { text: 'Nanocodes Programming', sender: 'bot' },
    { text: 'Ask us anything – we\'ll get back to you here or by email.', sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-72 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Header Component */}
      <ChatHeader activeView={activeView} setActiveView={setActiveView} />
      
      {/* Dynamic Body Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeView === 'chat' && (
          <ChatBody messages={messages} />
        )}
        {activeView === 'call' && (
          <CallView />
        )}
        {activeView === 'video' && (
          <VideoView />
        )}
      </div>
      
      {/* Footer Component */}
      <ChatFooter />
      
      {/* Input (only shown in chat view) */}
      {activeView === 'chat' && (
        <ChatInput 
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

// Header Component
const ChatHeader = ({ activeView, setActiveView }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Nanocodes</h1>
          <p className="text-xs opacity-90">We reply immediately</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveView('call')}
            className={`p-2 rounded-full ${activeView === 'call' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button 
            onClick={() => setActiveView('video')}
            className={`p-2 rounded-full ${activeView === 'video' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button 
            onClick={() => setActiveView('chat')}
            className={`p-2 rounded-full ${activeView === 'chat' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Chat Body Component
const ChatBody = ({ messages }) => {
  return (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`p-3 rounded-lg ${message.sender === 'bot' ? 'bg-gray-100' : 'bg-blue-100 ml-auto'}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

// Call View Component
const CallView = () => {
  return (
    <div className="text-center py-8">
      <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
    <div className="text-center py-8">
      <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <form onSubmit={handleSendMessage} className="p-4 border-t">
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 border rounded-l-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  );
};

// Footer Component
const ChatFooter = () => {
  return (
    <div className="bg-gray-100 text-center py-2 text-xs text-gray-500">
      POWERED BY ADRONEDIA
    </div>
  );
};

export default WidgetComponent;