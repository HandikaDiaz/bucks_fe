export interface UserEntity {
    id: number;
    username: string;
    email: string;
    gender: Gender;
    fullname: string;
    image: string;
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}