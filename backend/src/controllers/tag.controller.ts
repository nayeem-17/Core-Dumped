import TagRepository from '../database/repository/tag.repository';
const tagRepository = new TagRepository();

export default class TagController {
  getTagData = async (req: any, res: any) => {
    const { tagId } = req.params;
    const result = await tagRepository.getTagData(tagId);
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
  getTagThumbnail = async (req: any, res: any) => {
    const { tagId } = req.params;
    const result = await tagRepository.getTagThumbnail(tagId);
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
  getProfileInterests = async (req: any, res: any) => {
    const { username } = req.params;
    const result = await tagRepository.getProfileInterests(username);
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

  searchTag = async (req: any, res: any) => {
    const { searchString } = req.body;
    let { sortBy } = req.body;
    console.log(sortBy);
    if (sortBy !== 'question' && sortBy !== 'article') {
      sortBy = 'DESC';
    }
    const result = await tagRepository.searchTag(searchString, sortBy);
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

  addProfileInterest = async (req: any, res: any) => {
    const { tagId, userId } = req.body;
    const result = await tagRepository.addProfileInterest(userId, tagId);
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

  removeProfileInterest = async (req: any, res: any) => {
    const { tagId, userId } = req.body;
    const result = await tagRepository.removeProfileInterest(userId, tagId);

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

  getArticleTags = async (req: any, res: any) => {
    const { articleId } = req.params;
    const result = await tagRepository.getArticleTags(articleId);
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

  addArticleTag = async (req: any, res: any) => {
    const { articleId } = req.params;
    const { tagId } = req.body;
    const result = await tagRepository.addArticleTag(articleId, tagId);
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

  removeArticleTag = async (req: any, res: any) => {
    const { articleId } = req.params;
    const { tagId } = req.body;
    const result = await tagRepository.removeArticleTag(articleId, tagId);
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

  getQuestionTags = async (req: any, res: any) => {
    const { questionId } = req.params;
    const result = await tagRepository.getQuestionTags(questionId);
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

  addQuestionTag = async (req: any, res: any) => {
    const { questionId } = req.params;
    const { tagId } = req.body;
    const result = await tagRepository.addQuestionTag(questionId, tagId);
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

  removeQuestionTag = async (req: any, res: any) => {
    const { questionId } = req.params;
    const { tagId } = req.body;
    const result = await tagRepository.removeQuestionTag(questionId, tagId);
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

  getQuestions = async (req: any, res: any) => {
    const { tagId } = req.params;
    const result = await tagRepository.getQuestions(tagId);
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

  getArticles = async (req: any, res: any) => {
    const { tagId } = req.params;
    const result = await tagRepository.getArticles(tagId);
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
