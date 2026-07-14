// Dynamic filterable table for docs/analyze/features.md
// Fetches table_features_v3.tsv and renders it with accessible
// multi-select filters (Table, Feature) using <details>/<summary>.

// ── Filter state (module-level, reset on each page visit) ─────────────────
const state = {
  table:   new Set(),
  feature: new Set()
}

// ── Parse TSV ──────────────────────────────────────────────────────────────
function parseTsv(text) {
  const lines = text.trim().split('\n')
  return lines.slice(1)                     // skip header row
    .map(line => {
      const parts = line.split('\t')
      return {
        table:       (parts[0] ?? '').trim(),
        feature:     (parts[1] ?? '').trim(),
        description: (parts[2] ?? '').trim(),
        type:        (parts[3] ?? '').trim()
      }
    })
    .filter(r => r.table && r.feature)
}

// ── Sorted unique values ───────────────────────────────────────────────────
function sortedUnique(arr) {
  return [...new Set(arr)].sort((a, b) => a.localeCompare(b))
}

// ── Apply filters — toggle hidden on each <tr> ─────────────────────────────
function applyFilters(tbody, liveRegion, total) {
  let visible = 0
  for (const tr of tbody.rows) {
    const show =
      (state.table.size   === 0 || state.table.has(tr.dataset.table))   &&
      (state.feature.size === 0 || state.feature.has(tr.dataset.feature))
    tr.hidden = !show
    if (show) visible++
  }

  // Re-stripe visible rows — CSS :nth-child counts hidden rows so we own
  // the striping here to keep the pattern consistent after every filter change.
  let stripe = 0
  for (const tr of tbody.rows) {
    if (!tr.hidden) {
      tr.style.background =
        stripe % 2 === 0 ? 'var(--md-default-fg-color--lightest)' : ''
      stripe++
    }
  }

  liveRegion.textContent = `Showing ${visible} of ${total} rows`
}

// ── Update badge and accessible summary label ──────────────────────────────
function updateBadge(details, filterKey, labelText) {
  const filterSet = state[filterKey]
  const badge     = details.querySelector('.filter-badge')
  const summary   = details.querySelector('summary')
  if (!badge || !summary) return
  const n = filterSet.size
  badge.hidden      = n === 0
  badge.textContent = n > 0 ? String(n) : ''
  if (n > 0) {
    summary.setAttribute('aria-label', `${labelText}: ${n} selected`)
  } else {
    summary.removeAttribute('aria-label')
  }
}

// ── Build one filter panel ─────────────────────────────────────────────────
function buildFilter(labelText, key, values, onFilterChange) {
  const filterSet = state[key]

  const groupEl = document.createElement('div')
  groupEl.className = 'filter-group'

  // <details> wrapper
  const details = document.createElement('details')
  details.className = 'filter-dropdown'

  // <summary> — visible trigger button
  const summary = document.createElement('summary')
  const badge   = document.createElement('span')
  badge.className = 'filter-badge'
  badge.hidden    = true
  summary.textContent = labelText + ' '   // text node, then badge appended below
  summary.appendChild(badge)
  details.appendChild(summary)

  // Panel
  const panel = document.createElement('div')
  panel.className = 'filter-panel'

  const groupLabelId = `ftbl-label-${key}`
  const listId       = `ftbl-list-${key}`

  // Visually hidden label for the group
  const groupLabel = document.createElement('span')
  groupLabel.id        = groupLabelId
  groupLabel.className = 'visually-hidden'
  groupLabel.textContent = `Filter by ${labelText}`
  panel.appendChild(groupLabel)

  // Panel is the ARIA group for its checkboxes
  panel.setAttribute('role', 'group')
  panel.setAttribute('aria-labelledby', groupLabelId)

  // Type-to-search input
  const search = document.createElement('input')
  search.type        = 'search'
  search.className   = 'filter-search'
  search.placeholder = `Search ${labelText}\u2026`
  search.setAttribute('aria-label',    `Search ${labelText} options`)
  search.setAttribute('aria-controls', listId)
  search.autocomplete = 'off'
  search.spellcheck   = false
  panel.appendChild(search)

  // Options <ul>
  const list = document.createElement('ul')
  list.id        = listId
  list.className = 'filter-options'

  for (const value of values) {
    const li = document.createElement('li')
    li.className    = 'filter-option'
    li.dataset.value = value

    // Checkbox + label
    const lbl = document.createElement('label')
    lbl.className = 'filter-option-label'

    const cb  = document.createElement('input')
    cb.type  = 'checkbox'
    cb.value = value
    cb.addEventListener('change', () => {
      if (cb.checked) filterSet.add(value)
      else            filterSet.delete(value)
      updateBadge(details, key, labelText)
      onFilterChange()
    })

    lbl.appendChild(cb)
    lbl.appendChild(document.createTextNode('\u00a0' + value))

    // "Only" button
    const onlyBtn = document.createElement('button')
    onlyBtn.type      = 'button'
    onlyBtn.className = 'filter-only-btn'
    onlyBtn.textContent = 'Only'
    onlyBtn.setAttribute('aria-label', `Show only ${value}`)
    onlyBtn.addEventListener('click', () => {
      filterSet.clear()
      filterSet.add(value)
      for (const cb2 of list.querySelectorAll('input[type="checkbox"]')) {
        cb2.checked = cb2.value === value
      }
      updateBadge(details, key, labelText)
      onFilterChange()
    })

    li.appendChild(lbl)
    li.appendChild(onlyBtn)
    list.appendChild(li)
  }

  panel.appendChild(list)

  // "Clear all" button
  const clearBtn = document.createElement('button')
  clearBtn.type      = 'button'
  clearBtn.className = 'filter-clear-btn'
  clearBtn.textContent = 'Clear all'
  clearBtn.setAttribute('aria-label', `Clear all ${labelText} filters`)
  clearBtn.addEventListener('click', () => {
    filterSet.clear()
    for (const cb of list.querySelectorAll('input[type="checkbox"]')) {
      cb.checked = false
    }
    updateBadge(details, key, labelText)
    onFilterChange()
  })
  panel.appendChild(clearBtn)

  details.appendChild(panel)
  groupEl.appendChild(details)

  // Live search: show/hide <li> elements by value text match
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase()
    for (const li of list.children) {
      li.hidden = q !== '' && !li.dataset.value.toLowerCase().includes(q)
    }
  })

  // Close panel when focus leaves <details>
  details.addEventListener('focusout', e => {
    if (!details.contains(e.relatedTarget)) {
      details.open = false
    }
  })

  // Escape closes panel and returns focus to <summary>
  details.addEventListener('keydown', e => {
    if (e.key === 'Escape' && details.open) {
      e.stopPropagation()
      details.open = false
      summary.focus()
    }
  })

  return groupEl
}

