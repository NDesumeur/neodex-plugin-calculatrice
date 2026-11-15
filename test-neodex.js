// lancé par le test « local » de NeoDex : la calculatrice grandit avec la fenêtre et tient dans la largeur, et 12×3 donne 36
module.exports = async ({ pj, sleep }) => {
  await sleep(300);
  const r = await pj(`(() => { const k = document.querySelector('#calcKeys .calcKey').getBoundingClientRect(), b = document.querySelector('.calcBody').getBoundingClientRect(); return { h: innerHeight, key: Math.round(k.height), right: Math.round(b.right), w: innerWidth, body: Math.round(b.width) }; })()`);
  if (r.right > r.w + 1) throw new Error('la calculatrice dépasse à droite : ' + JSON.stringify(r));
  if (r.h >= 850 && r.key < 60) throw new Error('touches trop petites pour une grande fenêtre : ' + JSON.stringify(r));
  await pj(`(() => { const i = document.getElementById('calcIn'); i.value = '12×3'; i.dispatchEvent(new Event('input', {bubbles: true})); i.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true})); })(), 0`); await sleep(200);
  const out = await pj(`document.getElementById('calcIn').value + ' | ' + document.getElementById('calcOut').textContent`);
  if (!/36/.test(out)) throw new Error('12×3 : ' + out);
  return 'touches de ' + r.key + ' px, calculatrice de ' + r.body + ' px, 12×3 = 36';
};
