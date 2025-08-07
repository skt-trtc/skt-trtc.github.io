let brand_fileData = {}

function readMultiFiles(e, type) {
  brand_fileData = {};

  const files = e.currentTarget.files;
  Object.keys(files).forEach(i => {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = () => {
      brand_fileData[`maapfile://fileId_${file.name}`] = reader.result;
    }
    reader.readAsArrayBuffer(file);
  })

  const removeBtn = document.querySelector(
      "#brand-file-remove");
  const fileNameSpan = document.querySelector(
      "#brand-file-names");

  if (files.length === 0) {
    fileNameSpan.textContent = "브랜드 로고 불러오기"
    removeBtn.style.display = "none";
  } else {
    fileNameSpan.textContent = `${files.length}개 파일 선택됨`;
    removeBtn.style.display = "flex";
  }
}

function removeFiles(type) {
  brand_fileData = {};

  const removeBtn = document.querySelector(
      "#brand-file-remove");
  const fileNameSpan = document.querySelector(
      "#brand-file-names");

  fileNameSpan.textContent = "브랜드 로고 불러오기"
  removeBtn.style.display = "none";
}

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

function readFileToJson(fileName, folder) {
  if (fileName === "") {
    document.getElementById('input_json').value = "";
    return;
  }

  const readFile = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
    });
  };

  readFile(`${folder}/${fileName}`).then((data) => {
    document.getElementById('input_json').value = data;
  }).catch((error) => {
    console.error(error);
  });
}

function readFileToFormJson(fileName, folder) {
  if (fileName === "") {
    document.getElementById('input_form_json').value = "";
    return;
  }

  const readFile = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
    });
  };

  readFile(`${folder}/${fileName}`).then((data) => {
    document.getElementById('input_form_json').value = data;
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
      }).then(function(appRunner) {
        appRunner.runApp();
      });
    }
  });
});


function passToApp(isTemplate) {
  let json = document.getElementById('input_json').value;
  let formJsonElement = document.getElementById('input_form_json')
  let formJson = formJsonElement != null ? formJsonElement.value : null;

  let preInputtedElement = document.getElementById('pre_inputted');
  let preInputted = preInputtedElement != null ? preInputtedElement.value : null;

  let autoTextListElement = document.getElementById('autotext_list');
  let autoTextList = autoTextListElement != null ? autoTextListElement.value : null;

  let color = document.getElementById('enter-color').value;
  let previewOnly = document.getElementById('preview_only').checked;
  let inputEnable = document.getElementById('input_enable').checked;
  let renderIos = document.getElementById('render_ios').checked;

  let brandColorElement = document.getElementById('enter-brand-color');
  let brandColor = brandColorElement != null ? brandColorElement.value : "";

  let maapFileIdUrlMap = document.getElementById('maap_file_id_url_map');
  let maapFileIdToUrl = maapFileIdUrlMap != null ? maapFileIdUrlMap.value : null;

  if (json !== "") {
    // TODO: MUST call function (for passing data to app)
    window.setupData({
      "displayedItem": {
        "previewOnly": previewOnly,
        "inputEnable": inputEnable,
        "imageEditor": true,
        "guideText": "메시지 작성에 필요한 변수를 클릭하면 자동으로 복사됩니다.",
        "autoTextList": autoTextList,
        "renderIos": renderIos,
      },
      "layoutTheme": {
        "themeColor": color,
        "themeTitleColor": "#111111",
        "themeTitleSize": 24,
        "themeLineWidth": 4,
        "previewIsLeft": false,
        "previewLineOpacity": 100,
        "previewMarginLeft": previewOnly ? 0 : 32,
        "previewMarginTop": previewOnly ? 0 : 16,
      },
      "message" : {
        "isTemplate": isTemplate,
        "message": json,
        "messagebaseForm": formJson,
        "brandLogos" : brand_fileData,
        "brandThemeColor" : brandColor,
        "maapFileIdToUrl" : maapFileIdToUrl,
        "preInputted" : preInputted,
      }
    });
  }
}

// TODO: MUST implement function (listen)
window.onExport = (val) => {
  document.getElementById("result_popup").style.display = "flex";
  document.getElementById("result").value = val;
}

function copyToClipboard() {
  const resultTextarea = document.getElementById('result');
  resultTextarea.select();
  document.execCommand('copy');
}

function closePopup() {
  document.getElementById('result_popup').style.display = 'none';
}

// TODO: MUST implement function (listen)
window.onRequestUpload = async (json) => {
  let retJson = {}
  const keys = Object.keys(json);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];

    // like upload network delay
    await sleep(1000);

    // make { key : maapFileId }
    retJson[key] = "maapfile://fileId_" + key + ".jpg";
  }
  return Promise.resolve(retJson);
}

window.onLoadImage = async () => {
  // like network delay
  await sleep(1000);

  // make { maapFileId : bytes }
  let maapFileId = "maapfile://fileId_123";
  let utf8Encode = new TextEncoder();
  let bytes = utf8Encode.encode("EXAMPLE_FILE_BYTE_ARRAY");

  let retJson = {};
  retJson[maapFileId] = bytes;
  return Promise.resolve(retJson);
}

// TODO: MUST implement function (listen)
window.onClose = (rewrite) => {
  let input_jsonElement = document.getElementById('input_json');
  if (input_jsonElement != null) {
    input_jsonElement.value = '';
  }
  let formJsonElement = document.getElementById('input_form_json');
  if (formJsonElement != null) {
    formJsonElement.value = '';
  }
  let pre_inputtedElement = document.getElementById('pre_inputted');
  if (pre_inputtedElement != null) {
    pre_inputtedElement.value = '';
  }
  let result_areaElement = document.getElementById("result_area");
  if (result_areaElement != null) {
    result_areaElement.style.display = "none";
  }
  let resultElement = document.getElementById("result");
  if (resultElement != null) {
    resultElement.value = '';
  }
}
