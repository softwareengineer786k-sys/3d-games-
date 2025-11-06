import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

interface ChatSystemProps {
  username: string;
}

export const ChatSystem: React.FC<ChatSystemProps> = ({ username }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: username, text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateChatResponse(username, input, messages);
      const botMessage: ChatMessage = { sender: 'Ghost', text: responseText, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = { sender: 'System', text: 'Error contacting comms.', isUser: false };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-lg flex flex-col h-[400px]">
      <h2 className="text-2xl font-bold text-white mb-4 font-orbitron border-b-2 border-cyan-500 pb-2">Lobby Comms</h2>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-xs md:max-w-md ${msg.isUser ? 'bg-cyan-700 text-white' : 'bg-gray-700 text-gray-200'}`}>
              <p className={`text-xs font-bold mb-1 ${msg.isUser ? 'text-cyan-200' : 'text-gray-400'}`}>{msg.sender}</p>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start">
                <div className="rounded-lg px-4 py-2 max-w-xs md:max-w-md bg-gray-700 text-gray-200">
                    <p className="text-xs font-bold mb-1 text-gray-400">Ghost</p>
                    <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-400">Typing</span>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-gray-400 delay-150"></div>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-gray-400 delay-300"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-grow bg-gray-900/50 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed font-orbitron uppercase"
        >
          Send
        </button>
      </form>
    </div>
  );
};