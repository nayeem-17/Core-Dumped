import Repository from '../Repository';

class ProfileRepository extends Repository {
  constructor() {
    super();
  }
  getData = async (username: string) => {
    const server_url = 'http://localhost:' + (process.env.PORT || '3000');
    const query = `SELECT
                    	id,
                      username,
                      first_name,
                      last_name,
                      email,
                      TO_CHAR(BIRTHDATE,'YYYY-MM-DD') BIRTHDATE,
                      (:server_url||PROFILE_PICTURE) PROFILE_PICTURE,
                      TO_CHAR(CREATED_AT,'HH24:MI DD Month,YYYY') CREATED_AT,
                      TO_CHAR(LAST_ACTIVE,'HH24:MI DD Month,YYYY') LAST_ACTIVE,
                      TITLE,
                      DESCRIPTION 
                    FROM
                    	PROFILE 
                    WHERE
                    	USERNAME = :username`;
    const result = await this.query(query, [server_url, username]);
    return result;
  };
  getProfileAvatar = async (username: string) => {
    const server_url = 'http://localhost:' + (process.env.PORT || '3000');
    const query = `SELECT
                      USERNAME,
                      first_name,
                      last_name,
                   
                      (:server_url||PROFILE_PICTURE) PROFILE_PICTURE
                     
                    FROM
                    	PROFILE 
                    WHERE
                    	USERNAME = :username`;
    const result = await this.query(query, [server_url, username]);
    return result;
  };
  getStats = async (username: string) => {
    const query = `SELECT P.REPUTATION, 
                            (SELECT COUNT(*) 
                            FROM QUESTION
                            WHERE CONTRIBUTED_BY=P.ID) QUESTION_COUNT,
                            (SELECT COUNT(*)
                            FROM ARTICLE
                            WHERE CONTRIBUTED_BY=P.ID) ARTICLE_COUNT,
                            (SELECT COUNT(*)
                            FROM ANSWER 
                            WHERE CONTRIBUTED_BY=P.ID) ANSWER_COUNT
                    FROM PROFILE P
                    WHERE P.USERNAME=:username`;
    const result = await this.query(query, [username]);
    return result;
  };
  getPassword = async (username: string) => {
    const query = `SELECT PASSWORD
                    FROM PROFILE 
                    WHERE USERNAME=:username`;
    const result = await this.query(query, [username]);
    return result;
  };
  getFollower = async (username: string) => {
    const query = `SELECT F.FOLLOWER ID, PF.USERNAME USERNAME
                    FROM PROFILE P JOIN FOLLOW F
                    ON F.FOLLOWING = P.ID 
                    JOIN PROFILE PF
                    ON F.FOLLOWER=PF.ID
                    WHERE P.USERNAME =:username`;
    const result = await this.query(query, [username]);
    return result;
  };
  getFollowing = async (username: string) => {
    const query = `SELECT F.FOLLOWING ID, PF.USERNAME USERNAME
                    FROM PROFILE P JOIN FOLLOW F
                    ON F.FOLLOWER = P.ID  
                    JOIN PROFILE PF
                    ON F.FOLLOWING=PF.ID
                    WHERE P.USERNAME=:username`;
    const result = await this.query(query, [username]);
    return result;
  };
  addFollow = async (follower: string, following: string) => {
    const query = `INSERT INTO
                  FOLLOW (FOLLOWER,FOLLOWING)
                  VALUES ((SELECT ID 
                          FROM PROFILE
                          WHERE USERNAME=:follower),
                          (SELECT ID
                            FROM PROFILE
                            WHERE USERNAME=:following)
                          )`;
    const result = await this.query(query, [follower, following]);
    return result;
  };
  removeFollow = async (follower: string, following: string) => {
    const query = `DELETE 
                    FROM FOLLOW 
                    WHERE FOLLOWER=(SELECT ID
                                    FROM PROFILE 
                                    WHERE USERNAME=:follower)
                          AND 
                          FOLLOWING=(SELECT ID 
                                    FROM PROFILE
                                    WHERE USERNAME=:following)`;
    const result = await this.query(query, [follower, following]);
    return result;
  };

