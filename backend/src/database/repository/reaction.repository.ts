import Repository from '../Repository';

class ReactionRepository extends Repository {
  constructor() {
    super();
  }
  addArticleReact = async (
    articleId: number,
    userId: number,
    reaction: number,
  ) => {
    const query = `INSERT INTO 
    ARTICLE_REACT(
        ARTICLE_ID,
        REACTED_BY,
        REACT
    ) 
    VALUES(
        :articleId,
        :userId,
        :reaction)
`;
    const param = [articleId, userId, reaction];
    const result = await this.query(query, param);
    return result;
  };
  addQuestionReact = async (
    questionId: number,
    userId: number,
    reaction: number,
  ) => {
    const query = `INSERT INTO 
    QUESTION_REACT(
        QUESTION_ID,
        REACTED_BY,
        REACT
    ) 
    VALUES(
        :questionId,
        :userId,
        :reaction)
`;
    const param = [questionId, userId, reaction];
    const result = await this.query(query, param);
    return result;
  };
  addAnswerReact = async (
    answerId: number,
    userId: number,
    reaction: number,
  ) => {
    const query = `INSERT INTO
    ANSWER_REACT(
        ANSWER_ID,
        REACTED_BY,
        REACT
    )
    VALUES(
        :answerId,
        :userId,
        :reaction)
`;
    const param = [answerId, userId, reaction];
    const result = await this.query(query, param);
    return result;
  };
  updateArticleReact = async (
    articleId: number,
    userId: number,
    reaction: number,
  ) => {
    const query = `UPDATE ARTICLE_REACT 
                    SET REACT=:reaction 
                    WHERE ARTICLE_ID=:articleId AND REACTED_BY=:userId`;
    const param = [reaction, articleId, userId];
    const result = await this.query(query, param);
    return result;
  };
  updateQuestionReact = async (
    questionId: number,
    reaction: number,
    userId: number,
  ) => {
    const query = `UPDATE QUESTION_REACT 
                    SET REACT=:reaction 
                    WHERE QUESTION_ID=:questionId
                    AND REACTED_BY=:userId`;
    const param = [reaction, questionId, userId];
    const result = await this.query(query, param);
    return result;
  };
  updateAnswerReact = async (
    answerId: number,
    reaction: number,
    userId: number,
  ) => {
    const query = `UPDATE ANSWER_REACT 
                    SET REACT=:reaction 
                    WHERE ANSWER_ID=:answerId
                    AND REACTED_BY=:userId`;

    const param = [reaction, answerId, userId];
    const result = await this.query(query, param);
    return result;
  };
}
export default ReactionRepository;
