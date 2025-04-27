import React, { useEffect, useRef, useState } from 'react';

function VirtualizedItem({ scrollView, children, estimatedHeight = "100vh" }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (!itemRef.current || !scrollView?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      root: scrollView.current,
      threshold: 0.1,
      rootMargin: "500px"
    });

    observer.observe(itemRef.current);

    return () => {
      if (itemRef.current) observer.unobserve(itemRef.current);
    };
  }, [scrollView]);

  return (
    <div
      ref={itemRef}
      style={{
        minHeight: estimatedHeight,
        maxHeight: estimatedHeight,
        position: 'relative',
      }}
      className='item-post'
    >
      {isVisible ? (
        <div style={{ height: "100%", width: "100%" }}>
          {children}
        </div>
      ) : (
        // Render 1 dummy element để giữ cấu trúc
        <div style={{
          height: "100%",
          width: "100%",
          backgroundColor: "black", // có thể để màu đen, hoặc background blur nhẹ
          opacity: 0.2
        }} />
      )}
    </div>
  );
}

export default VirtualizedItem;
