/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},i={},o={},r=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${r}--\x3e`,a=new RegExp(`${r}|${l}`);class h{constructor(e,t){this.parts=[],this.element=t;const s=[],n=[],i=document.createTreeWalker(t.content,133,null,!1);let o=0,l=-1,h=0;const{strings:d,values:{length:m}}=e;for(;h<m;){const e=i.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let n=0;for(let e=0;e<s;e++)u(t[e].name,"$lit$")&&n++;for(;n-- >0;){const t=d[h],s=p.exec(t)[2],n=s.toLowerCase()+"$lit$",i=e.getAttribute(n);e.removeAttribute(n);const o=i.split(a);this.parts.push({type:"attribute",index:l,name:s,strings:o}),h+=o.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(r)>=0){const n=e.parentNode,i=t.split(a),o=i.length-1;for(let t=0;t<o;t++){let s,o=i[t];if(""===o)s=c();else{const e=p.exec(o);null!==e&&u(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(o)}n.insertBefore(s,e),this.parts.push({type:"node",index:++l})}""===i[o]?(n.insertBefore(c(),e),s.push(e)):e.data=i[o],h+=o}}else if(8===e.nodeType)if(e.data===r){const t=e.parentNode;null!==e.previousSibling&&l!==o||(l++,t.insertBefore(c(),e)),o=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(s.push(e),l--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(r,t+1));)this.parts.push({type:"node",index:-1}),h++}}else i.currentNode=n.pop()}for(const e of s)e.parentNode.removeChild(e)}}const u=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},d=e=>-1!==e.index,c=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class m{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let o,r=0,l=0,a=i.nextNode();for(;r<n.length;)if(o=n[r],d(o)){for(;l<o.index;)l++,"TEMPLATE"===a.nodeName&&(t.push(a),i.currentNode=a.content),null===(a=i.nextNode())&&(i.currentNode=t.pop(),a=i.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return s&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const g=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),_=` ${r} `;class f{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let n=0;n<e;n++){const e=this.strings[n],i=e.lastIndexOf("\x3c!--");s=(i>-1||s)&&-1===e.indexOf("--\x3e",i+1);const o=p.exec(e);t+=null===o?e+(s?_:l):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+r}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==g&&(t=g.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class y{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new N(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let n="";for(let i=0;i<t;i++){n+=e[i];const t=s[i];if(void 0!==t){const e=t.value;if(v(e)||!x(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===i||v(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const e=this.value;this.value=i,e(this)}this.value!==i&&this.committer.commit()}}class w{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}const e=this.__pendingValue;e!==i&&(v(e)?e!==this.value&&this.__commitText(e):e instanceof f?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===o?(this.value=o,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const s=new m(t,e.processor,this.options),n=s._clone();s.update(e.values),this.__commitNode(n),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const i of e)s=t[n],void 0===s&&(s=new w(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(i),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class b{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i}}class V extends y{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends N{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class ${constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=this.__pendingValue,s=this.value,n=null==e||null!=s&&(e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive),o=null!=e&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;const S=new class{handleAttributeExpressions(e,t,s,n){const i=t[0];if("."===i){return new V(e,t.slice(1),s).parts}if("@"===i)return[new $(e,t.slice(1),n.eventContext)];if("?"===i)return[new b(e,t.slice(1),s)];return new y(e,t,s).parts}handleTextExpression(e){return new w(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function L(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(r);return s=t.keyString.get(n),void 0===s&&(s=new h(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const M=new Map,C=new WeakMap,k=(e,t,s)=>{let i=C.get(t);void 0===i&&(n(t,t.firstChild),C.set(t,i=new w(Object.assign({templateFactory:L},s))),i.appendInto(t)),i.setValue(e),i.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const B=(e,...t)=>new f(e,t,"html",S),H=[{name:"Google Docs",url:"https://docs.new"},{name:"Google Sheets",url:"https://sheets.new"},{name:"Google Slides",url:"https://slides.new"}];let I;const P=e=>{e.preventDefault();const t=e.target,s=document.getElementById("main"),n=document.getElementsByName("newName")[0],i=document.getElementsByName("newUrl")[0],o=n.value,r=i.value;let l=0;for(let e of t.elements)"name"==e.name&&(H[l].name=e.value),"url"==e.name&&(H[l].url=e.value,l++);if(""!=o&&""!=r&&H.push({name:o,url:r}),"delete"==e.submitter.name){const t=e.submitter.getAttribute("index");H.splice(t,1)}k(W(H),s);const a=btoa(JSON.stringify(H));history.pushState(null,"",`/${a}/`),I.href=`/${a}/manifest.json`,n.value="",i.value="",navigator.serviceWorker.register("sw.js")},W=e=>B`
  <form @submit=${P}>
    ${e.map(({name:e,url:t},s)=>B`
          <input type="text" name="name" value="${e}" />
          <input type="url" name="url" value="${t}" />
          <input
            type="submit"
            name="delete"
            index="${s}"
            value="x"
            title="Delete ${e}"
          />
        `)}

    <fieldset>
      <legend>Add New Shortcut</legend>
      <label for="newName">Name: </label>
      <input type="text" name="newName" value="" placeholder="Name of site" />
      <label for="newUrl">URL: </label>
      <input type="url" name="newUrl" value="" placeholder="https://..." />
    </fieldset>
    <button type="submit">Create Launcher</button>
  </form>
`;onload=()=>{const e=document.getElementById("main");I=document.getElementById("manifest");const t=/\/(.+)\//.exec(location.pathname);if(t&&t.length>1){const e=t[1];I.href=`/${e}/manifest.json`,H.length=0,Array.prototype.push.apply(H,JSON.parse(atob(e)))}k(W(H),e),navigator.serviceWorker.register("sw.js")};
//# sourceMappingURL=client.mjs.map
