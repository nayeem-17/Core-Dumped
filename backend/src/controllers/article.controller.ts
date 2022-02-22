import ArticleRepository from '../database/repository/article.repository';
const articleRepository = new ArticleRepository();

class ArticleController {
  getArticleData = async (req: any, res: any) => {
    const { articleId } = req.params;
    const result = await articleRepository.getArticle(articleId);
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
  getArticleThumbnail = async (req: any, res: any) => {
    const { articleId } = req.params;
    const result = await articleRepository.getArticleThumbnail(articleId);
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
  getArticleVoteInfo = async (req: any, res: any) => {
    const { articleId } = req.params;
    const { userId } = req.body;
    const result = await articleRepository.getArticleVoteInfo(
      articleId,
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
  getArticlesByUser = async (req: any, res: any) => {
    const result = await articleRepository.getArticlesByUser(
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

  postArticle = async (req: any, res: any) => {
    const result = await articleRepository.insertArticle(
      req.body.articleTitle,
      req.body.articleContent,
      req.body.userId,
    );

    // console.log(req.body);
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

  searchArticle = async (req: any, res: any) => {
    const { searchString } = req.body;
    const { sortBy } = req.body;
    const result = await articleRepository.searchArticle(searchString, sortBy);

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

  getRelatedArticles = async (req: any, res: any) => {
    const result = await articleRepository.getRelatedArticles(
      req.params.articleId,
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
  updateArticle = async (req: any, res: any) => {
    const { articleId } = req.params;
    const { articleTitle, articleContent } = req.body;
    const result = await articleRepository.updateArticle(
      articleId,
      articleTitle,
      articleContent,
    );
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
  deleteArticle = async (req: any, res: any) => {
    const { articleId } = req.params;
    const result = await articleRepository.deleteArticle(articleId);
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

  viewArticle = async (req: any, res: any) => {
    const { articleId } = req.params;
    const result = await articleRepository.viewArticle(articleId);
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

  upVoteArticle = async (req: any, res: any) => {
    const { articleId } = req.params;
    const { userId } = req.body;
    const result = await articleRepository.upVoteArticle(articleId, userId);
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
  downVoteArticle = async (req: any, res: any) => {
    const { articleId } = req.params;
    const { userId } = req.body;
    const result = await articleRepository.downVoteArticle(articleId, userId);
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
export default ArticleController;
