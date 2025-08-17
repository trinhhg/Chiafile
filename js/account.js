(function(app){
  try {
    // Kiểm tra trạng thái tài khoản (Firestore)
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

    // Theo dõi tài khoản còn active không
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

    // Xử lý sự kiện đăng nhập
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
          alert("Vui lòng nhập email và mật khẩu");
          return;
        }

        app.auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            console.log("Đăng nhập thành công:", userCredential.user.email);
            app.checkAccountStatus(userCredential.user.uid).then((ok) => {
              if (ok) {
                app.monitorAccountActiveStatus(userCredential.user.uid);
                app.showMainUI();
                app.showNotification("Đăng nhập thành công!", "success");
              }
            });
          })
          .catch((error) => {
            console.error("Lỗi đăng nhập:", error);
            alert("Đăng nhập thất bại: " + error.message);
          });
      });
    }

    // Xử lý đăng xuất
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", function(e){
        e.preventDefault();
        app.auth.signOut().then(() => {
          console.log("Đã đăng xuất");
          app.showLoginUI();
        });
      });
    }

    // Theo dõi trạng thái đăng nhập
    app.auth.onAuthStateChanged(function(user){
      if (user) {
        console.log("User đang đăng nhập:", user.email);
        app.checkAccountStatus(user.uid).then((ok) => {
          if (ok) {
            app.monitorAccountActiveStatus(user.uid);
            app.showMainUI();
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
