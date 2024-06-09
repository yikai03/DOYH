import React, { useEffect, useState } from "react";
import MDataCard from "./mDataCard.jsx";

const mData = [
    {
        name: "Darrin Foo Kai",
        tag: "#Tech",
        tag1: "#Business",
        tag2: "#Finance",
        desc: "Champion",
        image: "src/assets/rin.jpeg",

    },
    {
        name: "Bruce Wayne",
        tag: "#Retail",
        tag1: "#Education",
        tag2: "#Finance",
        desc: "Batman",
        image: "src/assets/rin.jpeg",

    },
    {
        name: "Mark Zuckerberg",
        tag: "#Tech",
        tag1: "#Business",
        tag2: "#Finance",
        desc: "Google",
        image: "src/assets/rin.jpeg",

    },
    {
        name: "Elon Musk",
        tag: "#Tech",
        tag1: "#Transportation",
        tag2: "#Finance",
        desc: "Tesla",
        image: "src/assets/rin.jpeg",

    },
];

const MData = ({data}) => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch("http://localhost:8000/mentor-data");
    //         const datas = await response.json();
    //         setData(datas);
    //     }

    //     fetchData();
    // },[])

    return (
        <div >
                <div className="pl-36 grid grid-cols-2">
                    {data.map((data) => (
                        <MDataCard 
                            name={data.name}
                            tags={data.tags}
                            desc={data.entitle}
                            imgUrl={data.image}
                        />))}
                </div>
        </div>
    );
};

export default MData;