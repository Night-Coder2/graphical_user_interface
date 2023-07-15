import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';

function CodingList() {
  const gameFiles = fs.readdirSync('renderer/public/json/coding');

  const gameElements = gameFiles.map((fileName) => {
    const filePath = path.join('renderer/public/json/coding', fileName);
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

        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  });

  return <div>{gameElements}</div>;
}

export default CodingList;