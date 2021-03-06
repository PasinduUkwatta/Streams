import {SIGN_IN, SIGN_OUT,CREATE_STREAM,FETCH_STREAM,FETCH_STREAMS,EDIT_STREAM,DELETE_STREAM} from "./types";
import streams from "../apis/streams";
import history from "../history";

export const signIn =(userId)=>{
   return{
       type :SIGN_IN,
       payload:userId
   }
}


export const signOut =()=>{
    return{
        type :SIGN_OUT
    }
}


export const createStream =formValues=> async (dispatch,getState)=>{
    const {userId}=getState().auth
    const responce = await streams.post("/streams", {...formValues,userId})

    dispatch({type:CREATE_STREAM,payload:responce.data})

    //do some programmetic navigation to get back the user
    // window.open("/");
    window.location.href='/'
    // history.push('/');


}


export const fetchStreams =()=> async dispatch=>{
    const responce = await streams.get("/streams")

    dispatch({type:FETCH_STREAMS,payload:responce.data})
}



export const fetchStream =(id)=> async dispatch=>{
    const responce = await streams.get(`/streams/${id}`)

    dispatch({type:FETCH_STREAM,payload:responce.data})
}



export const editStream =(id,formValues)=> async dispatch=>{
    const responce = await streams.patch(`/streams/${id}`,formValues)

    dispatch({type:EDIT_STREAM,payload:responce.data})
    // window.open("/");
    window.location.href='/'
}



export const deleteStream =id=> async dispatch=>{
    await streams.delete(  `/streams/${id}`)

    dispatch({type:DELETE_STREAM,payload:id})
    window.location.href='/'

}