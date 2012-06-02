/*********************************************************************************************************
* Author : Michael Henry Pantaleon
* Email  : michaelhenry119@yahoo.com.ph
*          admin@michaelhenrypantaleon.com
* Website : www.michaelhenrypantaleon.com
* Description : My Image Preloader
* Create Date : April 05 2011
* Modified Date : May 12 2011
* version : 1.01
* Package : myImagePreloader
* Requirements :
* --------  latest jquery
* 
* OPTIONS :
*    Events : onLoaded, onFinished, onError
*    Properties : allowFadeIn, fadeInTimeOut
*
* Copyright (C) 2011  Michael Henry Pantaleon
* 
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
********************************************************************************************************
*/

(function ($) {

    $.fn.myImagePreloader = function (params) {
        var defaults = {
            allowFadeIn: false,
            fadeInTimeOut: 2000,
            onLoaded: null,
            onFinished :null,
            onError: null
        }
        var params = $.extend(defaults, params);
        var objx = $(this);
        var imb = objx.length;
        for (var i = 0; i < imb; i++) {
            var oih = objx.eq(i);
            imgPreLoader(oih, oih.attr('data-url'));
        }

        function imgPreLoader(oc, su) {
            var img = new Image();
            if (params.allowFadeIn) {
                $(img).load(function () {
                    oc.removeClass("img-preloader").append(this);
                    if ($.isFunction(params.onLoaded)) {
                        params.onLoaded.apply();
                    }
                }).attr('src', su).attr('width', oc.width()).attr('height', oc.height()).fadeIn(params.fadeInTimeOut, function () { });
                $(img).error(function () {
                    oc.removeClass("img-preloader").addClass("img-error").fadeIn(params.fadeInTimeOut, function () { });
                    if ($.isFunction(params.onError)) {
                        params.onError.apply();
                    }
                });
            } else {
                $(img).load(function () {
                    oc.removeClass("img-preloader").append(this);
                    if ($.isFunction(params.onLoaded)) {
                        params.onLoaded.apply();
                    }
                }).attr('src', su).attr('width', oc.width()).attr('height', oc.height());
                $(img).error(function () {
                    oc.removeClass("img-preloader").addClass("img-error");
                    if ($.isFunction(params.onError)) {
                        params.onError.apply();
                    }
                });
            }

        }

        if ($.isFunction(params.onFinished)) {
            params.onFinished.apply();
        }

    }




})(jQuery);