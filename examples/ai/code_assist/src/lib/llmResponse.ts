// simple interface for the response data from the query route
export default interface LlmResponseData {
  files: string[];
  content: string[];
  answer: string;
}
