!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var i=r("6JpON"),u=document.querySelector(".form"),l=document.querySelector('input[name="delay"]'),a=document.querySelector('input[name="step"]'),c=document.querySelector('input[name="amount"]'),d=null,f=null,s=null;function p(e,n){return new Promise((function(t,o){var r=Math.random()>.3;setTimeout((function(){r&&t({position:e,dilay:n}),o({position:e,dilay:n})}),n)}))}u.addEventListener("submit",(function(n){n.preventDefault(),d=Number(l.value),f=Number(a.value),s=Number(c.value),(d<0||f<0||s<=0)&&e(i).Notify.failure("Please enter a correct value");for(var t=1;t<=s;t+=1){p(t,d).then((function(n){var t=n.position,o=n.dilay;e(i).Notify.success("Fulfilled promise ".concat(t," in ").concat(o,"ms"))})).catch((function(n){var t=n.position,o=n.dilay;e(i).Notify.failure("Rejected promise ".concat(t," in ").concat(o,"ms"))})),d+=f}u.reset()}))}();
//# sourceMappingURL=03-promises.11de1546.js.map
