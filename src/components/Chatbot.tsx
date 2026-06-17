import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Warm greetings! I am Alexandra's virtual studio apprentice. I can tell you about our handcrafted collections, raw gemstone sourcing, custom design process, care guidelines, or how to reach us here in Nelson, BC. What shall we forge today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggestions for customers to click directly
  const SUGGESTIONS = [
    "How do I order a custom ring?",
    "Where is Nelson, BC?",
    "Tell me about the Fern Pendant.",
    "Contact Alexandra directly"
  ];

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 2. Set typing indicator
    setIsTyping(true);

    try {
      // 3. Post to backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages // Pass preceding history for multi-turn awareness!
        })
      });

      if (!response.ok) {
        throw new Error("Conduit broken");
      }

      const data = await response.json();
      
      // 4. Add bot response
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback message
      const errorMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: "I do apologize, our mountain signal faded for a brief moment. Please feel free to email Alexandra directly at atbates4@gmail.com, or dial 403-629-4300, and we will get back to you immediately!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="ai-chatbot-widget">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-forest-900 border border-gold-300/40 hover:border-gold-450/70 text-gold-100 hover:text-gold-200 px-4 py-3.5 rounded-full shadow-[0_8px_32px_rgba(14,30,22,0.25)] transition-all duration-300 hover:scale-105 group active:scale-95 cursor-pointer"
          id="chatbot-launcher-btn"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-gold-300 group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-450 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-serif tracking-widest uppercase font-medium">Artisan Assistant</span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          className="w-[360px] md:w-[400px] h-[520px] rounded-2xl glass-effect border border-gold-450/30 flex flex-col overflow-hidden shadow-[0_16px_48px_rgba(14,30,22,0.18)] animate-in fade-in slide-in-from-bottom-6 duration-300"
          id="chatbot-window"
        >
          {/* Header */}
          <div className="bg-forest-900 px-4 py-4 border-b border-gold-450/25 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-forest-950 flex items-center justify-center border border-gold-450/40">
                <Sparkles className="w-4.5 h-4.5 text-gold-300" />
              </div>
              <div>
                <h4 className="text-sm font-serif text-gold-100 tracking-wide">Studio Concierge</h4>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gold-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Nelson, BC • Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gold-100 p-1 rounded-full hover:bg-forest-950/50 transition-colors cursor-pointer"
              aria-label="Minimize Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages List Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/15">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed font-sans ${
                    msg.sender === "user"
                      ? "bg-gold-500 text-white rounded-br-none shadow-sm"
                      : "bg-white text-forest-900 border border-gold-300/20 rounded-bl-none shadow-xs"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-forest-900/40 font-mono mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start max-w-[85%] mr-auto">
                <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-white border border-gold-300/10 shadow-xs flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gold-450 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-gold-450 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-gold-450 rounded-full animate-bounce" />
                </div>
                <span className="text-[8px] text-gold-600/70 font-mono mt-1">
                  Drafting with attention to detail...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-gold-50/35 border-t border-gold-450/10 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(suggestion)}
                  className="text-[10px] font-mono text-gold-700 bg-white border border-gold-300/30 hover:border-gold-450/60 px-2.5 py-1.5 rounded-full hover:bg-gold-100/25 transition-all text-left cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-gold-450/15 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about resizing, metals, or custom quotes..."
              className="flex-1 bg-gold-50/30 text-xs px-3.5 py-2.5 rounded-full border border-gold-300/45 focus:outline-hidden focus:border-gold-450 focus:bg-white text-forest-900 placeholder:text-forest-900/40 transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-forest-900 text-gold-300 flex items-center justify-center border border-gold-300/20 hover:bg-forest-950 transition-colors disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
