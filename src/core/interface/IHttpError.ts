export interface IHttpErrorItem {
  readonly status: number;
  message: string;
  readonly code: string;
  description?: string;
}
