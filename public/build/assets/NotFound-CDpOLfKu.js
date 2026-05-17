import{r,j as t}from"./app-CSNOEYrU.js";/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var n;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(n||(n={}));function i(e,c){throw new Error(c)}var o;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(o||(o={}));const s=["post","put","patch","delete"];new Set(s);const d=["get",...s];new Set(d);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const a=r.createContext(null);function u(){return r.useContext(a)!=null}function l(){return u()||i(),r.useContext(a).location}new Promise(()=>{});const m=()=>{const e=l();return r.useEffect(()=>{console.error("404 Error: User attempted to access non-existent route:",e.pathname)},[e.pathname]),t.jsx("div",{className:"flex min-h-screen items-center justify-center bg-muted",children:t.jsxs("div",{className:"text-center",children:[t.jsx("h1",{className:"mb-4 text-4xl font-bold",children:"404"}),t.jsx("p",{className:"mb-4 text-xl text-muted-foreground",children:"Oops! Page not found"}),t.jsx("a",{href:"/",className:"text-primary underline hover:text-primary/90",children:"Return to Home"})]})})};export{m as default};
