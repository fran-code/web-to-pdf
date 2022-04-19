export interface IFormValues {
  url: string;
  name?: string;
  size: string;
}

export interface IMessage {
  status: "success" | "error";
  title: string;
  time: number;
}