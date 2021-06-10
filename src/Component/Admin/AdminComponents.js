import React from 'react';
import Carousel from 'react-multi-carousel';
import { useCol, useDoc } from '../../Hooks/firebase';

export const AdminCategory = ({ state, setState }) => {
    const { data } = useDoc('content/contents');
    console.log(data);
    return (
        <div className='grid grid-cols-2 gap-20 mx-20 mt-20'>
            {data?.list?.map((d) => {
                return (
                    <div
                        className='bg-blue-500 h-200 rounded-3xl flex items-center justify-center text-white text-6xl'
                        onClick={() => {
                            setState({ ...state, category: d, level: 1 });
                        }}
                    >
                        {d}
                    </div>
                );
            })}
        </div>
    );
};

export const AdminField = ({ state, setState }) => {
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
        <Carousel
            swipeable={true}
            arrows={false}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            keyBoardControl={true}
            containerClass='carousel-container'
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-40-px'
        >
            {data &&
                data.map((dt) => {
                    return (
                        <div className='m-30 bg-pink-200 rounded-xl flex justify-center items-center flex-col'>
                            <img
                                className='h-50 w-50 m- 20'
                                src={dt.image}
                                alt=''
                            ></img>
                            <div className='w-50 h-200 m-20'></div>
                        </div>
                    );
                })}
        </Carousel>
    );
};

export const AdminPosts = ({ state, setState }) => {
    return <div></div>;
};

export const AdminOnePost = ({ state, setState }) => {
    return <div></div>;
};
