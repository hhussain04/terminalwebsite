import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, User, Briefcase, Code, Mail } from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';
import CommandOutput from './CommandOutput';

interface CommandResponse {
  loading: boolean;
  output: string[];
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandResponse[]>([
    { loading: false, output: ['Welcome to Portfolio V1.0', 'Type HELP for available commands'] }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [currentDirectory, setCurrentDirectory] = useState('/home/guest/portfolio');

  const commands = {
    HELP: () => [
      'Available commands:',
      'ABOUT     - Display information about me',
      'PROJECTS  - View my projects',
      'SKILLS    - List my technical skills',
      'CONTACT   - Show contact information',
      'CLEAR     - Clear the terminal',
      'WHOAMI    - Display user information',
      'NEOFETCH  - System information',
      'DIR       - List portfolio sections',
      'PWD       - Print working directory',
      'HELP      - Show this help message'
    ],
    ABOUT: () => {
      setCurrentDirectory('/home/guest/portfolio/about');
        return [
        '🔍 I am an aspiring Software Developer, Cyber-Security Enthusiast',
        '    and Networking Professional',
        '🌍 Based in London, UK',
        '🎓 Currently working towards a Pearson BTEC Level 3 National Extended Diploma',
        '    in Computing and an AS-Level in Mathematical Studies',
        '',
        '🖥️ Passionate about building innovative software solutions with a strong interest in',
        '    cyber-security, UI and UX design, back-end data analysis & solutions, and networking.',
        '💻 Currently learning and developing projects in Python, React, Rust, and web development.',
        '🎮 Passionate about creating useful scripts and tools for gaming and general automation.',
        ];
    },
    PROJECTS: () => {
      setCurrentDirectory('/home/guest/portfolio/projects');
      return [
        'PROJECT DATABASE LOADED:',
        '',
        '1. Terminal Portfolio',
        '   > This project - A terminal-based portfolio site - Built with React, Tailwind CSS & Vite.js',
        '',
        '2. FolderTidy',
        '   > A simple file organization tool - Built with Python',
        '',
        '3. TrackR',
        '   > My first bare bone React project - A task tracker app.',
        '',
        '4. YFinanceStockTool',
        '   > A simple stock analysis tool - Built with Python and deployed with Flask and Heroku.',
      ];
    },
    CONTACT: () => {
      setCurrentDirectory('/home/guest/portfolio/contact');
      return [
        'Email: hussainhumza0403@gmail.com',
        'GitHub: https://github.com/hhussain04',
        'LinkedIn: https://www.linkedin.com/in/humzahussain04/'
      ];
    },
    WHOAMI: () => [
      'User: Portfolio Guest',
      'Role: Visitor',
      'Session: Interactive',
      'Terminal: Portfolio V1.0'
    ],
    NEOFETCH: () => [
      '       _______       Portfolio OS',
      '      /       \\      -------------',
      '     /  ___    \\     TERM: xterm-256color',
      '    /  /   \\    \\    SHELL: portfolio-sh',
      '   /  /     \\    \\   CPU: React 18.3.1',
      '  /  /_______\\    \\  Memory: Infinite',
      ' /______________\\   Uptime: Always',
      '',
      '█▀▀▀▀ █▀▀▀▀ █▀▀▀▀   Theme: Retro Green',
      '█▄▄▄▄ █▄▄▄▄ █▄▄▄▄   Resolution: Responsive'
    ],
    DIR: () => [
      'Directory of /portfolio',
      '',
      'drwxr-xr-x  about/',
      'drwxr-xr-x  projects/',
      'drwxr-xr-x  skills/',
      'drwxr-xr-x  contact/',
      'drwxr-xr-x  assets/',
      '-rw-r--r--  README.md',
      '-rw-r--r--  portfolio.config'
    ],
    PWD: () => [
      currentDirectory
    ],
    CLEAR: () => {
      setCurrentDirectory('/home/guest/portfolio');
      return [];
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const simulateCommand = async (cmd: string) => {
    setIsProcessing(true);
    const upperCmd = cmd.trim().toUpperCase();
    
    setCommandHistory(prev => [...prev, { loading: true, output: [`> ${cmd}`] }]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response: string[] = [];
    if (upperCmd === 'CLEAR') {
      setCommandHistory([]);
    } else if (upperCmd in commands) {
      response = commands[upperCmd as keyof typeof commands]();
    } else if (upperCmd !== '') {
      response = ['ERROR: Command not recognized. Type HELP for available commands.'];
    }
    
    setCommandHistory(prev => [
      ...prev.slice(0, -1),
      { loading: false, output: [`> ${cmd}`, ...response] }
    ]);
    
    setIsProcessing(false);
  };

  const handleCommand = (cmd: string) => {
    if (!isProcessing) {
      simulateCommand(cmd);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-vt323">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <TerminalIcon className="w-6 h-6" />
          <h1 className="text-xl font-press-start">Portfolio v 1.0</h1>
        </div>
        
        <div 
          ref={terminalRef}
          className="terminal-window h-[calc(100vh-8rem)] overflow-y-auto p-4"
        >
          {commandHistory.map((entry, i) => (
            <div key={i} className="mb-3 text-xl">
              {entry.loading ? (
                <>
                  <div>{entry.output[0]}</div>
                  <LoadingAnimation />
                </>
              ) : (
                <CommandOutput 
                  lines={entry.output.slice(1)} 
                  command={entry.output[0].slice(2)}
                />
              )}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-green-500">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-green-500 focus:ring-0 text-xl"
              autoFocus
              disabled={isProcessing}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button 
            onClick={() => handleCommand('ABOUT')} 
            className="flex items-center gap-1 hover:text-green-400 disabled:opacity-50 text-lg"
            disabled={isProcessing}
          >
            <User className="w-4 h-4" /> ABOUT
          </button>
          <button 
            onClick={() => handleCommand('PROJECTS')} 
            className="flex items-center gap-1 hover:text-green-400 disabled:opacity-50 text-lg"
            disabled={isProcessing}
          >
            <Briefcase className="w-4 h-4" /> PROJECTS
          </button>
          <button 
            onClick={() => handleCommand('SKILLS')} 
            className="flex items-center gap-1 hover:text-green-400 disabled:opacity-50 text-lg"
            disabled={isProcessing}
          >
            <Code className="w-4 h-4" /> SKILLS
          </button>
          <button 
            onClick={() => handleCommand('CONTACT')} 
            className="flex items-center gap-1 hover:text-green-400 disabled:opacity-50 text-lg"
            disabled={isProcessing}
          >
            <Mail className="w-4 h-4" /> CONTACT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terminal;