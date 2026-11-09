/* =========================================================
   יומן · לוח שנה אישי
   JavaScript רגיל, ללא תלויות. הנתונים נשמרים ב-LocalStorage.
   ========================================================= */
(() => {
  'use strict';

  /* ---------------- אייקונים (בסגנון Lucide, קוויים) ---------------- */
  const ICONS = {
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    calendarPlus: '<path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M19 16v6"/><path d="M16 19h6"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    bookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    basket: '<path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    squareCheck: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
    circleCheck: '<circle cx="12" cy="12" r="9.5"/><path d="m9 12 2 2 4-4"/>',
    star: '<path d="M12 2.5l2.9 5.9 6.6 1-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.5 9.4l6.6-1z"/>',
    stethoscope: '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    tooth: '<path d="M12 5.5C10.5 4 9 3 7 3 4.6 3 3 5 3 7.5c0 2 .8 3.4 1.4 4.8.6 1.4.8 3 1 4.7l.4 2.6c.2 1.2 1.8 1.4 2.3.3l1.4-3.4c.5-1.1 2.5-1.1 3 0l1.4 3.4c.5 1.1 2.1.9 2.3-.3l.4-2.6c.2-1.7.4-3.3 1-4.7.6-1.4 1.4-2.8 1.4-4.8C21 5 19.4 3 17 3c-2 0-3.5 1-5 2.5z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    note: '<path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5Z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/>',
    listChecks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    panel: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
    sidebar: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    viewDay: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M8 15h8"/>',
    viewWeek: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>',
    viewMonth: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>',
    viewYear: '<rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    tag: '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".5"/>',
    text: '<path d="M21 6H3"/><path d="M21 12H9"/><path d="M21 18H7"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/>'
  };
  const icon = (name, size = 18) =>
    `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  function hydrateIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach(el => {
      if (!el.querySelector('svg')) el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon, +el.dataset.size || 18));
    });
  }

  /* ---------------- קבועים ---------------- */
  const MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const DAYS_SHORT = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];
  const TYPES = {
    general: { label: 'אירוע כללי', icon: 'star' },
    meeting: { label: 'פגישה', icon: 'calendar' },
    work: { label: 'עבודה', icon: 'briefcase' },
    doctor: { label: 'תור לרופא', icon: 'stethoscope' },
    dentist: { label: 'תור לרופא שיניים', icon: 'tooth' },
    exam: { label: 'מבחן', icon: 'book' },
    study: { label: 'לימודים', icon: 'bookOpen' },
    birthday: { label: 'יום הולדת', icon: 'gift' },
    shopping: { label: 'קניות', icon: 'basket' },
    payment: { label: 'תשלום', icon: 'wallet' },
    task: { label: 'משימה', icon: 'squareCheck' }
  };
  const PRIORITY = { high: 'חשיבות גבוהה', medium: 'חשיבות בינונית', low: 'חשיבות נמוכה' };
  const PRIORITY_SHORT = { high: 'גבוהה', medium: 'בינונית', low: 'נמוכה' };
  const PRIO_RANK = { high: 0, medium: 1, low: 2 };
  const REMINDER_OPTS = [['', 'ללא תזכורת'], [0, 'בזמן האירוע'], [5, '5 דקות לפני'], [15, '15 דקות לפני'], [30, 'חצי שעה לפני'], [60, 'שעה לפני'], [1440, 'יום לפני']];
  const HOUR = 52;
  const KEY = 'yoman-calendar-v1';

  /* ---------------- כלי עזר ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseYMD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const daysInMonth = d => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const addMonths = (d, n) => { const x = new Date(d.getFullYear(), d.getMonth() + n, 1); x.setDate(Math.min(d.getDate(), daysInMonth(x))); return x; };
  const startOfWeek = d => addDays(d, -d.getDay());
  const toMin = t => { if (!t) return null; const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fromMin = m => { m = Math.max(0, Math.min(1439, Math.round(m))); return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`; };
  const addMin = (t, n) => fromMin(toMin(t) + n);
  const minutesNow = () => { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); };
  const at = (date, time) => { const d = parseYMD(date); const m = toMin(time || '00:00'); d.setHours(Math.floor(m / 60), m % 60, 0, 0); return d.getTime(); };
  const fmtLong = d => `יום ${DAYS[d.getDay()]}, ${d.getDate()} ב${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const fmtShort = d => `${d.getDate()} ב${MONTHS[d.getMonth()]}`;
  function fmtRelDay(dateStr) {
    const t = ymd(today());
    if (dateStr === t) return 'היום';
    if (dateStr === ymd(addDays(today(), 1))) return 'מחר';
    if (dateStr === ymd(addDays(today(), -1))) return 'אתמול';
    const d = parseYMD(dateStr);
    const sameYear = d.getFullYear() === today().getFullYear();
    return `יום ${DAYS_SHORT[d.getDay()]}, ${fmtShort(d)}${sameYear ? '' : ' ' + d.getFullYear()}`;
  }
  function nextRoundHour() { const m = minutesNow(); return fromMin(Math.min(Math.ceil((m + 1) / 60) * 60, 23 * 60)); }

  /* ---------------- אחסון ---------------- */
  function defaultDb() {
    return { events: [], tasks: [], notes: [], reminders: [], settings: { view: 'month', sbCollapsed: false, panelOpen: false, panelTab: 'tasks' } };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw), base = defaultDb();
        return { ...base, ...d, settings: { ...base.settings, ...(d.settings || {}) } };
      }
    } catch (e) { /* נתונים פגומים או אחסון חסום */ }
    const d = defaultDb();
    seed(d);
    return d;
  }
  let storageWarned = false;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch (e) { if (!storageWarned) { storageWarned = true; toastSimple('לא ניתן לשמור בדפדפן זה. השינויים לא יישמרו אחרי סגירה.'); } }
  }

  function seed(d) {
    const T = today(), k = n => ymd(addDays(T, n)), now = Date.now();
    const ev = (o) => ({ id: uid(), location: '', notes: '', reminder: null, reminded: false, allDay: false, sample: true, ...o });
    d.events.push(
      ev({ title: 'פגישת צוות שבועית', type: 'meeting', date: k(0), start: '09:30', end: '10:30', location: 'חדר ישיבות, קומה 3', notes: 'לעבור על סטטוס הפרויקטים ולתאם יעדים לשבוע.' }),
      ev({ title: 'שיעור אנגלית', type: 'study', date: k(0), start: '10:00', end: '11:00', location: 'זום' }),
      ev({ title: 'עבודה על המצגת', type: 'work', date: k(0), start: '14:00', end: '16:00' }),
      ev({ title: 'תור לרופא שיניים', type: 'dentist', date: k(1), start: '16:00', end: '16:45', location: 'מרפאת שיניים, רחוב הרצל 12', reminder: 60 }),
      ev({ title: 'מבחן בסטטיסטיקה', type: 'exam', date: k(2), start: '09:00', end: '12:00', location: 'בניין 7, חדר 210', notes: 'להביא מחשבון ותעודת סטודנט.' }),
      ev({ title: 'תור לרופא משפחה', type: 'doctor', date: k(3), start: '08:30', end: '09:00', location: 'קופת חולים' }),
      ev({ title: 'יום הולדת לאמא', type: 'birthday', date: k(5), allDay: true, start: '00:00', end: '23:59' }),
      ev({ title: 'קניות לשבת', type: 'shopping', date: k(-2), start: '18:00', end: '19:00', location: 'סופרמרקט' }),
      ev({ title: 'תשלום חשבון חשמל', type: 'payment', date: k(6), start: '12:00', end: '12:30' })
    );
    const tk = (o) => ({ id: uid(), desc: '', time: '', priority: 'medium', done: false, created: now, sample: true, ...o });
    d.tasks.push(
      tk({ title: 'להתקשר לבנק', date: k(0), time: '11:30', priority: 'high' }),
      tk({ title: 'לסיים את המצגת', date: k(0), desc: 'להוסיף שקף סיכום וגרפים.' }),
      tk({ title: 'להחזיר ספר לספרייה', date: k(1), priority: 'low' }),
      tk({ title: 'להגיש דוח חודשי', date: k(4), time: '17:00', priority: 'high' }),
      tk({ title: 'לשלם ארנונה', date: k(-1), done: true })
    );
    d.notes.push(
      { id: uid(), title: 'רעיונות לסוף השבוע', content: 'טיול בוקר בפארק\nלנסות את בית הקפה החדש\nלסדר את המרפסת', updated: now - 3600e3, sample: true },
      { id: uid(), title: 'רשימת קניות', content: 'חלב, לחם, ביצים\nפירות וירקות\nקפה', updated: now - 86400e3, sample: true }
    );
    const r = (title, date, time) => ({ id: uid(), title, date, time, done: false, fired: at(date, time) <= now, sample: true });
    d.reminders.push(r('לקחת ויטמינים', k(0), '20:00'), r('להוציא את הכביסה', k(1), '08:00'));
  }

  let db = load();
  const state = {
    view: db.settings.view,
    cursor: today(),
    mini: null,
    taskFilter: 'open',
    noteId: null,
    resetScroll: true,
    sr: [], srIndex: -1
  };

  /* ---------------- אינדקס יומי ---------------- */
  let IDX = new Map();
  function buildIndex() {
    IDX = new Map();
    const g = k => { let v = IDX.get(k); if (!v) { v = { ev: [], tk: [] }; IDX.set(k, v); } return v; };
    db.events.forEach(e => g(e.date).ev.push(e));
    db.tasks.forEach(t => { if (t.date) g(t.date).tk.push(t); });
  }
  const dayItems = k => IDX.get(k) || { ev: [], tk: [] };
  const hasItems = k => { const v = IDX.get(k); return !!v && (v.ev.length + v.tk.length) > 0; };
  function sortedDay(k) {
    const { ev, tk } = dayItems(k);
    return [
      ...ev.map(e => ({ kind: 'event', it: e, s: e.allDay ? -2 : toMin(e.start) })),
      ...tk.map(t => ({ kind: 'task', it: t, s: t.time ? toMin(t.time) : -1 }))
    ].sort((a, b) => a.s - b.s);
  }

  /* ---------------- רינדור כללי ---------------- */
  const app = $('#app'), viewWrap = $('#viewWrap');

  function render() {
    buildIndex();
    renderChrome();
    renderSidebar();
    renderView();
    renderPanel();
  }

  function renderChrome() {
    app.classList.toggle('sb-collapsed', !!db.settings.sbCollapsed);
    app.classList.toggle('panel-open', !!db.settings.panelOpen);
    $('#panelBtn').classList.toggle('is-active', !!db.settings.panelOpen);
    document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === state.view));
    $('#periodTitle').textContent = periodTitle();
    positionPill();
  }

  function positionPill() {
    const seg = $('#viewSeg'), act = seg.querySelector('button.is-active'), pill = seg.querySelector('.seg-pill');
    if (!act) return;
    pill.style.left = act.offsetLeft + 'px';
    pill.style.width = act.offsetWidth + 'px';
  }

  function periodTitle() {
    const c = state.cursor;
    switch (state.view) {
      case 'day': return fmtLong(c);
      case 'week': {
        const s = startOfWeek(c), e = addDays(s, 6);
        if (s.getMonth() === e.getMonth()) return `${s.getDate()}–${e.getDate()} ב${MONTHS[s.getMonth()]} ${s.getFullYear()}`;
        if (s.getFullYear() === e.getFullYear()) return `${fmtShort(s)} – ${fmtShort(e)} ${e.getFullYear()}`;
        return `${fmtShort(s)} ${s.getFullYear()} – ${fmtShort(e)} ${e.getFullYear()}`;
      }
      case 'month': return `${MONTHS[c.getMonth()]} ${c.getFullYear()}`;
      default: return String(c.getFullYear());
    }
  }

  /* ---------------- סרגל צדדי ---------------- */
  function miniMonthHTML(y, m, opts = {}) {
    const first = new Date(y, m, 1), start = startOfWeek(first);
    const weeks = opts.fixed ? 6 : Math.ceil((first.getDay() + daysInMonth(first)) / 7);
    const t = ymd(today()), sel = opts.selected;
    let h = `<div class="mini-grid">${DAYS_SHORT.map(d => `<div class="dn">${d}</div>`).join('')}`;
    for (let i = 0; i < weeks * 7; i++) {
      const d = addDays(start, i), k = ymd(d), other = d.getMonth() !== m;
      if (other && opts.hideOther) { h += '<span></span>'; continue; }
      const cls = ['mini-day', other && 'is-other', k === t && 'is-today', k === sel && 'is-selected', hasItems(k) && 'has-items'].filter(Boolean).join(' ');
      h += `<button type="button" class="${cls}" ${opts.attr}="${k}" aria-label="${fmtLong(d)}">${d.getDate()}</button>`;
    }
    return h + '</div>';
  }

  function renderSidebar() {
    $('#collapseBtn').innerHTML = icon('sidebar', 20);
    // לוח שנה קטן
    const mm = state.mini || new Date(state.cursor.getFullYear(), state.cursor.getMonth(), 1);
    $('#miniCal').innerHTML = `
      <div class="mc-top">
        <span class="mc-title">${MONTHS[mm.getMonth()]} ${mm.getFullYear()}</span>
        <span class="arrows">
          <button type="button" class="icon-btn sm" data-mini-nav="-1" aria-label="חודש קודם">${icon('chevronRight', 16)}</button>
          <button type="button" class="icon-btn sm" data-mini-nav="1" aria-label="חודש הבא">${icon('chevronLeft', 16)}</button>
        </span>
      </div>
      ${miniMonthHTML(mm.getFullYear(), mm.getMonth(), { fixed: true, selected: ymd(state.cursor), attr: 'data-mini-date' })}`;

    // משימות
    const t = ymd(today());
    const todays = db.tasks.filter(x => !x.done && x.date && x.date <= t).sort(taskSort);
    $('#taskBadge').textContent = todays.length || '';
    $('#sbTasks').innerHTML = todays.length
      ? todays.slice(0, 4).map(x => `
        <div class="sb-item">
          <button type="button" class="check sm" data-toggle-task="${x.id}" aria-label="סימון כהושלמה">${icon('check', 11)}</button>
          <button type="button" class="t" style="text-align:start" data-edit-task="${x.id}">${esc(x.title)}</button>
          <span class="m">${x.date < t ? 'באיחור' : (x.time || '')}</span>
        </div>`).join('') + (todays.length > 4 ? `<button type="button" class="sb-item" data-open-panel="tasks"><span class="t">ועוד ${todays.length - 4}…</span></button>` : '')
      : `<div class="sb-empty">אין משימות פתוחות להיום</div>`;

    // פתקים
    const notes = [...db.notes].sort((a, b) => b.updated - a.updated);
    $('#noteBadge').textContent = notes.length || '';
    $('#sbNotes').innerHTML = notes.length
      ? notes.slice(0, 3).map(n => `<button type="button" class="sb-item" data-open-note="${n.id}"><span class="t">${esc(n.title || 'פתק ללא כותרת')}</span></button>`).join('')
      : `<div class="sb-empty">עוד אין פתקים</div>`;

    // תזכורות
    const rems = upcomingReminders();
    $('#remBadge').textContent = rems.length || '';
    $('#sbReminders').innerHTML = rems.length
      ? rems.slice(0, 3).map(r => `<button type="button" class="sb-item" data-open-panel="reminders"><span class="t">${esc(r.title)}</span><span class="m">${r.date === t ? r.time : fmtRelDay(r.date).replace(/^יום /, '')}</span></button>`).join('')
      : `<div class="sb-empty">אין תזכורות קרובות</div>`;

    const hasSample = ['events', 'tasks', 'notes', 'reminders'].some(c => db[c].some(x => x.sample));
    $('#sbFoot').innerHTML = hasSample ? `<button type="button" class="link-btn" data-clear-samples>הסרת נתוני הדוגמה</button>` : '';
  }

  const upcomingReminders = () => db.reminders.filter(r => !r.done).sort((a, b) => at(a.date, a.time) - at(b.date, b.time));
  function taskSort(a, b) {
    return (a.date || '9999').localeCompare(b.date || '9999') || (a.time || '99').localeCompare(b.time || '99') || PRIO_RANK[a.priority] - PRIO_RANK[b.priority];
  }

  /* ---------------- תצוגות ---------------- */
  function renderView() {
    const prev = $('#tgScroll');
    const prevTop = prev ? prev.scrollTop : null;
    const v = state.view;
    let html;
    if (v === 'day') html = timeGridHTML([state.cursor], true);
    else if (v === 'week') html = timeGridHTML(Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(state.cursor), i)), false);
    else if (v === 'month') html = monthHTML();
    else html = yearHTML();
    viewWrap.innerHTML = `<div class="view view-${v}">${html}</div>`;
    if (!state.resetScroll) viewWrap.firstElementChild.style.animation = 'none';

    const sc = $('#tgScroll');
    if (sc) {
      if (state.resetScroll || prevTop == null) {
        const showsToday = !!sc.querySelector('.tg-col.is-today');
        const h = showsToday ? Math.max(0, minutesNow() / 60 - 2) : 7.5;
        sc.scrollTop = h * HOUR;
      } else sc.scrollTop = prevTop;
    }
    state.resetScroll = false;
  }

  function layoutCols(items) {
    items.sort((a, b) => a.s - b.s || b.e - a.e);
    let cluster = [], end = -1;
    const flush = () => {
      const cols = [];
      cluster.forEach(it => {
        let i = cols.findIndex(e => e <= it.s);
        if (i < 0) { i = cols.length; cols.push(0); }
        cols[i] = it.e; it.col = i;
      });
      cluster.forEach(it => { it.ncol = cols.length; });
      cluster = [];
    };
    items.forEach(it => {
      if (cluster.length && it.s >= end) flush();
      cluster.push(it); end = Math.max(end, it.e);
    });
    if (cluster.length) flush();
    return items;
  }

  function chipHTML(x, showTime = true) {
    const it = x.it;
    if (x.kind === 'event') {
      const ty = TYPES[it.type] || TYPES.general;
      return `<button type="button" class="chip ${it.allDay ? 'is-allday' : ''}" data-kind="event" data-id="${it.id}">${icon(ty.icon, 14)}${showTime && !it.allDay ? `<span class="tm">${it.start}</span>` : ''}<span class="t">${esc(it.title)}</span></button>`;
    }
    return `<button type="button" class="chip is-task ${it.done ? 'is-done' : ''}" data-kind="task" data-id="${it.id}">${icon(it.done ? 'circleCheck' : 'squareCheck', 14)}${showTime && it.time ? `<span class="tm">${it.time}</span>` : ''}<span class="t">${esc(it.title)}</span></button>`;
  }

  function blockHTML(x, dateStr) {
    const it = x.it;
    const top = x.s / 60 * HOUR;
    const height = Math.max((x.e - x.s) / 60 * HOUR - 2, 20);
    const w = 100 / x.ncol, right = x.col * w;
    const short = height < 40;
    const past = at(dateStr, fromMin(x.e)) < Date.now();
    const style = `top:${top}px;height:${height}px;right:calc(${right}% + 2px);width:calc(${w}% - 6px)`;
    if (x.kind === 'event') {
      const ty = TYPES[it.type] || TYPES.general;
      const meta = `${it.start}–${it.end}${it.location ? ' · ' + esc(it.location) : ''}`;
      return `<div class="ev ${short ? 'is-short' : ''} ${past ? 'is-past' : ''}" style="${style}" data-kind="event" data-id="${it.id}" role="button" tabindex="0">
        <div class="ev-title">${icon(ty.icon, 14)}<span>${esc(it.title)}</span></div><div class="ev-meta">${meta}</div></div>`;
    }
    return `<div class="ev is-task is-short ${it.done ? 'is-done' : ''} ${past ? 'is-past' : ''}" style="${style}" data-kind="task" data-id="${it.id}" role="button" tabindex="0">
      <div class="ev-title">${icon(it.done ? 'circleCheck' : 'squareCheck', 14)}<span>${esc(it.title)}</span></div></div>`;
  }

  function timeGridHTML(days, isDay) {
    const t = ymd(today());
    let h = `<div class="tg-scroll" id="tgScroll"><div class="tg ${isDay ? 'is-day' : 'is-week'}" style="--cols:${days.length}">`;
    h += `<div class="tg-sticky"><div class="tg-row"><div class="tg-gutter"></div>` +
      days.map(d => {
        const k = ymd(d);
        return `<button type="button" class="tg-dayhead ${k === t ? 'is-today' : ''}" ${isDay ? '' : `data-goto-day="${k}" title="מעבר לתצוגה יומית"`}>
          <span class="dn">${isDay ? 'יום ' + DAYS[d.getDay()] : DAYS[d.getDay()]}</span><span class="dd">${d.getDate()}</span></button>`;
      }).join('') + `</div>`;
    h += `<div class="tg-row tg-allday"><div class="tg-gutter">כל היום</div>` +
      days.map(d => {
        const k = ymd(d);
        const list = sortedDay(k).filter(x => x.kind === 'event' ? x.it.allDay : !x.it.time);
        return `<div class="tg-allday-cell ${k === t ? 'is-today' : ''}" data-allday="${k}">${list.map(x => chipHTML(x, false)).join('')}</div>`;
      }).join('') + `</div></div>`;

    h += `<div class="tg-row tg-body"><div class="tg-hours">${Array.from({ length: 24 }, (_, i) => `<div class="tg-hour-label"><span>${pad(i)}:00</span></div>`).join('')}</div>`;
    h += days.map(d => {
      const k = ymd(d), { ev, tk } = dayItems(k), items = [];
      ev.forEach(e => {
        if (e.allDay) return;
        const s = toMin(e.start); let en = toMin(e.end);
        if (en == null || en <= s) en = Math.min(s + 60, 1440);
        items.push({ kind: 'event', it: e, s, e: en });
      });
      tk.forEach(x => { if (x.time) { const s = toMin(x.time); items.push({ kind: 'task', it: x, s, e: Math.min(s + 30, 1440) }); } });
      layoutCols(items);
      return `<div class="tg-col ${k === t ? 'is-today' : ''}" data-col-date="${k}">
        ${items.map(x => blockHTML(x, k)).join('')}
        ${k === t ? `<div class="now-line" style="top:${minutesNow() / 60 * HOUR}px"></div>` : ''}
        <div class="slot-hint"></div></div>`;
    }).join('');
    return h + `</div></div></div>`;
  }

  function monthHTML() {
    const c = state.cursor, first = new Date(c.getFullYear(), c.getMonth(), 1), start = startOfWeek(first);
    const weeks = Math.ceil((first.getDay() + daysInMonth(first)) / 7);
    const t = ymd(today()), sel = ymd(c), MAX = 3;
    let cells = '';
    for (let i = 0; i < weeks * 7; i++) {
      const d = addDays(start, i), k = ymd(d), list = sortedDay(k);
      const cls = ['mcell', d.getMonth() !== c.getMonth() && 'is-other', k === t && 'is-today', k === sel && 'is-selected'].filter(Boolean).join(' ');
      const shown = list.length > MAX ? MAX - 1 : MAX;
      cells += `<div class="${cls}" data-day-cell="${k}">
        <div class="mcell-top"><span class="mnum">${d.getDate()}</span>
          <button type="button" class="mcell-add" data-add-date="${k}" aria-label="הוספה ל-${fmtShort(d)}" title="הוספה">${icon('plus', 16)}</button></div>
        <div class="mcell-items">${list.slice(0, shown).map(x => chipHTML(x)).join('')}</div>
        ${list.length > shown ? `<button type="button" class="mcell-more" data-day-cell-more="${k}">עוד ${list.length - shown}</button>` : ''}
      </div>`;
    }
    return `<div class="month">
      <div class="month-head">${DAYS.map(d => `<div>${d}</div>`).join('')}</div>
      <div class="month-grid" style="grid-template-rows:repeat(${weeks}, minmax(108px, 1fr))">${cells}</div></div>`;
  }

  function yearHTML() {
    const y = state.cursor.getFullYear(), t = today();
    let h = '<div class="year"><div class="year-grid">';
    for (let m = 0; m < 12; m++) {
      let cnt = 0;
      const pre = `${y}-${pad(m + 1)}-`;
      IDX.forEach((v, k) => { if (k.startsWith(pre)) cnt += v.ev.length + v.tk.length; });
      const cur = t.getFullYear() === y && t.getMonth() === m;
      h += `<div class="ym ${cur ? 'is-current' : ''}">
        <button type="button" class="ym-title" data-goto-month="${y}-${m}"><span class="nm">${MONTHS[m]}</span><span class="cnt">${cnt ? cnt + ' פריטים' : ''}</span></button>
        ${miniMonthHTML(y, m, { hideOther: true, attr: 'data-goto-day' })}</div>`;
    }
    return h + '</div></div>';
  }

  /* ---------------- פאנל: משימות / פתקים / תזכורות ---------------- */
  function renderPanel(force) {
    const tab = db.settings.panelTab;
    document.querySelectorAll('#panelTabs [data-tab]').forEach(b => b.classList.toggle('is-active', b.dataset.tab === tab));
    if (!force && tab === 'notes' && state.noteId && $('#noteEditor')?.dataset.id === state.noteId) return;
    const body = $('#panelBody');
    body.innerHTML = tab === 'tasks' ? tasksTabHTML() : tab === 'notes' ? notesTabHTML() : remindersTabHTML();
    if (tab === 'notes' && state.noteId) {
      const ta = $('#neContent');
      if (ta && !$('#neTitle').value) $('#neTitle').focus();
    }
  }

  function taskRowHTML(x) {
    const t = ymd(today());
    const late = !x.done && x.date && x.date < t;
    const meta = [];
    if (x.date) meta.push(`<span class="${late ? 'late' : ''}">${icon('calendar', 13)}${fmtRelDay(x.date)}${x.time ? ' · ' + x.time : ''}</span>`);
    meta.push(`<span class="prio" data-p="${x.priority}">${icon('flag', 13)}${PRIORITY_SHORT[x.priority]}</span>`);
    return `<div class="task ${x.done ? 'is-done' : ''}">
      <button type="button" class="check ${x.done ? 'is-on' : ''}" data-toggle-task="${x.id}" aria-label="${x.done ? 'סימון כלא הושלמה' : 'סימון כהושלמה'}">${icon('check', 13)}</button>
      <div class="task-body" data-edit-task="${x.id}">
        <div class="task-title">${esc(x.title)}</div>
        ${x.desc ? `<div class="task-desc">${esc(x.desc)}</div>` : ''}
        <div class="task-meta">${meta.join('')}</div>
      </div>
      <div class="row-actions">
        <button type="button" class="icon-btn sm" data-edit-task="${x.id}" aria-label="עריכה">${icon('pencil', 15)}</button>
        <button type="button" class="icon-btn sm" data-del-task="${x.id}" aria-label="מחיקה">${icon('trash', 15)}</button>
      </div></div>`;
  }

  function tasksTabHTML() {
    const t = ymd(today()), weekEnd = ymd(addDays(startOfWeek(today()), 6));
    const f = state.taskFilter;
    const list = db.tasks.filter(x => f === 'all' || (f === 'done' ? x.done : !x.done)).sort(taskSort);
    const groups = [
      ['באיחור', x => !x.done && x.date && x.date < t],
      ['היום', x => x.date === t],
      ['בהמשך השבוע', x => x.date > t && x.date <= weekEnd],
      ['משימות עתידיות', x => x.date > weekEnd],
      ['ללא תאריך יעד', x => !x.date],
      ['קודמות', x => x.done && x.date && x.date < t]
    ];
    let h = `
      <form class="quick-add" data-form="quick-task">
        <input name="title" placeholder="הוספת משימה מהירה להיום…" autocomplete="off" maxlength="120" aria-label="משימה חדשה">
        <button type="submit" class="icon-btn" aria-label="הוספה">${icon('plus', 18)}</button>
      </form>
      <div class="pn-toolbar">
        <div class="seg">
          ${[['open', 'פתוחות'], ['done', 'הושלמו'], ['all', 'הכל']].map(([k, l]) => `<button type="button" class="${f === k ? 'is-active' : ''}" data-task-filter="${k}" style="${f === k ? 'background:#fff;box-shadow:0 1px 3px rgba(48,56,70,.1)' : ''}">${l}</button>`).join('')}
        </div>
        <button type="button" class="btn btn-soft sm" data-new-task>${icon('plus', 15)}משימה מפורטת</button>
      </div>`;
    if (!list.length) {
      return h + `<div class="empty" style="margin-top:14px">${icon('listChecks', 26)}${f === 'done' ? 'עוד לא הושלמו משימות' : 'אין משימות פתוחות. יום רגוע!'}</div>`;
    }
    const used = new Set();
    groups.forEach(([name, fn]) => {
      const g = list.filter(x => !used.has(x.id) && fn(x));
      if (!g.length) return;
      g.forEach(x => used.add(x.id));
      h += `<div class="pn-section-title"><span>${name}</span><span class="n">${g.length}</span></div><div class="card-list">${g.map(taskRowHTML).join('')}</div>`;
    });
    return h;
  }

  function notesTabHTML() {
    if (state.noteId) {
      const n = db.notes.find(x => x.id === state.noteId);
      if (n) {
        return `<div class="note-editor" id="noteEditor" data-id="${n.id}">
          <div class="ne-top">
            <button type="button" class="icon-btn sm" data-note-back aria-label="חזרה לפתקים">${icon('arrowRight', 17)}</button>
            <span class="ne-status" id="neStatus">${icon('check', 13)}נשמר</span>
            <button type="button" class="icon-btn sm" data-del-note="${n.id}" aria-label="מחיקת פתק">${icon('trash', 16)}</button>
          </div>
          <div class="ne-sheet">
            <input class="ne-title" id="neTitle" placeholder="כותרת" value="${esc(n.title)}" maxlength="120">
            <textarea class="ne-content" id="neContent" placeholder="כתבו כאן…">${esc(n.content)}</textarea>
            <div class="ne-foot" id="neFoot">עודכן ${fmtStamp(n.updated)}</div>
          </div></div>`;
      }
      state.noteId = null;
    }
    const notes = [...db.notes].sort((a, b) => b.updated - a.updated);
    return `<button type="button" class="btn btn-soft" data-new-note style="width:100%;justify-content:center;height:40px">${icon('plus', 16)}פתק חדש</button>
      ${notes.length ? `<div class="notes-grid">${notes.map(n => `
        <button type="button" class="note-card" data-open-note="${n.id}">
          <h4>${esc(n.title || 'ללא כותרת')}</h4>
          <p>${esc(n.content || '')}</p>
          <time>${fmtStamp(n.updated)}</time>
        </button>`).join('')}</div>`
        : `<div class="empty" style="margin-top:12px">${icon('note', 26)}כאן יופיעו הפתקים שלך.<br>כל מה שתכתבו נשמר אוטומטית.</div>`}`;
  }
  function fmtStamp(ms) {
    const d = new Date(ms), k = ymd(d), time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return `${fmtRelDay(k)} · ${time}`;
  }

  function remWhenHTML(r) {
    const ts = at(r.date, r.time), now = Date.now();
    let cls = '', extra = '';
    if (!r.done && ts < now) { cls = 'late'; extra = ' · עבר המועד'; }
    else if (!r.done && ts - now < 3600e3) cls = 'soon';
    return `<div class="rem-when ${cls}">${icon('clock', 13)}${fmtRelDay(r.date)} · ${r.time}${extra}</div>`;
  }
  function remindersTabHTML() {
    const up = upcomingReminders();
    const done = db.reminders.filter(r => r.done).sort((a, b) => at(b.date, b.time) - at(a.date, a.time)).slice(0, 20);
    const row = r => `<div class="rem ${r.done ? 'is-done' : ''}">
      <button type="button" class="check ${r.done ? 'is-on' : ''}" data-toggle-rem="${r.id}" aria-label="סימון כהושלמה">${icon('check', 13)}</button>
      <div class="rem-body"><div class="rem-title">${esc(r.title)}</div>${remWhenHTML(r)}</div>
      <div class="row-actions"><button type="button" class="icon-btn sm" data-del-rem="${r.id}" aria-label="מחיקה">${icon('trash', 15)}</button></div></div>`;
    const sameDay = ymd(today());
    const time = nextRoundHour();
    return `<form class="rem-form" data-form="reminder">
        <input class="ttl" name="title" placeholder="על מה להזכיר לך?" autocomplete="off" maxlength="120" aria-label="תוכן התזכורת">
        <div class="row">
          <input class="input sm" type="date" name="date" value="${sameDay}" aria-label="תאריך">
          <input class="input sm" type="time" name="time" value="${time}" aria-label="שעה">
          <button type="submit" class="btn btn-primary sm">הוספה</button>
        </div>
        <div class="err" id="remErr"></div>
      </form>
      <div class="pn-section-title"><span>תזכורות קרובות</span><span class="n">${up.length || ''}</span></div>
      ${up.length ? `<div class="card-list">${up.map(row).join('')}</div>` : `<div class="empty">${icon('bell', 26)}אין תזכורות פתוחות</div>`}
      ${done.length ? `<div class="pn-section-title"><span>הושלמו</span><span class="n">${done.length}</span></div><div class="card-list">${done.map(row).join('')}</div>` : ''}
      <p style="font-size:11.5px;color:var(--ink-3);padding:14px 4px 0">התראות מוצגות כל עוד האפליקציה פתוחה בדפדפן.</p>`;
  }

  function openPanel(tab) {
    if (tab) db.settings.panelTab = tab;
    db.settings.panelOpen = true;
    if (tab !== 'notes') state.noteId = state.noteId && tab === undefined ? state.noteId : null;
    save(); renderChrome(); renderPanel(true);
    closeMobileSidebar();
  }
  function closePanel() { leaveNoteEditor(); db.settings.panelOpen = false; save(); renderChrome(); }

  /* ---------------- פתקים: שמירה אוטומטית ---------------- */
  let noteTimer = null;
  function onNoteInput() {
    const n = db.notes.find(x => x.id === state.noteId);
    if (!n) return;
    $('#neStatus').innerHTML = 'שומר…';
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => {
      n.title = $('#neTitle').value;
      n.content = $('#neContent').value;
      n.updated = Date.now();
      delete n.sample;
      save();
      const st = $('#neStatus'); if (st) st.innerHTML = `${icon('check', 13)}נשמר`;
      const ft = $('#neFoot'); if (ft) ft.textContent = 'עודכן ' + fmtStamp(n.updated);
      buildIndex(); renderSidebar();
    }, 350);
  }
  function flushNote() {
    if (!noteTimer || !state.noteId) return;
    clearTimeout(noteTimer); noteTimer = null;
    const n = db.notes.find(x => x.id === state.noteId), ti = $('#neTitle');
    if (n && ti) { n.title = ti.value; n.content = $('#neContent').value; n.updated = Date.now(); save(); }
  }
  function leaveNoteEditor() {
    flushNote();
    const n = db.notes.find(x => x.id === state.noteId);
    if (n && !n.title.trim() && !n.content.trim()) db.notes = db.notes.filter(x => x !== n);
    state.noteId = null;
    save();
  }
  function openNote(id) {
    leaveNoteEditor();
    state.noteId = id;
    db.settings.panelTab = 'notes';
    db.settings.panelOpen = true;
    save(); renderChrome(); renderSidebar(); renderPanel(true);
    closeMobileSidebar();
    setTimeout(() => { const c = $('#neContent'); if (c && $('#neTitle').value) { c.focus(); c.setSelectionRange(c.value.length, c.value.length); } }, 50);
  }

  /* ---------------- מודאלים ---------------- */
  const modalRoot = $('#modalRoot');
  let modalEl = null;
  function openModal(html, cls = '') {
    hideTooltip();
    if (modalEl) modalEl.remove();
    modalRoot.innerHTML = `<div class="overlay"><div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div></div>`;
    modalEl = modalRoot.firstElementChild;
    modalEl.addEventListener('mousedown', e => { if (e.target === modalEl) closeModal(); });
    hydrateIcons(modalEl);
    return modalEl.querySelector('.modal');
  }
  function closeModal() {
    if (!modalEl) return;
    const el = modalEl; modalEl = null;
    el.classList.add('is-closing');
    setTimeout(() => el.remove(), 140);
  }

  /* ----- עורך אירוע / משימה ----- */
  function openEditor(opts = {}) {
    const isEdit = !!opts.id;
    let mode = opts.mode || 'event';
    const src = isEdit ? (mode === 'event' ? db.events : db.tasks).find(x => x.id === opts.id) : null;
    if (isEdit && !src) return;
    const baseDate = opts.date || (isVisible(ymd(today())) ? ymd(today()) : ymd(state.cursor));
    const start = opts.start || (baseDate === ymd(today()) ? nextRoundHour() : '09:00');
    const draft = {
      title: '', type: opts.type || 'general', date: baseDate, start, end: opts.end || addMin(start, 60), allDay: false,
      location: '', notes: '', reminder: '', desc: '', time: opts.time || '', priority: 'medium', dateOn: true,
      ...(src ? JSON.parse(JSON.stringify(src)) : {})
    };
    if (src && mode === 'event') draft.reminder = src.reminder == null ? '' : src.reminder;
    if (src && mode === 'task') draft.dateOn = !!src.date;
    if (!draft.date) draft.date = baseDate;

    const modal = openModal('', 'editor-modal');

    const paint = () => {
      const modeSeg = isEdit ? '' : `<div class="mode-seg" role="tablist">
          <button type="button" class="${mode === 'event' ? 'is-active' : ''}" data-mode="event">${icon('calendar', 15)}אירוע / תור</button>
          <button type="button" class="${mode === 'task' ? 'is-active' : ''}" data-mode="task">${icon('squareCheck', 15)}משימה</button></div>`;
      const head = `<div class="m-head"><h2>${isEdit ? (mode === 'event' ? 'עריכת אירוע' : 'עריכת משימה') : 'יצירה חדשה'}</h2>
          <button type="button" class="icon-btn" data-close-modal aria-label="סגירה">${icon('x', 18)}</button></div>`;
      const foot = `<div class="m-foot">
          ${isEdit ? `<button type="button" class="btn btn-danger" data-editor-delete>${icon('trash', 16)}מחיקה</button>` : ''}
          <span class="spacer"></span>
          <button type="button" class="btn btn-ghost" data-close-modal>ביטול</button>
          <button type="submit" class="btn btn-primary">שמירה</button></div>`;
      let body;
      if (mode === 'event') {
        body = `
          <div class="field tfield"><input class="title-input" name="title" placeholder="שם האירוע" value="${esc(draft.title)}" maxlength="120" aria-label="שם האירוע"><div class="err" data-err="title"></div></div>
          <div class="field"><span class="lbl-sm">סוג</span>
            <div class="types">${Object.entries(TYPES).map(([k, v]) => `<button type="button" class="type-opt ${draft.type === k ? 'is-active' : ''}" data-type="${k}">${icon(v.icon, 15)}${v.label}</button>`).join('')}</div></div>
          <div class="grid-3">
            <div class="field"><label for="fDate">תאריך</label><input id="fDate" class="input" type="date" name="date" value="${draft.date}" required></div>
            <div class="field"><label for="fStart">שעת התחלה</label><input id="fStart" class="input" type="time" name="start" value="${draft.start}" ${draft.allDay ? 'disabled' : ''}></div>
            <div class="field"><label for="fEnd">שעת סיום</label><input id="fEnd" class="input" type="time" name="end" value="${draft.end}" ${draft.allDay ? 'disabled' : ''}></div>
          </div>
          <label class="toggle"><input type="checkbox" name="allDay" ${draft.allDay ? 'checked' : ''}><span class="sw"></span>אירוע לכל היום</label>
          <div class="err" data-err="time"></div>
          <div class="grid-2">
            <div class="field"><label for="fLoc">מקום</label><div class="with-ic"><span data-icon="mapPin" data-size="16"></span><input id="fLoc" class="input" name="location" placeholder="הוספת מיקום" value="${esc(draft.location)}" maxlength="160"></div></div>
            <div class="field"><label for="fRem">תזכורת</label><div class="with-ic"><span data-icon="bell" data-size="16"></span>
              <select id="fRem" class="select" name="reminder">${REMINDER_OPTS.map(([v, l]) => `<option value="${v}" ${String(draft.reminder) === String(v) ? 'selected' : ''}>${l}</option>`).join('')}</select></div></div>
          </div>
          <div class="field"><label for="fNotes">תיאור והערות</label><textarea id="fNotes" class="textarea" name="notes" placeholder="פרטים נוספים, קישורים, מה להביא…">${esc(draft.notes)}</textarea></div>`;
      } else {
        body = `
          <div class="field tfield"><input class="title-input" name="title" placeholder="מה צריך לעשות?" value="${esc(draft.title)}" maxlength="120" aria-label="כותרת המשימה"><div class="err" data-err="title"></div></div>
          <div class="field"><label for="fDesc">תיאור</label><textarea id="fDesc" class="textarea" name="desc" placeholder="פרטים נוספים (לא חובה)">${esc(draft.desc)}</textarea></div>
          <div class="grid-2">
            <div class="field"><label for="fTDate">תאריך יעד</label><input id="fTDate" class="input" type="date" name="date" value="${draft.dateOn ? draft.date : ''}"></div>
            <div class="field"><label for="fTime">שעה (לא חובה)</label><input id="fTime" class="input" type="time" name="time" value="${draft.time || ''}"></div>
          </div>
          <div class="field"><span class="lbl-sm">רמת חשיבות</span>
            <div class="prio-seg">${['low', 'medium', 'high'].map(p => `<button type="button" class="${draft.priority === p ? 'is-active' : ''}" data-prio="${p}">${icon('flag', 14)}${PRIORITY_SHORT[p]}</button>`).join('')}</div></div>`;
      }
      modal.innerHTML = `<form class="editor" novalidate style="display:contents">${head}<div class="m-body">${modeSeg}${body}</div>${foot}</form>`;
      hydrateIcons(modal);
    };

    const sync = () => {
      const f = modal.querySelector('form');
      if (!f) return;
      const fd = new FormData(f);
      draft.title = fd.get('title') ?? draft.title;
      if (mode === 'event') {
        draft.date = fd.get('date') || draft.date;
        if (fd.has('start')) draft.start = fd.get('start') || draft.start;
        if (fd.has('end')) draft.end = fd.get('end') || draft.end;
        draft.allDay = !!f.allDay.checked;
        draft.location = fd.get('location') || '';
        draft.notes = fd.get('notes') || '';
        draft.reminder = fd.get('reminder');
      } else {
        draft.desc = fd.get('desc') || '';
        const dv = fd.get('date');
        draft.dateOn = !!dv; if (dv) draft.date = dv;
        draft.time = fd.get('time') || '';
      }
    };

    paint();
    setTimeout(() => modal.querySelector('.title-input')?.focus(), 30);

    let lastStart = draft.start;
    modal.addEventListener('input', e => {
      if (e.target.name === 'start' && mode === 'event') {
        // שמירה על משך האירוע בעת שינוי שעת ההתחלה
        const dur = toMin(draft.end) - toMin(lastStart);
        sync();
        if (dur > 0 && draft.start) { draft.end = addMin(draft.start, dur); modal.querySelector('[name=end]').value = draft.end; }
        lastStart = draft.start;
      } else sync();
      if (e.target.name === 'title') modal.querySelector('.tfield').classList.remove('has-error');
    });
    modal.addEventListener('change', e => {
      sync();
      if (e.target.name === 'allDay') { modal.querySelector('[name=start]').disabled = draft.allDay; modal.querySelector('[name=end]').disabled = draft.allDay; }
    });
    modal.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.mode && b.dataset.mode !== mode) { sync(); mode = b.dataset.mode; paint(); modal.querySelector('.title-input')?.focus(); }
      else if (b.dataset.type) { draft.type = b.dataset.type; modal.querySelectorAll('.type-opt').forEach(x => x.classList.toggle('is-active', x === b)); }
      else if (b.dataset.prio) { draft.priority = b.dataset.prio; modal.querySelectorAll('[data-prio]').forEach(x => x.classList.toggle('is-active', x === b)); }
      else if ('closeModal' in b.dataset) closeModal();
      else if ('editorDelete' in b.dataset) { closeModal(); removeItem(mode === 'event' ? 'events' : 'tasks', src.id, mode === 'event' ? 'האירוע נמחק' : 'המשימה נמחקה'); }
    });
    modal.addEventListener('submit', e => {
      e.preventDefault();
      sync();
      const title = (draft.title || '').trim();
      const err = (k, msg) => { const el = modal.querySelector(`[data-err="${k}"]`); if (el) el.textContent = msg; };
      err('title', ''); err('time', '');
      if (!title) {
        err('title', 'יש להזין שם');
        const tf = modal.querySelector('.tfield'); tf.classList.add('has-error');
        tf.classList.remove('shake'); void tf.offsetWidth; tf.classList.add('shake');
        modal.querySelector('.title-input').focus();
        return;
      }
      if (mode === 'event') {
        if (!draft.date) { err('time', 'יש לבחור תאריך'); return; }
        if (!draft.allDay && toMin(draft.end) <= toMin(draft.start)) { err('time', 'שעת הסיום צריכה להיות אחרי שעת ההתחלה'); return; }
        const data = {
          title, type: draft.type, date: draft.date, start: draft.allDay ? '00:00' : draft.start, end: draft.allDay ? '23:59' : draft.end,
          allDay: draft.allDay, location: draft.location.trim(), notes: draft.notes.trim(),
          reminder: draft.reminder === '' || draft.reminder == null ? null : Number(draft.reminder), reminded: false
        };
        const wasTask = isEdit ? null : null; void wasTask;
        if (isEdit) { Object.assign(src, data); delete src.sample; }
        else db.events.push({ id: uid(), ...data });
        // אם תזכורת כבר חלפה בזמן השמירה – לא להקפיץ התראה מיותרת
        const ev = isEdit ? src : db.events[db.events.length - 1];
        if (ev.reminder != null && eventRemindAt(ev) <= Date.now() - 60e3) ev.reminded = true;
      } else {
        const data = { title, desc: draft.desc.trim(), date: draft.dateOn ? draft.date : '', time: draft.dateOn ? draft.time : '', priority: draft.priority };
        if (isEdit) { Object.assign(src, data); delete src.sample; }
        else db.tasks.push({ id: uid(), done: false, created: Date.now(), ...data });
      }
      save();
      closeModal();
      if (draft.date && (mode === 'event' || draft.dateOn) && !isVisible(draft.date)) { state.cursor = parseYMD(draft.date); state.mini = null; state.resetScroll = true; }
      render();
      toastSimple(isEdit ? 'השינויים נשמרו' : (mode === 'event' ? 'האירוע נוסף ללוח' : 'המשימה נוספה'));
    });
  }

  function isVisible(dateStr) {
    const d = parseYMD(dateStr), c = state.cursor;
    switch (state.view) {
      case 'day': return ymd(c) === dateStr;
      case 'week': { const s = startOfWeek(c); return d >= s && d <= addDays(s, 6); }
      case 'month': return d.getMonth() === c.getMonth() && d.getFullYear() === c.getFullYear();
      default: return d.getFullYear() === c.getFullYear();
    }
  }

  /* ----- פרטי אירוע ----- */
  function reminderLabel(v) { const o = REMINDER_OPTS.find(([k]) => String(k) === String(v ?? '')); return o ? o[1] : ''; }
  function openEventDetails(id) {
    const e = db.events.find(x => x.id === id); if (!e) return;
    const ty = TYPES[e.type] || TYPES.general;
    const d = parseYMD(e.date);
    const dur = toMin(e.end) - toMin(e.start);
    const durTxt = dur >= 60 ? `${Math.floor(dur / 60)} ש׳${dur % 60 ? ` ו-${dur % 60} דק׳` : ''}` : `${dur} דק׳`;
    const modal = openModal(`
      <div class="dt-head">
        <div class="dt-icon">${icon(ty.icon, 22)}</div>
        <div class="grow"><div class="dt-type">${ty.label}</div><h2 class="dt-title">${esc(e.title)}</h2></div>
        <button type="button" class="icon-btn" data-close-modal aria-label="סגירה">${icon('x', 18)}</button>
      </div>
      <div class="dt-rows">
        <div class="dt-row"><span data-icon="clock"></span><div class="v">${fmtLong(d)}<div class="s">${e.allDay ? 'כל היום' : `${e.start}–${e.end} · ${durTxt}`}</div></div></div>
        ${e.location ? `<div class="dt-row"><span data-icon="mapPin"></span><div class="v">${esc(e.location)}</div></div>` : ''}
        ${e.reminder != null ? `<div class="dt-row"><span data-icon="bell"></span><div class="v">${reminderLabel(e.reminder)}</div></div>` : ''}
        ${e.notes ? `<div class="dt-row"><span data-icon="text"></span><div class="v">${esc(e.notes)}</div></div>` : ''}
      </div>
      <div class="m-foot">
        <button type="button" class="btn btn-danger" data-act="delete">${icon('trash', 16)}מחיקה</button>
        <span class="spacer"></span>
        <button type="button" class="btn btn-outline" data-act="goto">${icon('viewDay', 16)}לתצוגה יומית</button>
        <button type="button" class="btn btn-primary" data-act="edit">${icon('pencil', 15)}עריכה</button>
      </div>`, 'sm');
    modal.addEventListener('click', ev => {
      const b = ev.target.closest('button'); if (!b) return;
      if ('closeModal' in b.dataset) closeModal();
      else if (b.dataset.act === 'edit') openEditor({ mode: 'event', id });
      else if (b.dataset.act === 'delete') { closeModal(); removeItem('events', id, 'האירוע נמחק'); }
      else if (b.dataset.act === 'goto') { closeModal(); gotoDay(e.date); }
    });
  }

  /* ----- פירוט יום ----- */
  function openDayDetails(k) {
    const d = parseYMD(k), list = sortedDay(k);
    const items = list.map(x => {
      const it = x.it;
      if (x.kind === 'event') {
        const ty = TYPES[it.type] || TYPES.general;
        return `<button type="button" class="day-item" data-kind="event" data-id="${it.id}"><span class="ic-wrap">${icon(ty.icon, 16)}</span>
          <span class="tm">${it.allDay ? 'כל היום' : `${it.start}–${it.end}`}</span>
          <span class="ttl">${esc(it.title)}${it.location ? `<div class="sub">${esc(it.location)}</div>` : ''}</span></button>`;
      }
      return `<button type="button" class="day-item is-task" data-kind="task" data-id="${it.id}"><span class="ic-wrap">${icon(it.done ? 'circleCheck' : 'squareCheck', 16)}</span>
        <span class="tm">${it.time || 'משימה'}</span><span class="ttl ${it.done ? 'done' : ''}">${esc(it.title)}<div class="sub">${PRIORITY[it.priority]}</div></span></button>`;
    }).join('');
    const modal = openModal(`
      <div class="m-head"><h2>${fmtLong(d)}</h2><button type="button" class="icon-btn" data-close-modal aria-label="סגירה">${icon('x', 18)}</button></div>
      <div class="m-body">${list.length ? `<div class="day-list">${items}</div>` : `<div class="empty">${icon('calendar', 26)}אין עדיין אירועים או משימות ביום זה</div>`}</div>
      <div class="m-foot">
        <button type="button" class="btn btn-ghost" data-act="goto">${icon('viewDay', 16)}תצוגה יומית</button>
        <span class="spacer"></span>
        <button type="button" class="btn btn-outline" data-act="task">${icon('squareCheck', 16)}משימה</button>
        <button type="button" class="btn btn-primary" data-act="event">${icon('plus', 16)}אירוע</button>
      </div>`, 'sm');
    modal.addEventListener('click', ev => {
      const b = ev.target.closest('button'); if (!b) return;
      if ('closeModal' in b.dataset) closeModal();
      else if (b.dataset.act === 'goto') { closeModal(); gotoDay(k); }
      else if (b.dataset.act === 'event') openEditor({ date: k });
      else if (b.dataset.act === 'task') openEditor({ date: k, mode: 'task' });
    });
  }

  /* ---------------- פעולות ---------------- */
  function removeItem(coll, id, msg) {
    const arr = db[coll], i = arr.findIndex(x => x.id === id);
    if (i < 0) return;
    const [it] = arr.splice(i, 1);
    if (coll === 'notes' && state.noteId === id) { state.noteId = null; clearTimeout(noteTimer); noteTimer = null; }
    save(); render();
    toastSimple(msg, 'ביטול', () => { db[coll].splice(Math.min(i, db[coll].length), 0, it); save(); render(); });
  }
  function toggleTask(id) {
    const t = db.tasks.find(x => x.id === id); if (!t) return;
    t.done = !t.done; save(); render();
    if (t.done) toastSimple('המשימה הושלמה', 'ביטול', () => { t.done = false; save(); render(); });
  }
  function toggleReminder(id) {
    const r = db.reminders.find(x => x.id === id); if (!r) return;
    r.done = !r.done;
    if (!r.done && at(r.date, r.time) > Date.now()) r.fired = false;
    save(); render();
  }
  function gotoDay(k) { state.cursor = parseYMD(k); state.view = 'day'; state.mini = null; state.resetScroll = true; db.settings.view = 'day'; save(); render(); }
  function setView(v) { if (!['day', 'week', 'month', 'year'].includes(v)) return; state.view = v; db.settings.view = v; state.resetScroll = true; save(); render(); closeMobileSidebar(); }
  function step(dir) {
    const c = state.cursor;
    state.cursor = state.view === 'day' ? addDays(c, dir)
      : state.view === 'week' ? addDays(c, 7 * dir)
        : state.view === 'month' ? addMonths(c, dir)
          : new Date(c.getFullYear() + dir, c.getMonth(), Math.min(c.getDate(), 28));
    state.mini = null; state.resetScroll = true; render();
  }
  function goToday() { state.cursor = today(); state.mini = null; state.resetScroll = true; render(); }
  function openItem(kind, id) {
    if (kind === 'event') openEventDetails(id);
    else openEditor({ mode: 'task', id });
  }
  function closeMobileSidebar() { app.classList.remove('sb-mobile-open'); }

  /* ---------------- טיפ (Tooltip) ---------------- */
  const tip = $('#tooltip');
  let tipTimer = null, tipFor = null;
  function tooltipHTML(kind, id) {
    if (kind === 'event') {
      const e = db.events.find(x => x.id === id); if (!e) return '';
      const ty = TYPES[e.type] || TYPES.general;
      return `<div class="tt-title">${esc(e.title)}</div>
        <div class="tt-row">${icon('clock', 14)}${e.allDay ? 'כל היום' : `${e.start}–${e.end}`} · ${fmtRelDay(e.date)}</div>
        ${e.location ? `<div class="tt-row">${icon('mapPin', 14)}${esc(e.location)}</div>` : ''}
        <div class="tt-row">${icon(ty.icon, 14)}${ty.label}</div>`;
    }
    const t = db.tasks.find(x => x.id === id); if (!t) return '';
    return `<div class="tt-title">${esc(t.title)}</div>
      <div class="tt-row">${icon('clock', 14)}${t.time || 'ללא שעה'} · ${fmtRelDay(t.date)}</div>
      <div class="tt-row">${icon('flag', 14)}${PRIORITY[t.priority]}</div>
      <div class="tt-row">${icon(t.done ? 'circleCheck' : 'squareCheck', 14)}משימה · ${t.done ? 'הושלמה' : 'פתוחה'}</div>`;
  }
  function showTooltip(el) {
    const html = tooltipHTML(el.dataset.kind, el.dataset.id);
    if (!html) return;
    tip.innerHTML = html;
    tip.style.left = '0px'; tip.style.top = '0px';
    const r = el.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    let x = r.left + Math.min(r.width, 220) / 2 - tw / 2;
    if (r.width > 220) x = r.right - 110 - tw / 2;
    x = Math.max(8, Math.min(window.innerWidth - tw - 8, x));
    let y = r.top - th - 8;
    if (y < 8) y = Math.min(r.bottom + 8, window.innerHeight - th - 8);
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
    tip.classList.add('is-on');
  }
  function hideTooltip() { clearTimeout(tipTimer); tipFor = null; tip.classList.remove('is-on'); }
  viewWrap.addEventListener('mouseover', e => {
    const el = e.target.closest('[data-kind][data-id]');
    if (el === tipFor) return;
    hideTooltip();
    if (!el) return;
    tipFor = el;
    tipTimer = setTimeout(() => showTooltip(el), 280);
  });
  viewWrap.addEventListener('mouseleave', hideTooltip);
  viewWrap.addEventListener('scroll', hideTooltip, true);

  /* ---------------- רמז משבצת זמן ---------------- */
  viewWrap.addEventListener('mousemove', e => {
    const col = e.target.closest('.tg-col');
    viewWrap.querySelectorAll('.slot-hint.show').forEach(h => { if (!col || h.parentElement !== col) h.classList.remove('show'); });
    if (!col) return;
    const hint = col.querySelector('.slot-hint');
    if (e.target.closest('.ev')) { hint.classList.remove('show'); return; }
    const y = e.clientY - col.getBoundingClientRect().top;
    const m = Math.max(0, Math.min(1410, Math.floor(y / HOUR * 2) * 30));
    hint.style.top = (m / 60 * HOUR) + 'px';
    hint.textContent = fromMin(m);
    hint.classList.add('show');
  });

  /* ---------------- התראות (Toasts) ---------------- */
  const toasts = $('#toasts');
  function dismissToast(el) { if (!el.isConnected || el.classList.contains('is-out')) return; el.classList.add('is-out'); setTimeout(() => el.remove(), 200); }
  function toastSimple(msg, actionLabel, onAction, ms = 4200) {
    const el = document.createElement('div');
    el.className = 'toast simple';
    el.innerHTML = `<span class="msg">${esc(msg)}</span>${actionLabel ? `<button type="button" class="btn">${esc(actionLabel)}</button>` : ''}`;
    if (actionLabel) el.querySelector('button').addEventListener('click', () => { onAction(); dismissToast(el); });
    toasts.appendChild(el);
    while (toasts.querySelectorAll('.toast.simple').length > 3) toasts.querySelector('.toast.simple').remove();
    setTimeout(() => dismissToast(el), ms);
  }
  function toastReminder({ kicker, title, sub, iconName = 'bell', actions = [] }) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'alert');
    el.innerHTML = `<div class="toast-ic ring">${icon(iconName, 19)}</div>
      <div class="toast-body"><div class="toast-k">${esc(kicker)}</div><div class="toast-title">${esc(title)}</div>${sub ? `<div class="toast-sub">${esc(sub)}</div>` : ''}
        <div class="toast-actions">${actions.map((a, i) => `<button type="button" class="btn sm ${a.primary ? 'btn-primary' : 'btn-outline'}" data-i="${i}">${esc(a.label)}</button>`).join('')}
        <button type="button" class="btn sm btn-ghost" data-i="x">סגירה</button></div></div>`;
    el.addEventListener('click', e => {
      const b = e.target.closest('button[data-i]'); if (!b) return;
      if (b.dataset.i !== 'x') actions[+b.dataset.i].fn();
      dismissToast(el);
    });
    toasts.appendChild(el);
    chime();
  }
  function chime() {
    try {
      const A = window.AudioContext || window.webkitAudioContext; if (!A) return;
      const ctx = chime.ctx || (chime.ctx = new A());
      if (ctx.state === 'suspended') ctx.resume();
      [784, 1175].forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime + i * 0.16;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.06, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
        o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.65);
      });
    } catch (e) { /* אין שמע */ }
  }

  /* ---------------- בדיקת תזכורות ---------------- */
  const eventRemindAt = e => at(e.date, e.allDay ? '09:00' : e.start) - (e.reminder || 0) * 60e3;
  function checkReminders() {
    const now = Date.now();
    let changed = false;
    db.reminders.forEach(r => {
      if (r.done || r.fired) return;
      const ts = at(r.date, r.time);
      if (ts > now) return;
      r.fired = true; changed = true;
      if (now - ts > 7 * 864e5) return; // ישן מדי – בלי התראה
      const late = now - ts > 5 * 60e3;
      toastReminder({
        kicker: late ? 'תזכורת שהוחמצה' : 'הגיע מועד התזכורת',
        title: r.title, sub: `${fmtRelDay(r.date)} · ${r.time}`,
        actions: [
          { label: 'סימון כבוצע', primary: true, fn: () => { r.done = true; save(); render(); } },
          { label: 'נודניק 10 דק׳', fn: () => { const d = new Date(Date.now() + 10 * 60e3); r.date = ymd(d); r.time = `${pad(d.getHours())}:${pad(d.getMinutes())}`; r.fired = false; save(); render(); } }
        ]
      });
    });
    db.events.forEach(e => {
      if (e.reminder == null || e.reminded) return;
      const ts = eventRemindAt(e);
      if (ts > now) return;
      e.reminded = true; changed = true;
      const startTs = at(e.date, e.allDay ? '23:59' : e.end);
      if (now > startTs) return; // האירוע כבר הסתיים
      const ty = TYPES[e.type] || TYPES.general;
      toastReminder({
        kicker: `תזכורת · ${ty.label}`, iconName: ty.icon, title: e.title,
        sub: `${fmtRelDay(e.date)} · ${e.allDay ? 'כל היום' : e.start}${e.location ? ' · ' + e.location : ''}`,
        actions: [{ label: 'פרטים', primary: true, fn: () => openEventDetails(e.id) }]
      });
    });
    if (changed) { save(); render(); }
  }

  /* ---------------- חיפוש ---------------- */
  const sInput = $('#searchInput'), sRes = $('#searchResults');
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function hl(text, q) { return esc(text).replace(new RegExp(reEsc(esc(q)), 'gi'), m => `<mark>${m}</mark>`); }
  function snippet(text, q) {
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text.slice(0, 60);
    const s = Math.max(0, i - 24);
    return (s ? '…' : '') + text.slice(s, i + q.length + 36).replace(/\n/g, ' ');
  }
  function runSearch() {
    const q = sInput.value.trim();
    state.sr = []; state.srIndex = -1;
    if (!q) { sRes.classList.remove('is-open'); sRes.innerHTML = ''; return; }
    const ql = q.toLowerCase(), has = s => (s || '').toLowerCase().includes(ql);
    const groups = [
      ['אירועים', db.events.filter(e => has(e.title) || has(e.location) || has(e.notes)).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map(e => ({
        kind: 'event', id: e.id, ic: (TYPES[e.type] || TYPES.general).icon, title: e.title,
        sub: `${fmtRelDay(e.date)}${e.allDay ? '' : ' · ' + e.start}${e.location ? ' · ' + e.location : ''}`, subQ: !has(e.title) && has(e.notes) ? snippet(e.notes, q) : null
      }))],
      ['משימות', db.tasks.filter(t => has(t.title) || has(t.desc)).slice(0, 6).map(t => ({
        kind: 'task', id: t.id, ic: t.done ? 'circleCheck' : 'squareCheck', title: t.title,
        sub: `${t.date ? fmtRelDay(t.date) : 'ללא תאריך'}${t.done ? ' · הושלמה' : ''}`, subQ: !has(t.title) ? snippet(t.desc, q) : null
      }))],
      ['פתקים', db.notes.filter(n => has(n.title) || has(n.content)).slice(0, 6).map(n => ({
        kind: 'note', id: n.id, ic: 'note', title: n.title || 'ללא כותרת', sub: '', subQ: snippet(n.content || '', q)
      }))],
      ['תזכורות', db.reminders.filter(r => has(r.title)).slice(0, 4).map(r => ({
        kind: 'reminder', id: r.id, ic: 'bell', title: r.title, sub: `${fmtRelDay(r.date)} · ${r.time}`
      }))]
    ];
    let h = '';
    groups.forEach(([name, list]) => {
      if (!list.length) return;
      h += `<div class="sr-group">${name}</div>`;
      list.forEach(r => {
        const i = state.sr.push(r) - 1;
        h += `<button type="button" class="sr-item" data-sr="${i}" role="option">
          <span class="sr-ic">${icon(r.ic, 16)}</span>
          <span class="sr-text"><div class="sr-title">${hl(r.title, q)}</div><div class="sr-sub">${r.subQ ? hl(r.subQ, q) : esc(r.sub)}</div></span></button>`;
      });
    });
    sRes.innerHTML = h || `<div class="sr-empty">לא נמצאו תוצאות עבור „${esc(q)}”</div>`;
    sRes.classList.add('is-open');
  }
  function setSrActive(i) {
    const items = sRes.querySelectorAll('.sr-item');
    if (!items.length) return;
    state.srIndex = (i + items.length) % items.length;
    items.forEach((el, j) => el.classList.toggle('is-active', j === state.srIndex));
    items[state.srIndex].scrollIntoView({ block: 'nearest' });
  }
  function openResult(r) {
    sRes.classList.remove('is-open');
    sInput.blur();
    if (r.kind === 'event') {
      const e = db.events.find(x => x.id === r.id); if (!e) return;
      state.cursor = parseYMD(e.date); state.mini = null; state.resetScroll = true;
      if (state.view === 'year') { state.view = 'day'; db.settings.view = 'day'; }
      render(); openEventDetails(r.id);
    } else if (r.kind === 'task') {
      const t = db.tasks.find(x => x.id === r.id); if (!t) return;
      if (t.date) { state.cursor = parseYMD(t.date); state.mini = null; state.resetScroll = true; render(); }
      openEditor({ mode: 'task', id: r.id });
    } else if (r.kind === 'note') openNote(r.id);
    else openPanel('reminders');
  }
  sInput.addEventListener('input', runSearch);
  sInput.addEventListener('focus', () => { if (sInput.value.trim()) runSearch(); });
  sInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSrActive(state.srIndex + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSrActive(state.srIndex - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); const r = state.sr[Math.max(0, state.srIndex)]; if (r) openResult(r); }
    else if (e.key === 'Escape') { e.stopPropagation(); if (sInput.value) { sInput.value = ''; runSearch(); } else sInput.blur(); }
  });
  sRes.addEventListener('mousedown', e => e.preventDefault());
  sRes.addEventListener('click', e => { const b = e.target.closest('[data-sr]'); if (b) openResult(state.sr[+b.dataset.sr]); });
  sInput.addEventListener('blur', () => setTimeout(() => sRes.classList.remove('is-open'), 120));

  /* ---------------- אירועי לחיצה (האצלה) ---------------- */
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('.search')) return;
    let b;

    if ((b = t.closest('[data-toggle-task]'))) return toggleTask(b.dataset.toggleTask);
    if ((b = t.closest('[data-del-task]'))) return removeItem('tasks', b.dataset.delTask, 'המשימה נמחקה');
    if ((b = t.closest('[data-edit-task]'))) return openEditor({ mode: 'task', id: b.dataset.editTask });
    if ((b = t.closest('[data-toggle-rem]'))) return toggleReminder(b.dataset.toggleRem);
    if ((b = t.closest('[data-del-rem]'))) return removeItem('reminders', b.dataset.delRem, 'התזכורת נמחקה');
    if ((b = t.closest('[data-open-note]'))) return openNote(b.dataset.openNote);
    if ((b = t.closest('[data-del-note]'))) return removeItem('notes', b.dataset.delNote, 'הפתק נמחק');
    if (t.closest('[data-note-back]')) { leaveNoteEditor(); return render(); }
    if (t.closest('[data-new-note]')) {
      const n = { id: uid(), title: '', content: '', updated: Date.now() };
      db.notes.push(n); return openNote(n.id);
    }
    if (t.closest('[data-new-task]')) return openEditor({ mode: 'task', date: ymd(today()) });
    if ((b = t.closest('[data-task-filter]'))) { state.taskFilter = b.dataset.taskFilter; return renderPanel(true); }
    if ((b = t.closest('[data-open-panel]'))) return openPanel(b.dataset.openPanel);
    if ((b = t.closest('#panelTabs [data-tab]'))) { if (db.settings.panelTab !== b.dataset.tab) { leaveNoteEditor(); db.settings.panelTab = b.dataset.tab; save(); renderSidebar(); renderPanel(true); } return; }
    if (t.closest('[data-clear-samples]')) {
      const backup = JSON.stringify(db);
      ['events', 'tasks', 'notes', 'reminders'].forEach(c => { db[c] = db[c].filter(x => !x.sample); });
      state.noteId = null; save(); render();
      return toastSimple('נתוני הדוגמה הוסרו', 'ביטול', () => { db = JSON.parse(backup); save(); render(); }, 6000);
    }

    if (modalEl && modalEl.contains(t)) {
      // בתוך חלון: פתיחת פריט מתוך פירוט יום
      if ((b = t.closest('.day-item[data-kind]'))) openItem(b.dataset.kind, b.dataset.id);
      return;
    }

    if ((b = t.closest('[data-view]'))) return setView(b.dataset.view);
    if ((b = t.closest('[data-mini-nav]'))) {
      const base = state.mini || new Date(state.cursor.getFullYear(), state.cursor.getMonth(), 1);
      state.mini = new Date(base.getFullYear(), base.getMonth() + +b.dataset.miniNav, 1);
      return renderSidebar();
    }
    if ((b = t.closest('[data-mini-date]'))) {
      state.cursor = parseYMD(b.dataset.miniDate);
      state.mini = null; state.resetScroll = true;
      if (state.view === 'year') { state.view = 'day'; db.settings.view = 'day'; save(); }
      closeMobileSidebar();
      return render();
    }
    if ((b = t.closest('[data-goto-day]'))) return gotoDay(b.dataset.gotoDay);
    if ((b = t.closest('[data-goto-month]'))) {
      const [y, m] = b.dataset.gotoMonth.split('-').map(Number);
      state.cursor = new Date(y, m, 1); state.mini = null; return setView('month');
    }
    if ((b = t.closest('[data-kind][data-id]'))) { hideTooltip(); return openItem(b.dataset.kind, b.dataset.id); }
    if ((b = t.closest('[data-add-date]'))) return openEditor({ date: b.dataset.addDate });
    if ((b = t.closest('[data-day-cell-more]'))) return openDayDetails(b.dataset.dayCellMore);
    if ((b = t.closest('[data-day-cell]'))) return openDayDetails(b.dataset.dayCell);
    if ((b = t.closest('[data-allday]'))) return openEditor({ date: b.dataset.allday, mode: 'task' });
    if ((b = t.closest('.tg-col'))) {
      const y = e.clientY - b.getBoundingClientRect().top;
      const m = Math.max(0, Math.min(1410, Math.floor(y / HOUR * 2) * 30));
      return openEditor({ date: b.dataset.colDate, start: fromMin(m), end: fromMin(Math.min(m + 60, 1439)) });
    }
  });

  // מקלדת על בלוקים של אירועים
  viewWrap.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.ev[data-kind]')) { e.preventDefault(); openItem(e.target.dataset.kind, e.target.dataset.id); }
  });

  // טפסים בפאנל
  document.addEventListener('submit', e => {
    const f = e.target;
    if (f.dataset.form === 'quick-task') {
      e.preventDefault();
      const title = f.title.value.trim(); if (!title) return f.title.focus();
      db.tasks.push({ id: uid(), title, desc: '', date: ymd(today()), time: '', priority: 'medium', done: false, created: Date.now() });
      save(); render();
      $('#panelBody [data-form="quick-task"] input')?.focus();
    } else if (f.dataset.form === 'reminder') {
      e.preventDefault();
      const title = f.title.value.trim(), date = f.date.value, time = f.time.value;
      const er = $('#remErr');
      if (!title) { er.textContent = 'כתבו על מה להזכיר'; return f.title.focus(); }
      if (!date || !time) { er.textContent = 'יש לבחור תאריך ושעה'; return; }
      db.reminders.push({ id: uid(), title, date, time, done: false, fired: false });
      save(); render();
      toastSimple(`תזכורת נקבעה ל${fmtRelDay(date) === 'היום' || fmtRelDay(date) === 'מחר' ? '' : '-'}${fmtRelDay(date)} · ${time}`);
      checkReminders();
    }
  });

  // שמירה אוטומטית של פתקים
  $('#panelBody').addEventListener('input', e => { if (e.target.id === 'neTitle' || e.target.id === 'neContent') onNoteInput(); });

  /* ---------------- כפתורים קבועים ---------------- */
  $('#createBtn').addEventListener('click', () => { closeMobileSidebar(); openEditor({}); });
  $('#todayBtn').addEventListener('click', goToday);
  $('#prevBtn').addEventListener('click', () => step(-1));
  $('#nextBtn').addEventListener('click', () => step(1));
  $('#collapseBtn').addEventListener('click', () => { db.settings.sbCollapsed = !db.settings.sbCollapsed; save(); renderChrome(); setTimeout(positionPill, 300); });
  $('#panelBtn').addEventListener('click', () => (db.settings.panelOpen ? closePanel() : openPanel()));
  $('#panelClose').addEventListener('click', closePanel);
  $('#menuBtn').addEventListener('click', () => app.classList.add('sb-mobile-open'));
  $('#scrim').addEventListener('click', closeMobileSidebar);

  /* ---------------- קיצורי מקלדת ---------------- */
  document.addEventListener('keydown', e => {
    const typing = e.target.closest('input, textarea, select, [contenteditable]');
    if (e.key === 'Escape') {
      if (modalEl) return closeModal();
      if (app.classList.contains('sb-mobile-open')) return closeMobileSidebar();
      if (db.settings.panelOpen && !typing) return closePanel();
      if (typing) e.target.blur();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') { e.preventDefault(); sInput.focus(); sInput.select(); return; }
    if (typing || modalEl || e.ctrlKey || e.metaKey || e.altKey) return;
    const map = { KeyD: () => setView('day'), KeyW: () => setView('week'), KeyM: () => setView('month'), KeyY: () => setView('year'), KeyT: goToday, KeyN: () => openEditor({}), KeyC: () => openEditor({}) };
    if (e.key === '/' || e.code === 'Slash' || e.code === 'Period' && e.key === '/') { e.preventDefault(); sInput.focus(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); return step(-1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); return step(1); }
    if (map[e.code]) { e.preventDefault(); map[e.code](); }
  });

  /* ---------------- שעון בזמן אמת ---------------- */
  let lastDay = ymd(today()), lastMinute = -1;
  function tick() {
    const n = new Date();
    $('#nowClock').innerHTML = `${pad(n.getHours())}:${pad(n.getMinutes())}<span class="sec">:${pad(n.getSeconds())}</span>`;
    $('#nowDate').innerHTML = `<b>יום ${DAYS[n.getDay()]}</b> · ${n.getDate()} ב${MONTHS[n.getMonth()]} ${n.getFullYear()}`;
    const m = n.getHours() * 60 + n.getMinutes();
    if (m !== lastMinute) {
      lastMinute = m;
      const line = $('.now-line'); if (line) line.style.top = (m / 60 * HOUR) + 'px';
      if (ymd(n) !== lastDay) { lastDay = ymd(n); render(); }
    }
    if (n.getSeconds() % 15 === 0) checkReminders();
  }

  /* ---------------- אתחול ---------------- */
  hydrateIcons();
  render();
  tick();
  setInterval(tick, 1000);
  setTimeout(checkReminders, 1200);
  window.addEventListener('resize', positionPill);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(positionPill);
  window.addEventListener('beforeunload', flushNote);
  window.addEventListener('storage', e => { if (e.key === KEY) { db = load(); render(); } });
})();
