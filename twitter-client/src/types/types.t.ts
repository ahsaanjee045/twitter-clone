export type User = {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    displayName: string;
    bio: string;
    followers: [];
    followings: [];
    __v: 0;
    token?: string;
    createdAt: string;
    updatedAt: string;
  };