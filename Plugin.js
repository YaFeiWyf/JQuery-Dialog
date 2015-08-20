(function($){
	$.extend({
		dialog : function (options){
			//第一次调用dialog方法时，创建弹窗对象，绑定按钮事件，这样可以避免重复绑定事件,之前出现的回调函数次数问题，就是因为多次绑定事件造成的
			var dialog=$("#J_dialog");
			if (!dialog.length) {
				var defaults={
					id : 'J_dialog',
					cls :  ['dialog'],
					txt : '我是一个对话框模板！',
					html : '',
					model : true,
					btns : [
							{
								text : 'confirm',
								cls : 'dialog_btns',
								callback : function(){console.log('confirm');}
							},
							{
								text : 'cancel',
								cls : 'dialog_btns',
								callback : function(){console.log('cancel');}
							}
						]
				};
				var opts=$.dialog.opts=$.extend({}, defaults, options);
				var me=$.dialog.me=this;
				var cls_tmpl=function(cls){
					var clsName="";
					if (typeof cls=='object') {
						$.each(cls, function(index, value){
							clsName+=(value+' ');
						});
					}else if(typeof cls=='string'){
						clsName=cls;
					}else {
						alert("cls为数组形式:['class1','class2',...,'classn']或字符串形式:'class1 class2 ... classn'");
					}
					return clsName;
				}
				var btn_tmpl=function(){
					var btns="";
					$.each(opts.btns, function(index, value){
						btns+='<button id="btn_'+index+'" class="dialog_btns '+cls_tmpl(value.cls)+'">'+value.text+'</button>';
					});
					return btns;
				}
				var wrap_tmpl='<div id='+opts.id+' class="dialog '+cls_tmpl(opts.cls)+'">'+
									'<div id="dialog_btns">'+btn_tmpl()+'</div>'+
								'</div>';
				$("body").append($(wrap_tmpl));
				if (opts.txt) {
					$("#J_dialog").prepend('<h1>'+opts.txt+'</h1>');
				}

				var add_html=function(html){
					if($("#J_dialog h1").length) {
						$("#J_dialog h1").after(html);
					}else {
						$("#J_dialog").prepend(html);
					}
				}
				if(opts.html) {
					if(typeof opts.html=="object") {
						var html_clone=opts.html.clone();
						add_html(html_clone);
						// alert(typeof opts.html.clone());
						if(html_clone.length) {
							html_clone.css({
								'display' : 'block'
							});
						}
						
					}else {
						add_html(opts.html);
					}	
				}
				dialog=$("#J_dialog");
				if(dialog.length&&opts.model) {
					$.fn.model();
					dialog.center();	
					// dialog.J_animate();			
				}
				// var btns_event=function(){
				// 	$.each(opts.btns, function(index, value){
				// 		$('#btn_'+index).bind("click",function(){
				// 			$("#J_dialog").hide();
				// 			if(opts.model) {
				// 				me.unmodel();
				// 			}
				// 			if(value.callback) {
				// 				value.callback();
				// 			}
				// 		});
				// 	});
				// }
				// btns_event();
				(function(){
					$.each(opts.btns, function(index, value){
						$('#btn_'+index).bind("click",function(){
							$("#J_dialog").remove();
							if(opts.model) {
								$.fn.unmodel();
							}
							if(value.callback) {
								value.callback();
							}
						});
					});
				})();
				// $(".confirm").bind('click', function(){
				// 	var callback=opts.btns[0].callback;
				// 	$("#J_dialog").hide();
				// 	if(opts.model) {
				// 		me.unmodel();
				// 	}
				// 	if(callback) {
				// 		callback();
				// 	}
				// });
				// $(".cancel").bind('click', function(){
				// 	var callback=opts.btns[1].callback;
				// 	$("#J_dialog").hide();
				// 	if(opts.model) {
				// 		me.unmodel();
				// 	}
				// 	if(callback) {
				// 		callback();
				// 	}
				// });
			}
		},
		model : {},
		J_animate : {
			count: 0,
			arr: [1,0]
		}
	});
	$.fn.extend({
		model : function(options){
			var mask=$(".J_mask");
			if(!mask.length) {
				var defaults={
					backgroundColor:'#000',
					Zindex:'999',
					opacity:'0.4',
					animate : true
				};
				var opts=$.model.opts=$.extend({}, defaults, options);
				//this is a jquery obj;
				var me=this;				
				// alert(this);
				this.each(function(index, value){
					//value is a DOM obj;
					$(value).css({
						"z-index" : parseInt(opts.Zindex) + 1
					});
				});
				var tmpl="<div class='J_mask'>"+
							"</div>";
				$("body").prepend($(tmpl));
				mask=$(".J_mask");
				//css 样式无法添加到动态生成的元素上么？可以，先判断动态元素的存在，然后添加css样式
				if(mask.length) {
					mask.css({
						"backgroundColor" : opts.backgroundColor,
						"z-index" : opts.Zindex
					});
					if (opts.animate) {
						mask.addClass("animate");
					} else {
						mask.css({
							"opacity" : opts.opacity
						});
					}
				}
			}else {
				mask.show();
			}
			return this;
		},
		unmodel : function(options){
			var mask=$(".J_mask");
			if(mask.length) {
				if ($.model.opts.animate) {
					mask.fadeOut(500);
				}else {
					mask.hide();
				}
			}
			return this;
		},
		center : function(){
			var defaults={
				position : 'fixed',
				top : '50%',
				left : '50%'	
			};
			var set_css=function(obj){
				obj.each(function(index, value){
					var height=value.offsetHeight;
					var width=value.offsetWidth;
					$(value).css({
						'position' : defaults.position,
						'top' : defaults.top,
						'left' : defaults.left,
						'margin-top' : -parseInt(height)/2+"px",
						'margin-left' : -parseInt(width)/2+"px"
					});
				});

			}
			if(this.parent().attr("id")=="J_animate") {
				set_css($("#J_animate"));
			}else {
				set_css(this);
			}
			return this;
		},
		J_animate : function(options){
			var count=$.J_animate.count;
			var defaults={
				position : 'fixed',
				top : '50%',
				left: '50%',
				boxSizing : 'border-box'
			}
			var opts=$.extend({}, defaults, options);
			this.each(function(index, value) {
				var me=$(value);
				var height=me.get(0).offsetHeight;
				// alert(height);
				var width=me.get(0).offsetWidth;
				
				if($.inArray(me, $.J_animate.arr)==-1) {
					alert($.J_animate.arr);
					me.wrap($("<div id='J_animate"+count+"'></div>"));
				}
				
				var J_animate=$("#J_animate"+count);
				if(J_animate.length) {
					
					J_animate.css({
						'overflow' : 'hidden',
						'display' : 'inline-block',
						'height' : '0',
						'width' : width,
						'position' : opts.position,
						'top' : opts.top,
						'left' : opts.left,
						'margin-left' : -parseInt(width)/2+"px",
						'boxSizing' : opts.boxSizing,
						'background-color' : opts.backgroundColor,
						'z-index' : 10000
					});

				J_animate.animate({
					height : height,
					marginTop : -parseInt(height)/2+"px"
				},1000,'swing');	
			}
			$.J_animate.arr.push(me);
		});
			$.J_animate.count++;
	}
	});
})(jQuery);