import { ID, Query } from 'appwrite';
import { account, appwriteConfig, avatars, databases, storage } from './config';

/****************************************
 * Account and User Management Functions
 ***************************************/

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
            appwriteConfig.usersCollectionId,
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
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (!currentUser) throw new Error('No user found');

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
        return error;
    }
}

/****************************************
 * Event Management Functions
 ***************************************/

export async function createPickAFilm(pickAFilm) {

    if (!pickAFilm) return new Error('No pickAFilm data provided');

    // Add the host to the guestList
    const host = {
        id: "0",
        name: pickAFilm.host,
        filmsVoted: []
    }

    let guestList = [];

    try {
        // Prepare the pickAFilm document object
        let pickAFilmDocument = {
            title: pickAFilm.title,
            guestList: [...guestList, JSON.stringify(host)],
            date: pickAFilm.date,
        };

        // Create pickAFilm
        const newPickAFilm = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.pickAFilmsCollectionId,
            ID.unique(),
            pickAFilmDocument
        );

        return newPickAFilm;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the original error after attempting cleanup
    }
}

export async function getPickAFilm(pickAFilmId) {

    if (!pickAFilmId) return;

    try {
        const pickAFilm = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.pickAFilmsCollectionId,
            pickAFilmId
        );
        return pickAFilm;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePickAFilm(updatePickAFilm) {

    try {
        const updatedPickAFilm = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.pickAFilmsCollectionId,
            updatePickAFilm.$id,
            {
                host: updatePickAFilm.host,
                title: updatePickAFilm.title,
                date: updatePickAFilm.date,
            }
        );

        return updatedPickAFilm;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePickAFilmGuestList(updateDocument) {

    try {
        const res = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.pickAFilmsCollectionId,
            updateDocument.id,
            { guestList: updateDocument.newGuestList }
        );
        return res;
    } catch (error) {
        console.error('Error updating guest list:', error);
        return null;
    }
}

export async function deletePickAFilm(pickAFilmId) {
    try {
        const deletedPickAFilm = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.pickAFilmsCollectionId,
            pickAFilmId
        );

        if (!deletedPickAFilm) throw Error;

        return deletedPickAFilm;

    } catch (error) {
        console.log(error);
    }
}

export async function createEvent(event) {
    let uploadedFile;
    try {
        // If image exists, upload it to appwrite storage
        if (event.file && event.file.length > 0) {

            uploadedFile = await uploadFile(event.file[0]);
            if (!uploadedFile) throw Error;

            // Get a smaller version of the file
            const fileUrl = getFilePreview(uploadedFile.$id);
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            // Set event imageUrl and imageId
            event.imageUrl = fileUrl;
            event.imageId = uploadedFile.$id;
        }

        // Prepare the event document object
        let eventDocument = {
            creator: event.userId,
            type: event.type,
            title: event.title,
            location: event.location,
            guests: event.guestList,
            selectedFilms: event.selectedFilms,
        };

        // Conditionally add imageUrl and imageId if they exist
        if (event.imageUrl && event.imageId) {
            eventDocument.imageUrl = event.imageUrl;
            eventDocument.imageId = event.imageId;
        }

        // Create event
        const newEvent = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.eventsCollectionId,
            ID.unique(),
            eventDocument
        );

        // If event creation fails, delete the file from appwrite storage
        if (!newEvent && uploadedFile) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newEvent;
    } catch (error) {
        console.log(error);
        // Attempt to clean up by deleting the uploaded file if it exists and wasn't associated with a successfully created event
        if (uploadedFile) {
            try {
                await deleteFile(uploadedFile.$id);
            } catch (cleanupError) {
                console.log('Error cleaning up file:', cleanupError);
            }
        }
        throw error; // Rethrow the original error after attempting cleanup
    }
}

export async function uploadFile(file) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );

        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileId) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);

        return { status: "ok" };
    } catch (error) {
        console.log(error);
    }
}

export function getFilePreview(fileId) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        );

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserEvents(userId) {
    if (!userId) return;

    try {
        const events = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.eventsCollectionId,
            [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
        );

        if (!events) {
            console.log("No events found");
            throw Error;
        }

        return events;
    } catch (error) {
        console.log(error);
    }
}