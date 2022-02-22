import QuestionRepository from '../database/repository/question.repository';
const questionRepository = new QuestionRepository();
class QuestionController {
  getQuestionData = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await questionRepository.getQuestion(questionId);
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
  getQuestionThumbnail = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await questionRepository.getQuestionThumbnail(questionId);
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
  getQuestionVoteInfo = async (req: any, res: any) => {
    const { questionId } = req.params;
    const { userId } = req.body;
    const result = await questionRepository.getQuestionVoteInfo(
      questionId,
      userId,
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
  upvoteQuestion = async (req: any, res: any) => {
    const { questionId } = req.params;
    const { userId } = req.body;
    const result = await questionRepository.upVoteQuestion(questionId, userId);
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
  downvoteQuestion = async (req: any, res: any) => {
    const { questionId } = req.params;
    const { userId } = req.body;
    const result = await questionRepository.downVoteQuestion(
      questionId,
      userId,
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
  getQuestionsByUser = async (req: any, res: any) => {
    const result = await questionRepository.getQuestionsByUser(
      req.params.username,
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
  postQuestion = async (req: any, res: any) => {
    const result = await questionRepository.addQuestion(
      req.body.questionTitle,
      req.body.questionContent,
      req.body.userId,
      req.body.organization_id,
    );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      data: { ...result.outBinds },
    });
  };
  searchQuestion = async (req: any, res: any) => {
    const result = await questionRepository.searchQuestion(
      req.body.searchString,
      req.body.sortBy,
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

  getRelatedQuestions = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await questionRepository.getRelatedQuestions(questionId);
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

  editQuestionData = async (req: any, res: any) => {
    const { questionId } = req.params;
    const { questionTitle, questionContent } = req.body;
    const result = await questionRepository.editQuestionData(
      questionId,
      questionTitle,
      questionContent,
    );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error + ' update error',
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Question updated',
    });
  };
  deleteQuestion = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await questionRepository.deleteQuestion(questionId);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'question deleted',
    });
  };
  viewQuestion = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await questionRepository.viewQuestion(questionId);
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
}
export default QuestionController;
