/**
 * Created by Administrator on 2017/3/9.
 */
(function ($) {

    var methods = {
        init: function (options) {
            var o = $.extend({
                year: 0,
                month: -1,
                gou: moudle.urlConfig.url + '/images/ca_gou.png'
            }, options || {});
            var self = this;
            self.addClass("sign_calendar").data('ca', o);
            methods._draw.call(self);
            return self;
        },
        test: function (opt) {
//			console.log(this.data('ca'));
            return this;
        },
        gety: function () {
//			console.log(this);
//			console.log(this.data('ca'));
            return this.data('ca').year;
        },
        _draw: function () {
            var o = this.data('ca');
            var self = this;
            //draw title
            this.html('');
            this.append(
                "<div class='calendar_title'>" +
                "<a class='weekend'>周日</a>" +
                "<a>周一</a>" +
                "<a>周二</a>" +
                "<a>周三</a>" +
                "<a>周四</a>" +
                "<a>周五</a>" +
                "<a class='weekend'>周六</a></div>"
            );

            //draw date
            this.append("<div class='date'></div>");
            var statr = 0;
            var end = 0;

            for (var i = 0; i < 35; i++) {
                self.find(".date").append('<a></a>');
            }

            var date = new Date(o.year, o.month, 1);
            var dd = new Date(o.year, o.month + 1, 0);
            statr = date.getDay();
            end = statr + dd.getDate();

            if (end > 35) {
                for (var i = 0; i < 7; i++) {
                    self.find(".date").append('<a></a>');
                }
            }

            self.find(".date").find("a").each(function (index, item) {
                if (index >= statr && index < end) {
                    $(item).html('<p class=\"date_num\">' + (index - statr + 1) + '</p>' + '<p class=\"month\">' + (o.month + 1) + '月</p>');
                }
            });

            o.start = statr;
            o.end = end;
            o.hasDraw = true;
        },
        setCoin: function (date, coin) {
            var o = this.data('ca');

            if (o == null) {
                return
            }

            var self = this;
            var arr = self.find(".date a");
            var item = $(arr[date + o.start - 1]);

            // 避免重复打勾
            if (item.find('img').length > 0) {
                return;
            }

            item.remove(".coin_text");
            item.append("<p class='coin_text'>+" + coin + "金币</p>");

            // gou
            item.remove("img");
            item.append("<img class='gou' src='" + o.gou + "'>")
        }
    };

    $.fn.signCalander = function (method) {
        // Method calling logic
        if (methods[method] && method.charAt(0) != '_') {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pagination');
        }
    };

})(jQuery);
