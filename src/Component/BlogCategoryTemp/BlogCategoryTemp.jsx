import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Switch, useRouteMatch, Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useCol, useFirebase } from '../../Hooks/firebase';
import { BlogTemp } from '../blog-temp/blogtemp';
import { BlogItemComp } from '../Blog/BlogItemComp';
import { SuggestPagination } from '../Blog/SuggestPagination';
import './BlogCategoryTemp.scss';
export const BlogCategoryTemp = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:blogId`}>
                <BlogTemp />
            </Route>
            <Route path={`${match.path}`}>
                <CategoryTemp />
            </Route>
        </Switch>
    );
};
const CategoryTemp = () => {
    let match = useRouteMatch();
    const { firebase } = useFirebase();
    const [data, setData] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const categories = useCol('content/contents/categories');
    const [length, setLength] = useState(0);
    const history = useHistory();
    const firstLoad = async (name) => {
        setLoadingMore(true);
        const first = await firebase
            .firestore()
            .collection('/content/contents/Blog')
            .where('category.name', '==', name ? name : match.params.categoryId)
            .orderBy(`createdAt`, 'desc')
            .limit(5);
        const snapshot = await first.get();
        const last = snapshot.docs[snapshot.docs.length - 1];
        const docs = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        setLastDoc(last);
        setData([...docs]);
        setLoadingMore(false);
    };
    const loadMore = async () => {
        setLoadingMore(true);
        if (lastDoc) {
            const next = await firebase
                .firestore()
                .collection('/content/contents/Blog')
                .where('category.name', '==', match.params.categoryId)
                .orderBy('createdAt', 'desc')
                .startAfter(lastDoc)
                .limit(5);
            const snapshot = await next.get();

            const docs = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            if (docs.length == 0) {
                setIsEnd(true);
                // setNumberSug(suggestedPageNumber);
            }
            const last = snapshot.docs[snapshot.docs.length - 1];
            setLastDoc(last);

            setData([...data, ...docs]);
        }
        setLoadingMore(false);
    };
    const handlePageClick = async ({ selected: selectedPage }) => {
        if (selectedPage + 1 > pageNumber) {
            for (let i = pageNumber; i < selectedPage + 1; i++) {
                await loadMore();
            }
        }
        setPageNumber(selectedPage + 1);
    };
    const toCat = async (name) => {
        setIsEnd(false);
        setLoadingMore(false);
        setLastDoc(null);
        setPageNumber(1);
        setLength(0);
        await firstLoad(name);
        history.push(`/blog/${name}`);
        // window.location.reload(false);
    };
    useEffect(() => {
        firstLoad();
    }, []);
    useEffect(() => {
        setLength(
            categories?.data.find((cat) => cat.name === match.params.categoryId)
                ?.length
        );
    }, [categories]);
    return (
        <div className='category-container'>
            <div className='flex-row breadcrumb'>
                <p onClick={() => history.push('/')} className='pointer'>Home</p>/
                <p onClick={() => history.push('/blog')} className='pointer'>Blog</p>/
                <p>{match.params.categoryId}</p>
            </div>
            <div className='flex-row'>
                <div className='w60'>
                    {data
                        .slice((pageNumber - 1) * 4, pageNumber * 4)
                        .map((dt, index) => {
                            return (
                                <BlogItemComp
                                    size='medium'
                                    index={index}
                                    data={dt}
                                />
                            );
                        })}
                </div>
                <div className='w30'>
                    {categories?.data?.map((category, index) => {
                        return (
                            <div
                                className='category-item'
                                onClick={() => toCat(category.name)}
                                key={index}
                            >
                                #{category.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <div> */}
            {/* Pagination */}
            <ReactPaginate
                pageCount={length / 4}
                previousLabel={'←'}
                nextLabel={'→'}
                onPageChange={handlePageClick}
                containerClassName={'pagination-container'}
                previousLinkClassName={'pagination-btn'}
                nextClassName={`${
                    (length % 4 === 0
                        ? length / 4
                        : (length - (length % 4)) / 4) < pageNumber &&
                    'disabled-pagination-btn'
                }`}
                nextLinkClassName={`pagination-btn`}
                disabledClassName={'disabled-pagination-btn'}
                activeClassName={'pagination-btn selected-pagination'}
            />
            {/* </div> */}
            <SuggestPagination />
        </div>
    );
};
