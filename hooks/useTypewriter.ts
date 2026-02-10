import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let charIndex = 0;
    
    setDisplayText('');
    setIsTyping(true);

    const type = () => {
      if (charIndex < text.length) {
        setDisplayText((prev) => prev + text.charAt(charIndex));
        charIndex++;
        timeout = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    const initialDelay = setTimeout(type, startDelay);

    return () => {
      if (timeout) clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, speed, startDelay]);

  return { displayText, isTyping };
}