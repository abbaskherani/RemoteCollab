import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

interface Message {
  id: number
  user: string
  text: string
  timestamp: Date
}

export default function TeamChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: "Alice", text: "Hey team, how's the progress on the new feature?", timestamp: new Date() },
    { id: 2, user: "Bob", text: "Going well! I've just pushed some updates.", timestamp: new Date() },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: "You", text: newMessage, timestamp: new Date() }])
      setNewMessage("")
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="max-w-md mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[calc(100vh-2rem)] sm:h-[600px]">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-semibold">Team Chat</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium text-blue-600">{message.user}</span>
                <span className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
              </div>
              <p className="text-gray-800">{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}