import deleteData from "../../utils/deleteData";
import postData from "../../utils/postData";

export interface AnswerProps{
    id: number;
}

export interface AnswerInfo{
    ID: number;
    ANSWER: string,
    QUESTION_ID: number,
    COMMENTS?: {ID: number}[],
    CONTRIBUTED_BY: string,
    CONTRIBUTED_BY_FULLNAME?: string,
    VIEWS?: number,
    UPVOTES?: number,
    DOWNVOTES?: number,
    CREATED_AT?: string,
    UPDATED_AT?: string
}
export const defaultAnswerInfo: AnswerInfo = {
      ID: 2,
      ANSWER: "Answer content. Answer content",
      VIEWS: 0,
      UPVOTES: 0,
      QUESTION_ID: 0,
      CONTRIBUTED_BY: "hamid karzai",
};

export const upVote = () => {

}
export const downVote = () => {

}

export const addAnswer = (questionId: number, answerContent: string, token: string)=>{
    postData('/answer/add',{answer:answerContent,questionId:questionId},token)
    .then( (response) => {
        console.log(response);
        window.location.reload();
    })
    .catch( (error) => {
        console.log(error.response);
    });
}

export const removeAnswer = (answerId: number, token:string) => {
    deleteData('/answer/'+answerId+'/remove',token)
    .then(response=> {
        console.log(response.data.message);
        window.location.reload();
    })
    .catch(error=>{
        console.log(error.response.data.message) ;
    });
}