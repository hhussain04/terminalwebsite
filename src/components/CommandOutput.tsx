import React from 'react';
import SkillBar from './SkillBar';

interface CommandOutputProps {
  lines: string[];
  command: string;
}

const CommandOutput: React.FC<CommandOutputProps> = ({ lines, command }) => {
  if (command === 'SKILLS') {
    return (
      <div className="animate-fadeIn">
        <p className="mb-4">TECHNICAL SKILLS ANALYSIS:</p>
        <SkillBar skill="Web design" level={30} />
        <SkillBar skill="Python" level={65} />
        <SkillBar skill="Spreadsheets" level={80} />
        <SkillBar skill="Networking/Packet Tracer" level={70} />
        <SkillBar skill="Linux" level={80} />
        <SkillBar skill="HTML" level={80} />
        <SkillBar skill="CSS" level={80} />
        <SkillBar skill="JavaScript" level={60} />
        <SkillBar skill="Git" level={45} />
        <SkillBar skill="React" level={50} />
        <SkillBar skill="Deployment using PaaS" level={90} />
        <SkillBar skill="React" level={70} />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {lines.map((line, index) => (
        <div key={index} className="mb-1">{line}</div>
      ))}
    </div>
  );
}

export default CommandOutput;