import { ACCESS_DENIED } from 'common/error';
import Router from 'koa-router';
import { Context } from 'koa';
import UserEntity from '@/entity/user.entity';
import AuthService from './auth.service';
import KaKaoUserDTO from './types/kakao-user-dto';
import UserService from '../user/user.service';
import NaverUserDTO from './types/naver-user-dto';

const AuthRouter = new Router();

AuthRouter.get('/', (ctx: Context) => {
  ctx.body = '리다이렉트됨';
});

AuthRouter.get('/callback/naver/redirect', async (ctx: Context) => {
  const { code, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const accessToken = await AuthService.getNaverAccessToken(code);
  const userInfo = await AuthService.getNaverUserInfo(accessToken);
  const userData = new NaverUserDTO(userInfo);

  const isExistUser = await UserService.existSocialUser(userData);

  const user = isExistUser
    ? ((await UserService.getUserBySocialUserInfo(userData)) as UserEntity)
    : ((await UserService.createNewUser(userData)) as UserEntity);

  const jwtToken = AuthService.generateToken(user.uid);
  ctx.cookies.set('jwt', jwtToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  ctx.redirect('http://localhost:4000/api/auth');
});

AuthRouter.get('/callback/kakao', async (ctx: Context) => {
  const { code, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const accessToken = await AuthService.getKakaoAccessToken(code);
  const userInfo = await AuthService.getKakaoUserInfo(accessToken);
  const userData = new KaKaoUserDTO(userInfo);

  const isExistUser = await UserService.existSocialUser(userData);

  const user = isExistUser
    ? ((await UserService.getUserBySocialUserInfo(userData)) as UserEntity)
    : ((await UserService.createNewUser(userData)) as UserEntity);

  const jwtToken = AuthService.generateToken(user.uid);
  ctx.cookies.set('jwt', jwtToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  ctx.redirect('http://localhost:4000/api/auth');
});

export default AuthRouter;