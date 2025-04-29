import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPageData, setPageScrollTop } from "../redux/features/postSlice";

const PAGE_KEYS = ["home", "explore"];
const PATH_TO_PAGE_KEY = {
  "/": "home",
  "/explore": "explore",
};

function getPageKey(pathname) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/explore")) return "explore";
  return null;
}

function usePageCacheManager() {
  const location = useLocation();
  const dispatch = useDispatch();
  const prevPathRef = useRef(location.pathname);
  const scrollPositions = useSelector(state => state.post.pages);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    const prevPageKey = getPageKey(prevPath);
    const currentPageKey = getPageKey(currentPath);

    if (prevPageKey && prevPageKey !== currentPageKey) {
      // Lưu scrollTop trước khi rời đi
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      dispatch(setPageScrollTop({ page: prevPageKey, scrollTop }));

      // Clear data page cũ
      dispatch(clearPageData({ page: prevPageKey }));
    }

    prevPathRef.current = currentPath;
  }, [location.pathname, dispatch]);

  useEffect(() => {
    // Nếu reload thì clear tất cả page
    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
      PAGE_KEYS.forEach((page) => {
        dispatch(clearPageData({ page }));
      });
    }
  }, [dispatch]);
}

export default usePageCacheManager;
