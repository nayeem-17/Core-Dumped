import ProfileRepository from '../database/repository/profile.repository';
import {
  isPasswordValid,
  makeHash,
} from '../authentication/authentication.service';
const profileRepository = new ProfileRepository();
class ProfileController {
  getProfileData = async (req: any, res: any) => {
    // eslint-disable-next-line prefer-const
    let { username } = req.params;

    const result = await profileRepository.getData(username);
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
  getProfileAvatar = async (req: any, res: any) => {
    // eslint-disable-next-line prefer-const
    let { username } = req.params;

    const result = await profileRepository.getProfileAvatar(username);
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
  getProfileStats = async (req: any, res: any) => {
    const { username } = req.params;
    const result = await profileRepository.getStats(username);
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
  followsProfile = async (req: any, res: any) => {
    const followingId = req.params.username;
    const followerId = req.body.username;
    const result = await profileRepository.follows(followerId, followingId);

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
  addFollow = async (req: any, res: any) => {
    const follower = req.body.username;
    const following = req.params.following;
    console.log(follower);
    console.log(following);
    const result = await profileRepository.addFollow(follower, following);
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
  removeFollow = async (req: any, res: any) => {
    const follower = req.body.username;
    const following = req.params.following;
    const result = await profileRepository.removeFollow(follower, following);
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
  getFollower = async (req: any, res: any) => {
    const result = await profileRepository.getFollower(req.params.username);
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
  getFollowing = async (req: any, res: any) => {
    const result = await profileRepository.getFollowing(req.params.username);
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

  editProfilePicture = async (req: any, res: any) => {
    const { profilePicture, username } = req.body;
    const result = await profileRepository.editProfilePicture(
      username,
      profilePicture,
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

  changeProfilePassword = async (req: any, res: any) => {
    const { currentPassword, newPassword, confirmNewPassword, username } =
      req.body;
    const passwordResult = await profileRepository.getPassword(username);
    const hashPass = passwordResult.data[0].PASSWORD;
    if (!isPasswordValid(hashPass, currentPassword)) {
      return res.status(401).json({
        success: false,
        message: 'Wrong password',
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "Passwords don't match",
      });
    }

    const newHashPass = makeHash(newPassword);
    const result = await profileRepository.changeProfilePassword(
      username,
      newHashPass,
    );

    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      message: 'Password changed',
    });
  };

  updateProfileInfo = async (req: any, res: any) => {
    const {
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      TITLE,
      DESCRIPTION,
      BIRTHDATE,
      username,
    } = req.body;

    const result = await profileRepository.updateProfileInfo(
      username,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      TITLE,
      DESCRIPTION,
      BIRTHDATE,
    );

    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Info updated',
    });
  };

  deleteProfile = async (req: any, res: any) => {
    const { userId, username } = req.body;
    const { password, rePassword } = req.body;
    const passwordResult = await profileRepository.getPassword(username);
    const hashPass = passwordResult.data[0].PASSWORD;
    if (!isPasswordValid(hashPass, password)) {
      return res.status(401).json({
        success: false,
        message: 'Wrong password',
      });
    }
    if (password !== rePassword)
      return res.status(400).json({
        success: false,
        message: `Passwords don't match`,
      });

    const result = await profileRepository.deleteProfile(userId);
    if (!result.success)
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'au revoir',
    });
  };

  searchProfile = async (req: any, res: any) => {
    const { searchString } = req.body;
    let { sortBy } = req.body;
    console.log(sortBy);
    if (
      sortBy !== 'reputation' &&
      sortBy !== 'created_at' &&
      sortBy !== 'question_count' &&
      sortBy !== 'article_count' &&
      sortBy !== 'answer_count'
    ) {
      sortBy = 'reputation';
    }
    const result = await profileRepository.searchProfile(searchString, sortBy);

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
export default ProfileController;
