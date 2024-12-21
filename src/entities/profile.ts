import { Gender, UserEntity } from "./user";

export interface ProfileEntity {
    user: UserEntity;
    username: string;
    fullname: string;
    gender: Gender;
    image: string;
}