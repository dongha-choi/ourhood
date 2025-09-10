export interface MomentInfo {
  momentMetadata: {
    momentImageUrl: string;
    userId: number;
    nickname: string;
    createdAt: string;
  };
  momentDetail: {
    momentDescription: string;
  };
}
export interface MomentCardInfo {
  momentId: number;
  momentImageUrl: string;
}
