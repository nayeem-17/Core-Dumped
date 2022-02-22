export interface TagProps{
    id : number
}
export interface TagInfo {
  ID: number;
  TITLE: string ;
  DESCRIPTION?: string;
  CREATED_AT?: string ;
  UPDATED_AT?: string;
  SYNONYMS?: string ;
}

export const defaultTagInfo = {
  ID: 0,
  TITLE: "Tag",
}
