(function(app){
  try {
    app.attachTabEvents = function(){
      try {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.getElementById(tabName)?.classList.add('active');
            button.classList.add('active');
          });
        });
      } catch(err) {
        console.error("Lỗi trong attachTabEvents:", err);
      }
    };

    app.attachButtonEvents = function(){
      try {
        // Giữ nguyên logic attachButtonEvents từ file gốc
        // Thay tất cả các hàm gọi trực tiếp thành app.[hàm], ví dụ saveSettings -> app.saveSettings
        // replaceText -> app.replaceText, splitChapters -> app.splitChapters, v.v.
        // Nhớ thêm try/catch cho từng listener nếu cần
      } catch(err) {
        console.error("Lỗi trong attachButtonEvents:", err);
      }
    };

  } catch(err) {
    console.error("Lỗi trong events.js:", err);
  }
})(window.TienIch);
