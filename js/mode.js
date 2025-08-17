(function(app){
  try {
    app.loadModes = function(){
      try {
        const modeSelect = document.getElementById('mode-select');
        if (!modeSelect) return;
        let settings = JSON.parse(localStorage.getItem(app.LOCAL_STORAGE_KEY)) || { modes: { default: { pairs: [], matchCase: false } } };
        const modes = Object.keys(settings.modes || { default: {} });
        modeSelect.innerHTML = '';
        modes.forEach(mode => {
          const option = document.createElement('option');
          option.value = mode;
          option.textContent = mode;
          modeSelect.appendChild(option);
        });
        modeSelect.value = app.currentMode;
        app.loadSettings();
        app.updateModeButtons();
      } catch(err) {
        console.error("Lỗi trong loadModes:", err);
      }
    };

    app.loadSettings = function(){
      try {
        let settings = JSON.parse(localStorage.getItem(app.LOCAL_STORAGE_KEY)) || { modes: { default: { pairs: [], matchCase: false } } };
        const modeSettings = settings.modes?.[app.currentMode] || { pairs: [], matchCase: false };
        const list = document.getElementById('punctuation-list');
        if (list) {
          list.innerHTML = '';
          if (!modeSettings.pairs || modeSettings.pairs.length === 0) {
            app.addPair('', '');
          } else {
            modeSettings.pairs.slice().reverse().forEach(pair => {
              app.addPair(pair.find || '', pair.replace || '');
            });
          }
        }
        app.matchCaseEnabled = modeSettings.matchCase || false;
        app.updateButtonStates();
      } catch(err) {
        console.error("Lỗi trong loadSettings:", err);
      }
    };

    app.addPair = function(find = '', replace = ''){
      try {
        const list = document.getElementById('punctuation-list');
        if (!list) return;
        const item = document.createElement('div');
        item.className = 'punctuation-item';
        const findInput = document.createElement('input');
        findInput.type = 'text';
        findInput.className = 'find';
        findInput.placeholder = app.translations[app.currentLang].findPlaceholder;
        findInput.value = find;
        const replaceInput = document.createElement('input');
        replaceInput.type = 'text';
        replaceInput.className = 'replace';
        replaceInput.placeholder = app.translations[app.currentLang].replacePlaceholder;
        replaceInput.value = replace;
        const removeButton = document.createElement('button');
        removeButton.className = 'remove';
        removeButton.textContent = app.translations[app.currentLang].removeButton;
        item.append(findInput, replaceInput, removeButton);
        if (list.firstChild) list.insertBefore(item, list.firstChild);
        else list.appendChild(item);
        removeButton.addEventListener('click', () => { item.remove(); app.saveInputState(); });
        findInput.addEventListener('input', app.saveInputState);
        replaceInput.addEventListener('input', app.saveInputState);
      } catch(err) {
        console.error("Lỗi trong addPair:", err);
      }
    };

    app.saveSettings = function(){
      try {
        const pairs = [];
        const items = document.querySelectorAll('.punctuation-item');
        if (items.length === 0) {
          app.showNotification(app.translations[app.currentLang].noPairsToSave, 'error');
          return;
        }
        items.forEach(item => {
          const find = item.querySelector('.find')?.value || '';
          const replace = item.querySelector('.replace')?.value || '';
          if (find) pairs.push({ find, replace });
        });
        let settings = JSON.parse(localStorage.getItem(app.LOCAL_STORAGE_KEY)) || { modes: { default: { pairs: [], matchCase: false } } };
        settings.modes[app.currentMode] = { pairs, matchCase: app.matchCaseEnabled };
        localStorage.setItem(app.LOCAL_STORAGE_KEY, JSON.stringify(settings));
        app.loadSettings();
        app.showNotification(app.translations[app.currentLang].settingsSaved.replace('{mode}', app.currentMode), 'success');
      } catch(err) {
        console.error("Lỗi trong saveSettings:", err);
      }
    };

    app.updateModeButtons = function(){
      try {
        const renameMode = document.getElementById('rename-mode');
        const deleteMode = document.getElementById('delete-mode');
        if (app.currentMode !== 'default' && renameMode && deleteMode) {
          renameMode.style.display = 'inline-block';
          deleteMode.style.display = 'inline-block';
        } else if (renameMode && deleteMode) {
          renameMode.style.display = 'none';
          deleteMode.style.display = 'none';
        }
      } catch(err) {
        console.error("Lỗi trong updateModeButtons:", err);
      }
    };

    app.updateButtonStates = function(){
      try {
        const matchCaseButton = document.getElementById('match-case');
        if (matchCaseButton) {
          matchCaseButton.textContent = app.matchCaseEnabled ? app.translations[app.currentLang].matchCaseOn : app.translations[app.currentLang].matchCaseOff;
          matchCaseButton.style.background = app.matchCaseEnabled ? '#28a745' : '#6c757d';
        }
      } catch(err) {
        console.error("Lỗi trong updateButtonStates:", err);
      }
    };

  } catch(err) {
    console.error("Lỗi trong mode.js:", err);
  }
})(window.TienIch);
