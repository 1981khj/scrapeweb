$(function() {
	$.ajax({
		type : 'post',
		DataType : 'html',
		crossDomain : true,
		url: 'http://localhost:3000/getpage',
		data: {
			"sTargetUrl" : "http://api.jquery.com/"
		},
		success: function(data) {
			console.log("success");			
			var elWrap = $(data).get(0);
			var welWrap = $(elWrap);
			console.log(welWrap);
		},
		error : function(){
			console.log("error");
		}
	});
});