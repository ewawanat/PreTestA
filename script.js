function prefix() {
  return "ExperimentPrefix";
}

function save() {
  var fileNameWithExtension = window.location.href.split("/").pop();
  var fileName = fileNameWithExtension.split(".")[0];
  var tElements = document.getElementsByTagName('input');
  var prefix = window.prefix();
  for (var i = tElements.length - 1; i >= 0; i--)
  {
    var tElement = tElements[i];
    if (tElement.type !== "text")
      continue;
    var key = prefix + "-" + fileName + "-"+ tElement.id;
    localStorage.setItem(key, tElement.value)
  }
}

function getName() {
  if(document.cookie)
  {
    index = document.cookie.indexOf(cookie_name);
    if (index != -1)
    {
      namestart = (document.cookie.indexOf("=", index) + 1);
      nameend = document.cookie.indexOf(";", index);
      if (nameend == -1) {nameend = document.cookie.length;}
      YouWrote = document.cookie.substring(namestart, nameend);
      return YouWrote;
    }
  }
}

function read() {

  cookie_name = "partName";
  var YouWrote;

  YouWrote=getName();
  if (YouWrote == "dataCookie")
  {YouWrote = "Nothing_Entered"}

  csvRows = [];
  myKeys = [];
  var pattern = window.prefix();
  for (var key in localStorage)
  {
    if (key.indexOf(pattern) == -1)
      continue;
    myKeys.push(key);
    var rowKey = key.substring(pattern.length + 1);
    csvRows.push(rowKey+ ","+localStorage.getItem(key))
  }

  for (var i = myKeys.length - 1; i >=0; i--)
    localStorage.removeItem(myKeys[i]);
  var csvString = csvRows.join("\r\n");
  var a = document.createElement('a');
  a.innerHTML = "Download";
  a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
  a.target   = '_blank';
  a.download = 'results.csv';
  document.body.appendChild(a);
  var b = document.createElement('a');
  b.innerHTML = YouWrote;
  document.body.appendChild(b);
}

function submit() {
  window.save();
  window.read();
}
window.onload = function(e) {
  var aelements = document.getElementsByTagName('a');
  for (var i = aelements.length - 1; i >= 0; i--)
  {
    var aelement = aelements[i];
    if (aelement.href.length > 0 && aelement.innerText.length > 0)
      aelement.addEventListener("click",
                                function(event) {
        window.save();
      });
  }
}
