import React from 'react';
import Col from './Col';
import './footer.css';
import { Link } from 'react-router-dom';
import { FooterElements } from './FooterElements';

function Footer() {
    return (
        <div className='footer flex h-200 b-footer '>
            {FooterElements.map(({ title, path, elements }, index) => {
                return (
                    <Col>
                        <Link to={path} className='nounderline'>
                            <h1 className='header' key={`${index}`}>
                                {title}
                            </h1>
                            {elements.map((el, indexx) => (
                                <Link to={el.path} className='nounderline'>
                                    <div
                                        className='el'
                                        key={`${index}-${indexx}`}
                                    >
                                        {el.name}
                                    </div>
                                </Link>
                            ))}
                        </Link>
                    </Col>
                );
            })}
        </div>
    );
}

export default Footer;
