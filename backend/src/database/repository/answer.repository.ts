import Repository from '../Repository';
import oracle from 'oracledb';
class AnswerRepository extends Repository {
  constructor() {
    super();
  }
  addAnswer = async (
    answer: string,
    questionId: number,
    contributedBy: number,
  ) => {
    const query = `INSERT 
                    INTO ANSWER(ANSWER,QUESTION_ID,CONTRIBUTED_BY) 
                    VALUES(:answer,:questionId,:contributedBy)`;
    const result = await this.query(query, [answer, questionId, contributedBy]);
    return result;
  };
  getAnswer = async (answerId: number) => {
    const query = `SELECT A.ID ID,
                           A.ANSWER ANSWER,
                           P.USERNAME CONTRIBUTED_BY,
                           (P.FIRST_NAME||' '||P.LAST_NAME) CONTRIBUTED_BY_FULLNAME,
                           A.QUESTION_ID QUESTION_ID,
                           TO_CHAR(A.CREATED_AT,'HH24:MI, DD Month,YYYY') CREATED_AT,
                           TO_CHAR(A.UPDATED_AT,'HH24:MI, DD Month,YYYY') UPDATED_AT 
                    FROM ANSWER A JOIN PROFILE P
                    ON A.CONTRIBUTED_BY=P.ID
                    WHERE A.ID=:answerId`;
    const result = await this.query(query, [answerId]);
    return result;
  };
  getAnswerVoteInfo = async (answerId: string, userId: string) => {
    const query = `SELECT
      NVL( ( SELECT REACT FROM ANSWER_REACT WHERE REACTED_BY=:userId AND ANSWER_ID=:answerId), 'EMPTY' ) USER_VOTE,
      NVL( ( SELECT COUNT( * ) FROM ANSWER_REACT WHERE ANSWER_ID =:answerId AND UPPER( REACT ) = 'Y' ), 0 ) UPVOTES,
      NVL( ( SELECT COUNT( * ) FROM ANSWER_REACT WHERE ANSWER_ID =:answerId AND UPPER( REACT ) = 'N' ), 0 ) DOWNVOTES   
    FROM
      DUAL`;

    const params = {
      answerId: {
        val: parseInt(answerId),
        type: oracle.NUMBER,
        dir: oracle.BIND_IN,
      },
      userId: {
        val: parseInt(userId),
        type: oracle.NUMBER,
        dir: oracle.BIND_IN,
      },
    };
    const result = await this.query(query, params);
    return result;
  };
  getAnswersByUser = async (username: string) => {
    const query = `SELECT A.ID ID
                  FROM ANSWER A JOIN PROFILE P
                  ON A.CONTRIBUTED_BY = P.ID
                  WHERE P.USERNAME=:username`;
    const result = await this.query(query, [username]);
    return result;
  };
  getAnswersOfQuestion = async (questionId: string) => {
    const query = `SELECT A.ID ID
                    FROM ANSWER A JOIN QUESTION Q
                    ON A.QUESTION_ID=Q.ID
                    WHERE Q.ID=:questionId`;
    const result = await this.query(query, [questionId]);
    return result;
  };
  updateAnswer = async (answerId: number, answer: string) => {
    const query = `UPDATE ANSWER 
                    SET ANSWER=:answer 
                    WHERE ID=:answerId`;
    const result = await this.query(query, [answer, answerId]);
    return result;
  };
  deleteAnswer = async (answerId: number) => {
    const query = `DELETE FROM ANSWER WHERE ID=:answerId`;
    const result = await this.query(query, [answerId]);
    return result;
  };

  upVoteAnswer = async (answerId: string, userId: string) => {
    const query = `BEGIN
                        REACT_ANSWER(:answerId,:userId,'Y');
                      END;`;
    const result = this.query(query, [answerId, userId]);
    return result;
  };
  downVoteAnswer = async (answerId: string, userId: string) => {
    const query = `BEGIN
                        REACT_ANSWER(:answerId,:userId,'N');
                      END;`;
    const result = this.query(query, [answerId, userId]);
    return result;
  };
}
export default AnswerRepository;
