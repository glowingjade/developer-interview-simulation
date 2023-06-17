import fs from 'fs';
import path from 'path';

const chatListDirectory = path.join(process.cwd(), '/private/interview');

export async function getSortedChatList() {
  try {
    const fileNames = await fs.promises.readdir(chatListDirectory);
    return fileNames.map((fileName) => {
      const id = fileName.replace(/\.json$/, '');
      return {
        id,
      };
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getChatData(id) {
  const fullPath = path.join(chatListDirectory, `${id}.json`);
  const fileContents = await fs.promises.readFile(fullPath);
  const jsonData = JSON.parse(fileContents);

  return {
    id,
  }
}
