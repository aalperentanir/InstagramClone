import { FOLLOW_USER, GET_USERS_BY_USER_IDS, GET_USER_BY_USERNAME, REQ_USER, SEARCH_USER, SUGGEST_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType.js"

const initialValue={
    reqUser:null,
    findByUsername:null,
    findByUserIds:[],
    followUser:null,
    unfollowUser:null,
    searchUser:null,
    updatedUser:null,
    suggestUsers:[]

}

export const UserReducer=(store=initialValue,{type,payload})=>{
    if(type===REQ_USER){
        return{...store,reqUser:payload}
    }
    else if(type===GET_USER_BY_USERNAME){
        return{...store,findByUsername:payload}
    }
    else if(type===GET_USERS_BY_USER_IDS){
        return{...store,findByUserIds:payload}
    }
    else if(type===FOLLOW_USER){
        return{...store,followUser:payload}
    }
    else if(type===UNFOLLOW_USER){
        return{...store,unfollowUser:payload}
    }
    else if(type===SEARCH_USER){
        return{...store,searchUser:payload}
    }
    else if(type===UPDATE_USER){
        return{...store,updatedUser:payload}
    }
    else if(type===SUGGEST_USER){
        return{...store,suggestUsers:payload}
    }
    return store;
}