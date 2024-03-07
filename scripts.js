window.addEventListener('load', function(ev) {
  var appArea = document.querySelector("#flutter_app");
  // Download main.dart.js
  _flutter.loader.loadEntrypoint({
    serviceWorker: {
      serviceWorkerVersion: serviceWorkerVersion,
    },
    onEntrypointLoaded: function(engineInitializer) {
      engineInitializer.initializeEngine({
        hostElement: appArea,
      }).then(function(appRunner) {
        appRunner.runApp();
      });
    }
  });
});

let fileData = {}

function readMultiFiles(e) {
  fileData = {};

  const files = e.currentTarget.files;
  Object.keys(files).forEach(i => {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = () => {
      fileData[`maap://${file.name}`] = reader.result;
    }
    reader.readAsArrayBuffer(file);
  })
  const removeBtn = document.querySelector(".custom-remove");
  const fileNameSpan = document.querySelector("#file-names");
  if (files.length === 0) {
    fileNameSpan.textContent = "로고 불러오기"
    removeBtn.style.visibility = "hidden";
  } else {
    fileNameSpan.textContent = `${files.length}개 파일 선택됨`;
    removeBtn.style.visibility = "visible";
  }
}

function removeFiles() {
  fileData = {};

  const removeBtn = document.querySelector(".custom-remove");
  const fileNameSpan = document.querySelector("#file-names");

  fileNameSpan.textContent = "로고 불러오기"
  removeBtn.style.visibility = "hidden";
}

function setupData(json) {
  if (json !== "") {
    let val = {
      "logos" : fileData,
      "message": json,
    }
    window.setupDataOnWeb(val);
  }
}

window.exportToWeb = (val) => {
  document.getElementById("result_area").style.visibility = "visible";
  document.getElementById("result").innerText = val;
}

window.requestUpload = async (json) => {
  let retJson = {}
  const keys = Object.keys(json);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const byte = json[key];
    //console.log("key : " + key + ", value : " + byte.length)
    retJson[key] = "maap://" + key + ".jpg";
  }
  return Promise.resolve(retJson);
}

function readFileToJson() {
  const readFile = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
    });
  };

  readFile('json.json').then((data) => {
    document.getElementById('input_json').value = data;
  }).catch((error) => {
    console.error(error);
  });
}