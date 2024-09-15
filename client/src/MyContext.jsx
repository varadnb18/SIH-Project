import React, { useState, createContext } from "react";

const MyContext=createContext();

const MyProvider=({children})=>{
    const [data,setData]=useState('');

    return(
        <MyContext.Provider value={{data,setData}}>
            {children}
        </MyContext.Provider>
    );
};

export {MyContext,MyProvider};