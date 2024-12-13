import { Chart } from '../interfaces';
import { IDBPDatabase, openDB } from 'idb';

interface ChartsObjectStore {
  id: string;
  userId: string;
  createdAt: string; 
  data: Chart;
}
interface ChartsDBSchema {
  charts: ChartsObjectStore;
}

const dbPromise: Promise<IDBPDatabase<ChartsDBSchema>> = openDB("chartsDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("charts")) {
      db.createObjectStore("charts", { keyPath: "id", autoIncrement: true });
    }
  },
});

export async function saveChart(chartData: Chart, userId: string) {
  const db = await dbPromise;
  await db.add("charts", {
    ...chartData,
    userId,
    createdAt: new Date().toISOString(),
  });
}

export async function getCharts(userId: string): Promise<ChartsObjectStore[]> {
  const db = await dbPromise;
  const allCharts = await db.getAll("charts");
  return allCharts.filter((chart) => chart.userId === userId);
}

export async function deleteChart(id: string) {
  const db = await dbPromise;
  await db.delete("charts", id);
}
