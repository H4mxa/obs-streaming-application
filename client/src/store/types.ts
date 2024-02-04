import { IChannelSlice } from "redux/channel/types";
import { ILoginState } from "redux/login/types";
import { IRegisterState } from "redux/register/types";

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login?: ILoginState;
  register?: IRegisterState;
  channel?: IChannelSlice;
}
