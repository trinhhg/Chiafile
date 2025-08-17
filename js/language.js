(function(app){
  try {
    app.updateLanguage = function(lang){
      try {
        app.currentLang = lang;
        document.documentElement.lang = lang;
        // Đoạn này giữ nguyên toàn bộ logic cập nhật text như trong index.js gốc
        // Bao gồm thay đổi placeholder, button text, v.v.
        // Vì dài nên bạn copy nguyên hàm updateLanguage trong file gốc vào đây
        // và thay tất cả `translations` thành `app.translations`, `currentLang` thành `app.currentLang`
        // và `matchCaseEnabled` thành `app.matchCaseEnabled`
      } catch(err) {
        console.error("Lỗi trong updateLanguage:", err);
      }
    };
  } catch(err) {
    console.error("Lỗi trong language.js:", err);
  }
})(window.TienIch);
