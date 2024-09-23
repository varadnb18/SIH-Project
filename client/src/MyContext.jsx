import React, { useState, createContext } from "react";

const MyContext=createContext();

const MyProvider=({children})=>{
    const [data,setData]=useState('');
    const [loading,setLoading]=useState(false);

    return(
        <MyContext.Provider value={{data,setData,loading,setLoading}}>
            {children}
        </MyContext.Provider>
    );
};

export {MyContext,MyProvider};