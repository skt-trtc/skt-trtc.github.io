let fileData = {}
let brand_fileData = {}

function readMultiFiles(e, type) {
  if (type === 1) {
    fileData = {};
  } else {
    brand_fileData = {};
  }
  const files = e.currentTarget.files;
  Object.keys(files).forEach(i => {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 1) {
        fileData[`maapfile://fileId_${file.name}`] = reader.result;
      } else {
        brand_fileData[`maapfile://fileId_${file.name}`] = reader.result;
      }
    }
    reader.readAsArrayBuffer(file);
  })

  const removeBtn = document.querySelector(
      (type === 1) ? "#file-remove" : "#brand-file-remove");
  const fileNameSpan = document.querySelector(
      (type === 1) ? "#file-names" : "#brand-file-names");

  if (files.length === 0) {
    fileNameSpan.textContent = (type === 1) ? "로고 불러오기" : "브랜드 로고 불러오기"
    removeBtn.style.visibility = "hidden";
  } else {
    fileNameSpan.textContent = `${files.length}개 파일 선택됨`;
    removeBtn.style.visibility = "visible";
  }
}

function removeFiles(type) {
  if (type === 1) {
    fileData = {};
  } else {
    brand_fileData = {};
  }
  const removeBtn = document.querySelector(
      (type === 1) ? "#file-remove" : "#brand-file-remove");
  const fileNameSpan = document.querySelector(
      (type === 1) ? "#file-names" : "#brand-file-names");

  fileNameSpan.textContent = (type === 1) ? "로고 불러오기" : "브랜드 로고 불러오기"
  removeBtn.style.visibility = "hidden";
}

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

function readFileToJson(fileName) {
  const readFile = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
    });
  };

  readFile(`messagebase_json/${fileName}`).then((data) => {
    document.getElementById('input_json').value = data;
  }).catch((error) => {
    console.error(error);
  });
}

window.addEventListener('load', function(ev) {
  // TODO: MUST implement function (listen)
  let appArea = document.querySelector("#flutter_app");
  // Download main.dart.js
  _flutter.loader.loadEntrypoint({
    serviceWorker: {
      serviceWorkerVersion: serviceWorkerVersion,
    },
    onEntrypointLoaded: function(engineInitializer) {
      engineInitializer.initializeEngine({
        hostElement: appArea,
        renderer: "html",
      }).then(function(appRunner) {
        appRunner.runApp();
      });
    }
  });
});


function passToApp(isTemplate) {
  let json = document.getElementById('input_json').value;
  let preInputted = document.getElementById('pre_inputted').value;
  let color = document.getElementById('enter-color').value;
  let previewOnly = document.getElementById('preview_only').checked;

  if (json !== "") {
    let val = {
      "isTemplate": isTemplate,
      "logos" : fileData,
      "brandLogos" : brand_fileData,
      "message": json,
      "preInputted" : preInputted,
      "colors": {
        "main": color
      },
      "previewOnly": previewOnly
    }

    // TODO: MUST call function (for passing data to app)
    window.setupData(val);
  }
}

// TODO: MUST implement function (listen)
window.onExportToWeb = (val) => {
  document.getElementById("result_area").style.visibility = "visible";
  document.getElementById("result").value = val;
}

// TODO: MUST implement function (listen)
window.onRequestUpload = async (json) => {
  // like upload network delay
  await sleep(1000);

  let retJson = {}
  const keys = Object.keys(json);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const byte = json[key];
    //console.log("key : " + key + ", value : " + byte.length)
    retJson[key] = "maapfile://" + key + ".jpg";
  }
  return Promise.resolve(retJson);
}

// TODO: MUST implement function (listen)
window.onCloseApp = (rewrite) => {
  document.getElementById('input_json').value = '';
  document.getElementById('pre_inputted').value = '';
  document.getElementById("result_area").style.visibility = "hidden";
  document.getElementById("result").value = '';
}
