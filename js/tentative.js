
/*
var shoAnalysis = [
  {
    "1": [["風寒襲表","表虚証","風湿頭痛","血虚頭痛","風湿熱","湿熱鬱阻少陽"]],
    "2": [["陰虚陽亢","風寒襲表兼熱鬱","気分熱盛","風熱頭痛"]],
    "3": [["血虚不栄","心脾両虚","陰虚湿滞"]],
    "4": [["肺熱壅盛","湿熱阻滞脾胃","風寒襲表兼陰血虚損"]],
    "5": [["風熱犯衛兼陰虚"]]
  }
];

var influence = [
  ["陰虚陽亢","風寒襲表", 0.3],
  ["風湿頭痛","血虚頭痛", 0.16],
  ["血虚不栄","陰虚陽亢", 0.02],
  ["風熱頭痛","血虚頭痛", 0.3],
  ["風熱犯衛兼陰虚","肺熱壅盛", 0.01],
  ["心脾両虚","風熱頭痛", 0.5],
  ["心脾両虚","血虚不栄", 0.2],
  ["陰虚湿滞","風熱頭痛", 0.05],
  ["風寒襲表兼陰血虚損","陰虚湿滞", 0.5]
];
*/

var temp;
var splits;
var count = 0;

function createButton(lv, i, str) {
  for(j in str[0]) {
    //ボタンを配置
    $(lv).prepend('<button id="'+ 'b' + count + '">' +str[0][j]+'</button>');
    console.log($('#b'+ count).text());
    count++;
  }
}
function ChangeArrowColor(color, num) {

  alert(color);

  $('#t'+sho_data).css("border-color", "hsl(" + color + ", 100%, 50%)" + " " + "hsl(" + color + ", 100%, 50%)" + " transparent transparent" );
  //color + " " + color + " transparent transparent"
  $('#a'+sho_data).css("border-color" , "hsl(" + color + ", 100%, 50%)");
}

function ArrowColor(s_max, s_one, num) {

  ChangeArrowColor(120 - (120*s_one/s_max));

  /*
  if(s_one < s_max/5){
    ChangeArrowColor(colors[0], num);
  }else if(s_one < s_max*2/5) {
    ChangeArrowColor(colors[1], num);
  }else if(s_one < s_max*3/5) {
    ChangeArrowColor(colors[2], num);
  }else if(s_one < s_max*4/5) {
    ChangeArrowColor(colors[3], num);
  }else {
    ChangeArrowColor(colors[4], num);
  }
  */
}

