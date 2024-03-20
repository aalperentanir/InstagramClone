
import { SIGN_IN,SIGN_UP} from "./ActionType";

//Üye Girişi
export const signinAction = (data) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:5454/signin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(data.email + ":" + data.password)
            }
        });

        

        const token = res.headers.get("Authorization");
        
            localStorage.setItem("token", token);
            dispatch({ type: SIGN_IN, payload: token });
            console.log("signIn token: ", token);
        
    } catch (error) {
        console.error('Sign in error:', error.message);
    }
};
   /* dispatch({type:SIGN_IN})
    try {
        const {data}=await axios.post("http://localhost:5454/signin",signinData.data)

        if(data.jwt){
            localStorage.setItem("token",data.jwt);
        }

        dispatch({type:SIGN_IN_SUCCESS,payload:data.jwt})
        console.log("signin:",data)

    } catch (error) {
        console.log("error:",error)
        dispatch({type:SIGN_IN_ERROR,payload:error})
    }*/
 



//Üye olmak
export const signupAction = (data) => async (dispatch) => {


    
    try {
        const res = await fetch("http://localhost:5454/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body:JSON.stringify(data)
        })
        const user = await res.json();
       
            localStorage.setItem("token",user.jwt)
        
        console.log("signup user:", user)
        dispatch({ type: SIGN_UP, payload: user })
    } catch (error) {
        console.error('Signup error:', error.message);

    }

   /* dispatch({type:SIGN_UP})
    try {
        const {data}=await axios.post("http://localhost:5454/signup",signupData.data)

        if(data.jwt){
            localStorage.setItem("token",data.jwt);
        }

        dispatch({type:SIGN_UP_SUCCESS,payload:data.jwt})

        console.log("signup:",data)

    } catch (error) {
        console.log("error:",error)
        dispatch({type:SIGN_UP_ERROR,payload:error})
    }*/

}