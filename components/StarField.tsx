
import React from 'react';

export const StarField: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10">
            <div id="stars" className="absolute w-1 h-1 bg-white rounded-full shadow-[50vw_30vh_0_0,#fff,80vw_90vh_0_0,#fff,20vw_10vh_0_0,#fff,10vw_50vh_0_0,#fff,90vw_20vh_0_0,#fff,40vw_70vh_0_0,#fff,60vw_60vh_0_0,#fff]"></div>
            <div id="stars2" className="absolute w-2 h-2 bg-white rounded-full shadow-[10vw_40vh_0_0,#fff,85vw_15vh_0_0,#fff,5vw_75vh_0_0,#fff,45vw_5vh_0_0,#fff,95vw_95vh_0_0,#fff,65vw_25vh_0_0,#fff,30vw_85vh_0_0,#fff]"></div>
            <div id="stars3" className="absolute w-3 h-3 bg-white rounded-full shadow-[25vw_55vh_0_0,#fff,75vw_5vh_0_0,#fff,15vw_95vh_0_0,#fff,55vw_45vh_0_0,#fff,35vw_15vh_0_0,#fff,5vw_35vh_0_0,#fff,95vw_65vh_0_0,#fff]"></div>
            <style>{`
                @keyframes animStar {
                    from { transform: translateY(0px); }
                    to { transform: translateY(-2000px); }
                }
                #stars { animation: animStar 70s linear infinite; }
                #stars2 { animation: animStar 100s linear infinite; }
                #stars3 { animation: animStar 150s linear infinite; }
            `}</style>
        </div>
    );
};
