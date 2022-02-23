import Repository from '../Repository';

export default class TagRepository extends Repository {
  constructor() {
    super();
  }

  async getTagData(tagId: string) {
    const query = `SELECT T.ID ID,
                          T.TITLE TITLE,
                          T.DESCRIPTION DESCRIPTION,
                          T.SYNONYMS SYNONYMS,
                          T.CREATED_AT CREATED_AT,
                          T.UPDATED_AT UPDATED_AT,
                          NVL( (SELECT COUNT(*) 
                                FROM QUESTION_TAG QT
                                WHERE QT.TAG_ID=T.ID), 0) QUESTION_COUNT,
                          NVL( (SELECT COUNT(*) 
                                FROM ARTICLE_TAG AT
                                WHERE AT.TAG_ID=T.ID), 0) ARTICLE_COUNT
                        FROM TAG T
                        WHERE ID=:tagId
                        `;
    const result = await this.query(query, [tagId]);
    return result;
  }
  async getTagThumbnail(tagId: string) {
    const query = `SELECT ID,TITLE
                    FROM TAG 
                    WHERE ID=:tagId `;
    const result = await this.query(query, [tagId]);
    return result;
  }
  async getProfileInterests(username: string) {
    const query = `SELECT T.ID ID,
                              T.TITLE TITLE
                        FROM PROFILE_INTERESTED_IN PII JOIN TAG T
                        ON PII.TAG_ID = T.ID
                        JOIN PROFILE P 
                        ON P.ID = PII.PROFILE_ID
                        WHERE P.USERNAME=:username`;

    const result = await this.query(query, [username]);
    return result;
  }
  async searchTag(searchString: string, sortBy?: string) {
    const query1 = `SELECT SEARCH_TAG(:searchString) RESULT FROM DUAL`;
    let query = `SELECT T.ID
                    FROM TAG T
                    WHERE LOWER(T.TITLE) 
                    LIKE '%'||LOWER(REPLACE(:searchString,' ','%'))||'%'
                     `;
    if (sortBy == 'question') {
      query += ` ORDER BY (
                    SELECT 
                        COUNT(*) 
                    FROM 
                        QUESTION_TAG QT 
                    WHERE 
                        QT.TAG_ID = T.ID
                    ) DESC`;
    } else if (sortBy == 'article') {
      query += ` ORDER BY (
            SELECT 
                COUNT(*) 
            FROM 
                ARTICLE_TAG QT 
            WHERE 
                QT.TAG_ID = T.ID
            ) DESC`;
    } else {
      query += ` ORDER BY CREATED_AT DESC`;
    }
    query += '  FETCH FIRST 15 ROWS ONLY';
    const result = await this.query(query, [searchString]);
    console.log(result);

    return result;
  }

  async addProfileInterest(userId: string, tagId: string) {
    const query = `INSERT INTO PROFILE_INTERESTED_IN 
                        (PROFILE_ID,TAG_ID) 
                        VALUES (:userId,:tagId)`;
    const result = await this.query(query, [userId, tagId]);
    return result;
  }
  async removeProfileInterest(userId: string, tagId: string) {
    const query = `DELETE FROM PROFILE_INTERESTED_IN 
                        WHERE PROFILE_ID=:userId AND TAG_ID=:tagId`;
    const result = await this.query(query, [userId, tagId]);
    return result;
  }

  async getQuestionTags(questionId: string) {
    const query = `SELECT TAG_ID ID
                       FROM QUESTION_TAG
                       WHERE QUESTION_ID=:questionId`;
    const result = await this.query(query, [questionId]);
    return result;
  }
  async addQuestionTag(questionId: string, tagId: string) {
    const query = `INSERT INTO 
                        QUESTION_TAG
                        (QUESTION_ID,TAG_ID) 
                        VALUES (:questionId,:tagId)`;
    const result = await this.query(query, [questionId, tagId]);
    return result;
  }
  async removeQuestionTag(questionId: string, tagId: string) {
    const query = `DELETE FROM 
                        QUESTION_TAG 
                        WHERE QUESTION_ID=:questionId AND TAG_ID =:tagId`;
    const result = await this.query(query, [questionId, tagId]);
    return result;
  }

  async getArticleTags(articleId: string) {
    const query = `SELECT TAG_ID ID 
                        FROM ARTICLE_TAG
                        WHERE ARTICLE_ID=:articleId`;
    const result = await this.query(query, [articleId]);
    return result;
  }
  async addArticleTag(articleId: string, tagId: string) {
    const query = `INSERT INTO 
                        ARTICLE_TAG
                        (ARTICLE_ID,TAG_ID)
                        VALUES (:articleId,:tagId)`;
    const result = await this.query(query, [articleId, tagId]);
    return result;
  }
  async removeArticleTag(articleId: string, tagId: string) {
    const query = `DELETE FROM 
                        ARTICLE_TAG
                        WHERE ARTICLE_ID=:articleId AND TAG_ID=:tagId`;
    const result = await this.query(query, [articleId, tagId]);
    return result;
  }

  async getQuestions(tagId: string) {
    const query = `SELECT QUESTION_ID ID
                        FROM QUESTION_TAG 
                        WHERE TAG_ID=:tagId`;
    const result = await this.query(query, [tagId]);
    return result;
  }
  async getArticles(tagId: string) {
    const query = `SELECT ARTICLE_ID ID
                        FROM ARTICLE_TAG 
                        WHERE TAG_ID=:tagId`;
    const result = await this.query(query, [tagId]);
    return result;
  }
}
