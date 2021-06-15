import React, { useState } from 'react';

const Calendar = ({ dates }) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const findDays = (mth) => {
        let date = new Date(mth);
        date.setDate(1);
        while (date.getDay() !== 1) date.setDate(date.getDate() - 1);
        let monthdates = [];
        for (let i = 0; i < 7; i++) {
            monthdates.push([weekdays[i], 3]);
        }
        for (let i = 0; i < 35; i++) {
            let state = 1;
            if (date.getMonth() === mth.getMonth()) {
                state = 2;
            }
            for (let j = 0; j < dates.length; j++) {
                if (
                    dates[j].getFullYear() === date.getFullYear() &&
                    dates[j].getMonth() === date.getMonth() &&
                    dates[j].getDate() === date.getDate()
                ) {
                    if (date.getMonth() === mth.getMonth()) state = 4;
                    else state = 5;
                }
            }
            monthdates.push([date.getDate(), state]);
            date.setDate(date.getDate() + 1);
        }
        return monthdates;
    };
    const [month, setMonth] = useState(new Date());
    const [days, setDays] = useState(findDays(month));

    return (
        <div className='b-white bradius-25 pa-20 inter'>
            <div className='flex w100 justify-between items-center mb-20'>
                <h2 className='fs-18'>
                    {String(months[month.getMonth()]) +
                        ' ' +
                        String(month.getFullYear())}
                </h2>
                <div className='flex items-center'>
                    <img
                        src='./images/back.svg'
                        alt='back-arrow'
                        className='h-20 w-20 mr-12'
                        onClick={() => {
                            let tmp = new Date(month);
                            tmp.setMonth(tmp.getMonth() - 1);
                            setMonth(tmp);
                            let tmpdays = findDays(tmp);
                            setDays(tmpdays);
                        }}
                    />
                    <img
                        src='./images/next.svg'
                        alt='next-arrow'
                        className='h-20 w-20 mr-12'
                        onClick={() => {
                            let tmp = new Date(month);
                            tmp.setMonth(tmp.getMonth() + 1);
                            setMonth(tmp);
                            let tmpdays = findDays(tmp);
                            setDays(tmpdays);
                        }}
                    />
                </div>
            </div>
            <div className='grid grid-cols-7 text-center grid-col-gap-0 fs-16 fw-600'>
                {days.map((day) => {
                    return (
                        <div
                            className={
                                day[1] === 1
                                    ? 'op30 w-40 h-40 flex-center'
                                    : day[1] === 2
                                    ? 'w-40 h-40 flex-center'
                                    : day[1] === 3
                                    ? 'fw-800 w-40 h-40 flex-center'
                                    : day[1] === 4
                                    ? 'circle b-selected w-40 h-40 flex-center'
                                    : 'circle b-selected w-40 h-40 flex-center op30'
                            }
                        >
                            {day[0]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
