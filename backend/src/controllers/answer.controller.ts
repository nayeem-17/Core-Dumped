import AnswerRepository from '../database/repository/answer.repository';
const answerRepository = new AnswerRepository();

class AnswerController {
  addAnswer = async (req: any, res: any) => {
    const result = await answerRepository.addAnswer(
      req.body.answer,
      req.body.questionId,
      req.body.userId,
    );
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  };
  getAnswerData = async (req: any, res: any) => {
    const { answerId } = req.params;
    const result = await answerRepository.getAnswer(answerId);
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
  getAnswerVoteInfo = async (req:any,res:any) => {
    const {answerId} = req.params;
    const {userId} = req.body;
    const result = await answerRepository.getAnswerVoteInfo(answerId,userId);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  }
  getAnswersOfQuestion = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await answerRepository.getAnswersOfQuestion(questionId);

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
  getAnswersByUser = async (req: any, res: any) => {
    const { username } = req.params;
    const result = await answerRepository.getAnswersByUser(username);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  };
  updateAnswer = async (req: any, res: any) => {
    const { answerId } = req.params;
    const { answer } = req.body;
    if (!answer) {
      return res.status(400).json({
        success: false,
        message: 'Answer is required',
      });
    }
    const result = await answerRepository.updateAnswer(answerId, answer);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
    });
  };
  deleteAnswer = async (req: any, res: any) => {
    const { answerId } = req.params;
    const result = await answerRepository.deleteAnswer(answerId);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
    });
  };
  upVoteAnswer =async (req: any,res:any) => {
    const {answerId} = req.params;
    const {userId} = req.body; 
    const result = await answerRepository.upVoteAnswer(answerId,userId);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
    });
  }
  downVoteAnswer =async (req: any,res:any) => {
    const {answerId} = req.params;
    const {userId} = req.body; 
    const result = await answerRepository.downVoteAnswer(answerId,userId);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
    });
  }
}
export default AnswerController;
