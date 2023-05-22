import { LoginRequest, LoginResponse, RecommendationListRequest, RecommendationListResponse, RecommendationMomentListRequest, RecommendationMomentListResponse, SaveProfileRequest, TodayBestResponse } from "../types";
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
  return request.post("/user/loginReginfo/head", data);
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
