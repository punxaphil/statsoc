'use server';
import { promises as fs } from 'fs';

export async function fetchData() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  return JSON.parse(file) as string[];
}
