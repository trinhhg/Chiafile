(function(app){
  try {
    // Hàm xử lý chuyển tab
    app.switchTab = function(tabName, button){
      try {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

        const targetTab = document.getElementById(tabName);
        if (targetTab) targetTab.classList.add('active');
        if (button) button.classList.add('active');
      } catch(err) {
        console.error("Lỗi trong switchTab:", err);
      }
    };

    // Lắng nghe toàn bộ sự kiện click
    document.addEventListener("click", function(e){
      try {
        // Chuyển tab
        if (e.target.matches(".tab-button")) {
          const tabName = e.target.getAttribute("data-tab");
          app.switchTab(tabName, e.target);
        }

        // Replace button
        if (e.target.matches("#replace-button")) {
          try { app.replaceText(); } 
          catch(err) { console.error("Lỗi khi chạy replaceText:", err); }
        }

        // Copy output (nhiều nút)
        if (e.target.matches("#copy-button")) {
          try { app.copyOutput("output-text"); } 
          catch(err) { console.error("Lỗi khi chạy copyOutput:", err); }
        }
        if (e.target.matches("#copy-button1")) {
          try { app.copyOutput("output1-text"); } 
          catch(err) { console.error("Lỗi khi copy output1:", err); }
        }
        if (e.target.matches("#copy-button2")) {
          try { app.copyOutput("output2-text"); } 
          catch(err) { console.error("Lỗi khi copy output2:", err); }
        }
        if (e.target.matches("#copy-button3")) {
          try { app.copyOutput("output3-text"); } 
          catch(err) { console.error("Lỗi khi copy output3:", err); }
        }
        if (e.target.matches("#copy-button4")) {
          try { app.copyOutput("output4-text"); } 
          catch(err) { console.error("Lỗi khi copy output4:", err); }
        }

        // Split button
        if (e.target.matches("#split-button")) {
          try { app.splitChapters(); } 
          catch(err) { console.error("Lỗi khi chạy splitChapters:", err); }
        }

        // Mode buttons
        if (e.target.matches("#add-mode")) {
          try { app.addMode(); } 
          catch(err) { console.error("Lỗi khi thêm mode:", err); }
        }
        if (e.target.matches("#copy-mode")) {
          try { app.copyMode(); } 
          catch(err) { console.error("Lỗi khi copy mode:", err); }
        }
        if (e.target.matches("#save-settings")) {
          try { app.saveSettings(); } 
          catch(err) { console.error("Lỗi khi save settings:", err); }
        }
        if (e.target.matches("#export-settings")) {
          try { app.exportSettings(); } 
          catch(err) { console.error("Lỗi khi export settings:", err); }
        }
        if (e.target.matches("#import-settings")) {
          try { app.importSettings(); } 
          catch(err) { console.error("Lỗi khi import settings:", err); }
        }
        if (e.target.matches("#match-case")) {
          try { app.toggleMatchCase(); } 
          catch(err) { console.error("Lỗi khi toggle match case:", err); }
        }
        if (e.target.matches("#rename-mode")) {
          try { app.renameMode(); } 
          catch(err) { console.error("Lỗi khi rename mode:", err); }
        }
        if (e.target.matches("#delete-mode")) {
          try { app.deleteMode(); } 
          catch(err) { console.error("Lỗi khi delete mode:", err); }
        }
        if (e.target.matches("#add-pair")) {
          try { app.addPair(); } 
          catch(err) { console.error("Lỗi khi add pair:", err); }
        }
        if (e.target.matches("#remove-button")) {
          try { e.target.closest(".punctuation-item").remove(); } 
          catch(err) { console.error("Lỗi khi remove pair:", err); }
        }

        // Logout
        if (e.target.matches("#logout-link")) {
          e.preventDefault();
          try { app.auth.signOut(); app.showLoginUI(); } 
          catch(err) { console.error("Lỗi khi logout:", err); }
        }

      } catch(err) {
        console.error("Lỗi trong delegation click:", err);
      }
    });

  } catch(err) {
    console.error("Lỗi trong events.js:", err);
  }
})(window.TienIch);
