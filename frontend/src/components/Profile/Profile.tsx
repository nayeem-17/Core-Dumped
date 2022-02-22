export interface ProfileProps{
    username: string;
}
export interface ProfileInfo{
    ID: number,
    USERNAME: string,
    FIRST_NAME: string,
    LAST_NAME: string,
    BIRTHDATE?: string,
    LOCATION?: string,
    EMAIL: string,
    TITLE: string,
    DESCRIPTION: string,
    SCORE: number,
    INTERESTS?:  {ID: number, TITLE:string }[],
    QUESTIONS?: {ID: number}[],
    ARTICLES?: {ID: number}[],
    ANSWERS?: {ID: number}[],
    FOLLOWERS?: {ID: number, USERNAME: string}[],
    FOLLOWING?: {ID: number, USERNAME: string}[]
    PROFILE_PICTURE? : string;
    CREATED_AT?: string,
    LAST_ACTIVE?: string
};

export const defaultProfileInfo: ProfileInfo = {
    ID: 0,
    USERNAME: "",
    FIRST_NAME: "Ernesto",
    LAST_NAME: "Che Guevara",
    EMAIL: "abc@google.com",
    TITLE: '',
    BIRTHDATE: '2222-2-22',
    DESCRIPTION:
      "Many will call me an adventurer, and that I am...only one of a different sort.",
    SCORE: 33,
    INTERESTS: [],
    PROFILE_PICTURE: "https://static9.depositphotos.com/1206677/1109/i/950/depositphotos_11093950-stock-photo-anonymous-mask-of-the-the.jpg"
}
