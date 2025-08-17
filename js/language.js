(function(app){
  try {
    app.updateLanguage = function(lang){
      try {
        app.currentLang = lang;
        const t = app.translations[lang];

        // Update text UI
        document.getElementById("app-title").innerText = "Tiện Ích Của Trịnh Hg";
        document.getElementById("settings-title").innerText = "Cài đặt tìm kiếm và thay thế";
        document.getElementById("replace-title").innerText = "Thay thế Dấu câu";
        document.getElementById("split-title").innerText = "Chia Chương";

        // Buttons
        document.getElementById("replace-button").innerText = "Thay thế";
        document.getElementById("copy-button").innerText = "Sao chép";
        document.getElementById("copy-button1").innerText = "Sao chép 1";
        document.getElementById("copy-button2").innerText = "Sao chép 2";
        if (document.getElementById("copy-button3")) {
          document.getElementById("copy-button3").innerText = "Sao chép 3";
        }
        if (document.getElementById("copy-button4")) {
          document.getElementById("copy-button4").innerText = "Sao chép 4";
        }

      } catch(err) {
        console.error("Lỗi trong updateLanguage:", err);
      }
    };

  } catch(err) {
    console.error("Lỗi trong language.js:", err);
  }
})(window.TienIch);
