(function(app){
  try {
    app.checkAccountStatus = function(uid){
      try {
        const userDocRef = app.db.collection("users").doc(uid);
        return userDocRef.get().then((docSnap) => {
          if (docSnap.exists) {
            const userData = docSnap.data();
            const expiry = new Date(userData.expiry);
            const now = new Date();
            if (userData.disabled) {
              app.showNotification(app.translations[app.currentLang].accountDisabled, "error");
              app.auth.signOut();
              app.showLoginUI();
              return false;
            } else if (now > expiry) {
              app.showNotification(app.translations[app.currentLang].accountExpired, "error");
              app.auth.signOut();
              app.showLoginUI();
              return false;
            } else {
              return true;
            }
          } else {
            app.showNotification(app.translations[app.currentLang].noAccountData, "error");
            app.auth.signOut();
            app.showLoginUI();
            return false;
          }
        }).catch((error) => {
          console.error("Lỗi khi kiểm tra tài khoản:", error);
          app.showNotification(app.translations[app.currentLang].accountCheckError, "error");
          app.auth.signOut();
          return false;
        });
      } catch(err) {
        console.error("Lỗi trong checkAccountStatus:", err);
      }
    };

    app.monitorAccountActiveStatus = function(uid){
      try {
        const userDocRef = app.db.collection("users").doc(uid);
        userDocRef.onSnapshot((doc) => {
          if (!doc.exists || doc.data().active === false) {
            app.auth.signOut().then(() => {
              alert(app.translations[app.currentLang].accountDeactivated);
              app.showLoginUI();
              location.replace(location.pathname + "?v=" + Date.now());
            }).catch((error) => {
              console.error("Lỗi khi đăng xuất:", error);
              app.showNotification("Lỗi khi đăng xuất.", "error");
            });
          }
        }, (error) => {
          console.error("Lỗi khi theo dõi Firestore:", error);
          app.showNotification(app.translations[app.currentLang].accountCheckError, "error");
        });
      } catch(err) {
        console.error("Lỗi trong monitorAccountActiveStatus:", err);
      }
    };

    // Login / Logout
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      app.auth.signInWithEmailAndPassword(email, password).catch((error) => {
        console.error("Lỗi đăng nhập:", error);
        app.showNotification("Đăng nhập thất bại: " + error.message, "error");
      });
    });

    document.getElementById("logout-link").addEventListener("click", (e) => {
      e.preventDefault();
      app.auth.signOut().then(() => {
        app.showLoginUI();
        app.showNotification(app.translations[app.currentLang].logoutSuccess, "success");
      }).catch((error) => {
        console.error("Lỗi khi đăng xuất:", error);
      });
    });

    // Auth state change
    app.auth.onAuthStateChanged((user) => {
      if (user) {
        app.checkAccountStatus(user.uid).then((valid) => {
          if (valid) {
            app.showMainUI();
            app.showNotification(app.translations[app.currentLang].loginSuccess, "success");
            app.monitorAccountActiveStatus(user.uid);
          }
        });
      } else {
        app.showLoginUI();
      }
    });

  } catch(err) {
    console.error("Lỗi trong account.js:", err);
  }
})(window.TienIch);
