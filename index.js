// Calculatrice : ton appli d'origine (HTML et code inchangés), livrée en plugin.
// Ses données sont dans le dossier du plugin, que NeoDex sauvegarde (synchro cloud et sauvegardes) ; à la première ouverture elle reprend ce que tu avais dans NeoDex.
// Elle tourne dans le bac à sable de NeoDex, avec ses outils d'interface (ctx.host) et seulement les autorisations de son plugin.json.
const HTML = "<div class=\"appWrap wide\">\n      <div class=\"agHead\"><span class=\"label\">Calculatrice</span><span class=\"hint\">Essaie : 20 % de 85 € + 12 € · 3 jours en heures · 100 km / 2 h · prix = 12 € · Entrée : calculer · Échap : effacer</span></div>\n      <div class=\"calcMain\">\n        <div class=\"calcBody\"><div class=\"calcTop\"><span class=\"calcBrand\">NEO-CALC 9000</span><div class=\"calcSolar\"><i></i><i></i><i></i><i></i></div></div><div class=\"calcScreen\"><span id=\"calcMode\" class=\"badge\"></span><input id=\"calcIn\" spellcheck=\"false\" autocomplete=\"off\" placeholder=\"0\"><div id=\"calcOut\"></div></div><div id=\"calcKeys\"></div></div>\n        <div class=\"sysCard px calcSide\"><div class=\"chHead\"><span class=\"label\">Historique</span><button class=\"x\" id=\"calcClearHist\" style=\"margin-left:auto;font-size:8px\">EFFACER</button></div><div id=\"calcHist\"></div></div>\n      </div>\n    </div>";
/*CSS-MOVED*/ const CSS = `.shGrid td.num{text-align:right}
.chHead{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.calcMain{display:grid;grid-template-columns:minmax(0,clamp(440px,60vh,680px)) minmax(220px,clamp(300px,24vw,420px));gap:34px;align-items:start;justify-content:center;padding:6px 0 18px}
/* le boîtier : bords en escalier, relief de plastique */
.calcBody{position:relative;padding:18px 20px 22px;background:#3a2c78;clip-path:polygon(0 12px,4px 12px,4px 8px,8px 8px,8px 4px,12px 4px,12px 0,calc(100% - 12px) 0,calc(100% - 12px) 4px,calc(100% - 8px) 4px,calc(100% - 8px) 8px,calc(100% - 4px) 8px,calc(100% - 4px) 12px,100% 12px,100% calc(100% - 12px),calc(100% - 4px) calc(100% - 12px),calc(100% - 4px) calc(100% - 8px),calc(100% - 8px) calc(100% - 8px),calc(100% - 8px) calc(100% - 4px),calc(100% - 12px) calc(100% - 4px),calc(100% - 12px) 100%,12px 100%,12px calc(100% - 4px),8px calc(100% - 4px),8px calc(100% - 8px),4px calc(100% - 8px),4px calc(100% - 12px),0 calc(100% - 12px));
  box-shadow:inset 0 6px 0 #6b55c0,inset 6px 0 0 #5a45a8,inset 0 -8px 0 #221852,inset -6px 0 0 #2a1f5e}
.calcTop{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.calcBrand{font:clamp(11px,1.6vh,17px) var(--title);letter-spacing:2px;color:#d9ccff;text-shadow:0 2px 0 #130a20}
.calcSolar{display:flex;gap:3px;padding:4px;background:#130a20}
.calcSolar i{display:block;width:clamp(22px,3vh,34px);height:clamp(14px,2vh,22px);background:linear-gradient(180deg,#3a1f6e,#24134a);box-shadow:inset 0 0 0 1px #5b3bb0}
/* l'écran LCD : chiffres fantômes derrière, trame de pixels par-dessus */
.calcScreen{position:relative;padding:12px 14px 10px;background:#b9e3a3;box-shadow:inset 0 0 0 4px #130a20,inset 0 6px 0 4px #7aa56a;overflow:hidden;margin-bottom:16px}
.calcScreen::before{content:'88888888888';position:absolute;right:14px;top:clamp(26px,4vh,40px);font:clamp(30px,5vh,52px) var(--title);color:rgba(20,40,20,.09);letter-spacing:0;pointer-events:none}
.calcScreen::after{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.07) 0 2px,transparent 2px 4px),repeating-linear-gradient(90deg,rgba(0,0,0,.05) 0 2px,transparent 2px 4px)}
#calcMode{position:absolute;top:8px;left:12px;font:clamp(10px,1.5vh,15px) var(--title);color:#1d3a1a;background:none;box-shadow:none;padding:0}
#calcIn{all:unset;display:block;width:100%;box-sizing:border-box;text-align:right;font:clamp(30px,5vh,52px) var(--title);color:#16301a;padding-top:clamp(20px,3vh,30px);position:relative}
#calcIn::placeholder{color:rgba(22,48,26,.35)}
#calcOut{text-align:right;font:clamp(18px,2.8vh,30px) var(--title);color:#3b6a3a;min-height:clamp(26px,4vh,40px);margin-top:6px;position:relative}
#calcKeys{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:clamp(10px,1.4vh,16px) clamp(8px,1.1vh,14px);margin-top:6px}
#calcKeys .calcKey{all:unset;box-sizing:border-box;display:flex;align-items:center;justify-content:center;height:clamp(46px,7.4vh,80px);cursor:var(--cp,pointer);font:clamp(13px,2.1vh,22px) var(--title);color:#fff;background:#4a3a96;overflow:hidden;white-space:nowrap;
  box-shadow:inset 0 3px 0 rgba(255,255,255,.28),inset 0 -4px 0 rgba(0,0,0,.38),0 4px 0 #130a20,4px 4px 0 #130a20,-4px 4px 0 #130a20;text-shadow:0 2px 0 rgba(0,0,0,.4)}
#calcKeys .calcKey:hover{filter:brightness(1.15)}
#calcKeys .calcKey:active{transform:translateY(4px);box-shadow:inset 0 3px 0 rgba(0,0,0,.25),0 0 0 #130a20}
#calcKeys .calcKey.wide{grid-column:span 2}
#calcKeys .calcKey.num{background:#7a66d6;font-size:clamp(19px,3vh,32px)}
#calcKeys .calcKey.op{background:#c0399f}
#calcKeys .calcKey.mode{font-size:clamp(10px,1.45vh,16px)}
#calcKeys .calcKey.del{background:#c04a4a}
#calcKeys .calcKey.main{background:#e0a31e;color:#2a1a00;text-shadow:none}
/* le ticket : l'historique comme une bande de papier */
.calcSide{background:#f2ecff!important;color:#201638;clip-path:polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,calc(100% - 16px) calc(100% - 8px),calc(100% - 24px) 100%,calc(100% - 32px) calc(100% - 8px),calc(100% - 40px) 100%,calc(100% - 48px) calc(100% - 8px),calc(100% - 56px) 100%,calc(100% - 64px) calc(100% - 8px),calc(100% - 72px) 100%,calc(100% - 80px) calc(100% - 8px),calc(100% - 88px) 100%,calc(100% - 96px) calc(100% - 8px),calc(100% - 104px) 100%,calc(100% - 112px) calc(100% - 8px),calc(100% - 120px) 100%,calc(100% - 128px) calc(100% - 8px),calc(100% - 136px) 100%,calc(100% - 144px) calc(100% - 8px),calc(100% - 152px) 100%,calc(100% - 160px) calc(100% - 8px),calc(100% - 168px) 100%,calc(100% - 176px) calc(100% - 8px),calc(100% - 184px) 100%,calc(100% - 192px) calc(100% - 8px),calc(100% - 200px) 100%,calc(100% - 208px) calc(100% - 8px),calc(100% - 216px) 100%,calc(100% - 224px) calc(100% - 8px),calc(100% - 232px) 100%,calc(100% - 240px) calc(100% - 8px),calc(100% - 248px) 100%,calc(100% - 256px) calc(100% - 8px),calc(100% - 264px) 100%,calc(100% - 272px) calc(100% - 8px),calc(100% - 280px) 100%,calc(100% - 288px) calc(100% - 8px),calc(100% - 296px) 100%,0 calc(100% - 8px));padding-bottom:22px!important}
.calcSide .label{color:#201638!important}
.calcRow{all:unset;cursor:var(--cp,pointer);display:flex;flex-direction:column;align-items:flex-end;padding:8px 6px;border-bottom:2px dashed rgba(32,22,56,.25)}
.calcRow:hover{background:rgba(32,22,56,.08)}
.calcRow span{display:block;font:clamp(12px,1.8vh,18px) var(--title);color:#5b4d85;word-break:break-all;line-height:1.4}
.calcRow b{display:block;line-height:1.4}
.calcRow b{font:clamp(16px,2.6vh,28px) var(--title);color:#201638}
#calcHist{max-height:clamp(480px,68vh,860px);overflow-y:auto}
#calcHist .hint{color:#5b4d85}
.calcVars{padding:6px;margin-bottom:6px;background:rgba(32,22,56,.08);color:#201638;font-size:14px;overflow-wrap:anywhere}
@media(max-width:820px){.calcMain{grid-template-columns:minmax(0,1fr)}}
`;  // le style de ce plugin (il utilise les variables du thème de NeoDex)
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const { el, toast, sfx, ask, newTab, pixIcon, PIX, WX } = ctx.host;
  const folder = ctx.folder, legacy = ctx.legacy || {};
  ctx.host.addStyle(CSS);
  view.innerHTML = HTML;
  const $ = id => id === "calcApp" ? view : view.querySelector('#' + id);  // les identifiants de ta vue, sans toucher à ceux du reste de NeoDex
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const __ls = (await doc('local')) || {}; let __lsT = null, __lsNew = false;
  for (const k of ["neoCalc"]) if (__ls[k] === undefined) { const v = legacy.local ? await legacy.local(k) : null; if (v != null) { __ls[k] = v; __lsNew = true; } }  // première ouverture : tu retrouves ce que tu avais
  const __lsSave = () => { clearTimeout(__lsT); __lsT = setTimeout(() => folder.write('local', __ls).catch(() => {}), 400); };
  if (__lsNew) __lsSave();
  const localStorage = new Proxy(__ls, { get: (t, k) => k === 'getItem' ? (x => t[x] ?? null) : k === 'setItem' ? ((x, v) => { t[x] = String(v); __lsSave(); }) : t[k], set: (t, k, v) => { t[k] = String(v); __lsSave(); return true; } });
  // ---- ton code d'origine ----
  let calcDeg = true, calcAns = null, calcHist = [], calcVars = {};
  try { calcHist = JSON.parse(localStorage.neoCalc || '[]'); } catch {}  // shortcut: history kept on this PC only, it is a convenience
  try { calcVars = JSON.parse(localStorage.neoCalcVars || '{}'); } catch {}
  const CALC_FN = {sin: x => Math.sin(calcDeg ? x * Math.PI / 180 : x), cos: x => Math.cos(calcDeg ? x * Math.PI / 180 : x), tan: x => Math.tan(calcDeg ? x * Math.PI / 180 : x),
    asin: x => calcDeg ? Math.asin(x) * 180 / Math.PI : Math.asin(x), acos: x => calcDeg ? Math.acos(x) * 180 / Math.PI : Math.acos(x), atan: x => calcDeg ? Math.atan(x) * 180 / Math.PI : Math.atan(x),
    ln: Math.log, log: Math.log10, sqrt: Math.sqrt, '√': Math.sqrt, abs: Math.abs, exp: Math.exp, round: Math.round, floor: Math.floor, ceil: Math.ceil};
  // ---- les unités : chaque quantité est gardée dans l'unité de base de sa dimension (m, kg, s, K, octet, chaque monnaie à part) ----
  const U = {};
  const unit = (names, f, d, off = 0) => { const u = {f, d, off, name: names[0]}; for (const n of names) U[n] = u; };
  unit(['m', 'mètre', 'mètres', 'metre', 'metres', 'meter', 'meters'], 1, {L: 1}); unit(['km', 'kilomètre', 'kilomètres'], 1e3, {L: 1}); unit(['cm', 'centimètre', 'centimètres'], .01, {L: 1}); unit(['mm', 'millimètre', 'millimètres'], .001, {L: 1});
  unit(['mi', 'mile', 'miles'], 1609.344, {L: 1}); unit(['ft', 'pied', 'pieds', 'foot', 'feet'], .3048, {L: 1}); unit(['in', 'pouce', 'pouces', 'inch', 'inches'], .0254, {L: 1}); unit(['yd', 'yard', 'yards'], .9144, {L: 1});
  unit(['m²', 'm2'], 1, {L: 2}); unit(['km²', 'km2'], 1e6, {L: 2}); unit(['cm²', 'cm2'], 1e-4, {L: 2}); unit(['ha', 'hectare', 'hectares'], 1e4, {L: 2});
  unit(['m³', 'm3'], 1, {L: 3}); unit(['L', 'l', 'litre', 'litres', 'liter', 'liters'], 1e-3, {L: 3}); unit(['cl'], 1e-5, {L: 3}); unit(['ml', 'mL'], 1e-6, {L: 3});
  unit(['kg', 'kilo', 'kilos', 'kilogramme', 'kilogrammes'], 1, {M: 1}); unit(['g', 'gramme', 'grammes', 'gram', 'grams'], 1e-3, {M: 1}); unit(['mg'], 1e-6, {M: 1}); unit(['t', 'tonne', 'tonnes'], 1e3, {M: 1});
  unit(['lb', 'lbs', 'livre', 'livres', 'pound', 'pounds'], .45359237, {M: 1}); unit(['oz', 'once', 'onces', 'ounce', 'ounces'], .028349523125, {M: 1});
  unit(['s', 'sec', 'seconde', 'secondes', 'second', 'seconds'], 1, {T: 1}); unit(['ms'], .001, {T: 1}); unit(['min', 'minute', 'minutes'], 60, {T: 1}); unit(['h', 'heure', 'heures', 'hour', 'hours'], 3600, {T: 1});
  unit(['j', 'jour', 'jours', 'day', 'days'], 86400, {T: 1}); unit(['semaine', 'semaines', 'week', 'weeks'], 604800, {T: 1}); unit(['mois', 'month', 'months'], 2629746, {T: 1}); unit(['an', 'ans', 'année', 'années', 'year', 'years'], 31556952, {T: 1});
  unit(['km/h', 'kmh'], 1 / 3.6, {L: 1, T: -1}); unit(['m/s'], 1, {L: 1, T: -1}); unit(['mph'], .44704, {L: 1, T: -1}); unit(['nœud', 'nœuds', 'kn'], 1852 / 3600, {L: 1, T: -1});
  unit(['o', 'octet', 'octets', 'B', 'byte', 'bytes'], 1, {B: 1}); unit(['ko', 'Ko', 'kB', 'KB'], 1e3, {B: 1}); unit(['Mo', 'MB'], 1e6, {B: 1}); unit(['Go', 'GB'], 1e9, {B: 1}); unit(['To', 'TB'], 1e12, {B: 1}); unit(['bit', 'bits'], .125, {B: 1});
  unit(['°C', 'celsius'], 1, {K: 1}, 273.15); unit(['°F', 'fahrenheit'], 5 / 9, {K: 1}, 459.67 * 5 / 9); unit(['K', 'kelvin'], 1, {K: 1});
  unit(['€', 'euro', 'euros', 'EUR'], 1, {EUR: 1}); unit(['$', 'dollar', 'dollars', 'USD'], 1, {USD: 1}); unit(['£', 'GBP'], 1, {GBP: 1}); unit(['¥', 'JPY', 'yen', 'yens'], 1, {JPY: 1}); unit(['CHF'], 1, {CHF: 1});
  const UK = Object.keys(U).sort((a, b) => b.length - a.length);
  const findUnit = w => U[w] ?? (w.length >= 3 ? U[UK.find(k => k.length >= 3 && k.toLowerCase() === w.toLowerCase())] : undefined);
  const Qt = (v, d = {}, show = null) => ({v, d, show});
  const dimKey = d => Object.keys(d).filter(k => d[k]).sort().map(k => k + d[k]).join(' ');
  const plain = a => !dimKey(a.d);
  const mulD = (a, b, sg = 1) => { const d = {...a}; for (const k in b) d[k] = (d[k] || 0) + sg * b[k]; for (const k in d) if (!d[k]) delete d[k]; return d; };
  const BASE = {L: 'm', M: 'kg', T: 's', B: 'o', K: 'K', EUR: '€', USD: '$', GBP: '£', JPY: '¥', CHF: 'CHF'};
  function qAdd(a, b, sg) {
    if (b.pct && !a.pct) return Qt(a.v * (1 + sg * b.v), a.d, a.show);  // 85 € + 20 % : augmenté de 20 %
    if (plain(b) && !plain(a)) b = Qt(b.v * (a.show ? U[a.show].f : 1), a.d);  // 85 € + 12 : 12 dans l'unité de 85 €
    else if (plain(a) && !plain(b)) a = Qt(a.v * (b.show ? U[b.show].f : 1), b.d);
    if (dimKey(a.d) !== dimKey(b.d)) throw new Error('unités incompatibles');
    return Qt(a.v + sg * b.v, a.d, a.show || b.show);
  }
  const qMul = (a, b) => Qt(a.v * b.v, mulD(a.d, b.d), plain(b) ? a.show : plain(a) ? b.show : null);
  const qDiv = (a, b) => { if (b.v === 0) throw new Error('division par zéro'); const sh = !plain(b) && a.show && b.show && U[a.show + '/' + b.show] ? a.show + '/' + b.show : plain(b) ? a.show : null;
    const r = Qt(a.v / b.v, mulD(a.d, b.d, -1), sh); return r; };
  const num = (a, what) => { if (!plain(a)) throw new Error('pas d’unité dans ' + what); return a.v; };
  function calcEval(src) {  // renvoie une quantité {v, d, show}
    const s = src.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/(\d),(\d)/g, '$1.$2').replace(/(\d)[  ](?=\d{3}(?!\d))/g, '$1').replace(/π/g, 'pi')
      .replace(/\bdivisée? par\b|\bdivided by\b/gi, '/').replace(/\b(fois|times)\b/gi, '*').replace(/\bplus\b/gi, '+').replace(/\b(moins|minus)\b/gi, '-');
    let i = 0;
    const ws = () => { while (s[i] === ' ' || s[i] === '\t') i++; };
    const peek = () => (ws(), s[i]), eat = c => peek() === c ? (i++, true) : false, fail = () => { throw new Error('expression incomplète'); };
    const word = w => { ws(); const m = new RegExp('^' + w + '(?![a-zà-ÿ0-9])', 'i').exec(s.slice(i)); if (m) { i += m[0].length; return true; } return false; };
    const unitAt = () => { ws(); for (const k of UK) { const t = s.substr(i, k.length); if ((t === k || k.length >= 3 && t.toLowerCase() === k.toLowerCase()) && !/[a-zà-ÿ0-9²³]/i.test(s[i + k.length] || '') ) { i += k.length; return k; } } return null; };
    const quantity = (n, k) => { const u = U[k]; return Qt(n * u.f + u.off, u.d, u.name); };
    const fact = n => { if (n < 0 || n % 1 || n > 170) throw new Error('factorielle impossible'); let r = 1; for (let k = 2; k <= n; k++) r *= k; return r; };
    function primary() {
      if (eat('(')) { const v = expr(); if (!eat(')')) fail(); return v; }
      ws(); if (/[€$£¥]/.test(s[i])) { const c = s[i++]; const n = /^\s*\d*\.?\d+/.exec(s.slice(i)); if (!n) fail(); i += n[0].length; return quantity(parseFloat(n[0]), c); }
      const nm = /^\d*\.?\d+(e[+-]?\d+)?/i.exec(s.slice(i));
      if (nm) { i += nm[0].length; const n = parseFloat(nm[0]), save = i, k = unitAt(); if (!k) { i = save; return Qt(n); }
        let q = quantity(n, k);
        for (;;) {  // 2 h 30 min, 1 m 80 : les morceaux de même dimension s'ajoutent
          const back = i, m2 = /^\s*(\d*\.?\d+)/.exec(s.slice(i)); if (!m2) break; i += m2[0].length; const k2 = unitAt();
          if (!k2 || dimKey(U[k2].d) !== dimKey(q.d)) { i = back; break; } q = Qt(q.v + parseFloat(m2[1]) * U[k2].f, q.d, q.show); }
        return q; }
      const id = /^(√|[a-zà-ÿ_][a-zà-ÿ_0-9]*)/i.exec(s.slice(i));
      if (id) {
        const w = id[0].toLowerCase(); i += id[0].length;
        if (w === 'pi') return Qt(Math.PI); if (w === 'e') return Qt(Math.E); if (w === 'ans') return calcAns || Qt(0);
        if (CALC_FN[w]) { const a = eat('(') ? (v => { if (!eat(')')) fail(); return v; })(expr()) : unary(); return w === 'abs' ? Qt(Math.abs(a.v), a.d, a.show) : Qt(CALC_FN[w](num(a, w))); }
        if (calcVars[id[0]]) return calcVars[id[0]];
        const u = findUnit(id[0]); if (u) return quantity(1, u.name);  // « km en m » : une unité seule vaut 1
        throw new Error('inconnu : ' + id[0]);
      }
      fail();
    }
    function postfix() { let v = primary(); for (;;) {
      if (eat('!')) v = Qt(fact(num(v, 'n!'))); else if (eat('%')) { v = Qt(num(v, '%') / 100); v.pct = true; if (word('de') || word("d'") || word('d’') || word('of')) return qMul(v, unary()); }
      else return v; } }
    function unary() { if (eat('-')) { const v = unary(); return Object.assign(Qt(-v.v, v.d, v.show), {pct: v.pct}); } if (eat('+')) return unary(); return power(); }
    function power() { const b = postfix(); if (!eat('^')) return b; const x = num(unary(), 'l’exposant'); const d = {}; for (const k in b.d) d[k] = b.d[k] * x; return Qt(b.v ** x, d); }
    function term() {
      let v = unary();
      for (;;) {
        if (eat('*')) v = qMul(v, unary()); else if (eat('/')) v = qDiv(v, unary());
        else if (peek() && /[\d(√π]/.test(peek()) || /^[a-zà-ÿ_][a-zà-ÿ_0-9]*/i.test(s.slice(i)) && !/^(de|of|en|in|to)(?![a-zà-ÿ0-9])/i.test(s.slice(i))) v = qMul(v, unary());  // produit implicite : 2pi, 3(4+1)
        else return v;
      }
    }
    function expr() { let v = term(); for (;;) { if (eat('+')) v = qAdd(v, term(), 1); else if (eat('-')) v = qAdd(v, term(), -1); else return v; } }
    if (!s.trim()) return null;
    const v = expr(); ws(); if (i < s.length) throw new Error('caractère inattendu : ' + s[i]);
    return v;
  }
  const calcFmt = v => !isFinite(v) ? 'Erreur' : Math.abs(v) >= 1e15 || (Math.abs(v) < 1e-9 && v) ? v.toExponential(8).replace('.', ',') : String(+v.toPrecision(12)).replace('.', ',');
  const NICE = {L1: ['mm', 'cm', 'm', 'km'], M1: ['g', 'kg', 't'], T1: ['s', 'min', 'h', 'j'], B1: ['o', 'ko', 'Mo', 'Go', 'To']};
  function fmtQ(q, target) {  // une quantité en texte, dans l'unité demandée, sinon celle tapée, sinon l'unité de base
    if (plain(q) && !target) return calcFmt(q.v);
    let u = target ? findUnit(target) : q.show ? U[q.show] : null;
    if (u && dimKey(u.d) !== dimKey(q.d)) { if (target) throw new Error('unités incompatibles'); u = null; }
    if (!u) { const nice = NICE[dimKey(q.d)]; if (nice) u = U[nice.filter(k => Math.abs(q.v) >= U[k].f).pop() || nice[0]]; }  // 120000 m s'écrit 120 km
    if (u) return calcFmt((q.v - u.off) / u.f) + ' ' + u.name;
    return calcFmt(q.v) + ' ' + Object.entries(q.d).map(([k, e]) => BASE[k] + (e === 1 ? '' : e === 2 ? '²' : e === 3 ? '³' : '^' + e)).join('·');
  }
  // une ligne : « nom = calcul » range une variable ; « … en km » (in, to, →) convertit
  function calcRun(src) {
    let name = null, conv = null, body = src;
    const as = /^\s*([a-zà-ÿ_][a-zà-ÿ_0-9]*)\s*=(?!=)\s*(.+)$/i.exec(body);
    if (as && !CALC_FN[as[1].toLowerCase()] && !['pi', 'e', 'ans'].includes(as[1].toLowerCase())) { name = as[1]; body = as[2]; }
    const cv = /^(.+)(?:\s(?:en|in|to|vers)\s|→|->)\s*(.+?)\s*$/i.exec(body); if (cv && findUnit(cv[2].trim())) { body = cv[1]; conv = cv[2].trim(); }
    const q = calcEval(body); if (!q) return null;
    if (!isFinite(q.v)) throw new Error('résultat infini');
    const text = fmtQ(q, conv); if (conv) q.show = findUnit(conv).name;
    return {q, text, name};
  }
  { const keep = calcDeg; calcDeg = true; const R = x => calcRun(x).text, V = x => calcEval(x).v;
    console.assert(V('2+3*4') === 14 && V('(2+3)*4') === 20 && V('2^3^2') === 512 && V('-2^2') === -4 && V('5!') === 120 && V('50%') === .5
      && Math.abs(V('sin(30)') - .5) < 1e-12 && V('2π') === 2 * Math.PI && V('3(4+1)') === 15 && V('1,5*2') === 3 && V('√16') === 4, 'calcEval');
    console.assert(R('20 % de 85 € + 12 €') === '29 €' && R('3 jours en heures') === '72 h' && R('100 km / 2 h') === '50 km/h' && R('2 h 30 min en min') === '150 min' && R('85 € + 20 %') === '102 €'
      && R('1 mile en km') === '1,609344 km' && R('20 °C en °F') === '68 °F' && R('1 Go en Mo') === '1000 Mo' && R('3 fois 4 plus 2') === '14' && R('1,5 kg + 200 g') === '1,7 kg' && R('km en m') === '1000 m' && R('60 km/h * 2 h') === '120 km', 'calcul en langage naturel');
    calcDeg = keep; }
  function calcRender() {
    const src = $('calcIn').value;
    let out = '';
    try { const r = calcRun(src); out = r ? '= ' + r.text : ''; } catch { out = ''; }
    $('calcOut').textContent = out;
    $('calcMode').textContent = calcDeg ? 'DEG' : 'RAD';
    const vars = Object.keys(calcVars);
    $('calcHist').replaceChildren(...(vars.length ? [el('div', 'calcVars', vars.map(k => k + ' = ' + fmtQ(calcVars[k])).join(' · '))] : []), ...(calcHist.length ? calcHist.map(([e, r]) => { const row = el('button', 'calcRow'); row.append(el('span', '', e), el('b', '', '= ' + r)); row.onclick = () => { $('calcIn').value = r; calcRender(); $('calcIn').focus(); }; return row; }) : [el('div', 'hint', 'Les calculs apparaissent ici. Clic sur un résultat : le réutiliser.')]));
  }
  function calcEquals() {
    const src = $('calcIn').value.trim(); if (!src) return;
    try { const r = calcRun(src); if (!r) return; calcAns = r.q; if (r.name) { calcVars[r.name] = r.q; try { localStorage.neoCalcVars = JSON.stringify(calcVars); } catch {} }
      calcHist.unshift([src, r.text]); calcHist = calcHist.slice(0, 50); try { localStorage.neoCalc = JSON.stringify(calcHist); } catch {} $('calcIn').value = r.name ? '' : r.text; }
    catch (e) { $('calcOut').textContent = e.message; return; }
    calcRender();
  }
  // 6 keys a row; "wide" keys take two columns
  const CALC_KEYS = [['sin', 'sin('], ['cos', 'cos('], ['tan', 'tan('], ['ln', 'ln('], ['log', 'log('], ['√', '√('],
    ['x²', '^2'], ['xʸ', '^'], ['(', '('], [')', ')'], ['π', 'π'], ['e', 'e'],
    ['7', '7'], ['8', '8'], ['9', '9'], ['÷', '÷'], ['C', 'clear'], ['⌫', 'back'],
    ['4', '4'], ['5', '5'], ['6', '6'], ['×', '×'], ['n!', '!'], ['%', '%'],
    ['1', '1'], ['2', '2'], ['3', '3'], ['−', '−'], ['Ans', 'Ans'], ['D/R', 'mode'],
    ['0', '0', 1], [',', ','], ['+', '+'], ['=', 'equals', 1]];
  $('calcKeys').replaceChildren(...CALC_KEYS.map(([label, v, wide]) => {
    const b = el('button', 'btn px calcKey' + (/^\d$|^,$/.test(label) ? ' num' : '') + (v === 'equals' ? ' main' : '') + (/^[÷×−+]$/.test(label) ? ' op' : '') + (v === 'clear' || v === 'back' ? ' del' : '') + (wide ? ' wide' : '') + (v === 'mode' ? ' mode' : ''), label);
    if (v === 'mode') b.title = 'Degrés ou radians';
    b.onclick = () => {
      const inp = $('calcIn');
      if (v === 'clear') inp.value = ''; else if (v === 'back') inp.value = inp.value.slice(0, -1); else if (v === 'equals') return calcEquals(); else if (v === 'mode') calcDeg = !calcDeg;
      else { const a = inp.selectionStart ?? inp.value.length, z = inp.selectionEnd ?? a; inp.value = inp.value.slice(0, a) + v + inp.value.slice(z); inp.selectionStart = inp.selectionEnd = a + v.length; }
      calcRender(); inp.focus();
    };
    return b;
  }));
  $('calcIn').oninput = calcRender;
  $('calcIn').onkeydown = e => { if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calcEquals(); } if (e.key === 'Escape') { $('calcIn').value = ''; calcRender(); } };
  $('calcClearHist').onclick = () => { calcHist = []; try { localStorage.neoCalc = '[]'; } catch {} calcRender(); };
  // ---- fin ----
  ctx.onOpen(() => { calcRender(); setTimeout(() => $('calcIn').focus()); });
}
