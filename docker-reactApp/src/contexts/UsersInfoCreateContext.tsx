import { createContext } from 'react'

export type UserInfoFromFileProps = {
    [user: string]: { userStatus: string; userName: string; password: string };
  };

export const UsersInfoContext = createContext<UserInfoFromFileProps>({});