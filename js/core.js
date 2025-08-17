(function(app){
  try {
    // Tạo namespace
    window.TienIch = window.TienIch || {};
    app = window.TienIch;

    // Firebase config
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
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
