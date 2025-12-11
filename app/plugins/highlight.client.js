// /plugins/highlight.client.js
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import php from "highlight.js/lib/languages/php";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("php", php);
hljs.registerLanguage("bash", bash);

import "highlight.js/styles/github-dark.css";

export default defineNuxtPlugin(() => ({
  provide: { hljs }
}));
