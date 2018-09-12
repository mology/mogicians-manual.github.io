/*!
 * 膜法指南 网页版
 * https://xmader.github.io/mogicians_manual/
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * bottom-nav.js - 底部导航条Vue组件
 * 
*/

Vue.component('bottom-nav', {
    template: `
        <ul :class="bottom_nav" id="bottom-nav">
            <li class="nav-item" v-for="nav of navs">
                <a :class="['nav-link',{ active: Active_Item == nav.id }]" :href="'#/'+nav.id" :id="nav.id" @click="active(nav.id)">
                    <i :class="['fa','fa-'+nav.icon]" aria-hidden="true"></i> &nbsp;{{nav.name}}
                </a>
            </li>
        </ul>
    `,
    data: () => ({
        "bottom_nav": ["nav", "nav-pills", "nav-fill", "bottom-nav"],
        "Active_Item": (location.hash.slice(2) || "shuo"),
        "navs": [
            {
                id: "shuo",
                name: "说",
                icon: "microphone"
            },
            {
                id: "xue",
                name: "学",
                icon: "book"
            },
            {
                id: "dou",
                name: "逗",
                icon: "smile-o"
            },
            {
                id: "chang",
                name: "唱",
                icon: "music"
            },
            {
                id: "videos",
                name: "赏",
                icon: "film"
            }
        ]
    }),
    methods: {
        active: function (id) {
            this.Active_Item = id
        }
    }
})