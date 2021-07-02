import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import Editor from './Editor';
import { InterviewPosts } from './AdminPosts';
// import Lesson from '../Education/Lesson';
import '../Education/Lesson.scss';

export const InterviewField = ({ state, setState }) => {
    // setState({ ...state, level: 2 });
    return <InterviewPosts state={state} setState={setState} />;
};

export const CollegePrepField = ({ state, setState }) => {
    console.log('here');
    const { data } = useCol('content/contents/College-prep');
    return (
        <div className=' grid grid-cols-3 grid-rows-2 grid-gap-30'>
            {data &&
                data.map((myData) => (
                    <div
                        className='pointer h-200 b-footer flex items-center justify-center bradius-20 c-white fs-40 fw-800'
                        onClick={() => {
                            setState({
                                ...state,
                                field: myData.id,
                                level: 2,
                            });
                        }}
                    >
                        {myData.name}
                    </div>
                ))}
        </div>
    );
};

export const BlogField = ({ state, setState }) => {
    const { data } = useCol('content/contents/categories');
    // console.log(data);
    return (
        <div className='flex justify-around'>
            {data &&
                data.map((dt) => (
                    <div
                        className='pointer w45 h-200 b-footer flex items-center justify-center bradius-20 c-white fs-40 fw-800'
                        onClick={() => {
                            setState({
                                ...state,
                                field: dt.id,
                                level: 2,
                            });
                        }}
                    >
                        {dt.name}
                    </div>
                ))}
        </div>
    );
};

const Lesson = ({ icon, name, path, elements, id, state, setState }) => {
    // const history = useHistory();
    // const location = useLocation();
    return (
        <div className=' bradius-20 ma-20 flex-center pa-40 lesson-container'>
            <div className='h-50 fs-36 flex'>
                <img className='h-50 w-50 mr-10' src={icon} alt=''></img>
                <div> {name} </div>
            </div>
            <div className='h-210 w100 flex-col mt-10'>
                {elements?.map((el, index) => {
                    return (
                        <div
                            className='h-45 flex flex-row items-center'
                            key={index}
                        >
                            <div className='too'>
                                <p>{index + 1}</p>
                            </div>
                            {el}
                        </div>
                    );
                })}
            </div>
            <div className='w100 flex-center mt-20 mb-20'>
                <div
                    className='w-130 h-45 text-center bradius-10 b-secondary flex-center c-white pointer'
                    // onClick={() => history.push(location.pathname + '/' + id)}
                    onClick={() => {
                        setState({
                            ...state,
                            field: id,
                            level: 2,
                        });
                    }}
                >
                    Edit
                </div>
            </div>
        </div>
    );
};

export const EducationField = ({ state, setState }) => {
    const { data } = useCol(`content/contents/${state.category}`);
    console.log(data);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <div className='w100 ph-30 pv-70 educations'>
            <Carousel
                swipeable={true}
                arrows={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                keyBoardControl={true}
                containerClass='carousel-container h-475 justify-normal'
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass='custom-dot-list-style'
                itemClass='carousel-item-padding-40-px'
            >
                {data &&
                    data?.map((dt, index) => {
                        return (
                            <Lesson
                                icon={dt?.image}
                                name={dt?.name}
                                elements={dt?.questions}
                                id={dt?.id}
                                key={index}
                                state={state}
                                setState={setState}
                            />
                        );
                    })}
                {/* <div
                    className='rounded-lg ma-20 flex-center pa-40'
                    style={{ backgroundColor: '#F5F5F5' }}
                >
                    <p className='h-50 fs-36 flex'>
                        <img
                            className='h-50 w-50 mr-10'
                            src='./images/plus.svg'
                            alt=''
                        ></img>
                        <div>Add new</div>
                    </p>
                    <div className='h-210 w100 flex-col justify-between mt-10'>
                        <input />
                    </div>
                    <div className='w100 flex-center mt-20 mb-20'>
                        <div
                            className='w-130 h-30 text-center bradius-10 b-secondary flex-center c-white pointer'
                            onClick={() => {
                                setState({
                                    ...state,
                                    field: 12,
                                    level: 2,
                                });
                            }}
                        >
                            Select
                        </div>
                    </div>
                </div> */}
            </Carousel>
        </div>
    );
};
