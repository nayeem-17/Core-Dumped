import Repository from '../Repository';

class IndexRepository extends Repository {
  constructor() {
    super();
  }
  test = async () => {
    const query = `SELECT * from global_name`;
    const result = await this.query(query, []);
    return result;
  };

  topPosts = async () => {
    const query = `SELECT ID, TITLE, 'QUESTION' AS TYPE
                    FROM QUESTION
                    UNION 
                    SELECT ID, TITLE, 'ARTICLE' AS TYPE 
                    FROM ARTICLE`;
    const result = await this.query(query, []);
    return result;
  };

  topQuestions = async () => {
    const query = `SELECT * 
                  FROM (SELECT ID 
                        FROM QUESTION 
                        ORDER BY CREATED_AT DESC)
                  WHERE ROWNUM<=50`;
    const result = await this.query(query, []);
    return result;
  };
  topArticles = async () => {
    const query = `SELECT * 
                  FROM (SELECT ID 
                        FROM ARTICLE 
                        ORDER BY CREATED_AT DESC)
                  WHERE ROWNUM<=50`;
    const result = await this.query(query, []);
    return result;
  };

  topTags = async () => {
    const query = `SELECT * 
                    FROM  (SELECT T.ID ID 
                          FROM TAG T
                          ORDER BY ((SELECT COUNT(*) 
                                    FROM QUESTION_TAG
                                    WHERE TAG_ID=T.ID) + 
                                    (SELECT COUNT(*) 
                                    FROM ARTICLE_TAG
                                    WHERE TAG_ID=T.ID)) DESC) 
                    WHERE ROWNUM<=50`;
    const result = await this.query(query, []);
    return result;
  };
}

export default IndexRepository;
