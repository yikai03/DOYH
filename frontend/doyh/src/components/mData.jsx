import React from "react";
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

const MData = () => {
    return (
        <div id="mentor">
                <div>
                    {mData.map((mentor) => (
                        <MDataCard 
                            name={mentor.name}
                            tag={mentor.tag}
                            tag1={mentor.tag1}
                            tag2={mentor.tag2}
                            desc={mentor.desc}
                            imgUrl={mentor.image}
                        />))}
                </div>
        </div>
    );
};

export default MData;