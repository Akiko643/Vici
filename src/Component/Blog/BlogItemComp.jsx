import React from 'react'
export const BlogItemComp = (props) => {
    const { data, size, classStr } = props;
    const { tag, text, publisherName, createdAt, header, image, publisherId } = data;
    const toSmall = (text) => {
        // console.log(text.split(" "))
        return text.split(" ").slice(0, 30).join(" ")+"...";
    }
    const toTime = (timestamp) => {
        var date = new Date(timestamp.seconds*1000);
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    }
    if (size === 'big') {
        return (
            <BigItem classStr={classStr} image={image} header={header} tag={tag} publisherName={publisherName} publisherId={publisherId} createdAt={toTime(createdAt)}/>
        )
    }else if (size === 'medium') {
        return (
            <MediumItem classStr={classStr} image={image} header={header} tag={tag} text={toSmall(text)}/>
        )
    }else if (size === 'small') {
        return (
            <SmallItem classStr={classStr} image={image} header={header} tag={tag}/>
        );
    }else if (size === 'smallcol') {
        return (
            <SmallColItem classStr={classStr} image={image} header={header} tag={tag} publisherName={publisherName} publisherId={publisherId} createdAt={toTime(createdAt)}/>
        );
    }
    return (
        <MediumItem image={image} header={header} tag={tag} text={toSmall(text)}/>
    );
}
const BigItem = ({classStr, image, header, tag, publisherName, createdAt}) => {
    return (
        <div className={`${classStr} flex-col big-item`}>
            <img className='image h-430 bradius-10' src={image} />
            <div className='blog-tag c-seablue'>#{tag}</div>
            <div className='blog-header'>{header}</div>
            <div className='flex-row'>
                <div className='publishername flex-row'><div className='namecircle'/>{publisherName}</div>
                <div className='time'>{createdAt}</div>
            </div>
        </div>
    );
}
const MediumItem = ({classStr, image, header, tag, text}) => {
    return (
        <div className={`${classStr} flex-row medium-item my-10`}>
            <img className='image bradius-10 w55 h-240' src={image} />
            <div className='flex-col w45 ml-20 my-10'>
                <div className='blog-header'>{header}</div>
                <div className='blog-tag c-seablue'>#{tag}</div>
                <div className='text'>{text}</div>
            </div>
        </div>
    );
}
const SmallItem = ({classStr, image, header, tag}) => {
    return (
        <div className={`${classStr} flex-row small-item my-10`}>
            <img className='image bradius-10 w45 h-120' src={image} />
            <div className='w55 ma-20'>
                <div className='blog-tag c-seablue'>#{tag}</div>
                <div className='blog-header'>{header}</div>
            </div>
        </div>
    );
}
const SmallColItem = ({classStr, image, header, tag, publisherName, publisherId, createdAt}) => {
    return (
        <div className={`${classStr} flex-col small-col-item`}>
            <img className='image bradius-10 h-180' src={image} />
            <div className='blog-tag c-seablue'>#{tag}</div>
            <div className='blog-header'>{header}</div>
            <div className='flex-row my-15'>
                <div className='publishername flex-row'><div className='namecircle'/>{publisherName}</div>
                <div className='time'>{createdAt}</div>
            </div>
        </div>
    );
}