function createArrow(influence) {
  //各証の図形の位置を取得
  var freq = 0;
  var cause_coordinate = new Array();
  var result_coordinate = new Array();
  var strength = 0;
  for(i in influence){
    if(influence[i][2] > strength){
      strength = influence[i][2];
    }
  }
  for(sho_data in influence){
    for(i=0;i<count;i++){
      if($('#b'+ i).text() == influence[sho_data][0]){
        //座標取得(中央に調整済み)
        cause_coordinate.push($('#b'+ i).offset().left , $('#b'+ i).offset().top, $('#b'+ i).outerWidth(), $('#b'+ i).outerHeight());
        //alert(cause_coordinate);
        //$('#b'+ i).outerWidth())/2
      }
      if($('#b'+ i).text() == influence[sho_data][1]){
        //座標取得(中央に調整済み)
        result_coordinate.push($('#b'+ i).offset().left , $('#b'+ i).offset().top, $('#b'+ i).outerWidth(), $('#b'+ i).outerHeight());
        //alert(result_coordinate);
      }
    }
    //矢印の描画
    $('#class').prepend('<div class="arrow" id= a' + sho_data + '></div>');
    $('#class').prepend('<div class="triangle" id= t' + sho_data + '></div>');

    var width_x = 0;
    var width_y = 0;
    var tan = 0;

    if((result_coordinate[1] - cause_coordinate[1]) == 0) {
      //同じ階層で結果の証が右にある場合
      if((result_coordinate[0]-cause_coordinate[0]) > 0){
        $('#a'+sho_data).css({
          left : cause_coordinate[0] + cause_coordinate[2],
          top : cause_coordinate[1] + cause_coordinate[3]/2,
          width: result_coordinate[0] - (cause_coordinate[0] + cause_coordinate[2])
        });

        $('#t'+sho_data).css({
          left : result_coordinate[0] - 15, //-15は矢印の位置調整
          top : result_coordinate[1] + cause_coordinate[3]/2 - 5, //-5は位置調整
          transform: 'rotate(' + Math.PI/4 + 'rad)',
          'transform-origin': 'center center 0'
        });
      //同じ階層で結果の証が左にある場合
      } else {
        $('#a'+sho_data).css({
          left : result_coordinate[0] + result_coordinate[2],
          top : result_coordinate[1] + result_coordinate[3]/2,
          width: cause_coordinate[0] - (result_coordinate[0] + result_coordinate[2])
        });

        $('#t'+sho_data).css({
          left : result_coordinate[0] + result_coordinate[2] + 1,
          top : result_coordinate[1] + result_coordinate[3]/2 - 5,
          transform: 'rotate(' + Math.PI*5/4 + 'rad)',
          'transform-origin': 'center center 0'
        });
      }
    //異なる階層で結果の証が右にある場合
  } else if(( result_coordinate[0] + result_coordinate[2]/2 )-( cause_coordinate[0] + cause_coordinate[2]/2 ) > 0) {
      width_x = (result_coordinate[0] + result_coordinate[2]/2) - (cause_coordinate[0] + cause_coordinate[2]/2);
      width_y = result_coordinate[1] - (cause_coordinate[1] + cause_coordinate[3]);
      $('#a'+sho_data).css({
        left : cause_coordinate[0] + cause_coordinate[2]/2,
        top : cause_coordinate[1] + cause_coordinate[3],
        width: Math.sqrt( Math.pow(width_x, 2) + Math.pow(width_y, 2) ),
        transform: 'rotate(' + Math.atan(width_y / width_x) + 'rad)',
        'transform-origin': 'left top 0'
      });
      //aaa
      $('#t'+sho_data).css({
        left : result_coordinate[0] + result_coordinate[2]/2 - 8 - 7 * Math.cos(Math.atan(width_y / width_x)),
        top : result_coordinate[1] - 5 - 10  * Math.sin(Math.atan(width_y / width_x)),
        transform: 'rotate(' + ( Math.PI/4 + Math.atan( width_y / width_x) ) + 'rad)',
        'transform-origin': 'center center 0'
      });
    //異なる階層で結果の証が左にある場合
  } else if(( result_coordinate[0] + result_coordinate[2]/2 )-( cause_coordinate[0] + cause_coordinate[2]/2 ) < 0){
      width_x = (cause_coordinate[0] + cause_coordinate[2]/2) - (result_coordinate[0] + result_coordinate[2]/2);
      width_y = result_coordinate[1] - (cause_coordinate[1] + cause_coordinate[3]);
      $('#a'+sho_data).css({
        left : cause_coordinate[0] + cause_coordinate[2]/2,
        top : cause_coordinate[1] + cause_coordinate[3],
        width: Math.sqrt( Math.pow(width_x, 2) + Math.pow(width_y, 2) ),
        transform: 'rotate(' + ( Math.PI - Math.atan(width_y / width_x) ) + 'rad)',
        'transform-origin': 'left top 0'
      });

      //aaa
      $('#t'+sho_data).css({
        left : result_coordinate[0] + result_coordinate[2]/2 - 8 + 9 * Math.cos(Math.atan(width_y / width_x)),
        top : result_coordinate[1] - 5 - 10 * Math.sin(Math.atan(width_y / width_x)),
        transform: 'rotate(' + ( Math.PI*5/4 - Math.atan(width_y / width_x) ) + 'rad)',
        'transform-origin': 'center center 0'
      });
      //異なる階層で結果の証が同じ行にあるとき
    } else {
      $('#a'+sho_data).css({
        left : cause_coordinate[0] + cause_coordinate[2]/2,
        top : cause_coordinate[1] + cause_coordinate[3],
        width: result_coordinate[1] - ( cause_coordinate[1] + cause_coordinate[3] ),
        transform: 'rotate(' +  Math.PI/2 + 'rad)',
        'transform-origin': 'left top 0'
      });

      $('#t'+sho_data).css({
        left : result_coordinate[0] + result_coordinate[2]/2 - 8,
        top : result_coordinate[1] - 15,
        transform: 'rotate(' +  Math.PI*3/4 + 'rad)',
        'transform-origin': 'center center 0'
      });
    }
    cause_coordinate.length = 0;
    result_coordinate.length = 0;

    ArrowColor(strength, influence[sho_data][2], sho_data);
  }
}

function onClick() {
  search_url = "https://snpiw1d73i.execute-api.ap-northeast-1.amazonaws.com/stage/resource";
  advance_target = document.getElementById("button");

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
  alert("検索中");

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

      for(var i in shoAnalysis) {
        //alert("aaa");
        if(i % 2 == 0)
          $('#class').prepend('<div class="inline blue1" id= lv' + i + '></div>');
        else if (i % 2 == 1)
          $('#class').prepend('<div class="inline blue2" id= lv' + i + '></div>');

        createButton('#lv'+ i, i, shoAnalysis[i][1]);
      }
      createArrow(influence);

    },
    error: function (data) {
      advance_target.innerHTML = JSON.stringify(data);
    }
  });
  /*
  analysis_data = Object.entries(shoAnalysis[0]);
  for(var i in analysis_data) {
    if(i % 2 == 0)
      $('#class').prepend('<div class="inline blue1" id= lv' + i + '></div>');
    else if (i % 2 == 1)
      $('#class').prepend('<div class="inline blue2" id= lv' + i + '></div>');

    createButton('#lv'+ i, i, analysis_data[i][1]);
  }
  createArrow(influence);
  */
}
