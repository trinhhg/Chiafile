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
              app.showNotification(app.translations[app.currentLang].accountDisabled, 'error');
              app.auth.signOut();
              app.showLoginUI();
              return false;
            } else if (now > expiry) {
              app.showNotification(app.translations[app.currentLang].accountExpired, 'error');
              app.auth.signOut();
              app.showLoginUI();
              return false;
            } else {
              return true;
            }
          } else {
            app.showNotification(app.translations[app.currentLang].noAccountData, 'error');
            app.auth.signOut();
            app.showLoginUI();
            return false;
          }
        }).catch((error) => {
          console.error("Lỗi khi kiểm tra tài khoản:", error);
          app.showNotification(app.translations[app.currentLang].accountCheckError, 'error');
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
              location.replace(location.pathname + '?v=' + Date.now());
            }).catch((error) => {
              console.error('Lỗi khi đăng xuất:', error);
              app.showNotification('Lỗi khi đăng xuất.', 'error');
            });
          }
        }, (error) => {
          console.error('Lỗi khi theo dõi tài liệu Firestore:', error);
          app.showNotification(app.translations[app.currentLang].accountCheckError, 'error');
        });
      } catch(err) {
        console.error("Lỗi trong monitorAccountActiveStatus:", err);
      }
    };

  } catch(err) {
    console.error("Lỗi trong account.js:", err);
  }
})(window.TienIch);
