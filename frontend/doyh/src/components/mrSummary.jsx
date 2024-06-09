import React from "react";

const MrSummary = () => {
    return(
        <div className="bg-white border-black border-2 w-[30rem] h-40 flex flex-row mb-8">
            <div className="w-[8rem] h-[8rem]">
                <img src={`data:image/jpeg;base64,${imgUrl}`} alt={name} style={{borderRadius: '50%', objectFit: 'cover', width: "8rem", height:"8rem"}}/>
            </div>
            <div className='flex flex-col'>
                <div className="text-[2rem] w-[20rem]">
                          {name}
                      </div>
                      <div className="">
                          {desc}
                      </div> 
                      <div className='flex flex-row'>
                          {tags.map((tag) => (
                              <div className=" flex border-2 border-black rounded-xl w-[6rem] text-center mr-2 bg-black text-white">
                                  #{tag}
                              </div>
                          ))}
                      </div>``
                  </div>
                  
                  
            </div>
    );    
  };
  
  export default MDataCard;