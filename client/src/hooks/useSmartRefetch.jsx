import { startPrefetchQueue, trackPrefetchRequest } from "../worker/PrefetchPriorityManager";

function  useSmartPrefetch(url){
  function handleMouseEnter(){
    trackPrefetchRequest(url);
    startPrefetchQueue();
  }

  return {
    onMouseEnter: handleMouseEnter
  }
}

export default useSmartPrefetch;