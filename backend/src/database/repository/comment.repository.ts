import Repository from '../Repository';

class CommentRepository extends Repository {
  constructor() {
    super();
  }
  addComment = async (
    comment: string,
    contributedBy: string,
    commentOf: string,
    typeId: string,
  ) => {
    // const query = `EXEC INSERT_COMMENT(:comment,:contributedBy,:commentOf,:typeId) ;`;
    const query = `BEGIN 
                    INSERT_COMMENT(:comment,:contributedBy,:commentOf,:typeId);
                   END;`;
    const result = await this.query(query, [
      comment,
      contributedBy,
      commentOf,
      typeId,
    ]);
    return result;
  };
  getComment = async (commentId: string) => {
    const query = `SELECT C.ID ID,
                          C.TEXT TEXT,
                          TO_CHAR(C.CREATED_AT,'HH24:MI DD Month,YYYY') CREATED_AT,
                          TO_CHAR(C.UPDATED_AT,'HH24:MI DD Month,YYYY')  UPDATED_AT,
                          P.USERNAME CONTRIBUTED_BY,
                          (P.FIRST_NAME||' '||P.LAST_NAME) CONTRIBUTED_BY_FULLNAME 
                  FROM COMMENTS C JOIN PROFILE P
                  ON C.CONTRIBUTED_BY=P.ID
                  WHERE C.ID=:commentId
                  `;
    const result = await this.query(query, [commentId]);
    return result;
  };
  getQuestionComments = async (questionId: string) => {
    const query = `SELECT C.ID ID
                    FROM COMMENTS C JOIN QUESTION_COMMENT QC
                    ON C.ID=QC.COMMENT_ID
                    WHERE QC.QUESTION_ID=:questionId`;
    const result = await this.query(query, [questionId]);
    return result;
  };
  getArticleComments = async (articleId: string) => {
    const query = `SELECT C.ID ID
                    FROM COMMENTS C JOIN ARTICLE_COMMENT AC
                    ON C.ID=AC.COMMENT_ID
                    WHERE AC.ARTICLE_ID=:articleId`;
    const result = await this.query(query, [articleId]);
    return result;
  };
  getAnswerComments = async (answerId: string) => {
    const query = `SELECT C.ID ID
                    FROM COMMENTS C JOIN ANSWER_COMMENT AC
                    ON C.ID=AC.COMMENT_ID
                    WHERE AC.ANSWER_ID=:answerId`;
    const result = await this.query(query, [answerId]);
    return result;
  };
  getUserComments = async (username: string) => {
    const query = `SELECT C.ID ID
                    FROM COMMENTS C JOIN PROFILE P
                    ON C.CONTRIBUTED_BY=P.ID
                    WHERE P.USERNAME=:username`;
    const result = await this.query(query, [username]);
    return result;
  };
  updateComment = async (commentId: number, comment: string) => {
    const query = `
    UPDATE 
      COMMENTS 
    SET 
      TEXT = :COMMENT 
    WHERE
      ID = :ID;`;
    const result = await this.query(query, [comment, commentId]);
    return result;
  };

  deleteComment = async (commentId: number) => {
    const query = `DELETE FROM COMMENTS WHERE ID = :ID`;
    const result = await this.query(query, [commentId]);
    return result;
  };
}
export default CommentRepository;
