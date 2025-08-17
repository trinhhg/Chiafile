(function(app){
  try {
    // Tạo namespace
    window.TienIch = window.TienIch || {};
    app = window.TienIch;

    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyB2VklwyVqGX7BgIsZeYannPijYk9_bB1Q",
      authDomain: "trinhhg-1f8f3.firebaseapp.com",
      projectId: "trinhhg-1f8f3",
      storageBucket: "trinhhg-1f8f3.firebasestorage.app",
      messagingSenderId: "63432174844",
      appId: "1:63432174844:web:57f18e049b4cf5860e7b79"
    };

    // Khởi tạo Firebase
    firebase.initializeApp(firebaseConfig);
    app.auth = firebase.auth();
    app.db = firebase.firestore();

    // Biến toàn cục
    app.currentLang = "vi";
    app.LOCAL_STORAGE_KEY = "punctuation-settings";
    app.VERSION = "1.0.0";
    app.INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 phút

    // Notification
    app.showNotification = function(message, type = "info") {
      try {
        const container = document.getElementById("notification-container");
        if (!container) return;
        const div = document.createElement("div");
        div.className = `notification ${type}`;
        div.innerText = message;
        container.appendChild(div);
        setTimeout(() => div.remove(), 3000);
      } catch(err) {
        console.error("Lỗi trong showNotification:", err);
      }
    };

    // Translations
    app.translations = {
      vi: {
        loginSuccess: "Đăng nhập thành công!",
        logoutSuccess: "Đã đăng xuất.",
        accountDisabled: "Tài khoản đã bị khóa.",
        accountExpired: "Tài khoản đã hết hạn.",
        noAccountData: "Không tìm thấy dữ liệu tài khoản.",
        accountCheckError: "Lỗi khi kiểm tra trạng thái tài khoản.",
        accountDeactivated: "Tài khoản đã bị vô hiệu hóa."
      },
      en: {
        loginSuccess: "Login successful!",
        logoutSuccess: "Logged out.",
        accountDisabled: "Account has been disabled.",
        accountExpired: "Account has expired.",
        noAccountData: "No account data found.",
        accountCheckError: "Error checking account status.",
        accountDeactivated: "Account deactivated."
      }
    };

  } catch(err) {
    console.error("Lỗi trong core.js:", err);
  }
})(window.TienIch);
