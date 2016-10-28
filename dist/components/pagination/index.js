(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else {
        var a = factory();
        for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
    }
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
    }([ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(4);
    }, function(module, exports) {}, function(module, exports) {
        module.exports = ' <div class="v-pagination-wrap {{ class || \'\' }}" _v-2095839f=""> <template v-if="type === \'standard\' "> <div class=row _v-2095839f=""> <div v-if=withPageSize class="v-pagination-page-size col-md-6" _v-2095839f=""> 共<span v-text=total _v-2095839f=""></span>条 &nbsp;&nbsp; 每页 <select v-model=pageSize _v-2095839f=""> <option v-for="opt in pageSizeRange" :value=opt v-text=opt _v-2095839f="">1</option> </select> 条 </div> <div class="v-pagination-standard col-md-6 text-right" _v-2095839f=""> <button @click=prev class="btn btn-default" :class="{\'disabled\': currentPageNo == 1}" _v-2095839f="">上一页</button> <ul class=pagination _v-2095839f=""> <li v-if="getRangePage.begin > 1" _v-2095839f=""> <a href=javascript:void(0); @click=turnToPage(1) _v-2095839f="">1</a> </li> <li v-if="getRangePage.begin > 1" _v-2095839f=""> <a class=apostrophe _v-2095839f="">...</a> </li> <li v-for="number in (getRangePage.end - getRangePage.begin + 1)" :class="{\'active\': isActive(number)}" _v-2095839f=""> <a v-if=isActive(number) href=javascript:void(0); v-text="number + getRangePage.begin" _v-2095839f=""></a> <a v-else="" href=javascript:void(0); v-text="number + getRangePage.begin" @click="turnToPage(number + getRangePage.begin)" _v-2095839f=""></a> </li> <li v-if="getRangePage.end < totalPageCount" _v-2095839f=""> <a class=apostrophe _v-2095839f="">...</a> </li> <li v-if="getRangePage.end < totalPageCount" _v-2095839f=""> <a href=javascript:void(0); v-text=totalPageCount @click=turnToPage(totalPageCount) _v-2095839f=""></a> </li> </ul> <button @click=next class="btn btn-default" :class="{\'disabled\': currentPageNo == totalPageCount}" _v-2095839f="">下一页</button> </div> </div> </template> <div v-else="" class=v-pagination-mini _v-2095839f=""> <span _v-2095839f="">共<span v-text=total _v-2095839f=""></span>条</span> <button class="btn btn-default prev-trigger" :class="{\'disabled\': currentPageNo < 2}" @click=prev _v-2095839f=""> <span class=caret _v-2095839f=""></span> </button> <span v-text=currentPageNo _v-2095839f=""></span>/<span v-text=totalPageCount _v-2095839f=""></span> <button class="btn btn-default next-trigger" :class="{\'disabled\': currentPageNo == totalPageCount}" @click=next _v-2095839f=""> <span class=caret _v-2095839f=""></span> </button> </div> </div> ';
    }, function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            name: "xcui-pagination",
            props: {
                type: {
                    type: String,
                    default: "standard"
                },
                currentPageNo: {
                    type: Number,
                    default: 1
                },
                total: Number,
                pageSize: {
                    type: Number,
                    default: 20
                },
                class: String,
                withPageSize: {
                    type: Boolean,
                    default: true
                },
                pageSizeRange: {
                    type: Array,
                    default: function _default() {
                        return [ 10, 20, 50, 100 ];
                    }
                },
                rangeLength: {
                    type: Number,
                    default: 10
                }
            },
            computed: {
                totalPageCount: function totalPageCount() {
                    return Math.ceil(this.total / this.pageSize);
                },
                getRangePage: function getRangePage() {
                    var curPage = this.currentPageNo;
                    var midpoint = curPage;
                    var pageRange = this.rangeLength - 1;
                    var leftHand = Math.floor(pageRange / 2);
                    var rightHand = Math.ceil(pageRange / 2);
                    var totalPage = this.totalPageCount;
                    var result = {
                        begin: 1,
                        end: 1
                    };
                    if (!midpoint) {
                        result.begin = curPage - leftHand;
                        result.end = curPage + rightHand;
                    } else {
                        result.begin = midpoint - leftHand;
                        result.end = midpoint + rightHand;
                    }
                    if (result.begin < 1) {
                        result.end = result.end - result.begin + 1;
                        result.begin = 1;
                        if (result.end > totalPage) {
                            result.end = totalPage;
                        }
                    } else if (result.end > totalPage) {
                        result.begin += totalPage - result.end;
                        result.end = totalPage;
                        if (result.begin < 1) {
                            result.begin = 1;
                        }
                    }
                    return result;
                }
            },
            watch: {
                pageSize: function pageSize(val) {
                    this.$emit("change-pagesize", this.pageSize);
                    this.$emit("go-to-page", 1, this.currentPageNo);
                }
            },
            methods: {
                turnToPage: function turnToPage(pageNo) {
                    if (pageNo > 0 && pageNo <= this.totalPageCount) {
                        this.$emit("go-to-page", pageNo, this.currentPageNo);
                        this.currentPageNo = pageNo;
                    }
                },
                prev: function prev() {
                    this.turnToPage(this.currentPageNo - 1);
                },
                next: function next() {
                    this.turnToPage(this.currentPageNo + 1);
                },
                isActive: function isActive(number) {
                    return number + this.getRangePage.begin === this.currentPageNo;
                }
            }
        };
