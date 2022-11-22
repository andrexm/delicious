(()=>{"use strict";class LunarElement{pure;constructor(e){this.pure="object"!=typeof e?document.querySelector(e):e}get type(){return this.pure.nodeName.toLowerCase()}get id(){return this.pure.id}html(e=null){if(!e)return this.pure.innerHTML;this.pure.innerHTML=e}text(e=null){if(!e)return this.pure.textContent;this.pure.textContent=e}attr(e,t=null){return t?(this.pure.setAttribute(e,t),this):this.pure.getAttribute(e)}hasAttr(){let e=!0;return Array.from(arguments).forEach((t=>{e=e&&this.pure.hasAttribute(t)})),e}removeAttr(e){return this.pure.removeAttribute(e),this}matches(e){return this.pure.matches(e)}event(e,t){this.pure.addEventListener(e,(e=>{t(e)}))}get width(){return this.pure.clientWidth}get height(){return this.pure.clientHeight}toggle(){return lunar.toggle(this),this}appear(e=null){return e?this.pure.scrollIntoView(e):this.pure.scrollIntoView(),this}click(){return this.pure.click(),this}parent(e=1){let t=this.pure;do{t=t.parentElement,e--}while(e>0);return lunar.el(t)}get nodes(){return this.pure.childNodes}get children(){let e=Array.from(this.pure.children),t=[];return e.forEach((e=>{t=[...t,lunar.el(e)]})),t}get firstEl(){return lunar.el(this.pure.firstElementChild)}get lastEl(){return lunar.el(this.pure.lastElementChild)}get firstNode(){return this.pure.firstChild}get lastNode(){return this.pure.lastChild}sibling(e=1){let t=this.pure;if(e>0)do{t=t.nextSibling,e--}while(e>0);if(e<0)do{t=t.previousSibling,e++}while(e<0);return t instanceof Element?lunar.el(t):t}after(){return lunar.iterate(Array.from(arguments),(e=>{this.pure.after(e)})),this}before(){return lunar.iterate(Array.from(arguments),(e=>{this.pure.before(e)})),this}append(){return lunar.iterate(Array.from(arguments),(e=>{this.pure.append(e)})),this}prepend(){return lunar.iterate(Array.from(arguments),(e=>{this.pure.prepend(e)})),this}el(e){return lunar.el(e)}all(e,t=!1){let r=Array.from(this.pure.querySelectorAll(e));if(t)return r;let s=[];return r.forEach((e=>{s=[...s,lunar.el(e)]})),s}contains(e){return e=lunar.isPure(e)?e:e.pure,this.pure.contains(e)}hasClass(e){return this.pure.classList.contains(e)}addClass(e){return this.pure.classList.add(e),this}removeClass(e){return this.pure.classList.remove(e),this}toggleClass(){return Array.from(arguments).forEach((e=>{this.pure.classList.toggle(e)})),this}get classList(){return this.pure.classList}}const e=[{name:"date",action(e,t){let r=new Date(1e3*Number(t)),s=r.getUTCDate(),i=Number(r.getMonth())+1;return Number(s)<10&&(s="0"+s),String(i)<10&&(i="0"+i),s+"/"+i+"/"+r.getUTCFullYear()}},{name:"hour",action(e,t){let r=new Date(Number(t));return r.getUTCHours()+":"+r.getUTCMinutes()}},{name:"percent",action:(e,t,r)=>(t=String(100*Number(t)),r.length>0&&(t=t.replace(".",r[0])),t+"%")}],t={showElement(e,t=!0){e.style.transition="0.3s",t?(e.classList.remove("lunar-hidden"),setTimeout((()=>{e.classList.remove("lunar-opacity-0")}),0)):(e.classList.add("lunar-opacity-0"),e.style.transition="0.3s",setTimeout((()=>e.classList.add("lunar-hidden")),300))},hideableElementsStart(){this.hideable=Array.from(document.querySelectorAll("[hideable]")),this.hideable.forEach((e=>{e.classList.contains("l-hes")||(e.classList.add("lunar-hidden"),e.classList.add("lunar-opacity-0"),e.classList.add("l-hes"))}))},hideControllersStart(){this.hideControllers=Array.from(document.querySelectorAll("[data-toggle]")),this.hideControllers.forEach((e=>{e.classList.contains("l-shc")||(e.addEventListener("click",(()=>{let t=new LunarElement(e.dataset.toggle).pure,r=t.classList.contains("lunar-hidden");this.showElement(t,r),this.clickOutside(t,(r=>{let s=Array.from(document.querySelectorAll(`[data-toggle='${e.dataset.toggle}']`)),i=!1;s.forEach((e=>{i=i||r.target===e||e.contains(r.target)})),i||this.showElement(t,!1)}))})),e.classList.add("l-shc"))}))},clickOutside(e,t){e.classList.contains("rcoutside")||(e.classList.add("rcoutside"),document.addEventListener("click",(r=>{e.contains(r.target)||e===r.target||t(r)})))},hideOnLeave(){Array.from(document.querySelectorAll("[hideOnMouseLeave]")).forEach((e=>{e.classList.contains("l-shol")||(e.setAttribute("tabindex","0"),e.addEventListener("mouseleave",(()=>{this.showElement(e,!1)})),e.classList.add("l-shol"))}))},hideOnClickOutside(){Array.from(document.querySelectorAll("[hideOnClickOutside]")).forEach((e=>{e.classList.contains("l-hoco")||(e.setAttribute("tabindex","0"),document.addEventListener("click",(t=>{e.parentNode.contains(t.target)||e===document.activeElement||e.contains(document.activeElement)||e.classList.contains("lunar-hidden")||this.showElement(e,!1)})),e.classList.add("l-hoco"))}))},dynamicLinks(){Array.from(document.querySelectorAll("[link]")).forEach((e=>{e.classList.contains("l-dl")||(e.style.cursor="pointer",e.addEventListener("click",(()=>{location.href=e.getAttribute("link")})),e.classList.add("l-dl"))}))},loadModifiers(t){let r=Array.from(document.querySelectorAll("[mod]")),s=t??e;r.forEach((e=>{if(e.classList.contains("l-mod"))return;let t=e.getAttribute("mod").split("|");t.splice(0,1);let r=s.find((t=>t.name==e.getAttribute("mod").split("|")[0]));r&&(e.innerHTML=r.action(e,e.textContent,t),e.classList.add("l-mod"))}))}};class Store{state={};storeName="lunarStore";constructor(){this.startState()}startState(){let e=localStorage.getItem(this.storeName)??"{}";e=JSON.parse(e),this.state=e}save(e,t){this.state[e]=t,localStorage.setItem(this.storeName,JSON.stringify(this.state))}remove(e){delete this.state[e],localStorage.setItem(this.storeName,JSON.stringify(this.state))}get(e){return this.state[e]}}window.lunar=new class Lunar{modifiers=[];store;custom=[];constructor(){this.store=new Store,this.loadHelpers(),window.addEventListener("load",(()=>{let e=lunar.el("ln-back-loader");e&&e.toggle()}))}isPure(e){return!(e instanceof LunarElement)}iterate(e,t){e.forEach((e=>{e=lunar.isPure(e)?e:e.pure,t(e)}))}el(e){let t=new LunarElement(e);return t.pure?t:null}all(e,t=!1){let r=Array.from(document.querySelectorAll(e));if(t)return r;let s=[];return r.forEach((e=>{s=[...s,new LunarElement(e)]})),s}create(e){let t=document.createElement(e);return this.el(t)}hide(e){return this.isPure(e)?t.showElement(e,!1):t.showElement(e.pure,!1)}show(e){return this.isPure(e)?t.showElement(e):t.showElement(e.pure)}appear(e,t=null){return lunar.el(e).appear(t)}toggle(){Array.from(arguments).forEach((e=>{let t=this.isPure(e)?e:e.pure;t.classList.contains("lunar-hidden")?this.show(t):this.hide(t)}))}clickOut(e,r){t.clickOutside(this.isPure(e)?e:e.pure,r)}register(e,t=!0){e.forEach((e=>{t&&(this.custom=[...this.custom,e]),Array.from(document.querySelectorAll(e.selector)).forEach((t=>{if(t.innerHTML=e.html,t.dataset.class){let e=t.firstElementChild;t.dataset.class.split(" ").forEach((t=>{e.classList.add(t)}))}}))})),this.loadHelpers()}registerMods(e){this.modifiers=[...this.modifiers,...e],t.loadModifiers(this.modifiers)}loadHelpers(){t.hideControllersStart(),t.hideableElementsStart(),t.hideOnLeave(),t.dynamicLinks(),t.hideOnClickOutside(),t.loadModifiers(),t.loadModifiers(this.modifiers)}loadUtils(){this.register(this.custom,!1)}}})();