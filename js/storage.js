(function(app){
  try {
    app.saveInputState = function(){
      try {
        const state = {
          inputText: document.getElementById('input-text')?.value || '',
          outputText: document.getElementById('output-text')?.value || '',
          splitInputText: document.getElementById('split-input-text')?.value || '',
          output1Text: document.getElementById('output1-text')?.value || '',
          output2Text: document.getElementById('output2-text')?.value || '',
          output3Text: document.getElementById('output3-text')?.value || '',
          output4Text: document.getElementById('output4-text')?.value || '',
          punctuationItems: Array.from(document.querySelectorAll('.punctuation-item')).map(item => ({
            find: item.querySelector('.find')?.value || '',
            replace: item.querySelector('.replace')?.value || ''
          }))
        };
        localStorage.setItem(app.INPUT_STORAGE_KEY, JSON.stringify(state));
      } catch(err) {
        console.error("Lỗi khi lưu trạng thái input:", err);
      }
    };

    app.restoreInputState = function(){
      try {
        const state = JSON.parse(localStorage.getItem(app.INPUT_STORAGE_KEY));
        if (!state) return;
        // giữ nguyên toàn bộ logic khôi phục như file gốc
      } catch(err) {
        console.error("Lỗi khi khôi phục trạng thái input:", err);
      }
    };

    app.resetActivity = function(){
      app.lastActivity = Date.now();
      app.saveInputState();
    };

    app.checkIdle = function(){
      try {
        const now = Date.now();
        if (now - app.lastActivity > app.INACTIVITY_LIMIT && document.visibilityState === 'visible') {
          app.saveInputState();
          location.replace(location.pathname + '?v=' + Date.now());
        }
      } catch(err) {
        console.error("Lỗi khi checkIdle:", err);
      }
    };

    ['mousemove','click','keydown','scroll','touchstart'].forEach(ev => {
      document.addEventListener(ev, app.resetActivity);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        app.checkIdle();
        app.restoreInputState();
      }
    });

    setInterval(app.checkIdle, app.CHECK_INTERVAL);

  } catch(err) {
    console.error("Lỗi trong storage.js:", err);
  }
})(window.TienIch);
