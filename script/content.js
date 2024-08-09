(function(){





    function newButton(text, callback, position) {
        var a = document.createElement('button');
        a.innerHTML = text;
        a.style.backgroundColor = '#44c767';
        a.style.backgroundImage = 'linear-gradient(#44c767, #64e787)';
        a.style.borderRadius = '28px';
        a.style.border = '1px solid #18ab29';
        a.style.display = 'inline-block';
        a.style.color = '#ffffff';
        a.style.fontSize = '17px';
        a.style.padding = '11px 31px';
        a.style.position = 'fixed';
        a.style.right = `${10 + ((150 + 15) * (position - 1))}px`;
        a.style.width = '150px';
        a.style.top = '7px';
        a.style.zIndex = '999';
    
        var b = document.getElementsByTagName('body')[0];
        b.appendChild(a);
    
        a.addEventListener('click', function() {
            callback();
        });
    }
    
    function getContent() {
        var content = '';
        for (a in window.sContacts) content += `${a}\n`;
        return content;
    }
    
    function init() {
        newButton('Download', () => {
            download(getContent());
        }, 1);
        getNumbers();
        document.querySelector('#pane-side').addEventListener('scroll', getNumbers);   
    }
    
    function download(content) {
        var data = 'data:application/octet-stream,' + encodeURIComponent(content);
        var newWindow = window.open(data, 'file');
    }
    
    function getNumbers() {
        if (window.sContacts === undefined) window.sContacts = [];
        document.querySelectorAll('#pane-side div[role=grid] div[role=row] > div:first-child div:nth-child(2) div:first-child > div:first-child').forEach(element => {
            var phone = '';
            if (/^((\+| |-|\d)+$)/g.test(element.innerText)) phone = element.innerText;
            else if (/^((\+| |-|\d)+$)/g.test(element.title)) phone = element.title;
            if (phone !== '') {
                window.sContacts[phone] = phone;
                element.style.backgroundColor = '#00ff00';
            } else {
                element.style.backgroundColor = 'inherit';
            }
        });
    }
    
    init();
    
    document.querySelector("#scanButton").addListener('click', async() => {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                  let tab = tabs[0];
                  if (!tab.url.includes('chrome://')) {
                    chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      function: init,
                    });
                  }
                });
        });







})();