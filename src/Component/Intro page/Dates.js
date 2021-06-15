import react from 'react';
import Calendar from './Calendar';

function onPanelChange(value, mode) {
    console.log(value, mode);
}

function Dates({ exam }) {
    let tmp = new Date();
    let toefl = [tmp, tmp];
    let ielts = [tmp, tmp];
    let sat = [tmp, tmp];

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
