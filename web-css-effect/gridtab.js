/*
  Version: 2.1.1
  Author: Gopal Raju
  Website: http://www.productivedreams.com
  Docs: https://gopalraju.github.io/gridtab
  Repo: https://gopalraju.github.io/gridtab
  Issues: https://gopalraju.github.io/gridtab/issues
  */
  !function(t, o) {
    function n(o, n) {
        var l = this;
        l.element = o,
        l.options = t.extend(!0, {}, i, n),
        l.defaults = i,
        l.name = s,
        l.cssRules = "",
        l.breakpoints = [],
        l.grids = [],
        l.activeTab = l.options.config.activeTab - 1,
        l.tabs = t(l.element).find("> dt"),
        l.contents = t(l.element).find("> dd"),
        l.init(),
        l.generateStylesheet(l.cssRules),
        e++
    }
    var e = 0
      , s = "gridtab"
      , i = {
        grid: 4,
        borderWidth: 2,
        tabBorderColor: "#ddd",
        tabPadding: 25,
        contentBorderColor: "#ddd",
        contentPadding: 35,
        contentBackground: "#fff",
        activeTabBackground: "#fff",
        responsive: null,
        selectors: {
            tab: ">dt",
            closeButton: ".gridtab__close",
            nextArrow: ".gridtab__next.gridtab__arrow",
            prevArrow: ".gridtab__prev.gridtab__arrow",
            disabledArrow: ".is-disabled"
        },
        config: {
            layout: "grid",
            keepOpen: !1,
            speed: 500,
            activeTab: 0,
            showClose: !1,
            showArrows: !1,
            scrollToTab: !1,
            rtl: !1
        },
        callbacks: {
            open: !1,
            close: !1
        }
    };
    n.prototype.init = function() {
        var o = this;
        t(o.element).addClass("gridtab gridtab--" + e),
        o.options.config.rtl && t(o.element).attr("dir", "rtl"),
        o.setTabOrder(),
        o.showControls(),
        o.addCssRules(o.options.grid, o.options.borderWidth, o.options.tabPadding, o.options.tabBorderColor, o.options.contentPadding, o.options.contentBorderColor, o.options.contentBackground, o.options.activeTabBackground, null),
        null !== o.options.responsive ? o.responsiveBreakpoints() : o.setContentOrder(o.options.grid),
        o.activeTab > -1 && o.activeTab < o.tabs.length && o.slideContent(o.tabs[o.activeTab], !1, !1),
        t(o.element).on("click", o.options.selectors.tab, function(n) {
            t(this).attr("href") && n.preventDefault(),
            n.stopPropagation(),
            n.stopImmediatePropagation(),
            o.slideContent(t(this).closest("dt"), !1, o.options.config.scrollToTab)
        })
    }
    ,
    n.prototype.showControls = function() {
        var o = this;
        if (o.options.config.showClose || o.options.config.showArrows) {
            var n = t('<div class="gridtab__controls"></div>').appendTo(o.contents);
            if (o.options.config.showClose && t('<a class="' + o.options.selectors.closeButton.replace(/\./g, " ") + '" href="#">Close</a>').appendTo(n),
            o.options.config.showArrows && o.contents.length && o.contents.length >= 2) {
                var e = o.options.selectors.nextArrow.replace(/\./g, " ")
                  , s = o.options.selectors.prevArrow.replace(/\./g, " ")
                  , i = o.options.selectors.disabledArrow.replace(/\./g, " ")
                  , l = '<a class="' + s + '" title="previous" href="#">Prev</a>'
                  , a = '<a class="' + e + '" title="next" href="#">Next</a>'
                  , r = '<span class="' + s + " " + i + '">Prev</span>'
                  , d = '<span class="' + e + " " + i + '">Next</span>';
                o.contents.length > 2 && t(l + a).appendTo(o.contents.slice(1, -1).find(n)),
                t(l + d).appendTo(t(o.contents[o.contents.length - 1]).find(n)),
                t(r + a).appendTo(t(o.contents[0]).find(n))
            }
            t(n).on("click", "a", function(n) {
                n.preventDefault();
                var i = o.contents.index(t(this).parent().parent());
                t(this).hasClass(s) ? o.slideContent(o.tabs[i - 1], !1, o.options.config.scrollToTab) : t(this).hasClass(e) ? o.slideContent(o.tabs[i + 1], !1, o.options.config.scrollToTab) : o.slideContent(o.tabs[i], !0, !1)
            })
        }
    }
    ,
    n.prototype.setContentOrder = function(t) {
        for (var o = this, n = Math.ceil(o.contents.length / t), e = 0; n > e; e++) {
            var s = e + 1;
            o.contents.slice(e * t, t * s).css({
                order: "" + s * t,
                "flex-order": "" + s * t
            })
        }
    }
    ,
    n.prototype.setTabOrder = function() {
        var o = this;
        o.tabs.each(function(o) {
            t(this).css({
                order: "" + o,
                "flex-order": "" + o
            })
        })
    }
    ,
    n.prototype.addCssRules = function(t, o, n, s, i, l, a, r, d) {
        var c = this;
        if (null !== t || null !== o || null !== n || null !== s || null !== l || null !== i || null !== a || null !== r) {
            var p = ""
              , u = "";
            null !== t && (u = Math.floor(100 / t * 100) / 100),
            (null !== t || null !== o || null !== s || null !== n) && (null !== o && (p += ".gridtab--" + e + "{padding:" + o + "px 0 0 " + o + "px;}"),
            p += ".gridtab--" + e + " > dt{",
            null !== o && (p += "margin:-" + o + "px 0 0 -" + o + "px;"),
            null !== t && (p += "min-width:calc(" + u + "% + " + o + "px);width:calc(" + u + "% + " + o + "px);"),
            null !== o && (p += "border-width:" + o + "px;"),
            null !== n && (p += "padding:" + n + "px;"),
            null !== s && (p += "border-color:" + s + ";"),
            p += "}"),
            null !== r && (p += ".gridtab--" + e + " >dt.is-active{background:" + r + ";}"),
            "tab" == c.options.config.layout && null !== r && null !== o && (p += ".gridtab--" + e + " >dt.is-active:after{background:" + r + ";height:" + o + "px;bottom:-" + o + "px;}"),
            (null !== l || null !== o || null !== a || null !== i) && (p += ".gridtab--" + e + ">dd{",
            p += "min-width:calc(" + u * t + "% + " + o + "px);max-width:calc(" + u * t + "% + " + o + "px);",
            null !== o && (p += "margin:-" + o + "px 0 0 -" + o + "px !important;border-width:" + o + "px;"),
            null !== l && (p += "border-color:" + l + ";"),
            null !== i && (p += "padding:" + i + "px;"),
            null !== a && (p += "background:" + a + ";"),
            p += "}"),
            c.cssRules += null !== d ? "@media (max-width:" + d + "px){" + p + "}" : p
        }
    }
    ,
    n.prototype.generateStylesheet = function(o) {
        t("head").append("<style>" + o + "</style>")
    }
    ,
    n.prototype.responsiveBreakpoints = function() {
        function t() {
            var t = [];
            e.filter(function(o) {
                o.matches && t.push(parseInt(o.media.replace(/[^\d.]/g, "")))
            });
            var o = t.length ? n.grids[n.breakpoints.indexOf(Math.min.apply(null, t))] : n.options.grid;
            n.setContentOrder(o)
        }
        var n = this;
        if (n.options.responsive && n.options.responsive.length) {
            n.options.responsive.sort(function(t, o) {
                return parseFloat(o.breakpoint) - parseFloat(t.breakpoint)
            });
            var e = [];
            for (var s in n.options.responsive) {
                var i = n.options.responsive[s].settings
                  , l = i.grid || n.options.grid
                  , a = i.borderWidth || n.options.borderWidth
                  , r = i.tabBorderColor || null
                  , d = i.tabPadding || null
                  , c = i.activeTabBackground || null
                  , p = i.contentPadding || null
                  , u = i.contentBorderColor || null
                  , b = i.contentBackground || null
                  , h = n.options.responsive[s].breakpoint || null;
                n.addCssRules(l, a, d, r, p, u, b, c, h),
                n.breakpoints.push(h),
                n.grids.push(l),
                e.push(o.matchMedia("(max-width:" + n.breakpoints[s] + "px)")),
                t(o.matchMedia("(max-width:" + n.breakpoints[s] + "px)"))
            }
            for (var s = 0; s < e.length; s++)
                e[s].addListener(t)
        }
    }
    ,
    n.prototype.scrollToTab = function() {
        var o = this
          , n = t("html, body");
        n.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() {
            n.stop()
        }),
        n.animate({
            scrollTop: t(o.element).find(".is-active").offset().top
        }, 1e3, function() {
            n.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove")
        })
    }
    ,
    n.prototype.slideContent = function(o, n, e) {
        var s = this
          , i = t(o)
          , l = t(s.element).find(">dt.is-active").not(o);
        if (!i.hasClass("is-disabled")) {
            if (l.length)
                s.tabs.addClass("is-disabled"),
                l.next().stop(!0).slideUp(s.options.config.speed, function() {
                    return l.removeClass("is-active"),
                    s.tabs.next().stop(!0),
                    s.options.callbacks.close && s.options.callbacks.close.call(this),
                    i.addClass("is-active").next().stop(!0).slideDown(s.options.config.speed, function() {
                        return s.options.callbacks.open && s.options.callbacks.open.call(this),
                        e && s.scrollToTab(),
                        s.tabs.removeClass("is-disabled"),
                        !1
                    }),
                    !1
                });
            else if (s.options.config.keepOpen && !n) {
                if (!i.hasClass("is-active"))
                    return i.addClass("is-active").next().stop(!0).slideDown(s.options.config.speed, function() {
                        s.options.callbacks.open && s.options.callbacks.open.call(this),
                        e && s.scrollToTab()
                    }),
                    !1
            } else
                s.tabs.addClass("is-disabled"),
                i.toggleClass("is-active").next().stop(!0).slideToggle(s.options.config.speed, function() {
                    return t(this).is(":hidden") ? s.options.callbacks.close && s.options.callbacks.close.call(this) : (s.options.callbacks.open && s.options.callbacks.open.call(this),
                    e && s.scrollToTab()),
                    s.tabs.removeClass("is-disabled"),
                    !1
                });
            return !1
        }
    }
    ,
    t.fn[s] = function(o) {
        return this.each(function() {
            t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new n(this,o))
        })
    }
}(jQuery, window, document);
