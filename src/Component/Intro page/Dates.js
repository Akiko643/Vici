import react from 'react';
import { useCol, useDoc } from '../../Hooks/firebase';
import Calendar from './Calendar';

function onPanelChange(value, mode) {
    console.log(value, mode);
}

function Dates({ exam }) {
    const satDB = useDoc('/content/contents/Exams/SAT');
    const toeflDB = useDoc('/content/contents/Exams/TOEFL');
    const ieltsDB = useDoc('/content/contents/Exams/IELTS');
    let tmp = new Date();
    let satdates = [
            [2021, 7, 28],
            [2021, 9, 2],
            [2021, 10, 6],
            [2021, 11, 4],
            [2022, 2, 12],
            [2022, 4, 7],
            [2022, 5, 4],
        ],
        ieltsdates = [
            [2021, 0, 9],
            [2021, 0, 16],
            [2021, 0, 23],
            [2021, 1, 6],
            [2021, 1, 20],
            [2021, 1, 27],
            [2021, 2, 13],
            [2021, 2, 20],
            [2021, 2, 27],
            [2021, 3, 10],
            [2021, 3, 17],
            [2021, 3, 24],
            [2021, 4, 8],
            [2021, 4, 20],
            [2021, 4, 22],
            [2021, 4, 29],
            [2021, 5, 5],
            [2021, 5, 12],
            [2021, 5, 19],
            [2021, 6, 10],
            [2021, 6, 17],
            [2021, 6, 24],
            [2021, 7, 7],
            [2021, 7, 21],
            [2021, 7, 28],
            [2021, 8, 4],
            [2021, 8, 11],
            [2021, 8, 25],
            [2021, 9, 9],
            [2021, 9, 23],
            [2021, 9, 30],
            [2021, 10, 6],
            [2021, 10, 20],
            [2021, 10, 27],
            [2021, 11, 4],
            [2021, 11, 11],
            [2021, 11, 18],
        ],
        toefldates = [
            [2021, 5, 19],
            [2021, 5, 26],
            [2021, 6, 3],
            [2021, 6, 24],
            [2021, 7, 7],
            [2021, 7, 21],
            [2021, 8, 4],
            [2021, 8, 11],
            [2021, 8, 18],
            [2021, 8, 25],
            [2021, 9, 9],
            [2021, 9, 16],
            [2021, 9, 23],
            [2021, 9, 30],
            [2021, 10, 6],
            [2021, 10, 13],
            [2021, 10, 20],
        ];

    // const fetchdata = () => {

    // }
    // satdates.forEach((sat, index) => {

    //     const { data } = satDB;
    //     // console.log(data);
    //     data.dates[index] = sat;
    //     satDB.updateRecord({ dates: data.dates });
    // });

    let toefl = [],
        ielts = [],
        sat = [];

    for (let i = 0; i < satdates.length; i++)
        sat.push(new Date(satdates[i][0], satdates[i][1], satdates[i][2]));
    for (let i = 0; i < ieltsdates.length; i++)
        ielts.push(
            new Date(ieltsdates[i][0], ieltsdates[i][1], ieltsdates[i][2])
        );
    for (let i = 0; i < toefldates.length; i++)
        toefl.push(
            new Date(toefldates[i][0], toefldates[i][1], toefldates[i][2])
        );

    return (
        <div className='w-320'>
            {exam && <h1 className='fs-22 w100 text-center mb-20'>{exam}</h1>}
            <Calendar
                dates={
                    exam === 'TOEFL Dates'
                        ? toefl
                        : exam === 'IELTS Dates'
                        ? ielts
                        : sat
                }
            />
        </div>
    );
}

export default Dates;
