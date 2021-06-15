import react from 'react';
import Calendar from './Calendar';

function onPanelChange(value, mode) {
    console.log(value, mode);
}

function Dates({ exam }) {
    let tmp = new Date();
    let toefl = [tmp, tmp];
    let tmp1 = new Date(2021, 5, 16);
    let ielts = [tmp1, tmp];
    let sat = [tmp, tmp1];

    return (
        <div className='w-320'>
            {exam && <h1 className='fs-20 w100 text-center'>{exam}</h1>}
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
