import React from 'react';

interface SkillBarProps {
  skill: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-green-900 h-2">
        <div 
          className="h-full bg-green-500 transition-all duration-1000" 
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default SkillBar;