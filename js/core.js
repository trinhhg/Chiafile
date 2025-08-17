window.TienIch = window.TienIch || {};

(function(app){
  try {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyB2VklwyVqGX7BgIsZeYannPijYk9_bB1Q",
      authDomain: "trinhhg-1f8f3.firebaseapp.com",
      projectId: "trinhhg-1f8f3",
      storageBucket: "trinhhg-1f8f3.firebasestorage.app",
      messagingSenderId: "63432174844",
      appId: "1:63432174844:web:57f18e049b4cf5860e7b79",
      measurementId: "G-LNZQTM2JTD"
    };

    firebase.initializeApp(firebaseConfig);

    app.auth = firebase.auth();
    app.db = firebase.firestore();

    app.translations = { /* nguyên object translations ở đây */ };
    app.currentLang = 'vn';
    app.matchCaseEnabled = false;
    app.currentMode = 'default';
    app.currentSplitMode = 2;
    app.LOCAL_STORAGE_KEY = 'local_settings';
    app.INPUT_STORAGE_KEY = 'input_state';
    app.hasShownLoginSuccess = false;
    app.currentVersion = null;
    app.lastActivity = Date.now();
    app.INACTIVITY_LIMIT = 3600000; // 60 phút
    app.CHECK_INTERVAL = 10000; // 10s

  } catch(err) {
    console.error("Lỗi trong core.js:", err);
  }
})(window.TienIch);
