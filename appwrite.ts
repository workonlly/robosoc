
import { Client, Databases } from "appwrite";

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1') 
    .setProject('689ced4600050a73f698'); 

export const databases = new Databases(client);

// TODO: replace with your actual IDs
export const DB_ID = '689ced5c000a2e8699e9';
