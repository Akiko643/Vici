import React from 'react';
import './main.css'
import University from './University';

function Country({data}) {
    console.log(data);
    return (
        <div className="pa-32">
            <div className="bb-border-1 w-vw-60">
                <h1 className="fw-400">{data.name}</h1>
            </div>
            <div className="bradius-16 of-n mt-32 br-border-1">
                <div className="w100 flex-row b-secondary brad-top-16 h-50 items-center">
                    <p className="w10 pl-10">#Rank</p>
                    <p className="w75 pl-10 bl-white-1">University</p>
                    <p className="w15 pl-10 bl-white-1">Location</p>
                </div>
                {data.ranking.map((un) => <University data={un}/>)}
            </div>
        </div>
    );
}

export default Country;
