/* ============================================================
   CGAP · blog.js
   Requiere: global.js
   ============================================================ */

// Filter chips
const chips2 = document.querySelectorAll('.blog2-chip');
const blocks = document.querySelectorAll('.blog2-block');
const ctaMid = document.querySelector('.blog2-cta-mid');

chips2.forEach(chip => {
  chip.addEventListener('click', () => {
    chips2.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const cat = chip.dataset.cat;

    document.querySelectorAll('.blog2-card').forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });

    blocks.forEach(block => {
      const blockCat = block.id.replace('block-', '');
      const visible = cat === 'all' || blockCat === cat;
      block.style.display = visible ? '' : 'none';
    });

    if (ctaMid) ctaMid.style.display = (cat === 'all' || cat === 'ginecologia') ? '' : 'none';
  });
});