  follows = async (follower: string, following: string) => {
    const query = `SELECT * 
                   FROM FOLLOW 
                   WHERE FOLLOWER=(SELECT ID
                                  FROM PROFILE
                                  WHERE USERNAME=:follower)
                         AND FOLLOWING=(SELECT ID
                                        FROM PROFILE
                                        WHERE USERNAME=:following)`;
    const result = await this.query(query, [follower, following]);
    return result;
  };
  editProfilePicture = async (username: string, profilePictureURL: string) => {
    const query = `UPDATE 
                    PROFILE 
                    SET PROFILE_PICTURE=:profilePictureURL
                    WHERE USERNAME=:username`;
    const result = await this.query(query, [profilePictureURL, username]);
    return result;
  };

  changeProfilePassword = async (username: string, newPassword: string) => {
    const query = `UPDATE
                    PROFILE
                    SET PASSWORD=:newPassword
                    WHERE USERNAME=:username`;
    const result = await this.query(query, [newPassword, username]);
    return result;
  };

  updateProfileInfo = async (
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    title: string,
    description: string,
    birthdate: string,
  ) => {
    const query = `UPDATE
                  PROFILE
                  SET FIRST_NAME=:first_name,
                  LAST_NAME=:last_name,
                  EMAIL=:email,
                  TITLE=:title,
                  DESCRIPTION=:description,
                  BIRTHDATE=TO_DATE(:birthdate,'YYYY-MM-DD')
                  WHERE USERNAME=:username`;
    const result = await this.query(query, [
      first_name,
      last_name,
      email,
      title,
      description,
      birthdate,
      username,
    ]);
    return result;
  };
  deleteProfile = async (userId: string) => {
    const query = `DELETE FROM 
                  PROFILE 
                  WHERE ID=:userId`;
    const result = await this.query(query, [userId]);
    return result;
  };

  // <<<<<<< HEAD
  searchProfile = async (searchString: string, sortBy?: string) => {
    let query = `SELECT P.ID,P.USERNAME
                    FROM PROFILE P
                    WHERE LOWER(P.USERNAME) 
                    LIKE '%'||LOWER(REPLACE(:searchString,' ','%'))||'%' 
                    OR LOWER(P.FIRST_NAME||' '||P.LAST_NAME)
                    LIKE '%'||LOWER(REPLACE(:searchString,' ','%'))||'%' 
                    `;

    if (sortBy === 'reputation') {
      query += ' ORDER BY REPUTATION DESC';
    } else if (sortBy === 'created_at') {
      query += ' ORDER BY CREATED_AT DESC';
    } else if (sortBy === 'question_count') {
      query += ` ORDER BY (SELECT COUNT(*) FROM 
                            QUESTION 
                            WHERE CONTRIBUTED_BY=P.ID) DESC `;
    } else if (sortBy === 'article_count') {
      query += ` ORDER BY (SELECT COUNT(*) 
                            FROM 
                            ARTICLE
                            WHERE CONTRIBUTED_BY=P.ID) DESC`;
    }
    // <<<<<<< shouse

    const result = await this.query(query, [searchString, searchString]);
    return result;
  };
  // =======
  //     // const params = {
  //     //   searchString:
  //     // }
  //     const result = await this.query(query, [searchString, searchString]);
  //     return result;
  //   };
  //   // =======
  //   //   searchProfile = async (searchString: string) => {
  //   //     const query = `SELECT SEARCH_PROFILE(:searchString) RESULT FROM DUAL` ;
  //   //     const result = await this.query(query,[searchString]);
  //   //     return result ;
  //   //   }
  //   // >>>>>>> 0f9578631528dd6e82e708f1e55a3a01097fb747
  // >>>>>>> with-ts
}

export default ProfileRepository;
