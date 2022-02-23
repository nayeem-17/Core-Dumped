import Repository from '../Repository';

class MessageRepository extends Repository {
  constructor() {
    super();
  }
  getMessage = async (messageId: string) => {
    const query = `SELECT ID,
                          SENDER_ID,
                          (SELECT P.USERNAME
                            FROM PROFILE P
                            WHERE P.ID=SENDER_ID) SENDER_USERNAME,
                          MESSAGE,
                          TO_CHAR(CREATED_AT, 'HH24:MI DD/MM/YYYY') CREATED_AT,
                          TO_CHAR(UPDATED_AT, 'HH24:MI DD/MM/YYYY') UPDATED_AT
                    FROM MESSAGES 
                    WHERE ID=:messageId`;
    const result = await this.query(query,[messageId]);
    return result ;
  }
  getUserMessages = async (userId: string) => {
    const query = `SELECT *
                   FROM   (SELECT ID 
                          FROM MESSAGES 
                          WHERE RECEIVER_ID=:userId
                          ORDER BY CREATED_AT DESC)
                    WHERE ROWNUM <= 30`;
    const result = await this.query(query, [userId]);
    return result;
  };
  sendMessage = async (
    senderId: string,
    receiverId: string,
    message: string,
  ) => {
    const query = `INSERT INTO MESSAGES (SENDER_ID,RECEIVER_ID,MESSAGE)
                    VALUES (:senderId,:receiverId,:message)`;
    const result = await this.query(query, [senderId, receiverId, message]);
    return result;
  };
  deleteMessage = async (messageId: string) => {
    const query = `DELETE FROM MESSAGES WHERE ID=:messageId`;
    const result = await this.query(query, [messageId]);
    return result;
  };
}
export default MessageRepository;
