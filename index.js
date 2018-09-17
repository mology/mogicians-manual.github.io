/*!
 * 膜法指南 网页版
 * https://xmader.github.io/mogicians_manual/
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/mogicians_manual/
 * 
*/

// const Vue = require("vue/dist/vue.js")
import Vue from 'vue/dist/vue.runtime.esm'
import components from './components/components.js'
import make_get_request from "./make_request.js"
import "./copyright_info.js"

var offline = !(typeof _offline == "undefined")

var vm = new Vue({
    el: '#app',
    components,
    render: function () {
        var createElement = this.$createElement;
        return createElement('main',
            [
                createElement('top-nav', { ref: "top_nav" }),
                createElement('div', { staticClass: "container" }, [createElement('card-deck', { ref: "card_deck" })], 1),
                createElement('bottom-nav'),
                createElement('modal-base', { ref: "modal_base" })
            ], 1)
    },
    provide: function () {
        return {
            offline: offline
        }
    },
    mounted: function () { this.init() },
    methods: {
        json_callback: function (text) {
            sessionStorage && sessionStorage.setItem(this.get_sub_page_name(), text); // 保存获取的资源到sessionStorage, 加快下一次访问此子页面的加载速度, 优化性能
            this.$refs.card_deck.json_callback(text)
        },
        get_sub_page_name: () => location.hash.slice(2) || "shuo",
        init: function () { // 初始化页面
            // 获取当前的子页面名
            var sub_page_name = this.get_sub_page_name()
            var json_callback = this.json_callback

            // 清空内容并显示加载中画面
            this.$refs.card_deck.cards = [
                {
                    header: "加载中, 请稍后...",
                    items: []
                }
            ]

            if (sessionStorage && sessionStorage.getItem(sub_page_name)) { // 从sessionStorage获取资源, 避免多次重复读取资源文件拖慢加载速度
                var text = sessionStorage.getItem(sub_page_name);
                this.$refs.card_deck.json_callback(text)
            }
            else {
                // 获取资源文件
                if (offline) {
                    // 强行解决Firefox中不能访问本地资源的问题, 不保证长期有效
                    var json_element = document.createElement("script")
                    json_element.src = `resource/${sub_page_name}.json?callback=json_callback`
                    document.getElementsByTagName("body")[0].appendChild(json_element)
                }
                else {
                    make_get_request("https://raw.githubusercontent.com/Xmader/mogicians_manual/offline/resource/" + sub_page_name + ".json", json_callback, '获取资源失败!\n')
                }
            }
        }
    }
})

// hash改变时自动重新初始化页面
window.onhashchange = () => vm.init()
