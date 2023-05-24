import { LoginRequest, LoginResponse, MomentCommentsParams, MomentCommentsResponse, RecommendationListRequest, RecommendationListResponse, RecommendationMomentListItem, RecommendationMomentListRequest, RecommendationMomentListResponse, SaveProfileRequest, TodayBestResponse, UserInfoResponse } from "../types";
import request from "./request";

export async function sendVerificationCode(phone: string) {
  return request.post("/user/login", {
    phone,
  });
}

// 登录
export async function login(data: LoginRequest): Promise<LoginResponse> {
  return request.post("/user/loginVerification", data);
}

// 完善个人信息
export async function saveProfile(data: SaveProfileRequest) {
  return request.post("/user/loginReginfo", data);
}

// 上传头像
export async function uploadAvatar(data: FormData) {
  return request.post("/user/loginReginfo/head", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

// 获取今日佳人
export async function getTodayBest(): Promise<TodayBestResponse> {
  return request.get("/tanhua/todayBest");
}

// 获取推荐列表
export async function getRecommendationList(params: RecommendationListRequest): Promise<RecommendationListResponse> {
  return request.get("/tanhua/recommendation", {
    params,
  });
}

// 获取推荐动态
export async function getRecommendationMomentList(params: RecommendationMomentListRequest): Promise<RecommendationMomentListResponse> {
  return request.get("/movements/recommend", {
    params,
  });
}

// 获取好友动态
export async function getFriendsMomentList(params: RecommendationMomentListRequest): Promise<RecommendationMomentListResponse> {
  return request.get("/movements", {
    params,
  });
}

// 查询单条动态
export async function getMomentDetail(id: string): Promise<RecommendationMomentListItem> {
  return request.get(`/movements/${id}`);
}

// 点赞动态
export async function likeMoment(id: string): Promise<number> {
  return request.get(`/movements/${id}/like`);
}

// 取消点赞动态
export async function unlikeMoment(id: string): Promise<number> {
  return request.get(`/movements/${id}/dislike`);
}

// 获取动态的评论列表
export async function getMomentComments(params: MomentCommentsParams): Promise<MomentCommentsResponse> {
  return request.get('/comments', {
    params,
  });
}

// 对动态发表评论
export async function publishMomentComment(movementId: string, comment: string): Promise<number> {
  return request.post('/comments', {
    movementId,
    comment,
  });
}

// 查询当前登录人信息
export async function getCurrentUserInfo(): Promise<UserInfoResponse> {
  return request.get('/personalCentral/integratedInformation');
}

// 保存个人资料
export async function saveUserInfo(params: Partial<UserInfoResponse>): Promise<number> {
  return request.get('/personalCentral/savaUserInfo', {
    params,
  });
}

// 我的粉丝列表
export async function getMyFollowers(): Promise<RecommendationListResponse> {
  return request.get('/personalCentral/queryMyFollowers');
}

// 我的关注列表
export async function getMyFollowings(): Promise<RecommendationListResponse> {
  return request.get('/personalCentral/queryToFollowers');
}

// 我的动态列表
export async function getMyMoments(): Promise<RecommendationMomentListResponse> {
  return request.get('/queryMyMovements');
}
