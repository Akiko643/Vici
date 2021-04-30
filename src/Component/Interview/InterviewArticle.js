import React from 'react'
import defaultImg from '../../Img/article.png'
import './InterviewArticle.css'
const InterviewArticle = ({img, title, views}) => {
    return (
        <div>
            <div className='cont' style={{ backgroundImage: `url(${img ? img : defaultImg})` }}>
                <div className='tag'> Education</div>
                <div className='title'>
                    {title ? title : 'John Doe: Applying is the most important step'}
                </div>
            </div>
        </div>
    )
}
export default InterviewArticle
