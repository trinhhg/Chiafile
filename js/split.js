(function(app){
  try {
    app.countWords = function(text){
      return text.trim() ? text.split(/\s+/).filter(word => word.length > 0).length : 0;
    };

    app.updateWordCount = function(textareaId, counterId){
      try {
        const textarea = document.getElementById(textareaId);
        const counter = document.getElementById(counterId);
        if (textarea && counter) {
          const wordCount = app.countWords(textarea.value);
          counter.textContent = app.translations[app.currentLang].wordCount.replace('{count}', wordCount);
        }
      } catch(err) {
        console.error("Lỗi trong updateWordCount:", err);
      }
    };

    app.updateSplitModeUI = function(mode){
      try {
        app.currentSplitMode = mode;
        const splitContainer = document.querySelector('.split-container');
        const output3Section = document.getElementById('output3-section');
        const output4Section = document.getElementById('output4-section');
        const splitModeButtons = document.querySelectorAll('.split-mode-button');
        splitContainer.classList.remove('split-2', 'split-3', 'split-4');
        splitContainer.classList.add(`split-${mode}`);
        splitModeButtons.forEach(btn => btn.classList.toggle('active', parseInt(btn.getAttribute('data-split-mode')) === mode));
        output3Section.style.display = mode >= 3 ? 'block' : 'none';
        output4Section.style.display = mode === 4 ? 'block' : 'none';
        ['split-input-text','output1-text','output2-text','output3-text','output4-text'].forEach(id => {
          const textarea = document.getElementById(id);
          if (textarea) {
            textarea.value = '';
            const counterId = id === 'split-input-text' ? 'split-input-word-count' : `${id}-word-count`;
            app.updateWordCount(id, counterId);
          }
        });
        app.saveInputState();
      } catch(err) {
        console.error("Lỗi trong updateSplitModeUI:", err);
      }
    };

    app.splitChapters = function(){
      try {
        const inputTextArea = document.getElementById('split-input-text');
        const outputTextAreas = [
          document.getElementById('output1-text'),
          document.getElementById('output2-text'),
          document.getElementById('output3-text'),
          document.getElementById('output4-text')
        ].slice(0, app.currentSplitMode);

        if (!inputTextArea || !inputTextArea.value) {
          app.showNotification(app.translations[app.currentLang].noTextToSplit, 'error');
          return;
        }

        let text = inputTextArea.value;
        let chapterNum = 1;
        let chapterTitle = '';
        const chapterRegex = /^[Cc]hương\s+(\d+)(?::\s*(.*))?$/m;
        const lines = text.split('\n');
        let contentStartIndex = 0;
        const firstLine = lines[0].trim();
        const match = firstLine.match(chapterRegex);
        if (match) {
          chapterNum = parseInt(match[1]);
          chapterTitle = match[2] ? `: ${match[2]}` : '';
          contentStartIndex = 1;
        }
        const content = lines.slice(contentStartIndex).join('\n');
        const paragraphs = content.split('\n').filter(p => p.trim());
        const totalWords = app.countWords(content);
        const wordsPerPart = Math.floor(totalWords / app.currentSplitMode);
        let parts = [], wordCount = 0, startIndex = 0;
        for (let i = 0; i < paragraphs.length; i++) {
          const wordsInParagraph = app.countWords(paragraphs[i]);
          wordCount += wordsInParagraph;
          if (parts.length < app.currentSplitMode - 1 && wordCount >= wordsPerPart * (parts.length + 1)) {
            parts.push(paragraphs.slice(startIndex, i + 1).join('\n\n'));
            startIndex = i + 1;
          }
        }
        parts.push(paragraphs.slice(startIndex).join('\n\n'));
        outputTextAreas.forEach((textarea, index) => {
          if (textarea) {
            const newChapterTitle = `Chương ${chapterNum}.${index + 1}${chapterTitle}`;
            textarea.value = `${newChapterTitle}\n\n${parts[index] || ''}`;
            app.updateWordCount(`output${index + 1}-text`, `output${index + 1}-word-count`);
          }
        });
        inputTextArea.value = '';
        app.updateWordCount('split-input-text', 'split-input-word-count');
        app.showNotification(app.translations[app.currentLang].splitSuccess, 'success');
        app.saveInputState();
      } catch(err) {
        console.error("Lỗi trong splitChapters:", err);
      }
    };

  } catch(err) {
    console.error("Lỗi trong split.js:", err);
  }
})(window.TienIch);
