var Fg="1.1.18";function qd(r,t,e){return Math.max(r,Math.min(t,e))}function Ng(r,t,e){return(1-e)*r+e*t}function zg(r,t,e,n){return Ng(r,t,1-Math.exp(-e*n))}function kg(r,t){return(r%t+t)%t}var Ug=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(r){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const e=qd(0,this.currentTime/this.duration,1);t=e>=1;const n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=zg(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=a}};function Bg(r,t){let e;return function(...n){let i=this;clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(i,n)},t)}}var Vg=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){this.wrapper=r,this.content=t,e&&(this.debouncedResize=Bg(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Yd=class{events={};emit(r,...t){let e=this.events[r]||[];for(let n=0,i=e.length;n<i;n++)e[n]?.(...t)}on(r,t){return this.events[r]?.push(t)||(this.events[r]=[t]),()=>{this.events[r]=this.events[r]?.filter(e=>t!==e)}}off(r,t){this.events[r]=this.events[r]?.filter(e=>t!==e)}destroy(){this.events={}}},Eh=100/6,qi={passive:!1},Gg=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,qi),this.element.addEventListener("touchstart",this.onTouchStart,qi),this.element.addEventListener("touchmove",this.onTouchMove,qi),this.element.addEventListener("touchend",this.onTouchEnd,qi)}touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Yd;on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,qi),this.element.removeEventListener("touchstart",this.onTouchStart,qi),this.element.removeEventListener("touchmove",this.onTouchMove,qi),this.element.removeEventListener("touchend",this.onTouchEnd,qi)}onTouchStart=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})};onTouchMove=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})};onTouchEnd=r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})};onWheel=r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=n===1?Eh:n===2?this.window.width:1,s=n===1?Eh:n===2?this.window.height:1;t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},Aw=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;__rafID=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new Ug;emitter=new Yd;dimensions;virtualScroll;constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:a=35,duration:o,easing:l=y=>Math.min(1,1.001-Math.pow(2,-10*y)),lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f="vertical",touchMultiplier:p=1,wheelMultiplier:g=1,autoResize:d=!0,prevent:m,virtualScroll:_,overscroll:M=!0,autoRaf:w=!1,__experimental__naiveDimensions:x=!1}={}){window.lenisVersion=Fg,(!r||r===document.documentElement||r===document.body)&&(r=window),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:a,duration:o,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:p,wheelMultiplier:g,autoResize:d,prevent:m,virtualScroll:_,overscroll:M,autoRaf:w,__experimental__naiveDimensions:x},this.dimensions=new Vg(r,t,{autoResize:d}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Gg(e,{touchMultiplier:p,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}setScroll(r){this.isHorizontal?this.rootElement.scrollLeft=r:this.rootElement.scrollTop=r}onPointerDown=r=>{r.button===1&&this.reset()};onVirtualScroll=r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(a||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>m instanceof HTMLElement&&(typeof u=="function"&&u?.(m)||m.hasAttribute?.("data-lenis-prevent")||i&&m.hasAttribute?.("data-lenis-prevent-touch")||s&&m.hasAttribute?.("data-lenis-prevent-wheel"))))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=e;this.options.gestureOrientation==="both"?f=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(f=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const p=i&&this.options.syncTouch,d=i&&n.type==="touchend"&&Math.abs(f)>5;d&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...p?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}raf=r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))};scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:a=this.options.lerp,onStart:o,onComplete:l,force:c=!1,programmatic:u=!0,userData:h}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&r?.nodeType&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();t-=this.isHorizontal?g.left:g.top}const p=f.getBoundingClientRect();r=(this.isHorizontal?p.left:p.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=t,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=qd(0,r,this.limit),r===this.targetScroll){o?.(this),l?.(this);return}if(this.userData=h??{},e){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l?.(this),this.userData={};return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:a,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",o?.(this)},onUpdate:(f,p)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),p||this.emit(),p&&(this.reset(),this.emit(),l?.(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?kg(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};function Ri(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function $d(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Dn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Hs={duration:.5,overwrite:!1,delay:0},zu,Xe,de,Bn=1e8,ce=1/Bn,Gc=Math.PI*2,Hg=Gc/4,Wg=0,jd=Math.sqrt,Xg=Math.cos,qg=Math.sin,Fe=function(t){return typeof t=="string"},ye=function(t){return typeof t=="function"},Gi=function(t){return typeof t=="number"},ku=function(t){return typeof t>"u"},bi=function(t){return typeof t=="object"},fn=function(t){return t!==!1},Uu=function(){return typeof window<"u"},ia=function(t){return ye(t)||Fe(t)},Zd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},qe=Array.isArray,Hc=/(?:-?\.?\d|\.)+/gi,Kd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,As=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Gl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Jd=/[+-]=-?[.\d]+/,Qd=/[^,'"\[\]\s]+/gi,Yg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,_e,hi,Wc,Bu,Rn={},nl={},tp,ep=function(t){return(nl=Zr(t,Rn))&&gn},Vu=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Fo=function(t,e){return!e&&console.warn(t)},np=function(t,e){return t&&(Rn[t]=e)&&nl&&(nl[t]=e)||Rn},No=function(){return 0},$g={suppressEvents:!0,isStart:!0,kill:!1},Va={suppressEvents:!0,kill:!1},jg={suppressEvents:!0},Gu={},lr=[],Xc={},ip,wn={},Hl={},Ch=30,Ga=[],Hu="",Wu=function(t){var e=t[0],n,i;if(bi(e)||ye(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Ga.length;i--&&!Ga[i].targetTest(e););n=Ga[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Cp(t[i],n)))||t.splice(i,1);return t},Ur=function(t){return t._gsap||Wu(Vn(t))[0]._gsap},rp=function(t,e,n){return(n=t[e])&&ye(n)?t[e]():ku(n)&&t.getAttribute&&t.getAttribute(e)||n},dn=function(t,e){return(t=t.split(",")).forEach(e)||t},be=function(t){return Math.round(t*1e5)/1e5||0},Oe=function(t){return Math.round(t*1e7)/1e7||0},Is=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},Zg=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},il=function(){var t=lr.length,e=lr.slice(0),n,i;for(Xc={},lr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},sp=function(t,e,n,i){lr.length&&!Xe&&il(),t.render(e,n,Xe&&e<0&&(t._initted||t._startAt)),lr.length&&!Xe&&il()},op=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Qd).length<2?e:Fe(t)?t.trim():t},ap=function(t){return t},Hn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Kg=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Zr=function(t,e){for(var n in e)t[n]=e[n];return t},Ah=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=bi(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},rl=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},bo=function(t){var e=t.parent||_e,n=t.keyframes?Kg(qe(t.keyframes)):Hn;if(fn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Jg=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},lp=function(t,e,n,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},wl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},mr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Br=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Qg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},qc=function(t,e,n,i){return t._startAt&&(Xe?t._startAt.revert(Va):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},t_=function r(t){return!t||t._ts&&r(t.parent)},Lh=function(t){return t._repeat?Ws(t._tTime,t=t.duration()+t._rDelay)*t:0},Ws=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},sl=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Tl=function(t){return t._end=Oe(t._start+(t._tDur/Math.abs(t._ts||t._rts||ce)||0))},El=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Oe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Tl(t),n._dirty||Br(n,t)),t},cp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=sl(t.rawTime(),e),(!e._dur||jo(0,e.totalDuration(),n)-e._tTime>ce)&&e.render(n,!0)),Br(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ce}},pi=function(t,e,n,i){return e.parent&&mr(e),e._start=Oe((Gi(n)?n:n||t!==_e?Nn(t,n,e):t._time)+e._delay),e._end=Oe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),lp(t,e,"_first","_last",t._sort?"_start":0),Yc(e)||(t._recent=e),i||cp(t,e),t._ts<0&&El(t,t._tTime),t},up=function(t,e){return(Rn.ScrollTrigger||Vu("scrollTrigger",e))&&Rn.ScrollTrigger.create(e,t)},hp=function(t,e,n,i,s){if(qu(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Xe&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&ip!==Tn.frame)return lr.push(t),t._lazy=[s,i],1},e_=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Yc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},n_=function(t,e,n,i){var s=t.ratio,a=e<0||!e&&(!t._start&&e_(t)&&!(!t._initted&&Yc(t))||(t._ts<0||t._dp._ts<0)&&!Yc(t))?0:1,o=t._rDelay,l=0,c,u,h;if(o&&t._repeat&&(l=jo(0,t._tDur,e),u=Ws(l,o),t._yoyo&&u&1&&(a=1-a),u!==Ws(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||Xe||i||t._zTime===ce||!e&&t._zTime){if(!t._initted&&hp(t,e,i,n,l))return;for(h=t._zTime,t._zTime=e||(n?ce:0),n||(n=e&&!h),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&qc(t,e,n,!0),t._onUpdate&&!n&&Ln(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Ln(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&mr(t,1),!n&&!Xe&&(Ln(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},i_=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Xs=function(t,e,n,i){var s=t._repeat,a=Oe(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:Oe(a*(s+1)+t._rDelay*s):a,o>0&&!i&&El(t,t._tTime=t._tDur*o),t.parent&&Tl(t),n||Br(t.parent,t),t},Dh=function(t){return t instanceof tn?Br(t):Xs(t,t._dur)},r_={_start:0,endTime:No,totalDuration:No},Nn=function r(t,e,n){var i=t.labels,s=t._recent||r_,a=t.duration()>=Bn?s.endTime(!1):t._dur,o,l,c;return Fe(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(qe(n)?n[0]:n).totalDuration()),o>1?r(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},wo=function(t,e,n){var i=Gi(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=fn(l.vars.inherit)&&l.parent;a.immediateRender=fn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Ce(e[0],a,e[s+1])},xr=function(t,e){return t||t===0?e(t):e},jo=function(t,e,n){return n<t?t:n>e?e:n},He=function(t,e){return!Fe(t)||!(e=Yg.exec(t))?"":e[1]},s_=function(t,e,n){return xr(n,function(i){return jo(t,e,i)})},$c=[].slice,fp=function(t,e){return t&&bi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&bi(t[0]))&&!t.nodeType&&t!==hi},o_=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Fe(i)&&!e||fp(i,1)?(s=n).push.apply(s,Vn(i)):n.push(i)})||n},Vn=function(t,e,n){return de&&!e&&de.selector?de.selector(t):Fe(t)&&!n&&(Wc||!qs())?$c.call((e||Bu).querySelectorAll(t),0):qe(t)?o_(t,n):fp(t)?$c.call(t,0):t?[t]:[]},jc=function(t){return t=Vn(t)[0]||Fo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Vn(e,n.querySelectorAll?n:n===t?Fo("Invalid scope")||Bu.createElement("div"):t)}},dp=function(t){return t.sort(function(){return .5-Math.random()})},pp=function(t){if(ye(t))return t;var e=bi(t)?t:{each:t},n=Vr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,u=i,h=i;return Fe(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(u=i[0],h=i[1]),function(f,p,g){var d=(g||e).length,m=a[d],_,M,w,x,y,E,A,v,S;if(!m){if(S=e.grid==="auto"?0:(e.grid||[1,Bn])[1],!S){for(A=-Bn;A<(A=g[S++].getBoundingClientRect().left)&&S<d;);S<d&&S--}for(m=a[d]=[],_=l?Math.min(S,d)*u-.5:i%S,M=S===Bn?0:l?d*h/S-.5:i/S|0,A=0,v=Bn,E=0;E<d;E++)w=E%S-_,x=M-(E/S|0),m[E]=y=c?Math.abs(c==="y"?x:w):jd(w*w+x*x),y>A&&(A=y),y<v&&(v=y);i==="random"&&dp(m),m.max=A-v,m.min=v,m.v=d=(parseFloat(e.amount)||parseFloat(e.each)*(S>d?d-1:c?c==="y"?d/S:S:Math.max(S,d/S))||0)*(i==="edges"?-1:1),m.b=d<0?s-d:s,m.u=He(e.amount||e.each)||0,n=n&&d<0?wp(n):n}return d=(m[f]-m.min)/m.max||0,Oe(m.b+(n?n(d):d)*m.v)+m.u}},Zc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Oe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Gi(n)?0:He(n))}},mp=function(t,e){var n=qe(t),i,s;return!n&&bi(t)&&(i=n=t.radius||Bn,t.values?(t=Vn(t.values),(s=!Gi(t[0]))&&(i*=i)):t=Zc(t.increment)),xr(e,n?ye(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Bn,u=0,h=t.length,f,p;h--;)s?(f=t[h].x-o,p=t[h].y-l,f=f*f+p*p):f=Math.abs(t[h]-o),f<c&&(c=f,u=h);return u=!i||c<=i?t[u]:a,s||u===a||Gi(a)?u:u+He(a)}:Zc(t))},gp=function(t,e,n,i){return xr(qe(t)?!e:n===!0?!!(n=0):!i,function(){return qe(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},a_=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,a){return a(s)},i)}},l_=function(t,e){return function(n){return t(parseFloat(n))+(e||He(n))}},c_=function(t,e,n){return xp(t,e,0,1,n)},_p=function(t,e,n){return xr(n,function(i){return t[~~e(i)]})},u_=function r(t,e,n){var i=e-t;return qe(t)?_p(t,r(0,t.length),e):xr(n,function(s){return(i+(s-t)%i)%i+t})},h_=function r(t,e,n){var i=e-t,s=i*2;return qe(t)?_p(t,r(0,t.length-1),e):xr(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},zo=function(t){for(var e=0,n="",i,s,a,o;~(i=t.indexOf("random(",e));)a=t.indexOf(")",i),o=t.charAt(i+7)==="[",s=t.substr(i+7,a-i-7).match(o?Qd:Hc),n+=t.substr(e,i-e)+gp(o?s:+s[0],o?0:+s[1],+s[2]||1e-5),e=a+1;return n+t.substr(e,t.length-e)},xp=function(t,e,n,i,s){var a=e-t,o=i-n;return xr(s,function(l){return n+((l-t)/a*o||0)})},f_=function r(t,e,n,i){var s=isNaN(t+e)?0:function(p){return(1-p)*t+p*e};if(!s){var a=Fe(t),o={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(qe(t)&&!qe(e)){for(u=[],h=t.length,f=h-2,c=1;c<h;c++)u.push(r(t[c-1],t[c]));h--,s=function(g){g*=h;var d=Math.min(f,~~g);return u[d](g-d)},n=e}else i||(t=Zr(qe(t)?[]:{},t));if(!u){for(l in e)Xu.call(o,t,l,"get",e[l]);s=function(g){return ju(g,o)||(a?t.p:t)}}}return xr(n,s)},Ph=function(t,e,n){var i=t.labels,s=Bn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Ln=function(t,e,n){var i=t.vars,s=i[e],a=de,o=t._ctx,l,c,u;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&lr.length&&il(),o&&(de=o),u=l?s.apply(c,l):s.call(c),de=a,u},po=function(t){return mr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Xe),t.progress()<1&&Ln(t,"onInterrupt"),t},Ls,vp=[],yp=function(t){if(t)if(t=!t.name&&t.default||t,Uu()||t.headless){var e=t.name,n=ye(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:No,render:ju,add:Xu,kill:A_,modifier:C_,rawVars:0},a={targetTest:0,get:0,getSetter:$u,aliases:{},register:0};if(qs(),t!==i){if(wn[e])return;Hn(i,Hn(rl(t,s),a)),Zr(i.prototype,Zr(s,rl(t,a))),wn[i.prop=e]=i,t.targetTest&&(Ga.push(i),Gu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}np(e,i),t.register&&t.register(gn,i,pn)}else vp.push(t)},ae=255,mo={aqua:[0,ae,ae],lime:[0,ae,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ae],navy:[0,0,128],white:[ae,ae,ae],olive:[128,128,0],yellow:[ae,ae,0],orange:[ae,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ae,0,0],pink:[ae,192,203],cyan:[0,ae,ae],transparent:[ae,ae,ae,0]},Wl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ae+.5|0},Mp=function(t,e,n){var i=t?Gi(t)?[t>>16,t>>8&ae,t&ae]:0:mo.black,s,a,o,l,c,u,h,f,p,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),mo[t])i=mo[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ae,i&ae,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ae,t&ae]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(Hc),!e)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=Wl(l+1/3,s,a),i[1]=Wl(l,s,a),i[2]=Wl(l-1/3,s,a);else if(~t.indexOf("="))return i=t.match(Kd),n&&i.length<4&&(i[3]=1),i}else i=t.match(Hc)||mo.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/ae,a=i[1]/ae,o=i[2]/ae,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?l=c=0:(p=h-f,c=u>.5?p/(2-h-f):p/(h+f),l=h===s?(a-o)/p+(a<o?6:0):h===a?(o-s)/p+2:(s-a)/p+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Sp=function(t){var e=[],n=[],i=-1;return t.split(cr).forEach(function(s){var a=s.match(As)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},Rh=function(t,e,n){var i="",s=(t+i).match(cr),a=e?"hsla(":"rgba(",o=0,l,c,u,h;if(!s)return t;if(s=s.map(function(f){return(f=Mp(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Sp(t),l=n.c,l.join(i)!==u.c.join(i)))for(c=t.replace(cr,"1").split(As),h=c.length-1;o<h;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(cr),h=c.length-1;o<h;o++)i+=c[o]+s[o];return i+c[h]},cr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in mo)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),d_=/hsl[a]?\(/,bp=function(t){var e=t.join(" "),n;if(cr.lastIndex=0,cr.test(e))return n=d_.test(e),t[1]=Rh(t[1],n),t[0]=Rh(t[0],n,Sp(t[1])),!0},ko,Tn=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,u,h,f,p,g=function d(m){var _=r()-i,M=m===!0,w,x,y,E;if((_>t||_<0)&&(n+=_-e),i+=_,y=i-n,w=y-a,(w>0||M)&&(E=++h.frame,f=y-h.time*1e3,h.time=y=y/1e3,a+=w+(w>=s?4:s-w),x=1),M||(l=c(d)),x)for(p=0;p<o.length;p++)o[p](y,f,E,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){tp&&(!Wc&&Uu()&&(hi=Wc=window,Bu=hi.document||{},Rn.gsap=gn,(hi.gsapVersions||(hi.gsapVersions=[])).push(gn.version),ep(nl||hi.GreenSockGlobals||!hi.gsap&&hi||{}),vp.forEach(yp)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,a-h.time*1e3+1|0)},ko=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ko=0,c=No},lagSmoothing:function(m,_){t=m||1/0,e=Math.min(_||33,t)},fps:function(m){s=1e3/(m||240),a=h.time*1e3+s},add:function(m,_,M){var w=_?function(x,y,E,A){m(x,y,E,A),h.remove(w)}:m;return h.remove(m),o[M?"unshift":"push"](w),qs(),w},remove:function(m,_){~(_=o.indexOf(m))&&o.splice(_,1)&&p>=_&&p--},_listeners:o},h}(),qs=function(){return!ko&&Tn.wake()},ee={},p_=/^[\d.\-M][\d.\-,\s]/,m_=/["']/g,g_=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(m_,"").trim():+c,i=l.substr(o+1).trim();return e},__=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},x_=function(t){var e=(t+"").split("("),n=ee[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[g_(e[1])]:__(t).split(",").map(op)):ee._CE&&p_.test(t)?ee._CE("",t):n},wp=function(t){return function(e){return 1-t(1-e)}},Tp=function r(t,e){for(var n=t._first,i;n;)n instanceof tn?r(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?r(n.timeline,e):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=e)),n=n._next},Vr=function(t,e){return t&&(ye(t)?t:ee[t]||x_(t))||e},rs=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},a;return dn(t,function(o){ee[o]=Rn[o]=s,ee[a=o.toLowerCase()]=n;for(var l in s)ee[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ee[o+"."+l]=s[l]}),s},Ep=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Xl=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/Gc*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*qg((u-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Ep(o);return s=Gc/s,l.config=function(c,u){return r(t,c,u)},l},ql=function r(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Ep(n);return i.config=function(s){return r(t,s)},i};dn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;rs(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ee.Linear.easeNone=ee.none=ee.Linear.easeIn;rs("Elastic",Xl("in"),Xl("out"),Xl());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(o){return o<e?r*o*o:o<n?r*Math.pow(o-1.5/t,2)+.75:o<i?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};rs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);rs("Expo",function(r){return r?Math.pow(2,10*(r-1)):0});rs("Circ",function(r){return-(jd(1-r*r)-1)});rs("Sine",function(r){return r===1?1:-Xg(r*Hg)+1});rs("Back",ql("in"),ql("out"),ql());ee.SteppedEase=ee.steps=Rn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,a=1-ce;return function(o){return((i*jo(0,a,o)|0)+s)*n}}};Hs.ease=ee["quad.out"];dn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Hu+=r+","+r+"Params,"});var Cp=function(t,e){this.id=Wg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:rp,this.set=e?e.getSetter:$u},Uo=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Xs(this,+e.duration,1,1),this.data=e.data,de&&(this._ctx=de,de.data.push(this)),ko||Tn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Xs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(qs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(El(this,n),!s._dp||s.parent||cp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&pi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ce||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),sp(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Lh(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Lh(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Ws(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-ce?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?sl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ce?0:this._rts,this.totalTime(jo(-Math.abs(this._delay),this._tDur,s),i!==!1),Tl(this),Qg(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(qs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ce&&(this._tTime-=ce)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&pi(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(fn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?sl(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=jg);var i=Xe;return Xe=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Xe=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Dh(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Dh(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Nn(this,n),fn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,fn(i))},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ce:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ce,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-ce)},t.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this;return new Promise(function(s){var a=ye(n)?n:ap,o=function(){var c=i.then;i.then=null,ye(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=c),s(a),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?o():i._prom=o})},t.kill=function(){po(this)},r}();Hn(Uo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ce,_prom:0,_ps:!1,_rts:1});var tn=function(r){$d(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=fn(n.sortChildren),_e&&pi(n.parent||_e,Ri(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&up(Ri(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return wo(0,arguments,this),this},e.from=function(i,s,a){return wo(1,arguments,this),this},e.fromTo=function(i,s,a,o){return wo(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,bo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ce(i,s,Nn(this,a),1),this},e.call=function(i,s,a){return pi(this,Ce.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Ce(i,a,Nn(this,l)),this},e.staggerFrom=function(i,s,a,o,l,c,u){return a.runBackwards=1,bo(a).immediateRender=fn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,u)},e.staggerFromTo=function(i,s,a,o,l,c,u,h){return o.startAt=a,bo(o).immediateRender=fn(o.immediateRender),this.staggerTo(i,s,o,l,c,u,h)},e.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Oe(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,p,g,d,m,_,M,w,x,y,E,A;if(this!==_e&&u>l&&i>=0&&(u=l),u!==this._tTime||a||h){if(o!==this._time&&c&&(u+=this._time-o,i+=this._time-o),f=u,x=this._start,w=this._ts,_=!w,h&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,a);if(f=Oe(u%m),u===l?(d=this._repeat,f=c):(d=~~(u/m),d&&d===u/m&&(f=c,d--),f>c&&(f=c)),y=Ws(this._tTime,m),!o&&this._tTime&&y!==d&&this._tTime-y*m-this._dur<=0&&(y=d),E&&d&1&&(f=c-f,A=1),d!==y&&!this._lock){var v=E&&y&1,S=v===(E&&d&1);if(d<y&&(v=!v),o=v?0:u%c?c:u,this._lock=1,this.render(o||(A?0:Oe(d*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Ln(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),o&&o!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,o=v?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;Tp(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=i_(this,Oe(o),Oe(f)),M&&(u-=f-(f=M._start))),this._tTime=u,this._time=f,this._act=!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&f&&!s&&!d&&(Ln(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(p=this._first;p;){if(g=p._next,(p._act||f>=p._start)&&p._ts&&M!==p){if(p.parent!==this)return this.render(i,s,a);if(p.render(p._ts>0?(f-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(f-p._start)*p._ts,s,a),f!==this._time||!this._ts&&!_){M=0,g&&(u+=this._zTime=-ce);break}}p=g}else{p=this._last;for(var D=i<0?i:f;p;){if(g=p._prev,(p._act||D<=p._end)&&p._ts&&M!==p){if(p.parent!==this)return this.render(i,s,a);if(p.render(p._ts>0?(D-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(D-p._start)*p._ts,s,a||Xe&&(p._initted||p._startAt)),f!==this._time||!this._ts&&!_){M=0,g&&(u+=this._zTime=D?-ce:ce);break}}p=g}}if(M&&!s&&(this.pause(),M.render(f>=o?0:-ce)._zTime=f>=o?1:-1,this._ts))return this._start=x,Tl(this),this.render(i,s,a);this._onUpdate&&!s&&Ln(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(x===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&mr(this,1),!s&&!(i<0&&!o)&&(u||o||!l)&&(Ln(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(Gi(s)||(s=Nn(this,s,i)),!(i instanceof Uo)){if(qe(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Fe(i))return this.addLabel(i,s);if(ye(i))i=Ce.delayedCall(0,i);else return this}return this!==i?pi(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Bn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ce?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return Fe(i)?this.removeLabel(i):ye(i)?this.killTweensOf(i):(wl(this,i),i===this._recent&&(this._recent=this._last),Br(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Oe(Tn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Nn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=Ce.delayedCall(0,s||No,a);return o.data="isPause",this._hasPause=1,pi(this,o,Nn(this,i))},e.removePause=function(i){var s=this._first;for(i=Nn(this,i);s;)s._start===i&&s.data==="isPause"&&mr(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)nr!==o[l]&&o[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Vn(i),l=this._first,c=Gi(s),u;l;)l instanceof Ce?Zg(l._targets,o)&&(c?(!nr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=Nn(a,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,p,g=Ce.to(a,Hn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ce,onStart:function(){if(a.pause(),!p){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==m&&Xs(g,m,0,1).render(g._time,!0,!0),p=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,Hn({startAt:{time:Nn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Ph(this,Nn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Ph(this,Nn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ce)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);for(var o=this._first,l=this.labels,c;o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Br(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Br(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,l=Bn,c,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,pi(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=u/a._ts,a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Xs(a,a===_e&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(_e._ts&&(sp(_e,sl(i,_e)),ip=Tn.frame),Tn.frame>=Ch){Ch+=Dn.autoSleep||120;var s=_e._first;if((!s||!s._ts)&&Dn.autoSleep&&Tn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Tn.sleep()}}},t}(Uo);Hn(tn.prototype,{_lock:0,_hasPause:0,_forcing:0});var v_=function(t,e,n,i,s,a,o){var l=new pn(this._pt,t,e,0,1,Ip,null,s),c=0,u=0,h,f,p,g,d,m,_,M;for(l.b=n,l.e=i,n+="",i+="",(_=~i.indexOf("random("))&&(i=zo(i)),a&&(M=[n,i],a(M,t,e),n=M[0],i=M[1]),f=n.match(Gl)||[];h=Gl.exec(i);)g=h[0],d=i.substring(c,h.index),p?p=(p+1)%5:d.substr(-5)==="rgba("&&(p=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:d||u===1?d:",",s:m,c:g.charAt(1)==="="?Is(m,g)-m:parseFloat(g)-m,m:p&&p<4?Math.round:0},c=Gl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(Jd.test(i)||_)&&(l.e=0),this._pt=l,l},Xu=function(t,e,n,i,s,a,o,l,c,u){ye(i)&&(i=i(s||0,t,a));var h=t[e],f=n!=="get"?n:ye(h)?c?t[e.indexOf("set")||!ye(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():h,p=ye(h)?c?w_:Pp:Yu,g;if(Fe(i)&&(~i.indexOf("random(")&&(i=zo(i)),i.charAt(1)==="="&&(g=Is(f,i)+(He(f)||0),(g||g===0)&&(i=g))),!u||f!==i||Kc)return!isNaN(f*i)&&i!==""?(g=new pn(this._pt,t,e,+f||0,i-(f||0),typeof h=="boolean"?E_:Rp,0,p),c&&(g.fp=c),o&&g.modifier(o,this,t),this._pt=g):(!h&&!(e in t)&&Vu(e,i),v_.call(this,t,e,f,i,p,l||Dn.stringFilter,c))},y_=function(t,e,n,i,s){if(ye(t)&&(t=To(t,s,e,n,i)),!bi(t)||t.style&&t.nodeType||qe(t)||Zd(t))return Fe(t)?To(t,s,e,n,i):t;var a={},o;for(o in t)a[o]=To(t[o],s,e,n,i);return a},Ap=function(t,e,n,i,s,a){var o,l,c,u;if(wn[t]&&(o=new wn[t]).init(s,o.rawVars?e[t]:y_(e[t],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new pn(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==Ls))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},nr,Kc,qu=function r(t,e,n){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,p=i.autoRevert,g=t._dur,d=t._startAt,m=t._targets,_=t.parent,M=_&&_.data==="nested"?_.vars.targets:m,w=t._overwrite==="auto"&&!zu,x=t.timeline,y,E,A,v,S,D,R,F,$,I,V,z,U;if(x&&(!f||!s)&&(s="none"),t._ease=Vr(s,Hs.ease),t._yEase=h?wp(Vr(h===!0?s:h,Hs.ease)):0,h&&t._yoyo&&!t._repeat&&(h=t._yEase,t._yEase=t._ease,t._ease=h),t._from=!x&&!!i.runBackwards,!x||f&&!i.stagger){if(F=m[0]?Ur(m[0]).harness:0,z=F&&i[F.prop],y=rl(i,Gu),d&&(d._zTime<0&&d.progress(1),e<0&&u&&o&&!p?d.render(-1,!0):d.revert(u&&g?Va:$g),d._lazy=0),a){if(mr(t._startAt=Ce.set(m,Hn({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!d&&fn(l),startAt:null,delay:0,onUpdate:c&&function(){return Ln(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Xe||!o&&!p)&&t._startAt.revert(Va),o&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!d){if(e&&(o=!1),A=Hn({overwrite:!1,data:"isFromStart",lazy:o&&!d&&fn(l),immediateRender:o,stagger:0,parent:_},y),z&&(A[F.prop]=z),mr(t._startAt=Ce.set(m,A)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Xe?t._startAt.revert(Va):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,ce,ce);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&fn(l)||l&&!g,E=0;E<m.length;E++){if(S=m[E],R=S._gsap||Wu(m)[E]._gsap,t._ptLookup[E]=I={},Xc[R.id]&&lr.length&&il(),V=M===m?E:M.indexOf(S),F&&($=new F).init(S,z||y,t,V,M)!==!1&&(t._pt=v=new pn(t._pt,S,$.name,0,1,$.render,$,0,$.priority),$._props.forEach(function(G){I[G]=v}),$.priority&&(D=1)),!F||z)for(A in y)wn[A]&&($=Ap(A,y,t,V,S,M))?$.priority&&(D=1):I[A]=v=Xu.call(t,S,A,"get",y[A],V,M,0,i.stringFilter);t._op&&t._op[E]&&t.kill(S,t._op[E]),w&&t._pt&&(nr=t,_e.killTweensOf(S,I,t.globalTime(e)),U=!t.parent,nr=0),t._pt&&l&&(Xc[R.id]=1)}D&&Op(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!U,f&&e<=0&&x.render(Bn,!0,!0)},M_=function(t,e,n,i,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,h,f,p;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,p=t._targets.length;p--;){if(u=f[p][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Kc=1,t.vars[e]="+=0",qu(t,o),Kc=0,l?Fo(e+" not eligible for reset"):1;c.push(u)}for(p=c.length;p--;)h=c[p],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=n-u.s,h.e&&(h.e=be(n)+He(h.e)),h.b&&(h.b=u.s+He(h.b))},S_=function(t,e){var n=t[0]?Ur(t[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return e;s=Zr({},e);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},b_=function(t,e,n,i){var s=e.ease||i||"power1.inOut",a,o;if(qe(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},To=function(t,e,n,i,s){return ye(t)?t.call(e,n,i,s):Fe(t)&&~t.indexOf("random(")?zo(t):t},Lp=Hu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Dp={};dn(Lp+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Dp[r]=1});var Ce=function(r){$d(t,r);function t(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:bo(i))||this;var l=o.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,p=l.overwrite,g=l.keyframes,d=l.defaults,m=l.scrollTrigger,_=l.yoyoEase,M=i.parent||_e,w=(qe(n)||Zd(n)?Gi(n[0]):"length"in i)?[n]:Vn(n),x,y,E,A,v,S,D,R;if(o._targets=w.length?Wu(w):Fo("GSAP target "+n+" not found. https://gsap.com",!Dn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=p,g||f||ia(c)||ia(u)){if(i=o.vars,x=o.timeline=new tn({data:"nested",defaults:d||{},targets:M&&M.data==="nested"?M.vars.targets:w}),x.kill(),x.parent=x._dp=Ri(o),x._start=0,f||ia(c)||ia(u)){if(A=w.length,D=f&&pp(f),bi(f))for(v in f)~Lp.indexOf(v)&&(R||(R={}),R[v]=f[v]);for(y=0;y<A;y++)E=rl(i,Dp),E.stagger=0,_&&(E.yoyoEase=_),R&&Zr(E,R),S=w[y],E.duration=+To(c,Ri(o),y,S,w),E.delay=(+To(u,Ri(o),y,S,w)||0)-o._delay,!f&&A===1&&E.delay&&(o._delay=u=E.delay,o._start+=u,E.delay=0),x.to(S,E,D?D(y,S,w):0),x._ease=ee.none;x.duration()?c=u=0:o.timeline=0}else if(g){bo(Hn(x.vars.defaults,{ease:"none"})),x._ease=Vr(g.ease||i.ease||"none");var F=0,$,I,V;if(qe(g))g.forEach(function(z){return x.to(w,z,">")}),x.duration();else{E={};for(v in g)v==="ease"||v==="easeEach"||b_(v,g[v],E,g.easeEach);for(v in E)for($=E[v].sort(function(z,U){return z.t-U.t}),F=0,y=0;y<$.length;y++)I=$[y],V={ease:I.e,duration:(I.t-(y?$[y-1].t:0))/100*c},V[v]=I.v,x.to(w,V,F),F+=V.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||o.duration(c=x.duration())}else o.timeline=0;return p===!0&&!zu&&(nr=Ri(o),_e.killTweensOf(w),nr=0),pi(M,Ri(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!c&&!g&&o._start===Oe(M._time)&&fn(h)&&t_(Ri(o))&&M.data!=="nested")&&(o._tTime=-ce,o.render(Math.max(0,-u)||0)),m&&up(Ri(o),m),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-ce&&!u?l:i<ce?0:i,f,p,g,d,m,_,M,w,x;if(!c)n_(this,i,s,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u){if(f=h,w=this.timeline,this._repeat){if(d=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(d*100+i,s,a);if(f=Oe(h%d),h===l?(g=this._repeat,f=c):(g=~~(h/d),g&&g===Oe(h/d)&&(f=c,g--),f>c&&(f=c)),_=this._yoyo&&g&1,_&&(x=this._yEase,f=c-f),m=Ws(this._tTime,d),f===o&&!a&&this._initted&&g===m)return this._tTime=h,this;g!==m&&(w&&this._yEase&&Tp(w,_),this.vars.repeatRefresh&&!_&&!this._lock&&this._time!==d&&this._initted&&(this._lock=a=1,this.render(Oe(d*g),!0).invalidate()._lock=0))}if(!this._initted){if(hp(this,u?i:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(x||this._ease)(f/c),this._from&&(this.ratio=M=1-M),f&&!o&&!s&&!g&&(Ln(this,"onStart"),this._tTime!==h))return this;for(p=this._pt;p;)p.r(M,p.d),p=p._next;w&&w.render(i<0?i:w._dur*w._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&qc(this,i,s,a),Ln(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&Ln(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&qc(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&mr(this,1),!s&&!(u&&!o)&&(h||o||_)&&(Ln(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,l){ko||Tn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||qu(this,c),u=this._ease(c/this._dur),M_(this,i,s,a,o,u,c,l)?this.resetTo(i,s,a,o,1):(El(this,0),this.parent||lp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?po(this):this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,nr&&nr.vars.overwrite!==!0)._first||po(this),this.parent&&a!==this.timeline.totalDuration()&&Xs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Vn(i):o,c=this._ptLookup,u=this._pt,h,f,p,g,d,m,_;if((!s||s==="all")&&Jg(o,l))return s==="all"&&(this._pt=0),po(this);for(h=this._op=this._op||[],s!=="all"&&(Fe(s)&&(d={},dn(s,function(M){return d[M]=1}),s=d),s=S_(o,s)),_=o.length;_--;)if(~l.indexOf(o[_])){f=c[_],s==="all"?(h[_]=s,g=f,p={}):(p=h[_]=h[_]||{},g=s);for(d in g)m=f&&f[d],m&&((!("kill"in m.d)||m.d.kill(d)===!0)&&wl(this,m,"_pt"),delete f[d]),p!=="all"&&(p[d]=1)}return this._initted&&!this._pt&&u&&po(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return wo(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return wo(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return _e.killTweensOf(i,s,a)},t}(Uo);Hn(Ce.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});dn("staggerTo,staggerFrom,staggerFromTo",function(r){Ce[r]=function(){var t=new tn,e=$c.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Yu=function(t,e,n){return t[e]=n},Pp=function(t,e,n){return t[e](n)},w_=function(t,e,n,i){return t[e](i.fp,n)},T_=function(t,e,n){return t.setAttribute(e,n)},$u=function(t,e){return ye(t[e])?Pp:ku(t[e])&&t.setAttribute?T_:Yu},Rp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},E_=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Ip=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},ju=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},C_=function(t,e,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,n),s=a},A_=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?wl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},L_=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Op=function(t){for(var e=t._pt,n,i,s,a;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=s},pn=function(){function r(e,n,i,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Rp,this.d=l||this,this.set=c||Yu,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=L_,this.m=n,this.mt=s,this.tween=i},r}();dn(Hu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Gu[r]=1});Rn.TweenMax=Rn.TweenLite=Ce;Rn.TimelineLite=Rn.TimelineMax=tn;_e=new tn({sortChildren:!1,defaults:Hs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Dn.stringFilter=bp;var Gr=[],Ha={},D_=[],Ih=0,P_=0,Yl=function(t){return(Ha[t]||D_).map(function(e){return e()})},Jc=function(){var t=Date.now(),e=[];t-Ih>2&&(Yl("matchMediaInit"),Gr.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=hi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),Yl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Ih=t,Yl("matchMedia"))},Fp=function(){function r(e,n){this.selector=n&&jc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=P_++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){ye(n)&&(s=i,i=n,n=ye);var a=this,o=function(){var c=de,u=a.selector,h;return c&&c!==a&&c.data.push(a),s&&(a.selector=jc(s)),de=a,h=i.apply(a,arguments),ye(h)&&a._r.push(h),de=c,a.selector=u,a.isReverted=!1,h};return a.last=o,n===ye?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=de;de=null,n(this),de=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ce&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof tn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ce)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Gr.length;a--;)Gr[a].id===this.id&&Gr.splice(a,1)},t.revert=function(n){this.kill(n||{})},r}(),R_=function(){function r(e){this.contexts=[],this.scope=e,de&&de.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){bi(n)||(n={matches:n});var a=new Fp(0,s||this.scope),o=a.conditions={},l,c,u;de&&!a.selector&&(a.selector=de.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?u=1:(l=hi.matchMedia(n[c]),l&&(Gr.indexOf(a)<0&&Gr.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(Jc):l.addEventListener("change",Jc)));return u&&i(a,function(h){return a.add(null,h)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),ol={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return yp(i)})},timeline:function(t){return new tn(t)},getTweensOf:function(t,e){return _e.getTweensOf(t,e)},getProperty:function(t,e,n,i){Fe(t)&&(t=Vn(t)[0]);var s=Ur(t||{}).get,a=n?ap:op;return n==="native"&&(n=""),t&&(e?a((wn[e]&&wn[e].get||s)(t,e,n,i)):function(o,l,c){return a((wn[o]&&wn[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Vn(t),t.length>1){var i=t.map(function(u){return gn.quickSetter(u,e,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var a=wn[e],o=Ur(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(u){var h=new a;Ls._pt=0,h.init(t,n?u+n:u,Ls,0,[t]),h.render(1,h),Ls._pt&&ju(1,Ls)}:o.set(t,l);return a?c:function(u){return c(t,l,n?u+n:u,o,1)}},quickTo:function(t,e,n){var i,s=gn.to(t,Zr((i={},i[e]="+=0.1",i.paused=!0,i),n||{})),a=function(l,c,u){return s.resetTo(e,l,c,u)};return a.tween=s,a},isTweening:function(t){return _e.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Vr(t.ease,Hs.ease)),Ah(Hs,t||{})},config:function(t){return Ah(Dn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!wn[o]&&!Rn[o]&&Fo(e+" effect requires "+o+" plugin.")}),Hl[e]=function(o,l,c){return n(Vn(o),Hn(l||{},s),c)},a&&(tn.prototype[e]=function(o,l,c){return this.add(Hl[e](o,bi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ee[t]=Vr(e)},parseEase:function(t,e){return arguments.length?Vr(t,e):ee},getById:function(t){return _e.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new tn(t),i,s;for(n.smoothChildTiming=fn(t.smoothChildTiming),_e.remove(n),n._dp=0,n._time=n._tTime=_e._time,i=_e._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Ce&&i.vars.onComplete===i._targets[0]))&&pi(n,i,i._start-i._delay),i=s;return pi(_e,n,0),n},context:function(t,e){return t?new Fp(t,e):de},matchMedia:function(t){return new R_(t)},matchMediaRefresh:function(){return Gr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Jc()},addEventListener:function(t,e){var n=Ha[t]||(Ha[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Ha[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:u_,wrapYoyo:h_,distribute:pp,random:gp,snap:mp,normalize:c_,getUnit:He,clamp:s_,splitColor:Mp,toArray:Vn,selector:jc,mapRange:xp,pipe:a_,unitize:l_,interpolate:f_,shuffle:dp},install:ep,effects:Hl,ticker:Tn,updateRoot:tn.updateRoot,plugins:wn,globalTimeline:_e,core:{PropTween:pn,globals:np,Tween:Ce,Timeline:tn,Animation:Uo,getCache:Ur,_removeLinkedListItem:wl,reverting:function(){return Xe},context:function(t){return t&&de&&(de.data.push(t),t._ctx=de),de},suppressOverwrites:function(t){return zu=t}}};dn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ol[r]=Ce[r]});Tn.add(tn.updateRoot);Ls=ol.to({},{duration:0});var I_=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},O_=function(t,e){var n=t._targets,i,s,a;for(i in e)for(s=n.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=I_(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[s],i))},$l=function(t,e){return{name:t,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(Fe(s)&&(l={},dn(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}O_(o,s)}}}},gn=ol.registerPlugin({name:"attr",init:function(t,e,n,i,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Xe?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},$l("roundProps",Zc),$l("modifiers"),$l("snap",mp))||ol;Ce.version=tn.version=gn.version="3.12.5";tp=1;Uu()&&qs();ee.Power0;ee.Power1;ee.Power2;ee.Power3;ee.Power4;ee.Linear;ee.Quad;ee.Cubic;ee.Quart;ee.Quint;ee.Strong;ee.Elastic;ee.Back;ee.SteppedEase;ee.Bounce;ee.Sine;ee.Expo;ee.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Oh,ir,Os,Zu,Rr,Fh,Ku,F_=function(){return typeof window<"u"},Hi={},Er=180/Math.PI,Fs=Math.PI/180,os=Math.atan2,Nh=1e8,Ju=/([A-Z])/g,N_=/(left|right|width|margin|padding|x)/i,z_=/[\s,\(]\S/,mi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Qc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},k_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},U_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},B_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Np=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},zp=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},V_=function(t,e,n){return t.style[e]=n},G_=function(t,e,n){return t.style.setProperty(e,n)},H_=function(t,e,n){return t._gsap[e]=n},W_=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},X_=function(t,e,n,i,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},q_=function(t,e,n,i,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},xe="transform",mn=xe+"Origin",Y_=function r(t,e){var n=this,i=this.target,s=i.style,a=i._gsap;if(t in Hi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=mi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ni(i,o)}):this.tfm[t]=a.x?a[t]:Ni(i,t),t===mn&&(this.tfm.zOrigin=a.zOrigin);else return mi.transform.split(",").forEach(function(o){return r.call(n,o,e)});if(this.props.indexOf(xe)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(mn,e,"")),t=xe}(s||e)&&this.props.push(t,e,s[t])},kp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},$_=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(Ju,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Ku(),(!s||!s.isStart)&&!n[xe]&&(kp(n),i.zOrigin&&n[mn]&&(n[mn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Up=function(t,e){var n={target:t,props:[],revert:$_,save:Y_};return t._gsap||gn.core.getCache(t),e&&e.split(",").forEach(function(i){return n.save(i)}),n},Bp,tu=function(t,e){var n=ir.createElementNS?ir.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ir.createElement(t);return n&&n.style?n:ir.createElement(t)},vi=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Ju,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ys(e)||e,1)||""},zh="O,Moz,ms,Ms,Webkit".split(","),Ys=function(t,e,n){var i=e||Rr,s=i.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(zh[a]+t in s););return a<0?null:(a===3?"ms":a>=0?zh[a]:"")+t},eu=function(){F_()&&window.document&&(Oh=window,ir=Oh.document,Os=ir.documentElement,Rr=tu("div")||{style:{}},tu("div"),xe=Ys(xe),mn=xe+"Origin",Rr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Bp=!!Ys("perspective"),Ku=gn.core.reverting,Zu=1)},jl=function r(t){var e=tu("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,s=this.style.cssText,a;if(Os.appendChild(e),e.appendChild(this),this.style.display="block",t)try{a=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=r}catch{}else this._gsapBBox&&(a=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),Os.removeChild(e),this.style.cssText=s,a},kh=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Vp=function(t){var e;try{e=t.getBBox()}catch{e=jl.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===jl||(e=jl.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+kh(t,["x","cx","x1"])||0,y:+kh(t,["y","cy","y1"])||0,width:0,height:0}:e},Gp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Vp(t))},Kr=function(t,e){if(e){var n=t.style,i;e in Hi&&e!==mn&&(e=xe),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Ju,"-$1").toLowerCase())):n.removeAttribute(e)}},rr=function(t,e,n,i,s,a){var o=new pn(t._pt,e,n,0,1,a?zp:Np);return t._pt=o,o.b=i,o.e=s,t._props.push(n),o},Uh={deg:1,rad:1,turn:1},j_={grid:1,flex:1},gr=function r(t,e,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Rr.style,l=N_.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",p=i==="%",g,d,m,_;if(i===a||!s||Uh[i]||Uh[a])return s;if(a!=="px"&&!f&&(s=r(t,e,n,"px")),_=t.getCTM&&Gp(t),(p||a==="%")&&(Hi[e]||~e.indexOf("adius")))return g=_?t.getBBox()[l?"width":"height"]:t[u],be(p?s/g*h:s/100*g);if(o[l?"width":"height"]=h+(f?a:i),d=~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,_&&(d=(t.ownerSVGElement||{}).parentNode),(!d||d===ir||!d.appendChild)&&(d=ir.body),m=d._gsap,m&&p&&m.width&&l&&m.time===Tn.time&&!m.uncache)return be(s/m.width*h);if(p&&(e==="height"||e==="width")){var M=t.style[e];t.style[e]=h+i,g=t[u],M?t.style[e]=M:Kr(t,e)}else(p||a==="%")&&!j_[vi(d,"display")]&&(o.position=vi(t,"position")),d===t&&(o.position="static"),d.appendChild(Rr),g=Rr[u],d.removeChild(Rr),o.position="absolute";return l&&p&&(m=Ur(d),m.time=Tn.time,m.width=d[u]),be(f?g*s/h:g&&s?h/g*s:0)},Ni=function(t,e,n,i){var s;return Zu||eu(),e in mi&&e!=="transform"&&(e=mi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Hi[e]&&e!=="transform"?(s=Vo(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:ll(vi(t,mn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=al[e]&&al[e](t,e,n)||vi(t,e)||rp(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?gr(t,e,s,n)+n:s},Z_=function(t,e,n,i){if(!n||n==="none"){var s=Ys(e,t,1),a=s&&vi(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=vi(t,"borderTopColor"))}var o=new pn(this._pt,t.style,e,0,1,Ip),l=0,c=0,u,h,f,p,g,d,m,_,M,w,x,y;if(o.b=n,o.e=i,n+="",i+="",i==="auto"&&(d=t.style[e],t.style[e]=i,i=vi(t,e)||i,d?t.style[e]=d:Kr(t,e)),u=[n,i],bp(u),n=u[0],i=u[1],f=n.match(As)||[],y=i.match(As)||[],y.length){for(;h=As.exec(i);)m=h[0],M=i.substring(l,h.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),m!==(d=f[c++]||"")&&(p=parseFloat(d)||0,x=d.substr((p+"").length),m.charAt(1)==="="&&(m=Is(p,m)+x),_=parseFloat(m),w=m.substr((_+"").length),l=As.lastIndex-w.length,w||(w=w||Dn.units[e]||x,l===i.length&&(i+=w,o.e+=w)),x!==w&&(p=gr(t,e,d,w)||0),o._pt={_next:o._pt,p:M||c===1?M:",",s:p,c:_-p,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?zp:Np;return Jd.test(i)&&(o.e=0),this._pt=o,o},Bh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},K_=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Bh[n]||n,e[1]=Bh[i]||i,e.join(" ")},J_=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Hi[o]&&(l=1,o=o==="transformOrigin"?mn:xe),Kr(n,o);l&&(Kr(n,xe),a&&(a.svg&&n.removeAttribute("transform"),Vo(n,1),a.uncache=1,kp(i)))}},al={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var a=t._pt=new pn(t._pt,e,n,0,0,J_);return a.u=i,a.pr=-10,a.tween=s,t._props.push(n),1}}},Bo=[1,0,0,1,0,0],Hp={},Wp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Vh=function(t){var e=vi(t,xe);return Wp(e)?Bo:e.substr(7).match(Kd).map(be)},Qu=function(t,e){var n=t._gsap||Ur(t),i=t.style,s=Vh(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Bo:s):(s===Bo&&!t.offsetParent&&t!==Os&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent)&&(c=1,o=t.nextElementSibling,Os.appendChild(t)),s=Vh(t),l?i.display=l:Kr(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):Os.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},nu=function(t,e,n,i,s,a){var o=t._gsap,l=s||Qu(t,!0),c=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,p=l[0],g=l[1],d=l[2],m=l[3],_=l[4],M=l[5],w=e.split(" "),x=parseFloat(w[0])||0,y=parseFloat(w[1])||0,E,A,v,S;n?l!==Bo&&(A=p*m-g*d)&&(v=x*(m/A)+y*(-d/A)+(d*M-m*_)/A,S=x*(-g/A)+y*(p/A)-(p*M-g*_)/A,x=v,y=S):(E=Vp(t),x=E.x+(~w[0].indexOf("%")?x/100*E.width:x),y=E.y+(~(w[1]||w[0]).indexOf("%")?y/100*E.height:y)),i||i!==!1&&o.smooth?(_=x-c,M=y-u,o.xOffset=h+(_*p+M*d)-_,o.yOffset=f+(_*g+M*m)-M):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=y,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[mn]="0px 0px",a&&(rr(a,o,"xOrigin",c,x),rr(a,o,"yOrigin",u,y),rr(a,o,"xOffset",h,o.xOffset),rr(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",x+" "+y)},Vo=function(t,e){var n=t._gsap||new Cp(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=vi(t,mn)||"0",u,h,f,p,g,d,m,_,M,w,x,y,E,A,v,S,D,R,F,$,I,V,z,U,G,k,C,Z,N,K,J,q;return u=h=f=d=m=_=M=w=x=0,p=g=1,n.svg=!!(t.getCTM&&Gp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[xe]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[xe]!=="none"?l[xe]:"")),i.scale=i.rotate=i.translate="none"),A=Qu(t,n.svg),n.svg&&(n.uncache?(G=t.getBBox(),c=n.xOrigin-G.x+"px "+(n.yOrigin-G.y)+"px",U=""):U=!e&&t.getAttribute("data-svg-origin"),nu(t,U||c,!!U||n.originIsAbsolute,n.smooth!==!1,A)),y=n.xOrigin||0,E=n.yOrigin||0,A!==Bo&&(R=A[0],F=A[1],$=A[2],I=A[3],u=V=A[4],h=z=A[5],A.length===6?(p=Math.sqrt(R*R+F*F),g=Math.sqrt(I*I+$*$),d=R||F?os(F,R)*Er:0,M=$||I?os($,I)*Er+d:0,M&&(g*=Math.abs(Math.cos(M*Fs))),n.svg&&(u-=y-(y*R+E*$),h-=E-(y*F+E*I))):(q=A[6],K=A[7],C=A[8],Z=A[9],N=A[10],J=A[11],u=A[12],h=A[13],f=A[14],v=os(q,N),m=v*Er,v&&(S=Math.cos(-v),D=Math.sin(-v),U=V*S+C*D,G=z*S+Z*D,k=q*S+N*D,C=V*-D+C*S,Z=z*-D+Z*S,N=q*-D+N*S,J=K*-D+J*S,V=U,z=G,q=k),v=os(-$,N),_=v*Er,v&&(S=Math.cos(-v),D=Math.sin(-v),U=R*S-C*D,G=F*S-Z*D,k=$*S-N*D,J=I*D+J*S,R=U,F=G,$=k),v=os(F,R),d=v*Er,v&&(S=Math.cos(v),D=Math.sin(v),U=R*S+F*D,G=V*S+z*D,F=F*S-R*D,z=z*S-V*D,R=U,V=G),m&&Math.abs(m)+Math.abs(d)>359.9&&(m=d=0,_=180-_),p=be(Math.sqrt(R*R+F*F+$*$)),g=be(Math.sqrt(z*z+q*q)),v=os(V,z),M=Math.abs(v)>2e-4?v*Er:0,x=J?1/(J<0?-J:J):0),n.svg&&(U=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Wp(vi(t,xe)),U&&t.setAttribute("transform",U))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(p*=-1,M+=d<=0?180:-180,d+=d<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=h-((n.yPercent=h&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=be(p),n.scaleY=be(g),n.rotation=be(d)+o,n.rotationX=be(m)+o,n.rotationY=be(_)+o,n.skewX=M+o,n.skewY=w+o,n.transformPerspective=x+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[mn]=ll(c)),n.xOffset=n.yOffset=0,n.force3D=Dn.force3D,n.renderTransform=n.svg?t0:Bp?Xp:Q_,n.uncache=0,n},ll=function(t){return(t=t.split(" "))[0]+" "+t[1]},Zl=function(t,e,n){var i=He(e);return be(parseFloat(e)+parseFloat(gr(t,"x",n+"px",i)))+i},Q_=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Xp(t,e)},Mr="0deg",ao="0px",Sr=") ",Xp=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,p=n.skewY,g=n.scaleX,d=n.scaleY,m=n.transformPerspective,_=n.force3D,M=n.target,w=n.zOrigin,x="",y=_==="auto"&&t&&t!==1||_===!0;if(w&&(h!==Mr||u!==Mr)){var E=parseFloat(u)*Fs,A=Math.sin(E),v=Math.cos(E),S;E=parseFloat(h)*Fs,S=Math.cos(E),a=Zl(M,a,A*S*-w),o=Zl(M,o,-Math.sin(E)*-w),l=Zl(M,l,v*S*-w+w)}m!==ao&&(x+="perspective("+m+Sr),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(y||a!==ao||o!==ao||l!==ao)&&(x+=l!==ao||y?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Sr),c!==Mr&&(x+="rotate("+c+Sr),u!==Mr&&(x+="rotateY("+u+Sr),h!==Mr&&(x+="rotateX("+h+Sr),(f!==Mr||p!==Mr)&&(x+="skew("+f+", "+p+Sr),(g!==1||d!==1)&&(x+="scale("+g+", "+d+Sr),M.style[xe]=x||"translate(0, 0)"},t0=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,p=n.target,g=n.xOrigin,d=n.yOrigin,m=n.xOffset,_=n.yOffset,M=n.forceCSS,w=parseFloat(a),x=parseFloat(o),y,E,A,v,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Fs,c*=Fs,y=Math.cos(l)*h,E=Math.sin(l)*h,A=Math.sin(l-c)*-f,v=Math.cos(l-c)*f,c&&(u*=Fs,S=Math.tan(c-u),S=Math.sqrt(1+S*S),A*=S,v*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),y*=S,E*=S)),y=be(y),E=be(E),A=be(A),v=be(v)):(y=h,v=f,E=A=0),(w&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(w=gr(p,"x",a,"px"),x=gr(p,"y",o,"px")),(g||d||m||_)&&(w=be(w+g-(g*y+d*A)+m),x=be(x+d-(g*E+d*v)+_)),(i||s)&&(S=p.getBBox(),w=be(w+i/100*S.width),x=be(x+s/100*S.height)),S="matrix("+y+","+E+","+A+","+v+","+w+","+x+")",p.setAttribute("transform",S),M&&(p.style[xe]=S)},e0=function(t,e,n,i,s){var a=360,o=Fe(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Er:1),c=l-i,u=i+c+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),h==="cw"&&c<0?c=(c+a*Nh)%a-~~(c/a)*a:h==="ccw"&&c>0&&(c=(c-a*Nh)%a-~~(c/a)*a)),t._pt=f=new pn(t._pt,e,n,i,c,k_),f.e=u,f.u="deg",t._props.push(n),f},Gh=function(t,e){for(var n in e)t[n]=e[n];return t},n0=function(t,e,n){var i=Gh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,h,f,p,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[xe]=e,o=Vo(n,1),Kr(n,xe),n.setAttribute("transform",c)):(c=getComputedStyle(n)[xe],a[xe]=e,o=Vo(n,1),a[xe]=c);for(l in Hi)c=i[l],u=o[l],c!==u&&s.indexOf(l)<0&&(p=He(c),g=He(u),h=p!==g?gr(n,l,c,g):parseFloat(c),f=parseFloat(u),t._pt=new pn(t._pt,o,l,h,f-h,Qc),t._pt.u=g||0,t._props.push(l));Gh(o,i)};dn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",a=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(o){return t<2?r+o:"border"+o+r});al[t>1?"border"+r:r]=function(o,l,c,u,h){var f,p;if(arguments.length<4)return f=a.map(function(g){return Ni(o,g,c)}),p=f.join(" "),p.split(f[0]).length===5?f[0]:p;f=(u+"").split(" "),p={},a.forEach(function(g,d){return p[g]=f[d]=f[d]||f[(d-1)/2|0]}),o.init(l,p,h)}});var qp={name:"css",register:eu,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var a=this._props,o=t.style,l=n.vars.startAt,c,u,h,f,p,g,d,m,_,M,w,x,y,E,A,v;Zu||eu(),this.styles=this.styles||Up(t),v=this.styles.props,this.tween=n;for(d in e)if(d!=="autoRound"&&(u=e[d],!(wn[d]&&Ap(d,e,n,i,t,s)))){if(p=typeof u,g=al[d],p==="function"&&(u=u.call(n,i,t,s),p=typeof u),p==="string"&&~u.indexOf("random(")&&(u=zo(u)),g)g(this,t,d,u,n)&&(A=1);else if(d.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(d)+"").trim(),u+="",cr.lastIndex=0,cr.test(c)||(m=He(c),_=He(u)),_?m!==_&&(c=gr(t,d,c,_)+_):m&&(u+=m),this.add(o,"setProperty",c,u,i,s,0,0,d),a.push(d),v.push(d,0,o[d]);else if(p!=="undefined"){if(l&&d in l?(c=typeof l[d]=="function"?l[d].call(n,i,t,s):l[d],Fe(c)&&~c.indexOf("random(")&&(c=zo(c)),He(c+"")||c==="auto"||(c+=Dn.units[d]||He(Ni(t,d))||""),(c+"").charAt(1)==="="&&(c=Ni(t,d))):c=Ni(t,d),f=parseFloat(c),M=p==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),h=parseFloat(u),d in mi&&(d==="autoAlpha"&&(f===1&&Ni(t,"visibility")==="hidden"&&h&&(f=0),v.push("visibility",0,o.visibility),rr(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),d!=="scale"&&d!=="transform"&&(d=mi[d],~d.indexOf(",")&&(d=d.split(",")[0]))),w=d in Hi,w){if(this.styles.save(d),x||(y=t._gsap,y.renderTransform&&!e.parseTransform||Vo(t,e.parseTransform),E=e.smoothOrigin!==!1&&y.smooth,x=this._pt=new pn(this._pt,o,xe,0,1,y.renderTransform,y,0,-1),x.dep=1),d==="scale")this._pt=new pn(this._pt,y,"scaleY",y.scaleY,(M?Is(y.scaleY,M+h):h)-y.scaleY||0,Qc),this._pt.u=0,a.push("scaleY",d),d+="X";else if(d==="transformOrigin"){v.push(mn,0,o[mn]),u=K_(u),y.svg?nu(t,u,0,E,0,this):(_=parseFloat(u.split(" ")[2])||0,_!==y.zOrigin&&rr(this,y,"zOrigin",y.zOrigin,_),rr(this,o,d,ll(c),ll(u)));continue}else if(d==="svgOrigin"){nu(t,u,1,E,0,this);continue}else if(d in Hp){e0(this,y,d,f,M?Is(f,M+u):u);continue}else if(d==="smoothOrigin"){rr(this,y,"smooth",y.smooth,u);continue}else if(d==="force3D"){y[d]=u;continue}else if(d==="transform"){n0(this,u,t);continue}}else d in o||(d=Ys(d)||d);if(w||(h||h===0)&&(f||f===0)&&!z_.test(u)&&d in o)m=(c+"").substr((f+"").length),h||(h=0),_=He(u)||(d in Dn.units?Dn.units[d]:m),m!==_&&(f=gr(t,d,c,_)),this._pt=new pn(this._pt,w?y:o,d,f,(M?Is(f,M+h):h)-f,!w&&(_==="px"||d==="zIndex")&&e.autoRound!==!1?B_:Qc),this._pt.u=_||0,m!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=U_);else if(d in o)Z_.call(this,t,d,c,M?M+u:u);else if(d in t)this.add(t,d,c||t[d],M?M+u:u,i,s);else if(d!=="parseTransform"){Vu(d,u);continue}w||(d in o?v.push(d,0,o[d]):v.push(d,1,c||t[d])),a.push(d)}}A&&Op(this)},render:function(t,e){if(e.tween._time||!Ku())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ni,aliases:mi,getSetter:function(t,e,n){var i=mi[e];return i&&i.indexOf(",")<0&&(e=i),e in Hi&&e!==mn&&(t._gsap.x||Ni(t,"x"))?n&&Fh===n?e==="scale"?W_:H_:(Fh=n||{})&&(e==="scale"?X_:q_):t.style&&!ku(t.style[e])?V_:~e.indexOf("-")?G_:$u(t,e)},core:{_removeProperty:Kr,_getMatrix:Qu}};gn.utils.checkPrefix=Ys;gn.core.getStyleSaver=Up;(function(r,t,e,n){var i=dn(r+","+t+","+e,function(s){Hi[s]=1});dn(t,function(s){Dn.units[s]="deg",Hp[s]=1}),mi[i[13]]=r+","+t,dn(n,function(s){var a=s.split(":");mi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");dn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Dn.units[r]="px"});gn.registerPlugin(qp);var i0=gn.registerPlugin(qp)||gn;i0.core.Tween;function r0(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function s0(r,t,e){return t&&r0(r.prototype,t),r}/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ze,Wa,En,sr,or,Ns,Yp,Cr,Eo,$p,Ui,Jn,jp,Zp=function(){return ze||typeof window<"u"&&(ze=window.gsap)&&ze.registerPlugin&&ze},Kp=1,Ds=[],Qt=[],yi=[],Co=Date.now,iu=function(t,e){return e},o0=function(){var t=Eo.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,Qt),i.push.apply(i,yi),Qt=n,yi=i,iu=function(a,o){return e[a](o)}},ur=function(t,e){return~yi.indexOf(t)&&yi[yi.indexOf(t)+1][e]},Ao=function(t){return!!~$p.indexOf(t)},je=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},$e=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},ra="scrollLeft",sa="scrollTop",ru=function(){return Ui&&Ui.isPressed||Qt.cache++},cl=function(t,e){var n=function i(s){if(s||s===0){Kp&&(En.history.scrollRestoration="manual");var a=Ui&&Ui.isPressed;s=i.v=Math.round(s)||(Ui&&Ui.iOS?1:0),t(s),i.cacheID=Qt.cache,a&&iu("ss",s)}else(e||Qt.cache!==i.cacheID||iu("ref"))&&(i.cacheID=Qt.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},en={s:ra,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:cl(function(r){return arguments.length?En.scrollTo(r,De.sc()):En.pageXOffset||sr[ra]||or[ra]||Ns[ra]||0})},De={s:sa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:en,sc:cl(function(r){return arguments.length?En.scrollTo(en.sc(),r):En.pageYOffset||sr[sa]||or[sa]||Ns[sa]||0})},cn=function(t,e){return(e&&e._ctx&&e._ctx.selector||ze.utils.toArray)(t)[0]||(typeof t=="string"&&ze.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},_r=function(t,e){var n=e.s,i=e.sc;Ao(t)&&(t=sr.scrollingElement||or);var s=Qt.indexOf(t),a=i===De.sc?1:2;!~s&&(s=Qt.push(t)-1),Qt[s+a]||je(t,"scroll",ru);var o=Qt[s+a],l=o||(Qt[s+a]=cl(ur(t,n),!0)||(Ao(t)?i:cl(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,o||(l.smooth=ze.getProperty(t,"scrollBehavior")==="smooth"),l},su=function(t,e,n){var i=t,s=t,a=Co(),o=a,l=e||50,c=Math.max(500,l*3),u=function(g,d){var m=Co();d||m-a>l?(s=i,i=g,o=a,a=m):n?i+=g:i=s+(g-s)/(m-o)*(a-o)},h=function(){s=i=n?0:i,o=a=0},f=function(g){var d=o,m=s,_=Co();return(g||g===0)&&g!==i&&u(g),a===o||_-o>c?0:(i+(n?m:-m))/((n?_:a)-d)*1e3};return{update:u,reset:h,getVelocity:f}},lo=function(t,e){return e&&!t._gsapAllow&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Hh=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},Jp=function(){Eo=ze.core.globals().ScrollTrigger,Eo&&Eo.core&&o0()},Qp=function(t){return ze=t||Zp(),!Wa&&ze&&typeof document<"u"&&document.body&&(En=window,sr=document,or=sr.documentElement,Ns=sr.body,$p=[En,sr,or,Ns],ze.utils.clamp,jp=ze.core.context||function(){},Cr="onpointerenter"in Ns?"pointer":"mouse",Yp=we.isTouch=En.matchMedia&&En.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in En||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Jn=we.eventTypes=("ontouchstart"in or?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in or?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Kp=0},500),Jp(),Wa=1),Wa};en.op=De;Qt.cache=0;var we=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){Wa||Qp(ze)||console.warn("Please gsap.registerPlugin(Observer)"),Eo||Jp();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,p=n.ignore,g=n.wheelSpeed,d=n.event,m=n.onDragStart,_=n.onDragEnd,M=n.onDrag,w=n.onPress,x=n.onRelease,y=n.onRight,E=n.onLeft,A=n.onUp,v=n.onDown,S=n.onChangeX,D=n.onChangeY,R=n.onChange,F=n.onToggleX,$=n.onToggleY,I=n.onHover,V=n.onHoverEnd,z=n.onMove,U=n.ignoreCheck,G=n.isNormalizer,k=n.onGestureStart,C=n.onGestureEnd,Z=n.onWheel,N=n.onEnable,K=n.onDisable,J=n.onClick,q=n.scrollSpeed,B=n.capture,at=n.allowClicks,rt=n.lockAxis,ct=n.onLockAxis;this.target=o=cn(o)||or,this.vars=n,p&&(p=ze.utils.toArray(p)),i=i||1e-9,s=s||0,g=g||1,q=q||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(En.getComputedStyle(Ns).lineHeight)||22);var ot,yt,vt,ht,gt,It,Gt,X=this,Ft=0,Ct=0,Xt=n.passive||!u,Pt=_r(o,en),P=_r(o,De),b=Pt(),Q=P(),it=~a.indexOf("touch")&&!~a.indexOf("pointer")&&Jn[0]==="pointerdown",ft=Ao(o),ut=o.ownerDocument||sr,Et=[0,0,0],L=[0,0,0],nt=0,pt=function(){return nt=Co()},st=function(Dt,Zt){return(X.event=Dt)&&p&&~p.indexOf(Dt.target)||Zt&&it&&Dt.pointerType!=="touch"||U&&U(Dt,Zt)},O=function(){X._vx.reset(),X._vy.reset(),yt.pause(),h&&h(X)},dt=function(){var Dt=X.deltaX=Hh(Et),Zt=X.deltaY=Hh(L),_t=Math.abs(Dt)>=i,Wt=Math.abs(Zt)>=i;R&&(_t||Wt)&&R(X,Dt,Zt,Et,L),_t&&(y&&X.deltaX>0&&y(X),E&&X.deltaX<0&&E(X),S&&S(X),F&&X.deltaX<0!=Ft<0&&F(X),Ft=X.deltaX,Et[0]=Et[1]=Et[2]=0),Wt&&(v&&X.deltaY>0&&v(X),A&&X.deltaY<0&&A(X),D&&D(X),$&&X.deltaY<0!=Ct<0&&$(X),Ct=X.deltaY,L[0]=L[1]=L[2]=0),(ht||vt)&&(z&&z(X),vt&&(M(X),vt=!1),ht=!1),It&&!(It=!1)&&ct&&ct(X),gt&&(Z(X),gt=!1),ot=0},lt=function(Dt,Zt,_t){Et[_t]+=Dt,L[_t]+=Zt,X._vx.update(Dt),X._vy.update(Zt),c?ot||(ot=requestAnimationFrame(dt)):dt()},At=function(Dt,Zt){rt&&!Gt&&(X.axis=Gt=Math.abs(Dt)>Math.abs(Zt)?"x":"y",It=!0),Gt!=="y"&&(Et[2]+=Dt,X._vx.update(Dt,!0)),Gt!=="x"&&(L[2]+=Zt,X._vy.update(Zt,!0)),c?ot||(ot=requestAnimationFrame(dt)):dt()},mt=function(Dt){if(!st(Dt,1)){Dt=lo(Dt,u);var Zt=Dt.clientX,_t=Dt.clientY,Wt=Zt-X.x,Rt=_t-X.y,T=X.isDragging;X.x=Zt,X.y=_t,(T||Math.abs(X.startX-Zt)>=s||Math.abs(X.startY-_t)>=s)&&(M&&(vt=!0),T||(X.isDragging=!0),At(Wt,Rt),T||m&&m(X))}},St=X.onPress=function(zt){st(zt,1)||zt&&zt.button||(X.axis=Gt=null,yt.pause(),X.isPressed=!0,zt=lo(zt),Ft=Ct=0,X.startX=X.x=zt.clientX,X.startY=X.y=zt.clientY,X._vx.reset(),X._vy.reset(),je(G?o:ut,Jn[1],mt,Xt,!0),X.deltaX=X.deltaY=0,w&&w(X))},tt=X.onRelease=function(zt){if(!st(zt,1)){$e(G?o:ut,Jn[1],mt,!0);var Dt=!isNaN(X.y-X.startY),Zt=X.isDragging,_t=Zt&&(Math.abs(X.x-X.startX)>3||Math.abs(X.y-X.startY)>3),Wt=lo(zt);!_t&&Dt&&(X._vx.reset(),X._vy.reset(),u&&at&&ze.delayedCall(.08,function(){if(Co()-nt>300&&!zt.defaultPrevented){if(zt.target.click)zt.target.click();else if(ut.createEvent){var Rt=ut.createEvent("MouseEvents");Rt.initMouseEvent("click",!0,!0,En,1,Wt.screenX,Wt.screenY,Wt.clientX,Wt.clientY,!1,!1,!1,!1,0,null),zt.target.dispatchEvent(Rt)}}})),X.isDragging=X.isGesturing=X.isPressed=!1,h&&Zt&&!G&&yt.restart(!0),_&&Zt&&_(X),x&&x(X,_t)}},Lt=function(Dt){return Dt.touches&&Dt.touches.length>1&&(X.isGesturing=!0)&&k(Dt,X.isDragging)},Ut=function(){return(X.isGesturing=!1)||C(X)},Ht=function(Dt){if(!st(Dt)){var Zt=Pt(),_t=P();lt((Zt-b)*q,(_t-Q)*q,1),b=Zt,Q=_t,h&&yt.restart(!0)}},se=function(Dt){if(!st(Dt)){Dt=lo(Dt,u),Z&&(gt=!0);var Zt=(Dt.deltaMode===1?l:Dt.deltaMode===2?En.innerHeight:1)*g;lt(Dt.deltaX*Zt,Dt.deltaY*Zt,0),h&&!G&&yt.restart(!0)}},Me=function(Dt){if(!st(Dt)){var Zt=Dt.clientX,_t=Dt.clientY,Wt=Zt-X.x,Rt=_t-X.y;X.x=Zt,X.y=_t,ht=!0,h&&yt.restart(!0),(Wt||Rt)&&At(Wt,Rt)}},Xn=function(Dt){X.event=Dt,I(X)},_n=function(Dt){X.event=Dt,V(X)},xn=function(Dt){return st(Dt)||lo(Dt,u)&&J(X)};yt=X._dc=ze.delayedCall(f||.25,O).pause(),X.deltaX=X.deltaY=0,X._vx=su(0,50,!0),X._vy=su(0,50,!0),X.scrollX=Pt,X.scrollY=P,X.isDragging=X.isGesturing=X.isPressed=!1,jp(this),X.enable=function(zt){return X.isEnabled||(je(ft?ut:o,"scroll",ru),a.indexOf("scroll")>=0&&je(ft?ut:o,"scroll",Ht,Xt,B),a.indexOf("wheel")>=0&&je(o,"wheel",se,Xt,B),(a.indexOf("touch")>=0&&Yp||a.indexOf("pointer")>=0)&&(je(o,Jn[0],St,Xt,B),je(ut,Jn[2],tt),je(ut,Jn[3],tt),at&&je(o,"click",pt,!0,!0),J&&je(o,"click",xn),k&&je(ut,"gesturestart",Lt),C&&je(ut,"gestureend",Ut),I&&je(o,Cr+"enter",Xn),V&&je(o,Cr+"leave",_n),z&&je(o,Cr+"move",Me)),X.isEnabled=!0,zt&&zt.type&&St(zt),N&&N(X)),X},X.disable=function(){X.isEnabled&&(Ds.filter(function(zt){return zt!==X&&Ao(zt.target)}).length||$e(ft?ut:o,"scroll",ru),X.isPressed&&(X._vx.reset(),X._vy.reset(),$e(G?o:ut,Jn[1],mt,!0)),$e(ft?ut:o,"scroll",Ht,B),$e(o,"wheel",se,B),$e(o,Jn[0],St,B),$e(ut,Jn[2],tt),$e(ut,Jn[3],tt),$e(o,"click",pt,!0),$e(o,"click",xn),$e(ut,"gesturestart",Lt),$e(ut,"gestureend",Ut),$e(o,Cr+"enter",Xn),$e(o,Cr+"leave",_n),$e(o,Cr+"move",Me),X.isEnabled=X.isPressed=X.isDragging=!1,K&&K(X))},X.kill=X.revert=function(){X.disable();var zt=Ds.indexOf(X);zt>=0&&Ds.splice(zt,1),Ui===X&&(Ui=0)},Ds.push(X),G&&Ao(o)&&(Ui=X),X.enable(d)},s0(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();we.version="3.12.5";we.create=function(r){return new we(r)};we.register=Qp;we.getAll=function(){return Ds.slice()};we.getById=function(r){return Ds.filter(function(t){return t.vars.id===r})[0]};Zp()&&ze.registerPlugin(we);/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Tt,Ts,te,me,Qn,he,tm,ul,Go,Lo,go,oa,Be,Cl,ou,Ke,Wh,Xh,Es,em,Kl,nm,Ze,au,im,rm,tr,lu,th,zs,eh,hl,cu,Jl,aa=1,Ge=Date.now,Ql=Ge(),Gn=0,_o=0,qh=function(t,e,n){var i=Sn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},Yh=function(t,e){return e&&(!Sn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},a0=function r(){return _o&&requestAnimationFrame(r)},$h=function(){return Cl=1},jh=function(){return Cl=0},fi=function(t){return t},xo=function(t){return Math.round(t*1e5)/1e5||0},sm=function(){return typeof window<"u"},om=function(){return Tt||sm()&&(Tt=window.gsap)&&Tt.registerPlugin&&Tt},Jr=function(t){return!!~tm.indexOf(t)},am=function(t){return(t==="Height"?eh:te["inner"+t])||Qn["client"+t]||he["client"+t]},lm=function(t){return ur(t,"getBoundingClientRect")||(Jr(t)?function(){return ja.width=te.innerWidth,ja.height=eh,ja}:function(){return zi(t)})},l0=function(t,e,n){var i=n.d,s=n.d2,a=n.a;return(a=ur(t,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(e?am(s):t["client"+s])||0}},c0=function(t,e){return!e||~yi.indexOf(t)?lm(t):function(){return ja}},gi=function(t,e){var n=e.s,i=e.d2,s=e.d,a=e.a;return Math.max(0,(n="scroll"+i)&&(a=ur(t,n))?a()-lm(t)()[s]:Jr(t)?(Qn[n]||he[n])-am(i):t[n]-t["offset"+i])},la=function(t,e){for(var n=0;n<Es.length;n+=3)(!e||~e.indexOf(Es[n+1]))&&t(Es[n],Es[n+1],Es[n+2])},Sn=function(t){return typeof t=="string"},nn=function(t){return typeof t=="function"},vo=function(t){return typeof t=="number"},Ar=function(t){return typeof t=="object"},co=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},tc=function(t,e){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t)}):e(t);n&&n.totalTime&&(t.callbackAnimation=n)}},as=Math.abs,cm="left",um="top",nh="right",ih="bottom",Hr="width",Wr="height",Do="Right",Po="Left",Ro="Top",Io="Bottom",Ee="padding",zn="margin",$s="Width",rh="Height",Le="px",kn=function(t){return te.getComputedStyle(t)},u0=function(t){var e=kn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},Zh=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},zi=function(t,e){var n=e&&kn(t)[ou]!=="matrix(1, 0, 0, 1, 0, 0)"&&Tt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect();return n&&n.progress(0).kill(),i},fl=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},hm=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},h0=function(t){return function(e){return Tt.utils.snap(hm(t),e)}},sh=function(t){var e=Tt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return e(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=e(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:e(s<0?i-t:i+t)}},f0=function(t){return function(e,n){return sh(hm(t))(e,n.direction)}},ca=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},Ie=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},Re=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},ua=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},Kh={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ha={toggleActions:"play",anticipatePin:0},dl={top:0,left:0,center:.5,bottom:1,right:1},Xa=function(t,e){if(Sn(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in dl?dl[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},fa=function(t,e,n,i,s,a,o,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,p=s.fontWeight,g=me.createElement("div"),d=Jr(n)||ur(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,_=d?he:n,M=t.indexOf("start")!==-1,w=M?c:u,x="border-color:"+w+";font-size:"+h+";color:"+w+";font-weight:"+p+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&d?"fixed;":"absolute;"),(m||l||!d)&&(x+=(i===De?nh:ih)+":"+(a+parseFloat(f))+"px;"),o&&(x+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=x,g.innerText=e||e===0?t+"-"+e:t,_.children[0]?_.insertBefore(g,_.children[0]):_.appendChild(g),g._offset=g["offset"+i.op.d2],qa(g,0,i,M),g},qa=function(t,e,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+$s]=1,s["border"+o+$s]=0,s[n.p]=e+"px",Tt.set(t,s)},Kt=[],uu={},Ho,Jh=function(){return Ge()-Gn>34&&(Ho||(Ho=requestAnimationFrame(Bi)))},ls=function(){(!Ze||!Ze.isPressed||Ze.startX>he.clientWidth)&&(Qt.cache++,Ze?Ho||(Ho=requestAnimationFrame(Bi)):Bi(),Gn||ts("scrollStart"),Gn=Ge())},ec=function(){rm=te.innerWidth,im=te.innerHeight},yo=function(){Qt.cache++,!Be&&!nm&&!me.fullscreenElement&&!me.webkitFullscreenElement&&(!au||rm!==te.innerWidth||Math.abs(te.innerHeight-im)>te.innerHeight*.25)&&ul.restart(!0)},Qr={},d0=[],fm=function r(){return Re(ne,"scrollEnd",r)||Ir(!0)},ts=function(t){return Qr[t]&&Qr[t].map(function(e){return e()})||d0},Mn=[],dm=function(t){for(var e=0;e<Mn.length;e+=5)(!t||Mn[e+4]&&Mn[e+4].query===t)&&(Mn[e].style.cssText=Mn[e+1],Mn[e].getBBox&&Mn[e].setAttribute("transform",Mn[e+2]||""),Mn[e+3].uncache=1)},oh=function(t,e){var n;for(Ke=0;Ke<Kt.length;Ke++)n=Kt[Ke],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));hl=!0,e&&dm(e),e||ts("revert")},pm=function(t,e){Qt.cache++,(e||!Je)&&Qt.forEach(function(n){return nn(n)&&n.cacheID++&&(n.rec=0)}),Sn(t)&&(te.history.scrollRestoration=th=t)},Je,Xr=0,Qh,p0=function(){if(Qh!==Xr){var t=Qh=Xr;requestAnimationFrame(function(){return t===Xr&&Ir(!0)})}},mm=function(){he.appendChild(zs),eh=!Ze&&zs.offsetHeight||te.innerHeight,he.removeChild(zs)},tf=function(t){return Go(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Ir=function(t,e){if(Gn&&!t&&!hl){Ie(ne,"scrollEnd",fm);return}mm(),Je=ne.isRefreshing=!0,Qt.forEach(function(i){return nn(i)&&++i.cacheID&&(i.rec=i())});var n=ts("refreshInit");em&&ne.sort(),e||oh(),Qt.forEach(function(i){nn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Kt.slice(0).forEach(function(i){return i.refresh()}),hl=!1,Kt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),cu=1,tf(!0),Kt.forEach(function(i){var s=gi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),tf(!1),cu=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Qt.forEach(function(i){nn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),pm(th,1),ul.pause(),Xr++,Je=2,Bi(2),Kt.forEach(function(i){return nn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Je=ne.isRefreshing=!1,ts("refresh")},hu=0,Ya=1,Oo,Bi=function(t){if(t===2||!Je&&!hl){ne.isUpdating=!0,Oo&&Oo.update(0);var e=Kt.length,n=Ge(),i=n-Ql>=50,s=e&&Kt[0].scroll();if(Ya=hu>s?-1:1,Je||(hu=s),i&&(Gn&&!Cl&&n-Gn>200&&(Gn=0,ts("scrollEnd")),go=Ql,Ql=n),Ya<0){for(Ke=e;Ke-- >0;)Kt[Ke]&&Kt[Ke].update(0,i);Ya=1}else for(Ke=0;Ke<e;Ke++)Kt[Ke]&&Kt[Ke].update(0,i);ne.isUpdating=!1}Ho=0},fu=[cm,um,ih,nh,zn+Io,zn+Do,zn+Ro,zn+Po,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],$a=fu.concat([Hr,Wr,"boxSizing","max"+$s,"max"+rh,"position",zn,Ee,Ee+Ro,Ee+Do,Ee+Io,Ee+Po]),m0=function(t,e,n){ks(n);var i=t._gsap;if(i.spacerIsNative)ks(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},nc=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=fu.length,a=e.style,o=t.style,l;s--;)l=fu[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[ih]=o[nh]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Hr]=fl(t,en)+Le,a[Wr]=fl(t,De)+Le,a[Ee]=o[zn]=o[um]=o[cm]="0",ks(i),o[Hr]=o["max"+$s]=n[Hr],o[Wr]=o["max"+rh]=n[Wr],o[Ee]=n[Ee],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},g0=/([A-Z])/g,ks=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,a;for((t.t._gsap||Tt.core.getCache(t.t)).uncache=1;i<n;i+=2)a=t[i+1],s=t[i],a?e[s]=a:e[s]&&e.removeProperty(s.replace(g0,"-$1").toLowerCase())}},da=function(t){for(var e=$a.length,n=t.style,i=[],s=0;s<e;s++)i.push($a[s],n[$a[s]]);return i.t=t,i},_0=function(t,e,n){for(var i=[],s=t.length,a=n?8:0,o;a<s;a+=2)o=t[a],i.push(o,o in e?e[o]:t[a+1]);return i.t=t.t,i},ja={left:0,top:0},ef=function(t,e,n,i,s,a,o,l,c,u,h,f,p,g){nn(t)&&(t=t(l)),Sn(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?Xa("0"+t.substr(3),n):0));var d=p?p.time():0,m,_,M;if(p&&p.seek(0),isNaN(t)||(t=+t),vo(t))p&&(t=Tt.utils.mapRange(p.scrollTrigger.start,p.scrollTrigger.end,0,f,t)),o&&qa(o,n,i,!0);else{nn(e)&&(e=e(l));var w=(t||"0").split(" "),x,y,E,A;M=cn(e,l)||he,x=zi(M)||{},(!x||!x.left&&!x.top)&&kn(M).display==="none"&&(A=M.style.display,M.style.display="block",x=zi(M),A?M.style.display=A:M.style.removeProperty("display")),y=Xa(w[0],x[i.d]),E=Xa(w[1]||"0",n),t=x[i.p]-c[i.p]-u+y+s-E,o&&qa(o,E,i,n-E<20||o._isStart&&E>20),n-=n-E}if(g&&(l[g]=t||-.001,t<0&&(t=0)),a){var v=t+n,S=a._isStart;m="scroll"+i.d2,qa(a,v,i,S&&v>20||!S&&(h?Math.max(he[m],Qn[m]):a.parentNode[m])<=v+1),h&&(c=zi(o),h&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+Le))}return p&&M&&(m=zi(M),p.seek(f),_=zi(M),p._caScrollDist=m[i.p]-_[i.p],t=t/p._caScrollDist*f),p&&p.seek(d),p?t:Math.round(t)},x0=/(webkit|moz|length|cssText|inset)/i,nf=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,a,o;if(e===he){t._stOrig=s.cssText,o=kn(t);for(a in o)!+a&&!x0.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=t._stOrig;Tt.core.getCache(t).uncache=1,e.appendChild(t)}},gm=function(t,e,n){var i=e,s=i;return function(a){var o=Math.round(t());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=a,a}},pa=function(t,e,n){var i={};i[e.p]="+="+n,Tt.set(t,i)},rf=function(t,e){var n=_r(t,e),i="_scroll"+e.p2,s=function a(o,l,c,u,h){var f=a.tween,p=l.onComplete,g={};c=c||n();var d=gm(n,c,function(){f.kill(),a.tween=0});return h=u&&h||0,u=u||o-c,f&&f.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return d(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){Qt.cache++,a.tween&&Bi()},l.onComplete=function(){a.tween=0,p&&p.call(f)},f=a.tween=Tt.to(t,l),f};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Ie(t,"wheel",n.wheelHandler),ne.isTouch&&Ie(t,"touchmove",n.wheelHandler),s},ne=function(){function r(e,n){Ts||r.register(Tt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),lu(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!_o){this.update=this.refresh=this.kill=fi;return}n=Zh(Sn(n)||vo(n)||n.nodeType?{trigger:n}:n,ha);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,p=s.pin,g=s.pinSpacing,d=s.invalidateOnRefresh,m=s.anticipatePin,_=s.onScrubComplete,M=s.onSnapComplete,w=s.once,x=s.snap,y=s.pinReparent,E=s.pinSpacer,A=s.containerAnimation,v=s.fastScrollEnd,S=s.preventOverlaps,D=n.horizontal||n.containerAnimation&&n.horizontal!==!1?en:De,R=!h&&h!==0,F=cn(n.scroller||te),$=Tt.core.getCache(F),I=Jr(F),V=("pinType"in n?n.pinType:ur(F,"pinType")||I&&"fixed")==="fixed",z=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],U=R&&n.toggleActions.split(" "),G="markers"in n?n.markers:ha.markers,k=I?0:parseFloat(kn(F)["border"+D.p2+$s])||0,C=this,Z=n.onRefreshInit&&function(){return n.onRefreshInit(C)},N=l0(F,I,D),K=c0(F,I),J=0,q=0,B=0,at=_r(F,D),rt,ct,ot,yt,vt,ht,gt,It,Gt,X,Ft,Ct,Xt,Pt,P,b,Q,it,ft,ut,Et,L,nt,pt,st,O,dt,lt,At,mt,St,tt,Lt,Ut,Ht,se,Me,Xn,_n;if(C._startClamp=C._endClamp=!1,C._dir=D,m*=45,C.scroller=F,C.scroll=A?A.time.bind(A):at,yt=at(),C.vars=n,i=i||n.animation,"refreshPriority"in n&&(em=1,n.refreshPriority===-9999&&(Oo=C)),$.tweenScroll=$.tweenScroll||{top:rf(F,De),left:rf(F,en)},C.tweenTo=rt=$.tweenScroll[D.p],C.scrubDuration=function(_t){Lt=vo(_t)&&_t,Lt?tt?tt.duration(_t):tt=Tt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Lt,paused:!0,onComplete:function(){return _&&_(C)}}):(tt&&tt.progress(1).kill(),tt=0)},i&&(i.vars.lazy=!1,i._initted&&!C.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),C.animation=i.pause(),i.scrollTrigger=C,C.scrubDuration(h),mt=0,l||(l=i.vars.id)),x&&((!Ar(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in he.style&&Tt.set(I?[he,Qn]:F,{scrollBehavior:"auto"}),Qt.forEach(function(_t){return nn(_t)&&_t.target===(I?me.scrollingElement||Qn:F)&&(_t.smooth=!1)}),ot=nn(x.snapTo)?x.snapTo:x.snapTo==="labels"?h0(i):x.snapTo==="labelsDirectional"?f0(i):x.directional!==!1?function(_t,Wt){return sh(x.snapTo)(_t,Ge()-q<500?0:Wt.direction)}:Tt.utils.snap(x.snapTo),Ut=x.duration||{min:.1,max:2},Ut=Ar(Ut)?Lo(Ut.min,Ut.max):Lo(Ut,Ut),Ht=Tt.delayedCall(x.delay||Lt/2||.1,function(){var _t=at(),Wt=Ge()-q<500,Rt=rt.tween;if((Wt||Math.abs(C.getVelocity())<10)&&!Rt&&!Cl&&J!==_t){var T=(_t-ht)/Pt,H=i&&!R?i.totalProgress():T,W=Wt?0:(H-St)/(Ge()-go)*1e3||0,Y=Tt.utils.clamp(-T,1-T,as(W/2)*W/.185),et=T+(x.inertia===!1?0:Y),Mt,bt,wt=x,Nt=wt.onStart,Ot=wt.onInterrupt,Bt=wt.onComplete;if(Mt=ot(et,C),vo(Mt)||(Mt=et),bt=Math.round(ht+Mt*Pt),_t<=gt&&_t>=ht&&bt!==_t){if(Rt&&!Rt._initted&&Rt.data<=as(bt-_t))return;x.inertia===!1&&(Y=Mt-T),rt(bt,{duration:Ut(as(Math.max(as(et-H),as(Mt-H))*.185/W/.05||0)),ease:x.ease||"power3",data:as(bt-_t),onInterrupt:function(){return Ht.restart(!0)&&Ot&&Ot(C)},onComplete:function(){C.update(),J=at(),i&&(tt?tt.resetTo("totalProgress",Mt,i._tTime/i._tDur):i.progress(Mt)),mt=St=i&&!R?i.totalProgress():C.progress,M&&M(C),Bt&&Bt(C)}},_t,Y*Pt,bt-_t-Y*Pt),Nt&&Nt(C,rt.tween)}}else C.isActive&&J!==_t&&Ht.restart(!0)}).pause()),l&&(uu[l]=C),f=C.trigger=cn(f||p!==!0&&p),_n=f&&f._gsap&&f._gsap.stRevert,_n&&(_n=_n(C)),p=p===!0?f:cn(p),Sn(o)&&(o={targets:f,className:o}),p&&(g===!1||g===zn||(g=!g&&p.parentNode&&p.parentNode.style&&kn(p.parentNode).display==="flex"?!1:Ee),C.pin=p,ct=Tt.core.getCache(p),ct.spacer?P=ct.pinState:(E&&(E=cn(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),ct.spacerIsNative=!!E,E&&(ct.spacerState=da(E))),ct.spacer=it=E||me.createElement("div"),it.classList.add("pin-spacer"),l&&it.classList.add("pin-spacer-"+l),ct.pinState=P=da(p)),n.force3D!==!1&&Tt.set(p,{force3D:!0}),C.spacer=it=ct.spacer,At=kn(p),pt=At[g+D.os2],ut=Tt.getProperty(p),Et=Tt.quickSetter(p,D.a,Le),nc(p,it,At),Q=da(p)),G){Ct=Ar(G)?Zh(G,Kh):Kh,X=fa("scroller-start",l,F,D,Ct,0),Ft=fa("scroller-end",l,F,D,Ct,0,X),ft=X["offset"+D.op.d2];var xn=cn(ur(F,"content")||F);It=this.markerStart=fa("start",l,xn,D,Ct,ft,0,A),Gt=this.markerEnd=fa("end",l,xn,D,Ct,ft,0,A),A&&(Xn=Tt.quickSetter([It,Gt],D.a,Le)),!V&&!(yi.length&&ur(F,"fixedMarkers")===!0)&&(u0(I?he:F),Tt.set([X,Ft],{force3D:!0}),O=Tt.quickSetter(X,D.a,Le),lt=Tt.quickSetter(Ft,D.a,Le))}if(A){var zt=A.vars.onUpdate,Dt=A.vars.onUpdateParams;A.eventCallback("onUpdate",function(){C.update(0,0,1),zt&&zt.apply(A,Dt||[])})}if(C.previous=function(){return Kt[Kt.indexOf(C)-1]},C.next=function(){return Kt[Kt.indexOf(C)+1]},C.revert=function(_t,Wt){if(!Wt)return C.kill(!0);var Rt=_t!==!1||!C.enabled,T=Be;Rt!==C.isReverted&&(Rt&&(se=Math.max(at(),C.scroll.rec||0),B=C.progress,Me=i&&i.progress()),It&&[It,Gt,X,Ft].forEach(function(H){return H.style.display=Rt?"none":"block"}),Rt&&(Be=C,C.update(Rt)),p&&(!y||!C.isActive)&&(Rt?m0(p,it,P):nc(p,it,kn(p),st)),Rt||C.update(Rt),Be=T,C.isReverted=Rt)},C.refresh=function(_t,Wt,Rt,T){if(!((Be||!C.enabled)&&!Wt)){if(p&&_t&&Gn){Ie(r,"scrollEnd",fm);return}!Je&&Z&&Z(C),Be=C,rt.tween&&!Rt&&(rt.tween.kill(),rt.tween=0),tt&&tt.pause(),d&&i&&i.revert({kill:!1}).invalidate(),C.isReverted||C.revert(!0,!0),C._subPinOffset=!1;var H=N(),W=K(),Y=A?A.duration():gi(F,D),et=Pt<=.01,Mt=0,bt=T||0,wt=Ar(Rt)?Rt.end:n.end,Nt=n.endTrigger||f,Ot=Ar(Rt)?Rt.start:n.start||(n.start===0||!f?0:p?"0 0":"0 100%"),Bt=C.pinnedContainer=n.pinnedContainer&&cn(n.pinnedContainer,C),qt=f&&Math.max(0,Kt.indexOf(C))||0,jt=qt,ue,pe,on,Ye,Vt,le,re,an,qn,Yn,ln,Se,oi;for(G&&Ar(Rt)&&(Se=Tt.getProperty(X,D.p),oi=Tt.getProperty(Ft,D.p));jt--;)le=Kt[jt],le.end||le.refresh(0,1)||(Be=C),re=le.pin,re&&(re===f||re===p||re===Bt)&&!le.isReverted&&(Yn||(Yn=[]),Yn.unshift(le),le.revert(!0,!0)),le!==Kt[jt]&&(qt--,jt--);for(nn(Ot)&&(Ot=Ot(C)),Ot=qh(Ot,"start",C),ht=ef(Ot,f,H,D,at(),It,X,C,W,k,V,Y,A,C._startClamp&&"_startClamp")||(p?-.001:0),nn(wt)&&(wt=wt(C)),Sn(wt)&&!wt.indexOf("+=")&&(~wt.indexOf(" ")?wt=(Sn(Ot)?Ot.split(" ")[0]:"")+wt:(Mt=Xa(wt.substr(2),H),wt=Sn(Ot)?Ot:(A?Tt.utils.mapRange(0,A.duration(),A.scrollTrigger.start,A.scrollTrigger.end,ht):ht)+Mt,Nt=f)),wt=qh(wt,"end",C),gt=Math.max(ht,ef(wt||(Nt?"100% 0":Y),Nt,H,D,at()+Mt,Gt,Ft,C,W,k,V,Y,A,C._endClamp&&"_endClamp"))||-.001,Mt=0,jt=qt;jt--;)le=Kt[jt],re=le.pin,re&&le.start-le._pinPush<=ht&&!A&&le.end>0&&(ue=le.end-(C._startClamp?Math.max(0,le.start):le.start),(re===f&&le.start-le._pinPush<ht||re===Bt)&&isNaN(Ot)&&(Mt+=ue*(1-le.progress)),re===p&&(bt+=ue));if(ht+=Mt,gt+=Mt,C._startClamp&&(C._startClamp+=Mt),C._endClamp&&!Je&&(C._endClamp=gt||-.001,gt=Math.min(gt,gi(F,D))),Pt=gt-ht||(ht-=.01)&&.001,et&&(B=Tt.utils.clamp(0,1,Tt.utils.normalize(ht,gt,se))),C._pinPush=bt,It&&Mt&&(ue={},ue[D.a]="+="+Mt,Bt&&(ue[D.p]="-="+at()),Tt.set([It,Gt],ue)),p&&!(cu&&C.end>=gi(F,D)))ue=kn(p),Ye=D===De,on=at(),L=parseFloat(ut(D.a))+bt,!Y&&gt>1&&(ln=(I?me.scrollingElement||Qn:F).style,ln={style:ln,value:ln["overflow"+D.a.toUpperCase()]},I&&kn(he)["overflow"+D.a.toUpperCase()]!=="scroll"&&(ln.style["overflow"+D.a.toUpperCase()]="scroll")),nc(p,it,ue),Q=da(p),pe=zi(p,!0),an=V&&_r(F,Ye?en:De)(),g?(st=[g+D.os2,Pt+bt+Le],st.t=it,jt=g===Ee?fl(p,D)+Pt+bt:0,jt&&(st.push(D.d,jt+Le),it.style.flexBasis!=="auto"&&(it.style.flexBasis=jt+Le)),ks(st),Bt&&Kt.forEach(function(Ei){Ei.pin===Bt&&Ei.vars.pinSpacing!==!1&&(Ei._subPinOffset=!0)}),V&&at(se)):(jt=fl(p,D),jt&&it.style.flexBasis!=="auto"&&(it.style.flexBasis=jt+Le)),V&&(Vt={top:pe.top+(Ye?on-ht:an)+Le,left:pe.left+(Ye?an:on-ht)+Le,boxSizing:"border-box",position:"fixed"},Vt[Hr]=Vt["max"+$s]=Math.ceil(pe.width)+Le,Vt[Wr]=Vt["max"+rh]=Math.ceil(pe.height)+Le,Vt[zn]=Vt[zn+Ro]=Vt[zn+Do]=Vt[zn+Io]=Vt[zn+Po]="0",Vt[Ee]=ue[Ee],Vt[Ee+Ro]=ue[Ee+Ro],Vt[Ee+Do]=ue[Ee+Do],Vt[Ee+Io]=ue[Ee+Io],Vt[Ee+Po]=ue[Ee+Po],b=_0(P,Vt,y),Je&&at(0)),i?(qn=i._initted,Kl(1),i.render(i.duration(),!0,!0),nt=ut(D.a)-L+Pt+bt,dt=Math.abs(Pt-nt)>1,V&&dt&&b.splice(b.length-2,2),i.render(0,!0,!0),qn||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Kl(0)):nt=Pt,ln&&(ln.value?ln.style["overflow"+D.a.toUpperCase()]=ln.value:ln.style.removeProperty("overflow-"+D.a));else if(f&&at()&&!A)for(pe=f.parentNode;pe&&pe!==he;)pe._pinOffset&&(ht-=pe._pinOffset,gt-=pe._pinOffset),pe=pe.parentNode;Yn&&Yn.forEach(function(Ei){return Ei.revert(!1,!0)}),C.start=ht,C.end=gt,yt=vt=Je?se:at(),!A&&!Je&&(yt<se&&at(se),C.scroll.rec=0),C.revert(!1,!0),q=Ge(),Ht&&(J=-1,Ht.restart(!0)),Be=0,i&&R&&(i._initted||Me)&&i.progress()!==Me&&i.progress(Me||0,!0).render(i.time(),!0,!0),(et||B!==C.progress||A||d)&&(i&&!R&&i.totalProgress(A&&ht<-.001&&!B?Tt.utils.normalize(ht,gt,0):B,!0),C.progress=et||(yt-ht)/Pt===B?0:B),p&&g&&(it._pinOffset=Math.round(C.progress*nt)),tt&&tt.invalidate(),isNaN(Se)||(Se-=Tt.getProperty(X,D.p),oi-=Tt.getProperty(Ft,D.p),pa(X,D,Se),pa(It,D,Se-(T||0)),pa(Ft,D,oi),pa(Gt,D,oi-(T||0))),et&&!Je&&C.update(),u&&!Je&&!Xt&&(Xt=!0,u(C),Xt=!1)}},C.getVelocity=function(){return(at()-vt)/(Ge()-go)*1e3||0},C.endAnimation=function(){co(C.callbackAnimation),i&&(tt?tt.progress(1):i.paused()?R||co(i,C.direction<0,1):co(i,i.reversed()))},C.labelToScroll=function(_t){return i&&i.labels&&(ht||C.refresh()||ht)+i.labels[_t]/i.duration()*Pt||0},C.getTrailing=function(_t){var Wt=Kt.indexOf(C),Rt=C.direction>0?Kt.slice(0,Wt).reverse():Kt.slice(Wt+1);return(Sn(_t)?Rt.filter(function(T){return T.vars.preventOverlaps===_t}):Rt).filter(function(T){return C.direction>0?T.end<=ht:T.start>=gt})},C.update=function(_t,Wt,Rt){if(!(A&&!Rt&&!_t)){var T=Je===!0?se:C.scroll(),H=_t?0:(T-ht)/Pt,W=H<0?0:H>1?1:H||0,Y=C.progress,et,Mt,bt,wt,Nt,Ot,Bt,qt;if(Wt&&(vt=yt,yt=A?at():T,x&&(St=mt,mt=i&&!R?i.totalProgress():W)),m&&p&&!Be&&!aa&&Gn&&(!W&&ht<T+(T-vt)/(Ge()-go)*m?W=1e-4:W===1&&gt>T+(T-vt)/(Ge()-go)*m&&(W=.9999)),W!==Y&&C.enabled){if(et=C.isActive=!!W&&W<1,Mt=!!Y&&Y<1,Ot=et!==Mt,Nt=Ot||!!W!=!!Y,C.direction=W>Y?1:-1,C.progress=W,Nt&&!Be&&(bt=W&&!Y?0:W===1?1:Y===1?2:3,R&&(wt=!Ot&&U[bt+1]!=="none"&&U[bt+1]||U[bt],qt=i&&(wt==="complete"||wt==="reset"||wt in i))),S&&(Ot||qt)&&(qt||h||!i)&&(nn(S)?S(C):C.getTrailing(S).forEach(function(on){return on.endAnimation()})),R||(tt&&!Be&&!aa?(tt._dp._time-tt._start!==tt._time&&tt.render(tt._dp._time-tt._start),tt.resetTo?tt.resetTo("totalProgress",W,i._tTime/i._tDur):(tt.vars.totalProgress=W,tt.invalidate().restart())):i&&i.totalProgress(W,!!(Be&&(q||_t)))),p){if(_t&&g&&(it.style[g+D.os2]=pt),!V)Et(xo(L+nt*W));else if(Nt){if(Bt=!_t&&W>Y&&gt+1>T&&T+1>=gi(F,D),y)if(!_t&&(et||Bt)){var jt=zi(p,!0),ue=T-ht;nf(p,he,jt.top+(D===De?ue:0)+Le,jt.left+(D===De?0:ue)+Le)}else nf(p,it);ks(et||Bt?b:Q),dt&&W<1&&et||Et(L+(W===1&&!Bt?nt:0))}}x&&!rt.tween&&!Be&&!aa&&Ht.restart(!0),o&&(Ot||w&&W&&(W<1||!Jl))&&Go(o.targets).forEach(function(on){return on.classList[et||w?"add":"remove"](o.className)}),a&&!R&&!_t&&a(C),Nt&&!Be?(R&&(qt&&(wt==="complete"?i.pause().totalProgress(1):wt==="reset"?i.restart(!0).pause():wt==="restart"?i.restart(!0):i[wt]()),a&&a(C)),(Ot||!Jl)&&(c&&Ot&&tc(C,c),z[bt]&&tc(C,z[bt]),w&&(W===1?C.kill(!1,1):z[bt]=0),Ot||(bt=W===1?1:3,z[bt]&&tc(C,z[bt]))),v&&!et&&Math.abs(C.getVelocity())>(vo(v)?v:2500)&&(co(C.callbackAnimation),tt?tt.progress(1):co(i,wt==="reverse"?1:!W,1))):R&&a&&!Be&&a(C)}if(lt){var pe=A?T/A.duration()*(A._caScrollDist||0):T;O(pe+(X._isFlipped?1:0)),lt(pe)}Xn&&Xn(-T/A.duration()*(A._caScrollDist||0))}},C.enable=function(_t,Wt){C.enabled||(C.enabled=!0,Ie(F,"resize",yo),I||Ie(F,"scroll",ls),Z&&Ie(r,"refreshInit",Z),_t!==!1&&(C.progress=B=0,yt=vt=J=at()),Wt!==!1&&C.refresh())},C.getTween=function(_t){return _t&&rt?rt.tween:tt},C.setPositions=function(_t,Wt,Rt,T){if(A){var H=A.scrollTrigger,W=A.duration(),Y=H.end-H.start;_t=H.start+Y*_t/W,Wt=H.start+Y*Wt/W}C.refresh(!1,!1,{start:Yh(_t,Rt&&!!C._startClamp),end:Yh(Wt,Rt&&!!C._endClamp)},T),C.update()},C.adjustPinSpacing=function(_t){if(st&&_t){var Wt=st.indexOf(D.d)+1;st[Wt]=parseFloat(st[Wt])+_t+Le,st[1]=parseFloat(st[1])+_t+Le,ks(st)}},C.disable=function(_t,Wt){if(C.enabled&&(_t!==!1&&C.revert(!0,!0),C.enabled=C.isActive=!1,Wt||tt&&tt.pause(),se=0,ct&&(ct.uncache=1),Z&&Re(r,"refreshInit",Z),Ht&&(Ht.pause(),rt.tween&&rt.tween.kill()&&(rt.tween=0)),!I)){for(var Rt=Kt.length;Rt--;)if(Kt[Rt].scroller===F&&Kt[Rt]!==C)return;Re(F,"resize",yo),I||Re(F,"scroll",ls)}},C.kill=function(_t,Wt){C.disable(_t,Wt),tt&&!Wt&&tt.kill(),l&&delete uu[l];var Rt=Kt.indexOf(C);Rt>=0&&Kt.splice(Rt,1),Rt===Ke&&Ya>0&&Ke--,Rt=0,Kt.forEach(function(T){return T.scroller===C.scroller&&(Rt=1)}),Rt||Je||(C.scroll.rec=0),i&&(i.scrollTrigger=null,_t&&i.revert({kill:!1}),Wt||i.kill()),It&&[It,Gt,X,Ft].forEach(function(T){return T.parentNode&&T.parentNode.removeChild(T)}),Oo===C&&(Oo=0),p&&(ct&&(ct.uncache=1),Rt=0,Kt.forEach(function(T){return T.pin===p&&Rt++}),Rt||(ct.spacer=0)),n.onKill&&n.onKill(C)},Kt.push(C),C.enable(!1,!1),_n&&_n(C),i&&i.add&&!Pt){var Zt=C.update;C.update=function(){C.update=Zt,ht||gt||C.refresh()},Tt.delayedCall(.01,C.update),Pt=.01,ht=gt=0}else C.refresh();p&&p0()},r.register=function(n){return Ts||(Tt=n||om(),sm()&&window.document&&r.enable(),Ts=_o),Ts},r.defaults=function(n){if(n)for(var i in n)ha[i]=n[i];return ha},r.disable=function(n,i){_o=0,Kt.forEach(function(a){return a[i?"kill":"disable"](n)}),Re(te,"wheel",ls),Re(me,"scroll",ls),clearInterval(oa),Re(me,"touchcancel",fi),Re(he,"touchstart",fi),ca(Re,me,"pointerdown,touchstart,mousedown",$h),ca(Re,me,"pointerup,touchend,mouseup",jh),ul.kill(),la(Re);for(var s=0;s<Qt.length;s+=3)ua(Re,Qt[s],Qt[s+1]),ua(Re,Qt[s],Qt[s+2])},r.enable=function(){if(te=window,me=document,Qn=me.documentElement,he=me.body,Tt&&(Go=Tt.utils.toArray,Lo=Tt.utils.clamp,lu=Tt.core.context||fi,Kl=Tt.core.suppressOverwrites||fi,th=te.history.scrollRestoration||"auto",hu=te.pageYOffset,Tt.core.globals("ScrollTrigger",r),he)){_o=1,zs=document.createElement("div"),zs.style.height="100vh",zs.style.position="absolute",mm(),a0(),we.register(Tt),r.isTouch=we.isTouch,tr=we.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),au=we.isTouch===1,Ie(te,"wheel",ls),tm=[te,me,Qn,he],Tt.matchMedia?(r.matchMedia=function(l){var c=Tt.matchMedia(),u;for(u in l)c.add(u,l[u]);return c},Tt.addEventListener("matchMediaInit",function(){return oh()}),Tt.addEventListener("matchMediaRevert",function(){return dm()}),Tt.addEventListener("matchMedia",function(){Ir(0,1),ts("matchMedia")}),Tt.matchMedia("(orientation: portrait)",function(){return ec(),ec})):console.warn("Requires GSAP 3.11.0 or later"),ec(),Ie(me,"scroll",ls);var n=he.style,i=n.borderTopStyle,s=Tt.core.Animation.prototype,a,o;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",a=zi(he),De.m=Math.round(a.top+De.sc())||0,en.m=Math.round(a.left+en.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),oa=setInterval(Jh,250),Tt.delayedCall(.5,function(){return aa=0}),Ie(me,"touchcancel",fi),Ie(he,"touchstart",fi),ca(Ie,me,"pointerdown,touchstart,mousedown",$h),ca(Ie,me,"pointerup,touchend,mouseup",jh),ou=Tt.utils.checkPrefix("transform"),$a.push(ou),Ts=Ge(),ul=Tt.delayedCall(.2,Ir).pause(),Es=[me,"visibilitychange",function(){var l=te.innerWidth,c=te.innerHeight;me.hidden?(Wh=l,Xh=c):(Wh!==l||Xh!==c)&&yo()},me,"DOMContentLoaded",Ir,te,"load",Ir,te,"resize",yo],la(Ie),Kt.forEach(function(l){return l.enable(0,1)}),o=0;o<Qt.length;o+=3)ua(Re,Qt[o],Qt[o+1]),ua(Re,Qt[o],Qt[o+2])}},r.config=function(n){"limitCallbacks"in n&&(Jl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(oa)||(oa=i)&&setInterval(Jh,i),"ignoreMobileResize"in n&&(au=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(la(Re)||la(Ie,n.autoRefreshEvents||"none"),nm=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=cn(n),a=Qt.indexOf(s),o=Jr(s);~a&&Qt.splice(a,o?6:2),i&&(o?yi.unshift(te,i,he,i,Qn,i):yi.unshift(s,i))},r.clearMatchMedia=function(n){Kt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(Sn(n)?cn(n):n).getBoundingClientRect(),o=a[s?Hr:Wr]*i||0;return s?a.right-o>0&&a.left+o<te.innerWidth:a.bottom-o>0&&a.top+o<te.innerHeight},r.positionInViewport=function(n,i,s){Sn(n)&&(n=cn(n));var a=n.getBoundingClientRect(),o=a[s?Hr:Wr],l=i==null?o/2:i in dl?dl[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/te.innerWidth:(a.top+l)/te.innerHeight},r.killAll=function(n){if(Kt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Qr.killAll||[];Qr={},i.forEach(function(s){return s()})}},r}();ne.version="3.12.5";ne.saveStyles=function(r){return r?Go(r).forEach(function(t){if(t&&t.style){var e=Mn.indexOf(t);e>=0&&Mn.splice(e,5),Mn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Tt.core.getCache(t),lu())}}):Mn};ne.revert=function(r,t){return oh(!r,t)};ne.create=function(r,t){return new ne(r,t)};ne.refresh=function(r){return r?yo():(Ts||ne.register())&&Ir(!0)};ne.update=function(r){return++Qt.cache&&Bi(r===!0?2:0)};ne.clearScrollMemory=pm;ne.maxScroll=function(r,t){return gi(r,t?en:De)};ne.getScrollFunc=function(r,t){return _r(cn(r),t?en:De)};ne.getById=function(r){return uu[r]};ne.getAll=function(){return Kt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ne.isScrolling=function(){return!!Gn};ne.snapDirectional=sh;ne.addEventListener=function(r,t){var e=Qr[r]||(Qr[r]=[]);~e.indexOf(t)||e.push(t)};ne.removeEventListener=function(r,t){var e=Qr[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};ne.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,a=function(c,u){var h=[],f=[],p=Tt.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(g){h.length||p.restart(!0),h.push(g.trigger),f.push(g),s<=h.length&&p.progress(1)}},o;for(o in t)n[o]=o.substr(0,2)==="on"&&nn(t[o])&&o!=="onRefreshInit"?a(o,t[o]):t[o];return nn(s)&&(s=s(),Ie(ne,"refresh",function(){return s=t.batchMax()})),Go(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,e.push(ne.create(c))}),e};var sf=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},ic=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(we.isTouch?" pinch-zoom":""):"none",t===Qn&&r(he,e)},ma={auto:1,scroll:1},v0=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,a=s._gsap||Tt.core.getCache(s),o=Ge(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==he&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ma[(l=kn(s)).overflowY]||ma[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Jr(s)&&(ma[(l=kn(s)).overflowY]||ma[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},_m=function(t,e,n,i){return we.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&v0,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Ie(me,we.eventTypes[0],af,!1,!0)},onDisable:function(){return Re(me,we.eventTypes[0],af,!0)}})},y0=/(input|label|select|textarea)/i,of,af=function(t){var e=y0.test(t.target.tagName);(e||of)&&(t._gsapAllow=!0,of=e)},M0=function(t){Ar(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,a=e.onRelease,o,l,c=cn(t.target)||Qn,u=Tt.core.globals().ScrollSmoother,h=u&&u.get(),f=tr&&(t.content&&cn(t.content)||h&&t.content!==!1&&!h.smooth()&&h.content()),p=_r(c,De),g=_r(c,en),d=1,m=(we.isTouch&&te.visualViewport?te.visualViewport.scale*te.visualViewport.width:te.outerWidth)/te.innerWidth,_=0,M=nn(i)?function(){return i(o)}:function(){return i||2.8},w,x,y=_m(c,t.type,!0,s),E=function(){return x=!1},A=fi,v=fi,S=function(){l=gi(c,De),v=Lo(tr?1:0,l),n&&(A=Lo(0,gi(c,en))),w=Xr},D=function(){f._gsap.y=xo(parseFloat(f._gsap.y)+p.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",p.offset=p.cacheID=0},R=function(){if(x){requestAnimationFrame(E);var G=xo(o.deltaY/2),k=v(p.v-G);if(f&&k!==p.v+p.offset){p.offset=k-p.v;var C=xo((parseFloat(f&&f._gsap.y)||0)-p.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+C+", 0, 1)",f._gsap.y=C+"px",p.cacheID=Qt.cache,Bi()}return!0}p.offset&&D(),x=!0},F,$,I,V,z=function(){S(),F.isActive()&&F.vars.scrollY>l&&(p()>l?F.progress(1)&&p(l):F.resetTo("scrollY",l))};return f&&Tt.set(f,{y:"+=0"}),t.ignoreCheck=function(U){return tr&&U.type==="touchmove"&&R()||d>1.05&&U.type!=="touchstart"||o.isGesturing||U.touches&&U.touches.length>1},t.onPress=function(){x=!1;var U=d;d=xo((te.visualViewport&&te.visualViewport.scale||1)/m),F.pause(),U!==d&&ic(c,d>1.01?!0:n?!1:"x"),$=g(),I=p(),S(),w=Xr},t.onRelease=t.onGestureStart=function(U,G){if(p.offset&&D(),!G)V.restart(!0);else{Qt.cache++;var k=M(),C,Z;n&&(C=g(),Z=C+k*.05*-U.velocityX/.227,k*=sf(g,C,Z,gi(c,en)),F.vars.scrollX=A(Z)),C=p(),Z=C+k*.05*-U.velocityY/.227,k*=sf(p,C,Z,gi(c,De)),F.vars.scrollY=v(Z),F.invalidate().duration(k).play(.01),(tr&&F.vars.scrollY>=l||C>=l-1)&&Tt.to({},{onUpdate:z,duration:k})}a&&a(U)},t.onWheel=function(){F._ts&&F.pause(),Ge()-_>1e3&&(w=0,_=Ge())},t.onChange=function(U,G,k,C,Z){if(Xr!==w&&S(),G&&n&&g(A(C[2]===G?$+(U.startX-U.x):g()+G-C[1])),k){p.offset&&D();var N=Z[2]===k,K=N?I+U.startY-U.y:p()+k-Z[1],J=v(K);N&&K!==J&&(I+=J-K),p(J)}(k||G)&&Bi()},t.onEnable=function(){ic(c,n?!1:"x"),ne.addEventListener("refresh",z),Ie(te,"resize",z),p.smooth&&(p.target.style.scrollBehavior="auto",p.smooth=g.smooth=!1),y.enable()},t.onDisable=function(){ic(c,!0),Re(te,"resize",z),ne.removeEventListener("refresh",z),y.kill()},t.lockAxis=t.lockAxis!==!1,o=new we(t),o.iOS=tr,tr&&!p()&&p(1),tr&&Tt.ticker.add(fi),V=o._dc,F=Tt.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:gm(p,p(),function(){return F.pause()})},onUpdate:Bi,onComplete:V.vars.onComplete}),o};ne.sort=function(r){return Kt.sort(r||function(t,e){return(t.vars.refreshPriority||0)*-1e6+t.start-(e.start+(e.vars.refreshPriority||0)*-1e6)})};ne.observe=function(r){return new we(r)};ne.normalizeScroll=function(r){if(typeof r>"u")return Ze;if(r===!0&&Ze)return Ze.enable();if(r===!1){Ze&&Ze.kill(),Ze=r;return}var t=r instanceof we?r:M0(r);return Ze&&Ze.target===t.target&&Ze.kill(),Jr(t.target)&&(Ze=t),t};ne.core={_getVelocityProp:su,_inputObserver:_m,_scrollers:Qt,_proxies:yi,bridge:{ss:function(){Gn||ts("scrollStart"),Gn=Ge()},ref:function(){return Be}}};om()&&Tt.registerPlugin(ne);/*!
 * OverlayScrollbars
 * Version: 2.10.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */const bn=(r,t)=>{const{o:e,i:n,u:i}=r;let s=e,a;const o=(u,h)=>{const f=s,p=u,g=h||(n?!n(f,p):f!==p);return(g||i)&&(s=p,a=f),[s,g,a]};return[t?u=>o(t(s,a),u):o,u=>[s,!!u,a]]},S0=typeof window<"u"&&typeof HTMLElement<"u"&&!!window.document,hn=S0?window:{},pl=Math.max,b0=Math.min,du=Math.round,ml=Math.abs,lf=Math.sign,ah=hn.cancelAnimationFrame,Al=hn.requestAnimationFrame,gl=hn.setTimeout,pu=hn.clearTimeout,Ll=r=>typeof hn[r]<"u"?hn[r]:void 0,w0=Ll("MutationObserver"),cf=Ll("IntersectionObserver"),_l=Ll("ResizeObserver"),Za=Ll("ScrollTimeline"),lh=r=>r===void 0,Dl=r=>r===null,Mi=r=>typeof r=="number",Zo=r=>typeof r=="string",ch=r=>typeof r=="boolean",In=r=>typeof r=="function",wi=r=>Array.isArray(r),xl=r=>typeof r=="object"&&!wi(r)&&!Dl(r),uh=r=>{const t=!!r&&r.length,e=Mi(t)&&t>-1&&t%1==0;return wi(r)||!In(r)&&e?t>0&&xl(r)?t-1 in r:!0:!1},vl=r=>!!r&&r.constructor===Object,yl=r=>r instanceof HTMLElement,Pl=r=>r instanceof Element,uf=()=>performance.now(),rc=(r,t,e,n,i)=>{let s=0;const a=uf(),o=pl(0,e),l=c=>{const u=uf(),f=u-a>=o,p=c?1:1-(pl(0,a+o-u)/o||0),g=(t-r)*(In(i)?i(p,p*o,0,1,o):p)+r,d=f||p===1;n&&n(g,p,d),s=d?0:Al(()=>l())};return l(),c=>{ah(s),c&&l(c)}};function oe(r,t){if(uh(r))for(let e=0;e<r.length&&t(r[e],e,r)!==!1;e++);else r&&oe(Object.keys(r),e=>t(r[e],e,r));return r}const xm=(r,t)=>r.indexOf(t)>=0,Wo=(r,t)=>r.concat(t),ve=(r,t,e)=>(!Zo(t)&&uh(t)?Array.prototype.push.apply(r,t):r.push(t),r),vr=r=>Array.from(r||[]),hh=r=>wi(r)?r:!Zo(r)&&uh(r)?vr(r):[r],mu=r=>!!r&&!r.length,gu=r=>vr(new Set(r)),Pn=(r,t,e)=>{oe(r,i=>i?i.apply(void 0,t||[]):!0),!e&&(r.length=0)},vm="paddingTop",ym="paddingRight",Mm="paddingLeft",Sm="paddingBottom",bm="marginLeft",wm="marginRight",Tm="marginBottom",Em="overflowX",Cm="overflowY",Rl="width",Il="height",er="visible",Or="hidden",js="scroll",T0=r=>{const t=String(r||"");return t?t[0].toUpperCase()+t.slice(1):""},Ol=(r,t,e,n)=>{if(r&&t){let i=!0;return oe(e,s=>{const a=r[s],o=t[s];a!==o&&(i=!1)}),i}return!1},Am=(r,t)=>Ol(r,t,["w","h"]),Ka=(r,t)=>Ol(r,t,["x","y"]),E0=(r,t)=>Ol(r,t,["t","r","b","l"]),hr=()=>{},kt=(r,...t)=>r.bind(0,...t),Fr=r=>{let t;const e=r?gl:Al,n=r?pu:ah;return[i=>{n(t),t=e(()=>i(),In(r)?r():r)},()=>n(t)]},_u=(r,t)=>{const{_:e,p:n,v:i,S:s}=t||{};let a,o,l,c,u=hr;const h=function(m){u(),pu(a),c=a=o=void 0,u=hr,r.apply(this,m)},f=d=>s&&o?s(o,d):d,p=()=>{u!==hr&&h(f(l)||l)},g=function(){const m=vr(arguments),_=In(e)?e():e;if(Mi(_)&&_>=0){const w=In(n)?n():n,x=Mi(w)&&w>=0,y=_>0?gl:Al,E=_>0?pu:ah,v=f(m)||m,S=h.bind(0,v);let D;u(),i&&!c?(S(),c=!0,D=y(()=>c=void 0,_)):(D=y(S,_),x&&!a&&(a=gl(p,w))),u=()=>E(D),o=l=v}else h(m)};return g.m=p,g},Lm=(r,t)=>Object.prototype.hasOwnProperty.call(r,t),ri=r=>r?Object.keys(r):[],ie=(r,t,e,n,i,s,a)=>{const o=[t,e,n,i,s,a];return(typeof r!="object"||Dl(r))&&!In(r)&&(r={}),oe(o,l=>{oe(l,(c,u)=>{const h=l[u];if(r===h)return!0;const f=wi(h);if(h&&vl(h)){const p=r[u];let g=p;f&&!wi(p)?g=[]:!f&&!vl(p)&&(g={}),r[u]=ie(g,h)}else r[u]=f?h.slice():h})}),r},Dm=(r,t)=>oe(ie({},r),(e,n,i)=>{e===void 0?delete i[n]:e&&vl(e)&&(i[n]=Dm(e))}),fh=r=>!ri(r).length,Pm=(r,t,e)=>pl(r,b0(t,e)),qr=r=>gu((wi(r)?r:(r||"").split(" ")).filter(t=>t)),dh=(r,t)=>r&&r.getAttribute(t),hf=(r,t)=>r&&r.hasAttribute(t),Ii=(r,t,e)=>{oe(qr(t),n=>{r&&r.setAttribute(n,String(e||""))})},ui=(r,t)=>{oe(qr(t),e=>r&&r.removeAttribute(e))},Fl=(r,t)=>{const e=qr(dh(r,t)),n=kt(Ii,r,t),i=(s,a)=>{const o=new Set(e);return oe(qr(s),l=>{o[a](l)}),vr(o).join(" ")};return{O:s=>n(i(s,"delete")),$:s=>n(i(s,"add")),C:s=>{const a=qr(s);return a.reduce((o,l)=>o&&e.includes(l),a.length>0)}}},Rm=(r,t,e)=>(Fl(r,t).O(e),kt(ph,r,t,e)),ph=(r,t,e)=>(Fl(r,t).$(e),kt(Rm,r,t,e)),Ml=(r,t,e,n)=>(n?ph:Rm)(r,t,e),mh=(r,t,e)=>Fl(r,t).C(e),Im=r=>Fl(r,"class"),Om=(r,t)=>{Im(r).O(t)},gh=(r,t)=>(Im(r).$(t),kt(Om,r,t)),Fm=(r,t)=>{const e=t?Pl(t)&&t:document;return e?vr(e.querySelectorAll(r)):[]},C0=(r,t)=>{const e=t?Pl(t)&&t:document;return e&&e.querySelector(r)},xu=(r,t)=>Pl(r)&&r.matches(t),Nm=r=>xu(r,"body"),vu=r=>r?vr(r.childNodes):[],Xo=r=>r&&r.parentElement,Ps=(r,t)=>Pl(r)&&r.closest(t),yu=r=>document.activeElement,A0=(r,t,e)=>{const n=Ps(r,t),i=r&&C0(e,n),s=Ps(i,t)===n;return n&&i?n===r||i===r||s&&Ps(Ps(r,e),t)!==n:!1},Zs=r=>{oe(hh(r),t=>{const e=Xo(t);t&&e&&e.removeChild(t)})},Cn=(r,t)=>kt(Zs,r&&t&&oe(hh(t),e=>{e&&r.appendChild(e)})),Us=r=>{const t=document.createElement("div");return Ii(t,"class",r),t},zm=r=>{const t=Us();return t.innerHTML=r.trim(),oe(vu(t),e=>Zs(e))},ff=(r,t)=>r.getPropertyValue(t)||r[t]||"",km=r=>{const t=r||0;return isFinite(t)?t:0},ga=r=>km(parseFloat(r||"")),Mu=r=>Math.round(r*1e4)/1e4,Um=r=>`${Mu(km(r))}px`;function qo(r,t){r&&t&&oe(t,(e,n)=>{try{const i=r.style,s=Dl(e)||ch(e)?"":Mi(e)?Um(e):e;n.indexOf("--")===0?i.setProperty(n,s):i[n]=s}catch{}})}function Wi(r,t,e){const n=Zo(t);let i=n?"":{};if(r){const s=hn.getComputedStyle(r,e)||r.style;i=n?ff(s,t):vr(t).reduce((a,o)=>(a[o]=ff(s,o),a),i)}return i}const df=(r,t,e)=>{const n=t?`${t}-`:"",i=e?`-${e}`:"",s=`${n}top${i}`,a=`${n}right${i}`,o=`${n}bottom${i}`,l=`${n}left${i}`,c=Wi(r,[s,a,o,l]);return{t:ga(c[s]),r:ga(c[a]),b:ga(c[o]),l:ga(c[l])}},L0=(r,t)=>`translate${xl(r)?`(${r.x},${r.y})`:`Y(${r})`}`,D0=r=>!!(r.offsetWidth||r.offsetHeight||r.getClientRects().length),P0={w:0,h:0},Nl=(r,t)=>t?{w:t[`${r}Width`],h:t[`${r}Height`]}:P0,R0=r=>Nl("inner",r||hn),Bs=kt(Nl,"offset"),Bm=kt(Nl,"client"),Sl=kt(Nl,"scroll"),_h=r=>{const t=parseFloat(Wi(r,Rl))||0,e=parseFloat(Wi(r,Il))||0;return{w:t-du(t),h:e-du(e)}},sc=r=>r.getBoundingClientRect(),I0=r=>!!r&&D0(r),Su=r=>!!(r&&(r[Il]||r[Rl])),Vm=(r,t)=>{const e=Su(r);return!Su(t)&&e},pf=(r,t,e,n)=>{oe(qr(t),i=>{r&&r.removeEventListener(i,e,n)})},fe=(r,t,e,n)=>{var i;const s=(i=n&&n.H)!=null?i:!0,a=n&&n.I||!1,o=n&&n.A||!1,l={passive:s,capture:a};return kt(Pn,qr(t).map(c=>{const u=o?h=>{pf(r,c,u,a),e&&e(h)}:e;return r&&r.addEventListener(c,u,l),kt(pf,r,c,u,a)}))},Gm=r=>r.stopPropagation(),bu=r=>r.preventDefault(),Hm=r=>Gm(r)||bu(r),_i=(r,t)=>{const{x:e,y:n}=Mi(t)?{x:t,y:t}:t||{};Mi(e)&&(r.scrollLeft=e),Mi(n)&&(r.scrollTop=n)},An=r=>({x:r.scrollLeft,y:r.scrollTop}),Wm=()=>({D:{x:0,y:0},M:{x:0,y:0}}),O0=(r,t)=>{const{D:e,M:n}=r,{w:i,h:s}=t,a=(h,f,p)=>{let g=lf(h)*p,d=lf(f)*p;if(g===d){const m=ml(h),_=ml(f);d=m>_?0:d,g=m<_?0:g}return g=g===d?0:g,[g+0,d+0]},[o,l]=a(e.x,n.x,i),[c,u]=a(e.y,n.y,s);return{D:{x:o,y:c},M:{x:l,y:u}}},mf=({D:r,M:t})=>{const e=(n,i)=>n===0&&n<=i;return{x:e(r.x,t.x),y:e(r.y,t.y)}},gf=({D:r,M:t},e)=>{const n=(i,s,a)=>Pm(0,1,(i-a)/(i-s)||0);return{x:n(r.x,t.x,e.x),y:n(r.y,t.y,e.y)}},wu=r=>{r&&r.focus&&r.focus({preventScroll:!0})},_f=(r,t)=>{oe(hh(t),r)},Tu=r=>{const t=new Map,e=(s,a)=>{if(s){const o=t.get(s);_f(l=>{o&&o[l?"delete":"clear"](l)},a)}else t.forEach(o=>{o.clear()}),t.clear()},n=(s,a)=>{if(Zo(s)){const c=t.get(s)||new Set;return t.set(s,c),_f(u=>{In(u)&&c.add(u)},a),kt(e,s,a)}ch(a)&&a&&e();const o=ri(s),l=[];return oe(o,c=>{const u=s[c];u&&ve(l,n(c,u))}),kt(Pn,l)},i=(s,a)=>{oe(vr(t.get(s)),o=>{a&&!mu(a)?o.apply(0,a):o()})};return n(r||{}),[n,e,i]},Xm={},qm={},F0=r=>{oe(r,t=>oe(t,(e,n)=>{Xm[n]=t[n]}))},Ym=(r,t,e)=>ri(r).map(n=>{const{static:i,instance:s}=r[n],[a,o,l]=e||[],c=e?s:i;if(c){const u=e?c(a,o,t):c(t);return(l||qm)[n]=u}}),Ko=r=>qm[r],N0="__osOptionsValidationPlugin",ro="data-overlayscrollbars",Ja="os-environment",_a=`${Ja}-scrollbar-hidden`,oc=`${ro}-initialize`,Qa="noClipping",xf=`${ro}-body`,fr=ro,z0="host",Oi=`${ro}-viewport`,k0=Em,U0=Cm,B0="arrange",$m="measuring",V0="scrolling",jm="scrollbarHidden",G0="noContent",Eu=`${ro}-padding`,vf=`${ro}-content`,xh="os-size-observer",H0=`${xh}-appear`,W0=`${xh}-listener`,X0="os-trinsic-observer",q0="os-theme-none",On="os-scrollbar",Y0=`${On}-rtl`,$0=`${On}-horizontal`,j0=`${On}-vertical`,Zm=`${On}-track`,vh=`${On}-handle`,Z0=`${On}-visible`,K0=`${On}-cornerless`,yf=`${On}-interaction`,Mf=`${On}-unusable`,Cu=`${On}-auto-hide`,Sf=`${Cu}-hidden`,bf=`${On}-wheel`,J0=`${Zm}-interactive`,Q0=`${vh}-interactive`,tx="__osSizeObserverPlugin",ex=(r,t)=>{const{T:e}=t,[n,i]=r("showNativeOverlaidScrollbars");return[n&&e.x&&e.y,i]},Ks=r=>r.indexOf(er)===0,nx=(r,t)=>{const e=(i,s,a,o)=>{const l=i===er?Or:i.replace(`${er}-`,""),c=Ks(i),u=Ks(a);return!s&&!o?Or:c&&u?er:c?s&&o?l:s?er:Or:s?l:u&&o?er:Or},n={x:e(t.x,r.x,t.y,r.y),y:e(t.y,r.y,t.x,r.x)};return{k:n,R:{x:n.x===js,y:n.y===js}}},Km="__osScrollbarsHidingPlugin",Jm="__osClickScrollPlugin",Lw={[Jm]:{static:()=>(r,t,e,n)=>{let i=!1,s=hr;const a=133,o=222,[l,c]=Fr(a),u=Math.sign(t),h=e*u,f=h/2,p=_=>1-(1-_)*(1-_),g=(_,M)=>rc(_,M,o,r,p),d=(_,M)=>rc(_,t-h,a*M,(w,x,y)=>{r(w),y&&(s=g(w,t))}),m=rc(0,h,o,(_,M,w)=>{if(r(_),w&&(n(i),!i)){const x=t-_;Math.sign(x-f)===u&&l(()=>{const E=x-h;s=Math.sign(E)===u?d(_,Math.abs(E)/e):g(_,t)})}},p);return _=>{i=!0,_&&m(),c(),s()}}}},wf=r=>JSON.stringify(r,(t,e)=>{if(In(e))throw 0;return e}),Tf=(r,t)=>r?`${t}`.split(".").reduce((e,n)=>e&&Lm(e,n)?e[n]:void 0,r):void 0,ix={paddingAbsolute:!1,showNativeOverlaidScrollbars:!1,update:{elementEvents:[["img","load"]],debounce:[0,33],attributes:null,ignoreMutation:null},overflow:{x:"scroll",y:"scroll"},scrollbars:{theme:"os-theme-dark",visibility:"auto",autoHide:"never",autoHideDelay:1300,autoHideSuspend:!1,dragScroll:!0,clickScroll:!1,pointers:["mouse","touch","pen"]}},Qm=(r,t)=>{const e={},n=Wo(ri(t),ri(r));return oe(n,i=>{const s=r[i],a=t[i];if(xl(s)&&xl(a))ie(e[i]={},Qm(s,a)),fh(e[i])&&delete e[i];else if(Lm(t,i)&&a!==s){let o=!0;if(wi(s)||wi(a))try{wf(s)===wf(a)&&(o=!1)}catch{}o&&(e[i]=a)}}),e},Ef=(r,t,e)=>n=>[Tf(r,n),e||Tf(t,n)!==void 0];let tg;const rx=()=>tg,sx=r=>{tg=r};let ac;const ox=()=>{const r=(x,y,E)=>{Cn(document.body,x),Cn(document.body,x);const A=Bm(x),v=Bs(x),S=_h(y);return E&&Zs(x),{x:v.h-A.h+S.h,y:v.w-A.w+S.w}},t=x=>{let y=!1;const E=gh(x,_a);try{y=Wi(x,"scrollbar-width")==="none"||Wi(x,"display","::-webkit-scrollbar")==="none"}catch{}return E(),y},e=`.${Ja}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Ja} div{width:200%;height:200%;margin:10px 0}.${_a}{scrollbar-width:none!important}.${_a}::-webkit-scrollbar,.${_a}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`,i=zm(`<div class="${Ja}"><div></div><style>${e}</style></div>`)[0],s=i.firstChild,a=i.lastChild,o=rx();o&&(a.nonce=o);const[l,,c]=Tu(),[u,h]=bn({o:r(i,s),i:Ka},kt(r,i,s,!0)),[f]=h(),p=t(i),g={x:f.x===0,y:f.y===0},d={elements:{host:null,padding:!p,viewport:x=>p&&Nm(x)&&x,content:!1},scrollbars:{slot:!0},cancel:{nativeScrollbarsOverlaid:!1,body:null}},m=ie({},ix),_=kt(ie,{},m),M=kt(ie,{},d),w={N:f,T:g,P:p,G:!!Za,K:kt(l,"r"),Z:M,tt:x=>ie(d,x)&&M(),nt:_,ot:x=>ie(m,x)&&_(),st:ie({},d),et:ie({},m)};if(ui(i,"style"),Zs(i),fe(hn,"resize",()=>{c("r",[])}),In(hn.matchMedia)&&!p&&(!g.x||!g.y)){const x=y=>{const E=hn.matchMedia(`(resolution: ${hn.devicePixelRatio}dppx)`);fe(E,"change",()=>{y(),x(y)},{A:!0})};x(()=>{const[y,E]=u();ie(w.N,y),c("r",[E])})}return w},Ti=()=>(ac||(ac=ox()),ac),ax=(r,t,e)=>{let n=!1;const i=e?new WeakMap:!1,s=()=>{n=!0},a=o=>{if(i&&e){const l=e.map(c=>{const[u,h]=c||[];return[h&&u?(o||Fm)(u,r):[],h]});oe(l,c=>oe(c[0],u=>{const h=c[1],f=i.get(u)||[];if(r.contains(u)&&h){const g=fe(u,h,d=>{n?(g(),i.delete(u)):t(d)});i.set(u,ve(f,g))}else Pn(f),i.delete(u)}))}};return a(),[s,a]},Cf=(r,t,e,n)=>{let i=!1;const{ct:s,rt:a,lt:o,it:l,ut:c,_t:u}=n||{},h=_u(()=>i&&e(!0),{_:33,p:99}),[f,p]=ax(r,h,o),g=s||[],d=a||[],m=Wo(g,d),_=(w,x)=>{if(!mu(x)){const y=c||hr,E=u||hr,A=[],v=[];let S=!1,D=!1;if(oe(x,R=>{const{attributeName:F,target:$,type:I,oldValue:V,addedNodes:z,removedNodes:U}=R,G=I==="attributes",k=I==="childList",C=r===$,Z=G&&F,N=Z&&dh($,F||""),K=Zo(N)?N:null,J=Z&&V!==K,q=xm(d,F)&&J;if(t&&(k||!C)){const B=G&&J,at=B&&l&&xu($,l),ct=(at?!y($,F,V,K):!G||B)&&!E(R,!!at,r,n);oe(z,ot=>ve(A,ot)),oe(U,ot=>ve(A,ot)),D=D||ct}!t&&C&&J&&!y($,F,V,K)&&(ve(v,F),S=S||q)}),p(R=>gu(A).reduce((F,$)=>(ve(F,Fm(R,$)),xu($,R)?ve(F,$):F),[])),t)return!w&&D&&e(!1),[!1];if(!mu(v)||S){const R=[gu(v),S];return!w&&e.apply(0,R),R}}},M=new w0(kt(_,!1));return[()=>(M.observe(r,{attributes:!0,attributeOldValue:!0,attributeFilter:m,subtree:t,childList:t,characterData:t}),i=!0,()=>{i&&(f(),M.disconnect(),i=!1)}),()=>{if(i)return h.m(),_(!0,M.takeRecords())}]},eg=(r,t,e)=>{const{dt:n}=e||{},i=Ko(tx),[s]=bn({o:!1,u:!0});return()=>{const a=[],l=zm(`<div class="${xh}"><div class="${W0}"></div></div>`)[0],c=l.firstChild,u=h=>{const f=h instanceof ResizeObserverEntry;let p=!1,g=!1;if(f){const[d,,m]=s(h.contentRect),_=Su(d);g=Vm(d,m),p=!g&&!_}else g=h===!0;p||t({ft:!0,dt:g})};if(_l){const h=new _l(f=>u(f.pop()));h.observe(c),ve(a,()=>{h.disconnect()})}else if(i){const[h,f]=i(c,u,n);ve(a,Wo([gh(l,H0),fe(l,"animationstart",h)],f))}else return hr;return kt(Pn,ve(a,Cn(r,l)))}},lx=(r,t)=>{let e;const n=l=>l.h===0||l.isIntersecting||l.intersectionRatio>0,i=Us(X0),[s]=bn({o:!1}),a=(l,c)=>{if(l){const u=s(n(l)),[,h]=u;return h&&!c&&t(u)&&[u]}},o=(l,c)=>a(c.pop(),l);return[()=>{const l=[];if(cf)e=new cf(kt(o,!1),{root:r}),e.observe(i),ve(l,()=>{e.disconnect()});else{const c=()=>{const u=Bs(i);a(u)};ve(l,eg(i,c)()),c()}return kt(Pn,ve(l,Cn(r,i)))},()=>e&&o(!0,e.takeRecords())]},cx=(r,t,e,n)=>{let i,s,a,o,l,c;const u=`[${fr}]`,h=`[${Oi}]`,f=["id","class","style","open","wrap","cols","rows"],{vt:p,ht:g,U:d,gt:m,bt:_,L:M,wt:w,yt:x,St:y,Ot:E}=r,A=q=>Wi(q,"direction")==="rtl",v={$t:!1,F:A(p)},S=Ti(),D=Ko(Km),[R]=bn({i:Am,o:{w:0,h:0}},()=>{const q=D&&D.V(r,t,v,S,e).X,at=!(w&&M)&&mh(g,fr,Qa),rt=!M&&x(B0),ct=rt&&An(m),ot=ct&&E(),yt=y($m,at),vt=rt&&q&&q()[0],ht=Sl(d),gt=_h(d);return vt&&vt(),_i(m,ct),ot&&ot(),at&&yt(),{w:ht.w+gt.w,h:ht.h+gt.h}}),F=_u(n,{_:()=>i,p:()=>s,S(q,B){const[at]=q,[rt]=B;return[Wo(ri(at),ri(rt)).reduce((ct,ot)=>(ct[ot]=at[ot]||rt[ot],ct),{})]}}),$=q=>{const B=A(p);ie(q,{Ct:c!==B}),ie(v,{F:B}),c=B},I=(q,B)=>{const[at,rt]=q,ct={xt:rt};return ie(v,{$t:at}),!B&&n(ct),ct},V=({ft:q,dt:B})=>{const rt=!(q&&!B)&&S.P?F:n,ct={ft:q||B,dt:B};$(ct),rt(ct)},z=(q,B)=>{const[,at]=R(),rt={Ht:at};return $(rt),at&&!B&&(q?n:F)(rt),rt},U=(q,B,at)=>{const rt={Et:B};return $(rt),B&&!at&&F(rt),rt},[G,k]=_?lx(g,I):[],C=!M&&eg(g,V,{dt:!0}),[Z,N]=Cf(g,!1,U,{rt:f,ct:f}),K=M&&_l&&new _l(q=>{const B=q[q.length-1].contentRect;V({ft:!0,dt:Vm(B,l)}),l=B}),J=_u(()=>{const[,q]=R();n({Ht:q})},{_:222,v:!0});return[()=>{K&&K.observe(g);const q=C&&C(),B=G&&G(),at=Z(),rt=S.K(ct=>{ct?F({zt:ct}):J()});return()=>{K&&K.disconnect(),q&&q(),B&&B(),o&&o(),at(),rt()}},({It:q,At:B,Dt:at})=>{const rt={},[ct]=q("update.ignoreMutation"),[ot,yt]=q("update.attributes"),[vt,ht]=q("update.elementEvents"),[gt,It]=q("update.debounce"),Gt=ht||yt,X=B||at,Ft=Ct=>In(ct)&&ct(Ct);if(Gt){a&&a(),o&&o();const[Ct,Xt]=Cf(_||d,!0,z,{ct:Wo(f,ot||[]),lt:vt,it:u,_t:(Pt,P)=>{const{target:b,attributeName:Q}=Pt;return(!P&&Q&&!M?A0(b,u,h):!1)||!!Ps(b,`.${On}`)||!!Ft(Pt)}});o=Ct(),a=Xt}if(It)if(F.m(),wi(gt)){const Ct=gt[0],Xt=gt[1];i=Mi(Ct)&&Ct,s=Mi(Xt)&&Xt}else Mi(gt)?(i=gt,s=!1):(i=!1,s=!1);if(X){const Ct=N(),Xt=k&&k(),Pt=a&&a();Ct&&ie(rt,U(Ct[0],Ct[1],X)),Xt&&ie(rt,I(Xt[0],X)),Pt&&ie(rt,z(Pt[0],X))}return $(rt),rt},v]},ng=(r,t)=>In(t)?t.apply(0,r):t,ux=(r,t,e,n)=>{const i=lh(n)?e:n;return ng(r,i)||t.apply(0,r)},ig=(r,t,e,n)=>{const i=lh(n)?e:n,s=ng(r,i);return!!s&&(yl(s)?s:t.apply(0,r))},hx=(r,t)=>{const{nativeScrollbarsOverlaid:e,body:n}=t||{},{T:i,P:s,Z:a}=Ti(),{nativeScrollbarsOverlaid:o,body:l}=a().cancel,c=e??o,u=lh(n)?l:n,h=(i.x||i.y)&&c,f=r&&(Dl(u)?!s:u);return!!h||!!f},fx=(r,t,e,n)=>{const i="--os-viewport-percent",s="--os-scroll-percent",a="--os-scroll-direction",{Z:o}=Ti(),{scrollbars:l}=o(),{slot:c}=l,{vt:u,ht:h,U:f,Mt:p,gt:g,wt:d,L:m}=t,{scrollbars:_}=p?{}:r,{slot:M}=_||{},w=[],x=[],y=[],E=ig([u,h,f],()=>m&&d?u:h,c,M),A=Z=>{if(Za){const N=new Za({source:g,axis:Z});return{kt:J=>{const q=J.Tt.animate({clear:["left"],[s]:[0,1]},{timeline:N});return()=>q.cancel()}}}},v={x:A("x"),y:A("y")},S=()=>{const{Rt:Z,Vt:N}=e,K=(J,q)=>Pm(0,1,J/(J+q)||0);return{x:K(N.x,Z.x),y:K(N.y,Z.y)}},D=(Z,N,K)=>{const J=K?gh:Om;oe(Z,q=>{J(q.Tt,N)})},R=(Z,N)=>{oe(Z,K=>{const[J,q]=N(K);qo(J,q)})},F=(Z,N,K)=>{const J=ch(K),q=J?K:!0,B=J?!K:!0;q&&D(x,Z,N),B&&D(y,Z,N)},$=()=>{const Z=S(),N=K=>J=>[J.Tt,{[i]:Mu(K)+""}];R(x,N(Z.x)),R(y,N(Z.y))},I=()=>{if(!Za){const{Lt:Z}=e,N=gf(Z,An(g)),K=J=>q=>[q.Tt,{[s]:Mu(J)+""}];R(x,K(N.x)),R(y,K(N.y))}},V=()=>{const{Lt:Z}=e,N=mf(Z),K=J=>q=>[q.Tt,{[a]:J?"0":"1"}];R(x,K(N.x)),R(y,K(N.y))},z=()=>{if(m&&!d){const{Rt:Z,Lt:N}=e,K=mf(N),J=gf(N,An(g)),q=B=>{const{Tt:at}=B,rt=Xo(at)===f&&at,ct=(ot,yt,vt)=>{const ht=yt*ot;return Um(vt?ht:-ht)};return[rt,rt&&{transform:L0({x:ct(J.x,Z.x,K.x),y:ct(J.y,Z.y,K.y)})}]};R(x,q),R(y,q)}},U=Z=>{const N=Z?"x":"y",J=Us(`${On} ${Z?$0:j0}`),q=Us(Zm),B=Us(vh),at={Tt:J,Ut:q,Pt:B},rt=v[N];return ve(Z?x:y,at),ve(w,[Cn(J,q),Cn(q,B),kt(Zs,J),rt&&rt.kt(at),n(at,F,Z)]),at},G=kt(U,!0),k=kt(U,!1),C=()=>(Cn(E,x[0].Tt),Cn(E,y[0].Tt),kt(Pn,w));return G(),k(),[{Nt:$,qt:I,Bt:V,Ft:z,jt:F,Yt:{Wt:x,Xt:G,Jt:kt(R,x)},Gt:{Wt:y,Xt:k,Jt:kt(R,y)}},C]},dx=(r,t,e,n)=>(i,s,a)=>{const{ht:o,U:l,L:c,gt:u,Kt:h,Ot:f}=t,{Tt:p,Ut:g,Pt:d}=i,[m,_]=Fr(333),[M,w]=Fr(444),x=A=>{In(u.scrollBy)&&u.scrollBy({behavior:"smooth",left:A.x,top:A.y})},y=()=>{const A="pointerup pointercancel lostpointercapture",v=`client${a?"X":"Y"}`,S=a?Rl:Il,D=a?"left":"top",R=a?"w":"h",F=a?"x":"y",$=(V,z)=>U=>{const{Rt:G}=e,k=Bs(g)[R]-Bs(d)[R],Z=z*U/k*G[F];_i(u,{[F]:V+Z})},I=[];return fe(g,"pointerdown",V=>{const z=Ps(V.target,`.${vh}`)===d,U=z?d:g,G=r.scrollbars,k=G[z?"dragScroll":"clickScroll"],{button:C,isPrimary:Z,pointerType:N}=V,{pointers:K}=G;if(C===0&&Z&&k&&(K||[]).includes(N)){Pn(I),w();const q=!z&&(V.shiftKey||k==="instant"),B=kt(sc,d),at=kt(sc,g),rt=(P,b)=>(P||B())[D]-(b||at())[D],ct=du(sc(u)[S])/Bs(u)[R]||1,ot=$(An(u)[F],1/ct),yt=V[v],vt=B(),ht=at(),gt=vt[S],It=rt(vt,ht)+gt/2,Gt=yt-ht[D],X=z?0:Gt-It,Ft=P=>{Pn(Pt),U.releasePointerCapture(P.pointerId)},Ct=z||q,Xt=f(),Pt=[fe(h,A,Ft),fe(h,"selectstart",P=>bu(P),{H:!1}),fe(g,A,Ft),Ct&&fe(g,"pointermove",P=>ot(X+(P[v]-yt))),Ct&&(()=>{const P=An(u);Xt();const b=An(u),Q={x:b.x-P.x,y:b.y-P.y};(ml(Q.x)>3||ml(Q.y)>3)&&(f(),_i(u,P),x(Q),M(Xt))})];if(U.setPointerCapture(V.pointerId),q)ot(X);else if(!z){const P=Ko(Jm);if(P){const b=P(ot,X,gt,Q=>{Q?Xt():ve(Pt,Xt)});ve(Pt,b),ve(I,kt(b,!0))}}}})};let E=!0;return kt(Pn,[fe(d,"pointermove pointerleave",n),fe(p,"pointerenter",()=>{s(yf,!0)}),fe(p,"pointerleave pointercancel",()=>{s(yf,!1)}),!c&&fe(p,"mousedown",()=>{const A=yu();(hf(A,Oi)||hf(A,fr)||A===document.body)&&gl(kt(wu,l),25)}),fe(p,"wheel",A=>{const{deltaX:v,deltaY:S,deltaMode:D}=A;E&&D===0&&Xo(p)===o&&x({x:v,y:S}),E=!1,s(bf,!0),m(()=>{E=!0,s(bf)}),bu(A)},{H:!1,I:!0}),fe(p,"pointerdown",kt(fe,h,"click",Hm,{A:!0,I:!0,H:!1}),{I:!0}),y(),_,w])},px=(r,t,e,n,i,s)=>{let a,o,l,c,u,h=hr,f=0;const p=["mouse","pen"],g=N=>p.includes(N.pointerType),[d,m]=Fr(),[_,M]=Fr(100),[w,x]=Fr(100),[y,E]=Fr(()=>f),[A,v]=fx(r,i,n,dx(t,i,n,N=>g(N)&&G())),{ht:S,Qt:D,wt:R}=i,{jt:F,Nt:$,qt:I,Bt:V,Ft:z}=A,U=(N,K)=>{if(E(),N)F(Sf);else{const J=kt(F,Sf,!0);f>0&&!K?y(J):J()}},G=()=>{(l?!a:!c)&&(U(!0),_(()=>{U(!1)}))},k=N=>{F(Cu,N,!0),F(Cu,N,!1)},C=N=>{g(N)&&(a=l,l&&U(!0))},Z=[E,M,x,m,()=>h(),fe(S,"pointerover",C,{A:!0}),fe(S,"pointerenter",C),fe(S,"pointerleave",N=>{g(N)&&(a=!1,l&&U(!1))}),fe(S,"pointermove",N=>{g(N)&&o&&G()}),fe(D,"scroll",N=>{d(()=>{I(),G()}),s(N),z()})];return[()=>kt(Pn,ve(Z,v())),({It:N,Dt:K,Zt:J,tn:q})=>{const{nn:B,sn:at,en:rt,cn:ct}=q||{},{Ct:ot,dt:yt}=J||{},{F:vt}=e,{T:ht}=Ti(),{k:gt,rn:It}=n,[Gt,X]=N("showNativeOverlaidScrollbars"),[Ft,Ct]=N("scrollbars.theme"),[Xt,Pt]=N("scrollbars.visibility"),[P,b]=N("scrollbars.autoHide"),[Q,it]=N("scrollbars.autoHideSuspend"),[ft]=N("scrollbars.autoHideDelay"),[ut,Et]=N("scrollbars.dragScroll"),[L,nt]=N("scrollbars.clickScroll"),[pt,st]=N("overflow"),O=yt&&!K,dt=It.x||It.y,lt=B||at||ct||ot||K,At=rt||Pt||st,mt=Gt&&ht.x&&ht.y,St=(tt,Lt,Ut)=>{const Ht=tt.includes(js)&&(Xt===er||Xt==="auto"&&Lt===js);return F(Z0,Ht,Ut),Ht};if(f=ft,O&&(Q&&dt?(k(!1),h(),w(()=>{h=fe(D,"scroll",kt(k,!0),{A:!0})})):k(!0)),X&&F(q0,mt),Ct&&(F(u),F(Ft,!0),u=Ft),it&&!Q&&k(!0),b&&(o=P==="move",l=P==="leave",c=P==="never",U(c,!0)),Et&&F(Q0,ut),nt&&F(J0,!!L),At){const tt=St(pt.x,gt.x,!0),Lt=St(pt.y,gt.y,!1);F(K0,!(tt&&Lt))}lt&&(I(),$(),z(),ct&&V(),F(Mf,!It.x,!0),F(Mf,!It.y,!1),F(Y0,vt&&!R))},{},A]},mx=r=>{const t=Ti(),{Z:e,P:n}=t,{elements:i}=e(),{padding:s,viewport:a,content:o}=i,l=yl(r),c=l?{}:r,{elements:u}=c,{padding:h,viewport:f,content:p}=u||{},g=l?r:c.target,d=Nm(g),m=g.ownerDocument,_=m.documentElement,M=()=>m.defaultView||hn,w=kt(ux,[g]),x=kt(ig,[g]),y=kt(Us,""),E=kt(w,y,a),A=kt(x,y,o),v=gt=>{const It=Bs(gt),Gt=Sl(gt),X=Wi(gt,Em),Ft=Wi(gt,Cm);return Gt.w-It.w>0&&!Ks(X)||Gt.h-It.h>0&&!Ks(Ft)},S=E(f),D=S===g,R=D&&d,F=!D&&A(p),$=!D&&S===F,I=R?_:S,V=R?I:g,z=!D&&x(y,s,h),U=!$&&F,G=[U,I,z,V].map(gt=>yl(gt)&&!Xo(gt)&&gt),k=gt=>gt&&xm(G,gt),C=!k(I)&&v(I)?I:g,Z=R?_:I,K={vt:g,ht:V,U:I,ln:z,bt:U,gt:Z,Qt:R?m:I,an:d?_:C,Kt:m,wt:d,Mt:l,L:D,un:M,yt:gt=>mh(I,Oi,gt),St:(gt,It)=>Ml(I,Oi,gt,It),Ot:()=>Ml(Z,Oi,V0,!0)},{vt:J,ht:q,ln:B,U:at,bt:rt}=K,ct=[()=>{ui(q,[fr,oc]),ui(J,oc),d&&ui(_,[oc,fr])}];let ot=vu([rt,at,B,q,J].find(gt=>gt&&!k(gt)));const yt=R?J:rt||at,vt=kt(Pn,ct);return[K,()=>{const gt=M(),It=yu(),Gt=Pt=>{Cn(Xo(Pt),vu(Pt)),Zs(Pt)},X=Pt=>fe(Pt,"focusin focusout focus blur",Hm,{I:!0,H:!1}),Ft="tabindex",Ct=dh(at,Ft),Xt=X(It);return Ii(q,fr,D?"":z0),Ii(B,Eu,""),Ii(at,Oi,""),Ii(rt,vf,""),D||(Ii(at,Ft,Ct||"-1"),d&&Ii(_,xf,"")),Cn(yt,ot),Cn(q,B),Cn(B||q,!D&&at),Cn(at,rt),ve(ct,[Xt,()=>{const Pt=yu(),P=k(at),b=P&&Pt===at?J:Pt,Q=X(b);ui(B,Eu),ui(rt,vf),ui(at,Oi),d&&ui(_,xf),Ct?Ii(at,Ft,Ct):ui(at,Ft),k(rt)&&Gt(rt),P&&Gt(at),k(B)&&Gt(B),wu(b),Q()}]),n&&!D&&(ph(at,Oi,jm),ve(ct,kt(ui,at,Oi))),wu(!D&&d&&It===J&&gt.top===gt?at:It),Xt(),ot=0,vt},vt]},gx=({bt:r})=>({Zt:t,_n:e,Dt:n})=>{const{xt:i}=t||{},{$t:s}=e;r&&(i||n)&&qo(r,{[Il]:s&&"100%"})},_x=({ht:r,ln:t,U:e,L:n},i)=>{const[s,a]=bn({i:E0,o:df()},kt(df,r,"padding",""));return({It:o,Zt:l,_n:c,Dt:u})=>{let[h,f]=a(u);const{P:p}=Ti(),{ft:g,Ht:d,Ct:m}=l||{},{F:_}=c,[M,w]=o("paddingAbsolute");(g||f||(u||d))&&([h,f]=s(u));const y=!n&&(w||m||f);if(y){const E=!M||!t&&!p,A=h.r+h.l,v=h.t+h.b,S={[wm]:E&&!_?-A:0,[Tm]:E?-v:0,[bm]:E&&_?-A:0,top:E?-h.t:0,right:E?_?-h.r:"auto":0,left:E?_?"auto":-h.l:0,[Rl]:E&&`calc(100% + ${A}px)`},D={[vm]:E?h.t:0,[ym]:E?h.r:0,[Sm]:E?h.b:0,[Mm]:E?h.l:0};qo(t||e,S),qo(e,D),ie(i,{ln:h,dn:!E,j:t?D:ie({},S,D)})}return{fn:y}}},xx=(r,t)=>{const e=Ti(),{ht:n,ln:i,U:s,L:a,Qt:o,gt:l,wt:c,St:u,un:h}=r,{P:f}=e,p=c&&a,g=kt(pl,0),d={display:()=>!1,direction:N=>N!=="ltr",flexDirection:N=>N.endsWith("-reverse"),writingMode:N=>N!=="horizontal-tb"},m=ri(d),_={i:Am,o:{w:0,h:0}},M={i:Ka,o:{}},w=N=>{u($m,!p&&N)},x=N=>{if(!m.some(yt=>{const vt=N[yt];return vt&&d[yt](vt)}))return{D:{x:0,y:0},M:{x:1,y:1}};w(!0);const J=An(l),q=u(G0,!0),B=fe(o,js,yt=>{const vt=An(l);yt.isTrusted&&vt.x===J.x&&vt.y===J.y&&Gm(yt)},{I:!0,A:!0});_i(l,{x:0,y:0}),q();const at=An(l),rt=Sl(l);_i(l,{x:rt.w,y:rt.h});const ct=An(l);_i(l,{x:ct.x-at.x<1&&-rt.w,y:ct.y-at.y<1&&-rt.h});const ot=An(l);return _i(l,J),Al(()=>B()),{D:at,M:ot}},y=(N,K)=>{const J=hn.devicePixelRatio%1!==0?1:0,q={w:g(N.w-K.w),h:g(N.h-K.h)};return{w:q.w>J?q.w:0,h:q.h>J?q.h:0}},[E,A]=bn(_,kt(_h,s)),[v,S]=bn(_,kt(Sl,s)),[D,R]=bn(_),[F]=bn(M),[$,I]=bn(_),[V]=bn(M),[z]=bn({i:(N,K)=>Ol(N,K,m),o:{}},()=>I0(s)?Wi(s,m):{}),[U,G]=bn({i:(N,K)=>Ka(N.D,K.D)&&Ka(N.M,K.M),o:Wm()}),k=Ko(Km),C=(N,K)=>`${K?k0:U0}${T0(N)}`,Z=N=>{const K=q=>[er,Or,js].map(B=>C(B,q)),J=K(!0).concat(K()).join(" ");u(J),u(ri(N).map(q=>C(N[q],q==="x")).join(" "),!0)};return({It:N,Zt:K,_n:J,Dt:q},{fn:B})=>{const{ft:at,Ht:rt,Ct:ct,dt:ot,zt:yt}=K||{},vt=k&&k.V(r,t,J,e,N),{W:ht,X:gt,J:It}=vt||{},[Gt,X]=ex(N,e),[Ft,Ct]=N("overflow"),Xt=Ks(Ft.x),Pt=Ks(Ft.y),P=!0;let b=A(q),Q=S(q),it=R(q),ft=I(q);X&&f&&u(jm,!Gt);{mh(n,fr,Qa)&&w(!0);const[xn]=gt?gt():[],[zt]=b=E(q),[Dt]=Q=v(q),Zt=Bm(s),_t=p&&R0(h()),Wt={w:g(Dt.w+zt.w),h:g(Dt.h+zt.h)},Rt={w:g((_t?_t.w:Zt.w+g(Zt.w-Dt.w))+zt.w),h:g((_t?_t.h:Zt.h+g(Zt.h-Dt.h))+zt.h)};xn&&xn(),ft=$(Rt),it=D(y(Wt,Rt),q)}const[ut,Et]=ft,[L,nt]=it,[pt,st]=Q,[O,dt]=b,[lt,At]=F({x:L.w>0,y:L.h>0}),mt=Xt&&Pt&&(lt.x||lt.y)||Xt&&lt.x&&!lt.y||Pt&&lt.y&&!lt.x,St=B||ct||yt||dt||st||Et||nt||Ct||X||P,tt=nx(lt,Ft),[Lt,Ut]=V(tt.k),[Ht,se]=z(q),Me=ct||ot||se||At||q,[Xn,_n]=Me?U(x(Ht),q):G();return St&&(Ut&&Z(tt.k),It&&ht&&qo(s,It(tt,J,ht(tt,pt,O)))),w(!1),Ml(n,fr,Qa,mt),Ml(i,Eu,Qa,mt),ie(t,{k:Lt,Vt:{x:ut.w,y:ut.h},Rt:{x:L.w,y:L.h},rn:lt,Lt:O0(Xn,L)}),{en:Ut,nn:Et,sn:nt,cn:_n||nt,pn:Me}}},vx=r=>{const[t,e,n]=mx(r),i={ln:{t:0,r:0,b:0,l:0},dn:!1,j:{[wm]:0,[Tm]:0,[bm]:0,[vm]:0,[ym]:0,[Sm]:0,[Mm]:0},Vt:{x:0,y:0},Rt:{x:0,y:0},k:{x:Or,y:Or},rn:{x:!1,y:!1},Lt:Wm()},{vt:s,gt:a,L:o,Ot:l}=t,{P:c,T:u}=Ti(),h=!c&&(u.x||u.y),f=[gx(t),_x(t,i),xx(t,i)];return[e,p=>{const g={},m=h&&An(a),_=m&&l();return oe(f,M=>{ie(g,M(p,g)||{})}),_i(a,m),_&&_(),!o&&_i(s,0),g},i,t,n]},yx=(r,t,e,n,i)=>{let s=!1;const a=Ef(t,{}),[o,l,c,u,h]=vx(r),[f,p,g]=cx(u,c,a,x=>{w({},x)}),[d,m,,_]=px(r,t,g,c,u,i),M=x=>ri(x).some(y=>!!x[y]),w=(x,y)=>{if(e())return!1;const{vn:E,Dt:A,At:v,hn:S}=x,D=E||{},R=!!A||!s,F={It:Ef(t,D,R),vn:D,Dt:R};if(S)return m(F),!1;const $=y||p(ie({},F,{At:v})),I=l(ie({},F,{_n:g,Zt:$}));m(ie({},F,{Zt:$,tn:I}));const V=M($),z=M(I),U=V||z||!fh(D)||R;return s=!0,U&&n(x,{Zt:$,tn:I}),U};return[()=>{const{an:x,gt:y,Ot:E}=u,A=An(x),v=[f(),o(),d()],S=E();return _i(y,A),S(),kt(Pn,v)},w,()=>({gn:g,bn:c}),{wn:u,yn:_},h]},yh=new WeakMap,Mx=(r,t)=>{yh.set(r,t)},Sx=r=>{yh.delete(r)},rg=r=>yh.get(r),Js=(r,t,e)=>{const{nt:n}=Ti(),i=yl(r),s=i?r:r.target,a=rg(s);if(t&&!a){let o=!1;const l=[],c={},u=D=>{const R=Dm(D),F=Ko(N0);return F?F(R,!0):R},h=ie({},n(),u(t)),[f,p,g]=Tu(),[d,m,_]=Tu(e),M=(D,R)=>{_(D,R),g(D,R)},[w,x,y,E,A]=yx(r,h,()=>o,({vn:D,Dt:R},{Zt:F,tn:$})=>{const{ft:I,Ct:V,xt:z,Ht:U,Et:G,dt:k}=F,{nn:C,sn:Z,en:N,cn:K}=$;M("updated",[S,{updateHints:{sizeChanged:!!I,directionChanged:!!V,heightIntrinsicChanged:!!z,overflowEdgeChanged:!!C,overflowAmountChanged:!!Z,overflowStyleChanged:!!N,scrollCoordinatesChanged:!!K,contentMutation:!!U,hostMutation:!!G,appear:!!k},changedOptions:D||{},force:!!R}])},D=>M("scroll",[S,D])),v=D=>{Sx(s),Pn(l),o=!0,M("destroyed",[S,D]),p(),m()},S={options(D,R){if(D){const F=R?n():{},$=Qm(h,ie(F,u(D)));fh($)||(ie(h,$),x({vn:$}))}return ie({},h)},on:d,off:(D,R)=>{D&&R&&m(D,R)},state(){const{gn:D,bn:R}=y(),{F}=D,{Vt:$,Rt:I,k:V,rn:z,ln:U,dn:G,Lt:k}=R;return ie({},{overflowEdge:$,overflowAmount:I,overflowStyle:V,hasOverflow:z,scrollCoordinates:{start:k.D,end:k.M},padding:U,paddingAbsolute:G,directionRTL:F,destroyed:o})},elements(){const{vt:D,ht:R,ln:F,U:$,bt:I,gt:V,Qt:z}=E.wn,{Yt:U,Gt:G}=E.yn,k=Z=>{const{Pt:N,Ut:K,Tt:J}=Z;return{scrollbar:J,track:K,handle:N}},C=Z=>{const{Wt:N,Xt:K}=Z,J=k(N[0]);return ie({},J,{clone:()=>{const q=k(K());return x({hn:!0}),q}})};return ie({},{target:D,host:R,padding:F||$,viewport:$,content:I||$,scrollOffsetElement:V,scrollEventElement:z,scrollbarHorizontal:C(U),scrollbarVertical:C(G)})},update:D=>x({Dt:D,At:!0}),destroy:kt(v,!1),plugin:D=>c[ri(D)[0]]};return ve(l,[A]),Mx(s,S),Ym(Xm,Js,[S,f,c]),hx(E.wn.wt,!i&&r.cancel)?(v(!0),S):(ve(l,w()),M("initialized",[S]),S.update(),S)}return a};Js.plugin=r=>{const t=wi(r),e=t?r:[r],n=e.map(i=>Ym(i,Js)[0]);return F0(e),t?n:n[0]};Js.valid=r=>{const t=r&&r.elements,e=In(t)&&t();return vl(e)&&!!rg(e.target)};Js.env=()=>{const{N:r,T:t,P:e,G:n,st:i,et:s,Z:a,tt:o,nt:l,ot:c}=Ti();return ie({},{scrollbarsSize:r,scrollbarsOverlaid:t,scrollbarsHiding:e,scrollTimeline:n,staticDefaultInitialization:i,staticDefaultOptions:s,getDefaultInitialization:a,setDefaultInitialization:o,getDefaultOptions:l,setDefaultOptions:c})};Js.nonce=sx;/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mh="141",cs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},us={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bx=0,Af=1,wx=2,sg=1,Tx=2,Mo=3,Yo=0,ii=1,Qs=2,Ex=1,dr=0,Vs=1,Lf=2,Df=3,Pf=4,Cx=5,Cs=100,Ax=101,Lx=102,Rf=103,If=104,Dx=200,Px=201,Rx=202,Ix=203,og=204,ag=205,Ox=206,Fx=207,Nx=208,zx=209,kx=210,Ux=0,Bx=1,Vx=2,Au=3,Gx=4,Hx=5,Wx=6,Xx=7,zl=0,qx=1,Yx=2,Vi=0,$x=1,jx=2,Zx=3,Kx=4,Jx=5,lg=300,to=301,eo=302,Lu=303,Du=304,kl=306,Pu=1e3,ei=1001,Ru=1002,un=1003,Of=1004,Ff=1005,Un=1006,Qx=1007,Ul=1008,es=1009,tv=1010,ev=1011,cg=1012,nv=1013,Nr=1014,zr=1015,$o=1016,iv=1017,rv=1018,Gs=1020,sv=1021,ov=1022,ni=1023,av=1024,lv=1025,Yr=1026,no=1027,cv=1028,uv=1029,hv=1030,fv=1031,dv=1033,lc=33776,cc=33777,uc=33778,hc=33779,Nf=35840,zf=35841,kf=35842,Uf=35843,pv=36196,Bf=37492,Vf=37496,Gf=37808,Hf=37809,Wf=37810,Xf=37811,qf=37812,Yf=37813,$f=37814,jf=37815,Zf=37816,Kf=37817,Jf=37818,Qf=37819,td=37820,ed=37821,nd=36492,ns=3e3,ge=3001,mv=3200,gv=3201,so=0,_v=1,Fi="srgb",kr="srgb-linear",fc=7680,xv=519,id=35044,rd="300 es",Iu=1035;class ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}const Ne=[];for(let r=0;r<256;r++)Ne[r]=(r<16?"0":"")+r.toString(16);const dc=Math.PI/180,sd=180/Math.PI;function Jo(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[r&255]+Ne[r>>8&255]+Ne[r>>16&255]+Ne[r>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Qe(r,t,e){return Math.max(t,Math.min(e,r))}function vv(r,t){return(r%t+t)%t}function pc(r,t,e){return(1-e)*r+e*t}function od(r){return(r&r-1)===0&&r!==0}function Ou(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}class Yt{constructor(t=0,e=0){this.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this)}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this)}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class xi{constructor(){this.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],d=i[0],m=i[3],_=i[6],M=i[1],w=i[4],x=i[7],y=i[2],E=i[5],A=i[8];return s[0]=a*d+o*M+l*y,s[3]=a*m+o*w+l*E,s[6]=a*_+o*x+l*A,s[1]=c*d+u*M+h*y,s[4]=c*m+u*w+h*E,s[7]=c*_+u*x+h*A,s[2]=f*d+p*M+g*y,s[5]=f*m+p*w+g*E,s[8]=f*_+p*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,f=o*l-u*s,p=c*s-a*l,g=e*h+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const d=1/g;return t[0]=h*d,t[1]=(i*c-u*n)*d,t[2]=(o*n-i*a)*d,t[3]=f*d,t[4]=(u*e-i*l)*d,t[5]=(i*s-o*e)*d,t[6]=p*d,t[7]=(n*l-c*e)*d,t[8]=(a*e-n*s)*d,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){const e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],a=i[3],o=i[6],l=i[1],c=i[4],u=i[7];return i[0]=e*s+n*l,i[3]=e*a+n*c,i[6]=e*o+n*u,i[1]=-n*s+e*l,i[4]=-n*a+e*c,i[7]=-n*o+e*u,this}translate(t,e){const n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}function ug(r){for(let t=r.length-1;t>=0;--t)if(r[t]>65535)return!0;return!1}function bl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function $r(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function tl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const mc={[Fi]:{[kr]:$r},[kr]:{[Fi]:tl}},$n={legacyMode:!0,get workingColorSpace(){return kr},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,t,e){if(this.legacyMode||t===e||!t||!e)return r;if(mc[t]&&mc[t][e]!==void 0){const n=mc[t][e];return r.r=n(r.r),r.g=n(r.g),r.b=n(r.b),r}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)}},hg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ae={r:0,g:0,b:0},jn={h:0,s:0,l:0},xa={h:0,s:0,l:0};function gc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}function va(r,t){return t.r=r.r,t.g=r.g,t.b=r.b,t}class $t{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$n.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=kr){return this.r=t,this.g=e,this.b=n,$n.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=kr){if(t=vv(t,1),e=Qe(e,0,1),n=Qe(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=gc(a,s,t+1/3),this.g=gc(a,s,t),this.b=gc(a,s,t-1/3)}return $n.toWorkingColorSpace(this,i),this}setStyle(t,e=Fi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,$n.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,$n.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(s[1])/360,c=parseInt(s[2],10)/100,u=parseInt(s[3],10)/100;return n(s[4]),this.setHSL(l,c,u,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,$n.toWorkingColorSpace(this,e),this;if(a===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,$n.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=Fi){const n=hg[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$r(t.r),this.g=$r(t.g),this.b=$r(t.b),this}copyLinearToSRGB(t){return this.r=tl(t.r),this.g=tl(t.g),this.b=tl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fi){return $n.fromWorkingColorSpace(va(this,Ae),t),Qe(Ae.r*255,0,255)<<16^Qe(Ae.g*255,0,255)<<8^Qe(Ae.b*255,0,255)<<0}getHexString(t=Fi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=kr){$n.fromWorkingColorSpace(va(this,Ae),e);const n=Ae.r,i=Ae.g,s=Ae.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=kr){return $n.fromWorkingColorSpace(va(this,Ae),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=Fi){return $n.fromWorkingColorSpace(va(this,Ae),t),t!==Fi?`color(${t} ${Ae.r} ${Ae.g} ${Ae.b})`:`rgb(${Ae.r*255|0},${Ae.g*255|0},${Ae.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(jn),jn.h+=t,jn.s+=e,jn.l+=n,this.setHSL(jn.h,jn.s,jn.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(xa);const n=pc(jn.h,xa.h,e),i=pc(jn.s,xa.s,e),s=pc(jn.l,xa.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),t.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}$t.NAMES=hg;let hs;class fg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hs===void 0&&(hs=bl("canvas")),hs.width=t.width,hs.height=t.height;const n=hs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=hs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=bl("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=$r(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($r(e[n]/255)*255):e[n]=$r(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}class dg{constructor(t=null){this.isSource=!0,this.uuid=Jo(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(_c(i[a].image)):s.push(_c(i[a]))}else s=_c(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function _c(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?fg.getDataURL(r):r.data?{data:Array.prototype.slice.call(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yv=0;class si extends ss{constructor(t=si.DEFAULT_IMAGE,e=si.DEFAULT_MAPPING,n=ei,i=ei,s=Un,a=Ul,o=ni,l=es,c=1,u=ns){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yv++}),this.uuid=Jo(),this.name="",this.source=new dg(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xi,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pu:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case Ru:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pu:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case Ru:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}}si.DEFAULT_IMAGE=null;si.DEFAULT_MAPPING=lg;class We{constructor(t=0,e=0,n=0,i=1){this.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],d=l[2],m=l[6],_=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-d)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+d)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,x=(p+1)/2,y=(_+1)/2,E=(u+f)/4,A=(h+d)/4,v=(g+m)/4;return w>x&&w>y?w<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(w),i=E/n,s=A/n):x>y?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=E/i,s=v/i):y<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(y),n=A/s,i=v/s),this.set(n,i,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-d)*(h-d)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-d)/M,this.z=(f-u)/M,this.w=Math.acos((c+p+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pr extends ss{constructor(t,e,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new We(0,0,t,e),this.scissorTest=!1,this.viewport=new We(0,0,t,e);const i={width:t,height:e,depth:1};this.texture=new si(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Un,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new dg(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pg extends si{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mv extends si{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class is{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerp(t,e,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(t,e,i)}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[a+0],p=s[a+1],g=s[a+2],d=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=d;return}if(h!==d||l!==f||c!==p||u!==g){let m=1-o;const _=l*f+c*p+u*g+h*d,M=_>=0?1:-1,w=1-_*_;if(w>Number.EPSILON){const y=Math.sqrt(w),E=Math.atan2(y,_*M);m=Math.sin(m*E)/y,o=Math.sin(o*E)/y}const x=o*M;if(l=l*m+f*x,c=c*m+p*x,u=u*m+g*x,h=h*m+d*x,m===1-o){const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[a],f=s[a+1],p=s[a+2],g=s[a+3];return t[e]=o*g+u*h+l*p-c*f,t[e+1]=l*g+u*f+c*h-o*p,t[e+2]=c*g+u*p+o*f-l*h,t[e+3]=u*g-o*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){if(!(t&&t.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),f=l(n/2),p=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-i)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(s-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-i)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,e){return e!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(t=0,e=0,n=0){this.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(ad.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ad.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=l*e+a*i-o*n,u=l*n+o*e-s*i,h=l*i+s*n-a*e,f=-s*e-a*n-o*i;return this.x=c*l+f*-s+u*-o-h*-a,this.y=u*l+f*-a+h*-s-c*-o,this.z=h*l+f*-o+c*-a-u*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t,e){return e!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e)):this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xc.copy(this).projectOnVector(t),this.sub(xc)}reflect(t){return this.sub(xc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xc=new j,ad=new is;class Qo{constructor(t=new j(1/0,1/0,1/0),e=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,a=-1/0,o=-1/0;for(let l=0,c=t.length;l<c;l+=3){const u=t[l],h=t[l+1],f=t[l+2];u<e&&(e=u),h<n&&(n=h),f<i&&(i=f),u>s&&(s=u),h>a&&(a=h),f>o&&(o=f)}return this.min.set(e,n,i),this.max.set(s,a,o),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,a=-1/0,o=-1/0;for(let l=0,c=t.count;l<c;l++){const u=t.getX(l),h=t.getY(l),f=t.getZ(l);u<e&&(e=u),h<n&&(n=h),f<i&&(i=f),u>s&&(s=u),h>a&&(a=h),f>o&&(o=f)}return this.min.set(e,n,i),this.max.set(s,a,o),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=br.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let a=0,o=s.count;a<o;a++)br.fromBufferAttribute(s,a).applyMatrix4(t.matrixWorld),this.expandByPoint(br)}else n.boundingBox===null&&n.computeBoundingBox(),vc.copy(n.boundingBox),vc.applyMatrix4(t.matrixWorld),this.union(vc);const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,br),br.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(uo),ya.subVectors(this.max,uo),fs.subVectors(t.a,uo),ds.subVectors(t.b,uo),ps.subVectors(t.c,uo),Yi.subVectors(ds,fs),$i.subVectors(ps,ds),wr.subVectors(fs,ps);let e=[0,-Yi.z,Yi.y,0,-$i.z,$i.y,0,-wr.z,wr.y,Yi.z,0,-Yi.x,$i.z,0,-$i.x,wr.z,0,-wr.x,-Yi.y,Yi.x,0,-$i.y,$i.x,0,-wr.y,wr.x,0];return!yc(e,fs,ds,ps,ya)||(e=[1,0,0,0,1,0,0,0,1],!yc(e,fs,ds,ps,ya))?!1:(Ma.crossVectors(Yi,$i),e=[Ma.x,Ma.y,Ma.z],yc(e,fs,ds,ps,ya))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return br.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(br).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ci=[new j,new j,new j,new j,new j,new j,new j,new j],br=new j,vc=new Qo,fs=new j,ds=new j,ps=new j,Yi=new j,$i=new j,wr=new j,uo=new j,ya=new j,Ma=new j,Tr=new j;function yc(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Tr.fromArray(r,s);const o=i.x*Math.abs(Tr.x)+i.y*Math.abs(Tr.y)+i.z*Math.abs(Tr.z),l=t.dot(Tr),c=e.dot(Tr),u=n.dot(Tr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Sv=new Qo,ld=new j,Sa=new j,Mc=new j;class Bl{constructor(t=new j,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Sv.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){Mc.subVectors(t,this.center);const e=Mc.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(Mc.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return this.center.equals(t.center)===!0?Sa.set(0,0,1).multiplyScalar(t.radius):Sa.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(ld.copy(t.center).add(Sa)),this.expandByPoint(ld.copy(t.center).sub(Sa)),this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ai=new j,Sc=new j,ba=new j,ji=new j,bc=new j,wa=new j,wc=new j;class mg{constructor(t=new j,e=new j(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ai.copy(this.direction).multiplyScalar(e).add(this.origin),Ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Sc.copy(t).add(e).multiplyScalar(.5),ba.copy(e).sub(t).normalize(),ji.copy(this.origin).sub(Sc);const s=t.distanceTo(e)*.5,a=-this.direction.dot(ba),o=ji.dot(this.direction),l=-ji.dot(ba),c=ji.lengthSq(),u=Math.abs(1-a*a);let h,f,p,g;if(u>0)if(h=a*l-o,f=a*o-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const d=1/u;h*=d,f*=d,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(h).add(this.origin),i&&i.copy(ba).multiplyScalar(f).add(Sc),p}intersectSphere(t,e){Ai.subVectors(t.center,this.origin);const n=Ai.dot(this.direction),i=Ai.dot(Ai)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return o<0&&l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||s>i||((s>n||n!==n)&&(n=s),(a<i||i!==i)&&(i=a),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ai)!==null}intersectTriangle(t,e,n,i,s){bc.subVectors(e,t),wa.subVectors(n,t),wc.crossVectors(bc,wa);let a=this.direction.dot(wc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,t);const l=o*this.direction.dot(wa.crossVectors(ji,wa));if(l<0)return null;const c=o*this.direction.dot(bc.cross(ji));if(c<0||l+c>a)return null;const u=-o*ji.dot(wc);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ke{constructor(){this.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,a,o,l,c,u,h,f,p,g,d,m){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=s,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=u,_[10]=h,_[14]=f,_[3]=p,_[7]=g,_[11]=d,_[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ke().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ms.setFromMatrixColumn(t,0).length(),s=1/ms.setFromMatrixColumn(t,1).length(),a=1/ms.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=a*u,p=a*h,g=o*u,d=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+g*c,e[5]=f-d*c,e[9]=-o*l,e[2]=d-f*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,g=c*u,d=c*h;e[0]=f+d*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=p*o-g,e[6]=d+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,g=c*u,d=c*h;e[0]=f-d*o,e[4]=-a*h,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*u,e[9]=d-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,p=a*h,g=o*u,d=o*h;e[0]=l*u,e[4]=g*c-p,e[8]=f*c+d,e[1]=l*h,e[5]=d*c+f,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,p=a*c,g=o*l,d=o*c;e[0]=l*u,e[4]=d-f*h,e[8]=g*h+p,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*h+g,e[10]=f-d*h}else if(t.order==="XZY"){const f=a*l,p=a*c,g=o*l,d=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+d,e[5]=a*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=o*u,e[10]=d*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bv,t,wv)}lookAt(t,e,n){const i=this.elements;return vn.subVectors(t,e),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Zi.crossVectors(n,vn),Zi.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Zi.crossVectors(n,vn)),Zi.normalize(),Ta.crossVectors(vn,Zi),i[0]=Zi.x,i[4]=Ta.x,i[8]=vn.x,i[1]=Zi.y,i[5]=Ta.y,i[9]=vn.y,i[2]=Zi.z,i[6]=Ta.z,i[10]=vn.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],d=n[6],m=n[10],_=n[14],M=n[3],w=n[7],x=n[11],y=n[15],E=i[0],A=i[4],v=i[8],S=i[12],D=i[1],R=i[5],F=i[9],$=i[13],I=i[2],V=i[6],z=i[10],U=i[14],G=i[3],k=i[7],C=i[11],Z=i[15];return s[0]=a*E+o*D+l*I+c*G,s[4]=a*A+o*R+l*V+c*k,s[8]=a*v+o*F+l*z+c*C,s[12]=a*S+o*$+l*U+c*Z,s[1]=u*E+h*D+f*I+p*G,s[5]=u*A+h*R+f*V+p*k,s[9]=u*v+h*F+f*z+p*C,s[13]=u*S+h*$+f*U+p*Z,s[2]=g*E+d*D+m*I+_*G,s[6]=g*A+d*R+m*V+_*k,s[10]=g*v+d*F+m*z+_*C,s[14]=g*S+d*$+m*U+_*Z,s[3]=M*E+w*D+x*I+y*G,s[7]=M*A+w*R+x*V+y*k,s[11]=M*v+w*F+x*z+y*C,s[15]=M*S+w*$+x*U+y*Z,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],d=t[7],m=t[11],_=t[15];return g*(+s*l*h-i*c*h-s*o*f+n*c*f+i*o*p-n*l*p)+d*(+e*l*p-e*c*f+s*a*f-i*a*p+i*c*u-s*l*u)+m*(+e*c*h-e*o*p-s*a*h+n*a*p+s*o*u-n*c*u)+_*(-i*o*u-e*l*h+e*o*f+i*a*h-n*a*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],d=t[13],m=t[14],_=t[15],M=h*m*c-d*f*c+d*l*p-o*m*p-h*l*_+o*f*_,w=g*f*c-u*m*c-g*l*p+a*m*p+u*l*_-a*f*_,x=u*d*c-g*h*c+g*o*p-a*d*p-u*o*_+a*h*_,y=g*h*l-u*d*l-g*o*f+a*d*f+u*o*m-a*h*m,E=e*M+n*w+i*x+s*y;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=M*A,t[1]=(d*f*s-h*m*s-d*i*p+n*m*p+h*i*_-n*f*_)*A,t[2]=(o*m*s-d*l*s+d*i*c-n*m*c-o*i*_+n*l*_)*A,t[3]=(h*l*s-o*f*s-h*i*c+n*f*c+o*i*p-n*l*p)*A,t[4]=w*A,t[5]=(u*m*s-g*f*s+g*i*p-e*m*p-u*i*_+e*f*_)*A,t[6]=(g*l*s-a*m*s-g*i*c+e*m*c+a*i*_-e*l*_)*A,t[7]=(a*f*s-u*l*s+u*i*c-e*f*c-a*i*p+e*l*p)*A,t[8]=x*A,t[9]=(g*h*s-u*d*s-g*n*p+e*d*p+u*n*_-e*h*_)*A,t[10]=(a*d*s-g*o*s+g*n*c-e*d*c-a*n*_+e*o*_)*A,t[11]=(u*o*s-a*h*s-u*n*c+e*h*c+a*n*p-e*o*p)*A,t[12]=y*A,t[13]=(u*d*i-g*h*i+g*n*f-e*d*f-u*n*m+e*h*m)*A,t[14]=(g*o*i-a*d*i-g*n*l+e*d*l+a*n*m-e*o*m)*A,t[15]=(a*h*i-u*o*i+u*n*l-e*h*l-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,h=o+o,f=s*c,p=s*u,g=s*h,d=a*u,m=a*h,_=o*h,M=l*c,w=l*u,x=l*h,y=n.x,E=n.y,A=n.z;return i[0]=(1-(d+_))*y,i[1]=(p+x)*y,i[2]=(g-w)*y,i[3]=0,i[4]=(p-x)*E,i[5]=(1-(f+_))*E,i[6]=(m+M)*E,i[7]=0,i[8]=(g+w)*A,i[9]=(m-M)*A,i[10]=(1-(f+d))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=ms.set(i[0],i[1],i[2]).length();const a=ms.set(i[4],i[5],i[6]).length(),o=ms.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Zn.copy(this);const c=1/s,u=1/a,h=1/o;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=u,Zn.elements[5]*=u,Zn.elements[6]*=u,Zn.elements[8]*=h,Zn.elements[9]*=h,Zn.elements[10]*=h,e.setFromRotationMatrix(Zn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a){a===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const o=this.elements,l=2*s/(e-t),c=2*s/(n-i),u=(e+t)/(e-t),h=(n+i)/(n-i),f=-(a+s)/(a-s),p=-2*a*s/(a-s);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,i,s,a){const o=this.elements,l=1/(e-t),c=1/(n-i),u=1/(a-s),h=(e+t)*l,f=(n+i)*c,p=(a+s)*u;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ms=new j,Zn=new ke,bv=new j(0,0,0),wv=new j(1,1,1),Zi=new j,Ta=new j,vn=new j,cd=new ke,ud=new is;class ta{constructor(t=0,e=0,n=0,i=ta.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return cd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ud.setFromEuler(this),this.setFromQuaternion(ud,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}ta.DefaultOrder="XYZ";ta.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class gg{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Tv=0;const hd=new j,gs=new is,Li=new ke,Ea=new j,ho=new j,Ev=new j,Cv=new is,fd=new j(1,0,0),dd=new j(0,1,0),pd=new j(0,0,1),Av={type:"added"},md={type:"removed"};class Wn extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=Jo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wn.DefaultUp.clone();const t=new j,e=new ta,n=new is,i=new j(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ke},normalMatrix:{value:new xi}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=Wn.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new gg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return gs.setFromAxisAngle(t,e),this.quaternion.multiply(gs),this}rotateOnWorldAxis(t,e){return gs.setFromAxisAngle(t,e),this.quaternion.premultiply(gs),this}rotateX(t){return this.rotateOnAxis(fd,t)}rotateY(t){return this.rotateOnAxis(dd,t)}rotateZ(t){return this.rotateOnAxis(pd,t)}translateOnAxis(t,e){return hd.copy(t).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fd,t)}translateY(t){return this.translateOnAxis(dd,t)}translateZ(t){return this.translateOnAxis(pd,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ea.copy(t):Ea.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ho.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(ho,Ea,this.up):Li.lookAt(Ea,ho,this.up),this.quaternion.setFromRotationMatrix(Li),i&&(Li.extractRotation(i.matrixWorld),gs.setFromRotationMatrix(Li),this.quaternion.premultiply(gs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Av)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(md)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(md)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Li.multiply(t.parent.matrixWorld)),t.applyMatrix4(Li),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ho,t,Ev),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ho,Cv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Wn.DefaultUp=new j(0,1,0);Wn.DefaultMatrixAutoUpdate=!0;const Kn=new j,Di=new j,Tc=new j,Pi=new j,_s=new j,xs=new j,gd=new j,Ec=new j,Cc=new j,Ac=new j;class ki{constructor(t=new j,e=new j,n=new j){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Kn.subVectors(t,e),i.cross(Kn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Kn.subVectors(i,e),Di.subVectors(n,e),Tc.subVectors(t,e);const a=Kn.dot(Kn),o=Kn.dot(Di),l=Kn.dot(Tc),c=Di.dot(Di),u=Di.dot(Tc),h=a*c-o*o;if(h===0)return s.set(-2,-1,-1);const f=1/h,p=(c*l-o*u)*f,g=(a*u-o*l)*f;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Pi),Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getUV(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,Pi),l.set(0,0),l.addScaledVector(s,Pi.x),l.addScaledVector(a,Pi.y),l.addScaledVector(o,Pi.z),l}static isFrontFacing(t,e,n,i){return Kn.subVectors(n,e),Di.subVectors(t,e),Kn.cross(Di).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Kn.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),Kn.cross(Di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ki.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ki.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return ki.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return ki.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ki.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;_s.subVectors(i,n),xs.subVectors(s,n),Ec.subVectors(t,n);const l=_s.dot(Ec),c=xs.dot(Ec);if(l<=0&&c<=0)return e.copy(n);Cc.subVectors(t,i);const u=_s.dot(Cc),h=xs.dot(Cc);if(u>=0&&h<=u)return e.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(_s,a);Ac.subVectors(t,s);const p=_s.dot(Ac),g=xs.dot(Ac);if(g>=0&&p<=g)return e.copy(s);const d=p*c-l*g;if(d<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(xs,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return gd.subVectors(s,i),o=(h-u)/(h-u+(p-g)),e.copy(i).addScaledVector(gd,o);const _=1/(m+d+f);return a=d*_,o=f*_,e.copy(n).addScaledVector(_s,a).addScaledVector(xs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let Lv=0;class Ue extends ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lv++}),this.uuid=Jo(),this.name="",this.type="Material",this.blending=Vs,this.side=Yo,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=og,this.blendDst=ag,this.blendEquation=Cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Au,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fc,this.stencilZFail=fc,this.stencilZPass=fc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}if(e==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===Ex;continue}const i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(n.blending=this.blending),this.side!==Yo&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}get vertexTangents(){return console.warn("THREE."+this.type+": .vertexTangents has been removed."),!1}set vertexTangents(t){console.warn("THREE."+this.type+": .vertexTangents has been removed.")}}Ue.fromType=function(){return null};class Sh extends Ue{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new j,Ca=new Yt;class Si{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=id,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}copyColorsArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),a=new $t),e[n++]=a.r,e[n++]=a.g,e[n++]=a.b}return this}copyVector2sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),a=new Yt),e[n++]=a.x,e[n++]=a.y}return this}copyVector3sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),a=new j),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z}return this}copyVector4sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),a=new We),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z,e[n++]=a.w}return this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ca.fromBufferAttribute(this,e),Ca.applyMatrix3(t),this.setXY(e,Ca.x,Ca.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){return this.array[t*this.itemSize]}setX(t,e){return this.array[t*this.itemSize]=e,this}getY(t){return this.array[t*this.itemSize+1]}setY(t,e){return this.array[t*this.itemSize+1]=e,this}getZ(t){return this.array[t*this.itemSize+2]}setZ(t,e){return this.array[t*this.itemSize+2]=e,this}getW(t){return this.array[t*this.itemSize+3]}setW(t,e){return this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==id&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}}class _g extends Si{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xg extends Si{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jr extends Si{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Dv=0;const Fn=new ke,Lc=new Wn,vs=new j,yn=new Qo,fo=new Qo,Pe=new j;class yr extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dv++}),this.uuid=Jo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ug(t)?xg:_g)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new xi().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fn.makeRotationFromQuaternion(t),this.applyMatrix4(Fn),this}rotateX(t){return Fn.makeRotationX(t),this.applyMatrix4(Fn),this}rotateY(t){return Fn.makeRotationY(t),this.applyMatrix4(Fn),this}rotateZ(t){return Fn.makeRotationZ(t),this.applyMatrix4(Fn),this}translate(t,e,n){return Fn.makeTranslation(t,e,n),this.applyMatrix4(Fn),this}scale(t,e,n){return Fn.makeScale(t,e,n),this.applyMatrix4(Fn),this}lookAt(t){return Lc.lookAt(t),Lc.updateMatrix(),this.applyMatrix4(Lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vs).negate(),this.translate(vs.x,vs.y,vs.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new jr(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];yn.setFromBufferAttribute(s),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new j,1/0);return}if(t){const n=this.boundingSphere.center;if(yn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];fo.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(yn.min,fo.min),yn.expandByPoint(Pe),Pe.addVectors(yn.max,fo.max),yn.expandByPoint(Pe)):(yn.expandByPoint(fo.min),yn.expandByPoint(fo.max))}yn.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Pe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Pe));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Pe.fromBufferAttribute(o,c),l&&(vs.fromBufferAttribute(t,c),Pe.add(vs)),i=Math.max(i,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,a=e.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Si(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let D=0;D<o;D++)c[D]=new j,u[D]=new j;const h=new j,f=new j,p=new j,g=new Yt,d=new Yt,m=new Yt,_=new j,M=new j;function w(D,R,F){h.fromArray(i,D*3),f.fromArray(i,R*3),p.fromArray(i,F*3),g.fromArray(a,D*2),d.fromArray(a,R*2),m.fromArray(a,F*2),f.sub(h),p.sub(h),d.sub(g),m.sub(g);const $=1/(d.x*m.y-m.x*d.y);isFinite($)&&(_.copy(f).multiplyScalar(m.y).addScaledVector(p,-d.y).multiplyScalar($),M.copy(p).multiplyScalar(d.x).addScaledVector(f,-m.x).multiplyScalar($),c[D].add(_),c[R].add(_),c[F].add(_),u[D].add(M),u[R].add(M),u[F].add(M))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let D=0,R=x.length;D<R;++D){const F=x[D],$=F.start,I=F.count;for(let V=$,z=$+I;V<z;V+=3)w(n[V+0],n[V+1],n[V+2])}const y=new j,E=new j,A=new j,v=new j;function S(D){A.fromArray(s,D*3),v.copy(A);const R=c[D];y.copy(R),y.sub(A.multiplyScalar(A.dot(R))).normalize(),E.crossVectors(v,R);const $=E.dot(u[D])<0?-1:1;l[D*4]=y.x,l[D*4+1]=y.y,l[D*4+2]=y.z,l[D*4+3]=$}for(let D=0,R=x.length;D<R;++D){const F=x[D],$=F.start,I=F.count;for(let V=$,z=$+I;V<z;V+=3)S(n[V+0]),S(n[V+1]),S(n[V+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Si(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new j,s=new j,a=new j,o=new j,l=new j,c=new j,u=new j,h=new j;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),d=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,d),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,d),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(d,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(t,e){if(!(t&&t.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",t);return}e===void 0&&(e=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(t.attributes[i]===void 0)continue;const a=n[i].array,o=t.attributes[i],l=o.array,c=o.itemSize*e,u=Math.min(l.length,a.length-c);for(let h=0,f=c;h<u;h++,f++)a[f]=l[h]}return this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let d=0,m=l.length;d<m;d++){o.isInterleavedBufferAttribute?p=l[d]*o.data.stride+o.offset:p=l[d]*u;for(let _=0;_<u;_++)f[g++]=c[p++]}return new Si(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new yr,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(i[l]=u,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const _d=new ke,ys=new mg,Dc=new Bl,Ki=new j,Ji=new j,Qi=new j,Pc=new j,Rc=new j,Ic=new j,Aa=new j,La=new j,Da=new j,Pa=new Yt,Ra=new Yt,Ia=new Yt,Oc=new j,Oa=new j;class ar extends Wn{constructor(t=new yr,e=new Sh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Dc.copy(n.boundingSphere),Dc.applyMatrix4(s),t.ray.intersectsSphere(Dc)===!1)||(_d.copy(s).invert(),ys.copy(t.ray).applyMatrix4(_d),n.boundingBox!==null&&ys.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,l=n.attributes.position,c=n.morphAttributes.position,u=n.morphTargetsRelative,h=n.attributes.uv,f=n.attributes.uv2,p=n.groups,g=n.drawRange;if(o!==null)if(Array.isArray(i))for(let d=0,m=p.length;d<m;d++){const _=p[d],M=i[_.materialIndex],w=Math.max(_.start,g.start),x=Math.min(o.count,Math.min(_.start+_.count,g.start+g.count));for(let y=w,E=x;y<E;y+=3){const A=o.getX(y),v=o.getX(y+1),S=o.getX(y+2);a=Fa(this,M,t,ys,l,c,u,h,f,A,v,S),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=_.materialIndex,e.push(a))}}else{const d=Math.max(0,g.start),m=Math.min(o.count,g.start+g.count);for(let _=d,M=m;_<M;_+=3){const w=o.getX(_),x=o.getX(_+1),y=o.getX(_+2);a=Fa(this,i,t,ys,l,c,u,h,f,w,x,y),a&&(a.faceIndex=Math.floor(_/3),e.push(a))}}else if(l!==void 0)if(Array.isArray(i))for(let d=0,m=p.length;d<m;d++){const _=p[d],M=i[_.materialIndex],w=Math.max(_.start,g.start),x=Math.min(l.count,Math.min(_.start+_.count,g.start+g.count));for(let y=w,E=x;y<E;y+=3){const A=y,v=y+1,S=y+2;a=Fa(this,M,t,ys,l,c,u,h,f,A,v,S),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=_.materialIndex,e.push(a))}}else{const d=Math.max(0,g.start),m=Math.min(l.count,g.start+g.count);for(let _=d,M=m;_<M;_+=3){const w=_,x=_+1,y=_+2;a=Fa(this,i,t,ys,l,c,u,h,f,w,x,y),a&&(a.faceIndex=Math.floor(_/3),e.push(a))}}}}function Pv(r,t,e,n,i,s,a,o){let l;if(t.side===ii?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side!==Qs,o),l===null)return null;Oa.copy(o),Oa.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Oa);return c<e.near||c>e.far?null:{distance:c,point:Oa.clone(),object:r}}function Fa(r,t,e,n,i,s,a,o,l,c,u,h){Ki.fromBufferAttribute(i,c),Ji.fromBufferAttribute(i,u),Qi.fromBufferAttribute(i,h);const f=r.morphTargetInfluences;if(s&&f){Aa.set(0,0,0),La.set(0,0,0),Da.set(0,0,0);for(let g=0,d=s.length;g<d;g++){const m=f[g],_=s[g];m!==0&&(Pc.fromBufferAttribute(_,c),Rc.fromBufferAttribute(_,u),Ic.fromBufferAttribute(_,h),a?(Aa.addScaledVector(Pc,m),La.addScaledVector(Rc,m),Da.addScaledVector(Ic,m)):(Aa.addScaledVector(Pc.sub(Ki),m),La.addScaledVector(Rc.sub(Ji),m),Da.addScaledVector(Ic.sub(Qi),m)))}Ki.add(Aa),Ji.add(La),Qi.add(Da)}r.isSkinnedMesh&&(r.boneTransform(c,Ki),r.boneTransform(u,Ji),r.boneTransform(h,Qi));const p=Pv(r,t,e,n,Ki,Ji,Qi,Oc);if(p){o&&(Pa.fromBufferAttribute(o,c),Ra.fromBufferAttribute(o,u),Ia.fromBufferAttribute(o,h),p.uv=ki.getUV(Oc,Ki,Ji,Qi,Pa,Ra,Ia,new Yt)),l&&(Pa.fromBufferAttribute(l,c),Ra.fromBufferAttribute(l,u),Ia.fromBufferAttribute(l,h),p.uv2=ki.getUV(Oc,Ki,Ji,Qi,Pa,Ra,Ia,new Yt));const g={a:c,b:u,c:h,normal:new j,materialIndex:0};ki.getNormal(Ki,Ji,Qi,g.normal),p.face=g}return p}class ea extends yr{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new jr(c,3)),this.setAttribute("normal",new jr(u,3)),this.setAttribute("uv",new jr(h,2));function g(d,m,_,M,w,x,y,E,A,v,S){const D=x/A,R=y/v,F=x/2,$=y/2,I=E/2,V=A+1,z=v+1;let U=0,G=0;const k=new j;for(let C=0;C<z;C++){const Z=C*R-$;for(let N=0;N<V;N++){const K=N*D-F;k[d]=K*M,k[m]=Z*w,k[_]=I,c.push(k.x,k.y,k.z),k[d]=0,k[m]=0,k[_]=E>0?1:-1,u.push(k.x,k.y,k.z),h.push(N/A),h.push(1-C/v),U+=1}}for(let C=0;C<v;C++)for(let Z=0;Z<A;Z++){const N=f+Z+V*C,K=f+Z+V*(C+1),J=f+(Z+1)+V*(C+1),q=f+(Z+1)+V*C;l.push(N,K,q),l.push(K,J,q),G+=6}o.addGroup(p,G,S),p+=G,f+=U}}static fromJSON(t){return new ea(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function io(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ve(r){const t={};for(let e=0;e<r.length;e++){const n=io(r[e]);for(const i in n)t[i]=n[i]}return t}const Rv={clone:io,merge:Ve};var Iv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ov=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xi extends Ue{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=Iv,this.fragmentShader=Ov,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&(t.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(t))}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=io(t.uniforms),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class vg extends Wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ti extends vg{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=sd*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(dc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return sd*2*Math.atan(Math.tan(dc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(dc*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ms=90,Ss=1;class Fv extends Wn{constructor(t,e,n){if(super(),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new ti(Ms,Ss,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new j(1,0,0)),this.add(i);const s=new ti(Ms,Ss,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new j(-1,0,0)),this.add(s);const a=new ti(Ms,Ss,t,e);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(new j(0,1,0)),this.add(a);const o=new ti(Ms,Ss,t,e);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(new j(0,-1,0)),this.add(o);const l=new ti(Ms,Ss,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new j(0,0,1)),this.add(l);const c=new ti(Ms,Ss,t,e);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new j(0,0,-1)),this.add(c)}update(t,e){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,a,o,l,c]=this.children,u=t.getRenderTarget(),h=t.toneMapping,f=t.xr.enabled;t.toneMapping=Vi,t.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,a),t.setRenderTarget(n,3),t.render(e,o),t.setRenderTarget(n,4),t.render(e,l),n.texture.generateMipmaps=p,t.setRenderTarget(n,5),t.render(e,c),t.setRenderTarget(u),t.toneMapping=h,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class yg extends si{constructor(t,e,n,i,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:to,super(t,e,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nv extends pr{constructor(t,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new yg(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Un}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ea(5,5,5),s=new Xi({name:"CubemapFromEquirect",uniforms:io(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ii,blending:dr});s.uniforms.tEquirect.value=e;const a=new ar(i,s),o=e.minFilter;return e.minFilter===Ul&&(e.minFilter=Un),new Fv(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}const Fc=new j,zv=new j,kv=new xi;class Lr{constructor(t=new j(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Fc.subVectors(n,e).cross(zv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){const n=t.delta(Fc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||kv.getNormalMatrix(t),i=this.coplanarPoint(Fc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const bs=new Bl,Na=new j;class Mg{constructor(t=new Lr,e=new Lr,n=new Lr,i=new Lr,s=new Lr,a=new Lr){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],s=n[1],a=n[2],o=n[3],l=n[4],c=n[5],u=n[6],h=n[7],f=n[8],p=n[9],g=n[10],d=n[11],m=n[12],_=n[13],M=n[14],w=n[15];return e[0].setComponents(o-i,h-l,d-f,w-m).normalize(),e[1].setComponents(o+i,h+l,d+f,w+m).normalize(),e[2].setComponents(o+s,h+c,d+p,w+_).normalize(),e[3].setComponents(o-s,h-c,d-p,w-_).normalize(),e[4].setComponents(o-a,h-u,d-g,w-M).normalize(),e[5].setComponents(o+a,h+u,d+g,w+M).normalize(),this}intersectsObject(t){const e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),bs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(bs)}intersectsSprite(t){return bs.center.set(0,0,0),bs.radius=.7071067811865476,bs.applyMatrix4(t.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Na.x=i.normal.x>0?t.max.x:t.min.x,Na.y=i.normal.y>0?t.max.y:t.min.y,Na.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Na)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sg(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Uv(r,t){const e=t.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,f=c.usage,p=r.createBuffer();r.bindBuffer(u,p),r.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const f=u.array,p=u.updateRange;r.bindBuffer(h,c),p.count===-1?r.bufferSubData(h,0,f):(e?r.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):r.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1)}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,i(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:a,remove:o,update:l}}class bh extends yr{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=t/o,f=e/l,p=[],g=[],d=[],m=[];for(let _=0;_<u;_++){const M=_*f-a;for(let w=0;w<c;w++){const x=w*h-s;g.push(x,-M,0),d.push(0,0,1),m.push(w/o),m.push(1-_/l)}}for(let _=0;_<l;_++)for(let M=0;M<o;M++){const w=M+c*_,x=M+c*(_+1),y=M+1+c*(_+1),E=M+1+c*_;p.push(w,x,E),p.push(x,y,E)}this.setIndex(p),this.setAttribute("position",new jr(g,3)),this.setAttribute("normal",new jr(d,3)),this.setAttribute("uv",new jr(m,2))}static fromJSON(t){return new bh(t.width,t.height,t.widthSegments,t.heightSegments)}}var Bv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Vv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Hv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qv="vec3 transformed = vec3( position );",Yv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$v=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = mix(F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence);
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,jv=`#ifdef USE_IRIDESCENCE
const mat3 XYZ_TO_REC709 = mat3(
    3.2404542, -0.9692660,  0.0556434,
   -1.5371385,  1.8760108, -0.2040259,
   -0.4985314,  0.0415560,  1.0572252
);
vec3 Fresnel0ToIor( vec3 fresnel0 ) {
   vec3 sqrtF0 = sqrt( fresnel0 );
   return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
}
vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
   return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
}
float IorToFresnel0( float transmittedIor, float incidentIor ) {
   return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
}
vec3 evalSensitivity( float OPD, vec3 shift ) {
   float phase = 2.0 * PI * OPD * 1.0e-9;
   vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
   vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
   vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
   vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( -pow2( phase ) * var );
   xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[0] ) * exp( -4.5282e+09 * pow2( phase ) );
   xyz /= 1.0685e-7;
   vec3 srgb = XYZ_TO_REC709 * xyz;
   return srgb;
}
vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
   vec3 I;
   float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
   float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
   float cosTheta2Sq = 1.0 - sinTheta2Sq;
   if ( cosTheta2Sq < 0.0 ) {
       return vec3( 1.0 );
   }
   float cosTheta2 = sqrt( cosTheta2Sq );
   float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
   float R12 = F_Schlick( R0, 1.0, cosTheta1 );
   float R21 = R12;
   float T121 = 1.0 - R12;
   float phi12 = 0.0;
   if ( iridescenceIOR < outsideIOR ) phi12 = PI;
   float phi21 = PI - phi12;
   vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );   vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
   vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
   vec3 phi23 = vec3( 0.0 );
   if ( baseIOR[0] < iridescenceIOR ) phi23[0] = PI;
   if ( baseIOR[1] < iridescenceIOR ) phi23[1] = PI;
   if ( baseIOR[2] < iridescenceIOR ) phi23[2] = PI;
   float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
   vec3 phi = vec3( phi21 ) + phi23;
   vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
   vec3 r123 = sqrt( R123 );
   vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
   vec3 C0 = R12 + Rs;
   I = C0;
   vec3 Cm = Rs - T121;
   for ( int m = 1; m <= 2; ++m ) {
       Cm *= r123;
       vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
       I += Cm * Sm;
   }
   return max( I, vec3( 0.0 ) );
}
#endif`,Zv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Jv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ty=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ey=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ny=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,iy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ry=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,sy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,oy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ay=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ly=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,uy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fy="gl_FragColor = linearToOutputTexel( gl_FragColor );",dy=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,py=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,my=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_y=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,My=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,by=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,wy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ty=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ey=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointLightInfo( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotLightInfo( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalLightInfo( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );
		#endif
	}
	#pragma unroll_loop_end
#endif`,Cy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ay=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Ly=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Py=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ry=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,Iy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Oy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fy=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
float dotNVi = saturate( dot( normal, geometry.viewDir ) );
if ( material.iridescenceThickness == 0.0 ) {
	material.iridescence = 0.0;
} else {
	material.iridescence = saturate( material.iridescence );
}
if ( material.iridescence > 0.0 ) {
	material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
	material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ny=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,ky=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,By=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Vy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Gy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$y=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Zy=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Ky=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Jy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Qy=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,iM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,rM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,sM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,oM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,aM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,uM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gM=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,_M=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xM=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,vM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,SM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,EM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,CM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,AM=`#ifdef USE_TRANSMISSION
	float transmissionAlpha = 1.0;
	float transmissionFactor = transmission;
	float thicknessFactor = thickness;
	#ifdef USE_TRANSMISSIONMAP
		transmissionFactor *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		thicknessFactor *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationColor, attenuationDistance );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );
	transmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );
#endif`,LM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,DM=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,PM=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,RM=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,IM=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,OM=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,FM=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,NM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kM=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,UM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BM=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,VM=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,GM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,HM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,WM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,XM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,YM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$M=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jM=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ZM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KM=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JM=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,iS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,oS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,uS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hS=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,dS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Jt={alphamap_fragment:Bv,alphamap_pars_fragment:Vv,alphatest_fragment:Gv,alphatest_pars_fragment:Hv,aomap_fragment:Wv,aomap_pars_fragment:Xv,begin_vertex:qv,beginnormal_vertex:Yv,bsdfs:$v,iridescence_fragment:jv,bumpmap_pars_fragment:Zv,clipping_planes_fragment:Kv,clipping_planes_pars_fragment:Jv,clipping_planes_pars_vertex:Qv,clipping_planes_vertex:ty,color_fragment:ey,color_pars_fragment:ny,color_pars_vertex:iy,color_vertex:ry,common:sy,cube_uv_reflection_fragment:oy,defaultnormal_vertex:ay,displacementmap_pars_vertex:ly,displacementmap_vertex:cy,emissivemap_fragment:uy,emissivemap_pars_fragment:hy,encodings_fragment:fy,encodings_pars_fragment:dy,envmap_fragment:py,envmap_common_pars_fragment:my,envmap_pars_fragment:gy,envmap_pars_vertex:_y,envmap_physical_pars_fragment:Ay,envmap_vertex:xy,fog_vertex:vy,fog_pars_vertex:yy,fog_fragment:My,fog_pars_fragment:Sy,gradientmap_pars_fragment:by,lightmap_fragment:wy,lightmap_pars_fragment:Ty,lights_lambert_vertex:Ey,lights_pars_begin:Cy,lights_toon_fragment:Ly,lights_toon_pars_fragment:Dy,lights_phong_fragment:Py,lights_phong_pars_fragment:Ry,lights_physical_fragment:Iy,lights_physical_pars_fragment:Oy,lights_fragment_begin:Fy,lights_fragment_maps:Ny,lights_fragment_end:zy,logdepthbuf_fragment:ky,logdepthbuf_pars_fragment:Uy,logdepthbuf_pars_vertex:By,logdepthbuf_vertex:Vy,map_fragment:Gy,map_pars_fragment:Hy,map_particle_fragment:Wy,map_particle_pars_fragment:Xy,metalnessmap_fragment:qy,metalnessmap_pars_fragment:Yy,morphcolor_vertex:$y,morphnormal_vertex:jy,morphtarget_pars_vertex:Zy,morphtarget_vertex:Ky,normal_fragment_begin:Jy,normal_fragment_maps:Qy,normal_pars_fragment:tM,normal_pars_vertex:eM,normal_vertex:nM,normalmap_pars_fragment:iM,clearcoat_normal_fragment_begin:rM,clearcoat_normal_fragment_maps:sM,clearcoat_pars_fragment:oM,iridescence_pars_fragment:aM,output_fragment:lM,packing:cM,premultiplied_alpha_fragment:uM,project_vertex:hM,dithering_fragment:fM,dithering_pars_fragment:dM,roughnessmap_fragment:pM,roughnessmap_pars_fragment:mM,shadowmap_pars_fragment:gM,shadowmap_pars_vertex:_M,shadowmap_vertex:xM,shadowmask_pars_fragment:vM,skinbase_vertex:yM,skinning_pars_vertex:MM,skinning_vertex:SM,skinnormal_vertex:bM,specularmap_fragment:wM,specularmap_pars_fragment:TM,tonemapping_fragment:EM,tonemapping_pars_fragment:CM,transmission_fragment:AM,transmission_pars_fragment:LM,uv_pars_fragment:DM,uv_pars_vertex:PM,uv_vertex:RM,uv2_pars_fragment:IM,uv2_pars_vertex:OM,uv2_vertex:FM,worldpos_vertex:NM,background_vert:zM,background_frag:kM,cube_vert:UM,cube_frag:BM,depth_vert:VM,depth_frag:GM,distanceRGBA_vert:HM,distanceRGBA_frag:WM,equirect_vert:XM,equirect_frag:qM,linedashed_vert:YM,linedashed_frag:$M,meshbasic_vert:jM,meshbasic_frag:ZM,meshlambert_vert:KM,meshlambert_frag:JM,meshmatcap_vert:QM,meshmatcap_frag:tS,meshnormal_vert:eS,meshnormal_frag:nS,meshphong_vert:iS,meshphong_frag:rS,meshphysical_vert:sS,meshphysical_frag:oS,meshtoon_vert:aS,meshtoon_frag:lS,points_vert:cS,points_frag:uS,shadow_vert:hS,shadow_frag:fS,sprite_vert:dS,sprite_frag:pS},xt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new xi},uv2Transform:{value:new xi},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new xi}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new xi}}},di={basic:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.fog,xt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ve([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ve([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new $t(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ve([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ve([xt.points,xt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ve([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ve([xt.common,xt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ve([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ve([xt.sprite,xt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new xi},t2D:{value:null}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},cube:{uniforms:Ve([xt.envmap,{opacity:{value:1}}]),vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ve([xt.common,xt.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ve([xt.lights,xt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};di.physical={uniforms:Ve([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};function mS(r,t,e,n,i,s){const a=new $t(0);let o=i===!0?0:1,l,c,u=null,h=0,f=null;function p(d,m){let _=!1,M=m.isScene===!0?m.background:null;M&&M.isTexture&&(M=t.get(M));const w=r.xr,x=w.getSession&&w.getSession();x&&x.environmentBlendMode==="additive"&&(M=null),M===null?g(a,o):M&&M.isColor&&(g(M,1),_=!0),(r.autoClear||_)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),M&&(M.isCubeTexture||M.mapping===kl)?(c===void 0&&(c=new ar(new ea(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:io(di.cube.uniforms),vertexShader:di.cube.vertexShader,fragmentShader:di.cube.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,(u!==M||h!==M.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,f=r.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new ar(new bh(2,2),new Xi({name:"BackgroundMaterial",uniforms:io(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:Yo,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,f=r.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))}function g(d,m){e.buffers.color.setClear(d.r,d.g,d.b,m,s)}return{getClearColor:function(){return a},setClearColor:function(d,m=1){a.set(d),o=m,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(d){o=d,g(a,o)},render:p}}function gS(r,t,e,n){const i=r.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null);let c=l,u=!1;function h(I,V,z,U,G){let k=!1;if(a){const C=d(U,z,V);c!==C&&(c=C,p(c.object)),k=_(I,U,z,G),k&&M(I,U,z,G)}else{const C=V.wireframe===!0;(c.geometry!==U.id||c.program!==z.id||c.wireframe!==C)&&(c.geometry=U.id,c.program=z.id,c.wireframe=C,k=!0)}G!==null&&e.update(G,34963),(k||u)&&(u=!1,v(I,V,z,U),G!==null&&r.bindBuffer(34963,e.get(G).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function p(I){return n.isWebGL2?r.bindVertexArray(I):s.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?r.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function d(I,V,z){const U=z.wireframe===!0;let G=o[I.id];G===void 0&&(G={},o[I.id]=G);let k=G[V.id];k===void 0&&(k={},G[V.id]=k);let C=k[U];return C===void 0&&(C=m(f()),k[U]=C),C}function m(I){const V=[],z=[],U=[];for(let G=0;G<i;G++)V[G]=0,z[G]=0,U[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:z,attributeDivisors:U,object:I,attributes:{},index:null}}function _(I,V,z,U){const G=c.attributes,k=V.attributes;let C=0;const Z=z.getAttributes();for(const N in Z)if(Z[N].location>=0){const J=G[N];let q=k[N];if(q===void 0&&(N==="instanceMatrix"&&I.instanceMatrix&&(q=I.instanceMatrix),N==="instanceColor"&&I.instanceColor&&(q=I.instanceColor)),J===void 0||J.attribute!==q||q&&J.data!==q.data)return!0;C++}return c.attributesNum!==C||c.index!==U}function M(I,V,z,U){const G={},k=V.attributes;let C=0;const Z=z.getAttributes();for(const N in Z)if(Z[N].location>=0){let J=k[N];J===void 0&&(N==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),N==="instanceColor"&&I.instanceColor&&(J=I.instanceColor));const q={};q.attribute=J,J&&J.data&&(q.data=J.data),G[N]=q,C++}c.attributes=G,c.attributesNum=C,c.index=U}function w(){const I=c.newAttributes;for(let V=0,z=I.length;V<z;V++)I[V]=0}function x(I){y(I,0)}function y(I,V){const z=c.newAttributes,U=c.enabledAttributes,G=c.attributeDivisors;z[I]=1,U[I]===0&&(r.enableVertexAttribArray(I),U[I]=1),G[I]!==V&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,V),G[I]=V)}function E(){const I=c.newAttributes,V=c.enabledAttributes;for(let z=0,U=V.length;z<U;z++)V[z]!==I[z]&&(r.disableVertexAttribArray(z),V[z]=0)}function A(I,V,z,U,G,k){n.isWebGL2===!0&&(z===5124||z===5125)?r.vertexAttribIPointer(I,V,z,G,k):r.vertexAttribPointer(I,V,z,U,G,k)}function v(I,V,z,U){if(n.isWebGL2===!1&&(I.isInstancedMesh||U.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;w();const G=U.attributes,k=z.getAttributes(),C=V.defaultAttributeValues;for(const Z in k){const N=k[Z];if(N.location>=0){let K=G[Z];if(K===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(K=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(K=I.instanceColor)),K!==void 0){const J=K.normalized,q=K.itemSize,B=e.get(K);if(B===void 0)continue;const at=B.buffer,rt=B.type,ct=B.bytesPerElement;if(K.isInterleavedBufferAttribute){const ot=K.data,yt=ot.stride,vt=K.offset;if(ot.isInstancedInterleavedBuffer){for(let ht=0;ht<N.locationSize;ht++)y(N.location+ht,ot.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let ht=0;ht<N.locationSize;ht++)x(N.location+ht);r.bindBuffer(34962,at);for(let ht=0;ht<N.locationSize;ht++)A(N.location+ht,q/N.locationSize,rt,J,yt*ct,(vt+q/N.locationSize*ht)*ct)}else{if(K.isInstancedBufferAttribute){for(let ot=0;ot<N.locationSize;ot++)y(N.location+ot,K.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ot=0;ot<N.locationSize;ot++)x(N.location+ot);r.bindBuffer(34962,at);for(let ot=0;ot<N.locationSize;ot++)A(N.location+ot,q/N.locationSize,rt,J,q*ct,q/N.locationSize*ot*ct)}}else if(C!==void 0){const J=C[Z];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv(N.location,J);break;case 3:r.vertexAttrib3fv(N.location,J);break;case 4:r.vertexAttrib4fv(N.location,J);break;default:r.vertexAttrib1fv(N.location,J)}}}}E()}function S(){F();for(const I in o){const V=o[I];for(const z in V){const U=V[z];for(const G in U)g(U[G].object),delete U[G];delete V[z]}delete o[I]}}function D(I){if(o[I.id]===void 0)return;const V=o[I.id];for(const z in V){const U=V[z];for(const G in U)g(U[G].object),delete U[G];delete V[z]}delete o[I.id]}function R(I){for(const V in o){const z=o[V];if(z[I.id]===void 0)continue;const U=z[I.id];for(const G in U)g(U[G].object),delete U[G];delete z[I.id]}}function F(){$(),u=!0,c!==l&&(c=l,p(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:$,dispose:S,releaseStatesOfGeometry:D,releaseStatesOfProgram:R,initAttributes:w,enableAttribute:x,disableUnusedAttributes:E}}function _S(r,t,e,n){const i=n.isWebGL2;let s;function a(c){s=c}function o(c,u){r.drawArrays(s,c,u),e.update(u,s,1)}function l(c,u,h){if(h===0)return;let f,p;if(i)f=r,p="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](s,c,u,h),e.update(u,s,h)}this.setMode=a,this.render=o,this.renderInstances=l}function xS(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&r instanceof WebGL2ComputeRenderingContext;let o=e.precision!==void 0?e.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=r.getParameter(34930),f=r.getParameter(35660),p=r.getParameter(3379),g=r.getParameter(34076),d=r.getParameter(34921),m=r.getParameter(36347),_=r.getParameter(36348),M=r.getParameter(36349),w=f>0,x=a||t.has("OES_texture_float"),y=w&&x,E=a?r.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:M,vertexTextures:w,floatFragmentTextures:x,floatVertexTextures:y,maxSamples:E}}function vS(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new Lr,o=new xi,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f,p){const g=h.length!==0||f||n!==0||i;return i=f,e=u(h,p,0),n=h.length,g},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1,c()},this.setState=function(h,f,p){const g=h.clippingPlanes,d=h.clipIntersection,m=h.clipShadows,_=r.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,w=M*4;let x=_.clippingState||null;l.value=x,x=u(g,f,w,p);for(let y=0;y!==w;++y)x[y]=e[y];_.clippingState=x,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,p,g){const d=h!==null?h.length:0;let m=null;if(d!==0){if(m=l.value,g!==!0||m===null){const _=p+d*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<_)&&(m=new Float32Array(_));for(let w=0,x=p;w!==d;++w,x+=4)a.copy(h[w]).applyMatrix4(M,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=d,t.numIntersection=0,m}}function yS(r){let t=new WeakMap;function e(a,o){return o===Lu?a.mapping=to:o===Du&&(a.mapping=eo),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===Lu||o===Du)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nv(l.height/2);return c.fromEquirectangularTexture(r,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class MS extends vg{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Rs=4,xd=[.125,.215,.35,.446,.526,.582],Pr=20,Nc=new MS,vd=new $t;let zc=null;const Dr=(1+Math.sqrt(5))/2,ws=1/Dr,yd=[new j(1,1,1),new j(-1,1,1),new j(1,1,-1),new j(-1,1,-1),new j(0,Dr,ws),new j(0,Dr,-ws),new j(ws,0,Dr),new j(-ws,0,Dr),new j(Dr,ws,0),new j(-Dr,ws,0)];class Md{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){zc=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(zc),t.scissorTest=!1,za(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===to||t.mapping===eo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zc=this._renderer.getRenderTarget();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:$o,format:ni,encoding:ns,depthBuffer:!1},i=Sd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sd(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=SS(s)),this._blurMaterial=bS(s,t,e)}return i}_compileMaterial(t){const e=new ar(this._lodPlanes[0],t);this._renderer.compile(e,Nc)}_sceneToCubeUV(t,e,n,i){const o=new ti(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(vd),u.toneMapping=Vi,u.autoClear=!1;const p=new Sh({name:"PMREM.Background",side:ii,depthWrite:!1,depthTest:!1}),g=new ar(new ea,p);let d=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,d=!0):(p.color.copy(vd),d=!0);for(let _=0;_<6;_++){const M=_%3;M===0?(o.up.set(0,l[_],0),o.lookAt(c[_],0,0)):M===1?(o.up.set(0,0,l[_]),o.lookAt(0,c[_],0)):(o.up.set(0,l[_],0),o.lookAt(0,0,c[_]));const w=this._cubeSize;za(i,M*w,_>2?w:0,w,w),u.setRenderTarget(i),d&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===to||t.mapping===eo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=wd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bd());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new ar(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;za(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Nc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=yd[(i-1)%yd.length];this._blur(t,i-1,i,s,a)}e.autoClear=n}_blur(t,e,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ar(this._lodPlanes[i],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Pr-1),d=s/g,m=isFinite(s)?1+Math.floor(u*d):Pr;m>Pr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pr}`);const _=[];let M=0;for(let A=0;A<Pr;++A){const v=A/d,S=Math.exp(-v*v/2);_.push(S),A===0?M+=S:A<m&&(M+=2*S)}for(let A=0;A<_.length;A++)_[A]=_[A]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=_,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-n;const x=this._sizeLods[i],y=3*x*(i>w-Rs?i-w+Rs:0),E=4*(this._cubeSize-x);za(e,y,E,3*x,2*x),l.setRenderTarget(e),l.render(h,Nc)}}function SS(r){const t=[],e=[],n=[];let i=r;const s=r-Rs+1+xd.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-Rs?l=xd[a-r+Rs-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,d=3,m=2,_=1,M=new Float32Array(d*g*p),w=new Float32Array(m*g*p),x=new Float32Array(_*g*p);for(let E=0;E<p;E++){const A=E%3*2/3-1,v=E>2?0:-1,S=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];M.set(S,d*g*E),w.set(f,m*g*E);const D=[E,E,E,E,E,E];x.set(D,_*g*E)}const y=new yr;y.setAttribute("position",new Si(M,d)),y.setAttribute("uv",new Si(w,m)),y.setAttribute("faceIndex",new Si(x,_)),t.push(y),i>Rs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Sd(r,t,e){const n=new pr(r,t,e);return n.texture.mapping=kl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function za(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function bS(r,t,e){const n=new Float32Array(Pr),i=new j(0,1,0);return new Xi({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function bd(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function wd(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function wh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function wS(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Lu||l===Du,u=l===to||l===eo;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=t.get(o);return e===null&&(e=new Md(r)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),t.set(o,h),h.texture}else{if(t.has(o))return t.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&i(h)){e===null&&(e=new Md(r));const f=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function TS(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ES(r,t,e,n){const i={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const p=s.get(f);p&&(t.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],34962);const p=h.morphAttributes;for(const g in p){const d=p[g];for(let m=0,_=d.length;m<_;m++)t.update(d[m],34962)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let d=0;if(p!==null){const M=p.array;d=p.version;for(let w=0,x=M.length;w<x;w+=3){const y=M[w+0],E=M[w+1],A=M[w+2];f.push(y,E,E,A,A,y)}}else{const M=g.array;d=g.version;for(let w=0,x=M.length/3-1;w<x;w+=3){const y=w+0,E=w+1,A=w+2;f.push(y,E,E,A,A,y)}}const m=new(ug(f)?xg:_g)(f,1);m.version=d;const _=s.get(h);_&&t.remove(_),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function CS(r,t,e,n){const i=n.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,p){r.drawElements(s,p,o,f*l),e.update(p,s,1)}function h(f,p,g){if(g===0)return;let d,m;if(i)d=r,m="drawElementsInstanced";else if(d=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,p,o,f*l,g),e.update(p,s,g)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h}function AS(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case 4:e.triangles+=o*(s/3);break;case 1:e.lines+=o*(s/2);break;case 3:e.lines+=o*(s-1);break;case 2:e.lines+=o*s;break;case 0:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function LS(r,t){return r[0]-t[0]}function DS(r,t){return Math.abs(t[1])-Math.abs(r[1])}function kc(r,t){let e=1;const n=t.isInterleavedBufferAttribute?t.data.array:t.array;n instanceof Int8Array?e=127:n instanceof Int16Array?e=32767:n instanceof Int32Array?e=2147483647:console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ",n),r.divideScalar(e)}function PS(r,t,e){const n={},i=new Float32Array(8),s=new WeakMap,a=new We,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h,f){const p=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,d=g!==void 0?g.length:0;let m=s.get(u);if(m===void 0||m.count!==d){let V=function(){$.dispose(),s.delete(u),u.removeEventListener("dispose",V)};m!==void 0&&m.texture.dispose();const w=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,y=u.morphAttributes.color!==void 0,E=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],v=u.morphAttributes.color||[];let S=0;w===!0&&(S=1),x===!0&&(S=2),y===!0&&(S=3);let D=u.attributes.position.count*S,R=1;D>t.maxTextureSize&&(R=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const F=new Float32Array(D*R*4*d),$=new pg(F,D,R,d);$.type=zr,$.needsUpdate=!0;const I=S*4;for(let z=0;z<d;z++){const U=E[z],G=A[z],k=v[z],C=D*R*4*z;for(let Z=0;Z<U.count;Z++){const N=Z*I;w===!0&&(a.fromBufferAttribute(U,Z),U.normalized===!0&&kc(a,U),F[C+N+0]=a.x,F[C+N+1]=a.y,F[C+N+2]=a.z,F[C+N+3]=0),x===!0&&(a.fromBufferAttribute(G,Z),G.normalized===!0&&kc(a,G),F[C+N+4]=a.x,F[C+N+5]=a.y,F[C+N+6]=a.z,F[C+N+7]=0),y===!0&&(a.fromBufferAttribute(k,Z),k.normalized===!0&&kc(a,k),F[C+N+8]=a.x,F[C+N+9]=a.y,F[C+N+10]=a.z,F[C+N+11]=k.itemSize===4?a.w:1)}}m={count:d,texture:$,size:new Yt(D,R)},s.set(u,m),u.addEventListener("dispose",V)}let _=0;for(let w=0;w<p.length;w++)_+=p[w];const M=u.morphTargetsRelative?1:1-_;f.getUniforms().setValue(r,"morphTargetBaseInfluence",M),f.getUniforms().setValue(r,"morphTargetInfluences",p),f.getUniforms().setValue(r,"morphTargetsTexture",m.texture,e),f.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=p===void 0?0:p.length;let d=n[u.id];if(d===void 0||d.length!==g){d=[];for(let x=0;x<g;x++)d[x]=[x,0];n[u.id]=d}for(let x=0;x<g;x++){const y=d[x];y[0]=x,y[1]=p[x]}d.sort(DS);for(let x=0;x<8;x++)x<g&&d[x][1]?(o[x][0]=d[x][0],o[x][1]=d[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(LS);const m=u.morphAttributes.position,_=u.morphAttributes.normal;let M=0;for(let x=0;x<8;x++){const y=o[x],E=y[0],A=y[1];E!==Number.MAX_SAFE_INTEGER&&A?(m&&u.getAttribute("morphTarget"+x)!==m[E]&&u.setAttribute("morphTarget"+x,m[E]),_&&u.getAttribute("morphNormal"+x)!==_[E]&&u.setAttribute("morphNormal"+x,_[E]),i[x]=A,M+=A):(m&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),_&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}const w=u.morphTargetsRelative?1:1-M;f.getUniforms().setValue(r,"morphTargetBaseInfluence",w),f.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function RS(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);return i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),e.update(l.instanceMatrix,34962),l.instanceColor!==null&&e.update(l.instanceColor,34962)),h}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}const bg=new si,wg=new pg,Tg=new Mv,Eg=new yg,Td=[],Ed=[],Cd=new Float32Array(16),Ad=new Float32Array(9),Ld=new Float32Array(4);function oo(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Td[i];if(s===void 0&&(s=new Float32Array(i),Td[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function rn(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function sn(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Vl(r,t){let e=Ed[t];e===void 0&&(e=new Int32Array(t),Ed[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function IS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function OS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(rn(e,t))return;r.uniform2fv(this.addr,t),sn(e,t)}}function FS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(rn(e,t))return;r.uniform3fv(this.addr,t),sn(e,t)}}function NS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(rn(e,t))return;r.uniform4fv(this.addr,t),sn(e,t)}}function zS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),sn(e,t)}else{if(rn(e,n))return;Ld.set(n),r.uniformMatrix2fv(this.addr,!1,Ld),sn(e,n)}}function kS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),sn(e,t)}else{if(rn(e,n))return;Ad.set(n),r.uniformMatrix3fv(this.addr,!1,Ad),sn(e,n)}}function US(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),sn(e,t)}else{if(rn(e,n))return;Cd.set(n),r.uniformMatrix4fv(this.addr,!1,Cd),sn(e,n)}}function BS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function VS(r,t){const e=this.cache;rn(e,t)||(r.uniform2iv(this.addr,t),sn(e,t))}function GS(r,t){const e=this.cache;rn(e,t)||(r.uniform3iv(this.addr,t),sn(e,t))}function HS(r,t){const e=this.cache;rn(e,t)||(r.uniform4iv(this.addr,t),sn(e,t))}function WS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function XS(r,t){const e=this.cache;rn(e,t)||(r.uniform2uiv(this.addr,t),sn(e,t))}function qS(r,t){const e=this.cache;rn(e,t)||(r.uniform3uiv(this.addr,t),sn(e,t))}function YS(r,t){const e=this.cache;rn(e,t)||(r.uniform4uiv(this.addr,t),sn(e,t))}function $S(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||bg,i)}function jS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Tg,i)}function ZS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Eg,i)}function KS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||wg,i)}function JS(r){switch(r){case 5126:return IS;case 35664:return OS;case 35665:return FS;case 35666:return NS;case 35674:return zS;case 35675:return kS;case 35676:return US;case 5124:case 35670:return BS;case 35667:case 35671:return VS;case 35668:case 35672:return GS;case 35669:case 35673:return HS;case 5125:return WS;case 36294:return XS;case 36295:return qS;case 36296:return YS;case 35678:case 36198:case 36298:case 36306:case 35682:return $S;case 35679:case 36299:case 36307:return jS;case 35680:case 36300:case 36308:case 36293:return ZS;case 36289:case 36303:case 36311:case 36292:return KS}}function QS(r,t){r.uniform1fv(this.addr,t)}function tb(r,t){const e=oo(t,this.size,2);r.uniform2fv(this.addr,e)}function eb(r,t){const e=oo(t,this.size,3);r.uniform3fv(this.addr,e)}function nb(r,t){const e=oo(t,this.size,4);r.uniform4fv(this.addr,e)}function ib(r,t){const e=oo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function rb(r,t){const e=oo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function sb(r,t){const e=oo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function ob(r,t){r.uniform1iv(this.addr,t)}function ab(r,t){r.uniform2iv(this.addr,t)}function lb(r,t){r.uniform3iv(this.addr,t)}function cb(r,t){r.uniform4iv(this.addr,t)}function ub(r,t){r.uniform1uiv(this.addr,t)}function hb(r,t){r.uniform2uiv(this.addr,t)}function fb(r,t){r.uniform3uiv(this.addr,t)}function db(r,t){r.uniform4uiv(this.addr,t)}function pb(r,t,e){const n=t.length,i=Vl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture2D(t[s]||bg,i[s])}function mb(r,t,e){const n=t.length,i=Vl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture3D(t[s]||Tg,i[s])}function gb(r,t,e){const n=t.length,i=Vl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTextureCube(t[s]||Eg,i[s])}function _b(r,t,e){const n=t.length,i=Vl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture2DArray(t[s]||wg,i[s])}function xb(r){switch(r){case 5126:return QS;case 35664:return tb;case 35665:return eb;case 35666:return nb;case 35674:return ib;case 35675:return rb;case 35676:return sb;case 5124:case 35670:return ob;case 35667:case 35671:return ab;case 35668:case 35672:return lb;case 35669:case 35673:return cb;case 5125:return ub;case 36294:return hb;case 36295:return fb;case 36296:return db;case 35678:case 36198:case 36298:case 36306:case 35682:return pb;case 35679:case 36299:case 36307:return mb;case 35680:case 36300:case 36308:case 36293:return gb;case 36289:case 36303:case 36311:case 36292:return _b}}class vb{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=JS(e.type)}}class yb{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=xb(e.type)}}class Mb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const Uc=/(\w+)(\])?(\[|\.)?/g;function Dd(r,t){r.seq.push(t),r.map[t.id]=t}function Sb(r,t,e){const n=r.name,i=n.length;for(Uc.lastIndex=0;;){const s=Uc.exec(n),a=Uc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Dd(e,c===void 0?new vb(o,r,t):new yb(o,r,t));break}else{let h=e.map[o];h===void 0&&(h=new Mb(o),Dd(e,h)),e=h}}}class el{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);Sb(s,a,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Pd(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}let bb=0;function wb(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Tb(r){switch(r){case ns:return["Linear","( value )"];case ge:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function Rd(r,t,e){const n=r.getShaderParameter(t,35713),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+wb(r.getShaderSource(t),a)}else return i}function Eb(r,t){const e=Tb(t);return"vec4 "+r+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function Cb(r,t){let e;switch(t){case $x:e="Linear";break;case jx:e="Reinhard";break;case Zx:e="OptimizedCineon";break;case Kx:e="ACESFilmic";break;case Jx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Ab(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(So).join(`
`)}function Lb(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Db(r,t){const e={},n=r.getProgramParameter(t,35721);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===35674&&(o=2),s.type===35675&&(o=3),s.type===35676&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function So(r){return r!==""}function Id(r,t){return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Od(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Pb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fu(r){return r.replace(Pb,Rb)}function Rb(r,t){const e=Jt[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return Fu(e)}const Ib=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,Ob=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fd(r){return r.replace(Ob,Cg).replace(Ib,Fb)}function Fb(r,t,e,n){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),Cg(r,t,e,n)}function Cg(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Nd(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Nb(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===sg?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Tx?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Mo&&(t="SHADOWMAP_TYPE_VSM"),t}function zb(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case to:case eo:t="ENVMAP_TYPE_CUBE";break;case kl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function kb(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case eo:t="ENVMAP_MODE_REFRACTION";break}return t}function Ub(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case zl:t="ENVMAP_BLENDING_MULTIPLY";break;case qx:t="ENVMAP_BLENDING_MIX";break;case Yx:t="ENVMAP_BLENDING_ADD";break}return t}function Bb(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Vb(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Nb(e),c=zb(e),u=kb(e),h=Ub(e),f=Bb(e),p=e.isWebGL2?"":Ab(e),g=Lb(s),d=i.createProgram();let m,_,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=[g].filter(So).join(`
`),m.length>0&&(m+=`
`),_=[p,g].filter(So).join(`
`),_.length>0&&(_+=`
`)):(m=[Nd(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(So).join(`
`),_=[p,Nd(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vi?"#define TONE_MAPPING":"",e.toneMapping!==Vi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Vi?Cb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.encodings_pars_fragment,Eb("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(So).join(`
`)),a=Fu(a),a=Id(a,e),a=Od(a,e),o=Fu(o),o=Id(o,e),o=Od(o,e),a=Fd(a),o=Fd(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,_=["#define varying in",e.glslVersion===rd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const w=M+m+a,x=M+_+o,y=Pd(i,35633,w),E=Pd(i,35632,x);if(i.attachShader(d,y),i.attachShader(d,E),e.index0AttributeName!==void 0?i.bindAttribLocation(d,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(d,0,"position"),i.linkProgram(d),r.debug.checkShaderErrors){const S=i.getProgramInfoLog(d).trim(),D=i.getShaderInfoLog(y).trim(),R=i.getShaderInfoLog(E).trim();let F=!0,$=!0;if(i.getProgramParameter(d,35714)===!1){F=!1;const I=Rd(i,y,"vertex"),V=Rd(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(d,35715)+`

Program Info Log: `+S+`
`+I+`
`+V)}else S!==""?console.warn("THREE.WebGLProgram: Program Info Log:",S):(D===""||R==="")&&($=!1);$&&(this.diagnostics={runnable:F,programLog:S,vertexShader:{log:D,prefix:m},fragmentShader:{log:R,prefix:_}})}i.deleteShader(y),i.deleteShader(E);let A;this.getUniforms=function(){return A===void 0&&(A=new el(i,d)),A};let v;return this.getAttributes=function(){return v===void 0&&(v=Db(i,d)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(d),this.program=void 0},this.name=e.shaderName,this.id=bb++,this.cacheKey=t,this.usedTimes=1,this.program=d,this.vertexShader=y,this.fragmentShader=E,this}let Gb=0;class Hb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;return e.has(t)===!1&&e.set(t,new Set),e.get(t)}_getShaderStage(t){const e=this.shaderCache;if(e.has(t)===!1){const n=new Wb(t);e.set(t,n)}return e.get(t)}}class Wb{constructor(t){this.id=Gb++,this.code=t,this.usedTimes=0}}function Xb(r,t,e,n,i,s,a){const o=new gg,l=new Hb,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(v,S,D,R,F){const $=R.fog,I=F.geometry,V=v.isMeshStandardMaterial?R.environment:null,z=(v.isMeshStandardMaterial?e:t).get(v.envMap||V),U=z&&z.mapping===kl?z.image.height:null,G=g[v.type];v.precision!==null&&(p=i.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const k=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,C=k!==void 0?k.length:0;let Z=0;I.morphAttributes.position!==void 0&&(Z=1),I.morphAttributes.normal!==void 0&&(Z=2),I.morphAttributes.color!==void 0&&(Z=3);let N,K,J,q;if(G){const yt=di[G];N=yt.vertexShader,K=yt.fragmentShader}else N=v.vertexShader,K=v.fragmentShader,l.update(v),J=l.getVertexShaderID(v),q=l.getFragmentShaderID(v);const B=r.getRenderTarget(),at=v.alphaTest>0,rt=v.clearcoat>0,ct=v.iridescence>0;return{isWebGL2:u,shaderID:G,shaderName:v.type,vertexShader:N,fragmentShader:K,defines:v.defines,customVertexShaderID:J,customFragmentShaderID:q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,instancing:F.isInstancedMesh===!0,instancingColor:F.isInstancedMesh===!0&&F.instanceColor!==null,supportsVertexTextures:f,outputEncoding:B===null?r.outputEncoding:B.isXRRenderTarget===!0?B.texture.encoding:ns,map:!!v.map,matcap:!!v.matcap,envMap:!!z,envMapMode:z&&z.mapping,envMapCubeUVHeight:U,lightMap:!!v.lightMap,aoMap:!!v.aoMap,emissiveMap:!!v.emissiveMap,bumpMap:!!v.bumpMap,normalMap:!!v.normalMap,objectSpaceNormalMap:v.normalMapType===_v,tangentSpaceNormalMap:v.normalMapType===so,decodeVideoTexture:!!v.map&&v.map.isVideoTexture===!0&&v.map.encoding===ge,clearcoat:rt,clearcoatMap:rt&&!!v.clearcoatMap,clearcoatRoughnessMap:rt&&!!v.clearcoatRoughnessMap,clearcoatNormalMap:rt&&!!v.clearcoatNormalMap,iridescence:ct,iridescenceMap:ct&&!!v.iridescenceMap,iridescenceThicknessMap:ct&&!!v.iridescenceThicknessMap,displacementMap:!!v.displacementMap,roughnessMap:!!v.roughnessMap,metalnessMap:!!v.metalnessMap,specularMap:!!v.specularMap,specularIntensityMap:!!v.specularIntensityMap,specularColorMap:!!v.specularColorMap,opaque:v.transparent===!1&&v.blending===Vs,alphaMap:!!v.alphaMap,alphaTest:at,gradientMap:!!v.gradientMap,sheen:v.sheen>0,sheenColorMap:!!v.sheenColorMap,sheenRoughnessMap:!!v.sheenRoughnessMap,transmission:v.transmission>0,transmissionMap:!!v.transmissionMap,thicknessMap:!!v.thicknessMap,combine:v.combine,vertexTangents:!!v.normalMap&&!!I.attributes.tangent,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUvs:!!v.map||!!v.bumpMap||!!v.normalMap||!!v.specularMap||!!v.alphaMap||!!v.emissiveMap||!!v.roughnessMap||!!v.metalnessMap||!!v.clearcoatMap||!!v.clearcoatRoughnessMap||!!v.clearcoatNormalMap||!!v.iridescenceMap||!!v.iridescenceThicknessMap||!!v.displacementMap||!!v.transmissionMap||!!v.thicknessMap||!!v.specularIntensityMap||!!v.specularColorMap||!!v.sheenColorMap||!!v.sheenRoughnessMap,uvsVertexOnly:!(v.map||v.bumpMap||v.normalMap||v.specularMap||v.alphaMap||v.emissiveMap||v.roughnessMap||v.metalnessMap||v.clearcoatNormalMap||v.iridescenceMap||v.iridescenceThicknessMap||v.transmission>0||v.transmissionMap||v.thicknessMap||v.specularIntensityMap||v.specularColorMap||v.sheen>0||v.sheenColorMap||v.sheenRoughnessMap)&&!!v.displacementMap,fog:!!$,useFog:v.fog===!0,fogExp2:$&&$.isFogExp2,flatShading:!!v.flatShading,sizeAttenuation:v.sizeAttenuation,logarithmicDepthBuffer:h,skinning:F.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:C,morphTextureStride:Z,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:v.toneMapped?r.toneMapping:Vi,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Qs,flipSided:v.side===ii,useDepthPacking:!!v.depthPacking,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:v.extensions&&v.extensions.derivatives,extensionFragDepth:v.extensions&&v.extensions.fragDepth,extensionDrawBuffers:v.extensions&&v.extensions.drawBuffers,extensionShaderTextureLOD:v.extensions&&v.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:v.customProgramCacheKey()}}function m(v){const S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)S.push(D),S.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(_(S,v),M(S,v),S.push(r.outputEncoding)),S.push(v.customProgramCacheKey),S.join()}function _(v,S){v.push(S.precision),v.push(S.outputEncoding),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.combine),v.push(S.vertexUvs),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function M(v,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.map&&o.enable(4),S.matcap&&o.enable(5),S.envMap&&o.enable(6),S.lightMap&&o.enable(7),S.aoMap&&o.enable(8),S.emissiveMap&&o.enable(9),S.bumpMap&&o.enable(10),S.normalMap&&o.enable(11),S.objectSpaceNormalMap&&o.enable(12),S.tangentSpaceNormalMap&&o.enable(13),S.clearcoat&&o.enable(14),S.clearcoatMap&&o.enable(15),S.clearcoatRoughnessMap&&o.enable(16),S.clearcoatNormalMap&&o.enable(17),S.iridescence&&o.enable(18),S.iridescenceMap&&o.enable(19),S.iridescenceThicknessMap&&o.enable(20),S.displacementMap&&o.enable(21),S.specularMap&&o.enable(22),S.roughnessMap&&o.enable(23),S.metalnessMap&&o.enable(24),S.gradientMap&&o.enable(25),S.alphaMap&&o.enable(26),S.alphaTest&&o.enable(27),S.vertexColors&&o.enable(28),S.vertexAlphas&&o.enable(29),S.vertexUvs&&o.enable(30),S.vertexTangents&&o.enable(31),S.uvsVertexOnly&&o.enable(32),S.fog&&o.enable(33),v.push(o.mask),o.disableAll(),S.useFog&&o.enable(0),S.flatShading&&o.enable(1),S.logarithmicDepthBuffer&&o.enable(2),S.skinning&&o.enable(3),S.morphTargets&&o.enable(4),S.morphNormals&&o.enable(5),S.morphColors&&o.enable(6),S.premultipliedAlpha&&o.enable(7),S.shadowMapEnabled&&o.enable(8),S.physicallyCorrectLights&&o.enable(9),S.doubleSided&&o.enable(10),S.flipSided&&o.enable(11),S.useDepthPacking&&o.enable(12),S.dithering&&o.enable(13),S.specularIntensityMap&&o.enable(14),S.specularColorMap&&o.enable(15),S.transmission&&o.enable(16),S.transmissionMap&&o.enable(17),S.thicknessMap&&o.enable(18),S.sheen&&o.enable(19),S.sheenColorMap&&o.enable(20),S.sheenRoughnessMap&&o.enable(21),S.decodeVideoTexture&&o.enable(22),S.opaque&&o.enable(23),v.push(o.mask)}function w(v){const S=g[v.type];let D;if(S){const R=di[S];D=Rv.clone(R.uniforms)}else D=v.uniforms;return D}function x(v,S){let D;for(let R=0,F=c.length;R<F;R++){const $=c[R];if($.cacheKey===S){D=$,++D.usedTimes;break}}return D===void 0&&(D=new Vb(r,S,v,s),c.push(D)),D}function y(v){if(--v.usedTimes===0){const S=c.indexOf(v);c[S]=c[c.length-1],c.pop(),v.destroy()}}function E(v){l.remove(v)}function A(){l.dispose()}return{getParameters:d,getProgramCacheKey:m,getUniforms:w,acquireProgram:x,releaseProgram:y,releaseShaderCache:E,programs:c,dispose:A}}function qb(){let r=new WeakMap;function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function e(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Yb(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function zd(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function kd(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(h,f,p,g,d,m){let _=r[t];return _===void 0?(_={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:d,group:m},r[t]=_):(_.id=h.id,_.object=h,_.geometry=f,_.material=p,_.groupOrder=g,_.renderOrder=h.renderOrder,_.z=d,_.group=m),t++,_}function o(h,f,p,g,d,m){const _=a(h,f,p,g,d,m);p.transmission>0?n.push(_):p.transparent===!0?i.push(_):e.push(_)}function l(h,f,p,g,d,m){const _=a(h,f,p,g,d,m);p.transmission>0?n.unshift(_):p.transparent===!0?i.unshift(_):e.unshift(_)}function c(h,f){e.length>1&&e.sort(h||Yb),n.length>1&&n.sort(f||zd),i.length>1&&i.sort(f||zd)}function u(){for(let h=t,f=r.length;h<f;h++){const p=r[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:u,sort:c}}function $b(){let r=new WeakMap;function t(n,i){let s;return r.has(n)===!1?(s=new kd,r.set(n,[s])):i>=r.get(n).length?(s=new kd,r.get(n).push(s)):s=r.get(n)[i],s}function e(){r=new WeakMap}return{get:t,dispose:e}}function jb(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new j,color:new $t};break;case"SpotLight":e={position:new j,direction:new j,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new j,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new j,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new j,halfWidth:new j,halfHeight:new j};break}return r[t.id]=e,e}}}function Zb(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Kb=0;function Jb(r,t){return(t.castShadow?1:0)-(r.castShadow?1:0)}function Qb(r,t){const e=new jb,n=Zb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let u=0;u<9;u++)i.probe.push(new j);const s=new j,a=new ke,o=new ke;function l(u,h){let f=0,p=0,g=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let d=0,m=0,_=0,M=0,w=0,x=0,y=0,E=0;u.sort(Jb);const A=h!==!0?Math.PI:1;for(let S=0,D=u.length;S<D;S++){const R=u[S],F=R.color,$=R.intensity,I=R.distance,V=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)f+=F.r*$*A,p+=F.g*$*A,g+=F.b*$*A;else if(R.isLightProbe)for(let z=0;z<9;z++)i.probe[z].addScaledVector(R.sh.coefficients[z],$);else if(R.isDirectionalLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity*A),R.castShadow){const U=R.shadow,G=n.get(R);G.shadowBias=U.bias,G.shadowNormalBias=U.normalBias,G.shadowRadius=U.radius,G.shadowMapSize=U.mapSize,i.directionalShadow[d]=G,i.directionalShadowMap[d]=V,i.directionalShadowMatrix[d]=R.shadow.matrix,x++}i.directional[d]=z,d++}else if(R.isSpotLight){const z=e.get(R);if(z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(F).multiplyScalar($*A),z.distance=I,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,R.castShadow){const U=R.shadow,G=n.get(R);G.shadowBias=U.bias,G.shadowNormalBias=U.normalBias,G.shadowRadius=U.radius,G.shadowMapSize=U.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=V,i.spotShadowMatrix[_]=R.shadow.matrix,E++}i.spot[_]=z,_++}else if(R.isRectAreaLight){const z=e.get(R);z.color.copy(F).multiplyScalar($),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),i.rectArea[M]=z,M++}else if(R.isPointLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity*A),z.distance=R.distance,z.decay=R.decay,R.castShadow){const U=R.shadow,G=n.get(R);G.shadowBias=U.bias,G.shadowNormalBias=U.normalBias,G.shadowRadius=U.radius,G.shadowMapSize=U.mapSize,G.shadowCameraNear=U.camera.near,G.shadowCameraFar=U.camera.far,i.pointShadow[m]=G,i.pointShadowMap[m]=V,i.pointShadowMatrix[m]=R.shadow.matrix,y++}i.point[m]=z,m++}else if(R.isHemisphereLight){const z=e.get(R);z.skyColor.copy(R.color).multiplyScalar($*A),z.groundColor.copy(R.groundColor).multiplyScalar($*A),i.hemi[w]=z,w++}}M>0&&(t.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_FLOAT_1,i.rectAreaLTC2=xt.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_HALF_1,i.rectAreaLTC2=xt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=g;const v=i.hash;(v.directionalLength!==d||v.pointLength!==m||v.spotLength!==_||v.rectAreaLength!==M||v.hemiLength!==w||v.numDirectionalShadows!==x||v.numPointShadows!==y||v.numSpotShadows!==E)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=M,i.point.length=m,i.hemi.length=w,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=y,i.spotShadowMatrix.length=E,v.directionalLength=d,v.pointLength=m,v.spotLength=_,v.rectAreaLength=M,v.hemiLength=w,v.numDirectionalShadows=x,v.numPointShadows=y,v.numSpotShadows=E,i.version=Kb++)}function c(u,h){let f=0,p=0,g=0,d=0,m=0;const _=h.matrixWorldInverse;for(let M=0,w=u.length;M<w;M++){const x=u[M];if(x.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(_),f++}else if(x.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(_),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(_),g++}else if(x.isRectAreaLight){const y=i.rectArea[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(_),o.identity(),a.copy(x.matrixWorld),a.premultiply(_),o.extractRotation(a),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),d++}else if(x.isPointLight){const y=i.point[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(_),p++}else if(x.isHemisphereLight){const y=i.hemi[m];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(_),m++}}}return{setup:l,setupView:c,state:i}}function Ud(r,t){const e=new Qb(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function l(h){e.setup(n,h)}function c(h){e.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function tw(r,t){let e=new WeakMap;function n(s,a=0){let o;return e.has(s)===!1?(o=new Ud(r,t),e.set(s,[o])):a>=e.get(s).length?(o=new Ud(r,t),e.get(s).push(o)):o=e.get(s)[a],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class Ag extends Ue{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Lg extends Ue{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new j,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ew=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function iw(r,t,e){let n=new Mg;const i=new Yt,s=new Yt,a=new We,o=new Ag({depthPacking:gv}),l=new Lg,c={},u=e.maxTextureSize,h={0:ii,1:Yo,2:Qs},f=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:ew,fragmentShader:nw}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new yr;g.setAttribute("position",new Si(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const d=new ar(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sg,this.render=function(x,y,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||x.length===0)return;const A=r.getRenderTarget(),v=r.getActiveCubeFace(),S=r.getActiveMipmapLevel(),D=r.state;D.setBlending(dr),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);for(let R=0,F=x.length;R<F;R++){const $=x[R],I=$.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;i.copy(I.mapSize);const V=I.getFrameExtents();if(i.multiply(V),s.copy(I.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/V.x),i.x=s.x*V.x,I.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/V.y),i.y=s.y*V.y,I.mapSize.y=s.y)),I.map===null&&!I.isPointLightShadow&&this.type===Mo&&(I.map=new pr(i.x,i.y),I.map.texture.name=$.name+".shadowMap",I.mapPass=new pr(i.x,i.y),I.camera.updateProjectionMatrix()),I.map===null){const U={minFilter:un,magFilter:un,format:ni};I.map=new pr(i.x,i.y,U),I.map.texture.name=$.name+".shadowMap",I.camera.updateProjectionMatrix()}r.setRenderTarget(I.map),r.clear();const z=I.getViewportCount();for(let U=0;U<z;U++){const G=I.getViewport(U);a.set(s.x*G.x,s.y*G.y,s.x*G.z,s.y*G.w),D.viewport(a),I.updateMatrices($,U),n=I.getFrustum(),w(y,E,I.camera,$,this.type)}!I.isPointLightShadow&&this.type===Mo&&_(I,E),I.needsUpdate=!1}m.needsUpdate=!1,r.setRenderTarget(A,v,S)};function _(x,y){const E=t.update(d);f.defines.VSM_SAMPLES!==x.blurSamples&&(f.defines.VSM_SAMPLES=x.blurSamples,p.defines.VSM_SAMPLES=x.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),f.uniforms.shadow_pass.value=x.map.texture,f.uniforms.resolution.value=x.mapSize,f.uniforms.radius.value=x.radius,r.setRenderTarget(x.mapPass),r.clear(),r.renderBufferDirect(y,null,E,f,d,null),p.uniforms.shadow_pass.value=x.mapPass.texture,p.uniforms.resolution.value=x.mapSize,p.uniforms.radius.value=x.radius,r.setRenderTarget(x.map),r.clear(),r.renderBufferDirect(y,null,E,p,d,null)}function M(x,y,E,A,v,S){let D=null;const R=E.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(R!==void 0?D=R:D=E.isPointLight===!0?l:o,r.localClippingEnabled&&y.clipShadows===!0&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0){const F=D.uuid,$=y.uuid;let I=c[F];I===void 0&&(I={},c[F]=I);let V=I[$];V===void 0&&(V=D.clone(),I[$]=V),D=V}return D.visible=y.visible,D.wireframe=y.wireframe,S===Mo?D.side=y.shadowSide!==null?y.shadowSide:y.side:D.side=y.shadowSide!==null?y.shadowSide:h[y.side],D.alphaMap=y.alphaMap,D.alphaTest=y.alphaTest,D.clipShadows=y.clipShadows,D.clippingPlanes=y.clippingPlanes,D.clipIntersection=y.clipIntersection,D.displacementMap=y.displacementMap,D.displacementScale=y.displacementScale,D.displacementBias=y.displacementBias,D.wireframeLinewidth=y.wireframeLinewidth,D.linewidth=y.linewidth,E.isPointLight===!0&&D.isMeshDistanceMaterial===!0&&(D.referencePosition.setFromMatrixPosition(E.matrixWorld),D.nearDistance=A,D.farDistance=v),D}function w(x,y,E,A,v){if(x.visible===!1)return;if(x.layers.test(y.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&v===Mo)&&(!x.frustumCulled||n.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,x.matrixWorld);const R=t.update(x),F=x.material;if(Array.isArray(F)){const $=R.groups;for(let I=0,V=$.length;I<V;I++){const z=$[I],U=F[z.materialIndex];if(U&&U.visible){const G=M(x,U,A,E.near,E.far,v);r.renderBufferDirect(E,null,R,G,x,z)}}}else if(F.visible){const $=M(x,F,A,E.near,E.far,v);r.renderBufferDirect(E,null,R,$,x,null)}}const D=x.children;for(let R=0,F=D.length;R<F;R++)w(D[R],y,E,A,v)}}function rw(r,t,e){const n=e.isWebGL2;function i(){let O=!1;const dt=new We;let lt=null;const At=new We(0,0,0,0);return{setMask:function(mt){lt!==mt&&!O&&(r.colorMask(mt,mt,mt,mt),lt=mt)},setLocked:function(mt){O=mt},setClear:function(mt,St,tt,Lt,Ut){Ut===!0&&(mt*=Lt,St*=Lt,tt*=Lt),dt.set(mt,St,tt,Lt),At.equals(dt)===!1&&(r.clearColor(mt,St,tt,Lt),At.copy(dt))},reset:function(){O=!1,lt=null,At.set(-1,0,0,0)}}}function s(){let O=!1,dt=null,lt=null,At=null;return{setTest:function(mt){mt?q(2929):B(2929)},setMask:function(mt){dt!==mt&&!O&&(r.depthMask(mt),dt=mt)},setFunc:function(mt){if(lt!==mt){if(mt)switch(mt){case Ux:r.depthFunc(512);break;case Bx:r.depthFunc(519);break;case Vx:r.depthFunc(513);break;case Au:r.depthFunc(515);break;case Gx:r.depthFunc(514);break;case Hx:r.depthFunc(518);break;case Wx:r.depthFunc(516);break;case Xx:r.depthFunc(517);break;default:r.depthFunc(515)}else r.depthFunc(515);lt=mt}},setLocked:function(mt){O=mt},setClear:function(mt){At!==mt&&(r.clearDepth(mt),At=mt)},reset:function(){O=!1,dt=null,lt=null,At=null}}}function a(){let O=!1,dt=null,lt=null,At=null,mt=null,St=null,tt=null,Lt=null,Ut=null;return{setTest:function(Ht){O||(Ht?q(2960):B(2960))},setMask:function(Ht){dt!==Ht&&!O&&(r.stencilMask(Ht),dt=Ht)},setFunc:function(Ht,se,Me){(lt!==Ht||At!==se||mt!==Me)&&(r.stencilFunc(Ht,se,Me),lt=Ht,At=se,mt=Me)},setOp:function(Ht,se,Me){(St!==Ht||tt!==se||Lt!==Me)&&(r.stencilOp(Ht,se,Me),St=Ht,tt=se,Lt=Me)},setLocked:function(Ht){O=Ht},setClear:function(Ht){Ut!==Ht&&(r.clearStencil(Ht),Ut=Ht)},reset:function(){O=!1,dt=null,lt=null,At=null,mt=null,St=null,tt=null,Lt=null,Ut=null}}}const o=new i,l=new s,c=new a;let u={},h={},f=new WeakMap,p=[],g=null,d=!1,m=null,_=null,M=null,w=null,x=null,y=null,E=null,A=!1,v=null,S=null,D=null,R=null,F=null;const $=r.getParameter(35661);let I=!1,V=0;const z=r.getParameter(7938);z.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(z)[1]),I=V>=1):z.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),I=V>=2);let U=null,G={};const k=r.getParameter(3088),C=r.getParameter(2978),Z=new We().fromArray(k),N=new We().fromArray(C);function K(O,dt,lt){const At=new Uint8Array(4),mt=r.createTexture();r.bindTexture(O,mt),r.texParameteri(O,10241,9728),r.texParameteri(O,10240,9728);for(let St=0;St<lt;St++)r.texImage2D(dt+St,0,6408,1,1,0,6408,5121,At);return mt}const J={};J[3553]=K(3553,3553,1),J[34067]=K(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),q(2929),l.setFunc(Au),gt(!1),It(Af),q(2884),vt(dr);function q(O){u[O]!==!0&&(r.enable(O),u[O]=!0)}function B(O){u[O]!==!1&&(r.disable(O),u[O]=!1)}function at(O,dt){return h[O]!==dt?(r.bindFramebuffer(O,dt),h[O]=dt,n&&(O===36009&&(h[36160]=dt),O===36160&&(h[36009]=dt)),!0):!1}function rt(O,dt){let lt=p,At=!1;if(O)if(lt=f.get(dt),lt===void 0&&(lt=[],f.set(dt,lt)),O.isWebGLMultipleRenderTargets){const mt=O.texture;if(lt.length!==mt.length||lt[0]!==36064){for(let St=0,tt=mt.length;St<tt;St++)lt[St]=36064+St;lt.length=mt.length,At=!0}}else lt[0]!==36064&&(lt[0]=36064,At=!0);else lt[0]!==1029&&(lt[0]=1029,At=!0);At&&(e.isWebGL2?r.drawBuffers(lt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(lt))}function ct(O){return g!==O?(r.useProgram(O),g=O,!0):!1}const ot={[Cs]:32774,[Ax]:32778,[Lx]:32779};if(n)ot[Rf]=32775,ot[If]=32776;else{const O=t.get("EXT_blend_minmax");O!==null&&(ot[Rf]=O.MIN_EXT,ot[If]=O.MAX_EXT)}const yt={[Dx]:0,[Px]:1,[Rx]:768,[og]:770,[kx]:776,[Nx]:774,[Ox]:772,[Ix]:769,[ag]:771,[zx]:775,[Fx]:773};function vt(O,dt,lt,At,mt,St,tt,Lt){if(O===dr){d===!0&&(B(3042),d=!1);return}if(d===!1&&(q(3042),d=!0),O!==Cx){if(O!==m||Lt!==A){if((_!==Cs||x!==Cs)&&(r.blendEquation(32774),_=Cs,x=Cs),Lt)switch(O){case Vs:r.blendFuncSeparate(1,771,1,771);break;case Lf:r.blendFunc(1,1);break;case Df:r.blendFuncSeparate(0,769,0,1);break;case Pf:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Vs:r.blendFuncSeparate(770,771,1,771);break;case Lf:r.blendFunc(770,1);break;case Df:r.blendFuncSeparate(0,769,0,1);break;case Pf:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,w=null,y=null,E=null,m=O,A=Lt}return}mt=mt||dt,St=St||lt,tt=tt||At,(dt!==_||mt!==x)&&(r.blendEquationSeparate(ot[dt],ot[mt]),_=dt,x=mt),(lt!==M||At!==w||St!==y||tt!==E)&&(r.blendFuncSeparate(yt[lt],yt[At],yt[St],yt[tt]),M=lt,w=At,y=St,E=tt),m=O,A=null}function ht(O,dt){O.side===Qs?B(2884):q(2884);let lt=O.side===ii;dt&&(lt=!lt),gt(lt),O.blending===Vs&&O.transparent===!1?vt(dr):vt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.premultipliedAlpha),l.setFunc(O.depthFunc),l.setTest(O.depthTest),l.setMask(O.depthWrite),o.setMask(O.colorWrite);const At=O.stencilWrite;c.setTest(At),At&&(c.setMask(O.stencilWriteMask),c.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),c.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),X(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?q(32926):B(32926)}function gt(O){v!==O&&(O?r.frontFace(2304):r.frontFace(2305),v=O)}function It(O){O!==bx?(q(2884),O!==S&&(O===Af?r.cullFace(1029):O===wx?r.cullFace(1028):r.cullFace(1032))):B(2884),S=O}function Gt(O){O!==D&&(I&&r.lineWidth(O),D=O)}function X(O,dt,lt){O?(q(32823),(R!==dt||F!==lt)&&(r.polygonOffset(dt,lt),R=dt,F=lt)):B(32823)}function Ft(O){O?q(3089):B(3089)}function Ct(O){O===void 0&&(O=33984+$-1),U!==O&&(r.activeTexture(O),U=O)}function Xt(O,dt){U===null&&Ct();let lt=G[U];lt===void 0&&(lt={type:void 0,texture:void 0},G[U]=lt),(lt.type!==O||lt.texture!==dt)&&(r.bindTexture(O,dt||J[O]),lt.type=O,lt.texture=dt)}function Pt(){const O=G[U];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function P(){try{r.compressedTexImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function b(){try{r.texSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Q(){try{r.texSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{r.texStorage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ut(){try{r.texStorage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Et(){try{r.texImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function L(){try{r.texImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function nt(O){Z.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),Z.copy(O))}function pt(O){N.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),N.copy(O))}function st(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},U=null,G={},h={},f=new WeakMap,p=[],g=null,d=!1,m=null,_=null,M=null,w=null,x=null,y=null,E=null,A=!1,v=null,S=null,D=null,R=null,F=null,Z.set(0,0,r.canvas.width,r.canvas.height),N.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:q,disable:B,bindFramebuffer:at,drawBuffers:rt,useProgram:ct,setBlending:vt,setMaterial:ht,setFlipSided:gt,setCullFace:It,setLineWidth:Gt,setPolygonOffset:X,setScissorTest:Ft,activeTexture:Ct,bindTexture:Xt,unbindTexture:Pt,compressedTexImage2D:P,texImage2D:Et,texImage3D:L,texStorage2D:ft,texStorage3D:ut,texSubImage2D:b,texSubImage3D:Q,compressedTexSubImage2D:it,scissor:nt,viewport:pt,reset:st}}function sw(r,t,e,n,i,s,a){const o=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let d;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(P,b){return _?new OffscreenCanvas(P,b):bl("canvas")}function w(P,b,Q,it){let ft=1;if((P.width>it||P.height>it)&&(ft=it/Math.max(P.width,P.height)),ft<1||b===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const ut=b?Ou:Math.floor,Et=ut(ft*P.width),L=ut(ft*P.height);d===void 0&&(d=M(Et,L));const nt=Q?M(Et,L):d;return nt.width=Et,nt.height=L,nt.getContext("2d").drawImage(P,0,0,Et,L),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Et+"x"+L+")."),nt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function x(P){return od(P.width)&&od(P.height)}function y(P){return o?!1:P.wrapS!==ei||P.wrapT!==ei||P.minFilter!==un&&P.minFilter!==Un}function E(P,b){return P.generateMipmaps&&b&&P.minFilter!==un&&P.minFilter!==Un}function A(P){r.generateMipmap(P)}function v(P,b,Q,it,ft=!1){if(o===!1)return b;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ut=b;return b===6403&&(Q===5126&&(ut=33326),Q===5131&&(ut=33325),Q===5121&&(ut=33321)),b===33319&&(Q===5126&&(ut=33328),Q===5131&&(ut=33327),Q===5121&&(ut=33323)),b===6408&&(Q===5126&&(ut=34836),Q===5131&&(ut=34842),Q===5121&&(ut=it===ge&&ft===!1?35907:32856),Q===32819&&(ut=32854),Q===32820&&(ut=32855)),(ut===33325||ut===33326||ut===33327||ut===33328||ut===34842||ut===34836)&&t.get("EXT_color_buffer_float"),ut}function S(P,b,Q){return E(P,Q)===!0||P.isFramebufferTexture&&P.minFilter!==un&&P.minFilter!==Un?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function D(P){return P===un||P===Of||P===Ff?9728:9729}function R(P){const b=P.target;b.removeEventListener("dispose",R),$(b),b.isVideoTexture&&g.delete(b)}function F(P){const b=P.target;b.removeEventListener("dispose",F),V(b)}function $(P){const b=n.get(P);if(b.__webglInit===void 0)return;const Q=P.source,it=m.get(Q);if(it){const ft=it[b.__cacheKey];ft.usedTimes--,ft.usedTimes===0&&I(P),Object.keys(it).length===0&&m.delete(Q)}n.remove(P)}function I(P){const b=n.get(P);r.deleteTexture(b.__webglTexture);const Q=P.source,it=m.get(Q);delete it[b.__cacheKey],a.memory.textures--}function V(P){const b=P.texture,Q=n.get(P),it=n.get(b);if(it.__webglTexture!==void 0&&(r.deleteTexture(it.__webglTexture),a.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++)r.deleteFramebuffer(Q.__webglFramebuffer[ft]),Q.__webglDepthbuffer&&r.deleteRenderbuffer(Q.__webglDepthbuffer[ft]);else{if(r.deleteFramebuffer(Q.__webglFramebuffer),Q.__webglDepthbuffer&&r.deleteRenderbuffer(Q.__webglDepthbuffer),Q.__webglMultisampledFramebuffer&&r.deleteFramebuffer(Q.__webglMultisampledFramebuffer),Q.__webglColorRenderbuffer)for(let ft=0;ft<Q.__webglColorRenderbuffer.length;ft++)Q.__webglColorRenderbuffer[ft]&&r.deleteRenderbuffer(Q.__webglColorRenderbuffer[ft]);Q.__webglDepthRenderbuffer&&r.deleteRenderbuffer(Q.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let ft=0,ut=b.length;ft<ut;ft++){const Et=n.get(b[ft]);Et.__webglTexture&&(r.deleteTexture(Et.__webglTexture),a.memory.textures--),n.remove(b[ft])}n.remove(b),n.remove(P)}let z=0;function U(){z=0}function G(){const P=z;return P>=l&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l),z+=1,P}function k(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.encoding),b.join()}function C(P,b){const Q=n.get(P);if(P.isVideoTexture&&Xt(P),P.isRenderTargetTexture===!1&&P.version>0&&Q.__version!==P.version){const it=P.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(Q,P,b);return}}e.activeTexture(33984+b),e.bindTexture(3553,Q.__webglTexture)}function Z(P,b){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){rt(Q,P,b);return}e.activeTexture(33984+b),e.bindTexture(35866,Q.__webglTexture)}function N(P,b){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){rt(Q,P,b);return}e.activeTexture(33984+b),e.bindTexture(32879,Q.__webglTexture)}function K(P,b){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){ct(Q,P,b);return}e.activeTexture(33984+b),e.bindTexture(34067,Q.__webglTexture)}const J={[Pu]:10497,[ei]:33071,[Ru]:33648},q={[un]:9728,[Of]:9984,[Ff]:9986,[Un]:9729,[Qx]:9985,[Ul]:9987};function B(P,b,Q){if(Q?(r.texParameteri(P,10242,J[b.wrapS]),r.texParameteri(P,10243,J[b.wrapT]),(P===32879||P===35866)&&r.texParameteri(P,32882,J[b.wrapR]),r.texParameteri(P,10240,q[b.magFilter]),r.texParameteri(P,10241,q[b.minFilter])):(r.texParameteri(P,10242,33071),r.texParameteri(P,10243,33071),(P===32879||P===35866)&&r.texParameteri(P,32882,33071),(b.wrapS!==ei||b.wrapT!==ei)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,10240,D(b.magFilter)),r.texParameteri(P,10241,D(b.minFilter)),b.minFilter!==un&&b.minFilter!==Un&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){const it=t.get("EXT_texture_filter_anisotropic");if(b.type===zr&&t.has("OES_texture_float_linear")===!1||o===!1&&b.type===$o&&t.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(r.texParameterf(P,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function at(P,b){let Q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",R));const it=b.source;let ft=m.get(it);ft===void 0&&(ft={},m.set(it,ft));const ut=k(b);if(ut!==P.__cacheKey){ft[ut]===void 0&&(ft[ut]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,Q=!0),ft[ut].usedTimes++;const Et=ft[P.__cacheKey];Et!==void 0&&(ft[P.__cacheKey].usedTimes--,Et.usedTimes===0&&I(b)),P.__cacheKey=ut,P.__webglTexture=ft[ut].texture}return Q}function rt(P,b,Q){let it=3553;b.isDataArrayTexture&&(it=35866),b.isData3DTexture&&(it=32879);const ft=at(P,b),ut=b.source;if(e.activeTexture(33984+Q),e.bindTexture(it,P.__webglTexture),ut.version!==ut.__currentVersion||ft===!0){r.pixelStorei(37440,b.flipY),r.pixelStorei(37441,b.premultiplyAlpha),r.pixelStorei(3317,b.unpackAlignment),r.pixelStorei(37443,0);const Et=y(b)&&x(b.image)===!1;let L=w(b.image,Et,!1,u);L=Pt(b,L);const nt=x(L)||o,pt=s.convert(b.format,b.encoding);let st=s.convert(b.type),O=v(b.internalFormat,pt,st,b.encoding,b.isVideoTexture);B(it,b,nt);let dt;const lt=b.mipmaps,At=o&&b.isVideoTexture!==!0,mt=ut.__currentVersion===void 0||ft===!0,St=S(b,L,nt);if(b.isDepthTexture)O=6402,o?b.type===zr?O=36012:b.type===Nr?O=33190:b.type===Gs?O=35056:O=33189:b.type===zr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===Yr&&O===6402&&b.type!==cg&&b.type!==Nr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Nr,st=s.convert(b.type)),b.format===no&&O===6402&&(O=34041,b.type!==Gs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Gs,st=s.convert(b.type))),mt&&(At?e.texStorage2D(3553,1,O,L.width,L.height):e.texImage2D(3553,0,O,L.width,L.height,0,pt,st,null));else if(b.isDataTexture)if(lt.length>0&&nt){At&&mt&&e.texStorage2D(3553,St,O,lt[0].width,lt[0].height);for(let tt=0,Lt=lt.length;tt<Lt;tt++)dt=lt[tt],At?e.texSubImage2D(3553,tt,0,0,dt.width,dt.height,pt,st,dt.data):e.texImage2D(3553,tt,O,dt.width,dt.height,0,pt,st,dt.data);b.generateMipmaps=!1}else At?(mt&&e.texStorage2D(3553,St,O,L.width,L.height),e.texSubImage2D(3553,0,0,0,L.width,L.height,pt,st,L.data)):e.texImage2D(3553,0,O,L.width,L.height,0,pt,st,L.data);else if(b.isCompressedTexture){At&&mt&&e.texStorage2D(3553,St,O,lt[0].width,lt[0].height);for(let tt=0,Lt=lt.length;tt<Lt;tt++)dt=lt[tt],b.format!==ni?pt!==null?At?e.compressedTexSubImage2D(3553,tt,0,0,dt.width,dt.height,pt,dt.data):e.compressedTexImage2D(3553,tt,O,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?e.texSubImage2D(3553,tt,0,0,dt.width,dt.height,pt,st,dt.data):e.texImage2D(3553,tt,O,dt.width,dt.height,0,pt,st,dt.data)}else if(b.isDataArrayTexture)At?(mt&&e.texStorage3D(35866,St,O,L.width,L.height,L.depth),e.texSubImage3D(35866,0,0,0,0,L.width,L.height,L.depth,pt,st,L.data)):e.texImage3D(35866,0,O,L.width,L.height,L.depth,0,pt,st,L.data);else if(b.isData3DTexture)At?(mt&&e.texStorage3D(32879,St,O,L.width,L.height,L.depth),e.texSubImage3D(32879,0,0,0,0,L.width,L.height,L.depth,pt,st,L.data)):e.texImage3D(32879,0,O,L.width,L.height,L.depth,0,pt,st,L.data);else if(b.isFramebufferTexture){if(mt)if(At)e.texStorage2D(3553,St,O,L.width,L.height);else{let tt=L.width,Lt=L.height;for(let Ut=0;Ut<St;Ut++)e.texImage2D(3553,Ut,O,tt,Lt,0,pt,st,null),tt>>=1,Lt>>=1}}else if(lt.length>0&&nt){At&&mt&&e.texStorage2D(3553,St,O,lt[0].width,lt[0].height);for(let tt=0,Lt=lt.length;tt<Lt;tt++)dt=lt[tt],At?e.texSubImage2D(3553,tt,0,0,pt,st,dt):e.texImage2D(3553,tt,O,pt,st,dt);b.generateMipmaps=!1}else At?(mt&&e.texStorage2D(3553,St,O,L.width,L.height),e.texSubImage2D(3553,0,0,0,pt,st,L)):e.texImage2D(3553,0,O,pt,st,L);E(b,nt)&&A(it),ut.__currentVersion=ut.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function ct(P,b,Q){if(b.image.length!==6)return;const it=at(P,b),ft=b.source;if(e.activeTexture(33984+Q),e.bindTexture(34067,P.__webglTexture),ft.version!==ft.__currentVersion||it===!0){r.pixelStorei(37440,b.flipY),r.pixelStorei(37441,b.premultiplyAlpha),r.pixelStorei(3317,b.unpackAlignment),r.pixelStorei(37443,0);const ut=b.isCompressedTexture||b.image[0].isCompressedTexture,Et=b.image[0]&&b.image[0].isDataTexture,L=[];for(let tt=0;tt<6;tt++)!ut&&!Et?L[tt]=w(b.image[tt],!1,!0,c):L[tt]=Et?b.image[tt].image:b.image[tt],L[tt]=Pt(b,L[tt]);const nt=L[0],pt=x(nt)||o,st=s.convert(b.format,b.encoding),O=s.convert(b.type),dt=v(b.internalFormat,st,O,b.encoding),lt=o&&b.isVideoTexture!==!0,At=ft.__currentVersion===void 0||it===!0;let mt=S(b,nt,pt);B(34067,b,pt);let St;if(ut){lt&&At&&e.texStorage2D(34067,mt,dt,nt.width,nt.height);for(let tt=0;tt<6;tt++){St=L[tt].mipmaps;for(let Lt=0;Lt<St.length;Lt++){const Ut=St[Lt];b.format!==ni?st!==null?lt?e.compressedTexSubImage2D(34069+tt,Lt,0,0,Ut.width,Ut.height,st,Ut.data):e.compressedTexImage2D(34069+tt,Lt,dt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?e.texSubImage2D(34069+tt,Lt,0,0,Ut.width,Ut.height,st,O,Ut.data):e.texImage2D(34069+tt,Lt,dt,Ut.width,Ut.height,0,st,O,Ut.data)}}}else{St=b.mipmaps,lt&&At&&(St.length>0&&mt++,e.texStorage2D(34067,mt,dt,L[0].width,L[0].height));for(let tt=0;tt<6;tt++)if(Et){lt?e.texSubImage2D(34069+tt,0,0,0,L[tt].width,L[tt].height,st,O,L[tt].data):e.texImage2D(34069+tt,0,dt,L[tt].width,L[tt].height,0,st,O,L[tt].data);for(let Lt=0;Lt<St.length;Lt++){const Ht=St[Lt].image[tt].image;lt?e.texSubImage2D(34069+tt,Lt+1,0,0,Ht.width,Ht.height,st,O,Ht.data):e.texImage2D(34069+tt,Lt+1,dt,Ht.width,Ht.height,0,st,O,Ht.data)}}else{lt?e.texSubImage2D(34069+tt,0,0,0,st,O,L[tt]):e.texImage2D(34069+tt,0,dt,st,O,L[tt]);for(let Lt=0;Lt<St.length;Lt++){const Ut=St[Lt];lt?e.texSubImage2D(34069+tt,Lt+1,0,0,st,O,Ut.image[tt]):e.texImage2D(34069+tt,Lt+1,dt,st,O,Ut.image[tt])}}}E(b,pt)&&A(34067),ft.__currentVersion=ft.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function ot(P,b,Q,it,ft){const ut=s.convert(Q.format,Q.encoding),Et=s.convert(Q.type),L=v(Q.internalFormat,ut,Et,Q.encoding);n.get(b).__hasExternalTextures||(ft===32879||ft===35866?e.texImage3D(ft,0,L,b.width,b.height,b.depth,0,ut,Et,null):e.texImage2D(ft,0,L,b.width,b.height,0,ut,Et,null)),e.bindFramebuffer(36160,P),Ct(b)?f.framebufferTexture2DMultisampleEXT(36160,it,ft,n.get(Q).__webglTexture,0,Ft(b)):r.framebufferTexture2D(36160,it,ft,n.get(Q).__webglTexture,0),e.bindFramebuffer(36160,null)}function yt(P,b,Q){if(r.bindRenderbuffer(36161,P),b.depthBuffer&&!b.stencilBuffer){let it=33189;if(Q||Ct(b)){const ft=b.depthTexture;ft&&ft.isDepthTexture&&(ft.type===zr?it=36012:ft.type===Nr&&(it=33190));const ut=Ft(b);Ct(b)?f.renderbufferStorageMultisampleEXT(36161,ut,it,b.width,b.height):r.renderbufferStorageMultisample(36161,ut,it,b.width,b.height)}else r.renderbufferStorage(36161,it,b.width,b.height);r.framebufferRenderbuffer(36160,36096,36161,P)}else if(b.depthBuffer&&b.stencilBuffer){const it=Ft(b);Q&&Ct(b)===!1?r.renderbufferStorageMultisample(36161,it,35056,b.width,b.height):Ct(b)?f.renderbufferStorageMultisampleEXT(36161,it,35056,b.width,b.height):r.renderbufferStorage(36161,34041,b.width,b.height),r.framebufferRenderbuffer(36160,33306,36161,P)}else{const it=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ft=0;ft<it.length;ft++){const ut=it[ft],Et=s.convert(ut.format,ut.encoding),L=s.convert(ut.type),nt=v(ut.internalFormat,Et,L,ut.encoding),pt=Ft(b);Q&&Ct(b)===!1?r.renderbufferStorageMultisample(36161,pt,nt,b.width,b.height):Ct(b)?f.renderbufferStorageMultisampleEXT(36161,pt,nt,b.width,b.height):r.renderbufferStorage(36161,nt,b.width,b.height)}}r.bindRenderbuffer(36161,null)}function vt(P,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),C(b.depthTexture,0);const it=n.get(b.depthTexture).__webglTexture,ft=Ft(b);if(b.depthTexture.format===Yr)Ct(b)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,it,0,ft):r.framebufferTexture2D(36160,36096,3553,it,0);else if(b.depthTexture.format===no)Ct(b)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,it,0,ft):r.framebufferTexture2D(36160,33306,3553,it,0);else throw new Error("Unknown depthTexture format")}function ht(P){const b=n.get(P),Q=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!b.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");vt(b.__webglFramebuffer,P)}else if(Q){b.__webglDepthbuffer=[];for(let it=0;it<6;it++)e.bindFramebuffer(36160,b.__webglFramebuffer[it]),b.__webglDepthbuffer[it]=r.createRenderbuffer(),yt(b.__webglDepthbuffer[it],P,!1)}else e.bindFramebuffer(36160,b.__webglFramebuffer),b.__webglDepthbuffer=r.createRenderbuffer(),yt(b.__webglDepthbuffer,P,!1);e.bindFramebuffer(36160,null)}function gt(P,b,Q){const it=n.get(P);b!==void 0&&ot(it.__webglFramebuffer,P,P.texture,36064,3553),Q!==void 0&&ht(P)}function It(P){const b=P.texture,Q=n.get(P),it=n.get(b);P.addEventListener("dispose",F),P.isWebGLMultipleRenderTargets!==!0&&(it.__webglTexture===void 0&&(it.__webglTexture=r.createTexture()),it.__version=b.version,a.memory.textures++);const ft=P.isWebGLCubeRenderTarget===!0,ut=P.isWebGLMultipleRenderTargets===!0,Et=x(P)||o;if(ft){Q.__webglFramebuffer=[];for(let L=0;L<6;L++)Q.__webglFramebuffer[L]=r.createFramebuffer()}else{if(Q.__webglFramebuffer=r.createFramebuffer(),ut)if(i.drawBuffers){const L=P.texture;for(let nt=0,pt=L.length;nt<pt;nt++){const st=n.get(L[nt]);st.__webglTexture===void 0&&(st.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&P.samples>0&&Ct(P)===!1){const L=ut?b:[b];Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,Q.__webglMultisampledFramebuffer);for(let nt=0;nt<L.length;nt++){const pt=L[nt];Q.__webglColorRenderbuffer[nt]=r.createRenderbuffer(),r.bindRenderbuffer(36161,Q.__webglColorRenderbuffer[nt]);const st=s.convert(pt.format,pt.encoding),O=s.convert(pt.type),dt=v(pt.internalFormat,st,O,pt.encoding),lt=Ft(P);r.renderbufferStorageMultisample(36161,lt,dt,P.width,P.height),r.framebufferRenderbuffer(36160,36064+nt,36161,Q.__webglColorRenderbuffer[nt])}r.bindRenderbuffer(36161,null),P.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),yt(Q.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(36160,null)}}if(ft){e.bindTexture(34067,it.__webglTexture),B(34067,b,Et);for(let L=0;L<6;L++)ot(Q.__webglFramebuffer[L],P,b,36064,34069+L);E(b,Et)&&A(34067),e.unbindTexture()}else if(ut){const L=P.texture;for(let nt=0,pt=L.length;nt<pt;nt++){const st=L[nt],O=n.get(st);e.bindTexture(3553,O.__webglTexture),B(3553,st,Et),ot(Q.__webglFramebuffer,P,st,36064+nt,3553),E(st,Et)&&A(3553)}e.unbindTexture()}else{let L=3553;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(o?L=P.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(L,it.__webglTexture),B(L,b,Et),ot(Q.__webglFramebuffer,P,b,36064,L),E(b,Et)&&A(L),e.unbindTexture()}P.depthBuffer&&ht(P)}function Gt(P){const b=x(P)||o,Q=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let it=0,ft=Q.length;it<ft;it++){const ut=Q[it];if(E(ut,b)){const Et=P.isWebGLCubeRenderTarget?34067:3553,L=n.get(ut).__webglTexture;e.bindTexture(Et,L),A(Et),e.unbindTexture()}}}function X(P){if(o&&P.samples>0&&Ct(P)===!1){const b=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],Q=P.width,it=P.height;let ft=16384;const ut=[],Et=P.stencilBuffer?33306:36096,L=n.get(P),nt=P.isWebGLMultipleRenderTargets===!0;if(nt)for(let pt=0;pt<b.length;pt++)e.bindFramebuffer(36160,L.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+pt,36161,null),e.bindFramebuffer(36160,L.__webglFramebuffer),r.framebufferTexture2D(36009,36064+pt,3553,null,0);e.bindFramebuffer(36008,L.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,L.__webglFramebuffer);for(let pt=0;pt<b.length;pt++){ut.push(36064+pt),P.depthBuffer&&ut.push(Et);const st=L.__ignoreDepthValues!==void 0?L.__ignoreDepthValues:!1;if(st===!1&&(P.depthBuffer&&(ft|=256),P.stencilBuffer&&(ft|=1024)),nt&&r.framebufferRenderbuffer(36008,36064,36161,L.__webglColorRenderbuffer[pt]),st===!0&&(r.invalidateFramebuffer(36008,[Et]),r.invalidateFramebuffer(36009,[Et])),nt){const O=n.get(b[pt]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,O,0)}r.blitFramebuffer(0,0,Q,it,0,0,Q,it,ft,9728),p&&r.invalidateFramebuffer(36008,ut)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),nt)for(let pt=0;pt<b.length;pt++){e.bindFramebuffer(36160,L.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+pt,36161,L.__webglColorRenderbuffer[pt]);const st=n.get(b[pt]).__webglTexture;e.bindFramebuffer(36160,L.__webglFramebuffer),r.framebufferTexture2D(36009,36064+pt,3553,st,0)}e.bindFramebuffer(36009,L.__webglMultisampledFramebuffer)}}function Ft(P){return Math.min(h,P.samples)}function Ct(P){const b=n.get(P);return o&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Xt(P){const b=a.render.frame;g.get(P)!==b&&(g.set(P,b),P.update())}function Pt(P,b){const Q=P.encoding,it=P.format,ft=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Iu||Q!==ns&&(Q===ge?o===!1?t.has("EXT_sRGB")===!0&&it===ni?(P.format=Iu,P.minFilter=Un,P.generateMipmaps=!1):b=fg.sRGBToLinear(b):(it!==ni||ft!==es)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",Q)),b}this.allocateTextureUnit=G,this.resetTextureUnits=U,this.setTexture2D=C,this.setTexture2DArray=Z,this.setTexture3D=N,this.setTextureCube=K,this.rebindTextures=gt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Ct}function ow(r,t,e){const n=e.isWebGL2;function i(s,a=null){let o;if(s===es)return 5121;if(s===iv)return 32819;if(s===rv)return 32820;if(s===tv)return 5120;if(s===ev)return 5122;if(s===cg)return 5123;if(s===nv)return 5124;if(s===Nr)return 5125;if(s===zr)return 5126;if(s===$o)return n?5131:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===sv)return 6406;if(s===ni)return 6408;if(s===av)return 6409;if(s===lv)return 6410;if(s===Yr)return 6402;if(s===no)return 34041;if(s===cv)return 6403;if(s===ov)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===Iu)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===uv)return 36244;if(s===hv)return 33319;if(s===fv)return 33320;if(s===dv)return 36249;if(s===lc||s===cc||s===uc||s===hc)if(a===ge)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===lc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===cc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===uc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===hc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===lc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===cc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===uc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===hc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Nf||s===zf||s===kf||s===Uf)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Nf)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===zf)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===kf)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Uf)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===pv)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Bf||s===Vf)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Bf)return a===ge?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Vf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Gf||s===Hf||s===Wf||s===Xf||s===qf||s===Yf||s===$f||s===jf||s===Zf||s===Kf||s===Jf||s===Qf||s===td||s===ed)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Gf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Hf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Wf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Xf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===qf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Yf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===$f)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===jf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Zf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Kf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Jf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Qf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===td)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ed)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===nd)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===nd)return a===ge?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===Gs?n?34042:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class aw extends ti{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ka extends Wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lw={type:"move"};class Bc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ka,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ka,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ka,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred")if(o!==null&&(i=e.getPose(t.targetRaySpace,n),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lw))),c&&t.hand){a=!0;for(const d of t.hand.values()){const m=e.getJointPose(d,n);if(c.joints[d.jointName]===void 0){const M=new ka;M.matrixAutoUpdate=!1,M.visible=!1,c.joints[d.jointName]=M,c.add(M)}const _=c.joints[d.jointName];m!==null&&(_.matrix.fromArray(m.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=m.radius),_.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}}class cw extends si{constructor(t,e,n,i,s,a,o,l,c,u){if(u=u!==void 0?u:Yr,u!==Yr&&u!==no)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Yr&&(n=Nr),n===void 0&&u===no&&(n=Gs),super(null,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:un,this.minFilter=l!==void 0?l:un,this.flipY=!1,this.generateMipmaps=!1}}class uw extends ss{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=null,c=null,u=null,h=null,f=null,p=null;const g=e.getContextAttributes();let d=null,m=null;const _=[],M=new Map,w=new ti;w.layers.enable(1),w.viewport=new We;const x=new ti;x.layers.enable(2),x.viewport=new We;const y=[w,x],E=new aw;E.layers.enable(1),E.layers.enable(2);let A=null,v=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let C=_[k];return C===void 0&&(C=new Bc,_[k]=C),C.getTargetRaySpace()},this.getControllerGrip=function(k){let C=_[k];return C===void 0&&(C=new Bc,_[k]=C),C.getGripSpace()},this.getHand=function(k){let C=_[k];return C===void 0&&(C=new Bc,_[k]=C),C.getHandSpace()};function S(k){const C=M.get(k.inputSource);C!==void 0&&C.dispatchEvent({type:k.type,data:k.inputSource})}function D(){i.removeEventListener("select",S),i.removeEventListener("selectstart",S),i.removeEventListener("selectend",S),i.removeEventListener("squeeze",S),i.removeEventListener("squeezestart",S),i.removeEventListener("squeezeend",S),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",R),M.forEach(function(k,C){k!==void 0&&k.disconnect(C)}),M.clear(),A=null,v=null,t.setRenderTarget(d),f=null,h=null,u=null,i=null,m=null,G.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(k){if(i=k,i!==null){if(d=t.getRenderTarget(),i.addEventListener("select",S),i.addEventListener("selectstart",S),i.addEventListener("selectend",S),i.addEventListener("squeeze",S),i.addEventListener("squeezestart",S),i.addEventListener("squeezeend",S),i.addEventListener("end",D),i.addEventListener("inputsourceschange",R),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const C={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,C),i.updateRenderState({baseLayer:f}),m=new pr(f.framebufferWidth,f.framebufferHeight,{format:ni,type:es,encoding:t.outputEncoding})}else{let C=null,Z=null,N=null;g.depth&&(N=g.stencil?35056:33190,C=g.stencil?no:Yr,Z=g.stencil?Gs:Nr);const K={colorFormat:t.outputEncoding===ge?35907:32856,depthFormat:N,scaleFactor:s};u=new XRWebGLBinding(i,e),h=u.createProjectionLayer(K),i.updateRenderState({layers:[h]}),m=new pr(h.textureWidth,h.textureHeight,{format:ni,type:es,depthTexture:new cw(h.textureWidth,h.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,C),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});const J=t.properties.get(m);J.__ignoreDepthValues=h.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(1),l=null,a=await i.requestReferenceSpace(o),G.setContext(i),G.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function R(k){const C=i.inputSources;for(let Z=0;Z<C.length;Z++){const N=C[Z].handedness==="right"?1:0;M.set(C[Z],_[N])}for(let Z=0;Z<k.removed.length;Z++){const N=k.removed[Z],K=M.get(N);K&&(K.dispatchEvent({type:"disconnected",data:N}),M.delete(N))}for(let Z=0;Z<k.added.length;Z++){const N=k.added[Z],K=M.get(N);K&&K.dispatchEvent({type:"connected",data:N})}}const F=new j,$=new j;function I(k,C,Z){F.setFromMatrixPosition(C.matrixWorld),$.setFromMatrixPosition(Z.matrixWorld);const N=F.distanceTo($),K=C.projectionMatrix.elements,J=Z.projectionMatrix.elements,q=K[14]/(K[10]-1),B=K[14]/(K[10]+1),at=(K[9]+1)/K[5],rt=(K[9]-1)/K[5],ct=(K[8]-1)/K[0],ot=(J[8]+1)/J[0],yt=q*ct,vt=q*ot,ht=N/(-ct+ot),gt=ht*-ct;C.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(gt),k.translateZ(ht),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const It=q+ht,Gt=B+ht,X=yt-gt,Ft=vt+(N-gt),Ct=at*B/Gt*It,Xt=rt*B/Gt*It;k.projectionMatrix.makePerspective(X,Ft,Ct,Xt,It,Gt)}function V(k,C){C===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(C.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(i===null)return;E.near=x.near=w.near=k.near,E.far=x.far=w.far=k.far,(A!==E.near||v!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),A=E.near,v=E.far);const C=k.parent,Z=E.cameras;V(E,C);for(let K=0;K<Z.length;K++)V(Z[K],C);E.matrixWorld.decompose(E.position,E.quaternion,E.scale),k.position.copy(E.position),k.quaternion.copy(E.quaternion),k.scale.copy(E.scale),k.matrix.copy(E.matrix),k.matrixWorld.copy(E.matrixWorld);const N=k.children;for(let K=0,J=N.length;K<J;K++)N[K].updateMatrixWorld(!0);Z.length===2?I(E,w,x):E.projectionMatrix.copy(w.projectionMatrix)},this.getCamera=function(){return E},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(k){h!==null&&(h.fixedFoveation=k),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=k)};let z=null;function U(k,C){if(c=C.getViewerPose(l||a),p=C,c!==null){const N=c.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let K=!1;N.length!==E.cameras.length&&(E.cameras.length=0,K=!0);for(let J=0;J<N.length;J++){const q=N[J];let B=null;if(f!==null)B=f.getViewport(q);else{const rt=u.getViewSubImage(h,q);B=rt.viewport,J===0&&(t.setRenderTargetTextures(m,rt.colorTexture,h.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(m))}let at=y[J];at===void 0&&(at=new ti,at.layers.enable(J),at.viewport=new We,y[J]=at),at.matrix.fromArray(q.transform.matrix),at.projectionMatrix.fromArray(q.projectionMatrix),at.viewport.set(B.x,B.y,B.width,B.height),J===0&&E.matrix.copy(at.matrix),K===!0&&E.cameras.push(at)}}const Z=i.inputSources;for(let N=0;N<_.length;N++){const K=Z[N],J=M.get(K);J!==void 0&&J.update(K,C,l||a)}z&&z(k,C),p=null}const G=new Sg;G.setAnimationLoop(U),this.setAnimationLoop=function(k){z=k},this.dispose=function(){}}}function hw(r,t){function e(d,m){d.fogColor.value.copy(m.color),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function n(d,m,_,M,w){m.isMeshBasicMaterial||m.isMeshLambertMaterial?i(d,m):m.isMeshToonMaterial?(i(d,m),u(d,m)):m.isMeshPhongMaterial?(i(d,m),c(d,m)):m.isMeshStandardMaterial?(i(d,m),h(d,m),m.isMeshPhysicalMaterial&&f(d,m,w)):m.isMeshMatcapMaterial?(i(d,m),p(d,m)):m.isMeshDepthMaterial?i(d,m):m.isMeshDistanceMaterial?(i(d,m),g(d,m)):m.isMeshNormalMaterial?i(d,m):m.isLineBasicMaterial?(s(d,m),m.isLineDashedMaterial&&a(d,m)):m.isPointsMaterial?o(d,m,_,M):m.isSpriteMaterial?l(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function i(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map),m.alphaMap&&(d.alphaMap.value=m.alphaMap),m.bumpMap&&(d.bumpMap.value=m.bumpMap,d.bumpScale.value=m.bumpScale,m.side===ii&&(d.bumpScale.value*=-1)),m.displacementMap&&(d.displacementMap.value=m.displacementMap,d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap),m.normalMap&&(d.normalMap.value=m.normalMap,d.normalScale.value.copy(m.normalScale),m.side===ii&&d.normalScale.value.negate()),m.specularMap&&(d.specularMap.value=m.specularMap),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const _=t.get(m).envMap;if(_&&(d.envMap.value=_,d.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap){d.lightMap.value=m.lightMap;const x=r.physicallyCorrectLights!==!0?Math.PI:1;d.lightMapIntensity.value=m.lightMapIntensity*x}m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity);let M;m.map?M=m.map:m.specularMap?M=m.specularMap:m.displacementMap?M=m.displacementMap:m.normalMap?M=m.normalMap:m.bumpMap?M=m.bumpMap:m.roughnessMap?M=m.roughnessMap:m.metalnessMap?M=m.metalnessMap:m.alphaMap?M=m.alphaMap:m.emissiveMap?M=m.emissiveMap:m.clearcoatMap?M=m.clearcoatMap:m.clearcoatNormalMap?M=m.clearcoatNormalMap:m.clearcoatRoughnessMap?M=m.clearcoatRoughnessMap:m.iridescenceMap?M=m.iridescenceMap:m.iridescenceThicknessMap?M=m.iridescenceThicknessMap:m.specularIntensityMap?M=m.specularIntensityMap:m.specularColorMap?M=m.specularColorMap:m.transmissionMap?M=m.transmissionMap:m.thicknessMap?M=m.thicknessMap:m.sheenColorMap?M=m.sheenColorMap:m.sheenRoughnessMap&&(M=m.sheenRoughnessMap),M!==void 0&&(M.isWebGLRenderTarget&&(M=M.texture),M.matrixAutoUpdate===!0&&M.updateMatrix(),d.uvTransform.value.copy(M.matrix));let w;m.aoMap?w=m.aoMap:m.lightMap&&(w=m.lightMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),d.uv2Transform.value.copy(w.matrix))}function s(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity}function a(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function o(d,m,_,M){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*_,d.scale.value=M*.5,m.map&&(d.map.value=m.map),m.alphaMap&&(d.alphaMap.value=m.alphaMap),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);let w;m.map?w=m.map:m.alphaMap&&(w=m.alphaMap),w!==void 0&&(w.matrixAutoUpdate===!0&&w.updateMatrix(),d.uvTransform.value.copy(w.matrix))}function l(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map),m.alphaMap&&(d.alphaMap.value=m.alphaMap),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);let _;m.map?_=m.map:m.alphaMap&&(_=m.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),d.uvTransform.value.copy(_.matrix))}function c(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function u(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function h(d,m){d.roughness.value=m.roughness,d.metalness.value=m.metalness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap),m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap),t.get(m).envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function f(d,m,_){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap)),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap),m.clearcoatNormalMap&&(d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),d.clearcoatNormalMap.value=m.clearcoatNormalMap,m.side===ii&&d.clearcoatNormalScale.value.negate())),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap)),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=_.texture,d.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap)}function p(d,m){m.matcap&&(d.matcap.value=m.matcap)}function g(d,m){d.referencePosition.value.copy(m.referencePosition),d.nearDistance.value=m.nearDistance,d.farDistance.value=m.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function fw(){const r=bl("canvas");return r.style.display="block",r}function dw(r={}){this.isWebGLRenderer=!0;const t=r.canvas!==void 0?r.canvas:fw(),e=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,a=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,o=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let u;e!==null?u=e.getContextAttributes().alpha:u=r.alpha!==void 0?r.alpha:!1;let h=null,f=null;const p=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=ns,this.physicallyCorrectLights=!1,this.toneMapping=Vi,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});const d=this;let m=!1,_=0,M=0,w=null,x=-1,y=null;const E=new We,A=new We;let v=null,S=t.width,D=t.height,R=1,F=null,$=null;const I=new We(0,0,S,D),V=new We(0,0,S,D);let z=!1;const U=new Mg;let G=!1,k=!1,C=null;const Z=new ke,N=new Yt,K=new j,J={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function q(){return w===null?R:1}let B=e;function at(T,H){for(let W=0;W<T.length;W++){const Y=T[W],et=t.getContext(Y,H);if(et!==null)return et}return null}try{const T={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:a,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mh}`),t.addEventListener("webglcontextlost",O,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",lt,!1),B===null){const H=["webgl2","webgl","experimental-webgl"];if(d.isWebGL1Renderer===!0&&H.shift(),B=at(H,T),B===null)throw at(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let rt,ct,ot,yt,vt,ht,gt,It,Gt,X,Ft,Ct,Xt,Pt,P,b,Q,it,ft,ut,Et,L,nt;function pt(){rt=new TS(B),ct=new xS(B,rt,r),rt.init(ct),L=new ow(B,rt,ct),ot=new rw(B,rt,ct),yt=new AS,vt=new qb,ht=new sw(B,rt,ot,vt,ct,L,yt),gt=new yS(d),It=new wS(d),Gt=new Uv(B,ct),nt=new gS(B,rt,Gt,ct),X=new ES(B,Gt,yt,nt),Ft=new RS(B,X,Gt,yt),ft=new PS(B,ct,ht),b=new vS(vt),Ct=new Xb(d,gt,It,rt,ct,nt,b),Xt=new hw(d,vt),Pt=new $b,P=new tw(rt,ct),it=new mS(d,gt,ot,Ft,u,a),Q=new iw(d,Ft,ct),ut=new _S(B,rt,yt,ct),Et=new CS(B,rt,yt,ct),yt.programs=Ct.programs,d.capabilities=ct,d.extensions=rt,d.properties=vt,d.renderLists=Pt,d.shadowMap=Q,d.state=ot,d.info=yt}pt();const st=new uw(d,B);this.xr=st,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const T=rt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=rt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(T){T!==void 0&&(R=T,this.setSize(S,D,!1))},this.getSize=function(T){return T.set(S,D)},this.setSize=function(T,H,W){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}S=T,D=H,t.width=Math.floor(T*R),t.height=Math.floor(H*R),W!==!1&&(t.style.width=T+"px",t.style.height=H+"px"),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(S*R,D*R).floor()},this.setDrawingBufferSize=function(T,H,W){S=T,D=H,R=W,t.width=Math.floor(T*W),t.height=Math.floor(H*W),this.setViewport(0,0,T,H)},this.getCurrentViewport=function(T){return T.copy(E)},this.getViewport=function(T){return T.copy(I)},this.setViewport=function(T,H,W,Y){T.isVector4?I.set(T.x,T.y,T.z,T.w):I.set(T,H,W,Y),ot.viewport(E.copy(I).multiplyScalar(R).floor())},this.getScissor=function(T){return T.copy(V)},this.setScissor=function(T,H,W,Y){T.isVector4?V.set(T.x,T.y,T.z,T.w):V.set(T,H,W,Y),ot.scissor(A.copy(V).multiplyScalar(R).floor())},this.getScissorTest=function(){return z},this.setScissorTest=function(T){ot.setScissorTest(z=T)},this.setOpaqueSort=function(T){F=T},this.setTransparentSort=function(T){$=T},this.getClearColor=function(T){return T.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor.apply(it,arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha.apply(it,arguments)},this.clear=function(T=!0,H=!0,W=!0){let Y=0;T&&(Y|=16384),H&&(Y|=256),W&&(Y|=1024),B.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",O,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",lt,!1),Pt.dispose(),P.dispose(),vt.dispose(),gt.dispose(),It.dispose(),Ft.dispose(),nt.dispose(),Ct.dispose(),st.dispose(),st.removeEventListener("sessionstart",Ut),st.removeEventListener("sessionend",Ht),C&&(C.dispose(),C=null),se.stop()};function O(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),m=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),m=!1;const T=yt.autoReset,H=Q.enabled,W=Q.autoUpdate,Y=Q.needsUpdate,et=Q.type;pt(),yt.autoReset=T,Q.enabled=H,Q.autoUpdate=W,Q.needsUpdate=Y,Q.type=et}function lt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function At(T){const H=T.target;H.removeEventListener("dispose",At),mt(H)}function mt(T){St(T),vt.remove(T)}function St(T){const H=vt.get(T).programs;H!==void 0&&(H.forEach(function(W){Ct.releaseProgram(W)}),T.isShaderMaterial&&Ct.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,W,Y,et,Mt){H===null&&(H=J);const bt=et.isMesh&&et.matrixWorld.determinant()<0,wt=_t(T,H,W,Y,et);ot.setMaterial(Y,bt);let Nt=W.index;const Ot=W.attributes.position;if(Nt===null){if(Ot===void 0||Ot.count===0)return}else if(Nt.count===0)return;let Bt=1;Y.wireframe===!0&&(Nt=X.getWireframeAttribute(W),Bt=2),nt.setup(et,Y,wt,W,Nt);let qt,jt=ut;Nt!==null&&(qt=Gt.get(Nt),jt=Et,jt.setIndex(qt));const ue=Nt!==null?Nt.count:Ot.count,pe=W.drawRange.start*Bt,on=W.drawRange.count*Bt,Ye=Mt!==null?Mt.start*Bt:0,Vt=Mt!==null?Mt.count*Bt:1/0,le=Math.max(pe,Ye),re=Math.min(ue,pe+on,Ye+Vt)-1,an=Math.max(0,re-le+1);if(an!==0){if(et.isMesh)Y.wireframe===!0?(ot.setLineWidth(Y.wireframeLinewidth*q()),jt.setMode(1)):jt.setMode(4);else if(et.isLine){let qn=Y.linewidth;qn===void 0&&(qn=1),ot.setLineWidth(qn*q()),et.isLineSegments?jt.setMode(1):et.isLineLoop?jt.setMode(2):jt.setMode(3)}else et.isPoints?jt.setMode(0):et.isSprite&&jt.setMode(4);if(et.isInstancedMesh)jt.renderInstances(le,an,et.count);else if(W.isInstancedBufferGeometry){const qn=Math.min(W.instanceCount,W._maxInstanceCount);jt.renderInstances(le,an,qn)}else jt.render(le,an)}},this.compile=function(T,H){f=P.get(T),f.init(),g.push(f),T.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(f.pushLight(W),W.castShadow&&f.pushShadow(W))}),f.setupLights(d.physicallyCorrectLights),T.traverse(function(W){const Y=W.material;if(Y)if(Array.isArray(Y))for(let et=0;et<Y.length;et++){const Mt=Y[et];Dt(Mt,T,W)}else Dt(Y,T,W)}),g.pop(),f=null};let tt=null;function Lt(T){tt&&tt(T)}function Ut(){se.stop()}function Ht(){se.start()}const se=new Sg;se.setAnimationLoop(Lt),typeof self<"u"&&se.setContext(self),this.setAnimationLoop=function(T){tt=T,st.setAnimationLoop(T),T===null?se.stop():se.start()},st.addEventListener("sessionstart",Ut),st.addEventListener("sessionend",Ht),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(m===!0)return;T.autoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(H),H=st.getCamera()),T.isScene===!0&&T.onBeforeRender(d,T,H,w),f=P.get(T,g.length),f.init(),g.push(f),Z.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),U.setFromProjectionMatrix(Z),k=this.localClippingEnabled,G=b.init(this.clippingPlanes,k,H),h=Pt.get(T,p.length),h.init(),p.push(h),Me(T,H,0,d.sortObjects),h.finish(),d.sortObjects===!0&&h.sort(F,$),G===!0&&b.beginShadows();const W=f.state.shadowsArray;if(Q.render(W,T,H),G===!0&&b.endShadows(),this.info.autoReset===!0&&this.info.reset(),it.render(h,T),f.setupLights(d.physicallyCorrectLights),H.isArrayCamera){const Y=H.cameras;for(let et=0,Mt=Y.length;et<Mt;et++){const bt=Y[et];Xn(h,T,bt,bt.viewport)}}else Xn(h,T,H);w!==null&&(ht.updateMultisampleRenderTarget(w),ht.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(d,T,H),nt.resetDefaultState(),x=-1,y=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,p.pop(),p.length>0?h=p[p.length-1]:h=null};function Me(T,H,W,Y){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||U.intersectsSprite(T)){Y&&K.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Z);const bt=Ft.update(T),wt=T.material;wt.visible&&h.push(T,bt,wt,W,K.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(T.isSkinnedMesh&&T.skeleton.frame!==yt.render.frame&&(T.skeleton.update(),T.skeleton.frame=yt.render.frame),!T.frustumCulled||U.intersectsObject(T))){Y&&K.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Z);const bt=Ft.update(T),wt=T.material;if(Array.isArray(wt)){const Nt=bt.groups;for(let Ot=0,Bt=Nt.length;Ot<Bt;Ot++){const qt=Nt[Ot],jt=wt[qt.materialIndex];jt&&jt.visible&&h.push(T,bt,jt,W,K.z,qt)}}else wt.visible&&h.push(T,bt,wt,W,K.z,null)}}const Mt=T.children;for(let bt=0,wt=Mt.length;bt<wt;bt++)Me(Mt[bt],H,W,Y)}function Xn(T,H,W,Y){const et=T.opaque,Mt=T.transmissive,bt=T.transparent;f.setupLightsView(W),Mt.length>0&&_n(et,H,W),Y&&ot.viewport(E.copy(Y)),et.length>0&&xn(et,H,W),Mt.length>0&&xn(Mt,H,W),bt.length>0&&xn(bt,H,W),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function _n(T,H,W){const Y=ct.isWebGL2;C===null&&(C=new pr(1,1,{generateMipmaps:!0,type:rt.has("EXT_color_buffer_half_float")?$o:es,minFilter:Ul,samples:Y&&s===!0?4:0})),d.getDrawingBufferSize(N),Y?C.setSize(N.x,N.y):C.setSize(Ou(N.x),Ou(N.y));const et=d.getRenderTarget();d.setRenderTarget(C),d.clear();const Mt=d.toneMapping;d.toneMapping=Vi,xn(T,H,W),d.toneMapping=Mt,ht.updateMultisampleRenderTarget(C),ht.updateRenderTargetMipmap(C),d.setRenderTarget(et)}function xn(T,H,W){const Y=H.isScene===!0?H.overrideMaterial:null;for(let et=0,Mt=T.length;et<Mt;et++){const bt=T[et],wt=bt.object,Nt=bt.geometry,Ot=Y===null?bt.material:Y,Bt=bt.group;wt.layers.test(W.layers)&&zt(wt,H,W,Nt,Ot,Bt)}}function zt(T,H,W,Y,et,Mt){T.onBeforeRender(d,H,W,Y,et,Mt),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),et.onBeforeRender(d,H,W,Y,T,Mt),et.transparent===!0&&et.side===Qs?(et.side=ii,et.needsUpdate=!0,d.renderBufferDirect(W,H,Y,et,T,Mt),et.side=Yo,et.needsUpdate=!0,d.renderBufferDirect(W,H,Y,et,T,Mt),et.side=Qs):d.renderBufferDirect(W,H,Y,et,T,Mt),T.onAfterRender(d,H,W,Y,et,Mt)}function Dt(T,H,W){H.isScene!==!0&&(H=J);const Y=vt.get(T),et=f.state.lights,Mt=f.state.shadowsArray,bt=et.state.version,wt=Ct.getParameters(T,et.state,Mt,H,W),Nt=Ct.getProgramCacheKey(wt);let Ot=Y.programs;Y.environment=T.isMeshStandardMaterial?H.environment:null,Y.fog=H.fog,Y.envMap=(T.isMeshStandardMaterial?It:gt).get(T.envMap||Y.environment),Ot===void 0&&(T.addEventListener("dispose",At),Ot=new Map,Y.programs=Ot);let Bt=Ot.get(Nt);if(Bt!==void 0){if(Y.currentProgram===Bt&&Y.lightsStateVersion===bt)return Zt(T,wt),Bt}else wt.uniforms=Ct.getUniforms(T),T.onBuild(W,wt,d),T.onBeforeCompile(wt,d),Bt=Ct.acquireProgram(wt,Nt),Ot.set(Nt,Bt),Y.uniforms=wt.uniforms;const qt=Y.uniforms;(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(qt.clippingPlanes=b.uniform),Zt(T,wt),Y.needsLights=Rt(T),Y.lightsStateVersion=bt,Y.needsLights&&(qt.ambientLightColor.value=et.state.ambient,qt.lightProbe.value=et.state.probe,qt.directionalLights.value=et.state.directional,qt.directionalLightShadows.value=et.state.directionalShadow,qt.spotLights.value=et.state.spot,qt.spotLightShadows.value=et.state.spotShadow,qt.rectAreaLights.value=et.state.rectArea,qt.ltc_1.value=et.state.rectAreaLTC1,qt.ltc_2.value=et.state.rectAreaLTC2,qt.pointLights.value=et.state.point,qt.pointLightShadows.value=et.state.pointShadow,qt.hemisphereLights.value=et.state.hemi,qt.directionalShadowMap.value=et.state.directionalShadowMap,qt.directionalShadowMatrix.value=et.state.directionalShadowMatrix,qt.spotShadowMap.value=et.state.spotShadowMap,qt.spotShadowMatrix.value=et.state.spotShadowMatrix,qt.pointShadowMap.value=et.state.pointShadowMap,qt.pointShadowMatrix.value=et.state.pointShadowMatrix);const jt=Bt.getUniforms(),ue=el.seqWithValue(jt.seq,qt);return Y.currentProgram=Bt,Y.uniformsList=ue,Bt}function Zt(T,H){const W=vt.get(T);W.outputEncoding=H.outputEncoding,W.instancing=H.instancing,W.skinning=H.skinning,W.morphTargets=H.morphTargets,W.morphNormals=H.morphNormals,W.morphColors=H.morphColors,W.morphTargetsCount=H.morphTargetsCount,W.numClippingPlanes=H.numClippingPlanes,W.numIntersection=H.numClipIntersection,W.vertexAlphas=H.vertexAlphas,W.vertexTangents=H.vertexTangents,W.toneMapping=H.toneMapping}function _t(T,H,W,Y,et){H.isScene!==!0&&(H=J),ht.resetTextureUnits();const Mt=H.fog,bt=Y.isMeshStandardMaterial?H.environment:null,wt=w===null?d.outputEncoding:w.isXRRenderTarget===!0?w.texture.encoding:ns,Nt=(Y.isMeshStandardMaterial?It:gt).get(Y.envMap||bt),Ot=Y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Bt=!!Y.normalMap&&!!W.attributes.tangent,qt=!!W.morphAttributes.position,jt=!!W.morphAttributes.normal,ue=!!W.morphAttributes.color,pe=Y.toneMapped?d.toneMapping:Vi,on=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Ye=on!==void 0?on.length:0,Vt=vt.get(Y),le=f.state.lights;if(G===!0&&(k===!0||T!==y)){const ai=T===y&&Y.id===x;b.setState(Y,T,ai)}let re=!1;Y.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==le.state.version||Vt.outputEncoding!==wt||et.isInstancedMesh&&Vt.instancing===!1||!et.isInstancedMesh&&Vt.instancing===!0||et.isSkinnedMesh&&Vt.skinning===!1||!et.isSkinnedMesh&&Vt.skinning===!0||Vt.envMap!==Nt||Y.fog===!0&&Vt.fog!==Mt||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==b.numPlanes||Vt.numIntersection!==b.numIntersection)||Vt.vertexAlphas!==Ot||Vt.vertexTangents!==Bt||Vt.morphTargets!==qt||Vt.morphNormals!==jt||Vt.morphColors!==ue||Vt.toneMapping!==pe||ct.isWebGL2===!0&&Vt.morphTargetsCount!==Ye)&&(re=!0):(re=!0,Vt.__version=Y.version);let an=Vt.currentProgram;re===!0&&(an=Dt(Y,H,et));let qn=!1,Yn=!1,ln=!1;const Se=an.getUniforms(),oi=Vt.uniforms;if(ot.useProgram(an.program)&&(qn=!0,Yn=!0,ln=!0),Y.id!==x&&(x=Y.id,Yn=!0),qn||y!==T){if(Se.setValue(B,"projectionMatrix",T.projectionMatrix),ct.logarithmicDepthBuffer&&Se.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),y!==T&&(y=T,Yn=!0,ln=!0),Y.isShaderMaterial||Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshStandardMaterial||Y.envMap){const ai=Se.map.cameraPosition;ai!==void 0&&ai.setValue(B,K.setFromMatrixPosition(T.matrixWorld))}(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Se.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial||Y.isShadowMaterial||et.isSkinnedMesh)&&Se.setValue(B,"viewMatrix",T.matrixWorldInverse)}if(et.isSkinnedMesh){Se.setOptional(B,et,"bindMatrix"),Se.setOptional(B,et,"bindMatrixInverse");const ai=et.skeleton;ai&&(ct.floatVertexTextures?(ai.boneTexture===null&&ai.computeBoneTexture(),Se.setValue(B,"boneTexture",ai.boneTexture,ht),Se.setValue(B,"boneTextureSize",ai.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Ei=W.morphAttributes;return(Ei.position!==void 0||Ei.normal!==void 0||Ei.color!==void 0&&ct.isWebGL2===!0)&&ft.update(et,W,Y,an),(Yn||Vt.receiveShadow!==et.receiveShadow)&&(Vt.receiveShadow=et.receiveShadow,Se.setValue(B,"receiveShadow",et.receiveShadow)),Yn&&(Se.setValue(B,"toneMappingExposure",d.toneMappingExposure),Vt.needsLights&&Wt(oi,ln),Mt&&Y.fog===!0&&Xt.refreshFogUniforms(oi,Mt),Xt.refreshMaterialUniforms(oi,Y,R,D,C),el.upload(B,Vt.uniformsList,oi,ht)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(el.upload(B,Vt.uniformsList,oi,ht),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Se.setValue(B,"center",et.center),Se.setValue(B,"modelViewMatrix",et.modelViewMatrix),Se.setValue(B,"normalMatrix",et.normalMatrix),Se.setValue(B,"modelMatrix",et.matrixWorld),an}function Wt(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function Rt(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,H,W){vt.get(T.texture).__webglTexture=H,vt.get(T.depthTexture).__webglTexture=W;const Y=vt.get(T);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=W===void 0,Y.__autoAllocateDepthBuffer||rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,H){const W=vt.get(T);W.__webglFramebuffer=H,W.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(T,H=0,W=0){w=T,_=H,M=W;let Y=!0;if(T){const Nt=vt.get(T);Nt.__useDefaultFramebuffer!==void 0?(ot.bindFramebuffer(36160,null),Y=!1):Nt.__webglFramebuffer===void 0?ht.setupRenderTarget(T):Nt.__hasExternalTextures&&ht.rebindTextures(T,vt.get(T.texture).__webglTexture,vt.get(T.depthTexture).__webglTexture)}let et=null,Mt=!1,bt=!1;if(T){const Nt=T.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture)&&(bt=!0);const Ot=vt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(et=Ot[H],Mt=!0):ct.isWebGL2&&T.samples>0&&ht.useMultisampledRTT(T)===!1?et=vt.get(T).__webglMultisampledFramebuffer:et=Ot,E.copy(T.viewport),A.copy(T.scissor),v=T.scissorTest}else E.copy(I).multiplyScalar(R).floor(),A.copy(V).multiplyScalar(R).floor(),v=z;if(ot.bindFramebuffer(36160,et)&&ct.drawBuffers&&Y&&ot.drawBuffers(T,et),ot.viewport(E),ot.scissor(A),ot.setScissorTest(v),Mt){const Nt=vt.get(T.texture);B.framebufferTexture2D(36160,36064,34069+H,Nt.__webglTexture,W)}else if(bt){const Nt=vt.get(T.texture),Ot=H||0;B.framebufferTextureLayer(36160,36064,Nt.__webglTexture,W||0,Ot)}x=-1},this.readRenderTargetPixels=function(T,H,W,Y,et,Mt,bt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(wt=wt[bt]),wt){ot.bindFramebuffer(36160,wt);try{const Nt=T.texture,Ot=Nt.format,Bt=Nt.type;if(Ot!==ni&&L.convert(Ot)!==B.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const qt=Bt===$o&&(rt.has("EXT_color_buffer_half_float")||ct.isWebGL2&&rt.has("EXT_color_buffer_float"));if(Bt!==es&&L.convert(Bt)!==B.getParameter(35738)&&!(Bt===zr&&(ct.isWebGL2||rt.has("OES_texture_float")||rt.has("WEBGL_color_buffer_float")))&&!qt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-Y&&W>=0&&W<=T.height-et&&B.readPixels(H,W,Y,et,L.convert(Ot),L.convert(Bt),Mt)}finally{const Nt=w!==null?vt.get(w).__webglFramebuffer:null;ot.bindFramebuffer(36160,Nt)}}},this.copyFramebufferToTexture=function(T,H,W=0){const Y=Math.pow(2,-W),et=Math.floor(H.image.width*Y),Mt=Math.floor(H.image.height*Y);ht.setTexture2D(H,0),B.copyTexSubImage2D(3553,W,0,0,T.x,T.y,et,Mt),ot.unbindTexture()},this.copyTextureToTexture=function(T,H,W,Y=0){const et=H.image.width,Mt=H.image.height,bt=L.convert(W.format),wt=L.convert(W.type);ht.setTexture2D(W,0),B.pixelStorei(37440,W.flipY),B.pixelStorei(37441,W.premultiplyAlpha),B.pixelStorei(3317,W.unpackAlignment),H.isDataTexture?B.texSubImage2D(3553,Y,T.x,T.y,et,Mt,bt,wt,H.image.data):H.isCompressedTexture?B.compressedTexSubImage2D(3553,Y,T.x,T.y,H.mipmaps[0].width,H.mipmaps[0].height,bt,H.mipmaps[0].data):B.texSubImage2D(3553,Y,T.x,T.y,bt,wt,H.image),Y===0&&W.generateMipmaps&&B.generateMipmap(3553),ot.unbindTexture()},this.copyTextureToTexture3D=function(T,H,W,Y,et=0){if(d.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Mt=T.max.x-T.min.x+1,bt=T.max.y-T.min.y+1,wt=T.max.z-T.min.z+1,Nt=L.convert(Y.format),Ot=L.convert(Y.type);let Bt;if(Y.isData3DTexture)ht.setTexture3D(Y,0),Bt=32879;else if(Y.isDataArrayTexture)ht.setTexture2DArray(Y,0),Bt=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(37440,Y.flipY),B.pixelStorei(37441,Y.premultiplyAlpha),B.pixelStorei(3317,Y.unpackAlignment);const qt=B.getParameter(3314),jt=B.getParameter(32878),ue=B.getParameter(3316),pe=B.getParameter(3315),on=B.getParameter(32877),Ye=W.isCompressedTexture?W.mipmaps[0]:W.image;B.pixelStorei(3314,Ye.width),B.pixelStorei(32878,Ye.height),B.pixelStorei(3316,T.min.x),B.pixelStorei(3315,T.min.y),B.pixelStorei(32877,T.min.z),W.isDataTexture||W.isData3DTexture?B.texSubImage3D(Bt,et,H.x,H.y,H.z,Mt,bt,wt,Nt,Ot,Ye.data):W.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Bt,et,H.x,H.y,H.z,Mt,bt,wt,Nt,Ye.data)):B.texSubImage3D(Bt,et,H.x,H.y,H.z,Mt,bt,wt,Nt,Ot,Ye),B.pixelStorei(3314,qt),B.pixelStorei(32878,jt),B.pixelStorei(3316,ue),B.pixelStorei(3315,pe),B.pixelStorei(32877,on),et===0&&Y.generateMipmaps&&B.generateMipmap(Bt),ot.unbindTexture()},this.initTexture=function(T){ht.setTexture2D(T,0),ot.unbindTexture()},this.resetState=function(){_=0,M=0,w=null,ot.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class pw extends dw{}pw.prototype.isWebGL1Renderer=!0;class Dw extends Wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}}class mw extends Ue{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}class Dg extends Ue{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}class Pg extends Ue{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Bd=new ke,Nu=new mg,Ua=new Bl,Ba=new j;class Pw extends Wn{constructor(t=new yr,e=new Pg){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(i),Ua.radius+=s,t.ray.intersectsSphere(Ua)===!1)return;Bd.copy(i).invert(),Nu.copy(t.ray).applyMatrix4(Bd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,d=p;g<d;g++){const m=c.getX(g);Ba.fromBufferAttribute(h,m),Vd(Ba,m,l,i,t,e,this)}}else{const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=f,d=p;g<d;g++)Ba.fromBufferAttribute(h,g),Vd(Ba,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Vd(r,t,e,n,i,s,a){const o=Nu.distanceSqToPoint(r);if(o<e){const l=new j;Nu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}class gw extends Ue{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new $t(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class _w extends Xi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Rg extends Ue{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class xw extends Rg{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Yt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $t(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=0,this.attenuationColor=new $t(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $t(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(t)}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class vw extends Ue{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $t(16777215),this.specular=new $t(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yw extends Ue{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new $t(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Mw extends Ue{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class Sw extends Ue{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class bw extends Ue{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new $t(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ww extends Dg{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}const Tw={ShadowMaterial:gw,SpriteMaterial:mw,RawShaderMaterial:_w,ShaderMaterial:Xi,PointsMaterial:Pg,MeshPhysicalMaterial:xw,MeshStandardMaterial:Rg,MeshPhongMaterial:vw,MeshToonMaterial:yw,MeshNormalMaterial:Mw,MeshLambertMaterial:Sw,MeshDepthMaterial:Ag,MeshDistanceMaterial:Lg,MeshBasicMaterial:Sh,MeshMatcapMaterial:bw,LineDashedMaterial:ww,LineBasicMaterial:Dg,Material:Ue};Ue.fromType=function(r){return new Tw[r]};class Rw{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Gd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Gd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Gd(){return(typeof performance>"u"?Date:performance).now()}const Ig="\\[\\]\\.:\\/",Th="[^"+Ig+"]",Ew="[^"+Ig.replace("\\.","")+"]";/((?:WC+[\/:])*)/.source.replace("WC",Th);/(WCOD+)?/.source.replace("WCOD",Ew);/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Th);/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Th);class Hd{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Qe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const li=new Uint32Array(512),ci=new Uint32Array(512);for(let r=0;r<256;++r){const t=r-127;t<-27?(li[r]=0,li[r|256]=32768,ci[r]=24,ci[r|256]=24):t<-14?(li[r]=1024>>-t-14,li[r|256]=1024>>-t-14|32768,ci[r]=-t-1,ci[r|256]=-t-1):t<=15?(li[r]=t+15<<10,li[r|256]=t+15<<10|32768,ci[r]=13,ci[r|256]=13):t<128?(li[r]=31744,li[r|256]=64512,ci[r]=24,ci[r|256]=24):(li[r]=31744,li[r|256]=64512,ci[r]=13,ci[r|256]=13)}const Og=new Uint32Array(2048),na=new Uint32Array(64),Cw=new Uint32Array(64);for(let r=1;r<1024;++r){let t=r<<13,e=0;for(;!(t&8388608);)t<<=1,e-=8388608;t&=-8388609,e+=947912704,Og[r]=t|e}for(let r=1024;r<2048;++r)Og[r]=939524096+(r-1024<<13);for(let r=1;r<31;++r)na[r]=r<<23;na[31]=1199570944;na[32]=2147483648;for(let r=33;r<63;++r)na[r]=2147483648+(r-32<<23);na[63]=3347054592;for(let r=1;r<64;++r)r!==32&&(Cw[r]=1024);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mh);const Wd={type:"change"},Vc={type:"start"},Xd={type:"end"};class Iw extends ss{constructor(t,e){super(),e===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),e===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new j,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:cs.ROTATE,MIDDLE:cs.DOLLY,RIGHT:cs.PAN},this.touches={ONE:us.ROTATE,TWO:us.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",Pt),this._domElementKeyEvents=L},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Wd),n.update(),s=i.NONE},this.update=function(){const L=new j,nt=new is().setFromUnitVectors(t.up,new j(0,1,0)),pt=nt.clone().invert(),st=new j,O=new is,dt=2*Math.PI;return function(){const At=n.object.position;L.copy(At).sub(n.target),L.applyQuaternion(nt),o.setFromVector3(L),n.autoRotate&&s===i.NONE&&S(A()),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let mt=n.minAzimuthAngle,St=n.maxAzimuthAngle;return isFinite(mt)&&isFinite(St)&&(mt<-Math.PI?mt+=dt:mt>Math.PI&&(mt-=dt),St<-Math.PI?St+=dt:St>Math.PI&&(St-=dt),mt<=St?o.theta=Math.max(mt,Math.min(St,o.theta)):o.theta=o.theta>(mt+St)/2?Math.max(mt,o.theta):Math.min(St,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),L.setFromSpherical(o),L.applyQuaternion(pt),At.copy(n.target).add(L),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||st.distanceToSquared(n.object.position)>a||8*(1-O.dot(n.object.quaternion))>a?(n.dispatchEvent(Wd),st.copy(n.object.position),O.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Q),n.domElement.removeEventListener("pointerdown",gt),n.domElement.removeEventListener("pointercancel",X),n.domElement.removeEventListener("wheel",Xt),n.domElement.removeEventListener("pointermove",It),n.domElement.removeEventListener("pointerup",Gt),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",Pt)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const a=1e-6,o=new Hd,l=new Hd;let c=1;const u=new j;let h=!1;const f=new Yt,p=new Yt,g=new Yt,d=new Yt,m=new Yt,_=new Yt,M=new Yt,w=new Yt,x=new Yt,y=[],E={};function A(){return 2*Math.PI/60/60*n.autoRotateSpeed}function v(){return Math.pow(.95,n.zoomSpeed)}function S(L){l.theta-=L}function D(L){l.phi-=L}const R=function(){const L=new j;return function(pt,st){L.setFromMatrixColumn(st,0),L.multiplyScalar(-pt),u.add(L)}}(),F=function(){const L=new j;return function(pt,st){n.screenSpacePanning===!0?L.setFromMatrixColumn(st,1):(L.setFromMatrixColumn(st,0),L.crossVectors(n.object.up,L)),L.multiplyScalar(pt),u.add(L)}}(),$=function(){const L=new j;return function(pt,st){const O=n.domElement;if(n.object.isPerspectiveCamera){const dt=n.object.position;L.copy(dt).sub(n.target);let lt=L.length();lt*=Math.tan(n.object.fov/2*Math.PI/180),R(2*pt*lt/O.clientHeight,n.object.matrix),F(2*st*lt/O.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(R(pt*(n.object.right-n.object.left)/n.object.zoom/O.clientWidth,n.object.matrix),F(st*(n.object.top-n.object.bottom)/n.object.zoom/O.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function I(L){n.object.isPerspectiveCamera?c/=L:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*L)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function V(L){n.object.isPerspectiveCamera?c*=L:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/L)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function z(L){f.set(L.clientX,L.clientY)}function U(L){M.set(L.clientX,L.clientY)}function G(L){d.set(L.clientX,L.clientY)}function k(L){p.set(L.clientX,L.clientY),g.subVectors(p,f).multiplyScalar(n.rotateSpeed);const nt=n.domElement;S(2*Math.PI*g.x/nt.clientHeight),D(2*Math.PI*g.y/nt.clientHeight),f.copy(p),n.update()}function C(L){w.set(L.clientX,L.clientY),x.subVectors(w,M),x.y>0?I(v()):x.y<0&&V(v()),M.copy(w),n.update()}function Z(L){m.set(L.clientX,L.clientY),_.subVectors(m,d).multiplyScalar(n.panSpeed),$(_.x,_.y),d.copy(m),n.update()}function N(L){L.deltaY<0?V(v()):L.deltaY>0&&I(v()),n.update()}function K(L){let nt=!1;switch(L.code){case n.keys.UP:$(0,n.keyPanSpeed),nt=!0;break;case n.keys.BOTTOM:$(0,-n.keyPanSpeed),nt=!0;break;case n.keys.LEFT:$(n.keyPanSpeed,0),nt=!0;break;case n.keys.RIGHT:$(-n.keyPanSpeed,0),nt=!0;break}nt&&(L.preventDefault(),n.update())}function J(){if(y.length===1)f.set(y[0].pageX,y[0].pageY);else{const L=.5*(y[0].pageX+y[1].pageX),nt=.5*(y[0].pageY+y[1].pageY);f.set(L,nt)}}function q(){if(y.length===1)d.set(y[0].pageX,y[0].pageY);else{const L=.5*(y[0].pageX+y[1].pageX),nt=.5*(y[0].pageY+y[1].pageY);d.set(L,nt)}}function B(){const L=y[0].pageX-y[1].pageX,nt=y[0].pageY-y[1].pageY,pt=Math.sqrt(L*L+nt*nt);M.set(0,pt)}function at(){n.enableZoom&&B(),n.enablePan&&q()}function rt(){n.enableZoom&&B(),n.enableRotate&&J()}function ct(L){if(y.length==1)p.set(L.pageX,L.pageY);else{const pt=Et(L),st=.5*(L.pageX+pt.x),O=.5*(L.pageY+pt.y);p.set(st,O)}g.subVectors(p,f).multiplyScalar(n.rotateSpeed);const nt=n.domElement;S(2*Math.PI*g.x/nt.clientHeight),D(2*Math.PI*g.y/nt.clientHeight),f.copy(p)}function ot(L){if(y.length===1)m.set(L.pageX,L.pageY);else{const nt=Et(L),pt=.5*(L.pageX+nt.x),st=.5*(L.pageY+nt.y);m.set(pt,st)}_.subVectors(m,d).multiplyScalar(n.panSpeed),$(_.x,_.y),d.copy(m)}function yt(L){const nt=Et(L),pt=L.pageX-nt.x,st=L.pageY-nt.y,O=Math.sqrt(pt*pt+st*st);w.set(0,O),x.set(0,Math.pow(w.y/M.y,n.zoomSpeed)),I(x.y),M.copy(w)}function vt(L){n.enableZoom&&yt(L),n.enablePan&&ot(L)}function ht(L){n.enableZoom&&yt(L),n.enableRotate&&ct(L)}function gt(L){n.enabled!==!1&&(y.length===0&&(n.domElement.setPointerCapture(L.pointerId),n.domElement.addEventListener("pointermove",It),n.domElement.addEventListener("pointerup",Gt)),it(L),L.pointerType==="touch"?P(L):Ft(L))}function It(L){n.enabled!==!1&&(L.pointerType==="touch"?b(L):Ct(L))}function Gt(L){ft(L),y.length===0&&(n.domElement.releasePointerCapture(L.pointerId),n.domElement.removeEventListener("pointermove",It),n.domElement.removeEventListener("pointerup",Gt)),n.dispatchEvent(Xd),s=i.NONE}function X(L){ft(L)}function Ft(L){let nt;switch(L.button){case 0:nt=n.mouseButtons.LEFT;break;case 1:nt=n.mouseButtons.MIDDLE;break;case 2:nt=n.mouseButtons.RIGHT;break;default:nt=-1}switch(nt){case cs.DOLLY:if(n.enableZoom===!1)return;U(L),s=i.DOLLY;break;case cs.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enablePan===!1)return;G(L),s=i.PAN}else{if(n.enableRotate===!1)return;z(L),s=i.ROTATE}break;case cs.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enableRotate===!1)return;z(L),s=i.ROTATE}else{if(n.enablePan===!1)return;G(L),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Vc)}function Ct(L){if(n.enabled!==!1)switch(s){case i.ROTATE:if(n.enableRotate===!1)return;k(L);break;case i.DOLLY:if(n.enableZoom===!1)return;C(L);break;case i.PAN:if(n.enablePan===!1)return;Z(L);break}}function Xt(L){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(L.preventDefault(),n.dispatchEvent(Vc),N(L),n.dispatchEvent(Xd))}function Pt(L){n.enabled===!1||n.enablePan===!1||K(L)}function P(L){switch(ut(L),y.length){case 1:switch(n.touches.ONE){case us.ROTATE:if(n.enableRotate===!1)return;J(),s=i.TOUCH_ROTATE;break;case us.PAN:if(n.enablePan===!1)return;q(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case us.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;at(),s=i.TOUCH_DOLLY_PAN;break;case us.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;rt(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Vc)}function b(L){switch(ut(L),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;ct(L),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;ot(L),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;vt(L),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ht(L),n.update();break;default:s=i.NONE}}function Q(L){n.enabled!==!1&&L.preventDefault()}function it(L){y.push(L)}function ft(L){delete E[L.pointerId];for(let nt=0;nt<y.length;nt++)if(y[nt].pointerId==L.pointerId){y.splice(nt,1);return}}function ut(L){let nt=E[L.pointerId];nt===void 0&&(nt=new Yt,E[L.pointerId]=nt),nt.set(L.pageX,L.pageY)}function Et(L){const nt=L.pointerId===y[0].pointerId?y[1]:y[0];return E[nt.pointerId]}n.domElement.addEventListener("contextmenu",Q),n.domElement.addEventListener("pointerdown",gt),n.domElement.addEventListener("pointercancel",X),n.domElement.addEventListener("wheel",Xt,{passive:!1}),this.update()}}export{Lf as A,yr as B,$t as C,Lw as E,Aw as L,Js as O,Pg as P,ne as S,si as T,dw as W,Dw as a,Si as b,Pw as c,ti as d,Iw as e,Rw as f,i0 as g};
