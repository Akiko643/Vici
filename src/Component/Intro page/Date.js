import react from 'react';
import Calendar from './Calendar';

function onPanelChange(value, mode) {
    console.log(value, mode);
}

function Date({ exam }) {
    return (
        <div className='w-320'>
            <h1 className='fs-20 w100 text-center'>{exam}</h1>
            <Calendar />
        </div>
    );
}

export default Date;
