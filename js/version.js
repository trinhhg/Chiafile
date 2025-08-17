(function(app){
  try {
    app.showUpdateDialog = function(){
      try {
        const overlay = document.createElement('div');
        overlay.id = 'update-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:10000;';
        const dialog = document.createElement('div');
        dialog.id = 'update-dialog';
        dialog.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:#fff;padding:20px;border-radius:8px;z-index:10001;text-align:center;';
        const title = document.createElement('h3');
        title.textContent = 'Thông báo từ TRINOVAVERS';
        const message = document.createElement('p');
        message.textContent = app.translations[app.currentLang].updateAvailable;
        const reloadButton = document.createElement('button');
        reloadButton.textContent = app.translations[app.currentLang].reloadButton;
        reloadButton.addEventListener('click', () => {
          if (confirm("🔄 Trang đã có phiên bản mới.\nNhấn OK hoặc bấm F5 để tải lại.")) {
            app.saveInputState();
            location.replace(location.pathname + '?v=' + Date.now());
          }
        });
        dialog.append(title, message, reloadButton);
        document.body.append(overlay, dialog);
        overlay.addEventListener('click', () => { overlay.remove(); dialog.remove(); });
      } catch(err) {
        console.error("Lỗi trong showUpdateDialog:", err);
      }
    };

    app.checkVersionLoop = async function(){
      try {
        const baseURL = 'https://trinhhg.github.io/tienichtrinhhg';
        const versionResponse = await fetch(`${baseURL}/version.json?${Date.now()}`, { cache: 'no-store' });
        if (!versionResponse.ok) throw new Error('Không thể tải version.json');
        const versionData = await versionResponse.json();
        if (!app.currentVersion) {
          app.currentVersion = versionData.version;
        } else if (versionData.version !== app.currentVersion) {
          setTimeout(() => app.showUpdateDialog(), 360000);
          return;
        }
        setTimeout(app.checkVersionLoop, 5000);
      } catch(err) {
        console.error("Lỗi khi kiểm tra phiên bản:", err);
        setTimeout(app.checkVersionLoop, 5000);
      }
    };

  } catch(err) {
    console.error("Lỗi trong version.js:", err);
  }
})(window.TienIch);
