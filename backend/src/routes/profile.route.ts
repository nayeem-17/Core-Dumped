import express from 'express';
import { isValidJWTToken } from '../authentication/authentication.middleware';
import ProfileController from '../controllers/profile.controller';
import messageRouter from './message.router';
const profileController = new ProfileController();
const profileRouter = express.Router();

profileRouter.use(isValidJWTToken);

profileRouter.get('/:username', profileController.getProfileData);
profileRouter.get('/:username/avatar', profileController.getProfileAvatar);
profileRouter.get('/:username/stats', profileController.getProfileStats);
profileRouter.post('/follow/:following', profileController.addFollow);
profileRouter.post('/unfollow/:following', profileController.removeFollow);
profileRouter.get('/follows/:username', profileController.followsProfile);
profileRouter.get('/:username/followers', profileController.getFollower);
profileRouter.get('/:username/following', profileController.getFollowing);
profileRouter.post(
  '/edit/profilePicture',
  profileController.editProfilePicture,
);
profileRouter.post(
  '/edit/changePassword',
  profileController.changeProfilePassword,
);
profileRouter.post('/edit/updateInfo', profileController.updateProfileInfo);
profileRouter.post('/delete', profileController.deleteProfile);
profileRouter.post('/search', profileController.searchProfile);
profileRouter.use('/message', messageRouter);
export default profileRouter;
