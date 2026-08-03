(function(){
  // Filtro/ricerca "progressive enhancement" sull'indice statico delle poesie.
  // L'elenco esiste già, completo, nell'HTML: qui lo filtriamo e riordiniamo lato client.
  const list = document.getElementById('poesie-sidebar-list');
  const searchEl = document.getElementById('poesie-search');
  const sortEl = document.getElementById('poesie-sort');
  const catEl = document.getElementById('poesie-categoria');
  const countEl = document.getElementById('poesie-count');
  if(!list) return;

  const items = Array.from(list.querySelectorAll('li'));

  function apply(){
    const q = (searchEl && searchEl.value.trim().toLowerCase()) || '';
    const cat = (catEl && catEl.value) || '';
    let visible = 0;

    items.forEach(li => {
      const titolo = li.dataset.titolo || '';
      const categoria = li.dataset.categoria || '';
      const matchQ = !q || titolo.includes(q);
      const matchCat = !cat || categoria === cat;
      const show = matchQ && matchCat;
      li.classList.toggle('hidden', !show);
      if(show) visible++;
    });

    if(countEl) countEl.textContent = `${visible} / ${items.length} poesie`;

    const mode = (sortEl && sortEl.value) || 'id';
    if(mode !== 'id'){
      const sorted = items.slice().sort((a,b) => {
        if(mode === 'titolo') return a.dataset.titolo.localeCompare(b.dataset.titolo, 'it');
        if(mode === 'categoria') return (a.dataset.categoria||'').localeCompare(b.dataset.categoria||'', 'it');
        if(mode === 'data'){
          const da = a.dataset.data || '';
          const db = b.dataset.data || '';
          if(!da && !db) return 0;
          if(!da) return 1;
          if(!db) return -1;
          return da.localeCompare(db);
        }
        return 0;
      });
      sorted.forEach(li => list.appendChild(li));
    } else {
      items.forEach(li => list.appendChild(li));
    }
  }

  if(searchEl) searchEl.addEventListener('input', apply);
  if(catEl) catEl.addEventListener('change', apply);
  if(sortEl) sortEl.addEventListener('change', apply);
})();
