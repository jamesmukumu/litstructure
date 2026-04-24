import {createSlice} from "@reduxjs/toolkit"

let adminSlice = createSlice({
name:"admin",
initialState:{
admin:false
},
reducers:{
update:(state,action)=>{
state.admin = action.payload
}
}
})

export const {update} = adminSlice.actions
export default adminSlice.reducer