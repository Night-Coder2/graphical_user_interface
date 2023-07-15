import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';

function UtiliesList() {
  const gameFiles = fs.readdirSync('renderer/public/json/utilities');

  const gameElements = gameFiles.map((fileName) => {
    const filePath = path.join('renderer/public/json/utilities', fileName);
    const gameData = fs.readFileSync(filePath);
    const game = JSON.parse(gameData);
    const handleDelete = (e) => {
        fs.unlinkSync(filePath);
        window.location.reload();
    }

    return (
      <div className="p-2" key={game.id}>
        <button
          onClick={() => execFile(game.path)}
          className="text-white rounded-lg p-3 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl"
        >
          {game.name}
        </button>

        <button onClick={handleDelete} className='text-white rounded-lg p-3 hover:scale-105 duration-150 shadow-gray-950 bg-gradient-to-r from-gray-700 to-gray-800 shadow-2xl'>Delete</button>
      </div>
    );
  });

  return <div>{gameElements}</div>;
}

export default UtiliesList;