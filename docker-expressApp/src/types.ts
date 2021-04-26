export type UserProps = { userStatus: string; userName: string; password: string };

export type ValidationProps = { message: string | boolean };

export type UserDetailsFromFileProps = {
  [user: string]: { userStatus: string; userName: string; password: string };
};

export type StreamsProps = {
  streams: {
    default: { [x: string]: string };
    fromUser: { [x: string]: string };
  };
};

export type UserStreamDataProps = {
  [x: string]: string;
};
