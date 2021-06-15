import React, { useState } from 'react';

const Calendar = () => {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };
    const [month, setMonth] = useState(new Date());
    const []
    console.log(month);
    return (
        <div className='b-white bradius-10'>
            <div className='flex w100 justify-between items-center'>
                <div className='flex w50 justify-around fs-15'>
                    <h2>{months[month.getMonth()]}</h2>
                    <h2>{month.getFullYear()}</h2>
                </div>
                <div className='flex items-center'>
                    <img src='./images/back.svg' className='h-20 w-20 mr-12' />
                    <img src='./images/next.svg' className='h-20 w-20 mr-12' />
                </div>
            </div>
            <div className='grid grid-cols-7'></div>
        </div>
    );
};

export default Calendar;
