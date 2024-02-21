import { ID } from 'appwrite';
import { account, appwriteConfig, avatars, database } from './config';

export async function createUserAccount(user) {
    try {
        // Create a new account with Appwrite
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if (!newAccount) throw new Error('Account not created');

        // Get the initials of the user's name with Appwrite's avatars service
        const avatarUrl = await avatars.getInitials(user.name);

        // Save the user to the database
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username, // from the form
            imageUri: avatarUrl,  // from the avatars service
        })

        return newAccount;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function saveUserToDB(user) {
    try {
        // Save the user to the database with Appwrite
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            ID.unique(),
            user,
        );
        return newUser;
    } catch (error) {
        console.error(error);
        return error;
    }
}