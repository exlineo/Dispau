
/*! angular-google-maps 2.4.1 2017-01-05
 *  AngularJS directives for Google Maps
 *  git: https://github.com/angular-ui/angular-google-maps.git
 */

! function(a, b, c, d) {
    "use strict";
    (function() {
        b.module("uiGmapgoogle-maps.providers", ["nemLogging"]), b.module("uiGmapgoogle-maps.wrapped", []), b.module("uiGmapgoogle-maps.extensions", ["uiGmapgoogle-maps.wrapped", "uiGmapgoogle-maps.providers"]), b.module("uiGmapgoogle-maps.directives.api.utils", ["uiGmapgoogle-maps.extensions"]), b.module("uiGmapgoogle-maps.directives.api.managers", []), b.module("uiGmapgoogle-maps.directives.api.options", ["uiGmapgoogle-maps.directives.api.utils"]), b.module("uiGmapgoogle-maps.directives.api.options.builders", []), b.module("uiGmapgoogle-maps.directives.api.models.child", ["uiGmapgoogle-maps.directives.api.utils", "uiGmapgoogle-maps.directives.api.options", "uiGmapgoogle-maps.directives.api.options.builders"]), b.module("uiGmapgoogle-maps.directives.api.models.parent", ["uiGmapgoogle-maps.directives.api.managers", "uiGmapgoogle-maps.directives.api.models.child", "uiGmapgoogle-maps.providers"]), b.module("uiGmapgoogle-maps.directives.api", ["uiGmapgoogle-maps.directives.api.models.parent"]), b.module("uiGmapgoogle-maps", ["uiGmapgoogle-maps.directives.api", "uiGmapgoogle-maps.providers"])
    }).call(this),
        function() {
            b.module("uiGmapgoogle-maps.providers").factory("uiGmapMapScriptLoader", ["$q", "uiGmapuuid", function(d, e) {
                var f, g, h, i, j;
                return i = void 0, j = void 0, f = function(a) {
                    return a.china ? "http://maps.google.cn/maps/api/js?" : "auto" === a.transport ? "//maps.googleapis.com/maps/api/js?" : a.transport + "://maps.googleapis.com/maps/api/js?"
                }, g = function(a) {
                    var b, d, g, h;
                    return b = ["transport", "isGoogleMapsForWork", "china", "preventLoad"], a.isGoogleMapsForWork && b.push("key"), d = c.map(c.omit(a, b), function(a, b) {
                        return b + "=" + a
                    }), i && (h = document.getElementById(i), h.parentNode.removeChild(h)), d = d.join("&"), g = document.createElement("script"), g.id = i = "ui_gmap_map_load_" + e.generate(), g.type = "text/javascript", g.src = f(a) + d, document.head.appendChild(g)
                }, h = function() {
                    return b.isDefined(a.google) && b.isDefined(a.google.maps)
                }, {
                    load: function(b) {
                        var c, e;
                        return c = d.defer(), h() ? (c.resolve(a.google.maps), c.promise) : (e = b.callback = "onGoogleMapsReady" + Math.round(1e3 * Math.random()), a[e] = function() {
                            a[e] = null, c.resolve(a.google.maps)
                        }, a.navigator.connection && a.Connection && a.navigator.connection.type === a.Connection.NONE && !b.preventLoad ? document.addEventListener("online", function() {
                            if (!h()) return g(b)
                        }) : b.preventLoad || g(b), j = b, j.randomizedFunctionName = e, c.promise)
                    },
                    manualLoad: function() {
                        var b;
                        return b = j, h() ? a[b.randomizedFunctionName] ? a[b.randomizedFunctionName]() : void 0 : g(b)
                    }
                }
            }]).provider("uiGmapGoogleMapApi", function() {
                return this.options = {
                    transport: "https",
                    isGoogleMapsForWork: !1,
                    china: !1,
                    v: "3",
                    libraries: "",
                    language: "en",
                    preventLoad: !1
                }, this.configure = function(a) {
                    b.extend(this.options, a)
                }, this.$get = ["uiGmapMapScriptLoader", function(a) {
                    return function(b) {
                        return b.load(a.options)
                    }
                }(this)], this
            }).service("uiGmapGoogleMapApiManualLoader", ["uiGmapMapScriptLoader", function(a) {
                return {
                    load: function() {
                        a.manualLoad()
                    }
                }
            }])
        }.call(this),
        function() {
            var d = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                e = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) f.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                f = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendGWin", function() {
                return {
                    init: c.once(function() {
                        var b;
                        if (google || ("undefined" != typeof google && null !== google ? google.maps : void 0) || null != google.maps.InfoWindow) return google.maps.InfoWindow.prototype._open = google.maps.InfoWindow.prototype.open, google.maps.InfoWindow.prototype._close = google.maps.InfoWindow.prototype.close, google.maps.InfoWindow.prototype._isOpen = !1, google.maps.InfoWindow.prototype.open = function(a, b, c) {
                            null == c && (this._isOpen = !0, this._open(a, b, !0))
                        }, google.maps.InfoWindow.prototype.close = function(a) {
                            null == a && (this._isOpen = !1, this._close(!0))
                        }, google.maps.InfoWindow.prototype.isOpen = function(a) {
                            return null == a && (a = void 0), null == a ? this._isOpen : this._isOpen = a
                        }, a.InfoBox && (a.InfoBox.prototype._open = a.InfoBox.prototype.open, a.InfoBox.prototype._close = a.InfoBox.prototype.close, a.InfoBox.prototype._isOpen = !1, a.InfoBox.prototype.open = function(a, b) {
                            this._isOpen = !0, this._open(a, b)
                        }, a.InfoBox.prototype.close = function() {
                            this._isOpen = !1, this._close()
                        }, a.InfoBox.prototype.isOpen = function(a) {
                            return null == a && (a = void 0), null == a ? this._isOpen : this._isOpen = a
                        }, b = function(b) {
                            function f(b) {
                                this.getOrigCloseBoxImg_ = d(this.getOrigCloseBoxImg_, this), this.getCloseBoxDiv_ = d(this.getCloseBoxDiv_, this);
                                var e;
                                e = new a.InfoBox(b), c.extend(this, e), null != b.closeBoxDiv && (this.closeBoxDiv_ = b.closeBoxDiv)
                            }
                            return e(f, b), f.prototype.getCloseBoxDiv_ = function() {
                                return this.closeBoxDiv_
                            }, f.prototype.getCloseBoxImg_ = function() {
                                var a, b;
                                return a = this.getCloseBoxDiv_(), b = this.getOrigCloseBoxImg_(), a || b
                            }, f.prototype.getOrigCloseBoxImg_ = function() {
                                var a;
                                return a = "", "" !== this.closeBoxURL_ && (a = "<img", a += " src='" + this.closeBoxURL_ + "'", a += " align=right", a += " style='", a += " position: relative;", a += " cursor: pointer;", a += " margin: " + this.closeBoxMargin_ + ";", a += "'>"), a
                            }, f
                        }(a.InfoBox), a.uiGmapInfoBox = b), a.MarkerLabel_ ? a.MarkerLabel_.prototype.setContent = function() {
                            var a;
                            a = this.marker_.get("labelContent"), a && !c.isEqual(this.oldContent, a) && ("undefined" == typeof(null != a ? a.nodeType : void 0) ? (this.labelDiv_.innerHTML = a, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML, this.oldContent = a) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(a), a = a.cloneNode(!0), this.labelDiv_.innerHTML = "", this.eventDiv_.appendChild(a), this.oldContent = a))
                        } : void 0
                    })
                }
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.extensions").service("uiGmapLodash", function() {
                var a, b, d, e, f, g, h, i;
                return g = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g, f = /\\(\\)?/g, d = function(a) {
                    var b, d, e;
                    if (d = a.missingName, e = a.swapName, b = a.isProto, null == c[d] && (c[d] = c[e], b)) return c.prototype[d] = c[e]
                }, [{
                    missingName: "contains",
                    swapName: "includes",
                    isProto: !0
                }, {
                    missingName: "includes",
                    swapName: "contains",
                    isProto: !0
                }, {
                    missingName: "object",
                    swapName: "zipObject"
                }, {
                    missingName: "zipObject",
                    swapName: "object"
                }, {
                    missingName: "all",
                    swapName: "every"
                }, {
                    missingName: "every",
                    swapName: "all"
                }, {
                    missingName: "any",
                    swapName: "some"
                }, {
                    missingName: "some",
                    swapName: "any"
                }, {
                    missingName: "first",
                    swapName: "head"
                }, {
                    missingName: "head",
                    swapName: "first"
                }].forEach(function(a) {
                    return d(a)
                }), null == c.get && (h = function(a) {
                    return c.isObject(a) ? a : Object(a)
                }, b = function(a) {
                    return null === a ? "" : a + ""
                }, i = function(a) {
                    var d;
                    return c.isArray(a) ? a : (d = [], b(a).replace(g, function(a, b, c, e) {
                        d.push(c ? e.replace(f, "$1") : b || a)
                    }), d)
                }, a = function(a, b, d) {
                    var e, f;
                    if (null !== a) {
                        void 0 !== d && d in h(a) && (b = [d]), e = 0, f = b.length;
                        for (; !c.isUndefined(a) && e < f;) a = a[b[e++]];
                        return e && e === f ? a : void 0
                    }
                }, e = function(b, c, d) {
                    var e;
                    return e = null === b ? void 0 : a(b, i(c), c + ""), void 0 === e ? d : e
                }, c.get = e), this.intersectionObjects = function(a, b, d) {
                    var e;
                    return null == d && (d = void 0), e = c.map(a, function(a) {
                        return c.find(b, function(b) {
                            return null != d ? d(a, b) : c.isEqual(a, b)
                        })
                    }), c.filter(e, function(a) {
                        return null != a
                    })
                }, this.containsObject = c.includeObject = function(a, b, d) {
                    return null == d && (d = void 0), null !== a && c.some(a, function(a) {
                        return null != d ? d(a, b) : c.isEqual(a, b)
                    })
                }, this.differenceObjects = function(a, b, d) {
                    return null == d && (d = void 0), c.filter(a, function(a) {
                        return function(c) {
                            return !a.containsObject(b, c, d)
                        }
                    }(this))
                }, this.withoutObjects = this.differenceObjects, this.indexOfObject = function(a, b, d, e) {
                    var f, g;
                    if (null == a) return -1;
                    if (f = 0, g = a.length, e) {
                        if ("number" != typeof e) return f = c.sortedIndex(a, b), a[f] === b ? f : -1;
                        f = e < 0 ? Math.max(0, g + e) : e
                    }
                    for (; f < g;) {
                        if (null != d) {
                            if (d(a[f], b)) return f
                        } else if (c.isEqual(a[f], b)) return f;
                        f++
                    }
                    return -1
                }, this.isNullOrUndefined = function(a) {
                    return c.isNull(a || c.isUndefined(a))
                }, this
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.extensions").factory("uiGmapString", function() {
                return function(a) {
                    return this.contains = function(b, c) {
                        return a.indexOf(b, c) !== -1
                    }, this
                }
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmap_sync", [function() {
                return {
                    fakePromise: function() {
                        var a;
                        return a = void 0, {
                            then: function(b) {
                                return a = b
                            },
                            resolve: function() {
                                return a.apply(void 0, arguments)
                            }
                        }
                    }
                }
            }]).service("uiGmap_async", ["$timeout", "uiGmapPromise", "uiGmapLogger", "$q", "uiGmapDataStructures", "uiGmapGmapUtil", function(a, d, e, f, g, h) {
                var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B;
                return A = d.promiseTypes, t = d.isInProgress, z = d.promiseStatus, i = d.ExposedPromise, k = d.SniffedPromise, u = function(a, b) {
                    var c;
                    return c = a.promise(), c.promiseType = a.promiseType, c.$$state && e.debug("promiseType: " + c.promiseType + ", state: " + z(c.$$state.status)), c.cancelCb = b, c
                }, p = function(a, b) {
                    return a.promiseType === A.create && b.promiseType !== A.delete && b.promiseType !== A.init && (e.debug("lastPromise.promiseType " + b.promiseType + ", newPromiseType: " + a.promiseType + ", SKIPPED MUST COME AFTER DELETE ONLY"), !0)
                }, y = function(a, b, d) {
                    var f;
                    if (b.promiseType === A.delete && d.promiseType !== A.delete && null != d.cancelCb && c.isFunction(d.cancelCb) && t(d) && (e.debug("promiseType: " + b.promiseType + ", CANCELING LAST PROMISE type: " + d.promiseType), d.cancelCb("cancel safe"), f = a.peek(), null != f && t(f))) return f.hasOwnProperty("cancelCb") && c.isFunction(f.cancelCb) ? (e.debug("promiseType: " + f.promiseType + ", CANCELING FIRST PROMISE type: " + f.promiseType), f.cancelCb("cancel safe")) : e.warn("first promise was not cancelable")
                }, j = function(a, b, d) {
                    var e, f;
                    if (a.existingPieces) {
                        if (e = c.last(a.existingPieces._content), p(b, e)) return;
                        return y(a.existingPieces, b, e), f = i(e.finally(function() {
                            return u(b, d)
                        })), f.cancelCb = d, f.promiseType = b.promiseType, a.existingPieces.enqueue(f), e.finally(function() {
                            return a.existingPieces.dequeue()
                        })
                    }
                    return a.existingPieces = new g.Queue, a.existingPieces.enqueue(u(b, d))
                }, w = function(a, b, d, f, g) {
                    var h;
                    return null == d && (d = ""), h = function(a) {
                        if (e.debug(a + ": " + a), null != f && c.isFunction(f)) return f(a)
                    }, j(a, k(g, b), h)
                }, n = 80, r = {
                    value: null
                }, B = function(a, b, c) {
                    var d, e;
                    try {
                        return a.apply(b, c)
                    } catch (e) {
                        return d = e, r.value = d, r
                    }
                }, v = function(a, b, c, d) {
                    var f, g;
                    return g = B(a, b, d), g === r && (f = "error within chunking iterator: " + r.value, e.error(f), c.reject(f)), "cancel safe" !== g
                }, l = function(a, b, c) {
                    var d, e;
                    return d = a === b, e = b[c], d ? e : a[e]
                }, m = ["length", "forEach", "map"], s = function(a, d, e, f) {
                    var g, h, i;
                    if (b.isArray(a)) g = a;
                    else if (d) g = d;
                    else {
                        g = [];
                        for (h in a) i = a[h], a.hasOwnProperty(h) && !c.includes(m, h) && g.push(h)
                    }
                    return null == f && (f = e), b.isArray(g) && !(null != g ? g.length : void 0) && f !== e ? e() : f(g, d)
                }, o = function(d, e, f, g, h, i, j, k) {
                    return s(d, k, function(k, m) {
                        var n, p, q, r;
                        for (n = e && e < k.length ? e : k.length, p = j, q = !0; q && n-- && p < (k ? k.length : p + 1);) r = l(d, k, p), q = !!b.isFunction(r) || v(g, void 0, i, [r, p]), ++p;
                        if (k) {
                            if (!(q && p < k.length)) return i.resolve();
                            if (j = p, e) return null != h && c.isFunction(h) && v(h, void 0, i, []), a(function() {
                                return o(d, e, f, g, h, i, j, m)
                            }, f, !1)
                        }
                    })
                }, q = function(a, b, c, f, g, h, i) {
                    var j, k, l;
                    return null == c && (c = n), null == g && (g = 0), null == h && (h = 1), l = void 0, k = d.defer(), l = k.promise, h ? s(a, i, function() {
                        return k.resolve(), l
                    }, function(d, e) {
                        return o(a, c, h, b, f, k, g, e), l
                    }) : (j = "pause (delay) must be set from _async!", e.error(j), k.reject(j), l)
                }, x = function(a, b, c, e, f, g, h) {
                    var i;
                    return i = [], s(a, h, function() {
                        return d.resolve(i)
                    }, function(d, h) {
                        return q(a, function(a) {
                            return i.push(b(a))
                        }, c, e, f, g, h).then(function() {
                            return i
                        })
                    })
                }, {
                    each: q,
                    map: x,
                    managePromiseQueue: w,
                    promiseLock: w,
                    defaultChunkSize: n,
                    getArrayAndKeys: s,
                    chunkSizeFrom: function(a, b) {
                        return null == b && (b = void 0), c.isNumber(a) && (b = a), (h.isFalse(a) || a === !1) && (b = !1), b
                    }
                }
            }])
        }.call(this),
        function() {
            var a = [].indexOf || function(a) {
                    for (var b = 0, c = this.length; b < c; b++)
                        if (b in this && this[b] === a) return b;
                    return -1
                };
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapBaseObject", function() {
                var b, c;
                return c = ["extended", "included"], b = function() {
                    function b() {}
                    return b.extend = function(b) {
                        var d, e, f;
                        for (d in b) f = b[d], a.call(c, d) < 0 && (this[d] = f);
                        return null != (e = b.extended) && e.apply(this), this
                    }, b.include = function(b) {
                        var d, e, f;
                        for (d in b) f = b[d], a.call(c, d) < 0 && (this.prototype[d] = f);
                        return null != (e = b.included) && e.apply(this), this
                    }, b
                }()
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChildEvents", function() {
                return {
                    onChildCreation: function(a) {}
                }
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapCtrlHandle", ["$q", function(a) {
                var b;
                return b = {
                    handle: function(c, d) {
                        return c.$on("$destroy", function() {
                            return b.handle(c)
                        }), c.deferred = a.defer(), {
                            getScope: function() {
                                return c
                            }
                        }
                    },
                    mapPromise: function(a, b) {
                        var c;
                        return c = b.getScope(), c.deferred.promise.then(function(b) {
                            return a.map = b
                        }), c.deferred.promise
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapEventsHelper", ["uiGmapLogger", function(a) {
                var d, e;
                return e = function(a) {
                    return b.isDefined(a.events) && null != a.events && b.isObject(a.events)
                }, d = function(a, b) {
                    return e(a) ? a : e(b) ? b : void 0
                }, {
                    setEvents: function(a, e, f, g) {
                        var h;
                        if (h = d(e, f), null != h) return c.compact(c.map(h.events, function(d, i) {
                            var j;
                            if (g && (j = c(g).includes(i)), h.events.hasOwnProperty(i) && b.isFunction(h.events[i]) && !j) return google.maps.event.addListener(a, i, function() {
                                return e.$evalAsync || (e.$evalAsync = function() {}), e.$evalAsync(d.apply(e, [a, i, f, arguments]))
                            })
                        }))
                    },
                    removeEvents: function(a) {
                        var b, c;
                        if (a)
                            for (b in a) c = a[b], c && a.hasOwnProperty(b) && google.maps.event.removeListener(c)
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapFitHelper", ["uiGmapLogger", "$timeout", function(a, b) {
                return {
                    fit: function(a, d) {
                        var e, f, g, h, i;
                        if (d && (null != a ? a.length : void 0)) {
                            e = new google.maps.LatLngBounds, f = !1;
                            for (g in a) h = a[g], h && (f || (f = !0), i = c.isFunction(h.getPosition) ? h.getPosition() : h), e.extend(i);
                            if (f) return b(function() {
                                return d.fitBounds(e)
                            })
                        }
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapGmapUtil", ["uiGmapLogger", "$compile", function(a, d) {
                var e, f, g, h, i, j;
                return f = function(a, b, c) {
                    return a === b || c.indexOf(a) !== -1
                }, e = function(a) {
                    return f(a, !1, ["false", "FALSE", 0, "n", "N", "no", "NO"])
                }, h = function(a) {
                    return Array.isArray(a) && 2 === a.length ? a[1] : b.isDefined(a.type) && "Point" === a.type ? a.coordinates[1] : a.latitude
                }, i = function(a) {
                    return Array.isArray(a) && 2 === a.length ? a[0] : b.isDefined(a.type) && "Point" === a.type ? a.coordinates[0] : a.longitude
                }, g = function(a) {
                    if (a) return a instanceof google.maps.LatLng ? a : Array.isArray(a) && 2 === a.length ? new google.maps.LatLng(a[1], a[0]) : b.isDefined(a.type) && "Point" === a.type ? new google.maps.LatLng(a.coordinates[1], a.coordinates[0]) : new google.maps.LatLng(a.latitude, a.longitude)
                }, j = function(a) {
                    if (b.isUndefined(a)) return !1;
                    if (c.isArray(a)) {
                        if (2 === a.length) return !0
                    } else if (null != a && (null != a ? a.type : void 0) && "Point" === a.type && c.isArray(a.coordinates) && 2 === a.coordinates.length) return !0;
                    return !(!a || !b.isDefined((null != a ? a.latitude : void 0) && b.isDefined(null != a ? a.longitude : void 0)))
                }, {
                    setCoordsFromEvent: function(a, c) {
                        if (a) return Array.isArray(a) && 2 === a.length ? (a[1] = c.lat(), a[0] = c.lng()) : b.isDefined(a.type) && "Point" === a.type ? (a.coordinates[1] = c.lat(), a.coordinates[0] = c.lng()) : (a.latitude = c.lat(), a.longitude = c.lng()), a
                    },
                    getLabelPositionPoint: function(a) {
                        var b, c;
                        if (void 0 !== a) return a = /^([-\d\.]+)\s([-\d\.]+)$/.exec(a), b = parseFloat(a[1]), c = parseFloat(a[2]), null != b && null != c ? new google.maps.Point(b, c) : void 0
                    },
                    createWindowOptions: function(c, e, f, h) {
                        var i;
                        return null != f && null != h && null != d ? (i = b.extend({}, h, {
                            content: this.buildContent(e, h, f),
                            position: null != h.position ? h.position : b.isObject(c) ? c.getPosition() : g(e.coords)
                        }), null != c && null == (null != i ? i.pixelOffset : void 0) && (null == i.boxClass || (i.pixelOffset = {
                            height: 0,
                            width: -2
                        })), i) : h ? h : (a.error("infoWindow defaults not defined"), f ? void 0 : a.error("infoWindow content not defined"))
                    },
                    buildContent: function(a, b, c) {
                        var e, f;
                        return null != b.content ? f = b.content : null != d ? (c = c.replace(/^\s+|\s+$/g, ""), e = "" === c ? "" : d(c)(a), e.length > 0 && (f = e[0])) : f = c, f
                    },
                    defaultDelay: 50,
                    isTrue: function(a) {
                        return f(a, !0, ["true", "TRUE", 1, "y", "Y", "yes", "YES"])
                    },
                    isFalse: e,
                    isFalsy: function(a) {
                        return f(a, !1, [void 0, null]) || e(a)
                    },
                    getCoords: g,
                    validateCoords: j,
                    equalCoords: function(a, b) {
                        return h(a) === h(b) && i(a) === i(b)
                    },
                    validatePath: function(a) {
                        var d, e, f, g;
                        if (e = 0, b.isUndefined(a.type)) {
                            if (!Array.isArray(a) || a.length < 2) return !1;
                            for (; e < a.length;) {
                                if (!(b.isDefined(a[e].latitude) && b.isDefined(a[e].longitude) || "function" == typeof a[e].lat && "function" == typeof a[e].lng)) return !1;
                                e++
                            }
                            return !0
                        }
                        if (b.isUndefined(a.coordinates)) return !1;
                        if ("Polygon" === a.type) {
                            if (a.coordinates[0].length < 4) return !1;
                            d = a.coordinates[0]
                        } else if ("MultiPolygon" === a.type) {
                            if (g = {
                                    max: 0,
                                    index: 0
                                }, c.forEach(a.coordinates, function(a, b) {
                                    if (a[0].length > this.max) return this.max = a[0].length, this.index = b
                                }, g), f = a.coordinates[g.index], d = f[0], d.length < 4) return !1
                        } else {
                            if ("LineString" !== a.type) return !1;
                            if (a.coordinates.length < 2) return !1;
                            d = a.coordinates
                        }
                        for (; e < d.length;) {
                            if (2 !== d[e].length) return !1;
                            e++
                        }
                        return !0
                    },
                    convertPathPoints: function(a) {
                        var d, e, f, g, h;
                        if (e = 0, g = new google.maps.MVCArray, b.isUndefined(a.type))
                            for (; e < a.length;) b.isDefined(a[e].latitude) && b.isDefined(a[e].longitude) ? f = new google.maps.LatLng(a[e].latitude, a[e].longitude) : "function" == typeof a[e].lat && "function" == typeof a[e].lng && (f = a[e]), g.push(f), e++;
                        else
                            for ("Polygon" === a.type ? d = a.coordinates[0] : "MultiPolygon" === a.type ? (h = {
                                max: 0,
                                index: 0
                            }, c.forEach(a.coordinates, function(a, b) {
                                if (a[0].length > this.max) return this.max = a[0].length, this.index = b
                            }, h), d = a.coordinates[h.index][0]) : "LineString" === a.type && (d = a.coordinates); e < d.length;) g.push(new google.maps.LatLng(d[e][1], d[e][0])), e++;
                        return g
                    },
                    getPath: function(a, b) {
                        var d;
                        return null != b && c.isString(b) ? (d = a, c.each(b.split("."), function(a) {
                            if (d) return d = d[a]
                        }), d) : b
                    },
                    validateBoundPoints: function(a) {
                        return !(b.isUndefined(a.sw.latitude) || b.isUndefined(a.sw.longitude) || b.isUndefined(a.ne.latitude) || b.isUndefined(a.ne.longitude))
                    },
                    convertBoundPoints: function(a) {
                        var b;
                        return b = new google.maps.LatLngBounds(new google.maps.LatLng(a.sw.latitude, a.sw.longitude), new google.maps.LatLng(a.ne.latitude, a.ne.longitude))
                    },
                    fitMapBounds: function(a, b) {
                        return a.fitBounds(b)
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapIsReady", ["$q", "$timeout", function(a, b) {
                var c, d, e, f;
                return d = 0, f = [], e = function() {
                    return a.all(f)
                }, c = function(a, f, g) {
                    return b(function() {
                        return g <= 0 ? void a.reject("Your maps are not found we have checked the maximum amount of times. :)") : void(d !== f ? c(a, f, g - 1) : a.resolve(e()))
                    }, 100)
                }, {
                    spawn: function() {
                        var b;
                        return b = a.defer(), f.push(b.promise), d += 1, {
                            instance: d,
                            deferred: b
                        }
                    },
                    promises: e,
                    instances: function() {
                        return d
                    },
                    promise: function(b, d) {
                        var e;
                        return null == b && (b = 1), null == d && (d = 50), e = a.defer(), c(e, b, d), e.promise
                    },
                    reset: function() {
                        d = 0, f.length = 0
                    },
                    decrement: function() {
                        d > 0 && (d -= 1), f.length && (f.length -= 1)
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapLinked", ["uiGmapBaseObject", function(b) {
                var c;
                return c = function(b) {
                    function c(a, b, c, d) {
                        this.scope = a, this.element = b, this.attrs = c, this.ctrls = d
                    }
                    return a(c, b), c
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapLogger", ["nemSimpleLogger", function(a) {
                return a.spawn()
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelKey", ["uiGmapBaseObject", "uiGmapGmapUtil", function(e, f) {
                return function(e) {
                    function g(b, c) {
                        this.scope = b, this.interface = null != c ? c : {
                            scopeKeys: []
                        }, this.modelsLength = a(this.modelsLength, this), this.updateChild = a(this.updateChild, this), this.destroy = a(this.destroy, this), this.setChildScope = a(this.setChildScope, this), this.getChanges = a(this.getChanges, this), this.getProp = a(this.getProp, this), this.setIdKey = a(this.setIdKey, this), this.modelKeyComparison = a(this.modelKeyComparison, this), g.__super__.constructor.call(this), this.defaultIdKey = "id", this.idKey = void 0
                    }
                    return d(g, e), g.prototype.evalModelHandle = function(a, b) {
                        if (null != a && null != b) return "self" === b ? a : (c.isFunction(b) && (b = b()), f.getPath(a, b))
                    }, g.prototype.modelKeyComparison = function(a, b) {
                        var d, e, g, h, i, j;
                        if (g = this.interface.scopeKeys.indexOf("coords") >= 0, (g && null != this.scope.coords || !g) && (i = this.scope), null == i) throw "No scope set!";
                        return g && (d = this.scopeOrModelVal("coords", i, a), e = this.scopeOrModelVal("coords", i, b), h = f.equalCoords(d, e), !h) ? h : (j = c.without(this.interface.scopeKeys, "coords"), h = c.every(j, function(d) {
                            return function(e) {
                                var f, g;
                                return f = d.scopeOrModelVal(i[e], i, a), g = d.scopeOrModelVal(i[e], i, b), i.deepComparison ? c.isEqual(f, g) : f === g
                            }
                        }(this)))
                    }, g.prototype.setIdKey = function(a) {
                        return this.idKey = null != a.idKey ? a.idKey : this.defaultIdKey
                    }, g.prototype.setVal = function(a, b, c) {
                        return this.modelOrKey(a, b = c), a
                    }, g.prototype.modelOrKey = function(a, b) {
                        if (null != b) return "self" !== b ? f.getPath(a, b) : a
                    }, g.prototype.getProp = function(a, b, c) {
                        return this.scopeOrModelVal(a, b, c)
                    }, g.prototype.getChanges = function(a, b, d) {
                        var e, f, g;
                        d && (b = c.pick(b, d), a = c.pick(a, d)), f = {}, g = {}, e = {};
                        for (g in a) b && b[g] === a[g] || (c.isArray(a[g]) ? f[g] = a[g] : c.isObject(a[g]) ? (e = this.getChanges(a[g], b ? b[g] : null), c.isEmpty(e) || (f[g] = e)) : f[g] = a[g]);
                        return f
                    }, g.prototype.scopeOrModelVal = function(a, b, d, e) {
                        var f, g, h, i;
                        return null == e && (e = !1), f = function(a, b, c) {
                            return null == c && (c = !1), c ? {
                                isScope: a,
                                value: b
                            } : b
                        }, i = c.get(b, a), c.isFunction(i) ? f(!0, i(d), e) : c.isObject(i) ? f(!0, i, e) : c.isString(i) ? (g = i, h = g ? "self" === g ? d : c.get(d, g) : c.get(d, a), c.isFunction(h) ? f(!1, h(), e) : f(!1, h, e)) : f(!0, i, e)
                    }, g.prototype.setChildScope = function(a, b, c) {
                        var d, e, f, g;
                        for (e in a) f = a[e], d = this.scopeOrModelVal(f, b, c, !0), null != (null != d ? d.value : void 0) && (g = d.value, g !== b[f] && (b[f] = g));
                        return b.model = c
                    }, g.prototype.onDestroy = function(a) {}, g.prototype.destroy = function(a) {
                        var b;
                        return null == a && (a = !1), null == this.scope || (null != (b = this.scope) ? b.$$destroyed : void 0) || !this.needToManualDestroy && !a ? this.clean() : this.scope.$destroy()
                    }, g.prototype.updateChild = function(a, b) {
                        return null == b[this.idKey] ? void this.$log.error("Model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : a.updateModel(b)
                    }, g.prototype.modelsLength = function(a) {
                        var c, d;
                        return null == a && (a = void 0), c = 0, d = a ? a : this.scope.models, null == d ? c : c = b.isArray(d) || null != d.length ? d.length : Object.keys(d).length
                    }, g
                }(e)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelsWatcher", ["uiGmapLogger", "uiGmap_async", "$q", "uiGmapPromise", function(a, b, c, d) {
                return {
                    didQueueInitPromise: function(a, c) {
                        return 0 === c.models.length && (b.promiseLock(a, d.promiseTypes.init, null, null, function() {
                                return d.resolve()
                            }), !0)
                    },
                    figureOutState: function(b, c, d, e, f) {
                        var g, h, i, j, k;
                        return g = [], i = {}, j = [], k = [], c.models.forEach(function(f) {
                            var h;
                            return null == f[b] ? a.error(" id missing for model #{m.toString()},\ncan not use do comparison/insertion") : (i[f[b]] = {}, null == d.get(f[b]) ? g.push(f) : (h = d.get(f[b]), e(f, h.clonedModel, c) ? void 0 : k.push({
                                model: f,
                                child: h
                            })))
                        }), h = d.values(), h.forEach(function(c) {
                            var d;
                            return null == c ? void a.error("child undefined in ModelsWatcher.") : null == c.model ? void a.error("child.model undefined in ModelsWatcher.") : (d = c.model[b], null == i[d] ? j.push(c) : void 0)
                        }), {
                            adds: g,
                            removals: j,
                            updates: k
                        }
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapPromise", ["$q", "$timeout", "uiGmapLogger", function(a, b, d) {
                var e, f, g, h, i, j, k, l, m, n, o;
                return m = {
                    create: "create",
                    update: "update",
                    delete: "delete",
                    init: "init"
                }, l = {
                    IN_PROGRESS: 0,
                    RESOLVED: 1,
                    REJECTED: 2
                }, o = function() {
                    var a;
                    return a = {}, a["" + l.IN_PROGRESS] = "in-progress", a["" + l.RESOLVED] = "resolved", a["" + l.REJECTED] = "rejected", a
                }(), h = function(a) {
                    return a.$$state ? a.$$state.status === l.IN_PROGRESS : !a.hasOwnProperty("$$v") || void 0
                }, i = function(a) {
                    return a.$$state ? a.$$state.status === l.RESOLVED : !!a.hasOwnProperty("$$v") || void 0
                }, k = function(a) {
                    return o[a] || "done w error"
                }, e = function(b) {
                    var c, d, e;
                    return c = a.defer(), d = a.all([b, c.promise]), e = a.defer(), b.then(c.resolve, function() {}, function(a) {
                        return c.notify(a), e.notify(a)
                    }), d.then(function(a) {
                        return e.resolve(a[0] || a[1])
                    }, function(a) {
                        return e.reject(a)
                    }), e.promise.cancel = function(a) {
                        return null == a && (a = "canceled"), c.reject(a)
                    }, e.promise.notify = function(a) {
                        if (null == a && (a = "cancel safe"), e.notify(a), b.hasOwnProperty("notify")) return b.notify(a)
                    }, null != b.promiseType && (e.promise.promiseType = b.promiseType), e.promise
                }, f = function(a, b) {
                    return {
                        promise: a,
                        promiseType: b
                    }
                }, g = function() {
                    return a.defer()
                }, n = function() {
                    var b;
                    return b = a.defer(), b.resolve.apply(void 0, arguments), b.promise
                }, j = function(e) {
                    var f;
                    return c.isFunction(e) ? (f = a.defer(), b(function() {
                        var a;
                        return a = e(), f.resolve(a)
                    }), f.promise) : void d.error("uiGmapPromise.promise() only accepts functions")
                }, {
                    defer: g,
                    promise: j,
                    resolve: n,
                    promiseTypes: m,
                    isInProgress: h,
                    isResolved: i,
                    promiseStatus: k,
                    ExposedPromise: e,
                    SniffedPromise: f
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropMap", function() {
                var b;
                return b = function() {
                    function b() {
                        this.removeAll = a(this.removeAll, this), this.slice = a(this.slice, this), this.push = a(this.push, this), this.keys = a(this.keys, this), this.values = a(this.values, this), this.remove = a(this.remove, this), this.put = a(this.put, this), this.stateChanged = a(this.stateChanged, this), this.get = a(this.get, this), this.length = 0, this.dict = {}, this.didValsStateChange = !1, this.didKeysStateChange = !1, this.allVals = [], this.allKeys = []
                    }
                    return b.prototype.get = function(a) {
                        return this.dict[a]
                    }, b.prototype.stateChanged = function() {
                        return this.didValsStateChange = !0, this.didKeysStateChange = !0
                    }, b.prototype.put = function(a, b) {
                        return null == this.get(a) && this.length++, this.stateChanged(), this.dict[a] = b
                    }, b.prototype.remove = function(a, b) {
                        var c;
                        if (null == b && (b = !1), !b || this.get(a)) return c = this.dict[a], delete this.dict[a], this.length--, this.stateChanged(), c
                    }, b.prototype.valuesOrKeys = function(a) {
                        var b, d;
                        return null == a && (a = "Keys"), this["did" + a + "StateChange"] ? (d = [], b = [], c.each(this.dict, function(a, c) {
                            return d.push(a), b.push(c)
                        }), this.didKeysStateChange = !1, this.didValsStateChange = !1, this.allVals = d, this.allKeys = b, this["all" + a]) : this["all" + a]
                    }, b.prototype.values = function() {
                        return this.valuesOrKeys("Vals")
                    }, b.prototype.keys = function() {
                        return this.valuesOrKeys()
                    }, b.prototype.push = function(a, b) {
                        return null == b && (b = "key"), this.put(a[b], a)
                    }, b.prototype.slice = function() {
                        return this.keys().map(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, b.prototype.removeAll = function() {
                        return this.slice()
                    }, b.prototype.each = function(a) {
                        return c.each(this.dict, function(b, c) {
                            return a(b)
                        })
                    }, b.prototype.map = function(a) {
                        return c.map(this.dict, function(b, c) {
                            return a(b)
                        })
                    }, b
                }()
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropertyAction", ["uiGmapLogger", function(a) {
                var b;
                return b = function(a) {
                    return this.setIfChange = function(b) {
                        return function(d, e) {
                            if (!c.isEqual(e, d)) return a(b, d)
                        }
                    }, this.sic = this.setIfChange, this
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapClustererMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap", "uiGmapEventsHelper", function(c, d, e, f) {
                var g;
                return g = function() {
                    function g(b, d, f, h) {
                        null == d && (d = {}), this.opt_options = null != f ? f : {}, this.opt_events = h, this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.destroy = a(this.destroy, this), this.attachEvents = a(this.attachEvents, this), this.clear = a(this.clear, this), this.draw = a(this.draw, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = g.type, this.clusterer = new NgMapMarkerClusterer(b, d, this.opt_options), this.propMapGMarkers = new e, this.attachEvents(this.opt_events, "opt_events"), this.clusterer.setIgnoreHidden(!0), this.noDrawOnSingleAddRemoves = !0, c.info(this)
                    }
                    return g.type = "ClustererMarkerManager", g.prototype.checkKey = function(a) {
                        var b;
                        if (null == a.key) return b = "gMarker.key undefined and it is REQUIRED!!", c.error(b)
                    }, g.prototype.add = function(a) {
                        return this.checkKey(a), this.clusterer.addMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.put(a.key, a), this.checkSync()
                    }, g.prototype.update = function(a) {
                        return this.remove(a), this.add(a)
                    }, g.prototype.addMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.add(b)
                            }
                        }(this))
                    }, g.prototype.remove = function(a) {
                        var b;
                        return this.checkKey(a), b = this.propMapGMarkers.get(a.key), b && (this.clusterer.removeMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.remove(a.key)), this.checkSync()
                    }, g.prototype.removeMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, g.prototype.draw = function() {
                        return this.clusterer.repaint()
                    }, g.prototype.clear = function() {
                        return this.removeMany(this.getGMarkers()), this.clusterer.repaint()
                    }, g.prototype.attachEvents = function(a, d) {
                        var e, f, g;
                        if (this.listeners = [], b.isDefined(a) && null != a && b.isObject(a)) {
                            g = [];
                            for (f in a) e = a[f], a.hasOwnProperty(f) && b.isFunction(a[f]) ? (c.info(d + ": Attaching event: " + f + " to clusterer"), g.push(this.listeners.push(google.maps.event.addListener(this.clusterer, f, a[f])))) : g.push(void 0);
                            return g
                        }
                    }, g.prototype.clearEvents = function() {
                        return f.removeEvents(this.listeners), this.listeners = []
                    }, g.prototype.destroy = function() {
                        return this.clearEvents(), this.clear()
                    }, g.prototype.fit = function() {
                        return d.fit(this.getGMarkers(), this.clusterer.getMap())
                    }, g.prototype.getGMarkers = function() {
                        return this.clusterer.getMarkers().values()
                    }, g.prototype.checkSync = function() {}, g
                }()
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.managers").service("uiGmapGoogleMapObjectManager", [function() {
                var a, c;
                return a = [], c = [], {
                    createMapInstance: function(d, e) {
                        var f;
                        return f = null, 0 === a.length ? (f = new google.maps.Map(d, e), c.push(f)) : (f = a.pop(), b.element(d).append(f.getDiv()), f.setOptions(e), c.push(f)), f
                    },
                    recycleMapInstance: function(b) {
                        var d;
                        if (d = c.indexOf(b), d < 0) throw new Error("Expected map instance to be a previously used instance");
                        return c.splice(d, 1), a.push(b)
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap", function(b, c, d) {
                var e;
                return e = function() {
                    function e(c, f, g) {
                        this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.handleOptDraw = a(this.handleOptDraw, this), this.clear = a(this.clear, this), this.destroy = a(this.destroy, this), this.draw = a(this.draw, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = e.type, this.gMap = c, this.gMarkers = new d, this.$log = b, this.$log.info(this)
                    }
                    return e.type = "MarkerManager", e.prototype.add = function(a, c) {
                        var d, e;
                        if (null == c && (c = !0), null == a.key) throw e = "gMarker.key undefined and it is REQUIRED!!", b.error(e), e;
                        if (d = this.gMarkers.get(a.key), !d) return this.handleOptDraw(a, c, !0), this.gMarkers.put(a.key, a)
                    }, e.prototype.update = function(a, b) {
                        return null == b && (b = !0), this.remove(a, b), this.add(a, b)
                    }, e.prototype.addMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.add(b)
                            }
                        }(this))
                    }, e.prototype.remove = function(a, b) {
                        if (null == b && (b = !0), this.handleOptDraw(a, b, !1), this.gMarkers.get(a.key)) return this.gMarkers.remove(a.key)
                    }, e.prototype.removeMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, e.prototype.draw = function() {
                        var a;
                        return a = [], this.gMarkers.each(function(b) {
                            return function(c) {
                                if (!c.isDrawn) return c.doAdd ? (c.setMap(b.gMap), c.isDrawn = !0) : a.push(c)
                            }
                        }(this)), a.forEach(function(a) {
                            return function(b) {
                                return b.isDrawn = !1, a.remove(b, !0)
                            }
                        }(this))
                    }, e.prototype.destroy = function() {
                        return this.clear()
                    }, e.prototype.clear = function() {
                        return this.gMarkers.each(function(a) {
                            return a.setMap(null)
                        }), delete this.gMarkers, this.gMarkers = new d
                    }, e.prototype.handleOptDraw = function(a, b, c) {
                        return b === !0 ? (c ? a.setMap(this.gMap) : a.setMap(null), a.isDrawn = !0) : (a.isDrawn = !1, a.doAdd = c)
                    }, e.prototype.fit = function() {
                        return c.fit(this.getGMarkers(), this.gMap)
                    }, e.prototype.getGMarkers = function() {
                        return this.gMarkers.values()
                    }, e
                }()
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapSpiderfierMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap", "uiGmapMarkerSpiderfier", function(d, e, f, g) {
                var h;
                return h = function() {
                    function h(b, c, e, i, j) {
                        null == c && (c = {}), this.opt_options = null != e ? e : {}, this.opt_events = i, this.scope = j, this.isSpiderfied = a(this.isSpiderfied, this), this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.destroy = a(this.destroy, this), this.attachEvents = a(this.attachEvents, this), this.clear = a(this.clear, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = h.type, this.markerSpiderfier = new g(b, this.opt_options), this.propMapGMarkers = new f, this.attachEvents(this.opt_events, "opt_events"), this.noDrawOnSingleAddRemoves = !0, d.info(this)
                    }
                    return h.type = "SpiderfierMarkerManager", h.prototype.checkKey = function(a) {
                        var b;
                        if (null == a.key) return b = "gMarker.key undefined and it is REQUIRED!!", d.error(b)
                    }, h.prototype.add = function(a) {
                        return a.setMap(this.markerSpiderfier.map), this.checkKey(a), this.markerSpiderfier.addMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.put(a.key, a), this.checkSync()
                    }, h.prototype.update = function(a) {
                        return this.remove(a), this.add(a)
                    }, h.prototype.addMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.add(b)
                            }
                        }(this))
                    }, h.prototype.remove = function(a) {
                        var b;
                        return this.checkKey(a), b = this.propMapGMarkers.get(a.key), b && (a.setMap(null), this.markerSpiderfier.removeMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.remove(a.key)), this.checkSync()
                    }, h.prototype.removeMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, h.prototype.draw = function() {}, h.prototype.clear = function() {
                        return this.removeMany(this.getGMarkers())
                    }, h.prototype.attachEvents = function(a, e) {
                        if (b.isDefined(a) && null != a && b.isObject(a)) return c.each(a, function(c) {
                            return function(f, g) {
                                if (a.hasOwnProperty(g) && b.isFunction(a[g])) return d.info(e + ": Attaching event: " + g + " to markerSpiderfier"), c.markerSpiderfier.addListener(g, function() {
                                    return "spiderfy" === g || "unspiderfy" === g ? c.scope.$evalAsync(a[g].apply(a, arguments)) : c.scope.$evalAsync(a[g].apply(a, [arguments[0], g, arguments[0].model, arguments]))
                                })
                            }
                        }(this))
                    }, h.prototype.clearEvents = function(a, c) {
                        var e, f;
                        if (b.isDefined(a) && null != a && b.isObject(a))
                            for (f in a) e = a[f], a.hasOwnProperty(f) && b.isFunction(a[f]) && (d.info(c + ": Clearing event: " + f + " to markerSpiderfier"), this.markerSpiderfier.clearListeners(f))
                    }, h.prototype.destroy = function() {
                        return this.clearEvents(this.opt_events, "opt_events"), this.clear()
                    }, h.prototype.fit = function() {
                        return e.fit(this.getGMarkers(), this.markerSpiderfier.map)
                    }, h.prototype.getGMarkers = function() {
                        return this.markerSpiderfier.getMarkers()
                    }, h.prototype.isSpiderfied = function() {
                        return c.find(this.getGMarkers(), function(a) {
                            return null != (null != a ? a._omsData : void 0)
                        })
                    }, h.prototype.checkSync = function() {}, h
                }()
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").factory("uiGmapadd-events", ["$timeout", function(a) {
                var c, d;
                return c = function(b, c, d) {
                    return google.maps.event.addListener(b, c, function() {
                        return d.apply(this, arguments), a(function() {}, !0)
                    })
                }, d = function(a, d, e) {
                    var f;
                    return e ? c(a, d, e) : (f = [], b.forEach(d, function(b, d) {
                        return f.push(c(a, d, b))
                    }), function() {
                        return b.forEach(f, function(a) {
                            return google.maps.event.removeListener(a)
                        }), f = null
                    })
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").factory("uiGmaparray-sync", ["uiGmapadd-events", function(a) {
                return function(c, d, e, f) {
                    var g, h, i, j, k, l, m, n, o;
                    return j = !1, n = d.$eval(e), d.static || (k = {
                        set_at: function(a) {
                            var b;
                            if (!j && (b = c.getAt(a))) return b.lng && b.lat ? (n[a].latitude = b.lat(), n[a].longitude = b.lng()) : n[a] = b
                        },
                        insert_at: function(a) {
                            var b;
                            if (!j && (b = c.getAt(a))) return b.lng && b.lat ? n.splice(a, 0, {
                                latitude: b.lat(),
                                longitude: b.lng()
                            }) : n.splice(a, 0, b)
                        },
                        remove_at: function(a) {
                            if (!j) return n.splice(a, 1)
                        }
                    }, "Polygon" === n.type ? g = n.coordinates[0] : "LineString" === n.type && (g = n.coordinates), h = {
                        set_at: function(a) {
                            var b;
                            if (!j && (b = c.getAt(a), b && b.lng && b.lat)) return g[a][1] = b.lat(), g[a][0] = b.lng()
                        },
                        insert_at: function(a) {
                            var b;
                            if (!j && (b = c.getAt(a), b && b.lng && b.lat)) return g.splice(a, 0, [b.lng(), b.lat()])
                        },
                        remove_at: function(a) {
                            if (!j) return g.splice(a, 1)
                        }
                    }, m = a(c, b.isUndefined(n.type) ? k : h)), l = function(a) {
                        var b, d, e, g, h, i, k, l;
                        if (j = !0, i = c, b = !1, a) {
                            for (d = 0, k = i.getLength(), g = a.length, e = Math.min(k, g), h = void 0; d < e;) l = i.getAt(d), h = a[d], "function" == typeof h.equals ? h.equals(l) || (i.setAt(d, h), b = !0) : l.lat() === h.latitude && l.lng() === h.longitude || (i.setAt(d, new google.maps.LatLng(h.latitude, h.longitude)), b = !0), d++;
                            for (; d < g;) h = a[d], "function" == typeof h.lat && "function" == typeof h.lng ? i.push(h) : i.push(new google.maps.LatLng(h.latitude, h.longitude)), b = !0, d++;
                            for (; d < k;) i.pop(), b = !0, d++
                        }
                        if (j = !1, b) return f(i)
                    }, i = function(a) {
                        var b, d, e, g, h, i, k, l, m;
                        if (j = !0, k = c, d = !1, a) {
                            for ("Polygon" === n.type ? b = a.coordinates[0] : "LineString" === n.type && (b = a.coordinates), e = 0, l = k.getLength(), h = b.length, g = Math.min(l, h), i = void 0; e < g;) m = k.getAt(e), i = b[e], m.lat() === i[1] && m.lng() === i[0] || (k.setAt(e, new google.maps.LatLng(i[1], i[0])), d = !0), e++;
                            for (; e < h;) i = b[e], k.push(new google.maps.LatLng(i[1], i[0])), d = !0, e++;
                            for (; e < l;) k.pop(), d = !0, e++
                        }
                        if (j = !1, d) return f(k)
                    }, d.static || (o = b.isUndefined(n.type) ? d.$watchCollection(e, l) : d.$watch(e, i, !0)),
                        function() {
                            if (m && (m(), m = null), o) return o(), o = null
                        }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChromeFixes", ["$timeout", function(a) {
                return {
                    maybeRepaint: function(b) {
                        if (b) return b.style.opacity = .9, a(function() {
                            return b.style.opacity = 1
                        })
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").service("uiGmapObjectIterators", function() {
                var a, b, d, e;
                return a = ["length", "forEach", "map"], b = [], d = function(b) {
                    return b.forEach = function(d) {
                        return c.each(c.omit(b, a), function(a) {
                            if (!c.isFunction(a)) return d(a)
                        })
                    }, b
                }, b.push(d), e = function(b) {
                    return b.map = function(d) {
                        return c.map(c.omit(b, a), function(a) {
                            if (!c.isFunction(a)) return d(a)
                        })
                    }, b
                }, b.push(e), {
                    slapMap: e,
                    slapForEach: d,
                    slapAll: function(a) {
                        return b.forEach(function(b) {
                            return b(a)
                        }), a
                    }
                }
            })
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.options.builders").service("uiGmapCommonOptionsBuilder", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapModelKey", function(d, e, f) {
                var g;
                return g = function(d) {
                    function f() {
                        return this.watchProps = a(this.watchProps, this), this.buildOpts = a(this.buildOpts, this), f.__super__.constructor.apply(this, arguments)
                    }
                    return c(f, d), f.prototype.props = ["clickable", "draggable", "editable", "visible", {
                        prop: "stroke",
                        isColl: !0
                    }], f.prototype.getCorrectModel = function(a) {
                        return b.isDefined(null != a ? a.model : void 0) ? a.model : a
                    }, f.prototype.buildOpts = function(a, c, d) {
                        var f, g, h;
                        return null == a && (a = {}), null == d && (d = {}), this.scope ? this.gMap ? (f = this.getCorrectModel(this.scope), h = this.scopeOrModelVal("stroke", this.scope, f), g = b.extend(a, this.DEFAULTS, {
                            map: this.gMap,
                            strokeColor: null != h ? h.color : void 0,
                            strokeOpacity: null != h ? h.opacity : void 0,
                            strokeWeight: null != h ? h.weight : void 0
                        }), b.forEach(b.extend(d, {
                            clickable: !0,
                            draggable: !1,
                            editable: !1,
                            static: !1,
                            fit: !1,
                            visible: !0,
                            zIndex: 0,
                            icons: []
                        }), function(a) {
                            return function(d, e) {
                                var h;
                                return h = c ? c[e] : a.scopeOrModelVal(e, a.scope, f), b.isUndefined(h) ? g[e] = d : g[e] = f[e]
                            }
                        }(this)), g.static && (g.editable = !1), g) : void e.error("this.map not defined in CommonOptionsBuilder can not buildOpts") : void e.error("this.scope not defined in CommonOptionsBuilder can not buildOpts")
                    }, f.prototype.watchProps = function(a) {
                        return null == a && (a = this.props), a.forEach(function(a) {
                            return function(b) {
                                if (null != a.attrs[b] || null != a.attrs[null != b ? b.prop : void 0]) return (null != b ? b.isColl : void 0) ? a.scope.$watchCollection(b.prop, a.setMyOptions) : a.scope.$watch(b, a.setMyOptions)
                            }
                        }(this))
                    }, f
                }(f)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.options.builders").factory("uiGmapPolylineOptionsBuilder", ["uiGmapCommonOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b) {
                        return c.__super__.buildOpts.call(this, {
                            path: a
                        }, b, {
                            geodesic: !1
                        })
                    }, c
                }(b)
            }]).factory("uiGmapShapeOptionsBuilder", ["uiGmapCommonOptionsBuilder", function(c) {
                var d;
                return d = function(c) {
                    function d() {
                        return d.__super__.constructor.apply(this, arguments)
                    }
                    return a(d, c), d.prototype.buildOpts = function(a, c, e) {
                        var f, g;
                        return g = this.getCorrectModel(this.scope), f = c ? c.fill : this.scopeOrModelVal("fill", this.scope, g), a = b.extend(a, {
                            fillColor: null != f ? f.color : void 0,
                            fillOpacity: null != f ? f.opacity : void 0
                        }), d.__super__.buildOpts.call(this, a, c, e)
                    }, d
                }(c)
            }]).factory("uiGmapPolygonOptionsBuilder", ["uiGmapShapeOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b) {
                        return c.__super__.buildOpts.call(this, {
                            path: a
                        }, b, {
                            geodesic: !1
                        })
                    }, c
                }(b)
            }]).factory("uiGmapRectangleOptionsBuilder", ["uiGmapShapeOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b) {
                        return c.__super__.buildOpts.call(this, {
                            bounds: a
                        }, b)
                    }, c
                }(b)
            }]).factory("uiGmapCircleOptionsBuilder", ["uiGmapShapeOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b, d) {
                        return c.__super__.buildOpts.call(this, {
                            center: a,
                            radius: b
                        }, d)
                    }, c
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.options").service("uiGmapMarkerOptions", ["uiGmapLogger", "uiGmapGmapUtil", function(a, d) {
                return c.extend(d, {
                    createOptions: function(a, c, e, f) {
                        var g;
                        return null == e && (e = {}), g = b.extend({}, e, {
                            position: null != e.position ? e.position : d.getCoords(a),
                            visible: null != e.visible ? e.visible : d.validateCoords(a)
                        }), null == e.icon && null == c || (g = b.extend(g, {
                            icon: null != e.icon ? e.icon : c
                        })), null != f && (g.map = f), g
                    },
                    isLabel: function(a) {
                        return null != a && (null != a.labelContent || null != a.labelAnchor || null != a.labelClass || null != a.labelStyle || null != a.labelVisible)
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapBasePolyChildModel", ["uiGmapLogger", "$timeout", "uiGmaparray-sync", "uiGmapGmapUtil", "uiGmapEventsHelper", function(e, f, g, h, i) {
                return function(e, f) {
                    var j;
                    return j = function(e) {
                        function j(d) {
                            var e, h, j;
                            this.scope = d.scope, this.attrs = d.attrs, this.gMap = d.gMap, this.defaults = d.defaults, this.model = d.model, h = d.gObjectChangeCb, this.isScopeModel = null != (j = d.isScopeModel) && j, this.clean = a(this.clean, this), this.isScopeModel && (this.clonedModel = c.clone(this.model, !0)), this.isDragging = !1, this.internalEvents = {
                                dragend: function(a) {
                                    return function() {
                                        return c.defer(function() {
                                            return a.isDragging = !1
                                        })
                                    }
                                }(this),
                                dragstart: function(a) {
                                    return function() {
                                        return a.isDragging = !0
                                    }
                                }(this)
                            }, e = function(a) {
                                return function() {
                                    var c;
                                    if (!a.isDragging) return a.pathPoints = a.convertPathPoints(a.scope.path), null != a.gObject && a.clean(), null != a.scope.model && (c = a.scope), a.pathPoints.length > 0 && (a.gObject = f(a.buildOpts(a.pathPoints, c))), a.gObject ? (g(a.gObject.getPath(), a.scope, "path", function(b) {
                                        if (a.pathPoints = b, null != h) return h()
                                    }), b.isDefined(a.scope.events) && b.isObject(a.scope.events) && (a.listeners = a.model ? i.setEvents(a.gObject, a.scope, a.model) : i.setEvents(a.gObject, a.scope, a.scope)), a.internalListeners = a.model ? i.setEvents(a.gObject, {
                                        events: a.internalEvents
                                    }, a.model) : i.setEvents(a.gObject, {
                                        events: a.internalEvents
                                    }, a.scope)) : void 0
                                }
                            }(this), e(), this.scope.$watch("path", function(a) {
                                return function(b, d) {
                                    if (!c.isEqual(b, d) || !a.gObject) return e()
                                }
                            }(this), !0), !this.scope.static && b.isDefined(this.scope.editable) && this.scope.$watch("editable", function(a) {
                                return function(b, c) {
                                    var d;
                                    if (b !== c) return b = !a.isFalse(b), null != (d = a.gObject) ? d.setEditable(b) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.draggable) && this.scope.$watch("draggable", function(a) {
                                return function(b, c) {
                                    var d;
                                    if (b !== c) return b = !a.isFalse(b), null != (d = a.gObject) ? d.setDraggable(b) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.visible) && this.scope.$watch("visible", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c && (b = !a.isFalse(b)), null != (d = a.gObject) ? d.setVisible(b) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.geodesic) && this.scope.$watch("geodesic", function(a) {
                                return function(b, c) {
                                    var d;
                                    if (b !== c) return b = !a.isFalse(b), null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.weight) && this.scope.$watch("stroke.weight", function(a) {
                                return function(b, c) {
                                    var d;
                                    if (b !== c) return null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.color) && this.scope.$watch("stroke.color", function(a) {
                                return function(b, c) {
                                    var d;
                                    if (b !== c) return null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.opacity) && this.scope.$watch("stroke.opacity", function(a) {
                                return function(b, c) {
                                    var d;
                                    if (b !== c) return null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.icons) && this.scope.$watch("icons", function(a) {
                                return function(b, c) {
                                    var d;
                                    if (b !== c) return null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), this.scope.$on("$destroy", function(a) {
                                return function() {
                                    return a.clean(), a.scope = null
                                }
                            }(this)), b.isDefined(this.scope.fill) && b.isDefined(this.scope.fill.color) && this.scope.$watch("fill.color", function(a) {
                                return function(b, c) {
                                    if (b !== c) return a.gObject.setOptions(a.buildOpts(a.gObject.getPath()))
                                }
                            }(this)), b.isDefined(this.scope.fill) && b.isDefined(this.scope.fill.opacity) && this.scope.$watch("fill.opacity", function(a) {
                                return function(b, c) {
                                    if (b !== c) return a.gObject.setOptions(a.buildOpts(a.gObject.getPath()))
                                }
                            }(this)), b.isDefined(this.scope.zIndex) && this.scope.$watch("zIndex", function(a) {
                                return function(b, c) {
                                    if (b !== c) return a.gObject.setOptions(a.buildOpts(a.gObject.getPath()))
                                }
                            }(this))
                        }
                        return d(j, e), j.include(h), j.prototype.clean = function() {
                            var a;
                            return i.removeEvents(this.listeners), i.removeEvents(this.internalListeners), null != (a = this.gObject) && a.setMap(null), this.gObject = null
                        }, j
                    }(e)
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapDrawFreeHandChildModel", ["uiGmapLogger", "$q", function(a, b) {
                var d, e;
                return d = function(a, b, c) {
                    var d, e;
                    e = new google.maps.Polyline({
                        map: a,
                        clickable: !1
                    }), d = google.maps.event.addListener(a, "mousemove", function(a) {
                        return e.getPath().push(a.latLng)
                    }), google.maps.event.addListenerOnce(a, "mouseup", function(f) {
                        var g;
                        return google.maps.event.removeListener(d), g = e.getPath(), e.setMap(null), b.push(new google.maps.Polygon({
                            map: a,
                            path: g
                        })), e = null, google.maps.event.clearListeners(a.getDiv(), "mousedown"), c()
                    })
                }, e = function(e, f) {
                    var g, h;
                    return this.map = e, g = function(b) {
                        return function() {
                            var c;
                            return c = {
                                draggable: !1,
                                disableDefaultUI: !0,
                                scrollwheel: !1,
                                disableDoubleClickZoom: !1
                            }, a.info("disabling map move"), b.map.setOptions(c)
                        }
                    }(this), h = function(a) {
                        return function() {
                            var b, d;
                            return b = {
                                draggable: !0,
                                disableDefaultUI: !1,
                                scrollwheel: !0,
                                disableDoubleClickZoom: !0
                            }, null != (d = a.deferred) && d.resolve(), c.defer(function() {
                                return a.map.setOptions(c.extend(b, f.options))
                            })
                        }
                    }(this), this.engage = function(c) {
                        return function(e) {
                            return c.polys = e, c.deferred = b.defer(), g(), a.info("DrawFreeHandChildModel is engaged (drawing)."), google.maps.event.addDomListener(c.map.getDiv(), "mousedown", function(a) {
                                return d(c.map, c.polys, h)
                            }), c.deferred.promise
                        }
                    }(this), this
                }
            }])
        }.call(this),
        function() {
            var d = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                e = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) f.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                f = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapMarkerChildModel", ["uiGmapModelKey", "uiGmapGmapUtil", "uiGmapLogger", "uiGmapEventsHelper", "uiGmapPropertyAction", "uiGmapMarkerOptions", "uiGmapIMarker", "uiGmapMarkerManager", "uiGmapPromise", function(f, g, h, i, j, k, l, m, n) {
                var o;
                return o = function(f) {
                    function o(a) {
                        this.internalEvents = d(this.internalEvents, this), this.setLabelOptions = d(this.setLabelOptions, this), this.setOptions = d(this.setOptions, this), this.setIcon = d(this.setIcon, this), this.setCoords = d(this.setCoords, this), this.isNotValid = d(this.isNotValid, this), this.maybeSetScopeValue = d(this.maybeSetScopeValue, this), this.createMarker = d(this.createMarker, this), this.setMyScope = d(this.setMyScope, this), this.updateModel = d(this.updateModel, this), this.handleModelChanges = d(this.handleModelChanges, this), this.destroy = d(this.destroy, this);
                        var b, e, f, g, i, k, l;
                        l = a.scope, this.model = a.model, this.keys = a.keys, this.gMap = a.gMap, this.defaults = null != (e = a.defaults) ? e : {}, this.doClick = a.doClick, this.gManager = a.gManager, this.doDrawSelf = null == (f = a.doDrawSelf) || f, this.trackModel = null == (g = a.trackModel) || g, this.needRedraw = null != (i = a.needRedraw) && i, this.isScopeModel = null != (k = a.isScopeModel) && k, this.isScopeModel && (this.clonedModel = c.clone(this.model, !0)), this.deferred = n.defer(), c.each(this.keys, function(a) {
                            return function(b, d) {
                                var e;
                                if (e = a.keys[d], null != e && !c.isFunction(e) && c.isString(e)) return a[d + "Key"] = e
                            }
                        }(this)), this.idKey = this.idKeyKey || "id", null != this.model[this.idKey] && (this.id = this.model[this.idKey]), o.__super__.constructor.call(this, l), this.scope.getGMarker = function(a) {
                            return function() {
                                return a.gObject
                            }
                        }(this), this.firstTime = !0, this.trackModel ? (this.scope.model = this.model, this.scope.$watch("model", function(a) {
                            return function(b, c) {
                                if (b !== c) return a.handleModelChanges(b, c)
                            }
                        }(this), !0)) : (b = new j(function(a) {
                            return function(b) {
                                if (c.isFunction(b) && (b = "all"), !a.firstTime) return a.setMyScope(b, l)
                            }
                        }(this), !1), c.each(this.keys, function(a, c) {
                            return l.$watch(c, b.sic(c), !0)
                        })), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return p(a)
                            }
                        }(this)), this.createMarker(this.model), h.info(this)
                    }
                    var p;
                    return e(o, f), o.include(g), o.include(i), o.include(k), p = function(a) {
                        if (null != (null != a ? a.gObject : void 0) && (a.removeEvents(a.externalListeners), a.removeEvents(a.internalListeners), null != a ? a.gObject : void 0)) return a.removeFromManager && a.gManager.remove(a.gObject), a.gObject.setMap(null), a.gObject = null
                    }, o.prototype.destroy = function(a) {
                        return null == a && (a = !0), this.removeFromManager = a, this.scope.$destroy()
                    }, o.prototype.handleModelChanges = function(a, b) {
                        var d, e, f;
                        if (d = this.getChanges(a, b, l.keys), !this.firstTime) return e = 0, f = c.keys(d).length, c.each(d, function(c) {
                            return function(d, g) {
                                var h;
                                return e += 1, h = f === e, c.setMyScope(g, a, b, !1, !0, h), c.needRedraw = !0
                            }
                        }(this))
                    }, o.prototype.updateModel = function(a) {
                        return this.isScopeModel && (this.clonedModel = c.clone(a, !0)), this.setMyScope("all", a, this.model)
                    }, o.prototype.renderGMarker = function(b, c) {
                        var d, e, f;
                        if (null == b && (b = !0), d = this.getProp("coords", this.scope, this.model), null != (null != (f = this.gManager) ? f.isSpiderfied : void 0) && (e = this.gManager.isSpiderfied()), null != d) {
                            if (!this.validateCoords(d)) return void h.debug("MarkerChild does not have coords yet. They may be defined later.");
                            if (null != c && c(), b && this.gObject && this.gManager.add(this.gObject), e) return this.gManager.markerSpiderfier.spiderListener(this.gObject, a.event)
                        } else if (b && this.gObject) return this.gManager.remove(this.gObject)
                    }, o.prototype.setMyScope = function(a, b, d, e, f) {
                        var g;
                        switch (null == d && (d = void 0), null == e && (e = !1), null == f && (f = !0), null == b ? b = this.model : this.model = b, this.gObject || (this.setOptions(this.scope, f), g = !0), a) {
                            case "all":
                                return c.each(this.keys, function(a) {
                                    return function(c, g) {
                                        return a.setMyScope(g, b, d, e, f)
                                    }
                                }(this));
                            case "icon":
                                return this.maybeSetScopeValue({
                                    gSetter: this.setIcon,
                                    doDraw: f
                                });
                            case "coords":
                                return this.maybeSetScopeValue({
                                    gSetter: this.setCoords,
                                    doDraw: f
                                });
                            case "options":
                                if (!g) return this.createMarker(b, d, e, f)
                        }
                    }, o.prototype.createMarker = function(a, b, c, d) {
                        return null == b && (b = void 0), null == c && (c = !1), null == d && (d = !0), this.maybeSetScopeValue({
                            gSetter: this.setOptions,
                            doDraw: d
                        }), this.firstTime = !1
                    }, o.prototype.maybeSetScopeValue = function(a) {
                        var b, c, d;
                        if (c = a.gSetter, b = null == (d = a.doDraw) || d, null != c && c(this.scope, b), this.doDrawSelf && b) return this.gManager.draw()
                    }, o.prototype.isNotValid = function(a, b) {
                        var c, d;
                        return null == b && (b = !0), d = !!b && void 0 === this.gObject, c = !this.trackModel && a.$id !== this.scope.$id, c || d
                    }, o.prototype.setCoords = function(a, b) {
                        if (null == b && (b = !0), !this.isNotValid(a) && null != this.gObject) return this.renderGMarker(b, function(b) {
                            return function() {
                                var c, d, e;
                                if (d = b.getProp("coords", a, b.model), c = b.getCoords(d), e = b.gObject.getPosition(), null == e || null == c || c.lng() !== e.lng() || c.lat() !== e.lat()) return b.gObject.setPosition(c), b.gObject.setVisible(b.validateCoords(d))
                            }
                        }(this))
                    }, o.prototype.setIcon = function(a, b) {
                        if (null == b && (b = !0), !this.isNotValid(a) && null != this.gObject) return this.renderGMarker(b, function(b) {
                            return function() {
                                var c, d, e;
                                if (e = b.gObject.getIcon(), d = b.getProp("icon", a, b.model), e !== d) return b.gObject.setIcon(d), c = b.getProp("coords", a, b.model), b.gObject.setPosition(b.getCoords(c)), b.gObject.setVisible(b.validateCoords(c))
                            }
                        }(this))
                    }, o.prototype.setOptions = function(a, b) {
                        var d;
                        if (null == b && (b = !0), !this.isNotValid(a, !1)) {
                            if (this.renderGMarker(b, function(b) {
                                    return function() {
                                        var d, e, f;
                                        if (e = b.getProp("coords", a, b.model), f = b.getProp("icon", a, b.model), d = b.getProp("options", a, b.model), b.opts = b.createOptions(e, f, d), b.isLabel(b.gObject) !== b.isLabel(b.opts) && null != b.gObject && (b.gManager.remove(b.gObject), b.gObject = void 0), null != b.gObject && b.gObject.setOptions(b.setLabelOptions(b.opts)), b.gObject || (b.isLabel(b.opts) ? b.gObject = new MarkerWithLabel(b.setLabelOptions(b.opts)) : b.opts.content ? (b.gObject = new RichMarker(b.opts), b.gObject.getIcon = b.gObject.getContent, b.gObject.setIcon = b.gObject.setContent) : b.gObject = new google.maps.Marker(b.opts), c.extend(b.gObject, {
                                                model: b.model
                                            })), b.externalListeners && b.removeEvents(b.externalListeners), b.internalListeners && b.removeEvents(b.internalListeners), b.externalListeners = b.setEvents(b.gObject, b.scope, b.model, ["dragend"]), b.internalListeners = b.setEvents(b.gObject, {
                                                events: b.internalEvents(),
                                                $evalAsync: function() {}
                                            }, b.model), null != b.id) return b.gObject.key = b.id
                                    }
                                }(this)), this.gObject && (this.gObject.getMap() || this.gManager.type !== m.type)) this.deferred.resolve(this.gObject);
                            else {
                                if (!this.gObject) return this.deferred.reject("gObject is null");
                                null != (d = this.gObject) && d.getMap() && this.gManager.type === m.type || (h.debug("gObject has no map yet"), this.deferred.resolve(this.gObject))
                            }
                            return this.model[this.fitKey] ? this.gManager.fit() : void 0
                        }
                    }, o.prototype.setLabelOptions = function(a) {
                        return a.labelAnchor && (a.labelAnchor = this.getLabelPositionPoint(a.labelAnchor)), a
                    }, o.prototype.internalEvents = function() {
                        return {
                            dragend: function(a) {
                                return function(b, c, d, e) {
                                    var f, g, h;
                                    return g = a.trackModel ? a.scope.model : a.model, h = a.setCoordsFromEvent(a.modelOrKey(g, a.coordsKey), a.gObject.getPosition()), g = a.setVal(d, a.coordsKey, h), f = a.scope.events, null != (null != f ? f.dragend : void 0) && f.dragend(b, c, g, e), a.scope.$apply()
                                }
                            }(this),
                            click: function(a) {
                                return function(c, d, e, f) {
                                    var g;
                                    if (g = a.getProp("click", a.scope, a.model), a.doClick && b.isFunction(g)) return a.scope.$evalAsync(g(c, d, a.model, f))
                                }
                            }(this)
                        }
                    }, o
                }(f)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygonChildModel", ["uiGmapBasePolyChildModel", "uiGmapPolygonOptionsBuilder", function(b, c) {
                var d, e, f;
                return f = function(a) {
                    return new google.maps.Polygon(a)
                }, e = new b(c, f), d = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylineChildModel", ["uiGmapBasePolyChildModel", "uiGmapPolylineOptionsBuilder", function(b, c) {
                var d, e, f;
                return f = function(a) {
                    return new google.maps.Polyline(a)
                }, e = b(c, f), d = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c
                }(e)
            }])
        }.call(this),
        function() {
            var d = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                e = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) f.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                f = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapWindowChildModel", ["uiGmapBaseObject", "uiGmapGmapUtil", "uiGmapLogger", "$compile", "$http", "$templateCache", "uiGmapChromeFixes", "uiGmapEventsHelper", function(f, g, h, i, j, k, l, m) {
                var n;
                return n = function(f) {
                    function n(a) {
                        this.updateModel = d(this.updateModel, this), this.destroy = d(this.destroy, this), this.remove = d(this.remove, this), this.getLatestPosition = d(this.getLatestPosition, this), this.hideWindow = d(this.hideWindow, this), this.showWindow = d(this.showWindow, this), this.handleClick = d(this.handleClick, this), this.watchOptions = d(this.watchOptions, this), this.watchCoords = d(this.watchCoords, this), this.createGWin = d(this.createGWin, this), this.watchElement = d(this.watchElement, this), this.watchAndDoShow = d(this.watchAndDoShow, this), this.doShow = d(this.doShow, this);
                        var b, e, f, g, i;
                        this.model = null != (e = a.model) ? e : {}, this.scope = a.scope, this.opts = a.opts, this.isIconVisibleOnClick = a.isIconVisibleOnClick, this.gMap = a.gMap, this.markerScope = a.markerScope, this.element = a.element, this.needToManualDestroy = null != (f = a.needToManualDestroy) && f, this.markerIsVisibleAfterWindowClose = null == (g = a.markerIsVisibleAfterWindowClose) || g, this.isScopeModel = null != (i = a.isScopeModel) && i, this.isScopeModel && (this.clonedModel = c.clone(this.model, !0)), this.getGmarker = function() {
                            var a, b;
                            if (null != (null != (a = this.markerScope) ? a.getGMarker : void 0)) return null != (b = this.markerScope) ? b.getGMarker() : void 0
                        }, this.listeners = [], this.createGWin(), b = this.getGmarker(), null != b && b.setClickable(!0), this.watchElement(), this.watchOptions(), this.watchCoords(), this.watchAndDoShow(), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.destroy()
                            }
                        }(this)), h.info(this)
                    }
                    return e(n, f), n.include(g), n.include(m), n.prototype.doShow = function(a) {
                        return this.scope.show === !0 || a ? this.showWindow() : this.hideWindow()
                    }, n.prototype.watchAndDoShow = function() {
                        return null != this.model.show && (this.scope.show = this.model.show), this.scope.$watch("show", this.doShow, !0), this.doShow()
                    }, n.prototype.watchElement = function() {
                        return this.scope.$watch(function(a) {
                            return function() {
                                var b, c;
                                if (a.element || a.html) return a.html !== a.element.html() && a.gObject ? (null != (b = a.opts) && (b.content = void 0), c = a.gObject.isOpen(), a.remove(), a.createGWin(c)) : void 0
                            }
                        }(this))
                    }, n.prototype.createGWin = function(b) {
                        var d, e, f, g, h;
                        if (null == b && (b = !1), f = this.getGmarker(), e = {}, null != this.opts && (this.scope.coords && (this.opts.position = this.getCoords(this.scope.coords)), e = this.opts), this.element && (this.html = c.isObject(this.element) ? this.element.html() : this.element), d = this.scope.options ? this.scope.options : e, this.opts = this.createWindowOptions(f, this.markerScope || this.scope, this.html, d), null != this.opts) return this.gObject || (this.opts.boxClass && a.InfoBox && "function" == typeof a.InfoBox ? this.gObject = new a.InfoBox(this.opts) : this.gObject = new google.maps.InfoWindow(this.opts), this.listeners.push(google.maps.event.addListener(this.gObject, "domready", function() {
                            return l.maybeRepaint(this.content)
                        })), this.listeners.push(google.maps.event.addListener(this.gObject, "closeclick", function(a) {
                            return function() {
                                return f && (f.setAnimation(a.oldMarkerAnimation), a.markerIsVisibleAfterWindowClose && c.delay(function() {
                                    return f.setVisible(!1), f.setVisible(a.markerIsVisibleAfterWindowClose)
                                }, 250)), a.gObject.close(), a.model.show = !1, null != a.scope.closeClick ? a.scope.$evalAsync(a.scope.closeClick()) : a.scope.$evalAsync()
                            }
                        }(this)))), this.gObject.setContent(this.opts.content), this.handleClick((null != (g = this.scope) && null != (h = g.options) ? h.forceClick : void 0) || b), this.doShow(this.gObject.isOpen())
                    }, n.prototype.watchCoords = function() {
                        var a;
                        return a = null != this.markerScope ? this.markerScope : this.scope, a.$watch("coords", function(a) {
                            return function(b, c) {
                                var d;
                                if (b !== c) {
                                    if (null == b) a.hideWindow();
                                    else if (!a.validateCoords(b)) return void h.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: " + JSON.stringify(a.model));
                                    if (d = a.getCoords(b), a.doShow(), a.gObject.setPosition(d), a.opts) return a.opts.position = d
                                }
                            }
                        }(this), !0)
                    }, n.prototype.watchOptions = function() {
                        return this.scope.$watch("options", function(a) {
                            return function(b, c) {
                                if (b !== c && (a.opts = b, null != a.gObject)) {
                                    if (a.gObject.setOptions(a.opts), null != a.opts.visible && a.opts.visible) return a.showWindow();
                                    if (null != a.opts.visible) return a.hideWindow()
                                }
                            }
                        }(this), !0)
                    }, n.prototype.handleClick = function(a) {
                        var b, c;
                        if (null != this.gObject) return c = this.getGmarker(), b = function(a) {
                            return function() {
                                if (null == a.gObject && a.createGWin(), a.showWindow(), null != c) return a.initialMarkerVisibility = c.getVisible(), a.oldMarkerAnimation = c.getAnimation(), c.setVisible(a.isIconVisibleOnClick)
                            }
                        }(this), a && b(), c ? this.listeners = this.listeners.concat(this.setEvents(c, {
                            events: {
                                click: b
                            }
                        }, this.model)) : void 0
                    }, n.prototype.showWindow = function() {
                        var a, c, d;
                        if (null != this.gObject) return d = null, c = function(a) {
                            return function() {
                                var b, c, d;
                                if (!a.gObject.isOpen()) {
                                    if (c = a.getGmarker(), null != a.gObject && null != a.gObject.getPosition && (d = a.gObject.getPosition()), c && (d = c.getPosition()), !d) return;
                                    if (a.gObject.open(a.gMap, c), b = a.gObject.isOpen(), a.model.show !== b) return a.model.show = b
                                }
                            }
                        }(this), this.scope.templateUrl ? j.get(this.scope.templateUrl, {
                            cache: k
                        }).then(function(a) {
                            return function(e) {
                                var f;
                                return d = a.scope.$new(), b.isDefined(a.scope.templateParameter) && (d.parameter = a.scope.templateParameter), f = i(e.data)(d), a.gObject.setContent(f[0]), c()
                            }
                        }(this)) : this.scope.template ? (d = this.scope.$new(), b.isDefined(this.scope.templateParameter) && (d.parameter = this.scope.templateParameter), a = i(this.scope.template)(d), this.gObject.setContent(a[0]), c()) : c(), this.scope.$on("destroy", function() {
                            return d.$destroy()
                        })
                    }, n.prototype.hideWindow = function() {
                        if (null != this.gObject && this.gObject.isOpen()) return this.gObject.close()
                    }, n.prototype.getLatestPosition = function(a) {
                        var b;
                        return b = this.getGmarker(), null == this.gObject || null == b || a ? a ? this.gObject.setPosition(a) : void 0 : this.gObject.setPosition(b.getPosition())
                    }, n.prototype.remove = function() {
                        return this.hideWindow(), this.removeEvents(this.listeners), this.listeners.length = 0, delete this.gObject, delete this.opts
                    }, n.prototype.destroy = function(a) {
                        var b;
                        if (null == a && (a = !1), this.remove(), null != this.scope && !(null != (b = this.scope) ? b.$$destroyed : void 0) && (this.needToManualDestroy || a)) return this.scope.$destroy()
                    }, n.prototype.updateModel = function(a) {
                        return this.isScopeModel && (this.clonedModel = c.clone(a, !0)), c.extend(this.model, this.clonedModel || a)
                    }, n
                }(f)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapBasePolysParentModel", ["$timeout", "uiGmapLogger", "uiGmapModelKey", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmap_async", "uiGmapPromise", "uiGmapFitHelper", function(e, f, g, h, i, j, k, l) {
                return function(e, m, n) {
                    var o;
                    return o = function(g) {
                        function o(b, d, g, h, j) {
                            this.element = d, this.attrs = g, this.gMap = h, this.defaults = j, this.maybeFit = a(this.maybeFit, this), this.createChild = a(this.createChild, this), this.pieceMeal = a(this.pieceMeal, this), this.createAllNew = a(this.createAllNew, this), this.watchIdKey = a(this.watchIdKey, this), this.createChildScopes = a(this.createChildScopes, this), this.watchDestroy = a(this.watchDestroy, this), this.onDestroy = a(this.onDestroy, this), this.rebuildAll = a(this.rebuildAll, this), this.doINeedToWipe = a(this.doINeedToWipe, this), this.watchModels = a(this.watchModels, this), o.__super__.constructor.call(this, b), this.interface = e, this.$log = f, this.plurals = new i, c.each(e.scopeKeys, function(a) {
                                return function(b) {
                                    return a[b + "Key"] = void 0
                                }
                            }(this)), this.models = void 0, this.firstTime = !0, this.$log.info(this), this.createChildScopes()
                        }
                        return d(o, g), o.include(h), o.prototype.watchModels = function(a) {
                            return a.$watch("models", function(b) {
                                return function(c, d) {
                                    if (c !== d) return b.doINeedToWipe(c) || a.doRebuildAll ? b.rebuildAll(a, !0, !0) : b.createChildScopes(!1)
                                }
                            }(this), !0)
                        }, o.prototype.doINeedToWipe = function(a) {
                            var b;
                            return b = null == a || 0 === a.length, this.plurals.length > 0 && b
                        }, o.prototype.rebuildAll = function(a, b, c) {
                            return this.onDestroy(c).then(function(a) {
                                return function() {
                                    if (b) return a.createChildScopes()
                                }
                            }(this))
                        }, o.prototype.onDestroy = function() {
                            return o.__super__.onDestroy.call(this, this.scope), j.promiseLock(this, k.promiseTypes.delete, void 0, void 0, function(a) {
                                return function() {
                                    return j.each(a.plurals.values(), function(a) {
                                        return a.destroy(!0)
                                    }, j.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function() {
                                        var b;
                                        return null != (b = a.plurals) ? b.removeAll() : void 0
                                    })
                                }
                            }(this))
                        }, o.prototype.watchDestroy = function(a) {
                            return a.$on("$destroy", function(b) {
                                return function() {
                                    return b.rebuildAll(a, !1, !0)
                                }
                            }(this))
                        }, o.prototype.createChildScopes = function(a) {
                            return null == a && (a = !0), b.isUndefined(this.scope.models) ? void this.$log.error("No models to create " + n + "s from! I Need direct models!") : null != this.gMap && null != this.scope.models ? (this.watchIdKey(this.scope), a ? this.createAllNew(this.scope, !1) : this.pieceMeal(this.scope, !1)) : void 0
                        }, o.prototype.watchIdKey = function(a) {
                            return this.setIdKey(a), a.$watch("idKey", function(b) {
                                return function(c, d) {
                                    if (c !== d && null == c) return b.idKey = c, b.rebuildAll(a, !0, !0)
                                }
                            }(this))
                        }, o.prototype.createAllNew = function(a, b) {
                            var c;
                            if (null == b && (b = !1), this.models = a.models, this.firstTime && (this.watchModels(a), this.watchDestroy(a)), !this.didQueueInitPromise(this, a)) return c = null, j.promiseLock(this, k.promiseTypes.create, "createAllNew", function(a) {
                                return c = a
                            }, function(b) {
                                return function() {
                                    return j.map(a.models, function(a) {
                                        var d;
                                        return d = b.createChild(a, b.gMap), c && (f.debug("createNew should fall through safely"), d.isEnabled = !1), d.pathPoints.getArray()
                                    }, j.chunkSizeFrom(a.chunk)).then(function(a) {
                                        return b.maybeFit(a), b.firstTime = !1
                                    })
                                }
                            }(this))
                        }, o.prototype.pieceMeal = function(a, b) {
                            var d, e;
                            if (null == b && (b = !0), !a.$$destroyed) return d = null, e = null, this.models = a.models, null != a && this.modelsLength() && this.plurals.length ? j.promiseLock(this, k.promiseTypes.update, "pieceMeal", function(a) {
                                return d = a
                            }, function(b) {
                                return function() {
                                    return k.promise(function() {
                                        return b.figureOutState(b.idKey, a, b.plurals, b.modelKeyComparison)
                                    }).then(function(f) {
                                        return e = f, e.updates.length && j.each(e.updates, function(a) {
                                            return c.extend(a.child.scope, a.model), a.child.model = a.model
                                        }), j.each(e.removals, function(a) {
                                            if (null != a) return a.destroy(), b.plurals.remove(a.model[b.idKey]), d
                                        }, j.chunkSizeFrom(a.chunk))
                                    }).then(function() {
                                        return j.each(e.adds, function(a) {
                                            return d && f.debug("pieceMeal should fall through safely"), b.createChild(a, b.gMap), d
                                        }, j.chunkSizeFrom(a.chunk)).then(function() {
                                            return b.maybeFit()
                                        })
                                    })
                                }
                            }(this)) : (this.inProgress = !1, this.rebuildAll(this.scope, !0, !0))
                        }, o.prototype.createChild = function(a, b) {
                            var c, d;
                            return d = this.scope.$new(!1), this.setChildScope(e.scopeKeys, d, a), d.$watch("model", function(a) {
                                return function(b, c) {
                                    if (b !== c) return a.setChildScope(e.scopeKeys, d, b)
                                }
                            }(this), !0), d.static = this.scope.static, c = new m({
                                isScopeModel: !0,
                                scope: d,
                                attrs: this.attrs,
                                gMap: b,
                                defaults: this.defaults,
                                model: a,
                                gObjectChangeCb: function(a) {
                                    return function() {
                                        return a.maybeFit()
                                    }
                                }(this)
                            }), null == a[this.idKey] ? void this.$log.error(n + " model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key.") : (this.plurals.put(a[this.idKey], c), c)
                        }, o.prototype.maybeFit = function(a) {
                            if (null == a && (a = this.plurals.map(function(a) {
                                    return a.pathPoints
                                })), this.scope.fit) return a = c.flatten(a), l.fit(a, this.gMap)
                        }, o
                    }(g)
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapCircleParentModel", ["uiGmapLogger", "$timeout", "uiGmapGmapUtil", "uiGmapEventsHelper", "uiGmapCircleOptionsBuilder", function(d, e, f, g, h) {
                var i, j;
                return j = function(a, b) {
                    return a.settingFromDirective = !0, b(), e(function() {
                        return a.settingFromDirective = !1
                    })
                }, i = function(e) {
                    function h(a, e, g, h, i) {
                        var k, l, m;
                        this.attrs = g, this.gMap = h, this.DEFAULTS = i, this.scope = a, m = null, k = function(a) {
                            return function() {
                                if (m = null, null != a.listeners) return a.removeEvents(a.listeners), a.listeners = void 0
                            }
                        }(this), l = new google.maps.Circle(this.buildOpts(f.getCoords(a.center), a.radius)), this.setMyOptions = function(b) {
                            return function(d, e) {
                                if (!a.settingFromDirective) return !c.isEqual(d, e) || d !== e || null != d && null != e && d.coordinates !== e.coordinates ? l.setOptions(b.buildOpts(f.getCoords(a.center), a.radius)) : void 0
                            }
                        }(this), this.props = this.props.concat([{
                            prop: "center",
                            isColl: !0
                        }, {
                            prop: "fill",
                            isColl: !0
                        }, "radius", "zIndex"]), this.watchProps(), null != this.scope.control && (this.scope.control.getCircle = function() {
                            return l
                        }), k(), this.listeners = this.setEvents(l, a, a, ["radius_changed"]) || [], this.listeners.push(google.maps.event.addListener(l, "radius_changed", function() {
                            var d, e;
                            if (d = l.getRadius(), d !== m) return m = d, e = function() {
                                return j(a, function() {
                                    var b, e;
                                    if (d !== a.radius && (a.radius = d), (null != (b = a.events) ? b.radius_changed : void 0) && c.isFunction(null != (e = a.events) ? e.radius_changed : void 0)) return a.events.radius_changed(l, "radius_changed", a, arguments)
                                })
                            }, b.mock ? e() : a.$evalAsync(function() {
                                return e()
                            })
                        })), this.listeners.push(google.maps.event.addListener(l, "center_changed", function() {
                            return a.$evalAsync(function() {
                                return j(a, function() {
                                    return b.isDefined(a.center.type) ? (a.center.coordinates[1] = l.getCenter().lat(), a.center.coordinates[0] = l.getCenter().lng()) : (a.center.latitude = l.getCenter().lat(), a.center.longitude = l.getCenter().lng())
                                })
                            })
                        })), a.$on("$destroy", function() {
                            return k(), l.setMap(null)
                        }), d.info(this)
                    }
                    return a(h, e), h.include(f), h.include(g), h
                }(h)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapDrawingManagerParentModel", ["uiGmapLogger", "$timeout", "uiGmapBaseObject", "uiGmapEventsHelper", function(b, d, e, f) {
                var g;
                return g = function(b) {
                    function d(a, b, d, e) {
                        var f, g;
                        this.scope = a, this.attrs = d, this.map = e, f = new google.maps.drawing.DrawingManager(this.scope.options), f.setMap(this.map), g = void 0, null != this.scope.control && (this.scope.control.getDrawingManager = function() {
                            return f
                        }), !this.scope.static && this.scope.options && this.scope.$watch("options", function(a) {
                            return null != f ? f.setOptions(a) : void 0
                        }, !0), null != this.scope.events && (g = this.setEvents(f, this.scope, this.scope), this.scope.$watch("events", function(a) {
                            return function(b, d) {
                                if (!c.isEqual(b, d)) return null != g && a.removeEvents(g), g = a.setEvents(f, a.scope, a.scope)
                            }
                        }(this))), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return null != g && a.removeEvents(g), f.setMap(null), f = null
                            }
                        }(this))
                    }
                    return a(d, b), d.include(f), d
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIMarkerParentModel", ["uiGmapModelKey", "uiGmapLogger", function(e, f) {
                var g;
                return g = function(e) {
                    function g(c, d, e, h) {
                        if (this.scope = c, this.element = d, this.attrs = e, this.map = h, this.onWatch = a(this.onWatch, this), this.watch = a(this.watch, this), this.validateScope = a(this.validateScope, this), g.__super__.constructor.call(this, this.scope), this.$log = f, !this.validateScope(this.scope)) throw new String("Unable to construct IMarkerParentModel due to invalid scope");
                        this.doClick = b.isDefined(this.attrs.click), null != this.scope.options && (this.DEFAULTS = this.scope.options), this.watch("coords", this.scope), this.watch("icon", this.scope), this.watch("options", this.scope), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.onDestroy(a.scope)
                            }
                        }(this))
                    }
                    return d(g, e), g.prototype.DEFAULTS = {}, g.prototype.validateScope = function(a) {
                        var b;
                        return null == a ? (this.$log.error(this.constructor.name + ": invalid scope used"), !1) : (b = null != a.coords, b ? b : (this.$log.error(this.constructor.name + ": no valid coords attribute found"), !1))
                    }, g.prototype.watch = function(a, b, d) {
                        return null == d && (d = !0), b.$watch(a, function(d) {
                            return function(e, f) {
                                if (!c.isEqual(e, f)) return d.onWatch(a, b, e, f)
                            }
                        }(this), d)
                    }, g.prototype.onWatch = function(a, b, c, d) {}, g
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIWindowParentModel", ["uiGmapModelKey", "uiGmapGmapUtil", "uiGmapLogger", function(b, c, d) {
                var e;
                return e = function(b) {
                    function e(a, b, c, f, g, h, i, j) {
                        e.__super__.constructor.call(this, a), this.$log = d, this.$timeout = g, this.$compile = h, this.$http = i, this.$templateCache = j, this.DEFAULTS = {}, null != a.options && (this.DEFAULTS = a.options)
                    }
                    return a(e, b), e.include(c), e.prototype.getItem = function(a, b, c) {
                        return "models" === b ? a[b][c] : a[b].get(c)
                    }, e
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapLayerParentModel", ["uiGmapBaseObject", "uiGmapLogger", "$timeout", function(d, e, f) {
                var g;
                return g = function(d) {
                    function f(c, d, f, g, h, i) {
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.onLayerCreated = null != h ? h : void 0, this.$log = null != i ? i : e, this.createGoogleLayer = a(this.createGoogleLayer, this), null == this.attrs.type ? void this.$log.info("type attribute for the layer directive is mandatory. Layer creation aborted!!") : (this.createGoogleLayer(), this.doShow = !0, b.isDefined(this.attrs.show) && (this.doShow = this.scope.show), this.doShow && null != this.gMap && this.gObject.setMap(this.gMap), this.scope.$watch("show", function(a) {
                            return function(b, c) {
                                if (b !== c) return a.doShow = b, b ? a.gObject.setMap(a.gMap) : a.gObject.setMap(null)
                            }
                        }(this), !0), this.scope.$watch("options", function(a) {
                            return function(b, c) {
                                if (b !== c && a.doShow) return a.gObject.setOptions(b)
                            }
                        }(this), !0), void this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.gObject.setMap(null)
                            }
                        }(this)))
                    }
                    return c(f, d), f.prototype.createGoogleLayer = function() {
                        var a;
                        if (null == this.attrs.options ? this.gObject = void 0 === this.attrs.namespace ? new google.maps[this.attrs.type] : new google.maps[this.attrs.namespace][this.attrs.type] : this.gObject = void 0 === this.attrs.namespace ? new google.maps[this.attrs.type](this.scope.options) : new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options), null != this.gObject && this.doShow && this.gObject.setMap(this.gMap), null != this.gObject && null != this.onLayerCreated) return "function" == typeof(a = this.onLayerCreated(this.scope, this.gObject)) ? a(this.gObject) : void 0
                    }, f
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMapTypeParentModel", ["uiGmapBaseObject", "uiGmapLogger", function(e, f) {
                var g;
                return g = function(e) {
                    function g(d, e, g, h, i, j, k) {
                        var l, m, n, o;
                        return this.scope = d, this.element = e, this.attrs = g, this.gMap = h, this.$log = null != i ? i : f, this.childModel = j, this.propMap = k, this.refreshShown = a(this.refreshShown, this), this.hideOverlay = a(this.hideOverlay, this), this.showOverlay = a(this.showOverlay, this), this.refreshMapType = a(this.refreshMapType, this), this.createMapType = a(this.createMapType, this), null == this.scope.options ? void this.$log.info("options attribute for the map-type directive is mandatory. Map type creation aborted!!") : (this.id = this.gMap.overlayMapTypesCount = this.gMap.overlayMapTypesCount + 1 || 0, this.doShow = !0, this.createMapType(), this.refreshShown(), this.doShow && null != this.gMap && this.showOverlay(), m = function(a) {
                            return function() {
                                return a.childModel[a.attrs.show]
                            }
                        }(this), o = this.childModel ? m : "show", this.scope.$watch(o, function(a) {
                            return function(b, c) {
                                if (b !== c) return a.doShow = b, b ? a.showOverlay() : a.hideOverlay()
                            }
                        }(this)), l = function(a) {
                            return function() {
                                return a.childModel[a.attrs.options]
                            }
                        }(this), n = this.childModel ? l : "options", this.scope.$watchCollection(n, function(a) {
                            return function(b, d) {
                                var e, f;
                                if (!c.isEqual(b, d) && (f = ["tileSize", "maxZoom", "minZoom", "name", "alt"], e = c.some(f, function(a) {
                                        return !d || !b || !c.isEqual(b[a], d[a])
                                    }))) return a.refreshMapType()
                            }
                        }(this)), b.isDefined(this.attrs.refresh) && this.scope.$watch("refresh", function(a) {
                            return function(b, d) {
                                if (!c.isEqual(b, d)) return a.refreshMapType()
                            }
                        }(this), !0), void this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.hideOverlay(), a.mapType = null
                            }
                        }(this)))
                    }
                    return d(g, e), g.prototype.createMapType = function() {
                        var a, c, d;
                        if (d = this.childModel ? this.attrs.options ? this.childModel[this.attrs.options] : this.childModel : this.scope.options, null != d.getTile) this.mapType = d;
                        else {
                            if (null == d.getTileUrl) return void this.$log.info("options should provide either getTile or getTileUrl methods. Map type creation aborted!!");
                            this.mapType = new google.maps.ImageMapType(d)
                        }
                        if (c = this.attrs.id ? this.childModel ? this.attrs.id : "id" : void 0, a = c ? this.childModel ? this.childModel[c] : this.scope[c] : void 0, a && (this.gMap.mapTypes.set(a, this.mapType), b.isDefined(this.attrs.show) || (this.doShow = !1)), this.mapType.layerId = this.id, this.childModel && b.isDefined(this.scope.index)) return this.propMap.put(this.mapType.layerId, this.scope.index)
                    }, g.prototype.refreshMapType = function() {
                        if (this.hideOverlay(), this.mapType = null, this.createMapType(), this.doShow && null != this.gMap) return this.showOverlay()
                    }, g.prototype.showOverlay = function() {
                        var a;
                        return b.isDefined(this.scope.index) ? (a = !1, this.gMap.overlayMapTypes.getLength() ? (this.gMap.overlayMapTypes.forEach(function(c) {
                            return function(d, e) {
                                var f;
                                a || (f = c.propMap.get(d.layerId.toString()), (f > c.scope.index || !b.isDefined(f)) && (a = !0, c.gMap.overlayMapTypes.insertAt(e, c.mapType)))
                            }
                        }(this)), a ? void 0 : this.gMap.overlayMapTypes.push(this.mapType)) : this.gMap.overlayMapTypes.push(this.mapType)) : this.gMap.overlayMapTypes.push(this.mapType)
                    }, g.prototype.hideOverlay = function() {
                        var a;
                        return a = !1, this.gMap.overlayMapTypes.forEach(function(b) {
                            return function(c, d) {
                                a || c.layerId !== b.id || (a = !0, b.gMap.overlayMapTypes.removeAt(d))
                            }
                        }(this))
                    }, g.prototype.refreshShown = function() {
                        return this.doShow = !b.isDefined(this.attrs.show) || (this.childModel ? this.childModel[this.attrs.show] : this.scope.show)
                    }, g
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMapTypesParentModel", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapMapTypeParentModel", "uiGmapPropMap", function(b, c, d, e) {
                var f;
                return f = function(b) {
                    function f(a, b, f, g, h) {
                        var i;
                        return this.scope = a, this.element = b, this.attrs = f, this.gMap = g, this.$log = null != h ? h : c, null == this.attrs.mapTypes ? void this.$log.info("layers attribute for the map-types directive is mandatory. Map types creation aborted!!") : (i = new e, void this.scope.mapTypes.forEach(function(a) {
                            return function(b, c) {
                                var e, f;
                                f = {
                                    options: a.scope.options,
                                    show: a.scope.show,
                                    refresh: a.scope.refresh
                                }, e = a.scope.$new(), e.index = c, new d(e, null, f, a.gMap, a.$log, b, i)
                            }
                        }(this)))
                    }
                    return a(f, b), f
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMarkersParentModel", ["uiGmapIMarkerParentModel", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmapMarkerChildModel", "uiGmap_async", "uiGmapClustererMarkerManager", "uiGmapMarkerManager", "$timeout", "uiGmapIMarker", "uiGmapPromise", "uiGmapGmapUtil", "uiGmapLogger", "uiGmapSpiderfierMarkerManager", function(e, f, g, h, i, j, k, l, m, n, o, p, q) {
                var r, s;
                return s = function(a, b) {
                    return b.plurals = new g, b.scope.plurals = b.plurals, b
                }, r = function(e) {
                    function l(b, d, e, f) {
                        this.maybeExecMappedEvent = a(this.maybeExecMappedEvent, this), this.onDestroy = a(this.onDestroy, this), this.newChildMarker = a(this.newChildMarker, this), this.pieceMeal = a(this.pieceMeal, this), this.rebuildAll = a(this.rebuildAll, this), this.createAllNew = a(this.createAllNew, this), this.bindToTypeEvents = a(this.bindToTypeEvents, this), this.createChildScopes = a(this.createChildScopes, this), this.validateScope = a(this.validateScope, this), this.onWatch = a(this.onWatch, this), l.__super__.constructor.call(this, b, d, e, f), this.interface = m, s(new g, this), this.scope.pluralsUpdate = {
                            updateCtr: 0
                        }, this.$log.info(this), this.doRebuildAll = null != this.scope.doRebuildAll && this.scope.doRebuildAll, this.setIdKey(this.scope), this.scope.$watch("doRebuildAll", function(a) {
                            return function(b, c) {
                                if (b !== c) return a.doRebuildAll = b
                            }
                        }(this)), this.modelsLength() || (this.modelsRendered = !1), this.scope.$watch("models", function(a) {
                            return function(b, d) {
                                if (!c.isEqual(b, d) || !a.modelsRendered) {
                                    if (0 === b.length && 0 === d.length) return;
                                    return a.modelsRendered = !0, a.onWatch("models", a.scope, b, d)
                                }
                            }
                        }(this), !this.isTrue(e.modelsbyref)), this.watch("doCluster", this.scope), this.watch("type", this.scope), this.watch("clusterOptions", this.scope), this.watch("clusterEvents", this.scope), this.watch("typeOptions", this.scope), this.watch("typeEvents", this.scope), this.watch("fit", this.scope), this.watch("idKey", this.scope), this.gManager = void 0, this.createAllNew(this.scope)
                    }
                    return d(l, e), l.include(o), l.include(f), l.prototype.onWatch = function(a, b, c, d) {
                        return "idKey" === a && c !== d && (this.idKey = c), this.doRebuildAll || "doCluster" === a || "type" === a ? this.rebuildAll(b) : this.pieceMeal(b)
                    }, l.prototype.validateScope = function(a) {
                        var c;
                        return c = b.isUndefined(a.models) || void 0 === a.models, c && this.$log.error(this.constructor.name + ": no valid models attribute found"), l.__super__.validateScope.call(this, a) || c
                    }, l.prototype.createChildScopes = function(a) {
                        if (null != this.gMap && null != this.scope.models) return a ? this.createAllNew(this.scope, !1) : this.pieceMeal(this.scope, !1)
                    }, l.prototype.bindToTypeEvents = function(a, d) {
                        var e, f;
                        return null == d && (d = ["click", "mouseout", "mouseover"]), f = this, this.origTypeEvents ? b.extend(a, this.origTypeEvents) : (this.origTypeEvents = {}, c.each(d, function(b) {
                            return function(c) {
                                return b.origTypeEvents[c] = null != a ? a[c] : void 0
                            }
                        }(this))), e = {}, c.each(d, function(a) {
                            return e[a] = function(b) {
                                return f.maybeExecMappedEvent(b, a)
                            }
                        }), b.extend(a, e)
                    }, l.prototype.createAllNew = function(a) {
                        var b, c, d, e;
                        if (null != this.gManager && (this.gManager instanceof q && (b = this.gManager.isSpiderfied()), this.gManager.clear(), delete this.gManager), d = a.typeEvents || a.clusterEvents, e = a.typeOptions || a.clusterOptions, a.doCluster || "cluster" === a.type ? (null != d && this.bindToTypeEvents(d), this.gManager = new j(this.map, void 0, e, d)) : "spider" === a.type ? (null != d && this.bindToTypeEvents(d, ["spiderfy", "unspiderfy"]), this.gManager = new q(this.map, void 0, e, d, this.scope), b && this.gManager.spiderfy()) : this.gManager = new k(this.map), !this.didQueueInitPromise(this, a)) return c = null, i.promiseLock(this, n.promiseTypes.create, "createAllNew", function(a) {
                            return c = a
                        }, function(b) {
                            return function() {
                                return i.each(a.models, function(d) {
                                    return b.newChildMarker(d, a), c
                                }, i.chunkSizeFrom(a.chunk)).then(function() {
                                    return b.modelsRendered = !0, a.fit && b.gManager.fit(), b.gManager.draw(), b.scope.pluralsUpdate.updateCtr += 1
                                }, i.chunkSizeFrom(a.chunk))
                            }
                        }(this))
                    }, l.prototype.rebuildAll = function(a) {
                        var b;
                        if (a.doRebuild || void 0 === a.doRebuild) return (null != (b = this.scope.plurals) ? b.length : void 0) ? this.onDestroy(a).then(function(b) {
                            return function() {
                                return b.createAllNew(a)
                            }
                        }(this)) : this.createAllNew(a)
                    }, l.prototype.pieceMeal = function(a) {
                        var b, c;
                        if (!a.$$destroyed) return b = null, c = null, this.modelsLength() && this.scope.plurals.length ? i.promiseLock(this, n.promiseTypes.update, "pieceMeal", function(a) {
                            return b = a
                        }, function(d) {
                            return function() {
                                return n.promise(function() {
                                    return d.figureOutState(d.idKey, a, d.scope.plurals, d.modelKeyComparison)
                                }).then(function(e) {
                                    return c = e, i.each(c.removals, function(a) {
                                        if (null != a) return null != a.destroy && a.destroy(), d.scope.plurals.remove(a.id), b
                                    }, i.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return i.each(c.adds, function(c) {
                                        return d.newChildMarker(c, a), b
                                    }, i.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return i.each(c.updates, function(a) {
                                        return d.updateChild(a.child, a.model), b
                                    }, i.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return (c.adds.length > 0 || c.removals.length > 0 || c.updates.length > 0) && (a.plurals = d.scope.plurals, a.fit && d.gManager.fit(), d.gManager.draw()), d.scope.pluralsUpdate.updateCtr += 1
                                })
                            }
                        }(this)) : (this.inProgress = !1, this.rebuildAll(a))
                    }, l.prototype.newChildMarker = function(a, b) {
                        var c, d, e;
                        if (!a) throw "model undefined";
                        return null == a[this.idKey] ? void this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : (this.$log.info("child", c, "markers", this.scope.markerModels), d = b.$new(!1), d.events = b.events, e = {}, m.scopeKeys.forEach(function(a) {
                            return e[a] = b[a]
                        }), c = new h({
                            scope: d,
                            model: a,
                            keys: e,
                            gMap: this.map,
                            defaults: this.DEFAULTS,
                            doClick: this.doClick,
                            gManager: this.gManager,
                            doDrawSelf: !1,
                            isScopeModel: !0
                        }), this.scope.plurals.put(a[this.idKey], c), c)
                    }, l.prototype.onDestroy = function(a) {
                        return l.__super__.onDestroy.call(this, a), i.promiseLock(this, n.promiseTypes.delete, void 0, void 0, function(a) {
                            return function() {
                                return i.each(a.scope.plurals.values(), function(a) {
                                    if (null != a) return a.destroy(!1)
                                }, i.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function() {
                                    return null != a.gManager && a.gManager.destroy(), a.plurals.removeAll(), a.plurals !== a.scope.plurals && console.error("plurals out of sync for MarkersParentModel"), a.scope.pluralsUpdate.updateCtr += 1
                                })
                            }
                        }(this))
                    }, l.prototype.maybeExecMappedEvent = function(a, b) {
                        var d, e;
                        if (!this.scope.$$destroyed) return e = this.scope.typeEvents || this.scope.clusterEvents, c.isFunction(null != e ? e[b] : void 0) && (d = this.mapTypeToPlurals(a), this.origTypeEvents[b]) ? this.origTypeEvents[b](d.group, d.mapped) : void 0
                    }, l.prototype.mapTypeToPlurals = function(a) {
                        var b, d, e;
                        return c.isArray(a) ? b = a : c.isFunction(a.getMarkers) && (b = a.getMarkers()), null == b ? void p.error("Unable to map event as we cannot find the array group to map") : (d = (null != (e = this.scope.plurals.values()) ? e.length : void 0) ? b.map(function(a) {
                            return function(b) {
                                return a.scope.plurals.get(b.key).model
                            }
                        }(this)) : [], {
                            cluster: a,
                            mapped: d,
                            group: a
                        })
                    }, l.prototype.getItem = function(a, b, c) {
                        return "models" === b ? a[b][c] : a[b].get(c)
                    }, l
                }(e)
            }])
        }.call(this),
        function() {
            ["Polygon", "Polyline"].forEach(function(a) {
                return b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmap" + a + "sParentModel", ["uiGmapBasePolysParentModel", "uiGmap" + a + "ChildModel", "uiGmapI" + a, function(b, c, d) {
                    return b(d, c, a)
                }])
            })
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapRectangleParentModel", ["uiGmapLogger", "uiGmapGmapUtil", "uiGmapEventsHelper", "uiGmapRectangleOptionsBuilder", function(b, d, e, f) {
                var g;
                return g = function(f) {
                    function g(a, d, e, f, g) {
                        var h, i, j, k, l, m, n, o, p, q, r;
                        this.scope = a, this.attrs = e, this.gMap = f, this.DEFAULTS = g, h = void 0, k = !1, p = [], o = void 0, l = function(a) {
                            return function() {
                                if (a.isTrue(a.attrs.fit)) return a.fitMapBounds(a.gMap, h)
                            }
                        }(this), j = function(a) {
                            return function() {
                                var c, d, e;
                                return null != a.scope.bounds && null != (null != (c = a.scope.bounds) ? c.sw : void 0) && null != (null != (d = a.scope.bounds) ? d.ne : void 0) && a.validateBoundPoints(a.scope.bounds) ? (h = a.convertBoundPoints(a.scope.bounds), b.info("new new bounds created: " + JSON.stringify(h))) : null != a.scope.bounds.getNorthEast && null != a.scope.bounds.getSouthWest ? h = a.scope.bounds : null != a.scope.bounds ? b.error("Invalid bounds for newValue: " + JSON.stringify(null != (e = a.scope) ? e.bounds : void 0)) : void 0
                            }
                        }(this), j(), m = new google.maps.Rectangle(this.buildOpts(h)), b.info("gObject (rectangle) created: " + m), q = !1, r = function(a) {
                            return function() {
                                var b, c, d;
                                if (b = m.getBounds(), c = b.getNorthEast(), d = b.getSouthWest(), !q) return a.scope.$evalAsync(function(a) {
                                    if (null != a.bounds && null != a.bounds.sw && null != a.bounds.ne && (a.bounds.ne = {
                                            latitude: c.lat(),
                                            longitude: c.lng()
                                        }, a.bounds.sw = {
                                            latitude: d.lat(),
                                            longitude: d.lng()
                                        }), null != a.bounds.getNorthEast && null != a.bounds.getSouthWest) return a.bounds = b
                                })
                            }
                        }(this), n = function(a) {
                            return function() {
                                return l(), a.removeEvents(p), p.push(google.maps.event.addListener(m, "dragstart", function() {
                                    return k = !0
                                })), p.push(google.maps.event.addListener(m, "dragend", function() {
                                    return k = !1, r()
                                })), p.push(google.maps.event.addListener(m, "bounds_changed", function() {
                                    if (!k) return r()
                                }))
                            }
                        }(this), i = function(a) {
                            return function() {
                                return a.removeEvents(p), null != o && a.removeEvents(o), m.setMap(null)
                            }
                        }(this), null != h && n(), this.scope.$watch("bounds", function(a, b) {
                            var d;
                            if (!(c.isEqual(a, b) && null != h || k)) return q = !0, null == a ? void i() : (null == h ? d = !0 : l(), j(), m.setBounds(h), q = !1, d && null != h ? n() : void 0)
                        }, !0), this.setMyOptions = function(a) {
                            return function(b, d) {
                                if (!c.isEqual(b, d) && null != h && null != b) return m.setOptions(a.buildOpts(h))
                            }
                        }(this), this.props.push("bounds"), this.watchProps(this.props), null != this.attrs.events && (o = this.setEvents(m, this.scope, this.scope), this.scope.$watch("events", function(a) {
                            return function(b, d) {
                                if (!c.isEqual(b, d)) return null != o && a.removeEvents(o), o = a.setEvents(m, a.scope, a.scope)
                            }
                        }(this))), this.scope.$on("$destroy", function() {
                            return i()
                        }), b.info(this)
                    }
                    return a(g, f), g.include(d), g.include(e), g
                }(f)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapSearchBoxParentModel", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapEventsHelper", function(d, e, f) {
                var g;
                return g = function(d) {
                    function g(c, d, f, g, h, i, j) {
                        var k;
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.ctrlPosition = h, this.template = i, this.$log = null != j ? j : e, this.setVisibility = a(this.setVisibility, this), this.getBounds = a(this.getBounds, this), this.setBounds = a(this.setBounds, this), this.createSearchBox = a(this.createSearchBox, this), this.addToParentDiv = a(this.addToParentDiv, this), this.addAsMapControl = a(this.addAsMapControl, this), this.init = a(this.init, this), null == this.attrs.template ? void this.$log.error("template attribute for the search-box directive is mandatory. Places Search Box creation aborted!!") : (b.isUndefined(this.scope.options) && (this.scope.options = {}, this.scope.options.visible = !0), b.isUndefined(this.scope.options.visible) && (this.scope.options.visible = !0), b.isUndefined(this.scope.options.autocomplete) && (this.scope.options.autocomplete = !1), this.visible = this.scope.options.visible, this.autocomplete = this.scope.options.autocomplete, k = b.element("<div></div>"), k.append(this.template), this.input = k.find("input")[0], void this.init())
                    }
                    return c(g, d), g.include(f), g.prototype.init = function() {
                        return this.createSearchBox(), this.scope.$watch("options", function(a) {
                            return function(c, d) {
                                if (b.isObject(c) && (null != c.bounds && a.setBounds(c.bounds), null != c.visible && a.visible !== c.visible)) return a.setVisibility(c.visible)
                            }
                        }(this), !0), null != this.attrs.parentdiv ? this.addToParentDiv() : this.addAsMapControl(), this.visible || this.setVisibility(this.visible), this.autocomplete ? this.listener = google.maps.event.addListener(this.gObject, "place_changed", function(a) {
                            return function() {
                                return a.places = a.gObject.getPlace()
                            }
                        }(this)) : this.listener = google.maps.event.addListener(this.gObject, "places_changed", function(a) {
                            return function() {
                                return a.places = a.gObject.getPlaces()
                            }
                        }(this)), this.listeners = this.setEvents(this.gObject, this.scope, this.scope), this.$log.info(this), this.scope.$on("$stateChangeSuccess", function(a) {
                            return function() {
                                if (null != a.attrs.parentdiv) return a.addToParentDiv()
                            }
                        }(this)), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.gObject = null
                            }
                        }(this))
                    }, g.prototype.addAsMapControl = function() {
                        return this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input)
                    }, g.prototype.addToParentDiv = function() {
                        var a;
                        if (this.parentDiv = b.element(document.getElementById(this.scope.parentdiv)), null != (a = this.parentDiv) ? a.length : void 0) return this.parentDiv.append(this.input)
                    }, g.prototype.createSearchBox = function() {
                        return this.autocomplete ? this.gObject = new google.maps.places.Autocomplete(this.input, this.scope.options) : this.gObject = new google.maps.places.SearchBox(this.input, this.scope.options)
                    }, g.prototype.setBounds = function(a) {
                        if (b.isUndefined(a.isEmpty)) this.$log.error("Error: SearchBoxParentModel setBounds. Bounds not an instance of LatLngBounds.");
                        else if (a.isEmpty() === !1 && null != this.gObject) return this.gObject.setBounds(a)
                    }, g.prototype.getBounds = function() {
                        return this.gObject.getBounds()
                    }, g.prototype.setVisibility = function(a) {
                        return null != this.attrs.parentdiv ? a === !1 ? this.parentDiv.addClass("ng-hide") : this.parentDiv.removeClass("ng-hide") : a === !1 ? this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].clear() : this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input), this.visible = a
                    }, g
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapWindowsParentModel", ["uiGmapIWindowParentModel", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmapWindowChildModel", "uiGmapLinked", "uiGmap_async", "uiGmapLogger", "$timeout", "$compile", "$http", "$templateCache", "$interpolate", "uiGmapPromise", "uiGmapIWindow", "uiGmapGmapUtil", function(e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
                var t;
                return t = function(e) {
                    function t(b, d, e, f, h, j) {
                        this.gMap = h, this.markersScope = j, this.modelKeyComparison = a(this.modelKeyComparison, this),
                            this.interpolateContent = a(this.interpolateContent, this), this.setChildScope = a(this.setChildScope, this), this.createWindow = a(this.createWindow, this), this.setContentKeys = a(this.setContentKeys, this), this.pieceMeal = a(this.pieceMeal, this), this.createAllNew = a(this.createAllNew, this), this.watchIdKey = a(this.watchIdKey, this), this.createChildScopes = a(this.createChildScopes, this), this.watchOurScope = a(this.watchOurScope, this), this.watchDestroy = a(this.watchDestroy, this), this.onDestroy = a(this.onDestroy, this), this.rebuildAll = a(this.rebuildAll, this), this.doINeedToWipe = a(this.doINeedToWipe, this), this.watchModels = a(this.watchModels, this), this.go = a(this.go, this), t.__super__.constructor.call(this, b, d, e, f, l, m, n, o), this.interface = r, this.plurals = new g, c.each(r.scopeKeys, function(a) {
                            return function(b) {
                                return a[b + "Key"] = void 0
                            }
                        }(this)), this.linked = new i(b, d, e, f), this.contentKeys = void 0, this.isIconVisibleOnClick = void 0, this.firstTime = !0, this.firstWatchModels = !0, this.$log.info(self), this.parentScope = void 0, this.go(b)
                    }
                    return d(t, e), t.include(f), t.prototype.go = function(a) {
                        return this.watchOurScope(a), this.doRebuildAll = null != this.scope.doRebuildAll && this.scope.doRebuildAll, a.$watch("doRebuildAll", function(a) {
                            return function(b, c) {
                                if (b !== c) return a.doRebuildAll = b
                            }
                        }(this)), this.createChildScopes()
                    }, t.prototype.watchModels = function(a) {
                        var b;
                        return b = null != this.markersScope ? "pluralsUpdate" : "models", a.$watch(b, function(b) {
                            return function(d, e) {
                                var f;
                                if (!c.isEqual(d, e) || b.firstWatchModels) return b.firstWatchModels = !1, b.doRebuildAll || b.doINeedToWipe(a.models) ? b.rebuildAll(a, !0, !0) : (f = 0 === b.plurals.length, null != b.existingPieces ? c.last(b.existingPieces._content).then(function() {
                                    return b.createChildScopes(f)
                                }) : b.createChildScopes(f))
                            }
                        }(this), !0)
                    }, t.prototype.doINeedToWipe = function(a) {
                        var b;
                        return b = null == a || 0 === a.length, this.plurals.length > 0 && b
                    }, t.prototype.rebuildAll = function(a, b, c) {
                        return this.onDestroy(c).then(function(a) {
                            return function() {
                                if (b) return a.createChildScopes()
                            }
                        }(this))
                    }, t.prototype.onDestroy = function(a) {
                        return t.__super__.onDestroy.call(this, this.scope), j.promiseLock(this, q.promiseTypes.delete, void 0, void 0, function(a) {
                            return function() {
                                return j.each(a.plurals.values(), function(a) {
                                    return a.destroy(!0)
                                }, j.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function() {
                                    var b;
                                    return null != (b = a.plurals) ? b.removeAll() : void 0
                                })
                            }
                        }(this))
                    }, t.prototype.watchDestroy = function(a) {
                        return a.$on("$destroy", function(b) {
                            return function() {
                                return b.firstWatchModels = !0, b.firstTime = !0, b.rebuildAll(a, !1, !0)
                            }
                        }(this))
                    }, t.prototype.watchOurScope = function(a) {
                        return c.each(r.scopeKeys, function(b) {
                            return function(c) {
                                var d;
                                return d = c + "Key", b[d] = "function" == typeof a[c] ? a[c]() : a[c]
                            }
                        }(this))
                    }, t.prototype.createChildScopes = function(a) {
                        var c, d, e;
                        return null == a && (a = !0), this.isIconVisibleOnClick = !0, b.isDefined(this.linked.attrs.isiconvisibleonclick) && (this.isIconVisibleOnClick = this.linked.scope.isIconVisibleOnClick), c = b.isUndefined(this.linked.scope.models), !c || void 0 !== this.markersScope && void 0 !== (null != (d = this.markersScope) ? d.plurals : void 0) && void 0 !== (null != (e = this.markersScope) ? e.models : void 0) ? null != this.gMap ? null != this.linked.scope.models ? (this.watchIdKey(this.linked.scope), a ? this.createAllNew(this.linked.scope, !1) : this.pieceMeal(this.linked.scope, !1)) : (this.parentScope = this.markersScope, this.watchIdKey(this.parentScope), a ? this.createAllNew(this.markersScope, !0, "plurals", !1) : this.pieceMeal(this.markersScope, !0, "plurals", !1)) : void 0 : void this.$log.error("No models to create windows from! Need direct models or models derived from markers!")
                    }, t.prototype.watchIdKey = function(a) {
                        return this.setIdKey(a), a.$watch("idKey", function(b) {
                            return function(c, d) {
                                if (c !== d && null == c) return b.idKey = c, b.rebuildAll(a, !0, !0)
                            }
                        }(this))
                    }, t.prototype.createAllNew = function(a, b, c, d) {
                        var e;
                        if (null == c && (c = "models"), null == d && (d = !1), this.firstTime && (this.watchModels(a), this.watchDestroy(a)), this.setContentKeys(a.models), !this.didQueueInitPromise(this, a)) return e = null, j.promiseLock(this, q.promiseTypes.create, "createAllNew", function(a) {
                            return e = a
                        }, function(d) {
                            return function() {
                                return j.each(a.models, function(f) {
                                    var g, h;
                                    return g = b && null != (h = d.getItem(a, c, f[d.idKey])) ? h.gObject : void 0, e || (!g && d.markersScope && k.error("Unable to get gMarker from markersScope!"), d.createWindow(f, g, d.gMap)), e
                                }, j.chunkSizeFrom(a.chunk)).then(function() {
                                    return d.firstTime = !1
                                })
                            }
                        }(this))
                    }, t.prototype.pieceMeal = function(a, b, c, d) {
                        var e, f;
                        if (null == c && (c = "models"), null == d && (d = !0), !a.$$destroyed) return e = null, f = null, null != a && this.modelsLength() && this.plurals.length ? j.promiseLock(this, q.promiseTypes.update, "pieceMeal", function(a) {
                            return e = a
                        }, function(b) {
                            return function() {
                                return q.promise(function() {
                                    return b.figureOutState(b.idKey, a, b.plurals, b.modelKeyComparison)
                                }).then(function(c) {
                                    return f = c, j.each(f.removals, function(a) {
                                        if (null != a) return b.plurals.remove(a.id), null != a.destroy && a.destroy(!0), e
                                    }, j.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return j.each(f.adds, function(d) {
                                        var f, g;
                                        if (f = null != (g = b.getItem(a, c, d[b.idKey])) ? g.gObject : void 0, !f) throw "Gmarker undefined";
                                        return b.createWindow(d, f, b.gMap), e
                                    })
                                }).then(function() {
                                    return j.each(f.updates, function(a) {
                                        return b.updateChild(a.child, a.model), e
                                    }, j.chunkSizeFrom(a.chunk))
                                })
                            }
                        }(this)) : (k.debug("pieceMeal: rebuildAll"), this.rebuildAll(this.scope, !0, !0))
                    }, t.prototype.setContentKeys = function(a) {
                        if (this.modelsLength(a)) return this.contentKeys = Object.keys(a[0])
                    }, t.prototype.createWindow = function(a, b, c) {
                        var d, e, f, g, i, j;
                        return e = this.linked.scope.$new(!1), this.setChildScope(e, a), e.$watch("model", function(a) {
                            return function(b, c) {
                                if (b !== c) return a.setChildScope(e, b)
                            }
                        }(this), !0), f = {
                            html: function(b) {
                                return function() {
                                    return b.interpolateContent(b.linked.element.html(), a)
                                }
                            }(this)
                        }, this.DEFAULTS = this.scopeOrModelVal(this.optionsKey, this.scope, a) || {}, g = this.createWindowOptions(b, e, f.html(), this.DEFAULTS), d = new h({
                            model: a,
                            scope: e,
                            opts: g,
                            isIconVisibleOnClick: this.isIconVisibleOnClick,
                            gMap: c,
                            markerScope: null != (i = this.markersScope) && null != (j = i.plurals.get(a[this.idKey])) ? j.scope : void 0,
                            element: f,
                            needToManualDestroy: !1,
                            markerIsVisibleAfterWindowClose: !0,
                            isScopeModel: !0
                        }), null == a[this.idKey] ? void this.$log.error("Window model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : (this.plurals.put(a[this.idKey], d), d)
                    }, t.prototype.setChildScope = function(a, b) {
                        return c.each(r.scopeKeys, function(c) {
                            return function(d) {
                                var e, f;
                                if (e = d + "Key", f = "self" === c[e] ? b : b[c[e]], f !== a[d]) return a[d] = f
                            }
                        }(this)), a.model = b
                    }, t.prototype.interpolateContent = function(a, b) {
                        var c, d, e, f, g, h;
                        if (void 0 !== this.contentKeys && 0 !== this.contentKeys.length) {
                            for (c = p(a), e = {}, h = this.contentKeys, d = 0, g = h.length; d < g; d++) f = h[d], e[f] = b[f];
                            return c(e)
                        }
                    }, t.prototype.modelKeyComparison = function(a, b) {
                        var d, e;
                        if (e = null != this.scope.coords ? this.scope : this.parentScope, null == e) throw "No scope or parentScope set!";
                        return (d = s.equalCoords(this.evalModelHandle(a, e.coords), this.evalModelHandle(b, e.coords))) ? d = c.every(c.without(this.interface.scopeKeys, "coords"), function(c) {
                            return function(d) {
                                return c.evalModelHandle(a, e[d]) === c.evalModelHandle(b, e[d])
                            }
                        }(this)) : d
                    }, t
                }(e)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapCircle", ["uiGmapICircle", "uiGmapCircleParentModel", function(a, b) {
                return c.extend(a, {
                    link: function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return new b(a, c, d, e)
                        })
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapControl", ["uiGmapIControl", "$http", "$templateCache", "$compile", "$controller", "uiGmapGoogleMapApi", function(d, e, f, g, h, i) {
                var j;
                return j = function(j) {
                    function k() {
                        this.link = a(this.link, this), k.__super__.constructor.call(this)
                    }
                    return c(k, j), k.prototype.transclude = !0, k.prototype.link = function(a, c, j, k, l) {
                        return i.then(function(c) {
                            return function(i) {
                                var j, m, n;
                                return j = b.isUndefined(a.template), m = b.isDefined(a.index && !isNaN(parseInt(a.index))) ? parseInt(a.index) : void 0, n = b.isDefined(a.position) ? a.position.toUpperCase().replace(/-/g, "_") : "TOP_CENTER", i.ControlPosition[n] ? d.mapPromise(a, k).then(function(d) {
                                    var i, k, o;
                                    return i = void 0, k = b.element("<div></div>"), o = function(a, b, c) {
                                        return c && (b[0].index = c), a.controls[google.maps.ControlPosition[n]].push(b[0])
                                    }, j ? l(function(a) {
                                        return k.append(a), o(d, k.children(), m)
                                    }) : e.get(a.template, {
                                        cache: f
                                    }).then(function(c) {
                                        var d, e, f;
                                        return d = c.data, f = a.$new(), k.append(d), b.isDefined(a.controller) && (e = h(a.controller, {
                                            $scope: f
                                        }), k.children().data("$ngControllerController", e)), i = g(k.children())(f)
                                    }).catch(function(a) {
                                        return c.$log.error("mapControl: template could not be found")
                                    }).then(function() {
                                        return o(d, i, m)
                                    })
                                }) : void c.$log.error("mapControl: invalid position property")
                            }
                        }(this))
                    }, k
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapDragZoom", ["uiGmapCtrlHandle", "uiGmapPropertyAction", function(a, b) {
                return {
                    restrict: "EMA",
                    transclude: !0,
                    template: '<div class="angular-google-map-dragzoom" ng-transclude style="display: none"></div>',
                    require: "^uiGmapGoogleMap",
                    scope: {
                        keyboardkey: "=",
                        options: "=",
                        spec: "="
                    },
                    controller: ["$scope", "$element", function(b, d) {
                        return b.ctrlType = "uiGmapDragZoom", c.extend(this, a.handle(b, d))
                    }],
                    link: function(c, d, e, f) {
                        return a.mapPromise(c, f).then(function(a) {
                            var d, e, f;
                            return d = function(b) {
                                return a.enableKeyDragZoom(b)
                            }, e = new b(function(a, b) {
                                return b ? d({
                                    key: b
                                }) : d()
                            }), f = new b(function(a, b) {
                                if (b) return d(b)
                            }), c.$watch("keyboardkey", e.sic("keyboardkey")), e.sic(c.keyboardkey), c.$watch("options", f.sic("options")), f.sic(c.options)
                        })
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapDrawingManager", ["uiGmapIDrawingManager", "uiGmapDrawingManagerParentModel", function(a, b) {
                return c.extend(a, {
                    link: function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return new b(a, c, d, e)
                        })
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapApiFreeDrawPolygons", ["uiGmapLogger", "uiGmapBaseObject", "uiGmapCtrlHandle", "uiGmapDrawFreeHandChildModel", "uiGmapLodash", function(b, e, f, g, h) {
                var i;
                return i = function(e) {
                    function i() {
                        return this.link = a(this.link, this), i.__super__.constructor.apply(this, arguments)
                    }
                    return d(i, e), i.include(f), i.prototype.restrict = "EMA", i.prototype.replace = !0, i.prototype.require = "^uiGmapGoogleMap", i.prototype.scope = {
                        polygons: "=",
                        draw: "="
                    }, i.prototype.link = function(a, d, e, f) {
                        return this.mapPromise(a, f).then(function(d) {
                            return function(d) {
                                var e, i;
                                return a.polygons ? c.isArray(a.polygons) ? (e = new g(d, f.getScope()), i = void 0, a.draw = function() {
                                    return "function" == typeof i && i(), e.engage(a.polygons).then(function() {
                                        var b;
                                        return b = !0, i = a.$watchCollection("polygons", function(a, c) {
                                            var d;
                                            return b || a === c ? void(b = !1) : (d = h.differenceObjects(c, a), d.forEach(function(a) {
                                                return a.setMap(null)
                                            }))
                                        })
                                    })
                                }) : b.error("Free Draw Polygons must be of type Array!") : b.error("No polygons to bind to!")
                            }
                        }(this))
                    }, i
                }(e)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapICircle", [function() {
                return {
                    restrict: "EA",
                    replace: !0,
                    require: "^uiGmapGoogleMap",
                    scope: {
                        center: "=center",
                        radius: "=radius",
                        stroke: "=stroke",
                        fill: "=fill",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        icons: "=icons",
                        visible: "=",
                        events: "=",
                        control: "=",
                        zIndex: "=zindex"
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIControl", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle", function(b, c, d) {
                var e;
                return e = function(b) {
                    function e() {
                        this.restrict = "EA", this.replace = !0, this.require = "^uiGmapGoogleMap", this.scope = {
                            template: "@template",
                            position: "@position",
                            controller: "@controller",
                            index: "@index"
                        }, this.$log = c
                    }
                    return a(e, b), e.extend(d), e.prototype.link = function(a, b, c, d) {
                        throw new Error("Not implemented!!")
                    }, e
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIDrawingManager", [function() {
                return {
                    restrict: "EA",
                    replace: !0,
                    require: "^uiGmapGoogleMap",
                    scope: {
                        static: "@",
                        control: "=",
                        options: "=",
                        events: "="
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIMarker", ["uiGmapBaseObject", "uiGmapCtrlHandle", function(b, d) {
                var e;
                return e = function(b) {
                    function e() {
                        this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.replace = !0, this.scope = c.extend(this.scope || {}, e.scope)
                    }
                    return a(e, b), e.scope = {
                        coords: "=coords",
                        icon: "=icon",
                        click: "&click",
                        options: "=options",
                        events: "=events",
                        fit: "=fit",
                        idKey: "=idkey",
                        control: "=control"
                    }, e.scopeKeys = c.keys(e.scope), e.keys = e.scopeKeys, e.extend(d), e
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolygon", ["uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle", function(b, d, e, f) {
                var g;
                return g = function(d) {
                    function g() {}
                    return a(g, d), g.scope = {
                        path: "=path",
                        stroke: "=stroke",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        fill: "=",
                        icons: "=icons",
                        visible: "=",
                        static: "=",
                        events: "=",
                        zIndex: "=zindex",
                        fit: "=",
                        control: "=control"
                    }, g.scopeKeys = c.keys(g.scope), g.include(b), g.extend(f), g.prototype.restrict = "EMA", g.prototype.replace = !0, g.prototype.require = "^uiGmapGoogleMap", g.prototype.scope = g.scope, g.prototype.DEFAULTS = {}, g.prototype.$log = e, g
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolyline", ["uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle", function(b, d, e, f) {
                var g;
                return g = function(d) {
                    function g() {}
                    return a(g, d), g.scope = {
                        path: "=",
                        stroke: "=",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        icons: "=",
                        visible: "=",
                        static: "=",
                        fit: "=",
                        events: "=",
                        zIndex: "=zindex"
                    }, g.scopeKeys = c.keys(g.scope), g.include(b), g.extend(f), g.prototype.restrict = "EMA", g.prototype.replace = !0, g.prototype.require = "^uiGmapGoogleMap", g.prototype.scope = g.scope, g.prototype.DEFAULTS = {}, g.prototype.$log = e, g
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIRectangle", [function() {
                return {
                    restrict: "EMA",
                    require: "^uiGmapGoogleMap",
                    replace: !0,
                    scope: {
                        bounds: "=",
                        stroke: "=",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        fill: "=",
                        visible: "=",
                        events: "="
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIWindow", ["uiGmapBaseObject", "uiGmapChildEvents", "uiGmapCtrlHandle", function(b, d, e) {
                var f;
                return f = function(b) {
                    function f() {
                        this.restrict = "EMA", this.template = void 0, this.transclude = !0, this.priority = -100, this.require = "^uiGmapGoogleMap", this.replace = !0, this.scope = c.extend(this.scope || {}, f.scope)
                    }
                    return a(f, b), f.scope = {
                        coords: "=coords",
                        template: "=template",
                        templateUrl: "=templateurl",
                        templateParameter: "=templateparameter",
                        isIconVisibleOnClick: "=isiconvisibleonclick",
                        closeClick: "&closeclick",
                        options: "=options",
                        control: "=control",
                        show: "=show"
                    }, f.scopeKeys = c.keys(f.scope), f.include(d), f.extend(e), f
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMap", ["$timeout", "$q", "$log", "uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapCtrlHandle", "uiGmapIsReady", "uiGmapuuid", "uiGmapExtendGWin", "uiGmapExtendMarkerClusterer", "uiGmapGoogleMapsUtilV3", "uiGmapGoogleMapApi", "uiGmapEventsHelper", "uiGmapGoogleMapObjectManager", function(e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
                var s, t, u;
                return s = void 0, u = [o, m, n], t = function(f) {
                    function i() {
                        this.link = a(this.link, this);
                        var b;
                        b = function(a) {
                            var b, d;
                            return d = void 0, a.$on("$destroy", function() {
                                return k.decrement()
                            }), b = j.handle(a), a.ctrlType = "Map", a.deferred.promise.then(function() {
                                return u.forEach(function(a) {
                                    return a.init()
                                })
                            }), b.getMap = function() {
                                return a.map
                            }, d = c.extend(this, b)
                        }, this.controller = ["$scope", b]
                    }
                    return d(i, f), i.include(h), i.prototype.restrict = "EMA", i.prototype.transclude = !0, i.prototype.replace = !1, i.prototype.template = '<div class="angular-google-map"><div class="angular-google-map-container">\n</div><div ng-transclude style="display: none"></div></div>', i.prototype.scope = {
                        center: "=",
                        zoom: "=",
                        dragging: "=",
                        control: "=",
                        options: "=",
                        events: "=",
                        eventOpts: "=",
                        styles: "=",
                        bounds: "=",
                        update: "="
                    }, i.prototype.link = function(a, d, f) {
                        var h;
                        return h = [], a.$on("$destroy", function() {
                            if (q.removeEvents(h), "true" === f.recycleMapInstance && a.map) return r.recycleMapInstance(a.map), a.map = null
                        }), a.idleAndZoomChanged = !1, p.then(function(i) {
                            return function(j) {
                                var m, n, o, p, t, u, v, w, x, y, z, A, B, C, D, E, F;
                                if (s = {
                                        mapTypeId: j.MapTypeId.ROADMAP
                                    }, C = k.spawn(), A = function() {
                                        return C.deferred.resolve({
                                            instance: C.instance,
                                            map: m
                                        })
                                    }, !b.isDefined(a.center) && !b.isDefined(a.bounds)) return void g.error("angular-google-maps: a center or bounds property is required");
                                if (b.isDefined(a.center) || (a.center = new google.maps.LatLngBounds(i.getCoords(a.bounds.southwest), i.getCoords(a.bounds.northeast)).getCenter()), b.isDefined(a.zoom) || (a.zoom = 10), t = b.element(d), t.addClass("angular-google-map"), y = {
                                        options: {}
                                    }, f.options && (y.options = a.options), f.styles && (y.styles = a.styles), f.type && (D = f.type.toUpperCase(), google.maps.MapTypeId.hasOwnProperty(D) ? y.mapTypeId = google.maps.MapTypeId[f.type.toUpperCase()] : g.error("angular-google-maps: invalid map type '" + f.type + "'")), w = b.extend({}, s, y, {
                                        center: i.getCoords(a.center),
                                        zoom: a.zoom,
                                        bounds: a.bounds
                                    }), m = "true" === f.recycleMapInstance ? r.createMapInstance(t.find("div")[1], w) : new google.maps.Map(t.find("div")[1], w), m.uiGmap_id = l.generate(), p = !1, h.push(google.maps.event.addListenerOnce(m, "idle", function() {
                                        return a.deferred.resolve(m), A()
                                    })), o = f.events && null != (null != (z = a.events) ? z.blacklist : void 0) ? a.events.blacklist : [], c.isString(o) && (o = [o]), x = function(b, d, e) {
                                        if (!c.includes(o, b)) return e && e(), h.push(google.maps.event.addListener(m, b, function() {
                                            var b;
                                            if (!(null != (b = a.update) ? b.lazy : void 0)) return d()
                                        }))
                                    }, c.includes(o, "all") || (x("dragstart", function() {
                                        return p = !0, a.$evalAsync(function(a) {
                                            if (null != a.dragging) return a.dragging = p
                                        })
                                    }), x("dragend", function() {
                                        return p = !1, a.$evalAsync(function(a) {
                                            if (null != a.dragging) return a.dragging = p
                                        })
                                    }), E = function(d, e) {
                                        var f, g;
                                        if (null == d && (d = m.center), null == e && (e = a), !c.includes(o, "center"))
                                            if (f = d.lat(), g = d.lng(), b.isDefined(e.center.type)) {
                                                if (e.center.coordinates[1] !== f && (e.center.coordinates[1] = f), e.center.coordinates[0] !== g) return e.center.coordinates[0] = g
                                            } else if (e.center.latitude !== f && (e.center.latitude = f), e.center.longitude !== g) return e.center.longitude = g
                                    }, B = !1, x("idle", function() {
                                        var b, d, e;
                                        return b = m.getBounds(), d = b.getNorthEast(), e = b.getSouthWest(), B = !0, a.$evalAsync(function(b) {
                                            return E(), c.isUndefined(b.bounds) || c.includes(o, "bounds") || (b.bounds.northeast = {
                                                latitude: d.lat(),
                                                longitude: d.lng()
                                            }, b.bounds.southwest = {
                                                latitude: e.lat(),
                                                longitude: e.lng()
                                            }), c.includes(o, "zoom") || (b.zoom = m.zoom, a.idleAndZoomChanged = !a.idleAndZoomChanged), B = !1
                                        })
                                    })), b.isDefined(a.events) && null !== a.events && b.isObject(a.events)) {
                                    v = function(b) {
                                        return function() {
                                            return a.events[b].apply(a, [m, b, arguments])
                                        }
                                    }, n = [];
                                    for (u in a.events) a.events.hasOwnProperty(u) && b.isFunction(a.events[u]) && n.push(google.maps.event.addListener(m, u, v(u)));
                                    h.concat(n)
                                }
                                return m.getOptions = function() {
                                    return w
                                }, a.map = m, null != f.control && null != a.control && (a.control.refresh = function(a) {
                                    var b, c, d;
                                    if (null != m) return null != ("undefined" != typeof google && null !== google && null != (c = google.maps) && null != (d = c.event) ? d.trigger : void 0) && null != m && google.maps.event.trigger(m, "resize"), null != (null != a ? a.latitude : void 0) && null != (null != a ? a.longitude : void 0) ? (b = i.getCoords(a), i.isTrue(f.pan) ? m.panTo(b) : m.setCenter(b)) : void 0
                                }, a.control.getGMap = function() {
                                    return m
                                }, a.control.getMapOptions = function() {
                                    return w
                                }, a.control.getCustomEventListeners = function() {
                                    return n
                                }, a.control.removeEvents = function(a) {
                                    return q.removeEvents(a)
                                }), a.$watch("center", function(b, c) {
                                    var d;
                                    if (b !== c && !B && (d = i.getCoords(a.center), d.lat() !== m.center.lat() || d.lng() !== m.center.lng())) return p ? void 0 : (i.validateCoords(b) || g.error("Invalid center for newValue: " + JSON.stringify(b)), i.isTrue(f.pan) && a.zoom === m.zoom ? m.panTo(d) : m.setCenter(d))
                                }, !0), F = null, a.$watch("zoom", function(b, d) {
                                    var f, g;
                                    if (null != b && !c.isEqual(b, d) && (null != m ? m.getZoom() : void 0) !== (null != a ? a.zoom : void 0) && !B) return null != F && e.cancel(F), F = e(function() {
                                        return m.setZoom(b)
                                    }, (null != (f = a.eventOpts) && null != (g = f.debounce) ? g.zoomMs : void 0) + 20, !1)
                                }), a.$watch("bounds", function(a, b) {
                                    var c, d, e, f, h, i, j;
                                    if (a !== b) return null == (null != a && null != (e = a.northeast) ? e.latitude : void 0) || null == (null != a && null != (f = a.northeast) ? f.longitude : void 0) || null == (null != a && null != (h = a.southwest) ? h.latitude : void 0) || null == (null != a && null != (i = a.southwest) ? i.longitude : void 0) ? void g.error("Invalid map bounds for new value: " + JSON.stringify(a)) : (d = new google.maps.LatLng(a.northeast.latitude, a.northeast.longitude), j = new google.maps.LatLng(a.southwest.latitude, a.southwest.longitude), c = new google.maps.LatLngBounds(j, d), m.fitBounds(c))
                                }), ["options", "styles"].forEach(function(b) {
                                    return a.$watch(b, function(a, d) {
                                        if (!c.isEqual(a, d)) return "options" === b ? y.options = a : y.options[b] = a, null != m ? m.setOptions(y) : void 0
                                    }, !0)
                                })
                            }
                        }(this))
                    }, i
                }(i)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarker", ["uiGmapIMarker", "uiGmapMarkerChildModel", "uiGmapMarkerManager", "uiGmapLogger", function(b, d, e, f) {
                var g;
                return g = function(g) {
                    function h() {
                        h.__super__.constructor.call(this), this.template = '<span class="angular-google-map-marker" ng-transclude></span>', f.info(this)
                    }
                    return a(h, g), h.prototype.controller = ["$scope", "$element", function(a, d) {
                        return a.ctrlType = "Marker", c.extend(this, b.handle(a, d))
                    }], h.prototype.link = function(a, f, g, h) {
                        var i;
                        return i = b.mapPromise(a, h), i.then(function(f) {
                            var g, h, i;
                            if (g = new e(f), h = c.object(b.keys, b.keys), i = new d({
                                    scope: a,
                                    model: a,
                                    keys: h,
                                    gMap: f,
                                    doClick: !0,
                                    gManager: g,
                                    doDrawSelf: !1,
                                    trackModel: !1
                                }), i.deferred.promise.then(function(b) {
                                    return a.deferred.resolve(b)
                                }), null != a.control) return a.control.getGMarkers = g.getGMarkers
                        }), a.$on("$destroy", function() {
                            var a;
                            return "undefined" != typeof a && null !== a && a.clear(), a = null
                        })
                    }, h
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarkers", ["uiGmapIMarker", "uiGmapPlural", "uiGmapMarkersParentModel", "uiGmap_sync", "uiGmapLogger", function(b, d, e, f, g) {
                var h;
                return h = function(f) {
                    function h() {
                        h.__super__.constructor.call(this), this.template = '<span class="angular-google-map-markers" ng-transclude></span>', d.extend(this, {
                            doCluster: "=?docluster",
                            clusterOptions: "=clusteroptions",
                            clusterEvents: "=clusterevents",
                            modelsByRef: "=modelsbyref",
                            type: "=?type",
                            typeOptions: "=?typeoptions",
                            typeEvents: "=?typeevents",
                            deepComparison: "=?deepcomparison"
                        }), g.info(this)
                    }
                    return a(h, f), h.prototype.controller = ["$scope", "$element", function(a, d) {
                        return a.ctrlType = "Markers", c.extend(this, b.handle(a, d))
                    }], h.prototype.link = function(a, f, g, h) {
                        var i, j;
                        return i = void 0, j = function() {
                            return a.deferred.resolve()
                        }, b.mapPromise(a, h).then(function(b) {
                            var k;
                            return k = h.getScope(), k.$watch("idleAndZoomChanged", function() {
                                return c.defer(i.gManager.draw)
                            }), i = new e(a, f, g, b), d.link(a, i), null != a.control && (a.control.getGMarkers = function() {
                                var a;
                                return null != (a = i.gManager) ? a.getGMarkers() : void 0
                            }, a.control.getChildMarkers = function() {
                                return i.plurals
                            }), c.last(i.existingPieces._content).then(function() {
                                return j()
                            })
                        })
                    }, h
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapPlural", [function() {
                var a;
                return a = function(a, b) {
                    if (null != a.control) return a.control.updateModels = function(c) {
                        return a.models = c, b.createChildScopes(!1)
                    }, a.control.newModels = function(c) {
                        return a.models = c, b.rebuildAll(a, !0, !0)
                    }, a.control.clean = function() {
                        return b.rebuildAll(a, !1, !0)
                    }, a.control.getPlurals = function() {
                        return b.plurals
                    }, a.control.getManager = function() {
                        return b.gManager
                    }, a.control.hasManager = function() {
                        return null != b.gManager == !0
                    }, a.control.managerDraw = function() {
                        var b;
                        if (a.control.hasManager()) return null != (b = a.control.getManager()) ? b.draw() : void 0
                    }
                }, {
                    extend: function(a, b) {
                        return c.extend(a.scope || {}, b || {}, {
                            idKey: "=idkey",
                            doRebuildAll: "=dorebuildall",
                            models: "=models",
                            chunk: "=chunk",
                            cleanchunk: "=cleanchunk",
                            control: "=control",
                            deepComparison: "=deepcomparison"
                        })
                    },
                    link: function(b, c) {
                        return a(b, c)
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygon", ["uiGmapIPolygon", "$timeout", "uiGmapPolygonChildModel", function(b, d, e) {
                var f;
                return f = function(d) {
                    function f() {
                        return this.link = a(this.link, this), f.__super__.constructor.apply(this, arguments)
                    }
                    return c(f, d), f.prototype.link = function(a, c, d, f) {
                        var g, h;
                        return g = [], h = b.mapPromise(a, f), null != a.control && (a.control.getInstance = this, a.control.polygons = g, a.control.promise = h), h.then(function(b) {
                            return function(c) {
                                return g.push(new e({
                                    scope: a,
                                    attrs: d,
                                    gMap: c,
                                    defaults: b.DEFAULTS
                                }))
                            }
                        }(this))
                    }, f
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygons", ["uiGmapIPolygon", "$timeout", "uiGmapPolygonsParentModel", "uiGmapPlural", function(d, e, f, g) {
                var h;
                return h = function(d) {
                    function e() {
                        this.link = a(this.link, this), e.__super__.constructor.call(this), g.extend(this), this.$log.info(this)
                    }
                    return c(e, d), e.prototype.link = function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(h) {
                                return (b.isUndefined(a.path) || null === a.path) && e.$log.warn("polygons: no valid path attribute found"), a.models || e.$log.warn("polygons: no models found to create from"), g.link(a, new f(a, c, d, h, e.DEFAULTS))
                            }
                        }(this))
                    }, e
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolyline", ["uiGmapIPolyline", "$timeout", "uiGmapPolylineChildModel", function(d, e, f) {
                var g;
                return g = function(e) {
                    function g() {
                        return this.link = a(this.link, this), g.__super__.constructor.apply(this, arguments)
                    }
                    return c(g, e), g.prototype.link = function(a, c, e, g) {
                        return d.mapPromise(a, g).then(function(c) {
                            return function(d) {
                                return !b.isUndefined(a.path) && null !== a.path && c.validatePath(a.path) || c.$log.warn("polyline: no valid path attribute found"), new f({
                                    scope: a,
                                    attrs: e,
                                    gMap: d,
                                    defaults: c.DEFAULTS
                                })
                            }
                        }(this))
                    }, g
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylines", ["uiGmapIPolyline", "$timeout", "uiGmapPolylinesParentModel", "uiGmapPlural", function(d, e, f, g) {
                var h;
                return h = function(d) {
                    function e() {
                        this.link = a(this.link, this), e.__super__.constructor.call(this), g.extend(this), this.$log.info(this)
                    }
                    return c(e, d), e.prototype.link = function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(h) {
                                return (b.isUndefined(a.path) || null === a.path) && e.$log.warn("polylines: no valid path attribute found"), a.models || e.$log.warn("polylines: no models found to create from"), g.link(a, new f(a, c, d, h, e.DEFAULTS))
                            }
                        }(this))
                    }, e
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapRectangle", ["uiGmapLogger", "uiGmapGmapUtil", "uiGmapIRectangle", "uiGmapRectangleParentModel", function(a, b, d, e) {
                return c.extend(d, {
                    link: function(a, b, c, d) {
                        return d.getScope().deferred.promise.then(function(d) {
                            return new e(a, b, c, d)
                        })
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindow", ["uiGmapIWindow", "uiGmapGmapUtil", "uiGmapWindowChildModel", "uiGmapLodash", "uiGmapLogger", function(d, e, f, g, h) {
                var i;
                return i = function(i) {
                    function j() {
                        this.link = a(this.link, this), j.__super__.constructor.call(this), this.require = ["^uiGmapGoogleMap", "^?uiGmapMarker"], this.template = '<span class="angular-google-maps-window" ng-transclude></span>', h.debug(this), this.childWindows = []
                    }
                    return c(j, i), j.include(e), j.prototype.link = function(a, c, e, f) {
                        var g, h;
                        return g = f.length > 1 && null != f[1] ? f[1] : void 0, h = null != g ? g.getScope() : void 0, this.mapPromise = d.mapPromise(a, f[0]), this.mapPromise.then(function(d) {
                            return function(f) {
                                var i;
                                return i = !0, b.isDefined(e.isiconvisibleonclick) && (i = a.isIconVisibleOnClick), g ? h.deferred.promise.then(function(b) {
                                    return d.init(a, c, i, f, h)
                                }) : void d.init(a, c, i, f)
                            }
                        }(this))
                    }, j.prototype.init = function(a, b, c, d, e) {
                        var h, i, j, k, l;
                        if (i = null != a.options ? a.options : {}, k = null != a && this.validateCoords(a.coords), null != (null != e ? e.getGMarker : void 0) && (j = e.getGMarker()), l = k ? this.createWindowOptions(j, a, b.html(), i) : i, null != d && (h = new f({
                                scope: a,
                                opts: l,
                                isIconVisibleOnClick: c,
                                gMap: d,
                                markerScope: e,
                                element: b
                            }), this.childWindows.push(h), a.$on("$destroy", function(a) {
                                return function() {
                                    return a.childWindows = g.withoutObjects(a.childWindows, [h], function(a, b) {
                                        return a.scope.$id === b.scope.$id
                                    }), a.childWindows.length = 0
                                }
                            }(this))), null != a.control && (a.control.getGWindows = function(a) {
                                return function() {
                                    return a.childWindows.map(function(a) {
                                        return a.gObject
                                    })
                                }
                            }(this), a.control.getChildWindows = function(a) {
                                return function() {
                                    return a.childWindows
                                }
                            }(this), a.control.getPlurals = a.control.getChildWindows, a.control.showWindow = function(a) {
                                return function() {
                                    return a.childWindows.map(function(a) {
                                        return a.showWindow()
                                    })
                                }
                            }(this), a.control.hideWindow = function(a) {
                                return function() {
                                    return a.childWindows.map(function(a) {
                                        return a.hideWindow()
                                    })
                                }
                            }(this)), null != this.onChildCreation && null != h) return this.onChildCreation(h)
                    }, j
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindows", ["uiGmapIWindow", "uiGmapPlural", "uiGmapWindowsParentModel", "uiGmapPromise", "uiGmapLogger", function(b, d, e, f, g) {
                var h;
                return h = function(b) {
                    function h() {
                        this.link = a(this.link, this), h.__super__.constructor.call(this), this.require = ["^uiGmapGoogleMap", "^?uiGmapMarkers"], this.template = '<span class="angular-google-maps-windows" ng-transclude></span>', d.extend(this), g.debug(this)
                    }
                    return c(h, b), h.prototype.link = function(a, b, c, d) {
                        var e, g, h;
                        return e = d[0].getScope(), g = d.length > 1 && null != d[1] ? d[1] : void 0, h = null != g ? g.getScope() : void 0, e.deferred.promise.then(function(e) {
                            return function(g) {
                                var i, j;
                                return i = (null != h && null != (j = h.deferred) ? j.promise : void 0) || f.resolve(), i.then(function() {
                                    var f, i;
                                    return f = null != (i = e.parentModel) ? i.existingPieces : void 0, f ? f.then(function() {
                                        return e.init(a, b, c, d, g, h)
                                    }) : e.init(a, b, c, d, g, h)
                                })
                            }
                        }(this))
                    }, h.prototype.init = function(a, b, c, f, g, h) {
                        var i;
                        if (i = new e(a, b, c, f, g, h), d.link(a, i), null != a.control) return a.control.getGWindows = function() {
                            return i.plurals.map(function(a) {
                                return a.gObject
                            })
                        }, a.control.getChildWindows = function() {
                            return i.plurals
                        }
                    }, h
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapGoogleMap", ["uiGmapMap", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapMarker", ["$timeout", "uiGmapMarker", function(a, b) {
                return new b(a)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapMarkers", ["$timeout", "uiGmapMarkers", function(a, b) {
                return new b(a)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolygon", ["uiGmapPolygon", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapCircle", ["uiGmapCircle", function(a) {
                return a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolyline", ["uiGmapPolyline", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolylines", ["uiGmapPolylines", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapRectangle", ["uiGmapLogger", "uiGmapRectangle", function(a, b) {
                return b
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapWindow", ["$timeout", "$compile", "$http", "$templateCache", "uiGmapWindow", function(a, b, c, d, e) {
                return new e(a, b, c, d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapWindows", ["$timeout", "$compile", "$http", "$templateCache", "$interpolate", "uiGmapWindows", function(a, b, c, d, e, f) {
                return new f(a, b, c, d, e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps").directive("uiGmapLayer", ["$timeout", "uiGmapLogger", "uiGmapLayerParentModel", function(b, c, d) {
                var e;
                return new(e = function() {
                    function b() {
                        this.link = a(this.link, this), this.$log = c, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = "<span class='angular-google-map-layer' ng-transclude></span>", this.replace = !0, this.scope = {
                            show: "=show",
                            type: "=type",
                            namespace: "=namespace",
                            options: "=options",
                            onCreated: "&oncreated"
                        }
                    }
                    return b.prototype.link = function(a, b, c, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(e) {
                                return null != a.onCreated ? new d(a, b, c, e, a.onCreated) : new d(a, b, c, e)
                            }
                        }(this))
                    }, b
                }())
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapMapControl", ["uiGmapControl", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapDragZoom", ["uiGmapDragZoom", function(a) {
                return a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapDrawingManager", ["uiGmapDrawingManager", function(a) {
                return a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapFreeDrawPolygons", ["uiGmapApiFreeDrawPolygons", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps").directive("uiGmapMapType", ["$timeout", "uiGmapLogger", "uiGmapMapTypeParentModel", function(b, c, d) {
                var e;
                return new(e = function() {
                    function b() {
                        this.link = a(this.link, this), this.$log = c, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = '<span class="angular-google-map-layer" ng-transclude></span>', this.replace = !0, this.scope = {
                            show: "=show",
                            options: "=options",
                            refresh: "=refresh",
                            id: "@"
                        }
                    }
                    return b.prototype.link = function(a, b, c, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(e) {
                                return new d(a, b, c, e)
                            }
                        }(this))
                    }, b
                }())
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps").directive("uiGmapMapTypes", ["$timeout", "uiGmapLogger", "uiGmapMapTypesParentModel", function(b, c, d) {
                var e;
                return new(e = function() {
                    function b() {
                        this.link = a(this.link, this), this.$log = c, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = '<span class="angular-google-map-layers" ng-transclude></span>', this.scope = {
                            mapTypes: "=mapTypes",
                            show: "=show",
                            options: "=options",
                            refresh: "=refresh",
                            id: "=idKey"
                        }
                    }
                    return b.prototype.link = function(a, b, c, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(e) {
                                return new d(a, b, c, e)
                            }
                        }(this))
                    }, b
                }())
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolygons", ["uiGmapPolygons", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps").directive("uiGmapSearchBox", ["uiGmapGoogleMapApi", "uiGmapLogger", "uiGmapSearchBoxParentModel", "$http", "$templateCache", "$compile", function(c, d, e, f, g, h) {
                var i;
                return new(i = function() {
                    function i() {
                        this.link = a(this.link, this), this.$log = d, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = "<span class='angular-google-map-search' ng-transclude></span>", this.replace = !0, this.scope = {
                            template: "=template",
                            events: "=events",
                            position: "=?position",
                            options: "=?options",
                            parentdiv: "=?parentdiv",
                            ngModel: "=?"
                        }
                    }
                    return i.prototype.require = "ngModel", i.prototype.link = function(a, d, i, j) {
                        return c.then(function(c) {
                            return function(k) {
                                return null == a.template && (g.put("uigmap-searchbox-default.tpl.html", '<input type="text">'), a.template = "uigmap-searchbox-default.tpl.html"), f.get(a.template, {
                                    cache: g
                                }).then(function(f) {
                                    var g;
                                    return g = f.data, b.isUndefined(a.events) ? void c.$log.error("searchBox: the events property is required") : j.getScope().deferred.promise.then(function(f) {
                                        var j;
                                        return j = b.isDefined(a.position) ? a.position.toUpperCase().replace(/-/g, "_") : "TOP_LEFT", k.ControlPosition[j] ? new e(a, d, i, f, j, h(g)(a)) : void c.$log.error("searchBox: invalid position property")
                                    })
                                })
                            }
                        }(this))
                    }, i
                }())
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapShow", ["$animate", "uiGmapLogger", function(a, c) {
                return {
                    scope: {
                        uiGmapShow: "=",
                        uiGmapAfterShow: "&",
                        uiGmapAfterHide: "&"
                    },
                    link: function(d, e) {
                        var f, g, h;
                        return f = function(b, c) {
                            return a[b](e, "ng-hide").then(function() {
                                return c()
                            })
                        }, g = function(b, c) {
                            return a[b](e, "ng-hide", c)
                        }, h = function(a, d) {
                            return b.version.major > 1 ? c.error("uiGmapShow is not supported for Angular Major greater than 1.\nYour Major is " + b.version.major + '"') : 1 === b.version.major && b.version.minor < 3 ? g(a, d) : f(a, d)
                        }, d.$watch("uiGmapShow", function(a) {
                            if (a && h("removeClass", d.uiGmapAfterShow), !a) return h("addClass", d.uiGmapAfterHide)
                        })
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapStreetViewPanorama", ["uiGmapGoogleMapApi", "uiGmapLogger", "uiGmapGmapUtil", "uiGmapEventsHelper", function(a, c, d, e) {
                var f;
                return f = "uiGmapStreetViewPanorama", {
                    restrict: "EMA",
                    template: '<div class="angular-google-map-street-view-panorama"></div>',
                    replace: !0,
                    scope: {
                        focalcoord: "=",
                        radius: "=?",
                        events: "=?",
                        options: "=?",
                        control: "=?",
                        povoptions: "=?",
                        imagestatus: "="
                    },
                    link: function(g, h, i) {
                        return a.then(function(a) {
                            return function(a) {
                                var i, j, k, l, m, n, o, p, q, r;
                                return p = void 0, r = void 0, k = !1, n = void 0, o = null, q = null, i = function() {
                                    if (e.removeEvents(n), null != p && (p.unbind("position"), p.setVisible(!1)), null != r) return null != (null != r ? r.setVisible : void 0) && r.setVisible(!1), r = void 0
                                }, m = function(a, c) {
                                    var d;
                                    return d = google.maps.geometry.spherical.computeHeading(a, c), k = !0, g.radius = g.radius || 50, q = b.extend({
                                        heading: d,
                                        zoom: 1,
                                        pitch: 0
                                    }, g.povoptions || {}), o = o = b.extend({
                                        navigationControl: !1,
                                        addressControl: !1,
                                        linksControl: !1,
                                        position: a,
                                        pov: q,
                                        visible: !0
                                    }, g.options || {}), k = !1
                                }, j = function() {
                                    var a;
                                    return g.focalcoord ? g.radius ? (i(), null == r && (r = new google.maps.StreetViewService), g.events && (n = e.setEvents(r, g, g)), a = d.getCoords(g.focalcoord), r.getPanoramaByLocation(a, g.radius, function(b, c) {
                                        var d, e, f;
                                        if (null != g.imagestatus && (g.imagestatus = c), null != (null != (f = g.events) ? f.image_status_changed : void 0) && g.events.image_status_changed(r, "image_status_changed", g, c), "OK" === c) return e = b.location.latLng, m(e, a), d = h[0], p = new google.maps.StreetViewPanorama(d, o)
                                    })) : void c.error(f + ": needs a radius to set the camera view from its focal target.") : void c.error(f + ": focalCoord needs to be defined")
                                }, null != g.control && (g.control.getOptions = function() {
                                    return o
                                }, g.control.getPovOptions = function() {
                                    return q
                                }, g.control.getGObject = function() {
                                    return r
                                }, g.control.getGPano = function() {
                                    return p
                                }), g.$watch("options", function(a, b) {
                                    if (a !== b && a !== o && !k) return j()
                                }), l = !0, g.$watch("focalcoord", function(a, b) {
                                    if ((a !== b || l) && null != a) return l = !1, j()
                                }), g.$on("$destroy", function() {
                                    return i()
                                })
                            }
                        }(this))
                    }
                }
            }])
        }.call(this), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapuuid", function() {
        function a() {}
        return a.generate = function() {
            var b = a._gri,
                c = a._ha;
            return c(b(32), 8) + "-" + c(b(16), 4) + "-" + c(16384 | b(12), 4) + "-" + c(32768 | b(14), 4) + "-" + c(b(48), 12)
        }, a._gri = function(a) {
            return 0 > a ? NaN : 30 >= a ? 0 | Math.random() * (1 << a) : 53 >= a ? (0 | 1073741824 * Math.random()) + 1073741824 * (0 | Math.random() * (1 << a - 30)) : NaN
        }, a._ha = function(a, b) {
            for (var c = a.toString(16), d = b - c.length, e = "0"; 0 < d; d >>>= 1, e += e) 1 & d && (c = e + c);
            return c
        }, a
    }), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapGoogleMapsUtilV3", function() {
        return {
            init: c.once(function() {
                + function() {
                    function b(a, c) {
                        a.getMarkerClusterer().extend(b, google.maps.OverlayView), this.cluster_ = a, this.className_ = a.getMarkerClusterer().getClusterClass(), this.styles_ = c, this.center_ = null, this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(a.getMap())
                    }

                    function c(a) {
                        this.markerClusterer_ = a, this.map_ = a.getMap(), this.gridSize_ = a.getGridSize(), this.minClusterSize_ = a.getMinimumClusterSize(), this.averageCenter_ = a.getAverageCenter(), this.hideLabel_ = a.getHideLabel(), this.markers_ = [], this.center_ = null, this.bounds_ = null, this.clusterIcon_ = new b(this, a.getStyles())
                    }

                    function e(a, b, c) {
                        this.extend(e, google.maps.OverlayView), b = b || [], c = c || {}, this.markers_ = [], this.clusters_ = [], this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1, this.gridSize_ = c.gridSize || 60, this.minClusterSize_ = c.minimumClusterSize || 2, this.maxZoom_ = c.maxZoom || null, this.styles_ = c.styles || [], this.title_ = c.title || "", this.zoomOnClick_ = !0, void 0 !== c.zoomOnClick && (this.zoomOnClick_ = c.zoomOnClick), this.averageCenter_ = !1, void 0 !== c.averageCenter && (this.averageCenter_ = c.averageCenter), this.ignoreHidden_ = !1, void 0 !== c.ignoreHidden && (this.ignoreHidden_ = c.ignoreHidden), this.enableRetinaIcons_ = !1, void 0 !== c.enableRetinaIcons && (this.enableRetinaIcons_ = c.enableRetinaIcons), this.hideLabel_ = !1, void 0 !== c.hideLabel && (this.hideLabel_ = c.hideLabel), this.imagePath_ = c.imagePath || e.IMAGE_PATH, this.imageExtension_ = c.imageExtension || e.IMAGE_EXTENSION, this.imageSizes_ = c.imageSizes || e.IMAGE_SIZES, this.calculator_ = c.calculator || e.CALCULATOR, this.batchSize_ = c.batchSize || e.BATCH_SIZE, this.batchSizeIE_ = c.batchSizeIE || e.BATCH_SIZE_IE, this.clusterClass_ = c.clusterClass || "cluster", -1 !== navigator.userAgent.toLowerCase().indexOf("msie") && (this.batchSize_ = this.batchSizeIE_), this.setupStyles_(), this.addMarkers(b, !0), this.setMap(a)
                    }

                    function f(a) {
                        a = a || {}, google.maps.OverlayView.apply(this, arguments), this.content_ = a.content || "", this.disableAutoPan_ = a.disableAutoPan || !1, this.maxWidth_ = a.maxWidth || 0, this.pixelOffset_ = a.pixelOffset || new google.maps.Size(0, 0), this.position_ = a.position || new google.maps.LatLng(0, 0), this.zIndex_ = a.zIndex || null, this.boxClass_ = a.boxClass || "infoBox", this.boxStyle_ = a.boxStyle || {}, this.closeBoxMargin_ = a.closeBoxMargin || "2px", this.closeBoxURL_ = a.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif", "" === a.closeBoxURL && (this.closeBoxURL_ = ""), this.infoBoxClearance_ = a.infoBoxClearance || new google.maps.Size(1, 1), "undefined" == typeof a.visible && ("undefined" == typeof a.isHidden ? a.visible = !0 : a.visible = !a.isHidden), this.isHidden_ = !a.visible, this.alignBottom_ = a.alignBottom || !1, this.pane_ = a.pane || "floatPane", this.enableEventPropagation_ = a.enableEventPropagation || !1, this.div_ = null, this.closeListener_ = null, this.moveListener_ = null, this.contextListener_ = null, this.eventListeners_ = null, this.fixedWidthSet_ = null
                    }

                    function g(a, b) {
                        function c() {}
                        c.prototype = b.prototype, a.superClass_ = b.prototype, a.prototype = new c, a.prototype.constructor = a
                    }

                    function h(a, b, c) {
                        this.marker_ = a, this.handCursorURL_ = a.handCursorURL, this.labelDiv_ = document.createElement("div"), this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;", this.eventDiv_ = document.createElement("div"), this.eventDiv_.style.cssText = this.labelDiv_.style.cssText, this.eventDiv_.setAttribute("onselectstart", "return false;"), this.eventDiv_.setAttribute("ondragstart", "return false;"), this.crossDiv_ = h.getSharedCross(b)
                    }

                    function i(a) {
                        a = a || {}, a.labelContent = a.labelContent || "", a.labelAnchor = a.labelAnchor || new google.maps.Point(0, 0), a.labelClass = a.labelClass || "markerLabels", a.labelStyle = a.labelStyle || {}, a.labelInBackground = a.labelInBackground || !1, "undefined" == typeof a.labelVisible && (a.labelVisible = !0), "undefined" == typeof a.raiseOnDrag && (a.raiseOnDrag = !0), "undefined" == typeof a.clickable && (a.clickable = !0), "undefined" == typeof a.draggable && (a.draggable = !1), "undefined" == typeof a.optimized && (a.optimized = !1), a.crossImage = a.crossImage || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png", a.handCursor = a.handCursor || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur", a.optimized = !1, this.label = new h(this, a.crossImage, a.handCursor), google.maps.Marker.apply(this, arguments)
                    }

                    function j(a) {
                        var b = a || {};
                        this.ready_ = !1, this.dragging_ = !1, a.visible == d && (a.visible = !0), a.shadow == d && (a.shadow = "7px -3px 5px rgba(88,88,88,0.7)"), a.anchor == d && (a.anchor = k.BOTTOM), this.setValues(b)
                    }
                    b.prototype.onAdd = function() {
                        var a, b, c = this;
                        this.div_ = document.createElement("div"), this.div_.className = this.className_, this.visible_ && this.show(), this.getPanes().overlayMouseTarget.appendChild(this.div_), this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function() {
                            b = a
                        }), google.maps.event.addDomListener(this.div_, "mousedown", function() {
                            a = !0, b = !1
                        }), google.maps.event.addDomListener(this.div_, "click", function(d) {
                            if (a = !1, !b) {
                                var e, f, g = c.cluster_.getMarkerClusterer();
                                google.maps.event.trigger(g, "click", c.cluster_), google.maps.event.trigger(g, "clusterclick", c.cluster_), g.getZoomOnClick() && (f = g.getMaxZoom(), e = c.cluster_.getBounds(), g.getMap().fitBounds(e), setTimeout(function() {
                                    g.getMap().fitBounds(e), null !== f && g.getMap().getZoom() > f && g.getMap().setZoom(f + 1)
                                }, 100)), d.cancelBubble = !0, d.stopPropagation && d.stopPropagation()
                            }
                        }), google.maps.event.addDomListener(this.div_, "mouseover", function() {
                            var a = c.cluster_.getMarkerClusterer();
                            google.maps.event.trigger(a, "mouseover", c.cluster_)
                        }), google.maps.event.addDomListener(this.div_, "mouseout", function() {
                            var a = c.cluster_.getMarkerClusterer();
                            google.maps.event.trigger(a, "mouseout", c.cluster_)
                        })
                    }, b.prototype.onRemove = function() {
                        this.div_ && this.div_.parentNode && (this.hide(), google.maps.event.removeListener(this.boundsChangedListener_), google.maps.event.clearInstanceListeners(this.div_), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
                    }, b.prototype.draw = function() {
                        if (this.visible_) {
                            var a = this.getPosFromLatLng_(this.center_);
                            this.div_.style.top = a.y + "px", this.div_.style.left = a.x + "px"
                        }
                    }, b.prototype.hide = function() {
                        this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
                    }, b.prototype.show = function() {
                        if (this.div_) {
                            var a = "",
                                b = this.backgroundPosition_.split(" "),
                                c = parseInt(b[0].trim(), 10),
                                d = parseInt(b[1].trim(), 10),
                                e = this.getPosFromLatLng_(this.center_);
                            this.div_.style.cssText = this.createCss(e), a = "<img src='" + this.url_ + "' style='position: absolute; top: " + d + "px; left: " + c + "px; ", a += this.cluster_.getMarkerClusterer().enableRetinaIcons_ ? "width: " + this.width_ + "px;height: " + this.height_ + "px;" : "clip: rect(" + -1 * d + "px, " + (-1 * c + this.width_) + "px, " + (-1 * d + this.height_) + "px, " + -1 * c + "px);", a += "'>", this.div_.innerHTML = a + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + (this.cluster_.hideLabel_ ? " " : this.sums_.text) + "</div>", this.div_.title = "undefined" == typeof this.sums_.title || "" === this.sums_.title ? this.cluster_.getMarkerClusterer().getTitle() : this.sums_.title, this.div_.style.display = ""
                        }
                        this.visible_ = !0
                    }, b.prototype.useStyle = function(a) {
                        this.sums_ = a;
                        var b = Math.max(0, a.index - 1);
                        b = Math.min(this.styles_.length - 1, b);
                        var c = this.styles_[b];
                        this.url_ = c.url, this.height_ = c.height, this.width_ = c.width, this.anchorText_ = c.anchorText || [0, 0], this.anchorIcon_ = c.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)], this.textColor_ = c.textColor || "black", this.textSize_ = c.textSize || 11, this.textDecoration_ = c.textDecoration || "none", this.fontWeight_ = c.fontWeight || "bold", this.fontStyle_ = c.fontStyle || "normal", this.fontFamily_ = c.fontFamily || "Arial,sans-serif", this.backgroundPosition_ = c.backgroundPosition || "0 0"
                    }, b.prototype.setCenter = function(a) {
                        this.center_ = a
                    }, b.prototype.createCss = function(a) {
                        var b = [];
                        return b.push("cursor: pointer;"), b.push("position: absolute; top: " + a.y + "px; left: " + a.x + "px;"), b.push("width: " + this.width_ + "px; height: " + this.height_ + "px;"), b.join("")
                    }, b.prototype.getPosFromLatLng_ = function(a) {
                        var b = this.getProjection().fromLatLngToDivPixel(a);
                        return b.x -= this.anchorIcon_[1], b.y -= this.anchorIcon_[0], b.x = parseInt(b.x, 10), b.y = parseInt(b.y, 10), b
                    }, c.prototype.getSize = function() {
                        return this.markers_.length
                    }, c.prototype.getMarkers = function() {
                        return this.markers_
                    }, c.prototype.getCenter = function() {
                        return this.center_
                    }, c.prototype.getMap = function() {
                        return this.map_
                    }, c.prototype.getMarkerClusterer = function() {
                        return this.markerClusterer_
                    }, c.prototype.getBounds = function() {
                        var a, b = new google.maps.LatLngBounds(this.center_, this.center_),
                            c = this.getMarkers();
                        for (a = 0; a < c.length; a++) b.extend(c[a].getPosition());
                        return b
                    }, c.prototype.remove = function() {
                        this.clusterIcon_.setMap(null), this.markers_ = [], delete this.markers_
                    }, c.prototype.addMarker = function(a) {
                        var b, c, d;
                        if (this.isMarkerAlreadyAdded_(a)) return !1;
                        if (this.center_) {
                            if (this.averageCenter_) {
                                var e = this.markers_.length + 1,
                                    f = (this.center_.lat() * (e - 1) + a.getPosition().lat()) / e,
                                    g = (this.center_.lng() * (e - 1) + a.getPosition().lng()) / e;
                                this.center_ = new google.maps.LatLng(f, g), this.calculateBounds_()
                            }
                        } else this.center_ = a.getPosition(), this.calculateBounds_();
                        if (a.isAdded = !0, this.markers_.push(a), c = this.markers_.length, d = this.markerClusterer_.getMaxZoom(), null !== d && this.map_.getZoom() > d) a.getMap() !== this.map_ && a.setMap(this.map_);
                        else if (c < this.minClusterSize_) a.getMap() !== this.map_ && a.setMap(this.map_);
                        else if (c === this.minClusterSize_)
                            for (b = 0; c > b; b++) this.markers_[b].setMap(null);
                        else a.setMap(null);
                        return !0
                    }, c.prototype.isMarkerInClusterBounds = function(a) {
                        return this.bounds_.contains(a.getPosition())
                    }, c.prototype.calculateBounds_ = function() {
                        var a = new google.maps.LatLngBounds(this.center_, this.center_);
                        this.bounds_ = this.markerClusterer_.getExtendedBounds(a)
                    }, c.prototype.updateIcon_ = function() {
                        var a = this.markers_.length,
                            b = this.markerClusterer_.getMaxZoom();
                        if (null !== b && this.map_.getZoom() > b) return void this.clusterIcon_.hide();
                        if (a < this.minClusterSize_) return void this.clusterIcon_.hide();
                        var c = this.markerClusterer_.getStyles().length,
                            d = this.markerClusterer_.getCalculator()(this.markers_, c);
                        this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.useStyle(d), this.clusterIcon_.show()
                    }, c.prototype.isMarkerAlreadyAdded_ = function(a) {
                        for (var b = 0, c = this.markers_.length; c > b; b++)
                            if (a === this.markers_[b]) return !0;
                        return !1
                    }, e.prototype.onAdd = function() {
                        var a = this;
                        this.activeMap_ = this.getMap(), this.ready_ = !0, this.repaint(), this.listeners_ = [google.maps.event.addListener(this.getMap(), "zoom_changed", function() {
                            a.resetViewport_(!1), (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) && google.maps.event.trigger(this, "idle")
                        }), google.maps.event.addListener(this.getMap(), "idle", function() {
                            a.redraw_()
                        })]
                    }, e.prototype.onRemove = function() {
                        var a;
                        for (a = 0; a < this.markers_.length; a++) this.markers_[a].getMap() !== this.activeMap_ && this.markers_[a].setMap(this.activeMap_);
                        for (a = 0; a < this.clusters_.length; a++) this.clusters_[a].remove();
                        for (this.clusters_ = [], a = 0; a < this.listeners_.length; a++) google.maps.event.removeListener(this.listeners_[a]);
                        this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1
                    }, e.prototype.draw = function() {}, e.prototype.setupStyles_ = function() {
                        var a, b;
                        if (!(this.styles_.length > 0))
                            for (a = 0; a < this.imageSizes_.length; a++) b = this.imageSizes_[a], this.styles_.push({
                                url: this.imagePath_ + (a + 1) + "." + this.imageExtension_,
                                height: b,
                                width: b
                            })
                    }, e.prototype.fitMapToMarkers = function() {
                        var a, b = this.getMarkers(),
                            c = new google.maps.LatLngBounds;
                        for (a = 0; a < b.length; a++) c.extend(b[a].getPosition());
                        this.getMap().fitBounds(c)
                    }, e.prototype.getGridSize = function() {
                        return this.gridSize_
                    }, e.prototype.setGridSize = function(a) {
                        this.gridSize_ = a
                    }, e.prototype.getMinimumClusterSize = function() {
                        return this.minClusterSize_
                    }, e.prototype.setMinimumClusterSize = function(a) {
                        this.minClusterSize_ = a
                    }, e.prototype.getMaxZoom = function() {
                        return this.maxZoom_
                    }, e.prototype.setMaxZoom = function(a) {
                        this.maxZoom_ = a
                    }, e.prototype.getStyles = function() {
                        return this.styles_
                    }, e.prototype.setStyles = function(a) {
                        this.styles_ = a
                    }, e.prototype.getTitle = function() {
                        return this.title_
                    }, e.prototype.setTitle = function(a) {
                        this.title_ = a
                    }, e.prototype.getZoomOnClick = function() {
                        return this.zoomOnClick_
                    }, e.prototype.setZoomOnClick = function(a) {
                        this.zoomOnClick_ = a
                    }, e.prototype.getAverageCenter = function() {
                        return this.averageCenter_
                    }, e.prototype.setAverageCenter = function(a) {
                        this.averageCenter_ = a
                    }, e.prototype.getIgnoreHidden = function() {
                        return this.ignoreHidden_
                    }, e.prototype.setIgnoreHidden = function(a) {
                        this.ignoreHidden_ = a
                    }, e.prototype.getEnableRetinaIcons = function() {
                        return this.enableRetinaIcons_
                    }, e.prototype.setEnableRetinaIcons = function(a) {
                        this.enableRetinaIcons_ = a
                    }, e.prototype.getImageExtension = function() {
                        return this.imageExtension_
                    }, e.prototype.setImageExtension = function(a) {
                        this.imageExtension_ = a
                    }, e.prototype.getImagePath = function() {
                        return this.imagePath_
                    }, e.prototype.setImagePath = function(a) {
                        this.imagePath_ = a
                    }, e.prototype.getImageSizes = function() {
                        return this.imageSizes_
                    }, e.prototype.setImageSizes = function(a) {
                        this.imageSizes_ = a
                    }, e.prototype.getCalculator = function() {
                        return this.calculator_
                    }, e.prototype.setCalculator = function(a) {
                        this.calculator_ = a
                    }, e.prototype.setHideLabel = function(a) {
                        this.hideLabel_ = a
                    }, e.prototype.getHideLabel = function() {
                        return this.hideLabel_
                    }, e.prototype.getBatchSizeIE = function() {
                        return this.batchSizeIE_
                    }, e.prototype.setBatchSizeIE = function(a) {
                        this.batchSizeIE_ = a
                    }, e.prototype.getClusterClass = function() {
                        return this.clusterClass_
                    }, e.prototype.setClusterClass = function(a) {
                        this.clusterClass_ = a
                    }, e.prototype.getMarkers = function() {
                        return this.markers_
                    }, e.prototype.getTotalMarkers = function() {
                        return this.markers_.length
                    }, e.prototype.getClusters = function() {
                        return this.clusters_
                    }, e.prototype.getTotalClusters = function() {
                        return this.clusters_.length
                    }, e.prototype.addMarker = function(a, b) {
                        this.pushMarkerTo_(a), b || this.redraw_()
                    }, e.prototype.addMarkers = function(a, b) {
                        var c;
                        for (c in a) a.hasOwnProperty(c) && this.pushMarkerTo_(a[c]);
                        b || this.redraw_()
                    }, e.prototype.pushMarkerTo_ = function(a) {
                        if (a.getDraggable()) {
                            var b = this;
                            google.maps.event.addListener(a, "dragend", function() {
                                b.ready_ && (this.isAdded = !1, b.repaint())
                            })
                        }
                        a.isAdded = !1, this.markers_.push(a)
                    }, e.prototype.removeMarker = function(a, b, c) {
                        var d = !c,
                            e = this.removeMarker_(a, d);
                        return !b && e && this.repaint(), e
                    }, e.prototype.removeMarkers = function(a, b, c) {
                        var d, e, f = !1,
                            g = !c;
                        for (d = 0; d < a.length; d++) e = this.removeMarker_(a[d], g), f = f || e;
                        return !b && f && this.repaint(), f
                    }, e.prototype.removeMarker_ = function(a, b) {
                        var c, d = -1;
                        if (this.markers_.indexOf) d = this.markers_.indexOf(a);
                        else
                            for (c = 0; c < this.markers_.length; c++)
                                if (a === this.markers_[c]) {
                                    d = c;
                                    break
                                } return -1 !== d && (b && a.setMap(null), this.markers_.splice(d, 1), !0)
                    }, e.prototype.clearMarkers = function() {
                        this.resetViewport_(!0), this.markers_ = []
                    }, e.prototype.repaint = function() {
                        var a = this.clusters_.slice();
                        this.clusters_ = [], this.resetViewport_(!1), this.redraw_(), setTimeout(function() {
                            var b;
                            for (b = 0; b < a.length; b++) a[b].remove()
                        }, 0)
                    }, e.prototype.getExtendedBounds = function(a) {
                        var b = this.getProjection(),
                            c = new google.maps.LatLng(a.getNorthEast().lat(), a.getNorthEast().lng()),
                            d = new google.maps.LatLng(a.getSouthWest().lat(), a.getSouthWest().lng()),
                            e = b.fromLatLngToDivPixel(c);
                        e.x += this.gridSize_, e.y -= this.gridSize_;
                        var f = b.fromLatLngToDivPixel(d);
                        f.x -= this.gridSize_, f.y += this.gridSize_;
                        var g = b.fromDivPixelToLatLng(e),
                            h = b.fromDivPixelToLatLng(f);
                        return a.extend(g), a.extend(h), a
                    }, e.prototype.redraw_ = function() {
                        this.createClusters_(0)
                    }, e.prototype.resetViewport_ = function(a) {
                        var b, c;
                        for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].remove();
                        for (this.clusters_ = [], b = 0; b < this.markers_.length; b++) c = this.markers_[b], c.isAdded = !1, a && c.setMap(null)
                    }, e.prototype.distanceBetweenPoints_ = function(a, b) {
                        var c = 6371,
                            d = (b.lat() - a.lat()) * Math.PI / 180,
                            e = (b.lng() - a.lng()) * Math.PI / 180,
                            f = Math.sin(d / 2) * Math.sin(d / 2) + Math.cos(a.lat() * Math.PI / 180) * Math.cos(b.lat() * Math.PI / 180) * Math.sin(e / 2) * Math.sin(e / 2),
                            g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)),
                            h = c * g;
                        return h
                    }, e.prototype.isMarkerInBounds_ = function(a, b) {
                        return b.contains(a.getPosition())
                    }, e.prototype.addToClosestCluster_ = function(a) {
                        var b, d, e, f, g = 4e4,
                            h = null;
                        for (b = 0; b < this.clusters_.length; b++) e = this.clusters_[b], f = e.getCenter(), f && (d = this.distanceBetweenPoints_(f, a.getPosition()), g > d && (g = d, h = e));
                        h && h.isMarkerInClusterBounds(a) ? h.addMarker(a) : (e = new c(this), e.addMarker(a), this.clusters_.push(e))
                    }, e.prototype.createClusters_ = function(a) {
                        var b, c, d, e = this;
                        if (this.ready_) {
                            0 === a && (google.maps.event.trigger(this, "clusteringbegin", this), "undefined" != typeof this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), d = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
                            var f = this.getExtendedBounds(d),
                                g = Math.min(a + this.batchSize_, this.markers_.length);
                            for (b = a; g > b; b++) c = this.markers_[b], !c.isAdded && this.isMarkerInBounds_(c, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && c.getVisible()) && this.addToClosestCluster_(c);
                            if (g < this.markers_.length) this.timerRefStatic = setTimeout(function() {
                                e.createClusters_(g)
                            }, 0);
                            else
                                for (delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this), b = 0; b < this.clusters_.length; b++) this.clusters_[b].updateIcon_()
                        }
                    }, e.prototype.extend = function(a, b) {
                        return function(a) {
                            var b;
                            for (b in a.prototype) this.prototype[b] = a.prototype[b];
                            return this
                        }.apply(a, [b])
                    }, e.CALCULATOR = function(a, b) {
                        for (var c = 0, d = "", e = a.length.toString(), f = e; 0 !== f;) f = parseInt(f / 10, 10), c++;
                        return c = Math.min(c, b), {
                            text: e,
                            index: c,
                            title: d
                        }
                    }, e.BATCH_SIZE = 2e3, e.BATCH_SIZE_IE = 500, e.IMAGE_PATH = "//cdn.rawgit.com/mahnunchik/markerclustererplus/master/images/m", e.IMAGE_EXTENSION = "png", e.IMAGE_SIZES = [53, 56, 66, 78, 90], "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                        return this.replace(/^\s+|\s+$/g, "")
                    }), f.prototype = new google.maps.OverlayView, f.prototype.createInfoBoxDiv_ = function() {
                        var a, b, c, d = this,
                            e = function(a) {
                                a.cancelBubble = !0, a.stopPropagation && a.stopPropagation()
                            },
                            f = function(a) {
                                a.returnValue = !1, a.preventDefault && a.preventDefault(), d.enableEventPropagation_ || e(a)
                            };
                        if (!this.div_) {
                            if (this.div_ = document.createElement("div"), this.setBoxStyle_(), "undefined" == typeof this.content_.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + this.content_ : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(this.content_)), this.getPanes()[this.pane_].appendChild(this.div_), this.addClickHandler_(), this.div_.style.width ? this.fixedWidthSet_ = !0 : 0 !== this.maxWidth_ && this.div_.offsetWidth > this.maxWidth_ ? (this.div_.style.width = this.maxWidth_, this.div_.style.overflow = "auto", this.fixedWidthSet_ = !0) : (c = this.getBoxWidths_(), this.div_.style.width = this.div_.offsetWidth - c.left - c.right + "px", this.fixedWidthSet_ = !1), this.panBox_(this.disableAutoPan_), !this.enableEventPropagation_) {
                                for (this.eventListeners_ = [], b = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"], a = 0; a < b.length; a++) this.eventListeners_.push(google.maps.event.addDomListener(this.div_, b[a], e));
                                this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function(a) {
                                    this.style.cursor = "default"
                                }))
                            }
                            this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", f), google.maps.event.trigger(this, "domready")
                        }
                    }, f.prototype.getCloseBoxImg_ = function() {
                        var a = "";
                        return "" !== this.closeBoxURL_ && (a = "<img", a += " src='" + this.closeBoxURL_ + "'", a += " align=right", a += " style='", a += " position: relative;", a += " cursor: pointer;", a += " margin: " + this.closeBoxMargin_ + ";", a += "'>"), a
                    }, f.prototype.addClickHandler_ = function() {
                        var a;
                        "" !== this.closeBoxURL_ ? (a = this.div_.firstChild, this.closeListener_ = google.maps.event.addDomListener(a, "click", this.getCloseClickHandler_())) : this.closeListener_ = null
                    }, f.prototype.getCloseClickHandler_ = function() {
                        var a = this;
                        return function(b) {
                            b.cancelBubble = !0, b.stopPropagation && b.stopPropagation(), google.maps.event.trigger(a, "closeclick"), a.close()
                        }
                    }, f.prototype.panBox_ = function(a) {
                        var b, c, d = 0,
                            e = 0;
                        if (!a && (b = this.getMap(), b instanceof google.maps.Map)) {
                            b.getBounds().contains(this.position_) || b.setCenter(this.position_), c = b.getBounds();
                            var f = b.getDiv(),
                                g = f.offsetWidth,
                                h = f.offsetHeight,
                                i = this.pixelOffset_.width,
                                j = this.pixelOffset_.height,
                                k = this.div_.offsetWidth,
                                l = this.div_.offsetHeight,
                                m = this.infoBoxClearance_.width,
                                n = this.infoBoxClearance_.height,
                                o = this.getProjection().fromLatLngToContainerPixel(this.position_);
                            if (o.x < -i + m ? d = o.x + i - m : o.x + k + i + m > g && (d = o.x + k + i + m - g), this.alignBottom_ ? o.y < -j + n + l ? e = o.y + j - n - l : o.y + j + n > h && (e = o.y + j + n - h) : o.y < -j + n ? e = o.y + j - n : o.y + l + j + n > h && (e = o.y + l + j + n - h), 0 !== d || 0 !== e) {
                                b.getCenter();
                                b.panBy(d, e)
                            }
                        }
                    }, f.prototype.setBoxStyle_ = function() {
                        var a, b;
                        if (this.div_) {
                            this.div_.className = this.boxClass_, this.div_.style.cssText = "", b = this.boxStyle_;
                            for (a in b) b.hasOwnProperty(a) && (this.div_.style[a] = b[a]);
                            this.div_.style.WebkitTransform = "translateZ(0)", "undefined" != typeof this.div_.style.opacity && "" !== this.div_.style.opacity && (this.div_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 100 * this.div_.style.opacity + ')"', this.div_.style.filter = "alpha(opacity=" + 100 * this.div_.style.opacity + ")"), this.div_.style.position = "absolute", this.div_.style.visibility = "hidden", null !== this.zIndex_ && (this.div_.style.zIndex = this.zIndex_)
                        }
                    }, f.prototype.getBoxWidths_ = function() {
                        var a, b = {
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0
                            },
                            c = this.div_;
                        return document.defaultView && document.defaultView.getComputedStyle ? (a = c.ownerDocument.defaultView.getComputedStyle(c, ""),
                        a && (b.top = parseInt(a.borderTopWidth, 10) || 0, b.bottom = parseInt(a.borderBottomWidth, 10) || 0, b.left = parseInt(a.borderLeftWidth, 10) || 0, b.right = parseInt(a.borderRightWidth, 10) || 0)) : document.documentElement.currentStyle && c.currentStyle && (b.top = parseInt(c.currentStyle.borderTopWidth, 10) || 0, b.bottom = parseInt(c.currentStyle.borderBottomWidth, 10) || 0, b.left = parseInt(c.currentStyle.borderLeftWidth, 10) || 0, b.right = parseInt(c.currentStyle.borderRightWidth, 10) || 0), b
                    }, f.prototype.onRemove = function() {
                        this.div_ && (this.div_.parentNode.removeChild(this.div_), this.div_ = null)
                    }, f.prototype.draw = function() {
                        this.createInfoBoxDiv_();
                        var a = this.getProjection().fromLatLngToDivPixel(this.position_);
                        this.div_.style.left = a.x + this.pixelOffset_.width + "px", this.alignBottom_ ? this.div_.style.bottom = -(a.y + this.pixelOffset_.height) + "px" : this.div_.style.top = a.y + this.pixelOffset_.height + "px", this.isHidden_ ? this.div_.style.visibility = "hidden" : this.div_.style.visibility = "visible"
                    }, f.prototype.setOptions = function(a) {
                        "undefined" != typeof a.boxClass && (this.boxClass_ = a.boxClass, this.setBoxStyle_()), "undefined" != typeof a.boxStyle && (this.boxStyle_ = a.boxStyle, this.setBoxStyle_()), "undefined" != typeof a.content && this.setContent(a.content), "undefined" != typeof a.disableAutoPan && (this.disableAutoPan_ = a.disableAutoPan), "undefined" != typeof a.maxWidth && (this.maxWidth_ = a.maxWidth), "undefined" != typeof a.pixelOffset && (this.pixelOffset_ = a.pixelOffset), "undefined" != typeof a.alignBottom && (this.alignBottom_ = a.alignBottom), "undefined" != typeof a.position && this.setPosition(a.position), "undefined" != typeof a.zIndex && this.setZIndex(a.zIndex), "undefined" != typeof a.closeBoxMargin && (this.closeBoxMargin_ = a.closeBoxMargin), "undefined" != typeof a.closeBoxURL && (this.closeBoxURL_ = a.closeBoxURL), "undefined" != typeof a.infoBoxClearance && (this.infoBoxClearance_ = a.infoBoxClearance), "undefined" != typeof a.isHidden && (this.isHidden_ = a.isHidden), "undefined" != typeof a.visible && (this.isHidden_ = !a.visible), "undefined" != typeof a.enableEventPropagation && (this.enableEventPropagation_ = a.enableEventPropagation), this.div_ && this.draw()
                    }, f.prototype.setContent = function(a) {
                        this.content_ = a, this.div_ && (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.fixedWidthSet_ || (this.div_.style.width = ""), "undefined" == typeof a.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + a : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(a)), this.fixedWidthSet_ || (this.div_.style.width = this.div_.offsetWidth + "px", "undefined" == typeof a.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + a : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(a))), this.addClickHandler_()), google.maps.event.trigger(this, "content_changed")
                    }, f.prototype.setPosition = function(a) {
                        this.position_ = a, this.div_ && this.draw(), google.maps.event.trigger(this, "position_changed")
                    }, f.prototype.setZIndex = function(a) {
                        this.zIndex_ = a, this.div_ && (this.div_.style.zIndex = a), google.maps.event.trigger(this, "zindex_changed")
                    }, f.prototype.setVisible = function(a) {
                        this.isHidden_ = !a, this.div_ && (this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible")
                    }, f.prototype.getContent = function() {
                        return this.content_
                    }, f.prototype.getPosition = function() {
                        return this.position_
                    }, f.prototype.getZIndex = function() {
                        return this.zIndex_
                    }, f.prototype.getVisible = function() {
                        var a;
                        return a = "undefined" != typeof this.getMap() && null !== this.getMap() && !this.isHidden_
                    }, f.prototype.show = function() {
                        this.isHidden_ = !1, this.div_ && (this.div_.style.visibility = "visible")
                    }, f.prototype.hide = function() {
                        this.isHidden_ = !0, this.div_ && (this.div_.style.visibility = "hidden")
                    }, f.prototype.open = function(a, b) {
                        var c = this;
                        b && (this.position_ = b.getPosition(), this.moveListener_ = google.maps.event.addListener(b, "position_changed", function() {
                            c.setPosition(this.getPosition())
                        })), this.setMap(a), this.div_ && this.panBox_()
                    }, f.prototype.close = function() {
                        var a;
                        if (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.eventListeners_) {
                            for (a = 0; a < this.eventListeners_.length; a++) google.maps.event.removeListener(this.eventListeners_[a]);
                            this.eventListeners_ = null
                        }
                        this.moveListener_ && (google.maps.event.removeListener(this.moveListener_), this.moveListener_ = null), this.contextListener_ && (google.maps.event.removeListener(this.contextListener_), this.contextListener_ = null), this.setMap(null)
                    },
                    function() {
                        function b(a, b) {
                            var c = this,
                                d = new google.maps.OverlayView;
                            d.onAdd = function() {
                                c.init_(a, b)
                            }, d.draw = function() {}, d.onRemove = function() {}, d.setMap(a), this.prjov_ = d
                        }
                        var c = function(a) {
                                var b;
                                switch (a) {
                                    case "thin":
                                        b = "2px";
                                        break;
                                    case "medium":
                                        b = "4px";
                                        break;
                                    case "thick":
                                        b = "6px";
                                        break;
                                    default:
                                        b = a
                                }
                                return b
                            },
                            d = function(a) {
                                var b, d = {};
                                if (document.defaultView && document.defaultView.getComputedStyle) {
                                    if (b = a.ownerDocument.defaultView.getComputedStyle(a, "")) return d.top = parseInt(b.borderTopWidth, 10) || 0, d.bottom = parseInt(b.borderBottomWidth, 10) || 0, d.left = parseInt(b.borderLeftWidth, 10) || 0, d.right = parseInt(b.borderRightWidth, 10) || 0, d
                                } else if (document.documentElement.currentStyle && a.currentStyle) return d.top = parseInt(c(a.currentStyle.borderTopWidth), 10) || 0, d.bottom = parseInt(c(a.currentStyle.borderBottomWidth), 10) || 0, d.left = parseInt(c(a.currentStyle.borderLeftWidth), 10) || 0, d.right = parseInt(c(a.currentStyle.borderRightWidth), 10) || 0, d;
                                return d.top = parseInt(a.style["border-top-width"], 10) || 0, d.bottom = parseInt(a.style["border-bottom-width"], 10) || 0, d.left = parseInt(a.style["border-left-width"], 10) || 0, d.right = parseInt(a.style["border-right-width"], 10) || 0, d
                            },
                            e = {
                                x: 0,
                                y: 0
                            },
                            f = function(a) {
                                e.x = "undefined" != typeof document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft, e.y = "undefined" != typeof document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
                            };
                        f();
                        var g = function(b) {
                                var c = 0,
                                    d = 0;
                                return b = b || a.event, "undefined" != typeof b.pageX ? (c = b.pageX, d = b.pageY) : "undefined" != typeof b.clientX && (c = b.clientX + e.x, d = b.clientY + e.y), {
                                    left: c,
                                    top: d
                                }
                            },
                            h = function(b) {
                                for (var c = b.offsetLeft, d = b.offsetTop, e = b.offsetParent; null !== e;) {
                                    e !== document.body && e !== document.documentElement && (c -= e.scrollLeft, d -= e.scrollTop);
                                    var f = e,
                                        g = f.offsetLeft,
                                        h = f.offsetTop;
                                    if (!g && !h && a.getComputedStyle) {
                                        var i = document.defaultView.getComputedStyle(f, null).MozTransform || document.defaultView.getComputedStyle(f, null).WebkitTransform;
                                        if (i && "string" == typeof i) {
                                            var j = i.split(",");
                                            g += parseInt(j[4], 10) || 0, h += parseInt(j[5], 10) || 0
                                        }
                                    }
                                    c += g, d += h, e = e.offsetParent
                                }
                                return {
                                    left: c,
                                    top: d
                                }
                            },
                            i = function(a, b) {
                                if (a && b)
                                    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                                return a
                            },
                            j = function(a, b) {
                                "undefined" != typeof b && (a.style.opacity = b), "undefined" != typeof a.style.opacity && "" !== a.style.opacity && (a.style.filter = "alpha(opacity=" + 100 * a.style.opacity + ")")
                            };
                        b.prototype.init_ = function(b, c) {
                            var e, g = this;
                            for (this.map_ = b, c = c || {}, this.key_ = c.key || "shift", this.key_ = this.key_.toLowerCase(), this.borderWidths_ = d(this.map_.getDiv()), this.veilDiv_ = [], e = 0; e < 4; e++) this.veilDiv_[e] = document.createElement("div"), this.veilDiv_[e].onselectstart = function() {
                                return !1
                            }, i(this.veilDiv_[e].style, {
                                backgroundColor: "gray",
                                opacity: .25,
                                cursor: "crosshair"
                            }), i(this.veilDiv_[e].style, c.paneStyle), i(this.veilDiv_[e].style, c.veilStyle), i(this.veilDiv_[e].style, {
                                position: "absolute",
                                overflow: "hidden",
                                display: "none"
                            }), "shift" === this.key_ && (this.veilDiv_[e].style.MozUserSelect = "none"), j(this.veilDiv_[e]), "transparent" === this.veilDiv_[e].style.backgroundColor && (this.veilDiv_[e].style.backgroundColor = "white", j(this.veilDiv_[e], 0)), this.map_.getDiv().appendChild(this.veilDiv_[e]);
                            this.noZoom_ = c.noZoom || !1, this.visualEnabled_ = c.visualEnabled || !1, this.visualClass_ = c.visualClass || "", this.visualPosition_ = c.visualPosition || google.maps.ControlPosition.LEFT_TOP, this.visualPositionOffset_ = c.visualPositionOffset || new google.maps.Size(35, 0), this.visualPositionIndex_ = c.visualPositionIndex || null, this.visualSprite_ = c.visualSprite || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png", this.visualSize_ = c.visualSize || new google.maps.Size(20, 20), this.visualTips_ = c.visualTips || {}, this.visualTips_.off = this.visualTips_.off || "Turn on drag zoom mode", this.visualTips_.on = this.visualTips_.on || "Turn off drag zoom mode", this.boxDiv_ = document.createElement("div"), i(this.boxDiv_.style, {
                                border: "4px solid #736AFF"
                            }), i(this.boxDiv_.style, c.boxStyle), i(this.boxDiv_.style, {
                                position: "absolute",
                                display: "none"
                            }), j(this.boxDiv_), this.map_.getDiv().appendChild(this.boxDiv_), this.boxBorderWidths_ = d(this.boxDiv_), this.listeners_ = [google.maps.event.addDomListener(document, "keydown", function(a) {
                                g.onKeyDown_(a)
                            }), google.maps.event.addDomListener(document, "keyup", function(a) {
                                g.onKeyUp_(a)
                            }), google.maps.event.addDomListener(this.veilDiv_[0], "mousedown", function(a) {
                                g.onMouseDown_(a)
                            }), google.maps.event.addDomListener(this.veilDiv_[1], "mousedown", function(a) {
                                g.onMouseDown_(a)
                            }), google.maps.event.addDomListener(this.veilDiv_[2], "mousedown", function(a) {
                                g.onMouseDown_(a)
                            }), google.maps.event.addDomListener(this.veilDiv_[3], "mousedown", function(a) {
                                g.onMouseDown_(a)
                            }), google.maps.event.addDomListener(document, "mousedown", function(a) {
                                g.onMouseDownDocument_(a)
                            }), google.maps.event.addDomListener(document, "mousemove", function(a) {
                                g.onMouseMove_(a)
                            }), google.maps.event.addDomListener(document, "mouseup", function(a) {
                                g.onMouseUp_(a)
                            }), google.maps.event.addDomListener(a, "scroll", f)], this.hotKeyDown_ = !1, this.mouseDown_ = !1, this.dragging_ = !1, this.startPt_ = null, this.endPt_ = null, this.mapWidth_ = null, this.mapHeight_ = null, this.mousePosn_ = null, this.mapPosn_ = null, this.visualEnabled_ && (this.buttonDiv_ = this.initControl_(this.visualPositionOffset_), null !== this.visualPositionIndex_ && (this.buttonDiv_.index = this.visualPositionIndex_), this.map_.controls[this.visualPosition_].push(this.buttonDiv_), this.controlIndex_ = this.map_.controls[this.visualPosition_].length - 1)
                        }, b.prototype.initControl_ = function(a) {
                            var b, c, d = this;
                            return b = document.createElement("div"), b.className = this.visualClass_, b.style.position = "relative", b.style.overflow = "hidden", b.style.height = this.visualSize_.height + "px", b.style.width = this.visualSize_.width + "px", b.title = this.visualTips_.off, c = document.createElement("img"), c.src = this.visualSprite_, c.style.position = "absolute", c.style.left = -(2 * this.visualSize_.width) + "px", c.style.top = "0px", b.appendChild(c), b.onclick = function(a) {
                                d.hotKeyDown_ = !d.hotKeyDown_, d.hotKeyDown_ ? (d.buttonDiv_.firstChild.style.left = -(0 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.on, d.activatedByControl_ = !0, google.maps.event.trigger(d, "activate")) : (d.buttonDiv_.firstChild.style.left = -(2 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.off, google.maps.event.trigger(d, "deactivate")), d.onMouseMove_(a)
                            }, b.onmouseover = function() {
                                d.buttonDiv_.firstChild.style.left = -(1 * d.visualSize_.width) + "px"
                            }, b.onmouseout = function() {
                                d.hotKeyDown_ ? (d.buttonDiv_.firstChild.style.left = -(0 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.on) : (d.buttonDiv_.firstChild.style.left = -(2 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.off)
                            }, b.ondragstart = function() {
                                return !1
                            }, i(b.style, {
                                cursor: "pointer",
                                marginTop: a.height + "px",
                                marginLeft: a.width + "px"
                            }), b
                        }, b.prototype.isHotKeyDown_ = function(b) {
                            var c;
                            if (b = b || a.event, c = b.shiftKey && "shift" === this.key_ || b.altKey && "alt" === this.key_ || b.ctrlKey && "ctrl" === this.key_, !c) switch (b.keyCode) {
                                case 16:
                                    "shift" === this.key_ && (c = !0);
                                    break;
                                case 17:
                                    "ctrl" === this.key_ && (c = !0);
                                    break;
                                case 18:
                                    "alt" === this.key_ && (c = !0)
                            }
                            return c
                        }, b.prototype.isMouseOnMap_ = function() {
                            var a = this.mousePosn_;
                            if (a) {
                                var b = this.mapPosn_,
                                    c = this.map_.getDiv();
                                return a.left > b.left && a.left < b.left + c.offsetWidth && a.top > b.top && a.top < b.top + c.offsetHeight
                            }
                            return !1
                        }, b.prototype.setVeilVisibility_ = function() {
                            var a;
                            if (this.map_ && this.hotKeyDown_ && this.isMouseOnMap_()) {
                                var b = this.map_.getDiv();
                                if (this.mapWidth_ = b.offsetWidth - (this.borderWidths_.left + this.borderWidths_.right), this.mapHeight_ = b.offsetHeight - (this.borderWidths_.top + this.borderWidths_.bottom), this.activatedByControl_) {
                                    var c = parseInt(this.buttonDiv_.style.left, 10) + this.visualPositionOffset_.width,
                                        d = parseInt(this.buttonDiv_.style.top, 10) + this.visualPositionOffset_.height,
                                        e = this.visualSize_.width,
                                        f = this.visualSize_.height;
                                    for (this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.width = c + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", this.veilDiv_[1].style.top = "0px", this.veilDiv_[1].style.left = c + e + "px", this.veilDiv_[1].style.width = this.mapWidth_ - (c + e) + "px", this.veilDiv_[1].style.height = this.mapHeight_ + "px", this.veilDiv_[2].style.top = "0px", this.veilDiv_[2].style.left = c + "px", this.veilDiv_[2].style.width = e + "px", this.veilDiv_[2].style.height = d + "px", this.veilDiv_[3].style.top = d + f + "px", this.veilDiv_[3].style.left = c + "px", this.veilDiv_[3].style.width = e + "px", this.veilDiv_[3].style.height = this.mapHeight_ - (d + f) + "px", a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "block"
                                } else {
                                    for (this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.width = this.mapWidth_ + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", a = 1; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.width = "0px", this.veilDiv_[a].style.height = "0px";
                                    for (a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "block"
                                }
                            } else
                                for (a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "none"
                        }, b.prototype.onKeyDown_ = function(a) {
                            this.map_ && !this.hotKeyDown_ && this.isHotKeyDown_(a) && (this.mapPosn_ = h(this.map_.getDiv()), this.hotKeyDown_ = !0, this.activatedByControl_ = !1, this.setVeilVisibility_(), google.maps.event.trigger(this, "activate"))
                        }, b.prototype.getMousePoint_ = function(a) {
                            var b = g(a),
                                c = new google.maps.Point;
                            return c.x = b.left - this.mapPosn_.left - this.borderWidths_.left, c.y = b.top - this.mapPosn_.top - this.borderWidths_.top, c.x = Math.min(c.x, this.mapWidth_), c.y = Math.min(c.y, this.mapHeight_), c.x = Math.max(c.x, 0), c.y = Math.max(c.y, 0), c
                        }, b.prototype.onMouseDown_ = function(a) {
                            if (this.map_ && this.hotKeyDown_) {
                                this.mapPosn_ = h(this.map_.getDiv()), this.dragging_ = !0, this.startPt_ = this.endPt_ = this.getMousePoint_(a), this.boxDiv_.style.width = this.boxDiv_.style.height = "0px";
                                var b = this.prjov_.getProjection(),
                                    c = b.fromContainerPixelToLatLng(this.startPt_);
                                google.maps.event.trigger(this, "dragstart", c)
                            }
                        }, b.prototype.onMouseDownDocument_ = function(a) {
                            this.mouseDown_ = !0
                        }, b.prototype.onMouseMove_ = function(a) {
                            if (this.mousePosn_ = g(a), this.dragging_) {
                                this.endPt_ = this.getMousePoint_(a);
                                var b = Math.min(this.startPt_.x, this.endPt_.x),
                                    c = Math.min(this.startPt_.y, this.endPt_.y),
                                    d = Math.abs(this.startPt_.x - this.endPt_.x),
                                    e = Math.abs(this.startPt_.y - this.endPt_.y),
                                    f = Math.max(0, d - (this.boxBorderWidths_.left + this.boxBorderWidths_.right)),
                                    i = Math.max(0, e - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom));
                                this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.width = b + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", this.veilDiv_[1].style.top = "0px", this.veilDiv_[1].style.left = b + d + "px", this.veilDiv_[1].style.width = this.mapWidth_ - (b + d) + "px", this.veilDiv_[1].style.height = this.mapHeight_ + "px", this.veilDiv_[2].style.top = "0px", this.veilDiv_[2].style.left = b + "px", this.veilDiv_[2].style.width = d + "px", this.veilDiv_[2].style.height = c + "px", this.veilDiv_[3].style.top = c + e + "px", this.veilDiv_[3].style.left = b + "px", this.veilDiv_[3].style.width = d + "px", this.veilDiv_[3].style.height = this.mapHeight_ - (c + e) + "px", this.boxDiv_.style.top = c + "px", this.boxDiv_.style.left = b + "px", this.boxDiv_.style.width = f + "px", this.boxDiv_.style.height = i + "px", this.boxDiv_.style.display = "block", google.maps.event.trigger(this, "drag", new google.maps.Point(b, c + e), new google.maps.Point(b + d, c), this.prjov_.getProjection())
                            } else this.mouseDown_ || (this.mapPosn_ = h(this.map_.getDiv()), this.setVeilVisibility_())
                        }, b.prototype.onMouseUp_ = function(a) {
                            var b, c = this;
                            if (this.mouseDown_ = !1, this.dragging_) {
                                if (this.getMousePoint_(a).x === this.startPt_.x && this.getMousePoint_(a).y === this.startPt_.y) return void this.onKeyUp_(a);
                                var d = Math.min(this.startPt_.x, this.endPt_.x),
                                    e = Math.min(this.startPt_.y, this.endPt_.y),
                                    f = Math.abs(this.startPt_.x - this.endPt_.x),
                                    g = Math.abs(this.startPt_.y - this.endPt_.y),
                                    h = !0;
                                h && (d += this.borderWidths_.left, e += this.borderWidths_.top);
                                var i = this.prjov_.getProjection(),
                                    j = i.fromContainerPixelToLatLng(new google.maps.Point(d, e + g)),
                                    k = i.fromContainerPixelToLatLng(new google.maps.Point(d + f, e)),
                                    l = new google.maps.LatLngBounds(j, k);
                                if (this.noZoom_) this.boxDiv_.style.display = "none";
                                else {
                                    b = this.map_.getZoom(), this.map_.fitBounds(l), this.map_.getZoom() < b && this.map_.setZoom(b);
                                    var m = i.fromLatLngToContainerPixel(j),
                                        n = i.fromLatLngToContainerPixel(k);
                                    h && (m.x -= this.borderWidths_.left, m.y -= this.borderWidths_.top, n.x -= this.borderWidths_.left, n.y -= this.borderWidths_.top), this.boxDiv_.style.left = m.x + "px", this.boxDiv_.style.top = n.y + "px", this.boxDiv_.style.width = Math.abs(n.x - m.x) - (this.boxBorderWidths_.left + this.boxBorderWidths_.right) + "px", this.boxDiv_.style.height = Math.abs(n.y - m.y) - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom) + "px", setTimeout(function() {
                                        c.boxDiv_.style.display = "none"
                                    }, 1e3)
                                }
                                this.dragging_ = !1, this.onMouseMove_(a), google.maps.event.trigger(this, "dragend", l), this.isHotKeyDown_(a) || this.onKeyUp_(a)
                            }
                        }, b.prototype.onKeyUp_ = function(a) {
                            var b, c, d, e, f, g, h, i, j = null;
                            if (this.map_ && this.hotKeyDown_) {
                                for (this.hotKeyDown_ = !1, this.dragging_ && (this.boxDiv_.style.display = "none", this.dragging_ = !1, c = Math.min(this.startPt_.x, this.endPt_.x), d = Math.min(this.startPt_.y, this.endPt_.y), e = Math.abs(this.startPt_.x - this.endPt_.x), f = Math.abs(this.startPt_.y - this.endPt_.y), g = this.prjov_.getProjection(), h = g.fromContainerPixelToLatLng(new google.maps.Point(c, d + f)), i = g.fromContainerPixelToLatLng(new google.maps.Point(c + e, d)), j = new google.maps.LatLngBounds(h, i)), b = 0; b < this.veilDiv_.length; b++) this.veilDiv_[b].style.display = "none";
                                this.visualEnabled_ && (this.buttonDiv_.firstChild.style.left = -(2 * this.visualSize_.width) + "px", this.buttonDiv_.title = this.visualTips_.off, this.buttonDiv_.style.display = ""), google.maps.event.trigger(this, "deactivate", j)
                            }
                        }, google.maps.Map.prototype.enableKeyDragZoom = function(a) {
                            this.dragZoom_ = new b(this, a)
                        }, google.maps.Map.prototype.disableKeyDragZoom = function() {
                            var a, b = this.dragZoom_;
                            if (b) {
                                for (a = 0; a < b.listeners_.length; ++a) google.maps.event.removeListener(b.listeners_[a]);
                                for (this.getDiv().removeChild(b.boxDiv_), a = 0; a < b.veilDiv_.length; a++) this.getDiv().removeChild(b.veilDiv_[a]);
                                b.visualEnabled_ && this.controls[b.visualPosition_].removeAt(b.controlIndex_), b.prjov_.setMap(null), this.dragZoom_ = null
                            }
                        }, google.maps.Map.prototype.keyDragZoomEnabled = function() {
                            return null !== this.dragZoom_
                        }, google.maps.Map.prototype.getDragZoomObject = function() {
                            return this.dragZoom_
                        }
                    }(), g(h, google.maps.OverlayView), h.getSharedCross = function(a) {
                        var b;
                        return "undefined" == typeof h.getSharedCross.crossDiv && (b = document.createElement("img"), b.style.cssText = "position: absolute; z-index: 1000002; display: none;", b.style.marginLeft = "-8px", b.style.marginTop = "-9px", b.src = a, h.getSharedCross.crossDiv = b), h.getSharedCross.crossDiv
                    }, h.prototype.onAdd = function() {
                        var a, b, c, d, e, f, g, i = this,
                            j = !1,
                            k = !1,
                            l = 20,
                            m = "url(" + this.handCursorURL_ + ")",
                            n = function(a) {
                                a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.stopPropagation && a.stopPropagation()
                            },
                            o = function() {
                                i.marker_.setAnimation(null)
                            };
                        this.getPanes().overlayImage.appendChild(this.labelDiv_), this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_), "undefined" == typeof h.getSharedCross.processed && (this.getPanes().overlayImage.appendChild(this.crossDiv_), h.getSharedCross.processed = !0), this.listeners_ = [google.maps.event.addDomListener(this.eventDiv_, "mouseover", function(a) {
                            (i.marker_.getDraggable() || i.marker_.getClickable()) && (this.style.cursor = "pointer", google.maps.event.trigger(i.marker_, "mouseover", a))
                        }), google.maps.event.addDomListener(this.eventDiv_, "mouseout", function(a) {
                            !i.marker_.getDraggable() && !i.marker_.getClickable() || k || (this.style.cursor = i.marker_.getCursor(), google.maps.event.trigger(i.marker_, "mouseout", a))
                        }), google.maps.event.addDomListener(this.eventDiv_, "mousedown", function(a) {
                            k = !1, i.marker_.getDraggable() && (j = !0, this.style.cursor = m), (i.marker_.getDraggable() || i.marker_.getClickable()) && (google.maps.event.trigger(i.marker_, "mousedown", a), n(a))
                        }), google.maps.event.addDomListener(document, "mouseup", function(b) {
                            var c;
                            if (j && (j = !1, i.eventDiv_.style.cursor = "pointer", google.maps.event.trigger(i.marker_, "mouseup", b)), k) {
                                if (e) {
                                    c = i.getProjection().fromLatLngToDivPixel(i.marker_.getPosition()), c.y += l, i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(c));
                                    try {
                                        i.marker_.setAnimation(google.maps.Animation.BOUNCE), setTimeout(o, 1406)
                                    } catch (f) {}
                                }
                                i.crossDiv_.style.display = "none", i.marker_.setZIndex(a), d = !0, k = !1, b.latLng = i.marker_.getPosition(), google.maps.event.trigger(i.marker_, "dragend", b)
                            }
                        }), google.maps.event.addListener(i.marker_.getMap(), "mousemove", function(d) {
                            var h;
                            j && (k ? (d.latLng = new google.maps.LatLng(d.latLng.lat() - b, d.latLng.lng() - c), h = i.getProjection().fromLatLngToDivPixel(d.latLng), e && (i.crossDiv_.style.left = h.x + "px", i.crossDiv_.style.top = h.y + "px", i.crossDiv_.style.display = "", h.y -= l), i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(h)), e && (i.eventDiv_.style.top = h.y + l + "px"), google.maps.event.trigger(i.marker_, "drag", d)) : (b = d.latLng.lat() - i.marker_.getPosition().lat(), c = d.latLng.lng() - i.marker_.getPosition().lng(), a = i.marker_.getZIndex(), f = i.marker_.getPosition(), g = i.marker_.getMap().getCenter(), e = i.marker_.get("raiseOnDrag"), k = !0, i.marker_.setZIndex(1e6), d.latLng = i.marker_.getPosition(), google.maps.event.trigger(i.marker_, "dragstart", d)))
                        }), google.maps.event.addDomListener(document, "keydown", function(a) {
                            k && 27 === a.keyCode && (e = !1, i.marker_.setPosition(f), i.marker_.getMap().setCenter(g), google.maps.event.trigger(document, "mouseup", a))
                        }), google.maps.event.addDomListener(this.eventDiv_, "click", function(a) {
                            (i.marker_.getDraggable() || i.marker_.getClickable()) && (d ? d = !1 : (google.maps.event.trigger(i.marker_, "click", a), n(a)))
                        }), google.maps.event.addDomListener(this.eventDiv_, "dblclick", function(a) {
                            (i.marker_.getDraggable() || i.marker_.getClickable()) && (google.maps.event.trigger(i.marker_, "dblclick", a), n(a))
                        }), google.maps.event.addListener(this.marker_, "dragstart", function(a) {
                            k || (e = this.get("raiseOnDrag"))
                        }), google.maps.event.addListener(this.marker_, "drag", function(a) {
                            k || e && (i.setPosition(l), i.labelDiv_.style.zIndex = 1e6 + (this.get("labelInBackground") ? -1 : 1))
                        }), google.maps.event.addListener(this.marker_, "dragend", function(a) {
                            k || e && i.setPosition(0)
                        }), google.maps.event.addListener(this.marker_, "position_changed", function() {
                            i.setPosition()
                        }), google.maps.event.addListener(this.marker_, "zindex_changed", function() {
                            i.setZIndex()
                        }), google.maps.event.addListener(this.marker_, "visible_changed", function() {
                            i.setVisible()
                        }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function() {
                            i.setVisible()
                        }), google.maps.event.addListener(this.marker_, "title_changed", function() {
                            i.setTitle()
                        }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function() {
                            i.setContent()
                        }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function() {
                            i.setAnchor()
                        }), google.maps.event.addListener(this.marker_, "labelclass_changed", function() {
                            i.setStyles()
                        }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function() {
                            i.setStyles()
                        })]
                    }, h.prototype.onRemove = function() {
                        var a;
                        for (this.labelDiv_.parentNode.removeChild(this.labelDiv_), this.eventDiv_.parentNode.removeChild(this.eventDiv_), a = 0; a < this.listeners_.length; a++) google.maps.event.removeListener(this.listeners_[a])
                    }, h.prototype.draw = function() {
                        this.setContent(), this.setTitle(), this.setStyles()
                    }, h.prototype.setContent = function() {
                        var a = this.marker_.get("labelContent");
                        "undefined" == typeof a.nodeType ? (this.labelDiv_.innerHTML = a, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(a), a = a.cloneNode(!0), this.eventDiv_.innerHTML = "", this.eventDiv_.appendChild(a))
                    }, h.prototype.setTitle = function() {
                        this.eventDiv_.title = this.marker_.getTitle() || ""
                    }, h.prototype.setStyles = function() {
                        var a, b;
                        this.labelDiv_.className = this.marker_.get("labelClass"), this.eventDiv_.className = this.labelDiv_.className, this.labelDiv_.style.cssText = "", this.eventDiv_.style.cssText = "", b = this.marker_.get("labelStyle");
                        for (a in b) b.hasOwnProperty(a) && (this.labelDiv_.style[a] = b[a], this.eventDiv_.style[a] = b[a]);
                        this.setMandatoryStyles()
                    }, h.prototype.setMandatoryStyles = function() {
                        this.labelDiv_.style.position = "absolute", this.labelDiv_.style.overflow = "hidden", "undefined" != typeof this.labelDiv_.style.opacity && "" !== this.labelDiv_.style.opacity && (this.labelDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=' + 100 * this.labelDiv_.style.opacity + ')"', this.labelDiv_.style.filter = "alpha(opacity=" + 100 * this.labelDiv_.style.opacity + ")"), this.eventDiv_.style.position = this.labelDiv_.style.position, this.eventDiv_.style.overflow = this.labelDiv_.style.overflow, this.eventDiv_.style.opacity = .01, this.eventDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"', this.eventDiv_.style.filter = "alpha(opacity=1)", this.setAnchor(), this.setPosition(), this.setVisible()
                    }, h.prototype.setAnchor = function() {
                        var a = this.marker_.get("labelAnchor");
                        this.labelDiv_.style.marginLeft = -a.x + "px", this.labelDiv_.style.marginTop = -a.y + "px", this.eventDiv_.style.marginLeft = -a.x + "px", this.eventDiv_.style.marginTop = -a.y + "px"
                    }, h.prototype.setPosition = function(a) {
                        var b = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
                        "undefined" == typeof a && (a = 0), this.labelDiv_.style.left = Math.round(b.x) + "px", this.labelDiv_.style.top = Math.round(b.y - a) + "px", this.eventDiv_.style.left = this.labelDiv_.style.left, this.eventDiv_.style.top = this.labelDiv_.style.top, this.setZIndex()
                    }, h.prototype.setZIndex = function() {
                        var a = this.marker_.get("labelInBackground") ? -1 : 1;
                        "undefined" == typeof this.marker_.getZIndex() ? (this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + a, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex) : (this.labelDiv_.style.zIndex = this.marker_.getZIndex() + a, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex)
                    }, h.prototype.setVisible = function() {
                        this.marker_.get("labelVisible") ? this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none" : this.labelDiv_.style.display = "none", this.eventDiv_.style.display = this.labelDiv_.style.display
                    }, g(i, google.maps.Marker), i.prototype.setMap = function(a) {
                        google.maps.Marker.prototype.setMap.apply(this, arguments), this.label.setMap(a)
                    }, j.prototype = new google.maps.OverlayView, a.RichMarker = j, j.prototype.getVisible = function() {
                        return this.get("visible")
                    }, j.prototype.getVisible = j.prototype.getVisible, j.prototype.setVisible = function(a) {
                        this.set("visible", a)
                    }, j.prototype.setVisible = j.prototype.setVisible, j.prototype.visible_changed = function() {
                        this.ready_ && (this.markerWrapper_.style.display = this.getVisible() ? "" : "none", this.draw())
                    }, j.prototype.visible_changed = j.prototype.visible_changed, j.prototype.setFlat = function(a) {
                        this.set("flat", !!a)
                    }, j.prototype.setFlat = j.prototype.setFlat, j.prototype.getFlat = function() {
                        return this.get("flat")
                    }, j.prototype.getFlat = j.prototype.getFlat, j.prototype.getWidth = function() {
                        return this.get("width")
                    }, j.prototype.getWidth = j.prototype.getWidth, j.prototype.getHeight = function() {
                        return this.get("height")
                    }, j.prototype.getHeight = j.prototype.getHeight, j.prototype.setShadow = function(a) {
                        this.set("shadow", a), this.flat_changed()
                    }, j.prototype.setShadow = j.prototype.setShadow, j.prototype.getShadow = function() {
                        return this.get("shadow")
                    }, j.prototype.getShadow = j.prototype.getShadow, j.prototype.flat_changed = function() {
                        this.ready_ && (this.markerWrapper_.style.boxShadow = this.markerWrapper_.style.webkitBoxShadow = this.markerWrapper_.style.MozBoxShadow = this.getFlat() ? "" : this.getShadow())
                    }, j.prototype.flat_changed = j.prototype.flat_changed, j.prototype.setZIndex = function(a) {
                        this.set("zIndex", a)
                    }, j.prototype.setZIndex = j.prototype.setZIndex, j.prototype.getZIndex = function() {
                        return this.get("zIndex")
                    }, j.prototype.getZIndex = j.prototype.getZIndex, j.prototype.zIndex_changed = function() {
                        this.getZIndex() && this.ready_ && (this.markerWrapper_.style.zIndex = this.getZIndex())
                    }, j.prototype.zIndex_changed = j.prototype.zIndex_changed, j.prototype.getDraggable = function() {
                        return this.get("draggable")
                    }, j.prototype.getDraggable = j.prototype.getDraggable, j.prototype.setDraggable = function(a) {
                        this.set("draggable", !!a)
                    }, j.prototype.setDraggable = j.prototype.setDraggable, j.prototype.draggable_changed = function() {
                        this.ready_ && (this.getDraggable() ? this.addDragging_(this.markerWrapper_) : this.removeDragListeners_())
                    }, j.prototype.draggable_changed = j.prototype.draggable_changed, j.prototype.getPosition = function() {
                        return this.get("position")
                    }, j.prototype.getPosition = j.prototype.getPosition, j.prototype.setPosition = function(a) {
                        this.set("position", a)
                    }, j.prototype.setPosition = j.prototype.setPosition, j.prototype.position_changed = function() {
                        this.draw()
                    }, j.prototype.position_changed = j.prototype.position_changed, j.prototype.getAnchor = function() {
                        return this.get("anchor")
                    }, j.prototype.getAnchor = j.prototype.getAnchor, j.prototype.setAnchor = function(a) {
                        this.set("anchor", a)
                    }, j.prototype.setAnchor = j.prototype.setAnchor, j.prototype.anchor_changed = function() {
                        this.draw()
                    }, j.prototype.anchor_changed = j.prototype.anchor_changed, j.prototype.htmlToDocumentFragment_ = function(a) {
                        var b = document.createElement("DIV");
                        if (b.innerHTML = a, 1 == b.childNodes.length) return b.removeChild(b.firstChild);
                        for (var c = document.createDocumentFragment(); b.firstChild;) c.appendChild(b.firstChild);
                        return c
                    }, j.prototype.removeChildren_ = function(a) {
                        if (a)
                            for (var b; b = a.firstChild;) a.removeChild(b)
                    }, j.prototype.setContent = function(a) {
                        this.set("content", a)
                    }, j.prototype.setContent = j.prototype.setContent, j.prototype.getContent = function() {
                        return this.get("content")
                    }, j.prototype.getContent = j.prototype.getContent, j.prototype.content_changed = function() {
                        if (this.markerContent_) {
                            this.removeChildren_(this.markerContent_);
                            var a = this.getContent();
                            if (a) {
                                "string" == typeof a && (a = a.replace(/^\s*([\S\s]*)\b\s*$/, "$1"), a = this.htmlToDocumentFragment_(a)), this.markerContent_.appendChild(a);
                                for (var b, c = this, d = this.markerContent_.getElementsByTagName("IMG"), e = 0; b = d[e]; e++) google.maps.event.addDomListener(b, "mousedown", function(a) {
                                    c.getDraggable() && (a.preventDefault && a.preventDefault(), a.returnValue = !1)
                                }), google.maps.event.addDomListener(b, "load", function() {
                                    c.draw()
                                });
                                google.maps.event.trigger(this, "domready")
                            }
                            this.ready_ && this.draw()
                        }
                    }, j.prototype.content_changed = j.prototype.content_changed, j.prototype.setCursor_ = function(a) {
                        if (this.ready_) {
                            var b = "";
                            navigator.userAgent.indexOf("Gecko/") !== -1 ? ("dragging" == a && (b = "-moz-grabbing"), "dragready" == a && (b = "-moz-grab"), "draggable" == a && (b = "pointer")) : ("dragging" != a && "dragready" != a || (b = "move"), "draggable" == a && (b = "pointer")), this.markerWrapper_.style.cursor != b && (this.markerWrapper_.style.cursor = b)
                        }
                    }, j.prototype.startDrag = function(a) {
                        if (this.getDraggable() && !this.dragging_) {
                            this.dragging_ = !0;
                            var b = this.getMap();
                            this.mapDraggable_ = b.get("draggable"), b.set("draggable", !1), this.mouseX_ = a.clientX, this.mouseY_ = a.clientY, this.setCursor_("dragready"), this.markerWrapper_.style.MozUserSelect = "none", this.markerWrapper_.style.KhtmlUserSelect = "none", this.markerWrapper_.style.WebkitUserSelect = "none", this.markerWrapper_.unselectable = "on", this.markerWrapper_.onselectstart = function() {
                                return !1
                            }, this.addDraggingListeners_(), google.maps.event.trigger(this, "dragstart")
                        }
                    }, j.prototype.stopDrag = function() {
                        this.getDraggable() && this.dragging_ && (this.dragging_ = !1, this.getMap().set("draggable", this.mapDraggable_), this.mouseX_ = this.mouseY_ = this.mapDraggable_ = null, this.markerWrapper_.style.MozUserSelect = "", this.markerWrapper_.style.KhtmlUserSelect = "", this.markerWrapper_.style.WebkitUserSelect = "", this.markerWrapper_.unselectable = "off", this.markerWrapper_.onselectstart = function() {}, this.removeDraggingListeners_(), this.setCursor_("draggable"), google.maps.event.trigger(this, "dragend"), this.draw())
                    }, j.prototype.drag = function(a) {
                        if (!this.getDraggable() || !this.dragging_) return void this.stopDrag();
                        var b = this.mouseX_ - a.clientX,
                            c = this.mouseY_ - a.clientY;
                        this.mouseX_ = a.clientX,
                            this.mouseY_ = a.clientY;
                        var d = parseInt(this.markerWrapper_.style.left, 10) - b,
                            e = parseInt(this.markerWrapper_.style.top, 10) - c;
                        this.markerWrapper_.style.left = d + "px", this.markerWrapper_.style.top = e + "px";
                        var f = this.getOffset_(),
                            g = new google.maps.Point(d - f.width, e - f.height),
                            h = this.getProjection();
                        this.setPosition(h.fromDivPixelToLatLng(g)), this.setCursor_("dragging"), google.maps.event.trigger(this, "drag")
                    }, j.prototype.removeDragListeners_ = function() {
                        this.draggableListener_ && (google.maps.event.removeListener(this.draggableListener_), delete this.draggableListener_), this.setCursor_("")
                    }, j.prototype.addDragging_ = function(a) {
                        if (a) {
                            var b = this;
                            this.draggableListener_ = google.maps.event.addDomListener(a, "mousedown", function(a) {
                                b.startDrag(a)
                            }), this.setCursor_("draggable")
                        }
                    }, j.prototype.addDraggingListeners_ = function() {
                        var b = this;
                        this.markerWrapper_.setCapture ? (this.markerWrapper_.setCapture(!0), this.draggingListeners_ = [google.maps.event.addDomListener(this.markerWrapper_, "mousemove", function(a) {
                            b.drag(a)
                        }, !0), google.maps.event.addDomListener(this.markerWrapper_, "mouseup", function() {
                            b.stopDrag(), b.markerWrapper_.releaseCapture()
                        }, !0)]) : this.draggingListeners_ = [google.maps.event.addDomListener(a, "mousemove", function(a) {
                            b.drag(a)
                        }, !0), google.maps.event.addDomListener(a, "mouseup", function() {
                            b.stopDrag()
                        }, !0)]
                    }, j.prototype.removeDraggingListeners_ = function() {
                        if (this.draggingListeners_) {
                            for (var a, b = 0; a = this.draggingListeners_[b]; b++) google.maps.event.removeListener(a);
                            this.draggingListeners_.length = 0
                        }
                    }, j.prototype.getOffset_ = function() {
                        var a = this.getAnchor();
                        if ("object" == typeof a) return a;
                        var b = new google.maps.Size(0, 0);
                        if (!this.markerContent_) return b;
                        var c = this.markerContent_.offsetWidth,
                            d = this.markerContent_.offsetHeight;
                        switch (a) {
                            case k.TOP_LEFT:
                                break;
                            case k.TOP:
                                b.width = -c / 2;
                                break;
                            case k.TOP_RIGHT:
                                b.width = -c;
                                break;
                            case k.LEFT:
                                b.height = -d / 2;
                                break;
                            case k.MIDDLE:
                                b.width = -c / 2, b.height = -d / 2;
                                break;
                            case k.RIGHT:
                                b.width = -c, b.height = -d / 2;
                                break;
                            case k.BOTTOM_LEFT:
                                b.height = -d;
                                break;
                            case k.BOTTOM:
                                b.width = -c / 2, b.height = -d;
                                break;
                            case k.BOTTOM_RIGHT:
                                b.width = -c, b.height = -d
                        }
                        return b
                    }, j.prototype.onAdd = function() {
                        if (this.markerWrapper_ || (this.markerWrapper_ = document.createElement("DIV"), this.markerWrapper_.style.position = "absolute"), this.getZIndex() && (this.markerWrapper_.style.zIndex = this.getZIndex()), this.markerWrapper_.style.display = this.getVisible() ? "" : "none", !this.markerContent_) {
                            this.markerContent_ = document.createElement("DIV"), this.markerWrapper_.appendChild(this.markerContent_);
                            var a = this;
                            google.maps.event.addDomListener(this.markerContent_, "click", function(b) {
                                google.maps.event.trigger(a, "click")
                            }), google.maps.event.addDomListener(this.markerContent_, "mouseover", function(b) {
                                google.maps.event.trigger(a, "mouseover")
                            }), google.maps.event.addDomListener(this.markerContent_, "mouseout", function(b) {
                                google.maps.event.trigger(a, "mouseout")
                            })
                        }
                        this.ready_ = !0, this.content_changed(), this.flat_changed(), this.draggable_changed();
                        var b = this.getPanes();
                        b && b.overlayMouseTarget.appendChild(this.markerWrapper_), google.maps.event.trigger(this, "ready")
                    }, j.prototype.onAdd = j.prototype.onAdd, j.prototype.draw = function() {
                        if (this.ready_ && !this.dragging_) {
                            var a = this.getProjection();
                            if (a) {
                                var b = this.get("position"),
                                    c = a.fromLatLngToDivPixel(b),
                                    d = this.getOffset_();
                                this.markerWrapper_.style.top = c.y + d.height + "px", this.markerWrapper_.style.left = c.x + d.width + "px";
                                var e = this.markerContent_.offsetHeight,
                                    f = this.markerContent_.offsetWidth;
                                f != this.get("width") && this.set("width", f), e != this.get("height") && this.set("height", e)
                            }
                        }
                    }, j.prototype.draw = j.prototype.draw, j.prototype.onRemove = function() {
                        this.markerWrapper_ && this.markerWrapper_.parentNode && this.markerWrapper_.parentNode.removeChild(this.markerWrapper_), this.removeDragListeners_()
                    }, j.prototype.onRemove = j.prototype.onRemove;
                    var k = {
                        TOP_LEFT: 1,
                        TOP: 2,
                        TOP_RIGHT: 3,
                        LEFT: 4,
                        MIDDLE: 5,
                        RIGHT: 6,
                        BOTTOM_LEFT: 7,
                        BOTTOM: 8,
                        BOTTOM_RIGHT: 9
                    };
                    a.RichMarkerPosition = k, a.InfoBox = f, a.Cluster = c, a.ClusterIcon = b, a.MarkerClusterer = e, a.MarkerLabel_ = h, a.MarkerWithLabel = i, a.RichMarker = j
                }()
            })
        }
    }),
        function(a) {
            function b(d) {
                if (c[d]) return c[d].exports;
                var e = c[d] = {
                    exports: {},
                    id: d,
                    loaded: !1
                };
                return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
            }
            var c = {};
            return b.m = a, b.c = c, b.p = "", b(0)
        }([function(a, c, d) {
            b.module("uiGmapgoogle-maps.wrapped").service("uiGmapDataStructures", function() {
                return {
                    Graph: d(1).Graph,
                    Queue: d(1).Queue
                }
            })
        }, function(a, b, c) {
            (function() {
                a.exports = {
                    Graph: c(2),
                    Heap: c(3),
                    LinkedList: c(4),
                    Map: c(5),
                    Queue: c(6),
                    RedBlackTree: c(7),
                    Trie: c(8)
                }
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c = {}.hasOwnProperty;
                b = function() {
                    function a() {
                        this._nodes = {}, this.nodeSize = 0, this.edgeSize = 0
                    }
                    return a.prototype.addNode = function(a) {
                        if (!this._nodes[a]) return this.nodeSize++, this._nodes[a] = {
                            _outEdges: {},
                            _inEdges: {}
                        }
                    }, a.prototype.getNode = function(a) {
                        return this._nodes[a]
                    }, a.prototype.removeNode = function(a) {
                        var b, d, e, f, g;
                        if (d = this._nodes[a]) {
                            f = d._outEdges;
                            for (e in f) c.call(f, e) && this.removeEdge(a, e);
                            g = d._inEdges;
                            for (b in g) c.call(g, b) && this.removeEdge(b, a);
                            return this.nodeSize--, delete this._nodes[a], d
                        }
                    }, a.prototype.addEdge = function(a, b, c) {
                        var d, e, f;
                        if (null == c && (c = 1), !this.getEdge(a, b) && (e = this._nodes[a], f = this._nodes[b], e && f)) return d = {
                            weight: c
                        }, e._outEdges[b] = d, f._inEdges[a] = d, this.edgeSize++, d
                    }, a.prototype.getEdge = function(a, b) {
                        var c, d;
                        if (c = this._nodes[a], d = this._nodes[b], c && d) return c._outEdges[b]
                    }, a.prototype.removeEdge = function(a, b) {
                        var c, d, e;
                        if (d = this._nodes[a], e = this._nodes[b], c = this.getEdge(a, b)) return delete d._outEdges[b], delete e._inEdges[a], this.edgeSize--, c
                    }, a.prototype.getInEdgesOf = function(a) {
                        var b, d, e, f;
                        e = this._nodes[a], d = [], f = null != e ? e._inEdges : void 0;
                        for (b in f) c.call(f, b) && d.push(this.getEdge(b, a));
                        return d
                    }, a.prototype.getOutEdgesOf = function(a) {
                        var b, d, e, f;
                        b = this._nodes[a], d = [], f = null != b ? b._outEdges : void 0;
                        for (e in f) c.call(f, e) && d.push(this.getEdge(a, e));
                        return d
                    }, a.prototype.getAllEdgesOf = function(a) {
                        var b, c, d, e, f, g, h;
                        if (c = this.getInEdgesOf(a), d = this.getOutEdgesOf(a), 0 === c.length) return d;
                        for (e = this.getEdge(a, a), b = f = 0, g = c.length; 0 <= g ? f < g : f > g; b = 0 <= g ? ++f : --f)
                            if (c[b] === e) {
                                h = [c[c.length - 1], c[b]], c[b] = h[0], c[c.length - 1] = h[1], c.pop();
                                break
                            }
                        return c.concat(d)
                    }, a.prototype.forEachNode = function(a) {
                        var b, d, e;
                        e = this._nodes;
                        for (b in e) c.call(e, b) && (d = e[b], a(d, b))
                    }, a.prototype.forEachEdge = function(a) {
                        var b, d, e, f, g, h;
                        g = this._nodes;
                        for (d in g)
                            if (c.call(g, d)) {
                                e = g[d], h = e._outEdges;
                                for (f in h) c.call(h, f) && (b = h[f], a(b))
                            }
                    }, a
                }(), a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c, d, e;
                b = function() {
                    function a(a) {
                        var b, c, d, e, f, g;
                        for (null == a && (a = []), this._data = [void 0], d = 0, f = a.length; d < f; d++) c = a[d], null != c && this._data.push(c);
                        if (this._data.length > 1)
                            for (b = e = 2, g = this._data.length; 2 <= g ? e < g : e > g; b = 2 <= g ? ++e : --e) this._upHeap(b);
                        this.size = this._data.length - 1
                    }
                    return a.prototype.add = function(a) {
                        if (null != a) return this._data.push(a), this._upHeap(this._data.length - 1), this.size++, a
                    }, a.prototype.removeMin = function() {
                        var a;
                        if (1 !== this._data.length) return this.size--, 2 === this._data.length ? this._data.pop() : (a = this._data[1], this._data[1] = this._data.pop(), this._downHeap(), a)
                    }, a.prototype.peekMin = function() {
                        return this._data[1]
                    }, a.prototype._upHeap = function(a) {
                        var b, c;
                        for (b = this._data[a]; this._data[a] < this._data[d(a)] && a > 1;) c = [this._data[d(a)], this._data[a]], this._data[a] = c[0], this._data[d(a)] = c[1], a = d(a)
                    }, a.prototype._downHeap = function() {
                        var a, b, d;
                        for (a = 1; c(a < this._data.length) && (b = c(a), b < this._data.length - 1 && this._data[e(a)] < this._data[b] && (b = e(a)), this._data[b] < this._data[a]);) d = [this._data[a], this._data[b]], this._data[b] = d[0], this._data[a] = d[1], a = b
                    }, a
                }(), d = function(a) {
                    return a >> 1
                }, c = function(a) {
                    return a << 1
                }, e = function(a) {
                    return (a << 1) + 1
                }, a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b;
                b = function() {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this.head = {
                            prev: void 0,
                            value: void 0,
                            next: void 0
                        }, this.tail = {
                            prev: void 0,
                            value: void 0,
                            next: void 0
                        }, this.size = 0, c = 0, d = a.length; c < d; c++) b = a[c], this.add(b)
                    }
                    return a.prototype.at = function(a) {
                        var b, c, d, e, f;
                        if (-this.size <= a && a < this.size) {
                            if (a = this._adjust(a), 2 * a < this.size)
                                for (b = this.head, c = d = 1; d <= a; c = d += 1) b = b.next;
                            else
                                for (b = this.tail, c = e = 1, f = this.size - a - 1; e <= f; c = e += 1) b = b.prev;
                            return b
                        }
                    }, a.prototype.add = function(a, b) {
                        var c, d, e, f, g;
                        if (null == b && (b = this.size), -this.size <= b && b <= this.size) return d = {
                            value: a
                        }, b = this._adjust(b), 0 === this.size ? this.head = d : 0 === b ? (e = [d, this.head, d], this.head.prev = e[0], d.next = e[1], this.head = e[2]) : (c = this.at(b - 1), f = [c.next, d, d, c], d.next = f[0], null != (g = c.next) ? g.prev = f[1] : void 0, c.next = f[2], d.prev = f[3]), b === this.size && (this.tail = d), this.size++, a
                    }, a.prototype.removeAt = function(a) {
                        var b, c, d;
                        if (null == a && (a = this.size - 1), -this.size <= a && a < this.size && 0 !== this.size) return a = this._adjust(a), 1 === this.size ? (c = this.head.value, this.head.value = this.tail.value = void 0) : 0 === a ? (c = this.head.value, this.head = this.head.next, this.head.prev = void 0) : (b = this.at(a), c = b.value, b.prev.next = b.next, null != (d = b.next) && (d.prev = b.prev), a === this.size - 1 && (this.tail = b.prev)), this.size--, c
                    }, a.prototype.remove = function(a) {
                        var b;
                        if (null != a) {
                            for (b = this.head; b && b.value !== a;) b = b.next;
                            if (b) return 1 === this.size ? this.head.value = this.tail.value = void 0 : b === this.head ? (this.head = this.head.next, this.head.prev = void 0) : b === this.tail ? (this.tail = this.tail.prev, this.tail.next = void 0) : (b.prev.next = b.next, b.next.prev = b.prev), this.size--, a
                        }
                    }, a.prototype.indexOf = function(a, b) {
                        var c, d;
                        if (null == b && (b = 0), null == this.head.value && !this.head.next || b >= this.size) return -1;
                        for (b = Math.max(0, this._adjust(b)), c = this.at(b), d = b; c && c.value !== a;) c = c.next, d++;
                        return d === this.size ? -1 : d
                    }, a.prototype._adjust = function(a) {
                        return a < 0 ? this.size + a : a
                    }, a
                }(), a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c, d, e, f = {}.hasOwnProperty;
                c = "_mapId_", b = function() {
                    function a(b) {
                        var c, d;
                        this._content = {}, this._itemId = 0, this._id = a._newMapId(), this.size = 0;
                        for (c in b) f.call(b, c) && (d = b[c], this.set(c, d))
                    }
                    return a._mapIdTracker = 0, a._newMapId = function() {
                        return this._mapIdTracker++
                    }, a.prototype.hash = function(a, b) {
                        var f, g;
                        return null == b && (b = !1), g = d(a), e(a) ? (f = c + this._id, b && !a[f] && (a[f] = this._itemId++), f + "_" + a[f]) : g + "_" + a
                    }, a.prototype.set = function(a, b) {
                        return this.has(a) || this.size++, this._content[this.hash(a, !0)] = [b, a], b
                    }, a.prototype.get = function(a) {
                        var b;
                        return null != (b = this._content[this.hash(a)]) ? b[0] : void 0
                    }, a.prototype.has = function(a) {
                        return this.hash(a) in this._content
                    }, a.prototype.delete = function(a) {
                        var b;
                        return b = this.hash(a), b in this._content && (delete this._content[b], e(a) && delete a[c + this._id], this.size--, !0)
                    }, a.prototype.forEach = function(a) {
                        var b, c, d;
                        d = this._content;
                        for (b in d) f.call(d, b) && (c = d[b], a(c[1], c[0]))
                    }, a
                }(), e = function(a) {
                    var b, c, e, f, g;
                    for (b = ["Boolean", "Number", "String", "Undefined", "Null", "RegExp", "Function"], e = d(a), f = 0, g = b.length; f < g; f++)
                        if (c = b[f], e === c) return !1;
                    return !0
                }, d = function(a) {
                    return Object.prototype.toString.apply(a).match(/\[object (.+)\]/)[1]
                }, a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b;
                b = function() {
                    function a(a) {
                        null == a && (a = []), this._content = a, this._dequeueIndex = 0, this.size = this._content.length
                    }
                    return a.prototype.enqueue = function(a) {
                        return this.size++, this._content.push(a), a
                    }, a.prototype.dequeue = function() {
                        var a;
                        if (0 !== this.size) return this.size--, a = this._content[this._dequeueIndex], this._dequeueIndex++, 2 * this._dequeueIndex > this._content.length && (this._content = this._content.slice(this._dequeueIndex), this._dequeueIndex = 0), a
                    }, a.prototype.peek = function() {
                        return this._content[this._dequeueIndex]
                    }, a
                }(), a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
                c = 0, d = 1, e = 2, h = 3, f = 1, b = 2, g = function() {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this._root, this.size = 0, c = 0, d = a.length; c < d; c++) b = a[c], null != b && this.add(b)
                    }
                    return a.prototype.add = function(a) {
                        var g, l, m, n;
                        if (null != a) {
                            if (this.size++, m = {
                                    value: a,
                                    _color: f
                                }, this._root) {
                                if (l = i(this._root, function(b) {
                                        return a === b.value ? c : a < b.value ? b._left ? d : (m._parent = b, b._left = m, h) : b._right ? e : (m._parent = b, b._right = m, h)
                                    }), null != l) return
                            } else this._root = m;
                            for (g = m;;) {
                                if (g === this._root) {
                                    g._color = b;
                                    break
                                }
                                if (g._parent._color === b) break; {
                                    if ((null != (n = p(g)) ? n._color : void 0) !== f) {
                                        !k(g) && k(g._parent) ? (this._rotateLeft(g._parent), g = g._left) : k(g) && !k(g._parent) && (this._rotateRight(g._parent), g = g._right), g._parent._color = b, j(g)._color = f, k(g) ? this._rotateRight(j(g)) : this._rotateLeft(j(g));
                                        break
                                    }
                                    g._parent._color = b, p(g)._color = b, j(g)._color = f, g = j(g)
                                }
                            }
                            return a
                        }
                    }, a.prototype.has = function(a) {
                        var b;
                        return b = i(this._root, function(b) {
                            return a === b.value ? c : a < b.value ? d : e
                        }), !!b
                    }, a.prototype.peekMin = function() {
                        var a;
                        return null != (a = n(this._root)) ? a.value : void 0
                    }, a.prototype.peekMax = function() {
                        var a;
                        return null != (a = m(this._root)) ? a.value : void 0
                    }, a.prototype.remove = function(a) {
                        var b;
                        if (b = i(this._root, function(b) {
                                return a === b.value ? c : a < b.value ? d : e
                            })) return this._removeNode(this._root, b), this.size--, a
                    }, a.prototype.removeMin = function() {
                        var a, b;
                        if (a = n(this._root)) return b = a.value, this._removeNode(this._root, a), b
                    }, a.prototype.removeMax = function() {
                        var a, b;
                        if (a = m(this._root)) return b = a.value, this._removeNode(this._root, a), b
                    }, a.prototype._removeNode = function(a, c) {
                        var d, e, g, h, i, j, m, p, q, r;
                        if (c._left && c._right && (e = n(c._right), c.value = e.value, c = e), e = c._left || c._right, e || (e = {
                                color: b,
                                _right: void 0,
                                _left: void 0,
                                isLeaf: !0
                            }), e._parent = c._parent, null != (g = c._parent) && (g[l(c)] = e), c._color === b)
                            if (e._color === f) e._color = b, e._parent || (this._root = e);
                            else
                                for (;;) {
                                    if (!e._parent) {
                                        e.isLeaf ? this._root = void 0 : this._root = e;
                                        break
                                    }
                                    if (d = o(e), (null != d ? d._color : void 0) === f && (e._parent._color = f, d._color = b, k(e) ? this._rotateLeft(e._parent) : this._rotateRight(e._parent)), d = o(e), e._parent._color !== b || d && (d._color !== b || d._left && d._left._color !== b || d._right && d._right._color !== b)) {
                                        if (!(e._parent._color !== f || d && (d._color !== b || d._left && (null != (h = d._left) ? h._color : void 0) !== b || d._right && (null != (i = d._right) ? i._color : void 0) !== b))) {
                                            null != d && (d._color = f), e._parent._color = b;
                                            break
                                        }
                                        if ((null != d ? d._color : void 0) === b) {
                                            !k(e) || d._right && d._right._color !== b || (null != (j = d._left) ? j._color : void 0) !== f ? k(e) || d._left && d._left._color !== b || (null != (p = d._right) ? p._color : void 0) !== f || (d._color = f, null != (q = d._right) && (q._color = b), this._rotateLeft(d)) : (d._color = f, null != (m = d._left) && (m._color = b), this._rotateRight(d));
                                            break
                                        }
                                        d = o(e), d._color = e._parent._color, k(e) ? (d._right._color = b, this._rotateRight(e._parent)) : (d._left._color = b, this._rotateLeft(e._parent))
                                    } else null != d && (d._color = f), e.isLeaf && (e._parent[l(e)] = void 0), e = e._parent
                                }
                        if (e.isLeaf) return null != (r = e._parent) ? r[l(e)] = void 0 : void 0
                    }, a.prototype._rotateLeft = function(a) {
                        var b, c;
                        if (null != (b = a._parent) && (b[l(a)] = a._right), a._right._parent = a._parent, a._parent = a._right, a._right = a._right._left, a._parent._left = a, null != (c = a._right) && (c._parent = a), null == a._parent._parent) return this._root = a._parent
                    }, a.prototype._rotateRight = function(a) {
                        var b, c;
                        if (null != (b = a._parent) && (b[l(a)] = a._left), a._left._parent = a._parent, a._parent = a._left, a._left = a._left._right, a._parent._right = a, null != (c = a._left) && (c._parent = a), null == a._parent._parent) return this._root = a._parent
                    }, a
                }(), k = function(a) {
                    return a === a._parent._left
                }, l = function(a) {
                    return k(a) ? "_left" : "_right"
                }, i = function(a, b) {
                    var f, g, i;
                    for (g = a, i = void 0; g;) {
                        if (f = b(g), f === c) {
                            i = g;
                            break
                        }
                        if (f === d) g = g._left;
                        else if (f === e) g = g._right;
                        else if (f === h) break
                    }
                    return i
                }, n = function(a) {
                    return i(a, function(a) {
                        return a._left ? d : c
                    })
                }, m = function(a) {
                    return i(a, function(a) {
                        return a._right ? e : c
                    })
                }, j = function(a) {
                    var b;
                    return null != (b = a._parent) ? b._parent : void 0
                }, p = function(a) {
                    if (j(a)) return k(a._parent) ? j(a)._right : j(a)._left
                }, o = function(a) {
                    return k(a) ? a._parent._right : a._parent._left
                }, a.exports = g
            }).call(this)
        }, function(a, b, c) {
            (function() {
                var b, d, e, f, g = {}.hasOwnProperty;
                b = c(6), e = "end", d = function() {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this._root = {}, this.size = 0, c = 0, d = a.length; c < d; c++) b = a[c], this.add(b)
                    }
                    return a.prototype.add = function(a) {
                        var b, c, d, f;
                        if (null != a) {
                            for (this.size++, b = this._root, d = 0, f = a.length; d < f; d++) c = a[d], null == b[c] && (b[c] = {}), b = b[c];
                            return b[e] = !0, a
                        }
                    }, a.prototype.has = function(a) {
                        var b, c, d, f;
                        if (null == a) return !1;
                        for (b = this._root, d = 0, f = a.length; d < f; d++) {
                            if (c = a[d], null == b[c]) return !1;
                            b = b[c]
                        }
                        return !!b[e]
                    }, a.prototype.longestPrefixOf = function(a) {
                        var b, c, d, e, f;
                        if (null == a) return "";
                        for (b = this._root, d = "", e = 0, f = a.length; e < f && (c = a[e], null != b[c]); e++) d += c, b = b[c];
                        return d
                    }, a.prototype.wordsWithPrefix = function(a) {
                        var c, d, f, h, i, j, k, l, m, n;
                        if (null == a) return [];
                        for (null != a || (a = ""), k = [], d = this._root, l = 0, m = a.length; l < m; l++)
                            if (f = a[l], d = d[f], null == d) return [];
                        for (i = new b, i.enqueue([d, ""]); 0 !== i.size;) {
                            n = i.dequeue(), h = n[0], c = n[1], h[e] && k.push(a + c);
                            for (f in h) g.call(h, f) && (j = h[f], i.enqueue([j, c + f]))
                        }
                        return k
                    }, a.prototype.remove = function(a) {
                        var b, c, d, g, h, i, j, k;
                        if (null != a) {
                            for (b = this._root, g = [], h = 0, j = a.length; h < j; h++) {
                                if (d = a[h], null == b[d]) return;
                                b = b[d], g.push([d, b])
                            }
                            if (b[e]) {
                                if (this.size--, delete b[e], f(b, 1)) return a;
                                for (c = i = k = g.length - 1;
                                     (k <= 1 ? i <= 1 : i >= 1) && !f(g[c][1], 1); c = k <= 1 ? ++i : --i) delete g[c - 1][1][g[c][0]];
                                return f(this._root[g[0][0]], 1) || delete this._root[g[0][0]], a
                            }
                        }
                    }, a
                }(), f = function(a, b) {
                    var c, d;
                    if (0 === b) return !0;
                    d = 0;
                    for (c in a)
                        if (g.call(a, c) && (d++, d >= b)) return !0;
                    return !1
                }, a.exports = d
            }).call(this)
        }]), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapMarkerSpiderfier", ["uiGmapGoogleMapApi", function(b) {
        var c = this;
        return + function() {
            var b = {}.hasOwnProperty,
                c = [].slice;
            this.OverlappingMarkerSpiderfier = function() {
                function d(a, c) {
                    var d, f, g, h, i, j;
                    this.map = a, null == c && (c = {});
                    for (f in c) b.call(c, f) && (j = c[f], this[f] = j);
                    for (this.projHelper = new this.constructor.ProjHelper(this.map), this.initMarkerArrays(), this.listeners = {}, i = ["click", "zoom_changed", "maptypeid_changed"], g = 0, h = i.length; g < h; g++) d = i[g], e.addListener(this.map, d, function(a) {
                        return function() {
                            return a.unspiderfy()
                        }
                    }(this))
                }
                var e, f, g, h, i, j, k, l, m, n, o;
                for (l = d.prototype, m = [d, l], g = 0, j = m.length; g < j; g++) o = m[g], o.VERSION = "0.3.3";
                return f = void 0, e = void 0, k = void 0, n = 2 * Math.PI, l.keepSpiderfied = !1, l.markersWontHide = !1, l.markersWontMove = !1, l.nearbyDistance = 20, l.circleSpiralSwitchover = 9, l.circleFootSeparation = 23, l.circleStartAngle = n / 12, l.spiralFootSeparation = 26, l.spiralLengthStart = 11, l.spiralLengthFactor = 4, l.spiderfiedZIndex = 1e3, l.usualLegZIndex = 10, l.highlightedLegZIndex = 20, l.event = "click", l.minZoomLevel = !1, l.legWeight = 1.5, l.legColors = {
                    usual: {},
                    highlighted: {}
                }, i = l.legColors.usual, h = l.legColors.highlighted, d.initializeGoogleMaps = function(a) {
                    return f = a.maps, e = f.event, k = f.MapTypeId, i[k.HYBRID] = i[k.SATELLITE] = "#fff", h[k.HYBRID] = h[k.SATELLITE] = "#f00", i[k.TERRAIN] = i[k.ROADMAP] = "#444", h[k.TERRAIN] = h[k.ROADMAP] = "#f00", this.ProjHelper = function(a) {
                        return this.setMap(a)
                    }, this.ProjHelper.prototype = new f.OverlayView, this.ProjHelper.prototype.draw = function() {}
                }, l.initMarkerArrays = function() {
                    return this.markers = [], this.markerListenerRefs = []
                }, l.addMarker = function(a) {
                    var b;
                    return null != a._oms ? this : (a._oms = !0, b = [e.addListener(a, this.event, function(b) {
                        return function(c) {
                            return b.spiderListener(a, c)
                        }
                    }(this))], this.markersWontHide || b.push(e.addListener(a, "visible_changed", function(b) {
                        return function() {
                            return b.markerChangeListener(a, !1)
                        }
                    }(this))), this.markersWontMove || b.push(e.addListener(a, "position_changed", function(b) {
                        return function() {
                            return b.markerChangeListener(a, !0)
                        }
                    }(this))), this.markerListenerRefs.push(b), this.markers.push(a), this)
                }, l.markerChangeListener = function(a, b) {
                    if (null != a._omsData && (b || !a.getVisible()) && null == this.spiderfying && null == this.unspiderfying) return this.unspiderfy(b ? a : null)
                }, l.getMarkers = function() {
                    return this.markers.slice(0)
                }, l.removeMarker = function(a) {
                    var b, c, d, f, g;
                    if (null != a._omsData && this.unspiderfy(), b = this.arrIndexOf(this.markers, a), b < 0) return this;
                    for (g = this.markerListenerRefs.splice(b, 1)[0], c = 0, d = g.length; c < d; c++) f = g[c], e.removeListener(f);
                    return delete a._oms, this.markers.splice(b, 1), this
                }, l.clearMarkers = function() {
                    var a, b, c, d, f, g, h, i, j;
                    for (this.unspiderfy(), j = this.markers, a = b = 0, c = j.length; b < c; a = ++b) {
                        for (h = j[a], g = this.markerListenerRefs[a], i = 0, d = g.length; i < d; i++) f = g[i], e.removeListener(f);
                        delete h._oms
                    }
                    return this.initMarkerArrays(), this
                }, l.addListener = function(a, b) {
                    var c;
                    return (null != (c = this.listeners)[a] ? c[a] : c[a] = []).push(b), this
                }, l.removeListener = function(a, b) {
                    var c;
                    return c = this.arrIndexOf(this.listeners[a], b), c < 0 || this.listeners[a].splice(c, 1), this
                }, l.clearListeners = function(a) {
                    return this.listeners[a] = [], this
                }, l.trigger = function() {
                    var a, b, d, e, f, g, h, i;
                    for (b = arguments[0], a = 2 <= arguments.length ? c.call(arguments, 1) : [], h = null != (g = this.listeners[b]) ? g : [], i = [], e = 0, f = h.length; e < f; e++) d = h[e], i.push(d.apply(null, a));
                    return i
                }, l.generatePtsCircle = function(a, b) {
                    var c, d, e, g, h, i, j, k;
                    for (e = this.circleFootSeparation * (2 + a), i = e / n, d = n / a, k = [], g = h = 0, j = a; 0 <= j ? h < j : h > j; g = 0 <= j ? ++h : --h) c = this.circleStartAngle + g * d, k.push(new f.Point(b.x + i * Math.cos(c), b.y + i * Math.sin(c)));
                    return k
                }, l.generatePtsSpiral = function(a, b) {
                    var c, d, e, g, h, i, j;
                    for (g = this.spiralLengthStart, c = 0, j = [], d = e = 0, i = a; 0 <= i ? e < i : e > i; d = 0 <= i ? ++e : --e) c += this.spiralFootSeparation / g + 5e-4 * d, h = new f.Point(b.x + g * Math.cos(c), b.y + g * Math.sin(c)), g += n * this.spiralLengthFactor / c, j.push(h);
                    return j
                }, l.spiderListener = function(b, c) {
                    var d, e, f, g, h, i, j, k, m, n, o, p, q;
                    if (k = null != b._omsData, k && this.keepSpiderfied || ("mouseover" === this.event ? (d = this, e = function() {
                            return d.unspiderfy()
                        }, a.clearTimeout(l.timeout), l.timeout = setTimeout(e, 3e3)) : this.unspiderfy()), k || this.map.getStreetView().getVisible() || "GoogleEarthAPI" === this.map.getMapTypeId()) return this.trigger("click", b, c);
                    for (n = [], o = [], m = this.nearbyDistance, p = m * m, j = this.llToPt(b.position), q = this.markers, f = 0, g = q.length; f < g; f++) h = q[f], null != h.map && h.getVisible() && (i = this.llToPt(h.position), this.ptDistanceSq(i, j) < p ? n.push({
                        marker: h,
                        markerPt: i
                    }) : o.push(h));
                    return 1 === n.length ? this.trigger("click", b, c) : this.spiderfy(n, o)
                }, l.markersNearMarker = function(a, b) {
                    var c, d, e, f, g, h, i, j, k, l, m;
                    if (null == b && (b = !1), null == this.projHelper.getProjection()) throw "Must wait for 'idle' event on map before calling markersNearMarker";
                    for (i = this.nearbyDistance, j = i * i, g = this.llToPt(a.position), h = [], k = this.markers, c = 0, d = k.length; c < d && (e = k[c], !(e !== a && null != e.map && e.getVisible() && (f = this.llToPt(null != (l = null != (m = e._omsData) ? m.usualPosition : void 0) ? l : e.position), this.ptDistanceSq(f, g) < j && (h.push(e), b)))); c++);
                    return h
                }, l.markersNearAnyOtherMarker = function() {
                    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
                    if (null == this.projHelper.getProjection()) throw "Must wait for 'idle' event on map before calling markersNearAnyOtherMarker";
                    for (o = this.nearbyDistance, p = o * o, m = function() {
                        var a, b, c, d, e, f;
                        for (c = this.markers, f = [], a = 0, b = c.length; a < b; a++) h = c[a], f.push({
                            pt: this.llToPt(null != (d = null != (e = h._omsData) ? e.usualPosition : void 0) ? d : h.position),
                            willSpiderfy: !1
                        });
                        return f
                    }.call(this), r = this.markers, b = d = 0, e = r.length; d < e; b = ++d)
                        if (i = r[b], null != i.map && i.getVisible() && (j = m[b], !j.willSpiderfy))
                            for (s = this.markers, c = n = 0, f = s.length; n < f; c = ++n)
                                if (k = s[c], c !== b && null != k.map && k.getVisible() && (l = m[c], (!(c < b) || l.willSpiderfy) && this.ptDistanceSq(j.pt, l.pt) < p)) {
                                    j.willSpiderfy = l.willSpiderfy = !0;
                                    break
                                }
                    for (t = this.markers, u = [], a = q = 0, g = t.length; q < g; a = ++q) h = t[a], m[a].willSpiderfy && u.push(h);
                    return u
                }, l.makeHighlightListenerFuncs = function(a) {
                    return {
                        highlight: function(b) {
                            return function() {
                                return a._omsData.leg.setOptions({
                                    strokeColor: b.legColors.highlighted[b.map.mapTypeId],
                                    zIndex: b.highlightedLegZIndex
                                })
                            }
                        }(this),
                        unhighlight: function(b) {
                            return function() {
                                return a._omsData.leg.setOptions({
                                    strokeColor: b.legColors.usual[b.map.mapTypeId],
                                    zIndex: b.usualLegZIndex
                                })
                            }
                        }(this)
                    }
                }, l.spiderfy = function(a, b) {
                    var c, d, g, h, i, j, k, l, m, n, o;
                    return !(this.minZoomLevel && this.map.getZoom() < this.minZoomLevel) && (this.spiderfying = !0, n = a.length, c = this.ptAverage(function() {
                            var b, c, d;
                            for (d = [], b = 0, c = a.length; b < c; b++) l = a[b], d.push(l.markerPt);
                            return d
                        }()), h = n >= this.circleSpiralSwitchover ? this.generatePtsSpiral(n, c).reverse() : this.generatePtsCircle(n, c), o = function() {
                            var b, c, l;
                            for (l = [], b = 0, c = h.length; b < c; b++) g = h[b], d = this.ptToLl(g), m = this.minExtract(a, function(a) {
                                return function(b) {
                                    return a.ptDistanceSq(b.markerPt, g)
                                }
                            }(this)), k = m.marker, j = new f.Polyline({
                                map: this.map,
                                path: [k.position, d],
                                strokeColor: this.legColors.usual[this.map.mapTypeId],
                                strokeWeight: this.legWeight,
                                zIndex: this.usualLegZIndex
                            }), k._omsData = {
                                usualPosition: k.position,
                                leg: j
                            }, this.legColors.highlighted[this.map.mapTypeId] !== this.legColors.usual[this.map.mapTypeId] && (i = this.makeHighlightListenerFuncs(k), k._omsData.hightlightListeners = {
                                highlight: e.addListener(k, "mouseover", i.highlight),
                                unhighlight: e.addListener(k, "mouseout", i.unhighlight)
                            }), k.setPosition(d), k.setZIndex(Math.round(this.spiderfiedZIndex + g.y)), l.push(k);
                            return l
                        }.call(this), delete this.spiderfying, this.spiderfied = !0, this.trigger("spiderfy", o, b))
                }, l.unspiderfy = function(a) {
                    var b, c, d, f, g, h, i;
                    if (null == a && (a = null), null == this.spiderfied) return this;
                    for (this.unspiderfying = !0, i = [], g = [], h = this.markers, b = 0, c = h.length; b < c; b++) f = h[b], null != f._omsData ? (f._omsData.leg.setMap(null), f !== a && f.setPosition(f._omsData.usualPosition), f.setZIndex(null), d = f._omsData.hightlightListeners, null != d && (e.removeListener(d.highlight), e.removeListener(d.unhighlight)), delete f._omsData, i.push(f)) : g.push(f);
                    return delete this.unspiderfying, delete this.spiderfied, this.trigger("unspiderfy", i, g), this
                }, l.ptDistanceSq = function(a, b) {
                    var c, d;
                    return c = a.x - b.x, d = a.y - b.y, c * c + d * d
                }, l.ptAverage = function(a) {
                    var b, c, d, e, g, h;
                    for (g = h = 0, b = 0, c = a.length; b < c; b++) e = a[b], g += e.x, h += e.y;
                    return d = a.length, new f.Point(g / d, h / d)
                }, l.llToPt = function(a) {
                    return this.projHelper.getProjection().fromLatLngToDivPixel(a)
                }, l.ptToLl = function(a) {
                    return this.projHelper.getProjection().fromDivPixelToLatLng(a)
                }, l.minExtract = function(a, b) {
                    var c, d, e, f, g, h, i;
                    for (e = g = 0, h = a.length; g < h; e = ++g) f = a[e], i = b(f), ("undefined" == typeof c || null === c || i < d) && (d = i, c = e);
                    return a.splice(c, 1)[0]
                }, l.arrIndexOf = function(a, b) {
                    var c, d, e, f;
                    if (null != a.indexOf) return a.indexOf(b);
                    for (c = d = 0, e = a.length; d < e; c = ++d)
                        if (f = a[c], f === b) return c;
                    return -1
                }, d
            }()
        }.apply(c), b.then(function() {
            c.OverlappingMarkerSpiderfier.initializeGoogleMaps(a.google)
        }), this.OverlappingMarkerSpiderfier
    }]), b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendMarkerClusterer", ["uiGmapLodash", "uiGmapPropMap", function(b, d) {
        return {
            init: c.once(function() {
                (function() {
                    var c = {}.hasOwnProperty,
                        e = function(a, b) {
                            function d() {
                                this.constructor = a
                            }
                            for (var e in b) c.call(b, e) && (a[e] = b[e]);
                            return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                        };
                    a.NgMapCluster = function(a) {
                        function c(a) {
                            c.__super__.constructor.call(this, a), this.markers_ = new d
                        }
                        return e(c, a), c.prototype.addMarker = function(a) {
                            var b, c;
                            if (this.isMarkerAlreadyAdded_(a)) {
                                var d = this.markers_.get(a.key);
                                if (d.getPosition().lat() == a.getPosition().lat() && d.getPosition().lon() == a.getPosition().lon()) return !1
                            }
                            if (this.center_) {
                                if (this.averageCenter_) {
                                    var e = this.markers_.length + 1,
                                        f = (this.center_.lat() * (e - 1) + a.getPosition().lat()) / e,
                                        g = (this.center_.lng() * (e - 1) + a.getPosition().lng()) / e;
                                    this.center_ = new google.maps.LatLng(f, g), this.calculateBounds_()
                                }
                            } else this.center_ = a.getPosition(), this.calculateBounds_();
                            return a.isAdded = !0, this.markers_.push(a), b = this.markers_.length, c = this.markerClusterer_.getMaxZoom(), null !== c && this.map_.getZoom() > c ? a.getMap() !== this.map_ && a.setMap(this.map_) : b < this.minClusterSize_ ? a.getMap() !== this.map_ && a.setMap(this.map_) : b === this.minClusterSize_ ? this.markers_.each(function(a) {
                                a.setMap(null)
                            }) : a.setMap(null), !0
                        }, c.prototype.isMarkerAlreadyAdded_ = function(a) {
                            return b.isNullOrUndefined(this.markers_.get(a.key))
                        }, c.prototype.getBounds = function() {
                            var a = new google.maps.LatLngBounds(this.center_, this.center_);
                            return this.getMarkers().each(function(b) {
                                a.extend(b.getPosition())
                            }), a
                        }, c.prototype.remove = function() {
                            this.clusterIcon_.setMap(null), this.markers_ = new d, delete this.markers_
                        }, c
                    }(Cluster), a.NgMapMarkerClusterer = function(a) {
                        function b(a, c, e) {
                            b.__super__.constructor.call(this, a, c, e), this.markers_ = new d
                        }
                        return e(b, a), b.prototype.clearMarkers = function() {
                            this.resetViewport_(!0), this.markers_ = new d
                        }, b.prototype.removeMarker_ = function(a) {
                            return !!this.markers_.get(a.key) && (a.setMap(null), this.markers_.remove(a.key), !0)
                        }, b.prototype.createClusters_ = function(a) {
                            var b, c, d, e = this;
                            if (this.ready_) {
                                0 === a && (google.maps.event.trigger(this, "clusteringbegin", this), "undefined" != typeof this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), d = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
                                var f = this.getExtendedBounds(d),
                                    g = Math.min(a + this.batchSize_, this.markers_.length),
                                    h = this.markers_.values();
                                for (b = a; b < g; b++) c = h[b], !c.isAdded && this.isMarkerInBounds_(c, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && c.getVisible()) && this.addToClosestCluster_(c);
                                if (g < this.markers_.length) this.timerRefStatic = setTimeout(function() {
                                    e.createClusters_(g)
                                }, 0);
                                else {
                                    for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].updateIcon_();
                                    delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this)
                                }
                            }
                        }, b.prototype.addToClosestCluster_ = function(a) {
                            var b, c, d, e, f = 4e4,
                                g = null;
                            for (b = 0; b < this.clusters_.length; b++) d = this.clusters_[b], e = d.getCenter(), e && (c = this.distanceBetweenPoints_(e, a.getPosition()), c < f && (f = c, g = d));
                            g && g.isMarkerInClusterBounds(a) ? g.addMarker(a) : (d = new NgMapCluster(this), d.addMarker(a), this.clusters_.push(d))
                        }, b.prototype.redraw_ = function() {
                            this.createClusters_(0)
                        }, b.prototype.resetViewport_ = function(a) {
                            var b;
                            for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].remove();
                            this.clusters_ = [], this.markers_.each(function(b) {
                                b.isAdded = !1, a && b.setMap(null)
                            })
                        }, b.prototype.extend = function(a, b) {
                            return function(a) {
                                var b;
                                for (b in a.prototype) "constructor" !== b && (this.prototype[b] = a.prototype[b]);
                                return this
                            }.apply(a, [b])
                        }, ClusterIcon.prototype.show = function() {
                            if (this.div_) {
                                var a = "",
                                    b = this.backgroundPosition_.split(" "),
                                    c = parseInt(b[0].trim(), 10),
                                    d = parseInt(b[1].trim(), 10),
                                    e = this.getPosFromLatLng_(this.center_);
                                this.div_.style.cssText = this.createCss(e), a = "<img src='" + this.url_ + "' style='position: absolute; top: " + d + "px; left: " + c + "px; ", a += this.cluster_.getMarkerClusterer().enableRetinaIcons_ ? "width: " + this.width_ + "px;height: " + this.height_ + "px;" : "clip: rect(" + -1 * d + "px, " + (-1 * c + this.width_) + "px, " + (-1 * d + this.height_) + "px, " + -1 * c + "px);", a += "'>", this.div_.innerHTML = a + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + this.sums_.text + "</div>", "undefined" == typeof this.sums_.title || "" === this.sums_.title ? this.div_.title = this.cluster_.getMarkerClusterer().getTitle() : this.div_.title = this.sums_.title, this.div_.style.display = ""
                            }
                            this.visible_ = !0
                        }, b
                    }(MarkerClusterer)
                }).call(this)
            })
        }
    }])
}(window, angular, _);//# sourceMappingURL=angular-google-maps-street-view_dev_mapped.min.js.map