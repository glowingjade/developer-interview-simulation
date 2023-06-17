import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const chatListDirectory = path.join(process.cwd(), '/private/interview');

export async function getSortedChatList() {
  const fileNames = fs.readdirSync(chatListDirectory);
  const allData = fileNames.map((fileName) => {
    const id = fileName.split('.')[0];
    return getChatData(id);
  });
  // Sort posts by date
  return allData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllChatIds() {
  const fileNames = fs.readdirSync(chatListDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ''),
      }
    }
  });
}

export async function getChatData(id) {
  const fullPath = path.join(chatListDirectory, `${id}.json`);
  const fileContents = await fsPromises.readFile(fullPath);
  const jsonData = JSON.parse(fileContents);

  return {
    id,
  }
}
