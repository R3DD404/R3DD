"use client";

import { useState, useEffect, useRef } from 'react'; // Ensure these are imported
import ExitButton from './exit-button'; // Import your ExitButton component

interface HackerModeProps {
  onExit: () => void;
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const ASCII_ART = `
██████╗ ██████╗ ██████╗ ██████╗ 
██╔══██╗╚════██╗██╔══██╗██╔══██╗
██████╔╝ █████╔╝██║  ██║██║  ██║
██╔══██╗ ╚═══██╗██║  ██║██║  ██║
██║  ██║██████╔╝██████╔╝██████╔╝
╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═════╝ 
                                
[*] Initializing secure shell...
[*] Access granted...
[*] Type 'help' for available commands
`;

const HackerMode = ({ onExit }: HackerModeProps) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([
    { 
      command: '', 
      output: (
        <div className="text-red-500 font-mono whitespace-pre">
          {ASCII_ART}
        </div>
      ) 
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when command history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(1);
    }
  };

  const navigateHistory = (direction: number) => {
    if (inputHistory.length === 0) return;
    
    const newIndex = historyIndex + direction;
    if (newIndex >= -1 && newIndex < inputHistory.length) {
      setHistoryIndex(newIndex);
      if (newIndex === -1) {
        setInput('');
      } else {
        setInput(inputHistory[newIndex]);
      }
    }
  };

  const handleCommand = () => {
    if (!input.trim()) return;
    
    const command = input.trim().toLowerCase();
    setInputHistory(prev => [command, ...prev]);
    setHistoryIndex(-1);
    
    const output = processCommand(command);
    setCommandHistory(prev => [...prev, { command: input, output }]);
    setInput('');
  };

  const processCommand = (command: string): React.ReactNode => {
    const args = command.split(' ');
    const cmd = args[0];
    
    switch (cmd) {
      case 'help':
        return (
          <div className="text-green-500 font-mono">
            <p className="text-green-300 font-bold">Available commands:</p>
            <p><span className="text-green-300">help</span> - Display this help message</p>
            <p><span className="text-green-300">about</span> - Display information about me</p>
            <p><span className="text-green-300">links</span> - Show social media and contact links</p>
            <p><span className="text-green-300">blog</span> - List recent blog posts</p>
            <p><span className="text-green-300">thm</span> - Show TryHackMe profile</p>
            <p><span className="text-green-300">clear</span> - Clear the terminal</p>
            <p><span className="text-green-300">ls</span> - List files in current directory</p>
            <p><span className="text-green-300">cat [file]</span> - Display file contents</p>
            <p><span className="text-green-300">whoami</span> - Display current user</p>
            <p><span className="text-green-300">exit</span> - Exit terminal</p>
          </div>
        );
      
      case 'about':
        return (
          <div className="text-green-500 font-mono">
            <p className="text-green-300 font-bold">R3DD - Ethical Hacker & Security Researcher</p>
            <p>Hey there, I'm R3DD — 17 years old, into cybersecurity, and spending most of my time solving labs on TryHackMe.</p>
            <p>Been at it for almost a year now — climbing leaderboards, breaking into systems (legally), and always pushing to learn more.</p>
            <p>My journey has been focused on continuous learning and growth.</p>
            <p>Made it to the Top 3% on TryHackMe and Top 50 on the monthly leaderboard in India.</p>
          </div>
        );
      
      case 'links':
        return (
          <div className="text-green-500 font-mono">
            <p className="text-green-300 font-bold">Contact & Social Media:</p>
            <p>🐦 Twitter: <a href="https://x.com/R3DD404" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://x.com/R3DD404</a></p>
            <p>📝 Blog: <a href="https://medium.com/@r3dd404" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://medium.com/@r3dd404</a></p>
            <p>💻 GitHub: <a href="https://github.com/R3DD404" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://github.com/R3DD404</a></p>
            <p>📷 Instagram: <a href="https://www.instagram.com/r3dd404/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.instagram.com/r3dd404/</a></p>
            <p>🎮 Discord: <a href="https://discord.gg/UCTbKtrWzf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://discord.gg/UCTbKtrWzf</a></p>
            <p>📧 Email: <span className="text-green-300">r3dd.sec@gmail.com</span></p>
          </div>
        );
      
      case 'blog':
        return (
          <div className="text-green-500 font-mono">
            <p className="text-green-300 font-bold">Recent Blog Posts:</p>
            <p>[2025-03-15] Silver Platter- Walkthrough THM | R3DD</p>
            <p>URL: <a href="https://medium.com/@r3dd404/silver-platter-walkthrough-thm-r3dd-b419acc1ce9d" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Read More</a></p>
            <p>[2025-02-28] TryHackMe- Lookup Walkthrough| R3DD</p>
            <p>URL: <a href="https://medium.com/@r3dd404/tryhackme-lookup-walkthrough-8928d546fc53" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Read More</a></p>
          </div>
        );
      
      case 'thm':
        return (
          <div className="text-green-500 font-mono">
            <p className="text-green-300 font-bold">TryHackMe Profile:</p>
            <p>Username: R3DD</p>
            <p>Rank: Top 3%</p>
            <p>Rooms Completed: 100+</p>
            <p>Profile URL: <a href="https://tryhackme.com/p/R3DD" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://tryhackme.com/p/R3DD</a></p>
          </div>
        );
      
      case 'whoami':
        return (
          <div className="text-green-500 font-mono">
            <p>[*] Executing privilege escalation...</p>
            <p>[+] Access level: root</p>
            <p>User: R3DD</p>
            <p>UID: 0</p>
            <p>Groups: root, hackers</p>
            <p>Shell: /bin/bash</p>
            <p>Home: /home/r3dd</p>
            <p>Last login: {new Date().toLocaleString()}</p>
          </div>
        );
      
      case 'ls':
        return (
          <div className="text-green-500 font-mono">
            <p>about.txt</p>
            <p>blog.txt</p>
            <p>links.txt</p>
            <p>thm.txt</p>
            <p>whoami.txt</p>
          </div>
        );
      
      case 'cat':
        if (args.length < 2) {
          return <p className="text-red-500 font-mono">Error: Missing file name</p>;
        }
        const fileName = args[1];
        switch (fileName) {
          case 'about.txt':
            return processCommand('about');
          case 'blog.txt':
            return processCommand('blog');
          case 'links.txt':
            return processCommand('links');
          case 'thm.txt':
            return processCommand('thm');
          case 'whoami.txt':
            return processCommand('whoami');
          default:
            return <p className="text-red-500 font-mono">Error: File not found: {fileName}</p>;
        }
      
      case 'clear':
        setTimeout(() => {
          setCommandHistory([
            { 
              command: '', 
              output: (
                <div className="text-green-500 font-mono">
                  <p>Terminal cleared. Type <span className="text-green-300">help</span> to see available commands</p>
                </div>
              ) 
            }
          ]);
        }, 10);
        return null;
      
      case 'exit':
        onExit();
        return <p className="text-green-500 font-mono">Exiting terminal...</p>;
      
      default:
        return <p className="text-red-500 font-mono">Command not found: {command}. Type 'help' for available commands.</p>;
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen p-4 flex flex-col terminal-container">
      <ExitButton onExit={onExit} /> {/* Use your ExitButton here */}

      <div 
        ref={terminalRef}
        className="flex-1 bg-black rounded-md p-4 overflow-y-auto terminal-content"
        onClick={handleTerminalClick}
      >
        {commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            {item.command && (
              <div className="flex">
                <span className="text-red-500 font-mono">r3dd@meoww:~$ </span>
                <span className="text-white font-mono ml-1">{item.command}</span>
              </div>
            )}
            <div className="ml-0 mt-1 mb-3">{item.output}</div>
          </div>
        ))}
        <div className="flex">
          <span className="text-red-500 font-mono">r3dd@meoww:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono ml-1 focus:ring-0"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default HackerMode;