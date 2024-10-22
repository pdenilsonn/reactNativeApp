import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

// INFORMA para o Appwrite(banco de dados).
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    plataform: 'com.jsom.aoraapp01', // <-- This is the Bundle ID
    projectId: '6716880800255af80664',
    databaseId: '6717fcbb000d291b45f6',
    userCollectionId: '6717fcf1001b153d4e8f',
    videoCollectionId: '6717fd23000e089f5fec',
    storageId: '6717ff900013b8f7f2d5',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.plataform) // Your application ID or bundle ID.


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// REGISTRA User
export const createUser = async (email, password, username) => {
    try {
        // CRIA nova conta.  
        const newAccount = await account.create(
            ID.unique(), // <- criar um Id único.
            email,
            password,
            username,
        )
        if (!newAccount) throw Error; // <- verifica erro. 

        const avatarUrl = avatars.getInitials(username) // <- quando criar uma conta, será criado um avatar usando as iniciais do usuário.

        await signIn(email, password) // <- após conta criada, fazer login automático.
        
        // CRIA um novo documento em uma coleção do banco de dados.
        const newUser = await databases.createDocument(
            config.databaseId, // <-- Id banco de dados.
            config.userCollectionId, // <-- Id da coleção.
            ID.unique(), // <-- Id do usuário.
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        )
        return newUser

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Função para login. Uso de async por conta da conexão com o BD do Appwrite.
export async function signIn(email, password) {
    try {
        // CRIA uma nova sessão de login para o usuário com base em seu email e senha.
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
