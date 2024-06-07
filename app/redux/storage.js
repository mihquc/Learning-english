import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
    async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Error retrieving data from AsyncStorage for key '${key}':`, error);
            return null;
        }
    },
    async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error storing data in AsyncStorage for key '${key}':`, error);
        }
    },
    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing data from AsyncStorage for key '${key}':`, error);
        }
    },
};

export default storage;
