export interface ApiResponse {
  message?: string;
  code?: number;
  result?: object; // object.. response에 따라 다름
}