// ── Build <table> ──────────────────────────────────────────────────────────
function buildTable(data) {
  const wrap = document.createElement('div')
  wrap.className = 'features-table-wrap'

  const table = document.createElement('table')
  table.className = 'features-table'

  // Visually hidden caption — the page heading already labels the region
  const caption = document.createElement('caption')
  caption.className   = 'visually-hidden'
  caption.textContent = 'TPR-DB Features — use the filters above to narrow results'
  table.appendChild(caption)

  // <thead>
  const thead   = document.createElement('thead')
  const headRow = document.createElement('tr')
  for (const col of ['Table', 'Feature', 'Description', 'Type']) {
    const th   = document.createElement('th')
    th.scope   = 'col'
    th.textContent = col
    headRow.appendChild(th)
  }
  thead.appendChild(headRow)
  table.appendChild(thead)

  // <tbody>
  const tbody = document.createElement('tbody')
  for (const row of data) {
    const tr = document.createElement('tr')
    tr.dataset.table   = row.table
    tr.dataset.feature = row.feature
    for (const val of [row.table, row.feature, row.description, row.type]) {
      const td = document.createElement('td')
      td.textContent = val
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }
  table.appendChild(tbody)
  wrap.appendChild(table)

  return { wrap, tbody }
}

// ── Init ───────────────────────────────────────────────────────────────────
async function init(container) {
  // Idempotency guard — prevents double-init on rapid document$ fires
  if (container.children.length > 0) return

  const tsvPath = container.dataset.tsvPath
  if (!tsvPath) return

  // Fetch and parse the TSV
  let data
  try {
    const url = new URL(tsvPath, window.location.href)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data = parseTsv(await res.text())
  } catch (err) {
    const p = document.createElement('p')
    p.textContent = `Could not load features data: ${err.message}`
    container.appendChild(p)
    return
  }

  // Reset filter state for this visit
  state.table.clear()
  state.feature.clear()

  const tables   = sortedUnique(data.map(r => r.table))
  const features = sortedUnique(data.map(r => r.feature))

  // Live region for screen reader row-count announcements
  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('role', 'status')
  liveRegion.setAttribute('aria-live', 'polite')
  liveRegion.setAttribute('aria-atomic', 'true')
  liveRegion.className = 'visually-hidden'

  // Build table DOM first so tbody is available for the filter callback
  const { wrap: tableWrap, tbody } = buildTable(data)
  const onFilterChange = () => applyFilters(tbody, liveRegion, data.length)

  // Build filter bar
  const filterBar = document.createElement('div')
  filterBar.className = 'features-filters'
  filterBar.appendChild(buildFilter('Table',   'table',   tables,   onFilterChange))
  filterBar.appendChild(buildFilter('Feature', 'feature', features, onFilterChange))

  // Mount everything
  container.appendChild(liveRegion)
  container.appendChild(filterBar)
  container.appendChild(tableWrap)

  // Apply initial striping and set live region text (no filters active yet)
  onFilterChange()
}

// ── Bootstrap ──────────────────────────────────────────────────────────────
function run() {
  const container = document.getElementById('features-app')
  if (container) init(container)
}

// Use document$ observable (required for Zensical instant navigation).
// Fall back to DOMContentLoaded for non-SPA contexts.
if (window.document$) {
  window.document$.subscribe(run)
} else {
  document.addEventListener('DOMContentLoaded', run)
}
