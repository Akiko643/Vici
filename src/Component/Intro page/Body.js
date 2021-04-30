import React from 'react';
import { Link } from 'react-router-dom';
import Wrap from './Wrap';
import img1 from '../../Img/bodypage1.png';
import img2 from '../../Img/bodypage2.png';
import img3 from '../../Img/bodypage3.png';
function Body() {
    return (
        <div>
            {/* <h1>Hello World</h1>
            <Link to='/infos'>Informations</Link> */}
            <Wrap
                title='Welcome to vici'
                description='This is non profit website directed towards teenagersto help them conquer their own dreams by supporting them in various aspects.'
                link='/user-login'
                photo={img1}
                left={1}
            />
            <Wrap
                title='Welcome to vici'
                description='This is non profit website directed towards teenagersto help them conquer their own dreams by supporting them in various aspects.'
                link='/infos'
                photo={img2}
                left={0}
            />
            <Wrap
                title='Welcome to vici'
                description='This is non profit website directed towards teenagersto help them conquer their own dreams by supporting them in various aspects.'
                link='/'
                photo={img3}
                left={1}
            />
        </div>
    );
}

export default Body;
