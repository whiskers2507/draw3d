import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Template } from '../types'

interface LuminaDB extends DBSchema {
  customTemplates: {
    key: string
    value: Template
    indexes: { 'by-date': number }
  }
  favorites: {
    key: string
    value: { id: string; savedAt: number }
  }
}

const DB_NAME = 'lumina-ar-db'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<LuminaDB>> | null = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<LuminaDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('customTemplates')) {
          const store = db.createObjectStore('customTemplates', { keyPath: 'id' })
          store.createIndex('by-date', 'createdAt')
        }
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function saveCustomTemplate(template: Template): Promise<void> {
  const db = await getDB()
  await db.put('customTemplates', template)
}

export async function getCustomTemplates(): Promise<Template[]> {
  const db = await getDB()
  return await db.getAllFromIndex('customTemplates', 'by-date')
}

export async function deleteCustomTemplate(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('customTemplates', id)
}

export async function toggleFavorite(id: string): Promise<boolean> {
  const db = await getDB()
  const exists = await db.get('favorites', id)
  if (exists) {
    await db.delete('favorites', id)
    return false
  } else {
    await db.put('favorites', { id, savedAt: Date.now() })
    return true
  }
}

export async function getFavorites(): Promise<string[]> {
  const db = await getDB()
  const keys = await db.getAllKeys('favorites')
  return keys as string[]
}
