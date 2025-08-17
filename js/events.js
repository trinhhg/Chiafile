(function(app){
  try {
    app.attachTabEvents = function(){
      try {
        const tabButtons = document.querySelectorAll(".tab-button");
        tabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const tabName = button.getAttribute("data-tab");
            document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
            document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
            document.getElementById(tabName)?.classList.add("active");
            button.classList.add("active");
          });
        });
      } catch(err) {
        console.error("Lỗi trong attachTabEvents:", err);
      }
    };

    app.attachButtonEvents = function(){
      try {
        // Replace
        document.getElementById("replace-button").addEventListener("click", () => {
          try {
            app.replaceText();
          } catch(err) {
            console.error("Lỗi nút replace:", err);
          }
        });

        // Copy
        document.getElementById("copy-button").addEventListener("click", () => {
          try {
            const out = document.getElementById("output-text");
            out.select();
            document.execCommand("copy");
            app.showNotification("Đã sao chép!", "success");
          } catch(err) {
            console.error("Lỗi copy:", err);
          }
        });

        // Split
        document.getElementById("split-button").addEventListener("click", () => {
          try {
            app.splitChapters();
          } catch(err) {
            console.error("Lỗi nút split:", err);
          }
        });

        // Save settings
        document.getElementById("save-settings").addEventListener("click", () => {
          try {
            app.saveSettings();
          } catch(err) {
            console.error("Lỗi save settings:", err);
          }
        });

        // Export / Import
        document.getElementById("export-settings").addEventListener("click", () => {
          try {
            app.exportSettings();
          } catch(err) {
            console.error("Lỗi export settings:", err);
          }
        });

        document.getElementById("import-settings").addEventListener("click", () => {
          try {
            app.importSettings();
          } catch(err) {
            console.error("Lỗi import settings:", err);
          }
        });

      } catch(err) {
        console.error("Lỗi trong attachButtonEvents:", err);
      }
    };

    // Chạy khi DOM ready
    document.addEventListener("DOMContentLoaded", () => {
      try {
        app.attachTabEvents();
        app.attachButtonEvents();
      } catch(err) {
        console.error("Lỗi khi init events:", err);
      }
    });

  } catch(err) {
    console.error("Lỗi trong events.js:", err);
  }
})(window.TienIch);
