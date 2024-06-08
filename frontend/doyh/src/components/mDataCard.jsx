import React from 'react'

const MDataCard = ({imgUrl, name, tag, tag1, tag2, desc}) => {
  return(
      <div>
          <div className="bg-white border-black border-2 w-[30rem] h-40 flex flex-row">
                <div className="w-[8rem] h-[8rem]">
                    <img src={imgUrl} alt={name} style={{borderRadius: '50%', objectFit: 'cover', width: "8rem", height:"8rem"}}/>
                </div>
                <div className='flex flex-col'>
                    <div className="text-[2rem] w-[20rem]">
                        {name}
                    </div>
                    <div className="">
                        {desc}
                    </div> 
                    <div className='flex flex-row'>
                        <div className="flex border-2 border-black rounded-xl w-[6rem] text-center bg-black text-white">
                            {tag}
                        </div>
                        <div className=" flex border-2 border-black rounded-xl w-[6rem] text-center bg-black text-white">
                            {tag1}
                        </div>
                        <div className=" flex border-2 border-black rounded-xl w-[6rem] text-center bg-black text-white">
                            {tag2}
                        </div>
                    </div>
                </div>
                
                
          </div>
        </div>
  );    
};

export default MDataCard;