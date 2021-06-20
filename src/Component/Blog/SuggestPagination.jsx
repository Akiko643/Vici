import React, { useEffect, useState } from "react";
import "./SuggestPagination.scss";
import { BlogItemComp } from "./BlogItemComp";
import leftchevron from "./zuun-chevron.svg";
import rightchevron from "./baruun-chevron.svg";
import { useFirebase } from "../../Hooks/firebase";
import { useTranslation } from 'react-i18next';
export const SuggestPagination = () => {
  const [suggestedPageNumber, setSuggestedPageNumber] = useState(1);
  const { firebase } = useFirebase();
  const [data, setData] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [numberSug, setNumberSug] = useState(0);
  const { t } = useTranslation();
  const firstLoad = async () => {
    setLoadingMore(true);
    const first = await firebase
      .firestore()
      .collection("/content/contents/Blog")
      .orderBy(`createdAt`, "desc")
      .limit(4);
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
        .collection("/content/contents/Blog")
        .orderBy("createdAt", "desc")
        .startAfter(lastDoc)
        .limit(4);
      const snapshot = await next.get();
      const docs = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      if (docs.length == 0) {
        setIsEnd(true);
        if (numberSug == 0) setNumberSug(suggestedPageNumber);
      }
      const last = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(last);

      setData([...data, ...docs]);
    }
    setLoadingMore(false); 
  };
  const what = async (pm) => {
    if (pm == 1) {
      console.log(numberSug, suggestedPageNumber);
      setSuggestedPageNumber(suggestedPageNumber + 1);
      if (numberSug != 0 && suggestedPageNumber == numberSug) {
        setIsEnd(true);
        console.log("duussasn");
      } else {
        console.log("yavna");
        await loadMore();
      }
    } else {
      console.log("butsah");
      setIsEnd(false);
      setSuggestedPageNumber(
        suggestedPageNumber === 1 ? 1 : suggestedPageNumber - 1
      );
    }
  };
  useEffect(async () => {
    await firstLoad();
  }, []);
  return (
    <div className="flex-col mt-20 mb-20">
      <div className="flex justify-between mb-25">
        <div className="foryou">{t("forYou")}</div>
        <div className="sug-p-number justify-between">
          <img
            className={`pointer ${suggestedPageNumber === 1 && "disabledbtn"}`}
            src={leftchevron}
            onClick={() =>
              suggestedPageNumber !== 1 && (what(0), setIsEnd(false))
            }
          />
          {`${t('page')} ` + suggestedPageNumber}
          <img
            className={`pointer ${isEnd && "disabledbtn"}`}
            src={rightchevron}
            onClick={() => !isEnd && what(1)}
          />
        </div>
      </div>
      {isEnd ? (
        <div>There is no more Suggestion</div>
      ) : (
        <div className="flex-row justify-between">
          {
            loadingMore ? (
              <>
              <div className={`flex-col small-col-item loading-sci`} key={0}>
                <div
                  className="image bradius-10 h-180 b-border"
                />
                <div className="blog-tag h-22 c-seablue b-border"></div>
                <div className="blog-header h-28 b-border"></div>
                <div className="flex-row my-15">
                  <div className="publishername flex-row">
                    <div className="namecircle" />
                    <div className='b-border w-40'>         </div>
                  </div>
                  <div className="time w-70"></div>
                </div>
              </div>
              <div className={`flex-col small-col-item loading-sci`} key={1}>
                <div
                  className="image bradius-10 h-180 b-border"
                />
                <div className="blog-tag h-22 c-seablue b-border"></div>
                <div className="blog-header h-28 b-border"></div>
                <div className="flex-row my-15">
                  <div className="publishername flex-row">
                    <div className="namecircle" />
                    <div className='b-border w-40'>         </div>
                  </div>
                  <div className="time w-70"></div>
                </div>
              </div>
              <div className={`flex-col small-col-item loading-sci`} key={2}>
                <div
                  className="image bradius-10 h-180 b-border"
                />
                <div className="blog-tag h-22 c-seablue b-border"></div>
                <div className="blog-header h-28 b-border"></div>
                <div className="flex-row my-15">
                  <div className="publishername flex-row">
                    <div className="namecircle" />
                    <div className='b-border w-40'>         </div>
                  </div>
                  <div className="time w-70"></div>
                </div>
              </div>
              <div className={`flex-col small-col-item loading-sci`} key={3}>
                <div
                  className="image bradius-10 h-180 b-border"
                />
                <div className="blog-tag h-22 c-seablue b-border"></div>
                <div className="blog-header h-28 b-border"></div>
                <div className="flex-row my-15">
                  <div className="publishername flex-row">
                    <div className="namecircle" />
                    <div className='b-border w-40'>         </div>
                  </div>
                  <div className="time w-70"></div>
                </div>
              </div>
              </>
            ) : (
              data
                .slice(4 * (suggestedPageNumber - 1), 4 * suggestedPageNumber)
                  .map((dtw, index) => {
                    return (
                      <BlogItemComp data={dtw} index={index} size="smallcol" classStr={"w23"} />
                    );
              })
            )
          }
        </div>
      )}
    </div>
  );
};
