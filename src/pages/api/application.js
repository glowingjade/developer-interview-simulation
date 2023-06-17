import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '/private/applications.json');

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      const jsonData = await fsPromises.readFile(dataFilePath);
      const objectData = JSON.parse(jsonData);

      const { name, application, position, motivation, skill } = req.body;
      const newData = {
        id: objectData.length,
        name,
        application,
        position,
        motivation,
        skill
      };

      objectData.push(newData);

      const updatedData = JSON.stringify(objectData);
      await fsPromises.writeFile(dataFilePath, updatedData);

      res.status(200).json({ message: 'Successfully updated application' });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating application' });
    }
  }
}