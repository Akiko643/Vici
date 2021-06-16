import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import { useCol, useDoc } from '../../../Hooks/firebase';
import './InterviewTest.css';
import ReactPlayer from 'react-player/youtube';
import PlayerData from './PlayerData.js';
import Navbar from '../../Navbar/Navbar';
import Back from '../../../Img/vector__back.svg';
import Card from '../Card';
import Footer from '../../Footer/Footer';
export const InterviewTest = (props) => {
    let match = useRouteMatch();
    const { updateRecord } = useCol('/content/contents/Blog');
    const doc = useDoc(`/content/contents/Blog/${match.params.blogId}`);
    const [blogData, setBlogData] = useState({});
    const history = useHistory();
    const { data } = useDoc(`users/${blogData?.publisherId}`);
    const toTime = (timestamp) => {
        var date = new Date(timestamp?.seconds * 1000);
        return (
            date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
        );
    };
    const card = {
        image: 'https://s2.im.ge/2021/06/13/QDbDY.png',
        header: 'John Doe',
        subheader: 'Director at Famous Company',
    };
    return (
        <div>
            <Navbar />
            <div className='interview__container pa-vw-10 pr'>
                <img src={Back} className='arrow' />
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={PlayerData.src}
                        // width="100%"
                        // height="100%"
                    />
                </div>
                <div className='upper__text mt-80'>
                    <h1 className='int__title'>John Doe</h1>
                    <h2 className='int__subtitle'>
                        Director at Famous Company
                    </h2>
                    <div className='little__text mt-40'>
                        <p className='publisher__name '>
                            <img
                                src='https://lh3.googleusercontent.com/proxy/6Ab67PmK5LojafyV-gshTqBi02Yy0p4AXDSv7YDtlIec9EVn8-G2C_F_OXbWeRLN361f609pXhNBo8MRfFltdexO'
                                alt={data?.displayName}
                                className='publisher-profile-img w-15 h-15 mr-5'
                            />
                            Publisher Name
                        </p>
                        <p className='date__created'>
                            {toTime(blogData?.createdAt)}
                        </p>
                    </div>
                    <hr className='mt-30' />
                </div>
                <div className='big-text w-vw-66 mt-30'>
                    <p>
                        The brain doesn't directly communicate with the world.
                        It experiences it from picking it up by our sensory
                        receptors. Our 5 senses pick up everything around us;
                        the smell of perfume, the sound of music, the feeling of
                        fur, the sight of sunsets, the taste of food. Whenever
                        we experience the 5 senses it goes through mental
                        processes called sensation and perception.{' '}
                    </p>

                    <p>
                        Sensation - a process of when sensory receptors receive
                        information and send neural signals to our brain.
                    </p>

                    <p>
                        Perception - a process that receives the sensory
                        information and interprets, organizes, and experiences
                        it.{' '}
                    </p>
                    <br />
                    <p>What is sensory adaptation? </p>

                    <p>
                        Whenever you paint your nails, there's a very strong
                        smell of chemicals. But after a while the smell isn't as
                        noticeable as it was before. It didn't go away, it just
                        decreased in sensitivity due to constant stimulation.
                        This is called sensory adaptation.{' '}
                    </p>
                    <br />
                    <p>How do you measure the senses? </p>

                    <p>
                        You can measure the senses by measuring the two
                        thresholds and applying the signal detection theory.
                        There are two thresholds: the Absolute Threshold and the
                        Difference Threshold (also known as Just Noticeable
                        Difference).{' '}
                    </p>

                    <p>
                        Absolute Threshold - The smallest amount of stimulus
                        that can be detected half of the time.
                    </p>

                    <p>
                        Difference Threshold - The smallest amount of stimulus
                        that can be changed and the difference can be detected
                        half of the time. The signal detection theory states
                        that the sensation depends on the characteristics of the
                        stimulus, the background stimulus, and the detector
                        itself. This theory is used to predict when a weak
                        signal will be detected.
                    </p>
                </div>
                <hr className='mt-45 w-vw-66' />
                <h1 className='latest__speakers  mt-40'>Latest Speakers</h1>
                <div className='w-vw-66 mt-40 lower__container'>
                    <Card card={card} index={1} />
                    <Card card={card} index={2} />
                    <Card card={card} index={3} />
                </div>
            </div>
            <Footer />
        </div>
    );
};
