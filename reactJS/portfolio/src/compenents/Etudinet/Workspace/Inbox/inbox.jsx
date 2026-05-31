import React, { useState } from "react";

const Card = ({ children }) => (
  <div className="border rounded-lg shadow p-4 bg-white h-full">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="p-2 ">{children}</div>
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    {children}
  </button>
);

const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border rounded px-3 py-2 w-full ${className}`}
  />
);

const Inbox = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", subject: "Meeting Reminder", content: "Don't forget our meeting at 3 PM." },
    { id: 2, sender: "Jane Smith", subject: "Project Update", content: "The project is on track for delivery." },
    { id: 3, sender: "Alex Brown", subject: "Vacation Request", content: "Can I take vacation next month?" },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setReplyContent("");
  };

  const handleReply = () => {
    if (replyContent.trim() !== "") {
      alert(`Reply sent: ${replyContent}`);
      setReplyContent("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 ">
      {/* Message List */}
      <div className="w-full md:w-1/3 ">
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Inbox</h2>
            <ul className="space-y-2">
              {messages.map((message) => (
                <li
                  key={message.id}
                  onClick={() => handleSelectMessage(message)}
                  className={`cursor-pointer p-2 rounded-md border ${
                    selectedMessage?.id === message.id ? "bg-blue-100 border-blue-500" : ""
                  }`}
                >
                  <p className="font-medium">{message.sender}</p>
                  <p className="text-sm text-gray-600">{message.subject}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Message Viewer */}
      <div className="w-full md:w-2/3">
        <Card>
          <CardContent>
            {selectedMessage ? (
              <div>
                <h3 className="text-lg font-bold mb-2">{selectedMessage.subject}</h3>
                <p className="text-sm text-gray-500 mb-4">From: {selectedMessage.sender}</p>
                <p className="mb-4">{selectedMessage.content}</p>

                <div>
                  <h4 className="text-sm font-bold mb-2">Reply:</h4>
                  <Input
                    type="text"
                    placeholder="Type your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={handleReply}>Send Reply</Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 flex justify-center items-center">Select a message to view its content.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inbox;
