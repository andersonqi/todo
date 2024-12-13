import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getToken = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const removeToken = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
