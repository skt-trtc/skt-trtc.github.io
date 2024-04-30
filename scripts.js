let fileData = {}
let brand_fileData = {}
let maap_fileData = []

function readMultiFiles(e, type) {
  if (type === 1) {
    fileData = {};
  } else if (type === 2) {
    brand_fileData = {};
  } else if (type === 3) {
    maap_fileData = []
  }
  const files = e.currentTarget.files;
  Object.keys(files).forEach(i => {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 1) {
        fileData[`maapfile://fileId_${file.name}`] = reader.result;
      } else if (type === 2) {
        brand_fileData[`maapfile://fileId_${file.name}`] = reader.result;
      } else if (type === 3) {
        maap_fileData.push(reader.result);
      }
    }
    reader.readAsArrayBuffer(file);
  })

  const removeBtn = document.querySelector(
      (type === 1) ? "#file-remove" : (type === 2) ? "#brand-file-remove" : "#maap-file-remove");
  const fileNameSpan = document.querySelector(
      (type === 1) ? "#file-names" : (type === 2) ?"#brand-file-names" : "#maap-file-names");

  if (files.length === 0) {
    fileNameSpan.textContent = (type === 1) ? "로고 불러오기" : (type === 2) ? "브랜드 로고 불러오기" : "파일 불러오기"
    removeBtn.style.visibility = "hidden";
  } else {
    fileNameSpan.textContent = `${files.length}개 파일 선택됨`;
    removeBtn.style.visibility = "visible";
  }
}

function removeFiles(type) {
  if (type === 1) {
    fileData = {};
  } else if (type === 2) {
    brand_fileData = {};
  } else if (type === 3) {
    maap_fileData = [];
  }

  const removeBtn = document.querySelector(
      (type === 1) ? "#file-remove" : (type === 2) ? "#brand-file-remove" : "#maap-file-remove");
  const fileNameSpan = document.querySelector(
      (type === 1) ? "#file-names" : (type === 2) ?"#brand-file-names" : "#maap-file-names");

  fileNameSpan.textContent = (type === 1) ? "로고 불러오기" : (type === 2) ? "브랜드 로고 불러오기" : "파일 불러오기"
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

  let preInputtedElement = document.getElementById('pre_inputted');
  let preInputted = preInputtedElement != null ? preInputtedElement.value : null;

  let color = document.getElementById('enter-color').value;
  let previewOnly = document.getElementById('preview_only').checked;

  let maap_fileData_json = {};
  let maapFileIdsElement = document.getElementById('maap_file_ids');
  if (maapFileIdsElement != null) {
    let maapFileIdJson = maapFileIdsElement.value;
    if (maapFileIdJson.length > 0) {
      let maapFileIds = JSON.parse(maapFileIdJson);
      for (var i = 0; i < maapFileIds.length; i++) {
        let m = maapFileIds[i];
        if (i < maap_fileData.length) {
          maap_fileData_json[m] = maap_fileData[i];
        }
      }
    }
  }

  if (json !== "") {
    let val = {
      "isTemplate": isTemplate,
      "logos" : fileData,
      "brandLogos" : brand_fileData,
      "maapFiles" : maap_fileData_json,
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
  document.getElementById("result_area").style.display = "flex";
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
    retJson[key] = "maapfile://fileId_" + key + ".jpg";
  }
  return Promise.resolve(retJson);
}

// TODO: MUST implement function (listen)
window.onCloseApp = (rewrite) => {
  document.getElementById('input_json').value = '';
  document.getElementById('pre_inputted').value = '';
  document.getElementById("result_area").style.display = "none";
  document.getElementById("result").value = '';
}
