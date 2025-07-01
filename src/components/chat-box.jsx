import { jsx } from 'react/jsx-runtime';

export default function ChatBox() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-80 h-96 flex flex-col">
      <h2 className="font-bold text-lg mb-2">Chat Support</h2>
      <div className="flex-1 border p-2 mb-2 rounded overflow-auto text-sm">
        <p>Hello! How can I help you today?</p>
      </div>
      <input
        className="border p-2 rounded text-sm"
        placeholder="Type a message..."
      />
    </div>
  );
}
