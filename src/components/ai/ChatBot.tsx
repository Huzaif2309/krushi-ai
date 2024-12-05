import { useEffect } from 'react';

declare global {
  interface Window {
    chatbotConfig: [string, string, { apiHost: string }];
  }
}

const AiChatbot = () => {
  useEffect(() => {
    // Create a div with the ID 'aichatbot' and append it to the body
    const div = document.createElement('div');
    div.id = 'aichatbot';
    document.body.appendChild(div);

    // Define chatbot configuration
    window.chatbotConfig = [
      'EAA658FA-7228-474B-9298-5ABBE5CAB0A8', // App ID
      'RIKSOTBD6fJEqiRUzrpjY',                 // Bot token
      {
        apiHost: 'https://api-cf-ap-8.sendbird.com', // API Host
      },
    ];

    // Create and append the chatbot script
    const script = document.createElement('script');
    script.defer = true;
    script.type = 'module';
    script.src = 'https://aichatbot.sendbird.com/index.js';

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Cleanup: Remove the script and div when the component is unmounted
    return () => {
      if (div) document.body.removeChild(div);
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render any UI directly
};

export default AiChatbot;