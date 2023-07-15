'use client'

import path from 'path';
import {Command} from '@tauri-apps/api/shell'
import {readDir, readTextFile, removeFile, BaseDirectory} from '@tauri-apps/api/fs'

async function GameList() {
  const gameFiles = await readDir('public/json/games', {dir: BaseDirectory.App});

  const gameElements = gameFiles.map(async (fileName) => {
    const filePath = path.join('public/json/games', fileName);
    let gameData;
    let game;

    try {
      gameData = await readTextFile(filePath);
      game = JSON.parse(gameData);
    } catch (error) {
      console.error('Error parsing JSON file:', error);
      return null; // Skip this file and continue with the next iteration
    }
    const handleDelete = async (e) => {
        await removeFile(filePath);
        window.location.reload();
    }

    return (
      <div className="p-2" key={game.id}>
        <button
          onClick={async() => await new Command(game.path).execute()}
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

export default GameList;