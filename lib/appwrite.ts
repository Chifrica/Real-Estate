import {Account, Avatars, Client, Databases, OAuthProvider} from "react-native-appwrite";
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
    platform: 'com.jsm.real_estate',
    endpoint:  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleryCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERY_COLLECTION,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
        const redirectURL = Linking.createURL('/');

        const response = await account.createOAuth2Token(
            OAuthProvider.Google, 
            redirectURL
        );

        if (!response) {
            throw new Error('Failed to login');    
        }

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectURL
        );

        if (browserResult.type !== 'success') {
            throw new Error('Failed to login');    
        }

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();
    
        if (!secret || !userId) {
            throw new Error('Failed to login');   
        }

        const session = await account.createSession(userId, secret); 

        if (!session) {
            throw new Error('Failed to create a session');   
        }

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();

        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name || '');
            return {
                ... response,
                avatar: userAvatar.toString()
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
} 