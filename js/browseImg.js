$(function(){
	var i=0,//大图编号
		len=img.length,//img数组的长度
		cur=0;//当前图片编号
		j=9,//默认显示小图个数
		page=0,//小图的页码
		$s_next=$('#smallImg-next'),//小图下一页
		$s_pre=$('#smallImg-pre'),//小图上一页
		box=$('#smallImg-box').width(),//显示的长度
		$ul=$('#smallImg-ul'),//小图外层
		$imgLi=$ul.find('li'),//小图li
		html=_html='';//存放载入的代码
		last=false;//是否最后一页
		first=true;//是否第一页

	//大圖初始化	
	$('#detailImg-box').append('<a href=\"'+img[0].href+'\" class=\"detailImg_1\"><img alt=\"'+img[0].alt+'\" src=\"'+img[i].src+'\"></a><p>'+img[i].title+'</p>');
	//小圖初始化
	for(var k=0;k<j;k++){
		var _k=k%len;
		s_html(_k);
		html+=h;
	}
	$ul.append(html);

	//大图	
	$('#detailImg-next').click(function(){
		if(i >= len - 1 ){
		   layer.msg('此照片已是最后一张了...', {icon: 0,time: 1000});
	       return;
		}
		++i;
		detailImg_click($s_next,i,len);
	})
	$('#detailImg-pre').click(function(){
		if(i===0){
		   layer.msg('此照片已是第一张哦...', {icon: 0,time: 1000});
	       return;
		}
		--i;
		detailImg_click($s_pre,i,len);
	})
	$('.smallImg_1').addClass('cur');	
	//小图下一页
	$('#smallImg-next').click(function(){
		smallImgNext();
	})
	//小图上一页
	$('#smallImg-pre').click(function(){
		smallImgPre();	
	})
	//点击小图
	$('#smallImg-ul li').click(function(){
		var _this=$(this);
		i=_this.attr('class').replace(/[^0-9]/ig,'')-1;
		img_info(i);
		s_a_r(_this,'cur');
		cur=i;
	});

function smallImgPre(p) {
	if(len <= j){
		  layer.msg('本相册只有一页...', {icon: 0,time: 1000});
		  return;
		}
		if(first || page === 0){
		  layer.msg('已是第一页了...', {icon: 0,time: 1000});
		  return;
		}
		last = false;
		if(!$ul.is(':animated')){
			p != null && (page = p);
			page--;
			var pa = page + 1;
			// var a=(page-1)*j,_a,c;
			var a = pa * j - 1,_a,c;
			for(var k=0;k<j;k++,a--){
				smallImg_click(a,_a,len,i);
				_html=h+_html;
			}
			$ul.prepend(_html).css({'right':box,'left':'auto'});
			$ul.animate({right:0},1000,function(){
				$ul.find('li:gt('+(j-1)+')').detach();//删除后9个li,从8开始
				_html='';
			});
			$('#smallImg-ul li').click(function(){
				var _this=$(this);
				i=_this.attr('class').replace(/[^0-9]/ig,'')-1;
				img_info(i);
				s_a_r(_this,'cur');
				cur=i;
			})
		}
}

function smallImgNext(p) {
	if(len <= j){
		  layer.msg('本相册只有一页...', {icon: 0,time: 1000});
		  return;
		}
	if(last){
	   layer.msg('已是最后一页了...', {icon: 0,time: 1000});
	   return;
	}
	if(!$ul.is(':animated')){
		p != null ? page = p : page++;
		first=false;
		var a=page*j,_a,c;
		for(var k=0;k<j;k++,a++){
			last = smallImg_click(a,_a,len,i);
			if(!last){
			   _html+=h;
			}
		}
		$ul.append(_html);
		$ul.css({'left':0,'right':'auto'});
		$ul.animate({left:-box},1000,function(){
			$ul.find('li:lt('+j+')').detach();
			$ul.css('left',0);
			_html='';
		});//动画执行后,再删除前9个li,将left设回0
		$('#smallImg-ul li').click(function(){//三处一样，不知道这个要怎么优化？？？
			var _this=$(this);
			i=_this.attr('class').replace(/[^0-9]/ig,'')-1;
			img_info(i);
			s_a_r(_this,'cur');
			cur=i;
		})
	}
}

//大图左右点击
function i_cur(i,len){
	i=i%len;
	if(i<0){
		i=len+i;
	}
	return i;	
}
function detailImg_click($pn,i,len){
	if(i<0){
		layer.msg('此照片已是第一张哦...', {icon: 0,time: 1000});
	    return;
	}
	if(i>len-1){
		layer.msg('此照片是最后一张了...', {icon: 0,time: 1000});
	    return;
	}
	i_cur(i,len);
	img_info(i);
	var imgCur=$('.smallImg_'+(i+1));
	if(!imgCur.html()){
		var num = $("#smallImg-ul").find("li:first-child").attr("class").replace(/[^0-9]+/g, '');
		// var p = Math.floor((i+1)/ 9) + 1;
		var n = (i+1)/ 9;
		isInteger(n)? p = n : p = Math.floor(n) + 1;
		// var ne = num / 9;
		// isInteger(ne)? pp = ne : pp = Math.floor(ne) + 1;
		num > (i+1) ? smallImgPre(p) : smallImgNext(p - 1);
	} 
	s_a_r($('.smallImg_'+(i+1)),'cur');//小图选中
}

});

