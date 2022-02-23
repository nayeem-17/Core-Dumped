import oracle, { oracleClientVersion } from 'oracledb';
import Repository from '../Repository';
class ArticleRepository extends Repository {
  constructor() {
    super();
  }
  insertArticle = async (
    articleTitle: string,
    articleContent: string,
    articleContributor: number,
    // organizationId: number,
  ) => {
    const query = `INSERT 
                    INTO ARTICLE 
                    (TITLE,CONTENT,CONTRIBUTED_BY,CREATED_AT) 
                    VALUES (:articleTitle,:articleContent,:articleContributor,SYSDATE)
                    RETURNING ID INTO :articleId`;
    const params = {
      articleTitle: {
        val: articleTitle,
        type: oracle.STRING,
        dir: oracle.BIND_IN,
      },
      articleContent: {
        val: articleContent,
        type: oracle.STRING,
        dir: oracle.BIND_IN,
      },
      articleContributor: {
        val: articleContributor,
        type: oracle.NUMBER,
        dir: oracle.BIND_IN,
      },
      articleId: { val: 0, type: oracle.NUMBER, dir: oracle.BIND_OUT },
    };
    const result = await this.query(query, params);
    // console.log(result);
    return result;
  };
  getArticle = async (articleId: string) => {
    const query = `SELECT A.ID ID, 
                          A.TITLE TITLE,
                          A.CONTENT CONTENT, 
                          P.USERNAME CONTRIBUTED_BY,
                          (P.FIRST_NAME||' '||P.LAST_NAME) CONTRIBUTED_BY_FULLNAME, 
                          TO_CHAR(A.CREATED_AT,'HH24:MI  DD Month, YYYY') CREATED_AT, 
                          TO_CHAR(A.UPDATED_AT,'HH24:MI  DD Month, YYYY') UPDATED_AT,
                          A.VIEWS VIEWS
                    FROM ARTICLE A JOIN PROFILE P
                    ON A.CONTRIBUTED_BY = P.ID
                    WHERE A.ID=:id`;
    const result = await this.query(query, [articleId]);
    return result;
  };
  getArticleThumbnail = async (articleId: string) => {
    const query = `SELECT A.ID ID, 
                  A.TITLE TITLE,
        
                  P.USERNAME CONTRIBUTED_BY,
                  (P.FIRST_NAME||' '||P.LAST_NAME) CONTRIBUTED_BY_FULLNAME, 
                  TO_CHAR(A.CREATED_AT,'HH24:MI  DD Month, YYYY') CREATED_AT, 
                  TO_CHAR(A.UPDATED_AT,'HH24:MI  DD Month, YYYY') UPDATED_AT,
                  A.VIEWS VIEWS
              FROM ARTICLE A JOIN PROFILE P
              ON A.CONTRIBUTED_BY = P.ID
              WHERE A.ID=:id`;
    const result = await this.query(query, [articleId]);
    return result;
  };
  getArticleVoteInfo = async (articleId: string, userId: string) => {
    const query = `SELECT
      NVL( ( SELECT REACT FROM ARTICLE_REACT WHERE REACTED_BY=:userId AND ARTICLE_ID=:articleId), 'EMPTY' ) USER_VOTE,
      NVL( ( SELECT COUNT( * ) FROM ARTICLE_REACT WHERE ARTICLE_ID =:articleId AND UPPER( REACT ) = 'Y' ), 0 ) UPVOTES,
      NVL( ( SELECT COUNT( * ) FROM ARTICLE_REACT WHERE ARTICLE_ID =:articleId AND UPPER( REACT ) = 'N' ), 0 ) DOWNVOTES   
    FROM
      DUAL`;

    const params = {
      articleId: {
        val: parseInt(articleId),
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
  updateArticle = async (
    articleId: string,
    articleTitle: string,
    articleContent: string,
  ) => {
    const query = `UPDATE ARTICLE
                    SET CONTENT=:articleContent,
                        TITLE=:articleTitle,
                        UPDATED_AT=CURRENT_TIMESTAMP
                    WHERE ID = :articleId`;
    const params = [articleContent, articleTitle, articleId];
    const result = await this.query(query, params);
    return result;
  };
  deleteArticle = async (articleId: string) => {
    const query = `DELETE FROM ARTICLE WHERE ARTICLE.ID=:id`;
    const result = await this.query(query, [articleId]);
    return result;
  };

  getArticlesByUser = async (username: string) => {
    const query = `SELECT A.ID ID
                    FROM PROFILE P JOIN ARTICLE A
                    ON A.CONTRIBUTED_BY = P.ID 
                    WHERE P.USERNAME=:username`;
    const result = this.query(query, [username]);
    return result;
  };

  searchArticle = async (searchString: string, sortBy?: string) => {
    // const query = `SELECT SEARCH_ARTICLE(:searchString) RESULT FROM DUAL`;
    let query = `SELECT A.ID ID
                FROM ARTICLE A
                WHERE LOWER(A.TITLE) 
                LIKE '%'||LOWER(REPLACE(:searchString,' ','%'))||'%' 
                `;
    if (sortBy === 'views') {
      query += ' ORDER BY VIEWS DESC';
    } else if (sortBy === 'upvotes') {
      query += ` ORDER BY (SELECT COUNT(*)
                          FROM ARTICLE_REACT 
                          WHERE REACT='Y' AND ARTICLE_ID=A.ID) DESC`;
    } else if (sortBy === 'downvotes') {
      query += ` ORDER BY (SELECT COUNT(*)
                          FROM ARTICLE_REACT 
                          WHERE REACT='N' AND ARTICLE_ID=A.ID) DESC`;
    } else {
      query += ' ORDER BY CREATED_AT DESC';
    }
    const result = await this.query(query, [searchString]);
    console.log(result);

    return result;
  };

  getRelatedArticles = async (articleId: string) => {
    const query = `SELECT DISTINCT ARTICLE_ID ID
                    FROM ARTICLE_TAG
                    WHERE TAG_ID IN (SELECT TAG_ID 
                                     FROM ARTICLE_TAG
                                     WHERE ARTICLE_ID=:articleId) AND ARTICLE_ID <>:articleId`;
    const result = this.query(query, [articleId, articleId]);
    return result;
  };
  viewArticle = async (articleId: string) => {
    const query = `UPDATE ARTICLE
                    SET VIEWS=VIEWS+1
                    WHERE ID=:articleId`;
    const result = this.query(query, [articleId]);
    return result;
  };

  upVoteArticle = async (articleId: string, userId: string) => {
    const query = `BEGIN
                        REACT_ARTICLE(:articleId,:userId,'Y');
                      END;`;
    const result = this.query(query, [articleId, userId]);
    return result;
  };
  downVoteArticle = async (articleId: string, userId: string) => {
    const query = `BEGIN
                        REACT_ARTICLE(:articleId,:userId,'N');
                      END;`;
    const result = this.query(query, [articleId, userId]);
    return result;
  };
}
export default ArticleRepository;
