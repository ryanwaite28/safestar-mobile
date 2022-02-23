import { Image } from 'react-native';
import { IUser } from "../interfaces/user.interface";



export function getUserIcon(user: IUser, styles?: any) {
  return (
    <Image style={styles} source={user.icon_link ? {uri: user.icon_link} : require(`../../assets/anon.png`)} />
  );
}