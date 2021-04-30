import React, { useState } from 'react'
import './Info.scss'
import img from '../../Img/Rectangle 14.png'
export const Info = (props) => {
    const { chapters } = props;
    const [chapterIndex, setChapterIndex] = useState(0);
    return (
        <div className='flex-col info-container'>
            <img
                src={img}
                className='w100'
                alt='Hello world idk img here not loaded'
            />
            <div className='flex'>
                <div className='ma-10'>
                    <ul className='fs-20 lh-20 list-style-none pa-20 br-default-1 bradius-20'>
                        {
                            chapters.map((chapter, index) => {
                                return (
                                    <li className={`c-default pb-10 bb-default-1 w-130 ma-4 ${chapterIndex == index && 'active-chapter'} pointer`} onClick={() => setChapterIndex(index)}>
                                        {chapter.header}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className='ma-10 pa-100 pt-1'>
                    <h1 className='c-secondary'>
                        {chapters[chapterIndex].header}
                    </h1>
                    <p className='fs-20 ln-25'>
                        {chapters[chapterIndex].text}
                    </p>
                </div>
            </div>
        </div>
    );
}