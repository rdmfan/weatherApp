 var weather;
 var city;

 // 请求太原天气情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	type:"get",
	dataType:"jsonp",
	success:function(obj){
		weather=obj.data.weather;
         console.log(weather);	
	}
})

//请求城市
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	type: "get",
	dataType: "jsonp",
	success:function(obj){
		city=obj.data;
         // console.log(obj.data);
	}
})




//渲染数据
function update(){
     var cityName=document.getElementsByClassName("header")[0];
     var number=document.getElementsByClassName("number")[0];
     var wenzi=document.getElementsByClassName("wenzi")[0];
     var high=document.getElementsByClassName("high")[0];
     var low=document.getElementsByClassName("low")[0];
     // var recent_wind=document.getElementsByClassName("recent_wind")[0];
     // var recent_level=document.getElementsByClassName("recent_level")[0];
     cityName.innerHTML=weather.city_name;   
     number.innerHTML=weather.current_temperature+"°";
     high.innerHTML=weather.dat_high_temperature;
     wenzi.innerHTML=weather.dat_condition;
     low.innerHTML=weather.dat_low_temperature;
     // recent_wind.innerHTML=weather.wind_direction;
     // recent_level.innerHTML=weather.wind_level+"级";
     // 图片
     var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
     dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
    

     var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
     tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;

     var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
     tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
     
     var tomorrow_condition=document.getElementById("tomorrow_condition");
     tomorrow_condition.innerHTML=weather.tomorrow_condition;

     var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
     tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;

    
     for(var i in weather.hourly_forecast){
     	var now=document.createElement("div");
     	now.className="now";

     	var nowp=document.getElementById("now");
     	nowp.appendChild(now);

     	var now_time=document.createElement("h2");
     	now_time.className="now_time";
     	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
     	now.appendChild(now_time);

     	var icon=document.createElement("div");
     	icon.className="icon";
        icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
     	now.appendChild(icon);

     	var temp=document.createElement("h3");
     	temp.className="temp";
     	temp.innerHTML=weather.hourly_forecast[i].temperature+"°";
     	now.appendChild(temp);
      }


      for(var j in weather.forecast_list){



      	var day=document.createElement("div");
      	day.className="recent";

      	var days=document.getElementById("day");
      	days.appendChild(day);

      	var recent_time=document.createElement("div");
      	recent_time.className="recent_time";
        recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
        day.appendChild(recent_time);



       // var recent_time=document.createElement("div");
       // recent_time.className="recent_time";
       // day.appendChild(recent_time);

       // var 	month=document.createElement("span");
       // month.className="month";
       // month.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/";
       // recent_time.appendChild(month);

       // var 	day1=document.createElement("span");
       // day1.className="day";
       // day1.innerHTML=weather.forecast_list[j].date.substring(8);
       // recent_time.appendChild(day1);

      	var recent_wea=document.createElement("h2");
     	recent_wea.className="recent_wea";
     	recent_wea.innerHTML=weather.forecast_list[j].condition;
     	day.appendChild(recent_wea);

     	var recent_pic=document.createElement("div");
     	recent_pic.className="recent_pic";
        recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
     	day.appendChild(recent_pic);

     	var recent_high=document.createElement("h3");
     	recent_high.className="recent_high";
     	recent_high.innerHTML=weather.forecast_list[j].high_temperature+"°";
     	day.appendChild(recent_high);

     	var recent_low=document.createElement("h4");
     	recent_low.className="recent_low";
     	recent_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
     	day.appendChild(recent_low);

     	var recent_wind=document.createElement("h5");
     	recent_wind.className="recent_wind";
     	recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
     	day.appendChild(recent_wind);

     	var recent_level=document.createElement("h6");
     	recent_level.className="recent_level";
     	recent_level.innerHTML=weather.forecast_list[j].wind_level+"级";
     	day.appendChild(recent_level);


     	var header=document.getElementsByClassName("header")[0];
     	var city_box=document.getElementsByClassName("city_box")[0];
     	header.onclick=function(){

            $(".text").val("");
            $(".button").html("取消")

     		city_box.style="display:block";
     	}
        }
        //渲染城市
        for(var k in city){
        	// console.log(k);

         var cityp=document.getElementById("city");
         var title=document.createElement("div");
         title.className="title";
         title.innerHTML=k;
         cityp.appendChild(title);

         var con=document.createElement("div");
         con.className="con";

	         for(var y in city[k]){
	         	var son=document.createElement("div");
	         	son.className="son";
	         	son.innerHTML=y;
	         	con.appendChild(son);
	         }
             cityp.appendChild(con);

      }
 }



//查找各城市的天气信息   
function AJAX(str){
 	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	type:"get",
	dataType:"jsonp",
	success:function(obj){
	weather=obj.data.weather;
    // console.log(weather);	
    update();
    $(".city_box").css({"display":"none"});
	}
  })
}


//当页面加载完成执行的代码
window.onload=function(){
    update();

    //添加事件	
    $(".son").on("click",function(){
    	var cityh=this.innerHTML;
    	AJAX(cityh);
    })

    //input获取焦点 button变为确认
     $(".text").on("focus",function() {
     	$(".button").html("确认");
     })

    
     var button=document.getElementsByClassName("button")[0];
     // console.log(button);
     //添加点击事件
     button.onclick=function(){
     	var btn=this.innerHTML;
     	// console.log(btn);
     	if(btn=="取消"){
          // console.log(1);
          //city_box消失
           var city_box1=document.getElementsByClassName("city_box")[0];
           city_box1.style="display:none";
     	}else{
     		var str=document.getElementById("text").value;
     		console.log(str);
     		for(var i in city){
     			for(var j in city[i]){
                   	  	if(str==j){    
                   	      AJAX(str);
                          //打断执行
                          return;
                          }
                       }
                   }
                   alert("没有该城市气象信息！");
     		}
     	}
}
