import AsyncStorage from '@react-native-async-storage/async-storage';



export class StorageService {
  static async storeData (name: string, value: any) {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      // console.log(e);
    }
  }

  static async storeObject (name: string, value: any) {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      // console.log(e);
    }
  }

  static async getData (name: string) {
    try {
      const data = await AsyncStorage.getItem(name);
      return data;
    } catch (e) {
      // console.log(e);
    }
  }

  static async getObject (name: string) {
    try {
      const data = await AsyncStorage.getItem(name);
      const parsed = data && JSON.parse(data);
      return parsed;
    } catch (e) {
      // console.log(e);
    }
  }

  static async removeData (name: string) {
    try {
      const data = await AsyncStorage.removeItem(name);
      return data;
    } catch (e) {
      // console.log(e);
    }
  }
}