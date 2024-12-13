/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDB } from 'idb';

const dbPromise = openDB('chartsDB', 1, {
    upgrade(db: any) {
        if (!db.objectStoreNames.contains('charts')) {
            db.createObjectStore('charts', { keyPath: 'id', autoIncrement: true });
        }
    },
});

export async function saveChart(chartData: any) {
    const db = await dbPromise;
    await db.add('charts', { ...chartData, createdAt: new Date().toISOString() });
}

export async function getCharts() {
    const db = await dbPromise;
    return await db.getAll('charts');
}

export async function deleteChart(id: number) {
    const db = await dbPromise;
    await db.delete('charts', id);
}