<<<<<<< HEAD
    }, function(module, exports) {}, function(module, exports) {
        module.exports = ' <div class="v-pagination-wrap {{ class || \'\' }}"> <template v-if="type === \'standard\' "> <div class=row> <div v-if=withPageSize class="v-pagination-page-size col-md-6"> 共<span v-text=total></span>条 &nbsp;&nbsp; 每页 <select v-model=pageSize> <option v-for="opt in pageSizeRange" :value=opt v-text=opt>1</option> </select> 条 </div> <div class="v-pagination-standard col-md-6 text-right"> <button @click=prev class="btn btn-default" :class="{\'disabled\': currentPageNo == 1}">上一页</button> <ul class=pagination> <li v-if="getRangePage.begin > 1"> <a href=javascript:void(0); @click=turnToPage(1)>1</a> </li> <li v-if="getRangePage.begin > 1"> <a class=apostrophe>...</a> </li> <li v-for="number in (getRangePage.end - getRangePage.begin + 1)" :class="{\'active\': isActive(number)}"> <a v-if=isActive(number) href=javascript:void(0); v-text="number + getRangePage.begin"></a> <a v-else href=javascript:void(0); v-text="number + getRangePage.begin" @click="turnToPage(number + getRangePage.begin)"></a> </li> <li v-if="getRangePage.end < totalPageCount"> <a class=apostrophe>...</a> </li> <li v-if="getRangePage.end < totalPageCount"> <a href=javascript:void(0); v-text=totalPageCount @click=turnToPage(totalPageCount)></a> </li> </ul> <button @click=next class="btn btn-default" :class="{\'disabled\': currentPageNo == totalPageCount}">下一页</button> </div> </div> </template> <div v-else class=v-pagination-mini> <span>共<span v-text=total></span>条</span> <button class="btn btn-default prev-trigger" :class="{\'disabled\': currentPageNo < 2}" @click=prev> <span class=caret></span> </button> <span v-text=currentPageNo></span>/<span v-text=totalPageCount></span> <button class="btn btn-default next-trigger" :class="{\'disabled\': currentPageNo == totalPageCount}" @click=next> <span class=caret></span> </button> </div> </div> ';
=======
>>>>>>> 665842a6c4a70ad448c3fcffde3109aa06ea74eb
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        var __vue_styles__ = {};
        __webpack_require__(1);
        __vue_script__ = __webpack_require__(3);
        __vue_template__ = __webpack_require__(2);
        module.exports = __vue_script__ || {};
        if (module.exports.__esModule) module.exports = module.exports.default;
        var __vue_options__ = typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports;
        if (__vue_template__) {
            __vue_options__.template = __vue_template__;
        }
        if (!__vue_options__.computed) __vue_options__.computed = {};
        Object.keys(__vue_styles__).forEach(function(key) {
            var module = __vue_styles__[key];
            __vue_options__.computed[key] = function() {
                return module;
            };
        });
    } ]);
});