//大图图片信息
function img_info(i){
	while (i < 0) return;
	var href=img[i].href,
		alt=img[i].alt,
		src=img[i].src,
		title=img[i].title,
		$main=$('#detailImg-box');
	$main.find('a').attr({'href':href,'class':'detailImg_'+(i+1)});
	$main.find('img').attr({'alt':alt,'src':src});
	$main.find('p').text(title);
}
function s_a_r(o,c){
	o.addClass(c).siblings().removeClass(c);	
}

//小图左右点击
function smallImg_click(a,_a,len,i){
	if(a>=len)return true;
	_a=a;
	_a=a%len;
	if(_a<0){
		_a+=len;
	}
	c=_a==i?'cur':'';
	s_html(_a,c);
}
function s_html(_a,c){
	return h='<li class=\"smallImg_'+(_a+1)+' '+c+'\"><a><img alt=\"'+img[_a].alt+'\" src=\"'+img[_a].smallSrc+'\"></a></li>';
}
function isInteger(obj) {
 return obj%1 === 0
}

/*----自定义数据-----------*/
var img=[
	{
		'href':'#',
		'alt':'图片1',
		'src':'images/image/1_b.jpg',
		'smallSrc':'images/image/1_s.jpg',
		'title':'标题111'
	},{
		'href':'#',
		'alt':'图片2',
		'src':'images/image/2_b.jpg',
		'smallSrc':'images/image/2_s.jpg',
		'title':'标题222'
	},{
		'href':'#',
		'alt':'图片3',
		'src':'images/image/3_b.jpg',
		'smallSrc':'images/image/3_s.jpg',
		'title':'标题333'
	},{
		'href':'#',
		'alt':'图片4',
		'src':'images/image/4_b.jpg',
		'smallSrc':'images/image/4_s.jpg',
		'title':'标题444'
	},{
		'href':'#',
		'alt':'图片5',
		'src':'images/image/5_b.jpg',
		'smallSrc':'images/image/5_s.jpg',
		'title':'标题555'
	},{
		'href':'#',
		'alt':'图片6',
		'src':'images/image/6_b.jpg',
		'smallSrc':'images/image/6_s.jpg',
		'title':'标题666'
	},{
		'href':'#',
		'alt':'图片7',
		'src':'images/image/7_b.jpg',
		'smallSrc':'images/image/7_s.jpg',
		'title':'标题777'
	},{
		'href':'#',
		'alt':'图片8',
		'src':'images/image/8_b.jpg',
		'smallSrc':'images/image/8_s.jpg',
		'title':'标题888'
	},{
		'href':'#',
		'alt':'图片9',
		'src':'images/image/9_b.jpg',
		'smallSrc':'images/image/9_s.jpg',
		'title':'标题999'
	},{
		'href':'#',
		'alt':'图片10',
		'src':'images/image/10_b.jpg',
		'smallSrc':'images/image/10_s.jpg',
		'title':'标题10101010'	
	},{
		'href':'#',
		'alt':'图片11',
		'src':'images/image/11_b.jpg',
		'smallSrc':'images/image/11_s.jpg',
		'title':'标题11'
	},{
		'href':'www.baidu1.com',
		'alt':'图片12',
		'src':'images/image/12_b.jpg',
		'smallSrc':'images/image/12_s.jpg',
		'title':'标题12'
	},{
		'href':'#',
		'alt':'图片13',
		'src':'images/image/13_b.jpg',
		'smallSrc':'images/image/13_s.jpg',
		'title':'标题13'
	},{
		'href':'#',
		'alt':'图片14',
		'src':'images/image/14_b.jpg',
		'smallSrc':'images/image/14_s.jpg',
		'title':'标题14'
	},{
		'href':'#',
		'alt':'图片15',
		'src':'images/image/15_b.jpg',
		'smallSrc':'images/image/15_s.jpg',
		'title':'标题15'
	},{
		'href':'#',
		'alt':'图片16',
		'src':'images/image/16_b.jpg',
		'smallSrc':'images/image/16_s.jpg',
		'title':'标题16'
	},{
		'href':'#',
		'alt':'图片17',
		'src':'images/image/17_b.jpg',
		'smallSrc':'images/image/17_s.jpg',
		'title':'标题17'
	},{
		'href':'#',
		'alt':'图片18',
		'src':'http://hiphotos.baidu.com/web929/pic/item/7f22b12371155d49ac34dea8.jpg',
		'smallSrc':'http://hiphotos.baidu.com/web929/pic/item/7f22b12371155d49ac34dea8.jpg',
		'title':'标题18'
	},{
		'href':'#',
		'alt':'图片19',
		'src':'http://www.ad-1.cn/file/54999.png',
		'smallSrc':'http://www.ad-1.cn/file/54999.png',
		'title':'标题19'
	},{
		'href':'#',
		'alt':'图片20',
		'src':'images/image/4_b.jpg',
		'smallSrc':'images/image/4_s.jpg',
		'title':'标题4xx'
	}
]


