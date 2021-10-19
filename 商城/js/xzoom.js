/*
 * author: ovsexia
 * version: 1.0.0
 * name: Xzoom
 * describe: 相册放大镜
 * License: Mozilla Public License Version 2.0
 */

;(function($){
  $.fn.xzoom = function(options){
    const defaults = {
      width: 500,          //宽度
      height: 500,         //高度
      zwidth: 600,         //放大后图片的尺寸
      mask: 100,           //遮罩大小
      zoom: 3,             //放大倍数
      scroll: false,       //是否卷轴显示
      thumbs: 4,           //一行显示缩略图数量
      thumbType: 'hover',  //缩略图操作方式
      thumbPad: 5,         //缩略图间距
      thumbBor: '',        //缩略图选中边框颜色
    };
    options = $.extend(defaults, options);

    let method = {};
    method.pageid = 1;

    //加载中
    method.load = function(parent){
      if(parent.find('.xzoom_load').length === 0){
        $('<div class="xzoom_load"><div class="xzoom_loadin"><span></span><span></span><span></span></div></div>').appendTo(parent);
      }
    };

    //关闭加载中
    method.loadClose = function(){
      $('.xzoom_load').remove();
    };

    method.enter = function(xzoom_show){
      let that = this;
      let xzoom_move = xzoom_show.find('.xzoom_move');
      let xzoom_mask = xzoom_show.find('.xzoom_mask');
      let xzoom_src = $(xzoom_show.find('img').get(0)).data('xzoom');
      if(!xzoom_src){
        xzoom_src = $(xzoom_show.find('img').get(0)).attr('src');
      }
      if(!xzoom_src){
        return false;
      }

      let offset = xzoom_show.offset();
      let xzoom_zoom = $('<div class="xzoom_zoom"></div>').appendTo('body');
      xzoom_zoom.css({
        minWidth: options.zwidth + 'px',
        top: offset.top + 'px',
        left: (offset.left + options.width + 15) + 'px',
      });
      that.load(xzoom_zoom);

      let img = new Image();
      img.src = xzoom_src;
      img.onload = function(){
        that.loadClose();
        ////////////////////////////////////
        let thisimg = this;

        //大图显示
        $('<img src="' + thisimg.src + '" style="visibility:hidden; width:' + options.zwidth + 'px;" />').appendTo(xzoom_zoom);
        let zh = xzoom_zoom.height();
        let xzoom_zoomin = $('<div class="xzoom_zoomin"><img src="' + thisimg.src + '" style="position:relative; z-index:2; width:'+ (options.zwidth * options.zoom) + 'px; height:' + (zh * options.zoom) + 'px;" /></div>').appendTo(xzoom_zoom);

        //图片缓存
        if($('body').find('.xzoom_imgli').length === 0){
          $('body').append('<div class="xzoom_imgli" style="width:0; height:0; overflow:hidden; position:relative; z-index:-100;"></div>');
        }
        if($('body').find('.xzoom_imgli').find('img[src="' + thisimg.src + '"]').length === 0){
          $('body').find('.xzoom_imgli').append('<img src="' + thisimg.src + '" />');
        }

        //遮罩显示与移动
        let mw = xzoom_mask.width();
        let mh = xzoom_mask.height();

        xzoom_mask.show();
        xzoom_move.on('mousemove', function(e){
          let x = e.offsetX - (mw / 2);
          let y = e.offsetY - (mh / 2);
          if(x < 0){
            x = 0;
          }
          if(x > options.width - mw){
            x = options.width - mw;
          }
          if(y < 0){
            y = 0;
          }
          if(y > options.height - mh){
            y = options.height - mh;
          }
          xzoom_mask.css({top: y, left: x});

          let newx = x / (options.width - mw) * ((options.zwidth * options.zoom) - options.zwidth) * -1;
          let newy = y / (options.height - mh) * ((zh * options.zoom) - zh) * -1;
          xzoom_zoomin.css({
            top: newy,
            left: newx,
          });
        });
        ////////////////////////////////////
      }
    };

    method.leave = function(xzoom_show){
      let xzoom_move = xzoom_show.find('.xzoom_move');
      let xzoom_mask = xzoom_show.find('.xzoom_mask');
      xzoom_move.off('mousemove');
      xzoom_mask.hide();
      $('.xzoom_zoom').remove();
    };

    //计算滚动距离
    method.pagepx = function(type, li, prev, next){
      let that = this;
      let pageid = that.pageid;

      if(type === 'prev'){
        pageid--;
        if(pageid < 1){
          pageid = 1;
        }
      }else if(type === 'next'){
        pageid++;
        if(pageid > li.length){
          pageid = li.length;
        }
      }
      if(pageid >= li.length - options.thumbs + 1){
        pageid = li.length - options.thumbs + 1;
        next.addClass('xon');
      }
      if(pageid === 1){
        prev.addClass('xon');
      }
      if(method.pageid !== pageid){
        if(type === 'prev'){
          next.removeClass('xon');
        }else if(type === 'next'){
          prev.removeClass('xon');
        }
      }
      method.pageid = pageid;

      let onli = li.get(pageid - 1).offsetLeft;
      let px = '0';
      px = ((onli) * -1) + 'px';
      return px;
    };

    this.each(function(){
      let that = $(this);

      //添加css样式
      let xzoom_show = that.find('.xzoom_show');
      let xzoom_img = xzoom_show.find('img');
      let xzoom_thumb = that.find('.xzoom_thumb');
      xzoom_show.css({
        width: options.width+'px',
        height: options.height+'px',
        position: 'relative',
        overflow: 'hidden',
      });
      if(xzoom_thumb.length > 0){
        xzoom_thumb.css({
          width: options.width+'px',
        });
      }

      //添加遮罩
      $('<div class="xzoom_mask" style="width:' + options.mask + 'px; height:' + options.mask + 'px;"></div>').appendTo(xzoom_show);
       $('<div class="xzoom_move"></div>').appendTo(xzoom_show);

      //放大
      xzoom_show.on('mouseenter', function(){
        method.enter(xzoom_show);
      });
      //还原
      xzoom_show.on('mouseleave', function(){
        method.leave(xzoom_show);
      });

      //替换大图
      if(xzoom_thumb.find('li').length > 0){
        let li = xzoom_thumb.find('li');
        let thumbType = 'mouseenter';
        if(options.thumbType === 'click'){
          thumbType = 'click'
        }
        li.append('<span class="xzoom_bor"></span>');

        $(li[0]).addClass('xon');
        if(options.thumbBor){
          $(li[0]).find('.xzoom_bor').css('border-color', options.thumbBor);
        }
        li.on(thumbType, function(){
          let src = $(this).find('img').attr('src');
          let xzoom = $(this).find('img').data('xzoom');
          xzoom_img.attr('src', src);
          if(xzoom){
            xzoom_img.data('xzoom', xzoom);
          }
          $(this).addClass('xon').siblings().removeClass('xon');
          if(options.thumbBor){
            $(this).find('.xzoom_bor').css('border-color', options.thumbBor).siblings().find('.xzoom_bor').css('border-color', '');
          }
        });

        //卷轴显示
        if(options.scroll === true){
          xzoom_thumb.find('.xzoom_thumbin').addClass('xon');
        }

        let ulwidth = xzoom_thumb.find('.xzoom_thumbin').width();
        ulwidth = ulwidth - (options.thumbPad * (options.thumbs - 1));
        li.each(function(key){
          let flag = true;
          if((key + 1) % options.thumbs === 0){
            flag = false;
          }
          $(this).css({
            width: (ulwidth / options.thumbs) + 'px',
            marginRight: (options.scroll === true ? options.thumbPad + 'px' : (flag === true ? options.thumbPad + 'px' : '0')),
            marginBottom: (options.scroll === true ? '0' : options.thumbPad + 'px'),
          });
        });

        //点击滚动
        if(options.scroll === true){
          let xzoom_thumb_ul = xzoom_thumb.find('.xzoom_thumbin ul');
          xzoom_thumb_ul.css('width', '4000px');

          let xzoom_prev = that.find('.xzoom_prev');
          let xzoom_next = that.find('.xzoom_next');

          if(li.length > options.thumbs){
            xzoom_prev.on('click', function(){
              let px = method.pagepx('prev', li, xzoom_prev, xzoom_next);
              xzoom_thumb_ul.css('transform', 'translateX(' + px + ')');
            }).addClass('xon');

            xzoom_next.on('click', function(){
              let px = method.pagepx('next', li, xzoom_prev, xzoom_next);
              xzoom_thumb_ul.css('transform', 'translateX(' + px + ')');
            });
          }else{
            xzoom_prev.addClass('xon');
            xzoom_next.addClass('xon');
          }
        }else{
          that.find('.xzoom_prev, .xzoom_next').hide();
        }
      }
    });
    return $(this);
  }
})(jQuery);