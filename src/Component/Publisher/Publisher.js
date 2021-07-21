import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import { Context } from '../../Providers/contentProvider';
import { BlogItemComp } from '../Blog/BlogItemComp';
import Back from '../../Img/vector__back.svg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '../Interview/Card';

const Publisher = () => {
    const match = useRouteMatch();
    const history = useHistory();
    console.log(match.params.userID);
    const { firebase } = useFirebase();
    const { language } = useContext(Context);
    const [blogdata, setBlogdata] = useState();
    const [interviewdata, setInterviewdata] = useState();
    const { data: userdata } = useDoc(`users/${match.params.userID}`);
    // const { data } = useDoc(`users/${match.params.userID}`);
    const getBlogdata = async () => {
        let data = await firebase
            .firestore()
            .collection('content/contents/Blog')
            .orderBy('visits', 'desc')
            .where('language', '==', language)
            .where('publisherId', '==', match.params.userID)
            .orderBy('createdAt', 'desc')
            .get();
        data = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBlogdata(data);
    };
    const getInterviewdata = async () => {
        let data = await firebase
            .firestore()
            .collection('content/contents/Interview')
            .where('language', '==', language)
            .where('publisherId', '==', match.params.userID)
            .orderBy('createdAt', 'desc')
            .get();
        data = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setInterviewdata(data);
    };

    useEffect(() => {
        const dosomething = async () => {
            await getBlogdata();
        };
        const anothersomething = async () => {
            await getInterviewdata();
            console.log(interviewdata);
        };
        dosomething();
        anothersomething();
    }, [language]);

    return (
        <div className='relative'>
            <img
                src='../images/publisher_top.svg'
                className='absolute top-0 l-0 w100 h-400'
            />
            <div className='pa-vw-10 pr'>
                <div className='flex'>
                    <img
                        src={Back}
                        className='arrow pointer'
                        onClick={() => history.goBack()}
                        alt=''
                    />
                    <div className='ml-102 flex mb-95'>
                        {/* data.profilePicUrl */}
                        <img
                            src={userdata?.profilePicUrl}
                            alt='user porfile'
                            className='h-200 w-200 bradius-100'
                        ></img>
                        <div className='ml-35 flex items-center fs-30 fw-800 pb-30'>
                            {userdata?.displayName}
                        </div>
                    </div>
                </div>
                <div className='w60 ml-50'>
                    {blogdata?.map((topdt, index) => {
                        return (
                            <BlogItemComp
                                index={index}
                                data={topdt}
                                size='medium'
                                classStr={'w100'}
                            />
                        );
                    })}
                </div>
                <div>
                    {interviewdata?.map((card, index) => {
                        return <Card card={card} index={index} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Publisher;
