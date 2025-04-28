let worker = null;
let queue = [];
let inProgress = false;

function initWorker(){
  if(!worker){
    worker = new Worker(new URL("./prefetchWorker.js", import.meta.url), { type: "module" });

  }
}

export function trackPrefetchRequest(url){
  const existing = queue.find(item => item.url === url);
  if(existing){
    existing.priority += 1;
  }else{
    queue.push({ url, priority: 1 });
  }
  queue.sort((a, b) => b.priority - a.priority);
}

export function startPrefetchQueue(){
  if(inProgress || queue.length === 0) return;
  inProgress = true;
  initWorker();
  const processNext = ()=>{
    if(queue.length === 0){
      inProgress = false;
      return;
    }
    const {url} = queue.shift();
    worker.postMessage({ url });

    setTimeout(()=>{
      processNext();
    },300)


  }
  processNext();
}