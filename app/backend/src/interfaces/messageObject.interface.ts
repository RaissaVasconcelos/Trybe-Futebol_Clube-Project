interface MessageObject {
  [key: string]: string;
}

export interface IServiceResp<Type> {
  statusCode: number;
  message: MessageObject | Type | Type[]
}
