(function(app){
  try {
    app.showMainUI = function(){
      try {
        document.querySelector(".container").style.display = "block";
        document.querySelector(".login-container").style.display = "none";
        if (!app.hasShownLoginSuccess) {
          app.showNotification(app.translations[app.currentLang].loginSuccess, 'success');
          app.hasShownLoginSuccess = true;
        }
        app.restoreInputState();
      } catch(err) {
        console.error("Lỗi trong showMainUI:", err);
      }
    };

    app.showLoginUI = function(){
      try {
        document.querySelector(".container").style.display = "none";
        document.querySelector(".login-container").style.display = "flex";
      } catch(err) {
        console.error("Lỗi trong showLoginUI:", err);
      }
    };

    app.showLoadingUI = function(){
      try {
        document.querySelector(".container").style.display = "none";
        document.querySelector(".login-container").style.display = "none";
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading';
        loadingDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 16px;';
        loadingDiv.textContent = app.translations[app.currentLang].loading;
        document.body.appendChild(loadingDiv);
      } catch(err) {
        console.error("Lỗi trong showLoadingUI:", err);
      }
    };

    app.hideLoadingUI = function(){
      try {
        document.getElementById('loading')?.remove();
      } catch(err) {
        console.error("Lỗi trong hideLoadingUI:", err);
      }
    };

    app.showNotification = function(message, type = 'success'){
      try {
        const container = document.getElementById('notification-container');
        if (!container) return;
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      } catch(err) {
        console.error("Lỗi trong showNotification:", err);
      }
    };

  } catch(err) {
    console.error("Lỗi trong ui.js:", err);
  }
})(window.TienIch);
