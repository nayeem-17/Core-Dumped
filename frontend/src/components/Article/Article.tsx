export interface ArticleProps {
    id : number
}
export interface ArticleInfo{
  ID: number;
  TITLE: string,
  CONTENT: string,
  COMMENTS?: {ID: number}[],
  CONTRIBUTED_BY: string,
  CONTRIBUTED_BY_FULLNAME?: string,
  CREATED_AT?: string,
  UPDATED_AT?: string,
  VIEWS?: number,
  UPVOTES?: number,
  DOWNVOTES?: number,
  TAGS?: {ID:number}[]
};
export const defaultArticleInfo: ArticleInfo = {
  ID: 0,
  CONTRIBUTED_BY: "",
  TITLE: "Article Title",
  CONTENT: "Article content. Article content\nArticle content",
};

export function upVote(){

}

export function downVote(){
  
}