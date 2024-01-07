export interface LooseInterface {
  [key: string]: any;
}

export interface ApiSagaActionType<T> {
  [key: string]: any;
  onSuccessCb?: (data?: T) => void;
  onErrorCb?: (error?: any) => void;
}
