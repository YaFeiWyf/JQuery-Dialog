$(function(){
	var arr=[];
	// alert(typeof arr);
	// alert(typeof $(".wrapper")=='object');
	// alert($(".wrapper").get(0).offsetHeight);
	// alert(parseFloat('50%'));
	$(".wrapper").bind("click",function(){

	});
	// alert($(".pox").get(0).offsetHeight);
	
	
	$(".pox").J_animate();
	// $(".pox").center();
	// alert($(".pox").parent().attr("id")=="J_animate");
	$(".del").click(function(){
			$.dialog({
				// model : false
				txt:'',
				cls:['success'],
				html: '<div> woshi diva a '+
						'<p>woshis pa a  a</p>'+
						'</div>',
				// html:$(".pox")
				btns: [
					{
						text: "确定",
						cls:[],
						callback:function(){
							alert("que ding ");
						}
					}
					// ,
					// {
					// 	text: "取消",
					// 	cls : 'cancel',
					// 	callback: function(){
					// 		alert("qu xiao");
					// 	}
					// }
				]
			});
			// $("#J_dialog"+$.dialog.count).J_animate();
		});

	$(".sub").click(function(){
		$.dialog({
			html: $(".pox"),
			cls : "success"
		});
	});
	$(".dialog").click (function(){
		$(this).unmodel({
			// animate:false
		});
	});	
	$(".animation").click(function(){
		// $(".box").animate({
		// 	height:'500',
		// 	marginTop:'-250'
		// },500,"swing");
	// });
		$(".box").J_animate();
	});
});