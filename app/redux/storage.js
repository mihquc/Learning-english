import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
    async getItem(key) {
        return JSON.parse((await AsyncStorage.getItem(key)));
    },
    async setItem(key, data) {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    },
    async removeItem(key) {
        await AsyncStorage.removeItem(key);
    },
};
