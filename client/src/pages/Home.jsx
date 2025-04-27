import React, { useRef, useCallback, useEffect ,useState, useLayoutEffect} from "react";
import PostItem from "../components/post/PostItem";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";
import useGetPostByCursor from "../hooks/useGetPostByCursor";
import {   clearPageData, setPageData, setPageScrollTop } from "../redux/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
function Home() {
  const pageKey = "home"
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetPostByCursor();
  const dispatch = useDispatch();
  const { data: postsData, scrollTop } = useSelector((state) => state.post.pages[pageKey]);

  const scrollRef = useRef(null);
  const observerRef = useRef(null);

  // ✅ Dùng callback ref để trigger IntersectionObserver khi có phần tử mới cuối cùng
  const setLastItemRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1.0 }
      );

      if (node) observerRef.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage]
  );
  useEffect(() => {
    console.log(performance)
    console.log(performance.getEntriesByType('navigation'))
    console.log(performance.getEntriesByType('navigation')[0])
    if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
      dispatch(clearPageData({ page: pageKey }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data && postsData.length === 0) {
      const flatData = data.pages.flatMap(page => page.data);
      dispatch(setPageData({ page: pageKey, data: flatData }));
    }
  }, [data, postsData.length, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollTop,
        behavior: "instant",
      });
    }
  }, []);

  const handleScrollSave = () => {
    if (scrollRef.current) {
      dispatch(setPageScrollTop({
        page: pageKey,
        scrollTop: scrollRef.current.scrollTop,
      }));
    }
  };
  useEffect(() => {
  if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
    dispatch(clearPageData({ page: pageKey }));
  }
}, []);


  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScrollSave}
        className="fixed top-0 pl-15 left-1/2 transform -translate-x-1/2 overflow-auto scroll-video h-screen hidden-scroll-bar flex flex-col w-full items-center z-0"
      >
        {data?.pages.map((page, i) =>
          page.data.map((item, j) => (
            <div
              key={item._id}
              ref={
                i === data.pages.length - 1 &&
                j === page.data.length - 1
                  ? setLastItemRef // 👈 Gắn ref ở phần tử cuối cùng
                  : null
              }
            >
              <PostItem item={item} />
            </div>
          ))
        )}
      </div>

      <div className="fixed top-1/2 transform -translate-y-1/2 right-20 flex gap-5 flex-col">
        <FaCircleChevronUp
          className="text-neutral-500/50 cursor-pointer"
          size={40}
          onClick={() => {
            scrollRef.current?.scrollBy({
              top: -window.innerHeight,
              behavior: "smooth",
            });
          }}
        />
        <FaCircleChevronDown
          className="text-neutral-500/50 cursor-pointer"
          size={40}
          onClick={() => {
            scrollRef.current?.scrollBy({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        />
      </div>
    </div>
  );
}

export default Home;
