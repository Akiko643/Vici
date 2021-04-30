import React from 'react';
import BlogPost from './BlogPost';
function Recent() {
    return (
        <div className='recent pt-128 flex justify-between mb-67'>
            <BlogPost height={450} width={520} />
            <div className='w-430 flex-col justify-between'>
                <h1 className='c-white'>
                    Хэрхэн ажилаа хойш тавихаа багасгах вэ?
                </h1>
                <p className='c-white'>
                    Бид бүгд амьдралынхаа аль нэг хэсэгт ажлаа хойш тавих
                    зуршилтай нүүр тулсаар ирсэн билээ. Хойш тавих сэдэл нь
                    зарим тохиолдолд таныг өөрийг тань дийлдэг бөгөөд энэ нь
                    бидний бүтээмжийг асар ихээр бууруулдаг гэж хэлж болно юм.
                    Би өөрөө ч гэсэн ажлыг их хойш тавьдаг хүн боловч энэ блог
                    дээр дурдсан дараах алхамуудыг хэрэгжүүлснээр надад их
                    нөлөөлсөн бөгөөд эдгээр алхамууд нь танд ч гэсэн тус болно
                    гэдэгт итгэлтэй байна.
                </p>
                <button className='w-130 h-45 bradius-10'>see more</button>
            </div>
        </div>
    );
}

export default Recent;
