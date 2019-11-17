import React, { useEffect, useState } from 'react';

import { throttle } from './utils';

type OnLoadMore = (fn: Function) => void;

interface PropTypes {
  children: React.ReactElement;
  hasMore: boolean;
  onLoadMore: OnLoadMore;
  triggerCallBackOffsetBottom?: number;
}

const InfiniteScroll = ({
  children,
  hasMore,
  onLoadMore,
  triggerCallBackOffsetBottom = 100
}: PropTypes) => {
  const [loading, setLoading] = useState(false);
  const handleScroll = throttle((e: any) => {
    if (loading || !hasMore) {
      return;
    }
    const scrollTop =
      e.target.scrollTop || document.body.scrollTop || document.documentElement.scrollTop;
    const offsetHeight =
      e.target.scrollHeight || document.body.offsetHeight || document.documentElement.offsetHeight;

    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight + triggerCallBackOffsetBottom > offsetHeight) {
      setLoading(true);
      onLoadMore(() => setLoading(false));
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      {children}
      {hasMore && <div>Loading...</div>}
    </React.Fragment>
  );
};

export default React.memo(InfiniteScroll);
