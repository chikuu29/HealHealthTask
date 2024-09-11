import { useDispatch } from "react-redux";



export function testMethod(e:React.MouseEvent,appConfig:any) {
    console.log("Custom Action 1 executed!",e,appConfig);
  }


export function onClickLogout(e:React.MouseEvent,appConfig:any) {
     console.log("===CALLING LOGOUT===");
    
     
  
}



