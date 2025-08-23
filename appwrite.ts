
import { Client, Databases } from "appwrite";

// Environment variables
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// Validate environment variables
if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_DATABASE_ID) {
    throw new Error(
        'Missing required environment variables. Please check your .env file and ensure VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID, and VITE_APPWRITE_DATABASE_ID are set.'
    );
}

export const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT) 
    .setProject(APPWRITE_PROJECT_ID); 

export const databases = new Databases(client);

// Export the database ID for use in components
export const DB_ID = APPWRITE_DATABASE_ID;



