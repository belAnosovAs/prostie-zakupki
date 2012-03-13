/*	
 *	jQuery carouFredSel 5.5.0
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function ($) {
    if ($.fn.carouFredSel) return;
    $.fn.carouFredSel = function (y, z) {
        if (this.length == 0) {
            debug(true, 'No element found for "' + this.selector + '".');
            return this
        }
        if (this.length > 1) {
            return this.each(function () {
                $(this).carouFredSel(y, z)
            })
        }
        var A = this,
            $tt0 = this[0];
        if (A.data('cfs_isCarousel')) {
            var B = A.triggerHandler('_cfs_currentPosition');
            A.trigger('_cfs_destroy', true)
        } else {
            var B = false
        }
        A._cfs_init = function (o, b, c) {
            o = go_getObject($tt0, o);
            if (o.debug) {
                conf.debug = o.debug;
                debug(conf, 'The "debug" option should be moved to the second configuration-object.')
            }
            var e = ['items', 'scroll', 'auto', 'prev', 'next', 'pagination'];
            for (var a = 0, l = e.length; a < l; a++) {
                o[e[a]] = go_getObject($tt0, o[e[a]])
            }
            if (typeof o.scroll == 'number') {
                if (o.scroll <= 50) o.scroll = {
                    'items': o.scroll
                };
                else o.scroll = {
                    'duration': o.scroll
                }
            } else {
                if (typeof o.scroll == 'string') o.scroll = {
                    'easing': o.scroll
                }
            }
            if (typeof o.items == 'number') o.items = {
                'visible': o.items
            };
            else if (o.items == 'variable') o.items = {
                'visible': o.items,
                'width': o.items,
                'height': o.items
            };
            if (typeof o.items != 'object') o.items = {};
            if (b) opts_orig = $.extend(true, {}, $.fn.carouFredSel.defaults, o);
            opts = $.extend(true, {}, $.fn.carouFredSel.defaults, o);
            if (typeof opts.items.visibleConf != 'object') opts.items.visibleConf = {};
            if (opts.items.start == 0 && typeof c == 'number') {
                opts.items.start = c
            }
            C.upDateOnWindowResize = (opts.responsive);
            C.direction = (opts.direction == 'up' || opts.direction == 'left') ? 'next' : 'prev';
            var f = [
                ['width', 'innerWidth', 'outerWidth', 'height', 'innerHeight', 'outerHeight', 'left', 'top', 'marginRight', 0, 1, 2, 3],
                ['height', 'innerHeight', 'outerHeight', 'width', 'innerWidth', 'outerWidth', 'top', 'left', 'marginBottom', 3, 2, 1, 0]
            ];
            var g = f[0].length,
                dx = (opts.direction == 'right' || opts.direction == 'left') ? 0 : 1;
            opts.d = {};
            for (var d = 0; d < g; d++) {
                opts.d[f[0][d]] = f[dx][d]
            }
            var h = A.children();
            switch (typeof opts.items.visible) {
            case 'object':
                opts.items.visibleConf.min = opts.items.visible.min;
                opts.items.visibleConf.max = opts.items.visible.max;
                opts.items.visible = false;
                break;
            case 'string':
                if (opts.items.visible == 'variable') {
                    opts.items.visibleConf.variable = true
                } else {
                    opts.items.visibleConf.adjust = opts.items.visible
                }
                opts.items.visible = false;
                break;
            case 'function':
                opts.items.visibleConf.adjust = opts.items.visible;
                opts.items.visible = false;
                break
            }
            if (typeof opts.items.filter == 'undefined') {
                opts.items.filter = (h.filter(':hidden').length > 0) ? ':visible' : '*'
            }
            if (opts[opts.d['width']] == 'auto') {
                opts[opts.d['width']] = ms_getTrueLargestSize(h, opts, 'outerWidth')
            }
            if (ms_isPercentage(opts[opts.d['width']]) && !opts.responsive) {
                opts[opts.d['width']] = ms_getPercentage(ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth'), opts[opts.d['width']]);
                C.upDateOnWindowResize = true
            }
            if (opts[opts.d['height']] == 'auto') {
                opts[opts.d['height']] = ms_getTrueLargestSize(h, opts, 'outerHeight')
            }
            if (!opts.items[opts.d['width']]) {
                if (opts.responsive) {
                    debug(true, 'Set a ' + opts.d['width'] + ' for the items!');
                    opts.items[opts.d['width']] = ms_getTrueLargestSize(h, opts, 'outerWidth')
                } else {
                    opts.items[opts.d['width']] = (ms_hasVariableSizes(h, opts, 'outerWidth')) ? 'variable' : h[opts.d['outerWidth']](true)
                }
            }
            if (!opts.items[opts.d['height']]) {
                opts.items[opts.d['height']] = (ms_hasVariableSizes(h, opts, 'outerHeight')) ? 'variable' : h[opts.d['outerHeight']](true)
            }
            if (!opts[opts.d['height']]) {
                opts[opts.d['height']] = opts.items[opts.d['height']]
            }
            if (!opts.items.visible && !opts.responsive) {
                if (opts.items[opts.d['width']] == 'variable') {
                    opts.items.visibleConf.variable = true
                }
                if (!opts.items.visibleConf.variable) {
                    if (typeof opts[opts.d['width']] == 'number') {
                        opts.items.visible = Math.floor(opts[opts.d['width']] / opts.items[opts.d['width']])
                    } else {
                        var i = ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth');
                        opts.items.visible = Math.floor(i / opts.items[opts.d['width']]);
                        opts[opts.d['width']] = opts.items.visible * opts.items[opts.d['width']];
                        if (!opts.items.visibleConf.adjust) opts.align = false
                    }
                    if (opts.items.visible == 'Infinity' || opts.items.visible < 1) {
                        debug(true, 'Not a valid number of visible items: Set to "variable".');
                        opts.items.visibleConf.variable = true
                    }
                }
            }
            if (!opts[opts.d['width']]) {
                opts[opts.d['width']] = 'variable';
                if (!opts.responsive && opts.items.filter == '*' && !opts.items.visibleConf.variable && opts.items[opts.d['width']] != 'variable') {
                    opts[opts.d['width']] = opts.items.visible * opts.items[opts.d['width']];
                    opts.align = false
                }
            }
            if (opts.items.visibleConf.variable) {
                opts.maxDimention = (opts[opts.d['width']] == 'variable') ? ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth') : opts[opts.d['width']];
                if (opts.align === false) {
                    opts[opts.d['width']] = 'variable'
                }
                opts.items.visible = gn_getVisibleItemsNext(h, opts, 0)
            } else if (opts.items.filter != '*') {
                opts.items.visibleConf.org = opts.items.visible;
                opts.items.visible = gn_getVisibleItemsNextFilter(h, opts, 0)
            }
            if (typeof opts.align == 'undefined') {
                opts.align = (opts[opts.d['width']] == 'variable') ? false : 'center'
            }
            opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0);
            opts.items.visibleConf.old = opts.items.visible;
            opts.usePadding = false;
            if (opts.responsive) {
                if (!opts.items.visibleConf.min) opts.items.visibleConf.min = opts.items.visible;
                if (!opts.items.visibleConf.max) opts.items.visibleConf.max = opts.items.visible;
                opts.align = false;
                opts.padding = [0, 0, 0, 0];
                var j = $wrp.is(':visible');
                if (j) $wrp.hide();
                var k = ms_getPercentage(ms_getTrueInnerSize($wrp.parent(), opts, 'innerWidth'), opts[opts.d['width']]);
                if (typeof opts[opts.d['width']] == 'number' && k < opts[opts.d['width']]) {
                    k = opts[opts.d['width']]
                }
                if (j) $wrp.show();
                var m = cf_getItemAdjustMinMax(Math.ceil(k / opts.items[opts.d['width']]), opts.items.visibleConf);
                if (m > h.length) {
                    m = h.length
                }
                var n = Math.floor(k / m),
                    seco = opts[opts.d['height']],
                    secp = ms_isPercentage(seco);
                h.each(function () {
                    var a = $(this),
                        nw = n - ms_getPaddingBorderMargin(a, opts, 'Width');
                    a[opts.d['width']](nw);
                    if (secp) {
                        a[opts.d['height']](ms_getPercentage(nw, seco))
                    }
                });
                opts.items.visible = m;
                opts.items[opts.d['width']] = n;
                opts[opts.d['width']] = m * n
            } else {
                opts.padding = cf_getPadding(opts.padding);
                if (opts.align == 'top') opts.align = 'left';
                if (opts.align == 'bottom') opts.align = 'right';
                switch (opts.align) {
                case 'center':
                case 'left':
                case 'right':
                    if (opts[opts.d['width']] != 'variable') {
                        var p = cf_getAlignPadding(gi_getCurrentItems(h, opts), opts);
                        opts.usePadding = true;
                        opts.padding[opts.d[1]] = p[1];
                        opts.padding[opts.d[3]] = p[0]
                    }
                    break;
                default:
                    opts.align = false;
                    opts.usePadding = (opts.padding[0] == 0 && opts.padding[1] == 0 && opts.padding[2] == 0 && opts.padding[3] == 0) ? false : true;
                    break
                }
            }
            if (typeof opts.cookie == 'boolean' && opts.cookie) opts.cookie = 'caroufredsel_cookie_' + A.attr('id');
            if (typeof opts.items.minimum != 'number') opts.items.minimum = opts.items.visible;
            if (typeof opts.scroll.duration != 'number') opts.scroll.duration = 500;
            if (typeof opts.scroll.items == 'undefined') opts.scroll.items = (opts.items.visibleConf.variable || opts.items.filter != '*') ? 'visible' : opts.items.visible;
            opts.auto = go_getNaviObject($tt0, opts.auto, 'auto');
            opts.prev = go_getNaviObject($tt0, opts.prev);
            opts.next = go_getNaviObject($tt0, opts.next);
            opts.pagination = go_getNaviObject($tt0, opts.pagination, 'pagination');
            opts.auto = $.extend(true, {}, opts.scroll, opts.auto);
            opts.prev = $.extend(true, {}, opts.scroll, opts.prev);
            opts.next = $.extend(true, {}, opts.scroll, opts.next);
            opts.pagination = $.extend(true, {}, opts.scroll, opts.pagination);
            if (typeof opts.pagination.keys != 'boolean') opts.pagination.keys = false;
            if (typeof opts.pagination.anchorBuilder != 'function' && opts.pagination.anchorBuilder !== false) opts.pagination.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder;
            if (typeof opts.auto.play != 'boolean') opts.auto.play = true;
            if (typeof opts.auto.delay != 'number') opts.auto.delay = 0;
            if (typeof opts.auto.pauseOnEvent == 'undefined') opts.auto.pauseOnEvent = true;
            if (typeof opts.auto.pauseOnResize != 'boolean') opts.auto.pauseOnResize = true;
            if (typeof opts.auto.pauseDuration != 'number') opts.auto.pauseDuration = (opts.auto.duration < 10) ? 2500 : opts.auto.duration * 5;
            if (opts.synchronise) {
                opts.synchronise = cf_getSynchArr(opts.synchronise)
            }
            if (conf.debug) {
                debug(conf, 'Carousel width: ' + opts.width);
                debug(conf, 'Carousel height: ' + opts.height);
                if (opts.maxDimention) debug(conf, 'Available ' + opts.d['width'] + ': ' + opts.maxDimention);
                debug(conf, 'Item widths: ' + opts.items.width);
                debug(conf, 'Item heights: ' + opts.items.height);
                debug(conf, 'Number of items visible: ' + opts.items.visible);
                if (opts.auto.play) debug(conf, 'Number of items scrolled automatically: ' + opts.auto.items);
                if (opts.prev.button) debug(conf, 'Number of items scrolled backward: ' + opts.prev.items);
                if (opts.next.button) debug(conf, 'Number of items scrolled forward: ' + opts.next.items)
            }
        };
        A._cfs_build = function () {
            A.data('cfs_isCarousel', true);
            var a = {
                'textAlign': A.css('textAlign'),
                'float': A.css('float'),
       			'position': A.css('position'),
                'top': A.css('top'),
                'right': A.css('right'),
                'bottom': A.css('bottom'),
                'left': A.css('left'),
                'width': A.css('width'),
                'height': A.css('height'),
                'marginTop': A.css('marginTop'),
                'marginRight': A.css('marginRight'),
                'marginBottom': A.css('marginBottom'),
                'marginLeft': A.css('marginLeft')
            };
            switch (a.position) {
            case 'absolute':
                var b = 'absolute';
                break;
            case 'fixed':
                var b = 'fixed';
                break;
            default:
                var b = 'relative'
            }
            $wrp.css(a).css({
                'overflow': 'hidden',
                'position': b
            });
            A.data('cfs_origCss', a).css({
                'textAlign': 'left',
                'float': 'none',
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'marginTop': 0,
                'marginRight': 0,
                'marginBottom': 0,
                'marginLeft': 0
            });
            if (opts.usePadding) {
                A.children().each(function () {
                    var m = parseInt($(this).css(opts.d['marginRight']));
                    if (isNaN(m)) m = 0;
                    $(this).data('cfs_origCssMargin', m)
                })
            }
        };
        A._cfs_bind_events = function () {
            A._cfs_unbind_events();
            A.bind(cf_e('stop', conf), function (e, a) {
                e.stopPropagation();
                if (!C.isStopped) {
                    if (opts.auto.button) {
                        opts.auto.button.addClass(cf_c('stopped', conf))
                    }
                }
                C.isStopped = true;
                if (opts.auto.play) {
                    opts.auto.play = false;
                    A.trigger(cf_e('pause', conf), a)
                }
                return true
            });
            A.bind(cf_e('finish', conf), function (e) {
                e.stopPropagation();
                if (C.isScrolling) {
                    sc_stopScroll(scrl)
                }
                return true
            });
            A.bind(cf_e('pause', conf), function (e, a, b) {
                e.stopPropagation();
                tmrs = sc_clearTimers(tmrs);
                if (a && C.isScrolling) {
                    scrl.isStopped = true;
                    var c = getTime() - scrl.startTime;
                    scrl.duration -= c;
                    if (scrl.pre) scrl.pre.duration -= c;
                    if (scrl.post) scrl.post.duration -= c;
                    sc_stopScroll(scrl, false)
                }
                if (!C.isPaused && !C.isScrolling) {
                    if (b) tmrs.timePassed += getTime() - tmrs.startTime
                }
                if (!C.isPaused) {
                    if (opts.auto.button) {
                        opts.auto.button.addClass(cf_c('paused', conf))
                    }
                }
                C.isPaused = true;
                if (opts.auto.onPausePause) {
                    var d = opts.auto.pauseDuration - tmrs.timePassed,
                        perc = 100 - Math.ceil(d * 100 / opts.auto.pauseDuration);
                    opts.auto.onPausePause.call($tt0, perc, d)
                }
                return true
            });
            A.bind(cf_e('play', conf), function (e, b, c, d) {
                e.stopPropagation();
                tmrs = sc_clearTimers(tmrs);
                var v = [b, c, d],
                    t = ['string', 'number', 'boolean'],
                    a = cf_sortParams(v, t);
                var b = a[0],
                    c = a[1],
                    d = a[2];
                if (b != 'prev' && b != 'next') b = C.direction;
                if (typeof c != 'number') c = 0;
                if (typeof d != 'boolean') d = false;
                if (d) {
                    C.isStopped = false;
                    opts.auto.play = true
                }
                if (!opts.auto.play) {
                    e.stopImmediatePropagation();
                    return debug(conf, 'Carousel stopped: Not scrolling.')
                }
                if (C.isPaused) {
                    if (opts.auto.button) {
                        opts.auto.button.removeClass(cf_c('stopped', conf));
                        opts.auto.button.removeClass(cf_c('paused', conf))
                    }
                }
                C.isPaused = false;
                tmrs.startTime = getTime();
                var f = opts.auto.pauseDuration + c;
                dur2 = f - tmrs.timePassed;
                perc = 100 - Math.ceil(dur2 * 100 / f);
                tmrs.auto = setTimeout(function () {
                    if (opts.auto.onPauseEnd) {
                        opts.auto.onPauseEnd.call($tt0, perc, dur2)
                    }
                    if (C.isScrolling) {
                        A.trigger(cf_e('play', conf), b)
                    } else {
                        A.trigger(cf_e(b, conf), opts.auto)
                    }
                }, dur2);
                if (opts.auto.onPauseStart) {
                    opts.auto.onPauseStart.call($tt0, perc, dur2)
                }
                return true
            });
            A.bind(cf_e('resume', conf), function (e) {
                e.stopPropagation();
                if (scrl.isStopped) {
                    scrl.isStopped = false;
                    C.isPaused = false;
                    C.isScrolling = true;
                    scrl.startTime = getTime();
                    sc_startScroll(scrl)
                } else {
                    A.trigger(cf_e('play', conf))
                }
                return true
            });
            A.bind(cf_e('prev', conf) + ' ' + cf_e('next', conf), function (e, b, f, g) {
                e.stopPropagation();
                if (C.isStopped || A.is(':hidden')) {
                    e.stopImmediatePropagation();
                    return debug(conf, 'Carousel stopped or hidden: Not scrolling.')
                }
                if (opts.items.minimum >= itms.total) {
                    e.stopImmediatePropagation();
                    return debug(conf, 'Not enough items (' + itms.total + ', ' + opts.items.minimum + ' needed): Not scrolling.')
                }
                var v = [b, f, g],
                    t = ['object', 'number/string', 'function'],
                    a = cf_sortParams(v, t);
                var b = a[0],
                    f = a[1],
                    g = a[2];
                var h = e.type.substr(conf.events.prefix.length);
                if (typeof b != 'object' || b == null) b = opts[h];
                if (typeof g == 'function') b.onAfter = g;
                if (typeof f != 'number') {
                    if (opts.items.filter != '*') {
                        f = 'visible'
                    } else {
                        var i = [f, b.items, opts[h].items];
                        for (var a = 0, l = i.length; a < l; a++) {
                            if (typeof i[a] == 'number' || i[a] == 'page' || i[a] == 'visible') {
                                f = i[a];
                                break
                            }
                        }
                    }
                    switch (f) {
                    case 'page':
                        e.stopImmediatePropagation();
                        return A.triggerHandler(h + 'Page', [b, g]);
                        break;
                    case 'visible':
                        if (!opts.items.visibleConf.variable && opts.items.filter == '*') {
                            f = opts.items.visible
                        }
                        break
                    }
                }
                if (scrl.isStopped) {
                    A.trigger(cf_e('resume', conf));
                    A.trigger(cf_e('queue', conf), [h, [b, f, g]]);
                    e.stopImmediatePropagation();
                    return debug(conf, 'Carousel resumed scrolling.')
                }
                if (b.duration > 0) {
                    if (C.isScrolling) {
                        if (b.queue) A.trigger(cf_e('queue', conf), [h, [b, f, g]]);
                        e.stopImmediatePropagation();
                        return debug(conf, 'Carousel currently scrolling.')
                    }
                }
                if (b.conditions && !b.conditions.call($tt0)) {
                    e.stopImmediatePropagation();
                    return debug(conf, 'Callback "conditions" returned false.')
                }
                tmrs.timePassed = 0;
                A.trigger('_cfs_slide_' + h, [b, f]);
                if (opts.synchronise) {
                    var s = opts.synchronise,
                        c = [b, f];
                    for (var j = 0, l = s.length; j < l; j++) {
                        var d = h;
                        if (!s[j][1]) c[0] = s[j][0].triggerHandler('_cfs_configuration', h);
                        if (!s[j][2]) d = (d == 'prev') ? 'next' : 'prev';
                        c[1] = f + s[j][3];
                        s[j][0].trigger('_cfs_slide_' + d, c)
                    }
                }
                return true
            });
            A.bind(cf_e('_cfs_slide_prev', conf, false), function (e, f, g) {
                e.stopPropagation();
                var h = A.children();
                if (!opts.circular) {
                    if (itms.first == 0) {
                        if (opts.infinite) {
                            A.trigger(cf_e('next', conf), itms.total - 1)
                        }
                        return e.stopImmediatePropagation()
                    }
                }
                if (opts.usePadding) sz_resetMargin(h, opts);
                if (typeof g != 'number') {
                    if (opts.items.visibleConf.variable) {
                        g = gn_getVisibleItemsPrev(h, opts, itms.total - 1)
                    } else if (opts.items.filter != '*') {
                        var i = (typeof f.items == 'number') ? f.items : gn_getVisibleOrg(A, opts);
                        g = gn_getScrollItemsPrevFilter(h, opts, itms.total - 1, i)
                    } else {
                        g = opts.items.visible
                    }
                    g = cf_getAdjust(g, opts, f.items, $tt0)
                }
                if (!opts.circular) {
                    if (itms.total - g < itms.first) {
                        g = itms.total - itms.first
                    }
                }
                opts.items.visibleConf.old = opts.items.visible;
                if (opts.items.visibleConf.variable) {
                    var j = gn_getVisibleItemsNext(h, opts, itms.total - g);
                    if (opts.items.visible + g <= j && g < itms.total) {
                        g++;
                        j = gn_getVisibleItemsNext(h, opts, itms.total - g)
                    }
                    opts.items.visible = cf_getItemsAdjust(j, opts, opts.items.visibleConf.adjust, $tt0)
                } else if (opts.items.filter != '*') {
                    var j = gn_getVisibleItemsNextFilter(h, opts, itms.total - g);
                    opts.items.visible = cf_getItemsAdjust(j, opts, opts.items.visibleConf.adjust, $tt0)
                }
                if (opts.usePadding) sz_resetMargin(h, opts, true);
                if (g == 0) {
                    e.stopImmediatePropagation();
                    return debug(conf, '0 items to scroll: Not scrolling.')
                }
                debug(conf, 'Scrolling ' + g + ' items backward.');
                itms.first += g;
                while (itms.first >= itms.total) {
                    itms.first -= itms.total
                }
                if (!opts.circular) {
                    if (itms.first == 0 && f.onEnd) f.onEnd.call($tt0);
                    if (!opts.infinite) nv_enableNavi(opts, itms.first, conf)
                }
                A.children().slice(itms.total - g, itms.total).prependTo(A);
                if (itms.total < opts.items.visible + g) {
                    A.children().slice(0, (opts.items.visible + g) - itms.total).clone(true).appendTo(A)
                }
                var h = A.children(),
                    c_old = gi_getOldItemsPrev(h, opts, g),
                    c_new = gi_getNewItemsPrev(h, opts),
                    l_cur = h.eq(g - 1),
                    l_old = c_old.last(),
                    l_new = c_new.last();
                if (opts.usePadding) sz_resetMargin(h, opts);
                if (opts.align) {
                    var p = cf_getAlignPadding(c_new, opts),
                        k = p[0],
                        pR = p[1]
                } else {
                    var k = 0,
                        pR = 0
                }
                var l = (k < 0) ? opts.padding[opts.d[3]] : 0;
                if (f.fx == 'directscroll' && opts.items.visible < g) {
                    var m = h.slice(opts.items.visibleConf.old, g),
                        orgW = opts.items[opts.d['width']];
                    m.each(function () {
                        var a = $(this);
                        a.data('isHidden', a.is(':hidden')).hide()
                    });
                    opts.items[opts.d['width']] = 'variable'
                } else {
                    var m = false
                }
                var n = ms_getTotalSize(h.slice(0, g), opts, 'width'),
                    w_siz = cf_mapWrapperSizes(ms_getSizes(c_new, opts, true), opts, !opts.usePadding);
                if (m) opts.items[opts.d['width']] = orgW;
                if (opts.usePadding) {
                    sz_resetMargin(h, opts, true);
                    if (pR >= 0) {
                        sz_resetMargin(l_old, opts, opts.padding[opts.d[1]])
                    }
                    sz_resetMargin(l_cur, opts, opts.padding[opts.d[3]])
                }
                if (opts.align) {
                    opts.padding[opts.d[1]] = pR;
                    opts.padding[opts.d[3]] = k
                }
                var o = {},
                    a_dur = f.duration;
                if (f.fx == 'none') a_dur = 0;
                else if (a_dur == 'auto') a_dur = opts.scroll.duration / opts.scroll.items * g;
                else if (a_dur <= 0) a_dur = 0;
                else if (a_dur < 10) a_dur = n / a_dur;
                scrl = sc_setScroll(a_dur, f.easing);
                if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable') {
                    scrl.anims.push([$wrp, w_siz])
                }
                if (opts.usePadding) {
                    var q = opts.padding[opts.d[3]];
                    if (l_new.not(l_cur).length) {
                        var r = {};
                        r[opts.d['marginRight']] = l_cur.data('cfs_origCssMargin');
                        if (k < 0) l_cur.css(r);
                        else scrl.anims.push([l_cur, r])
                    }
                    if (l_new.not(l_old).length) {
                        var s = {};
                        s[opts.d['marginRight']] = l_old.data('cfs_origCssMargin');
                        scrl.anims.push([l_old, s])
                    }
                    if (pR >= 0) {
                        var t = {};
                        t[opts.d['marginRight']] = l_new.data('cfs_origCssMargin') + opts.padding[opts.d[1]];
                        scrl.anims.push([l_new, t])
                    }
                } else {
                    var q = 0
                }
                o[opts.d['left']] = q;
                var u = [c_old, c_new, w_siz, a_dur];
                if (f.onBefore) f.onBefore.apply($tt0, u);
                clbk.onBefore = sc_callCallbacks(clbk.onBefore, $tt0, u);
                switch (f.fx) {
                case 'fade':
                case 'crossfade':
                case 'cover':
                case 'uncover':
                    scrl.pre = sc_setScroll(scrl.duration, scrl.easing);
                    scrl.post = sc_setScroll(scrl.duration, scrl.easing);
                    scrl.duration = 0;
                    break
                }
                switch (f.fx) {
                case 'crossfade':
                case 'cover':
                case 'uncover':
                    var v = A.clone().appendTo($wrp);
                    break
                }
                switch (f.fx) {
                case 'uncover':
                    v.children().slice(0, g).remove();
                case 'crossfade':
                case 'cover':
                    v.children().slice(opts.items.visible).remove();
                    break
                }
                switch (f.fx) {
                case 'fade':
                    scrl.pre.anims.push([A,
                    {
                        'opacity': 0
                    }]);
                    break;
                case 'crossfade':
                    v.css({
                        'opacity': 0
                    });
                    scrl.pre.anims.push([A,
                    {
                        'width': '+=0'
                    }, function () {
                        v.remove()
                    }]);
                    scrl.post.anims.push([v,
                    {
                        'opacity': 1
                    }]);
                    break;
                case 'cover':
                    scrl = fx_cover(scrl, A, v, opts, true);
                    break;
                case 'uncover':
                    scrl = fx_uncover(scrl, A, v, opts, true, g);
                    break
                }
                var w = function () {
                        var b = opts.items.visible + g - itms.total;
                        if (b > 0) {
                            A.children().slice(itms.total).remove();
                            c_old = A.children().slice(itms.total - (g - b)).get().concat(A.children().slice(0, b).get())
                        }
                        if (m) {
                            m.each(function () {
                                var a = $(this);
                                if (!a.data('isHidden')) a.show()
                            })
                        }
                        if (opts.usePadding) {
                            var c = A.children().eq(opts.items.visible + g - 1);
                            c.css(opts.d['marginRight'], c.data('cfs_origCssMargin'))
                        }
                        scrl.anims = [];
                        if (scrl.pre) scrl.pre = sc_setScroll(scrl.orgDuration, scrl.easing);
                        var d = function () {
                                switch (f.fx) {
                                case 'fade':
                                case 'crossfade':
                                    A.css('filter', '');
                                    break
                                }
                                scrl.post = sc_setScroll(0, null);
                                C.isScrolling = false;
                                var a = [c_old, c_new, w_siz];
                                if (f.onAfter) f.onAfter.apply($tt0, a);
                                clbk.onAfter = sc_callCallbacks(clbk.onAfter, $tt0, a);
                                if (queu.length) {
                                    A.trigger(cf_e(queu[0][0], conf), queu[0][1]);
                                    queu.shift()
                                }
                                if (!C.isPaused) A.trigger(cf_e('play', conf))
                            };
                        switch (f.fx) {
                        case 'fade':
                            scrl.pre.anims.push([A,
                            {
                                'opacity': 1
                            },
                            d]);
                            sc_startScroll(scrl.pre);
                            break;
                        case 'uncover':
                            scrl.pre.anims.push([A,
                            {
                                'width': '+=0'
                            },
                            d]);
                            sc_startScroll(scrl.pre);
                            break;
                        default:
                            d();
                            break
                        }
                    };
                scrl.anims.push([A, o, w]);
                C.isScrolling = true;
                A.css(opts.d['left'], -(n - l));
                tmrs = sc_clearTimers(tmrs);
                sc_startScroll(scrl);
                cf_setCookie(opts.cookie, A.triggerHandler(cf_e('currentPosition', conf)));
                A.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);
                return true
            });
            A.bind(cf_e('_cfs_slide_next', conf, false), function (e, f, g) {
                e.stopPropagation();
                var h = A.children();
                if (!opts.circular) {
                    if (itms.first == opts.items.visible) {
                        if (opts.infinite) {
                            A.trigger(cf_e('prev', conf), itms.total - 1)
                        }
                        return e.stopImmediatePropagation()
                    }
                }
                if (opts.usePadding) sz_resetMargin(h, opts);
                if (typeof g != 'number') {
                    if (opts.items.filter != '*') {
                        var i = (typeof f.items == 'number') ? f.items : gn_getVisibleOrg(A, opts);
                        g = gn_getScrollItemsNextFilter(h, opts, 0, i)
                    } else {
                        g = opts.items.visible
                    }
                    g = cf_getAdjust(g, opts, f.items, $tt0)
                }
                var j = (itms.first == 0) ? itms.total : itms.first;
                if (!opts.circular) {
                    if (opts.items.visibleConf.variable) {
                        var k = gn_getVisibleItemsNext(h, opts, g),
                            i = gn_getVisibleItemsPrev(h, opts, j - 1)
                    } else {
                        var k = opts.items.visible,
                            i = opts.items.visible
                    }
                    if (g + k > j) {
                        g = j - i
                    }
                }
                opts.items.visibleConf.old = opts.items.visible;
                if (opts.items.visibleConf.variable) {
                    var k = gn_getVisibleItemsNextTestCircular(h, opts, g, j);
                    while (opts.items.visible - g >= k && g < itms.total) {
                        g++;
                        k = gn_getVisibleItemsNextTestCircular(h, opts, g, j)
                    }
                    opts.items.visible = cf_getItemsAdjust(k, opts, opts.items.visibleConf.adjust, $tt0)
                } else if (opts.items.filter != '*') {
                    var k = gn_getVisibleItemsNextFilter(h, opts, g);
                    opts.items.visible = cf_getItemsAdjust(k, opts, opts.items.visibleConf.adjust, $tt0)
                }
                if (opts.usePadding) sz_resetMargin(h, opts, true);
                if (g == 0) {
                    e.stopImmediatePropagation();
                    return debug(conf, '0 items to scroll: Not scrolling.')
                }
                debug(conf, 'Scrolling ' + g + ' items forward.');
                itms.first -= g;
                while (itms.first < 0) {
                    itms.first += itms.total
                }
                if (!opts.circular) {
                    if (itms.first == opts.items.visible && f.onEnd) f.onEnd.call($tt0);
                    if (!opts.infinite) nv_enableNavi(opts, itms.first, conf)
                }
                if (itms.total < opts.items.visible + g) {
                    A.children().slice(0, (opts.items.visible + g) - itms.total).clone(true).appendTo(A)
                }
                var h = A.children(),
                    c_old = gi_getOldItemsNext(h, opts),
                    c_new = gi_getNewItemsNext(h, opts, g),
                    l_cur = h.eq(g - 1),
                    l_old = c_old.last(),
                    l_new = c_new.last();
                if (opts.usePadding) sz_resetMargin(h, opts);
                if (opts.align) {
                    var p = cf_getAlignPadding(c_new, opts),
                        l = p[0],
                        pR = p[1]
                } else {
                    var l = 0,
                        pR = 0
                }
                if (f.fx == 'directscroll' && opts.items.visibleConf.old < g) {
                    var m = h.slice(opts.items.visibleConf.old, g),
                        orgW = opts.items[opts.d['width']];
                    m.each(function () {
                        var a = $(this);
                        a.data('isHidden', a.is(':hidden')).hide()
                    });
                    opts.items[opts.d['width']] = 'variable'
                } else {
                    var m = false
                }
                var n = ms_getTotalSize(h.slice(0, g), opts, 'width'),
                    w_siz = cf_mapWrapperSizes(ms_getSizes(c_new, opts, true), opts, !opts.usePadding);
                if (m) opts.items[opts.d['width']] = orgW;
                if (opts.align) {
                    if (opts.padding[opts.d[1]] < 0) {
                        opts.padding[opts.d[1]] = 0
                    }
                }
                if (opts.usePadding) {
                    sz_resetMargin(h, opts, true);
                    sz_resetMargin(l_old, opts, opts.padding[opts.d[1]])
                }
                if (opts.align) {
                    opts.padding[opts.d[1]] = pR;
                    opts.padding[opts.d[3]] = l
                }
                var o = {},
                    a_dur = f.duration;
                if (f.fx == 'none') a_dur = 0;
                else if (a_dur == 'auto') a_dur = opts.scroll.duration / opts.scroll.items * g;
                else if (a_dur <= 0) a_dur = 0;
                else if (a_dur < 10) a_dur = n / a_dur;
                scrl = sc_setScroll(a_dur, f.easing);
                if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable') {
                    scrl.anims.push([$wrp, w_siz])
                }
                if (opts.usePadding) {

                    var q = l_new.data('cfs_origCssMargin');
                    if (pR >= 0) {
                        q += opts.padding[opts.d[1]]
                    }
                    l_new.css(opts.d['marginRight'], q);
                    if (l_cur.not(l_old).length) {
                        var r = {};
                        r[opts.d['marginRight']] = l_old.data('cfs_origCssMargin');
                        scrl.anims.push([l_old, r])
                    }
                    var s = l_cur.data('cfs_origCssMargin');
                    if (l >= 0) {
                        s += opts.padding[opts.d[3]]
                    }
                    var t = {};
                    t[opts.d['marginRight']] = s;
                    scrl.anims.push([l_cur, t])
                }
                o[opts.d['left']] = -n;
                if (l < 0) {
                    o[opts.d['left']] += l
                }
                var u = [c_old, c_new, w_siz, a_dur];
                if (f.onBefore) f.onBefore.apply($tt0, u);
                clbk.onBefore = sc_callCallbacks(clbk.onBefore, $tt0, u);
                switch (f.fx) {
                case 'fade':
                case 'crossfade':
                case 'cover':
                case 'uncover':
                    scrl.pre = sc_setScroll(scrl.duration, scrl.easing);
                    scrl.post = sc_setScroll(scrl.duration, scrl.easing);
                    scrl.duration = 0;
                    break
                }
                switch (f.fx) {
                case 'crossfade':
                case 'cover':
                case 'uncover':
                    var v = A.clone().appendTo($wrp);
                    break
                }
                switch (f.fx) {
                case 'uncover':
                    v.children().slice(opts.items.visibleConf.old).remove();
                    break;
                case 'crossfade':
                case 'cover':
                    v.children().slice(0, g).remove();
                    v.children().slice(opts.items.visible).remove();
                    break
                }
                switch (f.fx) {
                case 'fade':
                    scrl.pre.anims.push([A,
                    {
                        'opacity': 0
                    }]);
                    break;
                case 'crossfade':
                    v.css({
                        'opacity': 0
                    });
                    scrl.pre.anims.push([A,
                    {
                        'width': '+=0'
                    }, function () {
                        v.remove()
                    }]);
                    scrl.post.anims.push([v,
                    {
                        'opacity': 1
                    }]);
                    break;
                case 'cover':
                    scrl = fx_cover(scrl, A, v, opts, false);
                    break;
                case 'uncover':
                    scrl = fx_uncover(scrl, A, v, opts, false, g);
                    break
                }
                var w = function () {
                        var b = opts.items.visible + g - itms.total,
                            new_m = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;
                        A.css(opts.d['left'], new_m);
                        if (b > 0) {
                            A.children().slice(itms.total).remove()
                        }
                        var c = A.children().slice(0, g).appendTo(A).last();
                        if (b > 0) {
                            c_new = gi_getCurrentItems(h, opts)
                        }
                        if (m) {
                            m.each(function () {
                                var a = $(this);
                                if (!a.data('isHidden')) a.show()
                            })
                        }
                        if (opts.usePadding) {
                            if (itms.total < opts.items.visible + g) {
                                var d = A.children().eq(opts.items.visible - 1);
                                d.css(opts.d['marginRight'], d.data('cfs_origCssMargin') + opts.padding[opts.d[3]])
                            }
                            c.css(opts.d['marginRight'], c.data('cfs_origCssMargin'))
                        }
                        scrl.anims = [];
                        if (scrl.pre) scrl.pre = sc_setScroll(scrl.orgDuration, scrl.easing);
                        var e = function () {
                                switch (f.fx) {
                                case 'fade':
                                case 'crossfade':
                                    A.css('filter', '');
                                    break
                                }
                                scrl.post = sc_setScroll(0, null);
                                C.isScrolling = false;
                                var a = [c_old, c_new, w_siz];
                                if (f.onAfter) f.onAfter.apply($tt0, a);
                                clbk.onAfter = sc_callCallbacks(clbk.onAfter, $tt0, a);
                                if (queu.length) {
                                    A.trigger(cf_e(queu[0][0], conf), queu[0][1]);
                                    queu.shift()
                                }
                                if (!C.isPaused) A.trigger(cf_e('play', conf))
                            };
                        switch (f.fx) {
                        case 'fade':
                            scrl.pre.anims.push([A,
                            {
                                'opacity': 1
                            },
                            e]);
                            sc_startScroll(scrl.pre);
                            break;
                        case 'uncover':
                            scrl.pre.anims.push([A,
                            {
                                'width': '+=0'
                            },
                            e]);
                            sc_startScroll(scrl.pre);
                            break;
                        default:
                            e();
                            break
                        }
                    };
                scrl.anims.push([A, o, w]);
                C.isScrolling = true;
                tmrs = sc_clearTimers(tmrs);
                sc_startScroll(scrl);
                cf_setCookie(opts.cookie, A.triggerHandler(cf_e('currentPosition', conf)));
                A.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);
                return true
            });
            A.bind(cf_e('slideTo', conf), function (e, b, c, d, f, g, h) {
                e.stopPropagation();
                var v = [b, c, d, f, g, h],
                    t = ['string/number/object', 'number', 'boolean', 'object', 'string', 'function'],
                    a = cf_sortParams(v, t);
                var f = a[3],
                    g = a[4],
                    h = a[5];
                b = gn_getItemIndex(a[0], a[1], a[2], itms, A);
                if (b == 0) return;
                if (typeof f != 'object') f = false;
                if (C.isScrolling) {
                    if (typeof f != 'object' || f.duration > 0) return false
                }
                if (g != 'prev' && g != 'next') {
                    if (opts.circular) {
                        if (b <= itms.total / 2) g = 'next';
                        else g = 'prev'
                    } else {
                        if (itms.first == 0 || itms.first > b) g = 'next';
                        else g = 'prev'
                    }
                }
                if (g == 'prev') b = itms.total - b;
                A.trigger(cf_e(g, conf), [f, b, h]);
                return true
            });
            A.bind(cf_e('prevPage', conf), function (e, a, b) {
                e.stopPropagation();
                var c = A.triggerHandler(cf_e('currentPage', conf));
                return A.triggerHandler(cf_e('slideToPage', conf), [c - 1, a, 'prev', b])
            });
            A.bind(cf_e('nextPage', conf), function (e, a, b) {
                e.stopPropagation();
                var c = A.triggerHandler(cf_e('currentPage', conf));
                return A.triggerHandler(cf_e('slideToPage', conf), [c + 1, a, 'next', b])
            });
            A.bind(cf_e('slideToPage', conf), function (e, a, b, c, d) {
                e.stopPropagation();
                if (typeof a != 'number') a = A.triggerHandler(cf_e('currentPage', conf));
                var f = opts.pagination.items || opts.items.visible,
                    max = Math.floor(itms.total / f) - 1;
                if (a < 0) a = max;
                if (a > max) a = 0;
                return A.triggerHandler(cf_e('slideTo', conf), [a * f, 0, true, b, c, d])
            });
            A.bind(cf_e('jumpToStart', conf), function (e, s) {
                e.stopPropagation();
                if (s) s = gn_getItemIndex(s, 0, true, itms, A);
                else s = 0;
                s += itms.first;
                if (s != 0) {
                    while (s > itms.total) s -= itms.total;
                    A.prepend(A.children().slice(s, itms.total))
                }
                return true
            });
            A.bind(cf_e('synchronise', conf), function (e, s) {
                e.stopPropagation();
                if (s) s = cf_getSynchArr(s);
                else if (opts.synchronise) s = opts.synchronise;
                else return debug(conf, 'No carousel to synchronise.');
                var n = A.triggerHandler(cf_e('currentPosition', conf)),
                    x = true;
                for (var j = 0, l = s.length; j < l; j++) {
                    if (!s[j][0].triggerHandler(cf_e('slideTo', conf), [n, s[j][3], true])) {
                        x = false
                    }
                }
                return x
            });
            A.bind(cf_e('queue', conf), function (e, a, b) {
                e.stopPropagation();
                if (typeof a == 'function') {
                    a.call($tt0, queu)
                } else if (is_array(a)) {
                    queu = a
                } else if (typeof a != 'undefined') {
                    queu.push([a, b])
                }
                return queu
            });
            A.bind(cf_e('insertItem', conf), function (e, b, c, d, f) {
                e.stopPropagation();
                var v = [b, c, d, f],
                    t = ['string/object', 'string/number/object', 'boolean', 'number'],
                    a = cf_sortParams(v, t);
                var b = a[0],
                    c = a[1],
                    d = a[2],
                    f = a[3];
                if (typeof b == 'object' && typeof b.jquery == 'undefined') b = $(b);
                if (typeof b == 'string') b = $(b);
                if (typeof b != 'object' || typeof b.jquery == 'undefined' || b.length == 0) return debug(conf, 'Not a valid object.');
                if (typeof c == 'undefined') c = 'end';
                if (opts.usePadding) {
                    b.each(function () {
                        var m = parseInt($(this).css(opts.d['marginRight']));
                        if (isNaN(m)) m = 0;
                        $(this).data('cfs_origCssMargin', m)
                    })
                }
                var g = c,
                    before = 'before';
                if (c == 'end') {
                    if (d) {
                        if (itms.first == 0) {
                            c = itms.total - 1;
                            before = 'after'
                        } else {
                            c = itms.first;
                            itms.first += b.length
                        }
                        if (c < 0) c = 0
                    } else {
                        c = itms.total - 1;
                        before = 'after'
                    }
                } else {
                    c = gn_getItemIndex(c, f, d, itms, A)
                }
                if (g != 'end' && !d) {
                    if (c < itms.first) itms.first += b.length
                }
                if (itms.first >= itms.total) itms.first -= itms.total;
                var h = A.children().eq(c);
                if (h.length) {
                    h[before](b)
                } else {
                    A.append(b)
                }
                itms.total = A.children().length;
                var i = A.triggerHandler('updateSizes');
                nv_showNavi(opts, itms.total, conf);
                nv_enableNavi(opts, itms.first, conf);
                A.trigger(cf_e('linkAnchors', conf));
                A.trigger(cf_e('updatePageStatus', conf), [true, i]);
                return true
            });
            A.bind(cf_e('removeItem', conf), function (e, b, c, d) {
                e.stopPropagation();
                var v = [b, c, d],
                    t = ['string/number/object', 'boolean', 'number'],
                    a = cf_sortParams(v, t);
                var b = a[0],
                    c = a[1],
                    d = a[2];
                if (typeof b == 'undefined' || b == 'end') {
                    A.children().last().remove()
                } else {
                    b = gn_getItemIndex(b, d, c, itms, A);
                    var f = A.children().eq(b);
                    if (f.length) {
                        if (b < itms.first) itms.first -= f.length;
                        f.remove()
                    }
                }
                itms.total = A.children().length;
                var g = A.triggerHandler('updateSizes');
                nv_showNavi(opts, itms.total, conf);
                nv_enableNavi(opts, itms.first, conf);
                A.trigger(cf_e('updatePageStatus', conf), [true, g]);
                return true
            });
            A.bind(cf_e('onBefore', conf) + ' ' + cf_e('onAfter', conf), function (e, a) {
                e.stopPropagation();
                var b = e.type.substr(conf.events.prefix.length);
                if (is_array(a)) clbk[b] = a;
                if (typeof a == 'function') clbk[b].push(a);
                return clbk[b]
            });
            A.bind(cf_e('_cfs_currentPosition', conf, false), function (e, a) {
                e.stopPropagation();
                return A.triggerHandler(cf_e('currentPosition', conf), a)
            });
            A.bind(cf_e('currentPosition', conf), function (e, a) {
                e.stopPropagation();
                if (itms.first == 0) var b = 0;
                else var b = itms.total - itms.first;
                if (typeof a == 'function') a.call($tt0, b);
                return b
            });
            A.bind(cf_e('currentPage', conf), function (e, a) {
                e.stopPropagation();
                var b = opts.pagination.items || opts.items.visible;
                var c = Math.ceil(itms.total / b - 1);
                if (itms.first == 0) var d = 0;
                else if (itms.first < itms.total % b) var d = 0;
                else if (itms.first == b && !opts.circular) var d = c;
                else var d = Math.round((itms.total - itms.first) / b);
                if (d < 0) d = 0;
                if (d > c) d = c;
                if (typeof a == 'function') a.call($tt0, d);
                return d
            });
            A.bind(cf_e('currentVisible', conf), function (e, a) {
                e.stopPropagation();
                $i = gi_getCurrentItems(A.children(), opts);
                if (typeof a == 'function') a.call($tt0, $i);
                return $i
            });
            A.bind(cf_e('slice', conf), function (e, f, l, b) {
                e.stopPropagation();
                var v = [f, l, b],
                    t = ['number', 'number', 'function'],
                    a = cf_sortParams(v, t);
                f = (typeof a[0] == 'number') ? a[0] : 0, l = (typeof a[1] == 'number') ? a[1] : itms.total, b = a[2];
                f += itms.first;
                l += itms.first;
                while (f > itms.total) {
                    f -= itms.total
                }
                while (l > itms.total) {
                    l -= itms.total
                }
                while (f < 0) {
                    f += itms.total
                }
                while (l < 0) {
                    l += itms.total
                }
                var c = A.children();
                if (l > f) {
                    var d = c.slice(f, l)
                } else {
                    var d = c.slice(f, itms.total).get().concat(c.slice(0, l).get())
                }
                if (typeof b == 'function') b.call($tt0, d);
                return d
            });
            A.bind(cf_e('isPaused', conf) + ' ' + cf_e('isStopped', conf) + ' ' + cf_e('isScrolling', conf), function (e, a) {
                e.stopPropagation();
                var b = e.type.substr(conf.events.prefix.length);
                if (typeof a == 'function') a.call($tt0, C[b]);
                return C[b]
            });
            A.bind(cf_e('_cfs_configuration', conf, false), function (e, a, b, c) {
                e.stopPropagation();
                return A.triggerHandler(cf_e('configuration', conf), [a, b, c])
            });
            A.bind(cf_e('configuration', conf), function (e, a, b, c) {
                e.stopPropagation();
                var d = false;
                if (typeof a == 'function') {
                    a.call($tt0, opts)
                } else if (typeof a == 'object') {
                    opts_orig = $.extend(true, {}, opts_orig, a);
                    if (b !== false) d = true;
                    else opts = $.extend(true, {}, opts, a)
                } else if (typeof a != 'undefined') {
                    if (typeof b == 'function') {
                        var f = eval('opts.' + a);
                        if (typeof f == 'undefined') f = '';
                        b.call($tt0, f)
                    } else if (typeof b != 'undefined') {
                        if (typeof c !== 'boolean') c = true;
                        eval('opts_orig.' + a + ' = b');
                        if (c !== false) d = true;
                        else eval('opts.' + a + ' = b')
                    } else {
                        return eval('opts.' + a)
                    }
                }
                if (d) {
                    sz_resetMargin(A.children(), opts);
                    A._cfs_init(opts_orig);
                    A._cfs_bind_buttons();
                    var g = sz_setSizes(A, opts, false);
                    A.trigger(cf_e('updatePageStatus', conf), [true, g])
                }
                return opts
            });
            A.bind(cf_e('linkAnchors', conf), function (e, a, b) {
                e.stopPropagation();
                if (typeof a == 'undefined' || a.length == 0) a = $('body');
                else if (typeof a == 'string') a = $(a);
                if (typeof a != 'object') return debug(conf, 'Not a valid object.');
                if (typeof b != 'string' || b.length == 0) b = 'a.caroufredsel';
                a.find(b).each(function () {
                    var h = this.hash || '';
                    if (h.length > 0 && A.children().index($(h)) != -1) {
                        $(this).unbind('click').click(function (e) {
                            e.preventDefault();
                            A.trigger(cf_e('slideTo', conf), h)
                        })
                    }
                });
                return true
            });
            A.bind(cf_e('updatePageStatus', conf), function (e, b, c) {
                e.stopPropagation();
                if (!opts.pagination.container) return;
                if (b) {
                    var d = opts.pagination.items || opts.items.visible,
                        l = Math.ceil(itms.total / d);
                    if (opts.pagination.anchorBuilder) {
                        opts.pagination.container.children().remove();
                        opts.pagination.container.each(function () {
                            for (var a = 0; a < l; a++) {
                                var i = A.children().eq(gn_getItemIndex(a * d, 0, true, itms, A));
                                $(this).append(opts.pagination.anchorBuilder(a + 1, i))
                            }
                        })
                    }
                    opts.pagination.container.each(function () {
                        $(this).children().unbind(opts.pagination.event).each(function (a) {
                            $(this).bind(opts.pagination.event, function (e) {
                                e.preventDefault();
                                A.trigger(cf_e('slideTo', conf), [a * d, 0, true, opts.pagination])
                            })
                        })
                    })
                }
                opts.pagination.container.each(function () {
                    $(this).children().removeClass(cf_c('selected', conf)).eq(A.triggerHandler(cf_e('currentPage', conf))).addClass(cf_c('selected', conf))
                });
                return true
            });
            A.bind(cf_e('updateSizes', conf), function (e) {
                var a = A.children(),
                    vI = opts.items.visible;
                if (opts.items.visibleConf.variable) vI = gn_getVisibleItemsNext(a, opts, 0);
                else if (opts.items.filter != '*') vI = gn_getVisibleItemsNextFilter(a, opts, 0);
                if (!opts.circular && itms.first != 0 && vI > itms.first) {
                    if (opts.items.visibleConf.variable) {
                        var b = gn_getVisibleItemsPrev(a, opts, itms.first) - itms.first
                    } else if (opts.items.filter != '*') {
                        var b = gn_getVisibleItemsPrevFilter(a, opts, itms.first) - itms.first
                    } else {
                        b = opts.items.visible - itms.first
                    }
                    debug(conf, 'Preventing non-circular: sliding ' + b + ' items backward.');
                    A.trigger('prev', b)
                }
                opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
                return sz_setSizes(A, opts)
            });
            A.bind(cf_e('_cfs_destroy', conf, false), function (e, a) {
                e.stopPropagation();
                A.trigger(cf_e('destroy', conf), a);
                return true
            });
            A.bind(cf_e('destroy', conf), function (e, a) {
                e.stopPropagation();
                tmrs = sc_clearTimers(tmrs);
                A.data('cfs_isCarousel', false);
                A.trigger(cf_e('finish', conf));
                if (a) {
                    A.trigger(cf_e('jumpToStart', conf))
                }
                if (opts.usePadding) {
                    sz_resetMargin(A.children(), opts)
                }
                A.css(A.data('cfs_origCss'));
                A._cfs_unbind_events();
                A._cfs_unbind_buttons();
                $wrp.replaceWith(A);
                return true
            })
        };
        A._cfs_unbind_events = function () {
            A.unbind(cf_e('', conf));
            A.unbind(cf_e('', conf, false))
        };
        A._cfs_bind_buttons = function () {
            A._cfs_unbind_buttons();
            nv_showNavi(opts, itms.total, conf);
            nv_enableNavi(opts, itms.first, conf);
            if (opts.auto.pauseOnHover) {
                var c = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                $wrp.bind(cf_e('mouseenter', conf, false), function () {
                    A.trigger(cf_e('pause', conf), c)
                }).bind(cf_e('mouseleave', conf, false), function () {
                    A.trigger(cf_e('resume', conf))
                })
            }
            if (opts.auto.button) {
                opts.auto.button.bind(cf_e(opts.auto.event, conf, false), function (e) {
                    e.preventDefault();
                    var a = false,
                        c = null;
                    if (C.isPaused) {
                        a = 'play'
                    } else if (opts.auto.pauseOnEvent) {
                        a = 'pause';
                        c = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)
                    }
                    if (a) {
                        A.trigger(cf_e(a, conf), c)
                    }
                })
            }
            if (opts.prev.button) {
                opts.prev.button.bind(cf_e(opts.prev.event, conf, false), function (e) {
                    e.preventDefault();
                    A.trigger(cf_e('prev', conf))
                });
                if (opts.prev.pauseOnHover) {
                    var c = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                    opts.prev.button.bind(cf_e('mouseenter', conf, false), function () {
                        A.trigger(cf_e('pause', conf), c)
                    }).bind(cf_e('mouseleave', conf, false), function () {
                        A.trigger(cf_e('resume', conf))
                    })
                }
            }
            if (opts.next.button) {
                opts.next.button.bind(cf_e(opts.next.event, conf, false), function (e) {
                    e.preventDefault();
                    A.trigger(cf_e('next', conf))
                });
                if (opts.next.pauseOnHover) {
                    var c = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                    opts.next.button.bind(cf_e('mouseenter', conf, false), function () {
                        A.trigger(cf_e('pause', conf), c)
                    }).bind(cf_e('mouseleave', conf, false), function () {
                        A.trigger(cf_e('resume', conf))
                    })
                }
            }
            if ($.fn.mousewheel) {
                if (opts.prev.mousewheel) {
                    if (!C.mousewheelPrev) {
                        C.mousewheelPrev = true;
                        $wrp.mousewheel(function (e, a) {
                            if (a > 0) {
                                e.preventDefault();
                                var b = bt_mousesheelNumber(opts.prev.mousewheel);
                                A.trigger(cf_e('prev', conf), b)
                            }
                        })
                    }
                }
                if (opts.next.mousewheel) {
                    if (!C.mousewheelNext) {
                        C.mousewheelNext = true;
                        $wrp.mousewheel(function (e, a) {
                            if (a < 0) {
                                e.preventDefault();
                                var b = bt_mousesheelNumber(opts.next.mousewheel);
                                A.trigger(cf_e('next', conf), b)
                            }
                        })
                    }
                }
            }
            if ($.fn.touchwipe) {
                var d = (opts.prev.wipe) ?
                function () {
                    A.trigger(cf_e('prev', conf))
                } : null, wN = (opts.next.wipe) ?
                function () {
                    A.trigger(cf_e('next', conf))
                } : null;
                if (wN || wN) {
                    if (!C.touchwipe) {
                        C.touchwipe = true;
                        var f = {
                            'min_move_x': 30,
                            'min_move_y': 30,
                            'preventDefaultEvents': true
                        };
                        switch (opts.direction) {
                        case 'up':
                        case 'down':
                            f.wipeUp = wN;
                            f.wipeDown = d;
                            break;
                        default:
                            f.wipeLeft = wN;
                            f.wipeRight = d
                        }
                        $wrp.touchwipe(f)
                    }
                }
            }
            if (opts.pagination.container) {
                if (opts.pagination.pauseOnHover) {
                    var c = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                    opts.pagination.container.bind(cf_e('mouseenter', conf, false), function () {
                        A.trigger(cf_e('pause', conf), c)
                    }).bind(cf_e('mouseleave', conf, false), function () {
                        A.trigger(cf_e('resume', conf))
                    })
                }
            }
            if (opts.prev.key || opts.next.key) {
                $(document).bind(cf_e('keyup', conf, false, true, true), function (e) {
                    var k = e.keyCode;
                    if (k == opts.next.key) {
                        e.preventDefault();
                        A.trigger(cf_e('next', conf))
                    }
                    if (k == opts.prev.key) {
                        e.preventDefault();
                        A.trigger(cf_e('prev', conf))
                    }
                })
            }
            if (opts.pagination.keys) {
                $(document).bind(cf_e('keyup', conf, false, true, true), function (e) {
                    var k = e.keyCode;
                    if (k >= 49 && k < 58) {
                        k = (k - 49) * opts.items.visible;
                        if (k <= itms.total) {
                            e.preventDefault();
                            A.trigger(cf_e('slideTo', conf), [k, 0, true, opts.pagination])
                        }
                    }
                })
            }
            if (opts.auto.play) {
                A.trigger(cf_e('play', conf), opts.auto.delay)
            }
            if (C.upDateOnWindowResize) {
                $(window).bind(cf_e('resize', conf, false, true, true), function (e) {
                    A.trigger(cf_e('finish', conf));
                    if (opts.auto.pauseOnResize && !C.isPaused) {
                        A.trigger(cf_e('play', conf))
                    }
                    sz_resetMargin(A.children(), opts);
                    A._cfs_init(opts_orig);
                    var a = sz_setSizes(A, opts, false);
                    A.trigger(cf_e('updatePageStatus', conf), [true, a])
                })
            }
        };
        A._cfs_unbind_buttons = function () {
            var a = cf_e('', conf),
                ns2 = cf_e('', conf, false);
            ns3 = cf_e('', conf, false, true, true);
            $(document).unbind(ns3);
            $(window).unbind(ns3);
            $wrp.unbind(ns2);
            if (opts.auto.button) opts.auto.button.unbind(ns2);
            if (opts.prev.button) opts.prev.button.unbind(ns2);
            if (opts.next.button) opts.next.button.unbind(ns2);
            if (opts.pagination.container) {
                opts.pagination.container.unbind(ns2);
                if (opts.pagination.anchorBuilder) {
                    opts.pagination.container.children().remove()
                }
            }
            nv_showNavi(opts, 'hide', conf);
            nv_enableNavi(opts, 'removeClass', conf)
        };
        var C = {
            'direction': 'next',
            'isPaused': true,
            'isScrolling': false,
            'isStopped': false,
            'mousewheelNext': false,
            'mousewheelPrev': false,
            'touchwipe': false
        },
            itms = {
                'total': A.children().length,
                'first': 0
            },
            tmrs = {
                'timer': null,
                'auto': null,
                'queue': null,
                'startTime': getTime(),
                'timePassed': 0
            },
            scrl = {
                'isStopped': false,
                'duration': 0,
                'startTime': 0,
                'easing': '',
                'anims': []
            },
            clbk = {
                'onBefore': [],
                'onAfter': []
            },
            queu = [],
            conf = $.extend(true, {}, $.fn.carouFredSel.configs, z),
            opts = {},
            opts_orig = y,
            $wrp = A.wrap('<' + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
        conf.selector = A.selector;
        conf.serialNumber = $.fn.carouFredSel.serialNumber++;
        A._cfs_init(opts_orig, true, B);
        A._cfs_build();
        A._cfs_bind_events();
        A._cfs_bind_buttons();
        if (is_array(opts.items.start)) {
            var D = opts.items.start
        } else {
            var D = [];
            if (opts.items.start != 0) {
                D.push(opts.items.start)
            }
        }
        if (opts.cookie) {
            D.unshift(cf_readCookie(opts.cookie))
        }
        if (D.length > 0) {
            for (var a = 0, l = D.length; a < l; a++) {
                var s = D[a];
                if (s == 0) {
                    continue
                }
                if (s === true) {
                    s = window.location.hash;
                    if (s.length < 1) {
                        continue
                    }
                } else if (s === 'random') {
                    s = Math.floor(Math.random() * itms.total)
                }
                if (A.triggerHandler(cf_e('slideTo', conf), [s, 0, true,
                {
                    fx: 'none'
                }])) {
                    break
                }
            }
        }
        var E = sz_setSizes(A, opts, false),
            itm = gi_getCurrentItems(A.children(), opts);
        if (opts.onCreate) {
            opts.onCreate.call($tt0, itm, E)
        }
        A.trigger(cf_e('updatePageStatus', conf), [true, E]);
        A.trigger(cf_e('linkAnchors', conf));
        return A
    };
    $.fn.carouFredSel.serialNumber = 1;
    $.fn.carouFredSel.defaults = {
        'synchronise': false,
        'infinite': true,
        'circular': true,
        'responsive': false,
        'direction': 'left',
        'items': {
            'start': 0
        },
        'scroll': {
            'easing': 'swing',
            'duration': 500,
            'pauseOnHover': false,
            'mousewheel': false,
            'wipe': false,
            'event': 'click',
            'queue': false
        }
    };
    $.fn.carouFredSel.configs = {
        'debug': false,
        'events': {
            'prefix': '',
            'namespace': 'cfs'
        },
        'wrapper': {
            'element': 'div',
            'classname': 'caroufredsel_wrapper'
        },
        'classnames': {}
    };
    $.fn.carouFredSel.pageAnchorBuilder = function (a, b) {
        return '<a href="#"><span>' + a + '</span></a>'
    };

    function sc_setScroll(d, e) {
        return {
            anims: [],
            duration: d,
            orgDuration: d,
            easing: e,
            startTime: getTime()
        }
    }
    function sc_startScroll(s) {
        if (typeof s.pre == 'object') {
            sc_startScroll(s.pre)
        }
        for (var a = 0, l = s.anims.length; a < l; a++) {
            var b = s.anims[a];
            if (!b) continue;
            if (b[3]) b[0].stop();
            b[0].animate(b[1], {
                complete: b[2],
                duration: s.duration,
                easing: s.easing
            })
        }
        if (typeof s.post == 'object') {
            sc_startScroll(s.post)
        }
    }
    function sc_stopScroll(s, c) {
        if (typeof c != 'boolean') c = true;
        if (typeof s.pre == 'object') {
            sc_stopScroll(s.pre, c)
        }
        for (var a = 0, l = s.anims.length; a < l; a++) {
            var b = s.anims[a];
            b[0].stop(true);
            if (c) {
                b[0].css(b[1]);
                if (typeof b[2] == 'function') b[2]()
            }
        }
        if (typeof s.post == 'object') {
            sc_stopScroll(s.post, c)
        }
    }
    function sc_clearTimers(t) {
        if (t.auto) clearTimeout(t.auto);
        return t
    }
    function sc_callCallbacks(b, t, c) {
        if (b.length) {
            for (var a = 0, l = b.length; a < l; a++) {
                b[a].apply(t, c)
            }
        }
        return []
    }
    function fx_fade(a, c, x, d, f) {
        var o = {
            'duration': d,
            'easing': a.easing
        };
        if (typeof f == 'function') o.complete = f;
        c.animate({
            opacity: x
        }, o)
    }
    function fx_cover(a, b, c, o, d) {
        var e = ms_getSizes(gi_getOldItemsNext(b.children(), o), o, true)[0],
            new_w = ms_getSizes(c.children(), o, true)[0],
            cur_l = (d) ? -new_w : e,
            css_o = {},
            ani_o = {};
        css_o[o.d['width']] = new_w;
        css_o[o.d['left']] = cur_l;
        ani_o[o.d['left']] = 0;
        a.pre.anims.push([b,
        {
            'opacity': 1
        }]);
        a.post.anims.push([c, ani_o, function () {
            $(this).remove()
        }]);
        c.css(css_o);
        return a
    }
    function fx_uncover(a, b, c, o, d, n) {
        var e = ms_getSizes(gi_getNewItemsNext(b.children(), o, n), o, true)[0],
            old_w = ms_getSizes(c.children(), o, true)[0],
            cur_l = (d) ? -old_w : e,
            css_o = {},
            ani_o = {};
        css_o[o.d['width']] = old_w;
        css_o[o.d['left']] = 0;
        ani_o[o.d['left']] = cur_l;
        a.post.anims.push([c, ani_o, function () {
            $(this).remove()
        }]);
        c.css(css_o);
        return a
    }
    function nv_showNavi(o, t, c) {
        if (t == 'show' || t == 'hide') {
            var f = t
        } else if (o.items.minimum >= t) {
            debug(c, 'Not enough items: hiding navigation (' + t + ' items, ' + o.items.minimum + ' needed).');
            var f = 'hide'
        } else {
            var f = 'show'
        }
        var s = (f == 'show') ? 'removeClass' : 'addClass',
            h = cf_c('hidden', c);
        if (o.auto.button) o.auto.button[f]()[s](h);
        if (o.prev.button) o.prev.button[f]()[s](h);
        if (o.next.button) o.next.button[f]()[s](h);
        if (o.pagination.container) o.pagination.container[f]()[s](h)
    }
    function nv_enableNavi(o, f, c) {
        if (o.circular || o.infinite) return;
        var a = (f == 'removeClass' || f == 'addClass') ? f : false,
            di = cf_c('disabled', c);
        if (o.auto.button && a) {
            o.auto.button[a](di)
        }
        if (o.prev.button) {
            var b = a || (f == 0) ? 'addClass' : 'removeClass';
            o.prev.button[b](di)
        }
        if (o.next.button) {
            var b = a || (f == o.items.visible) ? 'addClass' : 'removeClass';
            o.next.button[b](di)
        }
    }
    function go_getObject(a, b) {
        if (typeof b == 'function') b = b.call(a);
        if (typeof b == 'undefined') b = {};
        return b
    }
    function go_getNaviObject(a, b, c) {
        if (typeof c != 'string') c = '';
        b = go_getObject(a, b);
        if (typeof b == 'string') {
            var d = cf_getKeyCode(b);
            if (d == -1) b = $(b);
            else b = d
        }
        if (c == 'pagination') {
            if (typeof b == 'boolean') b = {
                'keys': b
            };
            if (typeof b.jquery != 'undefined') b = {
                'container': b
            };
            if (typeof b.container == 'function') b.container = b.container.call(a);
            if (typeof b.container == 'string') b.container = $(b.container);
            if (typeof b.items != 'number') b.items = false
        } else if (c == 'auto') {
            if (typeof b.jquery != 'undefined') b = {
                'button': b
            };
            if (typeof b == 'boolean') b = {
                'play': b
            };
            if (typeof b == 'number') b = {
                'pauseDuration': b
            };
            if (typeof b.button == 'function') b.button = b.button.call(a);
            if (typeof b.button == 'string') b.button = $(b.button)
        } else {
            if (typeof b.jquery != 'undefined') b = {
                'button': b
            };
            if (typeof b == 'number') b = {
                'key': b
            };
            if (typeof b.button == 'function') b.button = b.button.call(a);
            if (typeof b.button == 'string') b.button = $(b.button);
            if (typeof b.key == 'string') b.key = cf_getKeyCode(b.key)
        }
        return b
    }
    function gn_getItemIndex(a, b, c, d, e) {
        if (typeof a == 'string') {
            if (isNaN(a)) a = $(a);
            else a = parseInt(a)
        }
        if (typeof a == 'object') {
            if (typeof a.jquery == 'undefined') a = $(a);
            a = e.children().index(a);
            if (a == -1) a = 0;
            if (typeof c != 'boolean') c = false
        } else {
            if (typeof c != 'boolean') c = true
        }
        if (isNaN(a)) a = 0;
        else a = parseInt(a);
        if (isNaN(b)) b = 0;
        else b = parseInt(b);
        if (c) {
            a += d.first
        }
        a += b;
        if (d.total > 0) {
            while (a >= d.total) {
                a -= d.total
            }
            while (a < 0) {
                a += d.total
            }
        }
        return a
    }
    function gn_getVisibleItemsPrev(i, o, s) {
        var t = 0,
            x = 0;
        for (var a = s; a >= 0; a--) {
            var j = i.eq(a);
            t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
            if (t > o.maxDimention) return x;
            if (a == 0) a = i.length;
            x++
        }
    }
    function gn_getVisibleItemsPrevFilter(i, o, s) {
        return gn_getItemsPrevFilter(i, o.items.filter, o.items.visibleConf.org, s)
    }
    function gn_getScrollItemsPrevFilter(i, o, s, m) {
        return gn_getItemsPrevFilter(i, o.items.filter, m, s)
    }
    function gn_getItemsPrevFilter(i, f, m, s) {
        var t = 0,
            x = 0;
        for (var a = s, l = i.length - 1; a >= 0; a--) {
            x++;
            if (x == l) return x;
            var j = i.eq(a);
            if (j.is(f)) {
                t++;
                if (t == m) return x
            }
            if (a == 0) a = i.length
        }
    }
    function gn_getVisibleOrg(a, o) {
        return o.items.visibleConf.org || a.children().slice(0, o.items.visible).filter(o.items.filter).length
    }
    function gn_getVisibleItemsNext(i, o, s) {
        var t = 0,
            x = 0;
        for (var a = s, l = i.length - 1; a <= l; a++) {
            var j = i.eq(a);
            t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
            if (t > o.maxDimention) return x;
            x++;
            if (x == l) return x;
            if (a == l) a = -1
        }
    }
    function gn_getVisibleItemsNextTestCircular(i, o, s, l) {
        var v = gn_getVisibleItemsNext(i, o, s);
        if (!o.circular) {
            if (s + v > l) v = l - s
        }
        return v
    }
    function gn_getVisibleItemsNextFilter(i, o, s) {
        return gn_getItemsNextFilter(i, o.items.filter, o.items.visibleConf.org, s, o.circular)
    }
    function gn_getScrollItemsNextFilter(i, o, s, m) {
        return gn_getItemsNextFilter(i, o.items.filter, m + 1, s, o.circular) - 1
    }
    function gn_getItemsNextFilter(i, f, m, s, c) {
        var t = 0,
            x = 0;
        for (var a = s, l = i.length - 1; a <= l; a++) {
            x++;
            if (x == l) return x;
            var j = i.eq(a);
            if (j.is(f)) {
                t++;
                if (t == m) return x
            }
            if (a == l) a = -1
        }
    }
    function gi_getCurrentItems(i, o) {
        return i.slice(0, o.items.visible)
    }
    function gi_getOldItemsPrev(i, o, n) {
        return i.slice(n, o.items.visibleConf.old + n)
    }
    function gi_getNewItemsPrev(i, o) {
        return i.slice(0, o.items.visible)
    }
    function gi_getOldItemsNext(i, o) {
        return i.slice(0, o.items.visibleConf.old)
    }
    function gi_getNewItemsNext(i, o, n) {
        return i.slice(n, o.items.visible + n)
    }
    function sz_resetMargin(i, o, m) {
        var x = (typeof m == 'boolean') ? m : false;
        if (typeof m != 'number') m = 0;
        i.each(function () {
            var j = $(this);
            var t = parseInt(j.css(o.d['marginRight']));
            if (isNaN(t)) t = 0;
            j.data('cfs_tempCssMargin', t);
            j.css(o.d['marginRight'], ((x) ? j.data('cfs_tempCssMargin') : m + j.data('cfs_origCssMargin')))
        })
    }
    function sz_setSizes(a, o, p) {
        var b = a.parent(),
            $i = a.children(),
            $v = gi_getCurrentItems($i, o),
            sz = cf_mapWrapperSizes(ms_getSizes($v, o, true), o, p);
        b.css(sz);
        if (o.usePadding) {
            var p = o.padding,
                r = p[o.d[1]];
            if (o.align) {
                if (r < 0) r = 0
            }
            var c = $v.last();
            c.css(o.d['marginRight'], c.data('cfs_origCssMargin') + r);
            a.css(o.d['top'], p[o.d[0]]);
            a.css(o.d['left'], p[o.d[3]])
        }
        a.css(o.d['width'], sz[o.d['width']] + (ms_getTotalSize($i, o, 'width') * 2));
        a.css(o.d['height'], ms_getLargestSize($i, o, 'height'));
        return sz
    }
    function ms_getSizes(i, o, a) {
        var b = ms_getTotalSize(i, o, 'width', a),
            s2 = ms_getLargestSize(i, o, 'height', a);
        return [b, s2]
    }
    function ms_getLargestSize(i, o, a, b) {
        if (typeof b != 'boolean') b = false;
        if (typeof o[o.d[a]] == 'number' && b) return o[o.d[a]];
        if (typeof o.items[o.d[a]] == 'number') return o.items[o.d[a]];
        var c = (a.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight';
        return ms_getTrueLargestSize(i, o, c)
    }
    function ms_getTrueLargestSize(i, o, b) {
        var s = 0;
        for (var a = 0, l = i.length; a < l; a++) {
            var j = i.eq(a);
            var m = (j.is(':visible')) ? j[o.d[b]](true) : 0;
            if (s < m) s = m
        }
        return s
    }
    function ms_getTrueInnerSize(b, o, c) {
        if (!b.is(':visible')) return 0;
        var d = b[o.d[c]](),
            arr = (o.d[c].toLowerCase().indexOf('width') > -1) ? ['paddingLeft', 'paddingRight'] : ['paddingTop', 'paddingBottom'];
        for (var a = 0, l = arr.length; a < l; a++) {
            var m = parseInt(b.css(arr[a]));
            d -= (isNaN(m)) ? 0 : m
        }
        return d
    }
    function ms_getTotalSize(i, o, b, c) {
        if (typeof c != 'boolean') c = false;
        if (typeof o[o.d[b]] == 'number' && c) return o[o.d[b]];
        if (typeof o.items[o.d[b]] == 'number') return o.items[o.d[b]] * i.length;
        var d = (b.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight',
            s = 0;
        for (var a = 0, l = i.length; a < l; a++) {
            var j = i.eq(a);
            s += (j.is(':visible')) ? j[o.d[d]](true) : 0
        }
        return s
    }
    function ms_hasVariableSizes(i, o, b) {
        var s = false,
            v = false;
        for (var a = 0, l = i.length; a < l; a++) {
            var j = i.eq(a);
            var c = (j.is(':visible')) ? j[o.d[b]](true) : 0;
            if (s === false) s = c;
            else if (s != c) v = true;
            if (s == 0) v = true
        }
        return v
    }
    function ms_getPaddingBorderMargin(i, o, d) {
        return i[o.d['outer' + d]](true) - ms_getTrueInnerSize(i, o, 'inner' + d)
    }
    function ms_isPercentage(x) {
        return (typeof x == 'string' && x.substr(-1) == '%')
    }
    function ms_getPercentage(s, o) {
        if (ms_isPercentage(o)) {
            o = o.substring(0, o.length - 1);
            if (isNaN(o)) return s;
            s *= o / 100
        }
        return s
    }
    function cf_e(n, c, a, b, d) {
        if (typeof a != 'boolean') a = true;
        if (typeof b != 'boolean') b = true;
        if (typeof d != 'boolean') d = false;
        if (a) n = c.events.prefix + n;
        if (b) n = n + '.' + c.events.namespace;
        if (b && d) n += c.serialNumber;
        return n
    }
    function cf_c(n, c) {
        return (typeof c.classnames[n] == 'string') ? c.classnames[n] : n
    }
    function cf_mapWrapperSizes(a, o, p) {
        if (typeof p != 'boolean') p = true;
        var b = (o.usePadding && p) ? o.padding : [0, 0, 0, 0];
        var c = {};
        c[o.d['width']] = a[0] + b[1] + b[3];
        c[o.d['height']] = a[1] + b[0] + b[2];
        return c
    }
    function cf_sortParams(c, d) {
        var e = [];
        for (var a = 0, l1 = c.length; a < l1; a++) {
            for (var b = 0, l2 = d.length; b < l2; b++) {
                if (d[b].indexOf(typeof c[a]) > -1 && typeof e[b] == 'undefined') {
                    e[b] = c[a];
                    break
                }
            }
        }
        return e
    }
    function cf_getPadding(p) {
        if (typeof p == 'undefined') return [0, 0, 0, 0];
        if (typeof p == 'number') return [p, p, p, p];
        else if (typeof p == 'string') p = p.split('px').join('').split('em').join('').split(' ');
        if (!is_array(p)) {
            return [0, 0, 0, 0]
        }
        for (var i = 0; i < 4; i++) {
            p[i] = parseInt(p[i])
        }
        switch (p.length) {
        case 0:
            return [0, 0, 0, 0];
        case 1:
            return [p[0], p[0], p[0], p[0]];
        case 2:
            return [p[0], p[1], p[0], p[1]];
        case 3:
            return [p[0], p[1], p[2], p[1]];
        default:
            return [p[0], p[1], p[2], p[3]]
        }
    }
    function cf_getAlignPadding(a, o) {
        var x = (typeof o[o.d['width']] == 'number') ? Math.ceil(o[o.d['width']] - ms_getTotalSize(a, o, 'width')) : 0;
        switch (o.align) {
        case 'left':
            return [0, x];
        case 'right':
            return [x, 0];
        case 'center':
        default:
            return [Math.ceil(x / 2), Math.floor(x / 2)]
        }
    }
    function cf_getAdjust(x, o, a, b) {
        var v = x;
        if (typeof a == 'function') {
            v = a.call(b, v)
        } else if (typeof a == 'string') {
            var p = a.split('+'),
                m = a.split('-');
            if (m.length > p.length) {
                var c = true,
                    sta = m[0],
                    adj = m[1]
            } else {
                var c = false,
                    sta = p[0],
                    adj = p[1]
            }
            switch (sta) {
            case 'even':
                v = (x % 2 == 1) ? x - 1 : x;
                break;
            case 'odd':
                v = (x % 2 == 0) ? x - 1 : x;
                break;
            default:
                v = x;
                break
            }
            adj = parseInt(adj);
            if (!isNaN(adj)) {
                if (c) adj = -adj;
                v += adj
            }
        }
        if (typeof v != 'number') v = 1;
        if (v < 1) v = 1;
        return v
    }
    function cf_getItemsAdjust(x, o, a, b) {
        return cf_getItemAdjustMinMax(cf_getAdjust(x, o, a, b), o.items.visibleConf)
    }
    function cf_getItemAdjustMinMax(v, i) {
        if (typeof i.min == 'number' && v < i.min) v = i.min;
        if (typeof i.max == 'number' && v > i.max) v = i.max;
        if (v < 1) v = 1;
        return v
    }
    function cf_getSynchArr(s) {
        if (!is_array(s)) s = [
            [s]
        ];
        if (!is_array(s[0])) s = [s];
        for (var j = 0, l = s.length; j < l; j++) {
            if (typeof s[j][0] == 'string') s[j][0] = $(s[j][0]);
            if (typeof s[j][1] != 'boolean') s[j][1] = true;
            if (typeof s[j][2] != 'boolean') s[j][2] = true;
            if (typeof s[j][3] != 'number') s[j][3] = 0
        }
        return s
    }
    function cf_getKeyCode(k) {
        if (k == 'right') return 39;
        if (k == 'left') return 37;
        if (k == 'up') return 38;
        if (k == 'down') return 40;
        return -1
    }
    function cf_setCookie(n, v) {
        if (n) document.cookie = n + '=' + v + '; path=/'
    }
    function cf_readCookie(n) {
        n += '=';
        var b = document.cookie.split(';');
        for (var a = 0, l = b.length; a < l; a++) {
            var c = b[a];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length)
            }
            if (c.indexOf(n) == 0) {
                return c.substring(n.length, c.length)
            }
        }
        return 0
    }
    function bt_pauseOnHoverConfig(p) {
        if (p && typeof p == 'string') {
            var i = (p.indexOf('immediate') > -1) ? true : false,
                r = (p.indexOf('resume') > -1) ? true : false
        } else {
            var i = r = false
        }
        return [i, r]
    }
    function bt_mousesheelNumber(a) {
        return (typeof a == 'number') ? a : null
    }
    function is_array(a) {
        return typeof (a) == 'object' && (a instanceof Array)
    }
    function getTime() {
        return new Date().getTime()
    }
    function debug(d, m) {
        if (typeof d == 'object') {
            var s = ' (' + d.selector + ')';
            d = d.debug
        } else {
            var s = ''
        }
        if (!d) return false;
        if (typeof m == 'string') m = 'carouFredSel' + s + ': ' + m;
        else m = ['carouFredSel' + s + ':', m];
        if (window.console && window.console.log) window.console.log(m);
        return false
    }
    $.fn.caroufredsel = function (o, c) {
        return this.carouFredSel(o, c)
    };
    $.extend($.easing, {
        'quadratic': function (t) {
            var a = t * t;
            return t * (-a * t + 4 * a - 6 * t + 4)
        },
        'cubic': function (t) {
            return t * (4 * t * t - 9 * t + 6)
        },
        'elastic': function (t) {
            var a = t * t;
            return t * (33 * a * a - 106 * a * t + 126 * a - 67 * t + 15)
        }
    })
})(jQuery);