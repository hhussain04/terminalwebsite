import React, { useState } from 'react';
import { Grid } from 'lucide-react';
import TicTacToe from './TicTacToe';

const GridLogo: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 text-green-500">
      <Grid className="w-6 h-6 cursor-pointer" onClick={() => setShowGame(!showGame)} />
      <span className="font-vt323 text-xl tracking-wider"></span>
      {showGame && <TicTacToe onClose={() => setShowGame(false)} />}
    </div>
  );
};

export default GridLogo;