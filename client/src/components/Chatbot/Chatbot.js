import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Acabs assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [bookingMode, setBookingMode] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({ pickup: '', destination: '', vehicleType: 'economy' });
  const messagesEndRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  // Text-to-speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Start voice recognition
  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Handle booking flow
    if (bookingMode) {
      return handleBookingFlow(userMessage);
    }
    
    if (message.includes('book') || message.includes('ride')) {
      setBookingMode(true);
      setBookingStep(1);
      return "I'll help you book a ride! 🚗 First, where would you like to be picked up from?";
    }
    if (message.includes('cancel') && !bookingMode) {
      return "You can cancel your ride from the 'My Rides' page if it's still in 'requested' or 'in-progress' status.";
    }
    if (message.includes('payment') || message.includes('pay')) {
      return "We accept all major credit cards and digital wallets. Payment is processed after your ride is completed.";
    }
    if (message.includes('driver') || message.includes('track')) {
      return "Once a driver accepts your ride, you'll receive real-time updates and can track their location.";
    }
    if (message.includes('email') || message.includes('confirmation')) {
      return "Yes! We send email confirmations for all ride bookings with your trip details and booking ID.";
    }
    if (message.includes('price') || message.includes('fare') || message.includes('cost')) {
      return "Our fares are calculated based on distance, time, and vehicle type. You'll see the estimated fare before confirming your booking.";
    }
    if (message.includes('vehicle') || message.includes('car')) {
      return "We offer Economy, Premium, and Luxury vehicles. Choose based on your comfort and budget preferences.";
    }
    if (message.includes('help') || message.includes('support')) {
      return "I'm here to help! You can ask me about booking rides, payments, cancellations, or any other questions about Acabs.";
    }
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Acabs. How can I assist you with your ride today?";
    }
    if (message.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    return "I understand you're asking about that. For specific issues, please contact our support team or try asking about booking rides, payments, or vehicle options.";
  };

  // Handle booking conversation flow
  const handleBookingFlow = (userMessage) => {
    switch (bookingStep) {
      case 1: // Pickup location
        setBookingData(prev => ({ ...prev, pickup: userMessage }));
        setBookingStep(2);
        return `Great! Pickup from "${userMessage}". Now, where would you like to go?`;
      
      case 2: // Destination
        setBookingData(prev => ({ ...prev, destination: userMessage }));
        setBookingStep(3);
        return `Perfect! Going to "${userMessage}". Please choose your vehicle type:\n\n1. Economy ($12) - Affordable rides\n2. Premium ($18) - Extra comfort\n3. Luxury ($25) - Premium experience\n\nJust type the number (1, 2, or 3)`;
      
      case 3: // Vehicle selection
        let vehicleType = 'economy';
        let price = '$12';
        
        if (userMessage.includes('2') || userMessage.toLowerCase().includes('premium')) {
          vehicleType = 'premium';
          price = '$18';
        } else if (userMessage.includes('3') || userMessage.toLowerCase().includes('luxury')) {
          vehicleType = 'luxury';
          price = '$25';
        }
        
        setBookingData(prev => ({ ...prev, vehicleType }));
        setBookingStep(4);
        return `Excellent choice! ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)} vehicle selected (${price}).\n\nBooking Summary:\n📍 Pickup: ${bookingData.pickup}\n🎯 Destination: ${bookingData.destination}\n🚗 Vehicle: ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}\n💰 Estimated fare: ${price}\n\nType 'confirm' to book your ride or 'cancel' to start over.`;
      
      case 4: // Confirmation
        if (userMessage.toLowerCase().includes('confirm')) {
          // Reset booking mode
          setBookingMode(false);
          setBookingStep(0);
          const tempData = { ...bookingData };
          setBookingData({ pickup: '', destination: '', vehicleType: 'economy' });
          
          // Simulate booking
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              text: `🎉 Ride booked successfully!\n\nBooking ID: #${Math.random().toString(36).substr(2, 6).toUpperCase()}\n📍 From: ${tempData.pickup}\n🎯 To: ${tempData.destination}\n🚗 Vehicle: ${tempData.vehicleType.charAt(0).toUpperCase() + tempData.vehicleType.slice(1)}\n\nYour driver will be assigned shortly. You'll receive an email confirmation!`, 
              sender: 'bot' 
            }]);
          }, 1500);
          
          return "Processing your booking... 🔄";
        } else if (userMessage.toLowerCase().includes('cancel')) {
          setBookingMode(false);
          setBookingStep(0);
          setBookingData({ pickup: '', destination: '', vehicleType: 'economy' });
          return "Booking cancelled. How else can I help you today?";
        } else {
          return "Please type 'confirm' to book your ride or 'cancel' to start over.";
        }
      
      default:
        setBookingMode(false);
        setBookingStep(0);
        return "Something went wrong. Let's start over. How can I help you?";
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
      // Speak the bot response
      speakText(botResponse);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '350px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#000',
            color: 'white',
            padding: '1rem',
            borderRadius: '20px 20px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🤖</span>
              <div>
                <span style={{ fontWeight: '600' }}>Acabs Assistant</span>
                {bookingMode && (
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                    Booking Mode - Step {bookingStep}/4
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? '#000' : '#f0f0f0',
                  color: message.sender === 'user' ? 'white' : 'black',
                  padding: '0.8rem 1rem',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}
              >
                {message.text}
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: '#f0f0f0',
                padding: '0.8rem 1rem',
                borderRadius: '15px',
                fontSize: '0.9rem'
              }}>
                <span>Typing</span>
                <span className="typing-dots">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "Listening..." : "Type your message..."}
              style={{
                flex: 1,
                padding: '0.8rem',
                border: isListening ? '2px solid #ff4444' : '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '0.9rem',
                backgroundColor: isListening ? '#fff5f5' : 'white'
              }}
            />
            {recognition && (
              <button
                onClick={isListening ? stopListening : startListening}
                style={{
                  backgroundColor: isListening ? '#ff4444' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? '⏹️' : '🎤'}
              </button>
            )}
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              style={{
                backgroundColor: inputValue.trim() === '' ? '#ccc' : '#000',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: inputValue.trim() === '' ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#000',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '24px', color: 'white' }}>
          {isOpen ? '✕' : '💬'}
        </span>
      </div>
    </>
  );
};

export default Chatbot;