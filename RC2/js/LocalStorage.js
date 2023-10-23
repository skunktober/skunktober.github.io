function exportLocalStorage() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "options.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function handleFileSelect(evt) {
    var file = evt.target.files[0]; 

    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) { 
            var contents = e.target.result;
            try {
                var jsonContents = JSON.parse(contents);
                for(var key in jsonContents) {
                    localStorage.setItem(key, jsonContents[key]);
                }
                // Then refresh the page
                location.reload();
            } catch(err) {
                alert("Unreadable data; this file may be in the wrong format or it is corrupted.");
            }
        }
        reader.readAsText(file);
    }
  }

  function importLocalStorage() {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".json";
    inputElement.addEventListener("change", handleFileSelect, false);
    inputElement.click();
}