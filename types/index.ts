export interface LoginRequest {
  phone: string;
  verificationCode: string;
}

export interface LoginResponse {
  /**
   * 是否新用户
   */
  isNew: string;
  /**
   * 登录成功返回令牌Token
   */
  token: string;
}

export interface SaveProfileRequest {
  /**
   * 生日：年月日
   */
  birthday: string;
  /**
   * 城市
   */
  city: string;
  /**
   * 性别：man woman
   */
  gender: string;
  /**
   * 用户头像
   */
  header: string;
  /**
   * 昵称
   */
  nickname: string;
}

export interface TodayBestResponse {
  /**
   * 年龄
   */
  age: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 缘分值
   */
  fateValue: number;
  /**
   * 性别：man woman
   */
  gender: string;
  /**
   * 编号, 1~10000
   */
  id: number;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 标签, 字符数组
   */
  tags: string[];
}

export interface RecommendationListRequest {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 所在城市
   */
  city?: string;
  /**
   * 学历
   */
  education?: string;
  /**
   * 性别：man woman
   */
  gender?: string;
  /**
   * 近期登录时间
   */
  lastLogin?: string;
  /**
   * 当前页
   */
  page: number;
  /**
   * 页尺寸
   */
  pagesize: number;
}

export interface RecommendationListResponse {
  counts: number;
  items: RecommendationListItem[];
  page: number;
  pages: number;
  pagesize: number;
}

export interface RecommendationListItem {
  age: number;
  avatar: string;
  fateValue: number;
  gender: string;
  id: number;
  nickname: string;
  tags: string[];
}

export interface RecommendationMomentListRequest {
  page: number;
  pagesize: number;
}

export interface RecommendationMomentListResponse {
  counts: number;
  items: RecommendationMomentListItem[];
  page: number;
  pages: number;
  pagesize: number;
}

export interface RecommendationMomentListItem {
  age?: number;
  avatar?: string;
  commentCount?: number;
  createDate?: string;
  distance?: string;
  gender?: string;
  hasLiked?: number;
  hasloved?: number;
  id?: string;
  imageContent?: string[];
  likeCount?: number;
  loveCount?: number;
  nickname?: string;
  tags?: string[];
  textContent?: string;
  userId?: number;
}

export interface MomentCommentsParams {
  page: number;
  pagesize: number;
  movementId: string;
}

export interface MomentCommentsResponse {
  counts: number;
  items: MomentCommentsItem[];
  page: number;
  pages: number;
  pagesize: number;
}

export interface MomentCommentsItem {
  avatar?: string;
  content?: string;
  createDate?: string;
  hasLiked?: number;
  id?: string;
  likeCount?: number;
  nickname?: string;
}

export interface UserInfoResponse {
  created: string;
  updated: string;
  id: number;
  userId: number;
  nickName: string;
  logo: string;
  tags: string;
  sex: string;
  age: number;
  edu: string;
  city: string;
  birthday: string;
  coverPic: string;
  industry: string;
  income: string;
  marriage: string;
  starCounts: number;
  likeCounts: number;
  fanCounts: number;
}
