import NotificationRepository from "../database/repository/notification.repository";
const notificationRepository = new NotificationRepository();

class NotificationController{
    getNotifications = async (req:any,res:any) => {
        const result = await notificationRepository.getNotifications(req.body.userId);
        if( !result.success )
            return res.status(400).json({
                success: false,
                message: result.error,
            });
        return res.status(200).json({
            success: true,
            data: result.data,
        });
    }
    markReadNotification = async(req:any,res:any) => {
        const {notificationId} = req.params;
        const result = await notificationRepository.markReadNotification(notificationId);
        if( !result.success )
            return res.status(400).json({
                success: false,
                message: result.error,
            });
        return res.status(200).json({
            success: true,
            data: result.data,
        });
    }
}
export default NotificationController;