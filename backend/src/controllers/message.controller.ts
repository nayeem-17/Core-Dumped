import MessageRepository from '../database/repository/message.repository';

const messageRepository = new MessageRepository();
class MessageController {
  getMessage = async (req: any, res: any) => {
    const { messageId } = req.params;
    const result = await messageRepository.getMessage(messageId);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  };
  getUserMessages = async (req: any, res: any) => {
    const { userId } = req.body;
    const result = await messageRepository.getUserMessages(userId);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  };
  sendMessage = async (req: any, res: any) => {
    const { receiverId, userId, message } = req.body;
    const result = await messageRepository.sendMessage(
      userId,
      receiverId,
      message,
    );
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  };
  deleteMessage = async (req: any, res: any) => {
    const { messageId } = req.params;
    const result = await messageRepository.deleteMessage(messageId);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  };
}
export default MessageController;
