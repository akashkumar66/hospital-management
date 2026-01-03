import {createSlice} from "@reduxjs/toolkit";


const initialState={
    doctordata:null,
    patientdata:null
}



const Doctorslice=createSlice(
    {
        name:"Doctor",
        initialState,
        reducers:{
            setDoctordata:(state,action)=>{
                state.doctordata=action.payload
            },

            setPatientdata:(state,action)=>{
                state.patientdata=action.payload
            }



        }
    }
)




export const {setDoctordata, setPatientdata}=Doctorslice.actions;
export const Doctorreducer=Doctorslice.reducer;


