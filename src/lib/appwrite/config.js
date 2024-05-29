import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    eventsCollectionId: import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    pickAFilmsCollectionId: import.meta.env.VITE_APPWRITE_PICKAFILMS_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);