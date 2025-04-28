self.addEventListener('message', (event)=>{
  const {url} = event.data;
  if(!url) return;

  fetch(url)
    .then(()=>{
      self.postMessage({ status: 'done', url });
    })
    .catch(() => {
      self.postMessage({ status: 'error', url });
    });
})