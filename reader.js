/* Keep TeX intact while Markdown interprets backslashes, underscores and pipes. */
function protectMath(source) {
  const expressions = [];
  const pattern = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`)|(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?<![\\$])\$(?!\$)[^\n$]+?(?<!\\)\$)/g;
  const prefix = 'RLFORMULA' + Array.from(source).reduce((n, c) => (n + c.codePointAt(0)) % 1000000007, 0) + 'TOKEN';
  return {text: source.replace(pattern, (match, code, math) => {
    if (code) return code;
    expressions.push(math);
    return prefix + (expressions.length - 1) + 'END';
  }), expressions, prefix};
}
function escapeHTML(text) { return text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function renderMarkdown(source) {
  const {text, expressions, prefix} = protectMath(source);
  const clean = DOMPurify.sanitize(marked.parse(text));
  return clean.replace(new RegExp(prefix + '(\\d+)END', 'g'), (_, i) => escapeHTML(expressions[Number(i)]));
}
async function loadNote() {
  document.body.id = 'main-top';
  const status = document.getElementById('status');
  const article = document.getElementById('article');
  try {
    const response = await fetch('notes/rl-first-three.md', {cache:'no-cache'});
    if (!response.ok) throw new Error('HTTP ' + response.status);
    article.innerHTML = renderMarkdown(await response.text());
    const headings = article.querySelectorAll('h1,h2');
    headings.forEach((heading, i) => {
      heading.id = 'section-' + i;
      if (i === 0) return;
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      if (heading.tagName === 'H2') link.className = 'level-2';
      document.getElementById('toc').append(link);
    });
    article.querySelectorAll('table').forEach(table => {
      const wrapper = document.createElement('div'); wrapper.className = 'table-scroll';
      table.before(wrapper); wrapper.append(table);
    });
    status.hidden = true;
    try {
      await MathJax.startup.promise;
      await MathJax.typesetPromise([article]);
    } catch (error) {
      document.getElementById('math-status').textContent = '公式排版未能完成，可刷新重试或下载 Markdown 原稿。';
    }
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch (error) {
    status.textContent = '笔记加载失败。请刷新重试，或通过左侧链接下载 Markdown 原稿。';
  }
}
if (typeof document !== 'undefined') loadNote();
if (typeof module !== 'undefined') module.exports = {protectMath, renderMarkdown};
