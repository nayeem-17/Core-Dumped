import oracle, { oracleClientVersion } from 'oracledb';
import Repository from '../Repository';

class QuestionRepository extends Repository {
  constructor() {
    super();
  }
  addQuestion = async (
    questionTitle: string,
    questionContent: string,
    questionContributor: number,
    organizationId: number,
  ) => {
    const query = `INSERT 
                    INTO QUESTION 
                    (TITLE,CONTENT,CONTRIBUTED_BY,ORGANIZATION_ID,CREATED_AT) 
                    VALUES (:questionTitle,:questionContent,:questionContributor,:organizationId,SYSDATE)
                    RETURNING ID INTO :questionId`;
    const params = {
      questionTitle: {
        val: questionTitle,
        type: oracle.STRING,
        dir: oracle.BIND_IN,
      },
      questionContent: {
        val: questionContent,
        type: oracle.STRING,
        dir: oracle.BIND_IN,
      },
      questionContributor: {
        val: questionContributor,
        type: oracle.NUMBER,
        dir: oracle.BIND_IN,
      },
      organizationId: {
        val: organizationId,
        type: oracle.NUMBER,
        dir: oracle.BIND_IN,
      },
      questionId: { val: 0, type: oracle.NUMBER, dir: oracle.BIND_OUT },
    };
    const result = await this.query(query, params);
    // console.log(result);
    return result;
  };
  getQuestion = async (questionId: number) => {
    const query = `SELECT Q.ID ID, 
                          Q.TITLE TITLE, 
                          Q.CONTENT CONTENT,
                          (P.FIRST_NAME||' '||P.LAST_NAME) CONTRIBUTED_BY_FULLNAME, 
                          P.USERNAME CONTRIBUTED_BY, 
                          TO_CHAR(Q.CREATED_AT,'HH24:MI  DD Month, YYYY') CREATED_AT, 
                          TO_CHAR(Q.UPDATED_AT,'HH24:MI  DD Month, YYYY') UPDATED_AT,
                          Q.VIEWS VIEWS 
                    FROM QUESTION Q JOIN PROFILE P
                    ON Q.CONTRIBUTED_BY = P.ID
                    WHERE Q.ID=:id`;
    const result = await this.query(query, [questionId]);
    return result;
  };
  getQuestionThumbnail = async (questionId: number) => {
    const query = `SELECT Q.ID ID, 
                          Q.TITLE TITLE, 
                
                          (P.FIRST_NAME||' '||P.LAST_NAME) CONTRIBUTED_BY_FULLNAME, 
                          P.USERNAME CONTRIBUTED_BY, 
                          TO_CHAR(Q.CREATED_AT,'HH24:MI  DD Month, YYYY') CREATED_AT, 
                          TO_CHAR(Q.UPDATED_AT,'HH24:MI  DD Month, YYYY') UPDATED_AT,
                          Q.VIEWS VIEWS 
                    FROM QUESTION Q JOIN PROFILE P
                    ON Q.CONTRIBUTED_BY = P.ID
                    WHERE Q.ID=:id`;
    const result = await this.query(query, [questionId]);
    return result;
  };
  editQuestionData = async (
    questionId: number,
    questionTitle: string,
    questionContent: string,
  ) => {
    const query = `UPDATE QUESTION
                   SET TITLE=:questionTitle,
                       CONTENT=:questionContent,
                       UPDATED_AT=CURRENT_TIMESTAMP
                   WHERE ID=:questionId`;
    const result = await this.query(query, [
      questionTitle,
      questionContent,
      questionId,
    ]);
    return result;
  };
  deleteQuestion = async (questionId: number) => {
    const query = `DELETE FROM QUESTION WHERE ID=:questionId`;
    const result = await this.query(query, [questionId]);
    return result;
  };

  getQuestionsByUser = async (username: string) => {
    const query = `SELECT Q.ID
                    FROM PROFILE P JOIN QUESTION Q
                    ON Q.CONTRIBUTED_BY = P.ID 
                    WHERE P.USERNAME=:username`;
    const result = this.query(query, [username]);
    return result;
  };

  searchQuestion = async (searchString: string, sortBy?: string) => {
    // const query = `SELECT SEARCH_QUESTION(:searchString) RESULT FROM DUAL`;
    let query = `SELECT Q.ID
                FROM QUESTION Q
                WHERE LOWER(Q.TITLE) 
                LIKE '%'||LOWER(REPLACE(:searchString,' ','%'))||'%' 
                `;
    if (sortBy === 'views') {
      query += ' ORDER BY VIEWS DESC';
    } else {
      query += ' ORDER BY CREATED_AT DESC';
    }
    const result = this.query(query, [searchString]);
    return result;
  };

  getRelatedQuestions = async (questionId: string) => {
    const query = `SELECT UNIQUE QUESTION_ID ID 
                  FROM QUESTION_TAG
                  WHERE TAG_ID IN (SELECT TAG_ID 
                                  FROM 
                                  QUESTION_TAG 
                                  WHERE QUESTION_ID=:questionId) AND QUESTION_ID <>:questionId
                  `;
    const result = this.query(query, [questionId, questionId]);
    return result;
  };

  getQuestionVoteInfo = async (questionId: string, userId: string) => {
    const query = `SELECT
      NVL( ( SELECT REACT FROM QUESTION_REACT WHERE REACTED_BY=:userId AND QUESTION_ID=:questionId), 'EMPTY' ) USER_VOTE,
      NVL( ( SELECT COUNT( * ) FROM QUESTION_REACT WHERE QUESTION_ID =:questionId AND UPPER( REACT ) = 'Y' ), 0 ) UPVOTES,
      NVL( ( SELECT COUNT( * ) FROM QUESTION_REACT WHERE QUESTION_ID =:questionId AND UPPER( REACT ) = 'N' ), 0 ) DOWNVOTES   
    FROM
      DUAL`;

    const params = {
      questionId: {
        val: parseInt(questionId),
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
  upVoteQuestion = async (questionId: string, userId: string) => {
    const query = `BEGIN 
                      REACT_QUESTION(:questionId,:userId,'Y');
                  END;`;
    const result = await this.query(query, [questionId, userId]);
    return result;
  };
  downVoteQuestion = async (questionId: string, userId: string) => {
    const query = `BEGIN 
                      REACT_QUESTION(:questionId,:userId,'N');
                  END;`;
    const result = await this.query(query, [questionId, userId]);
    return result;
  };
  viewQuestion = async (questionId: number) => {
    const query = `UPDATE QUESTION
                   SET VIEWS=VIEWS+1
                   WHERE ID=:quesitonId`;
    const result = await this.query(query, [questionId]);
    return result;
  };
}
export default QuestionRepository;
