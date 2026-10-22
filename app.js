'use strict';
const iconPaths = {
  document: '<rect x="8" y="3" width="28" height="38" rx="2"/><path d="M14 11h3m-3 6h3m-1-8v10m-2-4h4M23 11h7M23 17h7M14 25h16M14 32h16"/>',
  network: '<circle cx="22" cy="9" r="5"/><circle cx="10" cy="32" r="5"/><circle cx="34" cy="32" r="5"/><path d="M13 14l-5 9M31 14l5 9M18 34h8"/>',
  receipt: '<path d="M10 5h24v35l-4-3-4 3-4-3-4 3-4-3-4 3V5ZM8 5H5v5h29M16 16h12M16 23h12M16 30h8"/>',
  shield: '<path d="M22 3 38 9v12c0 10-8 17-16 21C14 38 6 31 6 21V9L22 3Z M16 14l6 7 6-7M16 23h12M16 28h12M22 21v13"/>'
};
document.querySelectorAll('[data-icon]').forEach(element => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 44 44'); svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2'); svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round'); svg.innerHTML = iconPaths[element.dataset.icon];
  element.replaceChildren(svg);
});
const slides = [...document.querySelectorAll('[data-slide]')];
const dots = [...document.querySelectorAll('[data-go]')];
let currentSlide = 0;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => { slide.hidden = i !== currentSlide; });
  dots.forEach((dot, i) => { dot.classList.toggle('active', i === currentSlide); dot.setAttribute('aria-pressed', String(i === currentSlide)); });
}
document.querySelector('.previous').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.go))));
document.querySelector('.hero').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); showSlide(currentSlide + (event.key === 'ArrowRight' ? 1 : -1)); }
});
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() { navigation.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', '打开导航'); }
menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const industries = {
  trade: { kicker: 'GLOBAL TRADE', title: '贸易无界，协作有序', description: '围绕跨境贸易中的业务协作、结算材料与凭证整理需求，构建清晰的服务流程，让团队把精力留给业务增长。', tags: ['业务梳理', '材料管理', '流程协同'] },
  digital: { kicker: 'DIGITAL SERVICES', title: '让数字服务，连接更多可能', description: '面向软件、设计、内容与技术服务等跨境协作场景，梳理合同信息、服务记录和交付资料，让每一次合作更清楚。', tags: ['数字业务', '服务记录', '交付协作'] },
  global: { kicker: 'GO GLOBAL', title: '走向新市场，也有熟悉的支持', description: '从企业拓展海外市场的实际需求出发，梳理业务结构与协作方式，明确所需服务与资料准备，陪伴团队迈出下一步。', tags: ['海外拓展', '需求沟通', '方案梳理'] },
  collaboration: { kicker: 'WORK TOGETHER', title: '身处不同地方，协作同样顺畅', description: '围绕跨地区团队协作，明确参与方、业务信息与关键节点，通过充分沟通，建立更有条理的资料与服务管理方式。', tags: ['跨区团队', '节点管理', '高效沟通'] }
};
const tabs = [...document.querySelectorAll('[data-industry]')];
function selectIndustry(tab) {
  const industry = industries[tab.dataset.industry];
  tabs.forEach(item => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
  document.getElementById('solution-panel').setAttribute('aria-labelledby', tab.id);
  document.getElementById('solution-kicker').textContent = industry.kicker;
  document.getElementById('solution-title').textContent = industry.title;
  document.getElementById('solution-description').textContent = industry.description;
  document.getElementById('solution-tags').replaceChildren(...industry.tags.map(text => { const node = document.createElement('span'); node.textContent = text; return node; }));
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectIndustry(tab));
  tab.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault(); selectIndustry(tabs[next]); tabs[next].focus();
  });
});
const dialog = document.getElementById('service-dialog');
const form = document.getElementById('demo-form');
const articleBody = document.getElementById('article-body');
const result = document.getElementById('form-result');
const modes = { consult: '咨询服务方案', login: '登录体验', register: '注册体验' };
function prepareDialog(title, description) {
  form.reset(); result.textContent = '';
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-description').textContent = description;
  dialog.showModal(); document.body.style.overflow = 'hidden';
}
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.dialog;
  form.hidden = false; articleBody.hidden = true;
  document.getElementById('message-field').hidden = mode !== 'consult';
  document.getElementById('form-submit').textContent = mode === 'consult' ? '体验提交' : '体验下一步';
  prepareDialog(modes[mode], '本地交互演示：无需真实账号或密码，输入不会发送或保存。');
}));
form.addEventListener('submit', event => { event.preventDefault(); result.textContent = '演示成功！表单校验已通过，未发送或保存任何内容。'; form.reset(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; form.reset(); result.textContent = ''; });
const articles = [
  { title: '从业务出发，理解跨境协作中的关键环节', heading: '先理解业务，再梳理流程', text: '跨境业务通常涉及不同的参与方与信息流转。一次完整的需求沟通，可以从服务内容、业务地区、参与主体和交付方式开始。将这些信息梳理清楚，有助于团队明确下一步需要准备的资料。', second: '清晰的节点，让协作更有方向', detail: '把复杂流程拆解成可讨论的步骤，为每个阶段明确负责人、沟通方式和资料要求。本文为内容示例，不构成业务、税务或法律建议。' },
  { title: '一次高效的服务沟通，可以从哪些准备开始？', heading: '准备一份简洁的需求清单', text: '概括企业的业务模式、希望解决的问题和预期时间，将已有资料分类整理，同时标注尚未明确的信息。在沟通中主动确认服务范围与资料要求，可以减少不必要的反复。', second: '把问题讲具体，让沟通更有效', detail: '使用具体场景描述需求，记录会议中确定的事项，并在推进前核对关键节点。本文仅为交互与排版演示。' },
  { title: '让信息管理与安全意识，贯穿每一次业务协作', heading: '每一份资料，都应有清楚的用途', text: '在分享资料之前，先确认接收方、业务用途和必要范围。对涉及个人信息的材料保持谨慎，避免在不必要的渠道传递敏感内容。', second: '从日常细节建立安全习惯', detail: '定期检查资料的访问权限，及时整理协作记录，并通过正式渠道确认服务信息。本页面不会收集或保存咨询表单输入，本文仅作内容演示。' }
];
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => {
  const article = articles[Number(button.dataset.article)]; form.hidden = true; articleBody.hidden = false;
  articleBody.replaceChildren(...[['h3',article.heading],['p',article.text],['h3',article.second],['p',article.detail]].map(([tag,text]) => { const node = document.createElement(tag); node.textContent = text; return node; }));
  prepareDialog(article.title, '内容示例 / DEMO ARTICLE');
}));
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`)); }); }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
}
document.getElementById('year').textContent = new Date().getFullYear();
