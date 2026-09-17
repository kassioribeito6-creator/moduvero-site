'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Abrir menu'); }
menuToggle.addEventListener('click', () => { const expanded = menuToggle.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('open', expanded); menuToggle.setAttribute('aria-expanded', String(expanded)); menuToggle.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = String(new Date().getFullYear());
const dialogs = document.querySelectorAll('dialog');
function showDialog(dialog) { closeMenu(); document.body.classList.add('modal-open'); dialog.showModal(); }
dialogs.forEach(dialog => { dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close()); dialog.addEventListener('close', () => { if (![...dialogs].some(item => item.open)) document.body.classList.remove('modal-open'); }); dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } }); });
const serviceDetails = {
  forros: { title: 'Forros', text: 'O teto também participa do projeto. Escolha soluções que valorizam o ambiente e permitem organizar iluminação e instalações.', options: ['Forros de PVC', 'Forros modulares', 'Forros de gesso e drywall', 'Soluções para conforto acústico'] },
  divisorias: { title: 'Divisórias', text: 'Crie ambientes mais organizados e adequados à sua rotina. Divida espaços sem perder a unidade do projeto.', options: ['Divisórias para escritórios', 'Sistemas com painéis e vidro', 'Separação de ambientes comerciais', 'Configurações de acordo com o layout'] },
  pisos: { title: 'Pisos', text: 'O piso define a sensação do espaço. Textura, manutenção e intensidade de uso ajudam a orientar a escolha.', options: ['Pisos vinílicos', 'Pisos laminados', 'Carpetes e carpetes modulares', 'Acabamentos e rodapés'] },
  drywall: { title: 'Drywall & gesso', text: 'Versatilidade para criar paredes, tetos e detalhes. Uma solução para integrar forma, iluminação e distribuição de espaços.', options: ['Paredes e divisões em drywall', 'Rebaixamento de teto', 'Sancas e detalhes em gesso', 'Soluções conforme a especificação técnica'] }
};
const serviceDialog = document.querySelector('#service-dialog');
let activeService = '';
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { const detail = serviceDetails[button.dataset.service]; activeService = detail.title; document.querySelector('#service-title').textContent = detail.title; document.querySelector('#service-description').textContent = detail.text; const list = document.querySelector('#service-options'); list.replaceChildren(...detail.options.map(text => { const item = document.createElement('li'); item.textContent = text; return item; })); showDialog(serviceDialog); }));
const galleryDialog = document.querySelector('#gallery-dialog');
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => { const original = button.querySelector('img'); const image = document.querySelector('#gallery-full'); image.src = original.src; image.alt = original.alt; document.querySelector('#gallery-title').textContent = button.querySelector('h3').textContent; showDialog(galleryDialog); }));
const quoteDialog = document.querySelector('#quote-dialog');
const quoteForm = document.querySelector('#quote-form');
const quoteResult = document.querySelector('#quote-result');
function openQuote(service) { quoteForm.hidden = false; quoteResult.hidden = true; if (service) document.querySelector('#quote-service').value = service; showDialog(quoteDialog); }
document.querySelectorAll('[data-quote]').forEach(button => button.addEventListener('click', () => openQuote()));
document.querySelector('#service-quote').addEventListener('click', () => { serviceDialog.close(); openQuote(activeService); });
quoteForm.addEventListener('submit', event => { event.preventDefault(); if (!quoteForm.reportValidity()) return; const data = new FormData(quoteForm); const summary = ['Olá, Moduvero! Gostaria de solicitar um orçamento.', '', 'Solução: ' + data.get('solucao'), 'Cidade/estado: ' + String(data.get('cidade')).trim(), 'Área aproximada: ' + (data.get('area') ? data.get('area') + ' m²' : 'A definir'), '', 'Sobre o projeto:', String(data.get('projeto')).trim()].join('\n'); document.querySelector('#quote-summary').value = summary; document.querySelector('#send-quote').href = 'https://wa.me/5511918671741?text=' + encodeURIComponent(summary); quoteForm.hidden = true; quoteResult.hidden = false; document.querySelector('#copy-status').textContent = ''; document.querySelector('#send-quote').focus(); });
document.querySelector('#copy-quote').addEventListener('click', async () => { const summary = document.querySelector('#quote-summary'); try { await navigator.clipboard.writeText(summary.value); document.querySelector('#copy-status').textContent = 'Texto copiado. Nenhuma solicitação foi enviada.'; } catch { summary.focus(); summary.select(); document.querySelector('#copy-status').textContent = 'Selecione e copie o texto acima.'; } });
document.querySelector('#edit-quote').addEventListener('click', () => { quoteResult.hidden = true; quoteForm.hidden = false; document.querySelector('#quote-service').focus(); });
