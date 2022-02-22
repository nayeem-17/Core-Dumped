import CommentRepository from '../database/repository/comment.repository';
const commentRepository = new CommentRepository();

class CommentController {
  addComment = async (req: any, res: any) => {
    const result = await commentRepository.addComment(
      req.body.comment,
      req.body.userId,
      req.body.commentOf,
      req.body.typeId,
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
  getCommentData = async (req: any, res: any) => {
    const { commentId } = req.params;
    const result = await commentRepository.getComment(commentId);
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
  getCommentsOfQuestion = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await commentRepository.getQuestionComments(questionId);

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
  getCommentsOfArticle = async (req: any, res: any) => {
    const { articleId } = req.params;
    const result = await commentRepository.getArticleComments(articleId);

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
  getCommentsOfAnswer = async (req: any, res: any) => {
    const { answerId } = req.params;
    const result = await commentRepository.getAnswerComments(answerId);

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
  getCommentsByUser = async (req: any, res: any) => {
    const { username } = req.params;
    const result = await commentRepository.getUserComments(username);

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
  updateComment = async (req: any, res: any) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({
        success: false,
      });
    }
    const result = await commentRepository.updateComment(commentId, comment);

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
  deleteComment = async (req: any, res: any) => {
    const { commentId } = req.params;
    const result = await commentRepository.deleteComment(commentId);

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
}

export default CommentController;
