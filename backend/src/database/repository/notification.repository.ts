import oracle from 'oracledb';
import Repository from '../Repository';

class NotificationRepository extends Repository {
  constructor() {
    super();
  }

  async getNotifications(userId: string) {
    const query = `SELECT *
                   FROM NOTIFICATION 
                   WHERE PROFILE_ID=:userId AND IS_READ=0
                   ORDER BY CREATED_AT DESC`;
    const result = await this.query(query,[userId]);
    return result ;     
  }
  async markReadNotification(notificationId: string) {
    const query = `UPDATE 
                    NOTIFICATION 
                    SET IS_READ=1
                    WHERE ID=:notificationId`;
    const result = await this.query(query,[notificationId]);
    return result ;
  }
}
export default NotificationRepository;
