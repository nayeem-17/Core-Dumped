import { WindowOutlined } from "@mui/icons-material";
import deleteData from "../../utils/deleteData";

export interface QuestionProps{
    id: number;
}
export interface QuestionInfo{
    ID: number;
    TITLE: string,
    CONTENT: string,
    ANSWERS?: {ID: number}[],
    COMMENTS?: {ID: number}[],
    CONTRIBUTED_BY: string,
    CONTRIBUTED_BY_FULLNAME?: string,
    VIEWS?: number,
    UPVOTES?: number,
    DOWNVOTES?: number,
    CREATED_AT?: string,
    UPDATED_AT?: string,
    TAGS?: {ID: number}[]
}
export const defaultQuestionInfo: QuestionInfo = {
    ID: 2,
    TITLE: "Question Title",
    CONTENT: "Question content. Question content\nQuestion content",
    VIEWS: 0,
    UPVOTES: 0,
    CONTRIBUTED_BY: "hamid karzai",
};
