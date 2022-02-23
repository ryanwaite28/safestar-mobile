import moment from "moment";
import { IUser } from "../interfaces/user.interface";

export function isJwtFormat(value: any) {
  return !!value && (/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/).test(value);
}

export function capitalize(str: string) {
  if (!str) {
    return '';
  } else if (str.length < 2) {
    return str.toUpperCase();
  }
  const Str = str.toLowerCase();
  const capitalized = Str.charAt(0).toUpperCase() + Str.slice(1);
  return capitalized;
}

export const getUserFullName = (user: IUser) => {
  if (user) {
    const { firstname, middlename, lastname } = user;
    const middle = middlename
      ? ` ${middlename} `
      : ` `;

    const displayName = `${firstname}${middle}${lastname}`;
    return displayName;
  } else {
    return '';
  }
};

export function getTimeAgo(value: Date | string, hideAgoText: boolean = false) {
  const timeAgo = moment(value).fromNow(hideAgoText);
  return timeAgo;
}

export function formatDateUi(value: Date | string, hideAgoText: boolean = false) {
  const uiDate = moment(value).format("MMM d, y (h:mm a)")
  return uiDate;
}