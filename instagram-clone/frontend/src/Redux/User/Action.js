
import { FOLLOW_USER, GET_USERS_BY_USER_IDS, GET_USER_BY_USERNAME, REQ_USER, SEARCH_USER, SUGGEST_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType.js";
const BASE_API = "http://localhost:5454/api"
export const getUserProfileAction = (jwt) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/req`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : "Bearer " + jwt // 'Bearer' ile token arasına boşluk ekledim.
            }
        });

       const reqUser = await res.json(); // Yanıtı JSON olarak oku
        console.log("found user:", reqUser);
        
         dispatch({type:REQ_USER,payload:reqUser})// Redux'a kullanıcı bilgisini gönder
    } catch (error) {
        console.error("Error fetching user profile:", error); // Hata mesajını daha açıklayıcı hale getirdim.
        dispatch({ type: 'FETCH_USER_PROFILE_ERROR', error });
    }
};

export const findUserByUsernameAction = (data) => async (dispatch) => {
    const res = await fetch(`${BASE_API}/users/username/${data.username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.jwt
        }
    });

    const user=await res.json();
    
    console.log("find by username: ",user)
    dispatch({type:GET_USER_BY_USERNAME,payload:user});
}

/*export const findUserByUserIdsAction = (data) => async (dispatch) => {
    const res = await fetch(`${BASE_API}/users/mul/${data.userIds}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " +data.jwt
        }
    });

    const users=await res.json();
    
    console.log("find by userIds: ",users)
    dispatch({type:GET_USERS_BY_USER_IDS,payload:users});
}*/

export const findUserByUserIdsAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/m/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            }
        });

        const users = await res.json();
        console.log("find by userIds: ", users);
        dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });
    } catch (error) {
        console.error('Error:', error);
        // Burada hata ile ilgili işlemler yapabilirsiniz.
    }
};


export const followUserAction = (data) => async (dispatch) => {
    const res = await fetch(`${BASE_API}/users/follow/${data.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " +data.jwt
        }
    });

    const user=await res.json();
    
    console.log("follow user: ",user)
    dispatch({type:FOLLOW_USER,payload:user});
}

export const unfollowUserAction = (data) => async (dispatch) => {
    const res = await fetch(`${BASE_API}/users/unfollow/${data.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " +data.jwt
        }
    });

    const user=await res.json();
    
    console.log("unfollow user: ",user)
    dispatch({type:UNFOLLOW_USER,payload:user});
}

export const searchUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API}/users/search?q=${data.query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " +data.jwt
        }
    });

    const user=await res.json();
    
    console.log("search user: ",user)
    dispatch({type:SEARCH_USER,payload:user});

  } catch (error) {
    console.log("catched error",error)
  }
}

export const editUserAction = (data) => async (dispatch) => {
    try {
      const res = await fetch(`${BASE_API}/users/account/edit`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " +data.jwt
          },
          body:JSON.stringify(data.data)
      });
  
      const user=await res.json();
      
      console.log("edited user: ",user)
      dispatch({type:UPDATE_USER,payload:user});
  
    } catch (error) {
      console.log("catched error",error)
    }
  }

  export const getSuggestionUser = (jwt) => async (dispatch) => {
    try {
      const res = await fetch(`${BASE_API}/users/suggestions`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " +jwt
          },
      });
  
      const user=await res.json();
      
      //console.log("suggested user: ",user)
      dispatch({type:SUGGEST_USER,payload:user});
  
    } catch (error) {
      console.log("catched error",error)
    }
  }