import { ID, Query } from 'appwrite';
import { account, appwriteConfig, avatars, databases } from './config';

// Create a new user account with Appwrite
export async function createUserAccount(user) {
    try {
        // Create a new account passing in SignupForm data to Appwrite's account service
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
            imageUrl: avatarUrl,  // from the avatars service
        })

        return newUser;
    } catch (error) {
        console.error(error);
        return error;
    }
}

// Save the user to the database with Appwrite
export async function saveUserToDB(user) {
    try {
        // Save the user to the database with Appwrite
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.error(error);
        return error;
    }
}

// Sign in the user with Appwrite
export async function signInAccount(user) {
    try {
        // Sign in the user with Appwrite
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    }
    catch (error) {
        console.error(error);
    }
}

// Get the current account with Appwrite
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        console.log(error);
    }
}


// Sign out the user with Appwrite
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error);
    }
}





// Get the current user with Appwrite
export async function getCurrentUser() {
    try {
        // Get the current user with Appwrite
        const currentAccount = await getAccount();
        if (!currentAccount) throw new Error('No user found');

        // Get the user from the database with Appwrite
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (!currentUser) throw new Error('No user found');

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
        return error;
    }
}