import path from 'path';
import fs from 'fs/promises';
import { RoomSettings } from '../Slots/Slots.interface';

export async function getData(): Promise<RoomSettings> {
  const jsonPath = path.resolve(__dirname, '../../slots.json');
  const data = await fs.readFile(jsonPath, 'utf8');
  return JSON.parse(data) as RoomSettings;
}
