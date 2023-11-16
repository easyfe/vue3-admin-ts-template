/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
const n=t={_allEvents:Object.create(null),use:function(n,l){return n(t,l)||t},on:function(n,l,e){var a=t._allEvents[n]||(t._allEvents[n]=[]),r=e?function e(){e.called||(t.off(n,e),l.apply(l,arguments),e.called=!0)}:l;return r.__sourceString=l.toString(),a.push(r),t},once:function(n,l){return t.on(n,l,!0),t},off:function(n,l){if(l&&t._allEvents[n]){var e=l.toString();t._allEvents[n]=t._allEvents[n].filter((function(n){return n.__sourceString!==e}))}else n?t._allEvents[n]=[]:t._allEvents=Object.create(null);return t},emit:function(n){if("*"!==n){var l=[].slice.call(arguments);(t._allEvents[n]||[]).map((function(n){n.apply(n,l.slice(1))})),(t._allEvents["*"]||[]).map((function(n){n.apply(n,l)}))}return t}};var t;const l="EVENT_CHART_RESIZE";export{l as E,n as e};
