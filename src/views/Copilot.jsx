import React, { useState, useRef, useEffect } from 'react';
import { useCopilot } from '../context/CopilotContext';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Send, 
  ArrowUpRight,
  Bot,
  User,
  Recycle,
  Leaf,
  Ship,
  TrendingUp
} from 'lucide-react';

export const Copilot = () => {
  const { messages, isTyping, askCopilot } = useCopilot();
  const { chats, sendMessage, activeChatCompany, setActiveChatCompany } = useApp();
  
  const [inputText, setInputText] = useState('');
  const [chatType, setChatType] = useState('copilot'); // 'copilot' or 'business'
  const [businessInputText, setBusinessInputText] = useState('');
  const chatEndRef = useRef(null);

  const suggestionPills = [
    { text: 'Classify polymer plastics stream', icon: Recycle },
    { text: 'Analyze battery metals recycling metrics', icon: Sparkles },
    { text: 'Generate Scope 3 carbon report draft', icon: Leaf },
    { text: 'Optimize Midwest slag shipping route', icon: Ship }
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    askCopilot(inputText);
    setInputText('');
  };

  const handleSendBusinessMessage = (e) => {
    e.preventDefault();
    if (!businessInputText.trim()) return;
    sendMessage(activeChatCompany, businessInputText);
    setBusinessInputText('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chats, activeChatCompany, chatType]);

  // A very clean custom parser to render AI markdown highlights nicely
  const renderMessageContent = (text) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="chat-title font-display">{line.substring(4)}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={idx} className="chat-subtitle font-display">{line.substring(5)}</h4>;
      }
      if (line.startsWith('• ')) {
        return <li key={idx} className="chat-list-item">{line.substring(2)}</li>;
      }
      if (line.startsWith('|')) {
        // Render simple tables
        const cols = line.split('|').map(c => c.trim()).filter(c => c !== '');
        if (line.includes('---')) return null; // skip separator row
        return (
          <div key={idx} className="chat-table-row">
            {cols.map((col, cIdx) => (
              <span key={cIdx} className={idx === 2 ? 'col-header' : 'col-val'}>{col}</span>
            ))}
          </div>
        );
      }
      return <p key={idx} className="chat-paragraph">{line}</p>;
    });
  };

  return (
    <div className="copilot-view">
      {/* Sidebar: Navigation between AI Copilot and Active Business Chats */}
      <div className="copilot-sidebar glass">
        <div className="copilot-sb-header">
          <h3 className="font-display">Dialogues</h3>
        </div>
        <div className="dialogues-list">
          {/* AI Copilot Tab */}
          <button 
            className={`dialogue-item ai-tab ${chatType === 'copilot' ? 'active' : ''}`}
            onClick={() => setChatType('copilot')}
          >
            <div className="dialogue-avatar ai">
              <Bot size={16} />
            </div>
            <div className="dialogue-info">
              <h4>Sustainability Copilot</h4>
              <span>System Assistant AI</span>
            </div>
            <span className="copilot-ai-indicator">AI</span>
          </button>

          {/* Divider */}
          <div className="dialogue-section-title">Verified Industries</div>

          {/* Business Chats list */}
          {Object.keys(chats).map((company) => {
            const lastMsg = chats[company][chats[company].length - 1];
            return (
              <button
                key={company}
                className={`dialogue-item ${chatType === 'business' && activeChatCompany === company ? 'active' : ''}`}
                onClick={() => {
                  setChatType('business');
                  setActiveChatCompany(company);
                }}
              >
                <div className="dialogue-avatar company">
                  {company.substring(0, 2).toUpperCase()}
                </div>
                <div className="dialogue-info">
                  <h4>{company}</h4>
                  <span>{lastMsg ? `${lastMsg.text.substring(0, 22)}...` : 'Active thread'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="chat-workspace glass">
        {chatType === 'copilot' ? (
          /* AI COPILOT CHAT WINDOW */
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <Bot size={20} className="text-emerald animate-pulse" />
                <div>
                  <h3 className="font-display">AI Sustainability Copilot</h3>
                  <span>Configured: CSRD, EPA WARM v15, SEC Disclosure guidelines</span>
                </div>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                  <div className="message-sender-avatar">
                    {msg.sender === 'copilot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className="message-bubble-content">
                    {renderMessageContent(msg.text)}
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="message-bubble copilot typing animate-pulse">
                  <div className="message-sender-avatar">
                    <Bot size={14} />
                  </div>
                  <div className="message-bubble-content">
                    <span className="typing-dots">Optimizing parameters...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* AI Suggestion Pills */}
            {messages.length === 1 && (
              <div className="suggestion-pills-container">
                {suggestionPills.map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => askCopilot(pill.text)}
                      className="suggestion-pill glass hover-lift"
                    >
                      <Icon size={12} className="text-emerald" /> {pill.text}
                    </button>
                  );
                })}
              </div>
            )}

            <form onSubmit={handleSend} className="chat-input-bar glass">
              <input
                type="text"
                placeholder="Ask anything about material classification, Scope 3 factors, buyers..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-input-field"
              />
              <button type="submit" className="chat-send-btn">
                <Send size={16} />
              </button>
            </form>
          </>
        ) : (
          /* BUSINESS CHAT WINDOW */
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="dialogue-avatar company header-avatar">
                  {activeChatCompany.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display">{activeChatCompany}</h3>
                  <span className="verified-org-tag">D-U-N-S Verified • Active Trading Partner</span>
                </div>
              </div>
            </div>

            <div className="messages-container">
              {(chats[activeChatCompany] || []).map((msg, idx) => (
                <div key={idx} className={`message-bubble ${msg.sender === 'me' ? 'user' : 'them'}`}>
                  <div className="message-sender-avatar">
                    {msg.sender === 'me' ? <User size={14} /> : activeChatCompany.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="message-bubble-content">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendBusinessMessage} className="chat-input-bar glass">
              <input
                type="text"
                placeholder={`Message ${activeChatCompany}...`}
                value={businessInputText}
                onChange={(e) => setBusinessInputText(e.target.value)}
                className="chat-input-field"
              />
              <button type="submit" className="chat-send-btn">
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
