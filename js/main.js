function createButton() {
  var duration = 300;

  $('#buttons').append('<button>ボタン</button>');


}

function onClick() {
  search_url = "https://snpiw1d73i.execute-api.ap-northeast-1.amazonaws.com/stage/resource";
  advance_target = document.getElementById("buttons");
  advance_target.innerHTML = "";

  var key = 0;
  if(document.forms.form.key.value == ""){
    alert("キーワードを入力してください");
  }else {
    var result = document.forms.form.key.value.match(/[;&"'\/\*\\\.\?\[\]\,\，]/);
    if(result != null){
      alert("フォームに使用不可能文字が含まれています(*、/、￥、＆、\"、'など)。");
    }else {
      key = document.forms.form.key.value;
    }
  }

  var splited_keys = key.split("、");
  var JSONdata = {
    "data": splited_keys
  };

  alert(JSON.stringify(JSONdata));

  $.ajax({
    type: 'POST',
    url: search_url,
    data: JSON.stringify(JSONdata),
    contentType: 'application/json',
    dataType: 'JSON',
    scriptCharset: 'utf-8',
    success: function (data) {
      var received_data = JSON.stringify(data);
      JSONparsed = JSON.parse(received_data);
      shoAnalysis = Object.entries(JSONparsed[0]); //JSON形式から[key,value]へ変換する必要
      influence = JSONparsed[1]; //LIST型なのでentriesする必要なし
      advance_target.innerHTML = influence;
    },
    error: function (data) {
      advance_target.innerHTML = JSON.stringify(data);
    }
  });
}
