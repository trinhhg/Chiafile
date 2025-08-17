(function(app){
  try {
    app.escapeHtml = function(str){
      try {
        if (typeof str !== 'string') return '';
        const htmlEntities = { '&': '&', '<': '<', '>': '>', '"': '"', "'": '&apos;' };
        return str.replace(/[&<>"']/g, match => htmlEntities[match]);
      } catch(err) {
        console.error("Lỗi trong escapeHtml:", err);
        return str || '';
      }
    };

    app.escapeRegExp = function(string){
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    app.replaceText = function(inputText, pairs, matchCase){
      try {
        let outputText = inputText;
        pairs.forEach(pair => {
          let find = pair.find;
          let replace = pair.replace !== null ? pair.replace : '';
          if (!find) return;
          const escapedFind = app.escapeRegExp(find);
          const regexFlags = matchCase ? 'g' : 'gi';
          const regex = new RegExp(escapedFind, regexFlags);
          outputText = outputText.replace(regex, match => {
            if (matchCase) return replace;
            if (match === match.toUpperCase()) return replace.toUpperCase();
            if (match === match.toLowerCase()) return replace.toLowerCase();
            if (match[0] === match[0].toUpperCase()) return replace.charAt(0).toUpperCase() + replace.slice(1).toLowerCase();
            return replace;
          });
        });

        pairs.forEach(pair => {
          let replace = pair.replace !== null ? pair.replace : '';
          if (!replace) return;
          if (replace === replace.toUpperCase() || /[A-Z]/.test(replace.slice(1))) return;
          const pattern = new RegExp(`(^|\\n|\\.\\s)(${app.escapeRegExp(replace)})`, 'g');
          outputText = outputText.replace(pattern, (match, prefix, word) => prefix + word.charAt(0).toUpperCase() + word.slice(1));
        });

        const paragraphs = outputText.split('\n').filter(p => p.trim());
        return paragraphs.join('\n\n');
      } catch(err) {
        console.error("Lỗi trong replaceText:", err);
        return inputText;
      }
    };

  } catch(err) {
    console.error("Lỗi trong replace.js:", err);
  }
})(window.TienIch);
