// Mock de Supabase con seed real (ocupa los datos reales de la db que esta supabase. Los datos
// fueron extraidos el dia 03/10/2025 y puestos en /seed).


const staffSeed = require('./seeds/staff.json');
const requestSeed = require('./seeds/request.json');
const qrSeed = require('./seeds/qr.json');
const qrScanLogSeed = require('./seeds/qr_scan_log.json');
const pageSeed = require('./seeds/page.json');
const pageViewLogSeed = require('./seeds/page_view_log.json');

const clone = v => JSON.parse(JSON.stringify(v));
const nowIso = () => new Date().toISOString();

let INITIAL_DB = {
  staff: staffSeed,
  request: requestSeed,
  qr: qrSeed,
  qr_scan_log: qrScanLogSeed,
  page: pageSeed,
  page_view_log: pageViewLogSeed
};
let DB = clone(INITIAL_DB);

const FORCED_ERRORS = Object.fromEntries(Object.keys(DB).map(t => [t, {}]));

const nextId = (table) => {
  const rows = DB[table];
  if (!rows.length) return 1;
  return Math.max(...rows.map(r => Number(r.id))) + 1;
};
const applyFilters = (rows, filters) =>
  rows.filter(r => filters.every(([k, v]) => String(r[k]) === String(v)));
const formatError = (err) => {
  if (!err) return { message: 'Unknown error' };
  if (typeof err === 'string') return { message: err };
  if (err instanceof Error) return { message: err.message };
  if (typeof err === 'object' && err.message) return err;
  return { message: String(err) };
};

const opError = (table, op) => {
  const err = FORCED_ERRORS[table]?.[op];
  return err ? { data: null, error: formatError(err) } : null;
};

const ensureError = (value) => (value ? formatError(value) : null);

function buildResponse(rows, wantSingle) {
  if (wantSingle) {
    const single = rows[0] ?? null;
    if (!single) {
      return { data: null, error: { message: 'No rows found' } };
    }
    return { data: single, error: null };
  }
  return { data: rows, error: null };
}

function from(table) {
  if (!DB[table]) throw new Error(`Tabla inexistente en mock: ${table}`);

  let filters = [];
  let wantSingle = false;
  let returning = false;
  let op = 'select';
  let payload = null;

  const execute = async () => {
    switch (op) {
      case 'select': {
        const err = opError(table, 'select');
        if (err) return err;
        const rows = clone(DB[table]);
        const filtered = filters.length ? applyFilters(rows, filters) : rows;
        return buildResponse(filtered, wantSingle);
      }
      case 'insert': {
        const err = opError(table, 'insert');
        if (err) return err;
        const rows = Array.isArray(payload) ? payload : [payload];
        const inserted = rows.map(row => {
          const id = row.id ?? nextId(table);
          const obj = {
            ...row,
            id,
            created_at: row.created_at ?? nowIso(),
            updated_at: row.updated_at ?? nowIso()
          };
          DB[table].push(obj);
          return clone(obj);
        });

        if (!returning) {
          return { data: returning ? inserted : [], error: null };
        }
        return buildResponse(inserted, wantSingle);
      }
      case 'update': {
        const err = opError(table, 'update');
        if (err) return err;
        let updated = [];
        DB[table] = DB[table].map(r => {
          const match = filters.every(([k, v]) => String(r[k]) === String(v));
          if (!match) return r;
          const nr = { ...r, ...payload, updated_at: nowIso() };
          updated.push(clone(nr));
          return nr;
        });

        if (!returning) {
          return { data: returning ? updated : [], error: null };
        }
        return buildResponse(updated, wantSingle);
      }
      case 'delete': {
        const err = opError(table, 'delete');
        if (err) return err;
        const all = DB[table];
        const toDelete = all.filter(r => filters.every(([k, v]) => String(r[k]) === String(v)));
        DB[table] = all.filter(r => !toDelete.includes(r));
        if (!returning) {
          return { data: returning ? toDelete : [], error: null };
        }
        return buildResponse(toDelete, wantSingle);
      }
      default:
        return { data: null, error: { message: `Operación no soportada: ${op}` } };
    }
  };

  const api = {
    select() {
      if (op === 'select') {
        return api;
      }
      returning = true;
      return api;
    },

    insert(rows) {
      op = 'insert';
      payload = rows;
      returning = false;
      return api;
    },

    update(patch) {
      op = 'update';
      payload = patch;
      returning = false;
      return api;
    },

    delete() {
      op = 'delete';
      payload = null;
      returning = false;
      return api;
    },

    eq(col, val) {
      filters.push([col, val]);
      return api;
    },

    single() {
      wantSingle = true;
      return api;
    },

    then(resolve, reject) {
      return execute().then(resolve, reject);
    },

    catch(reject) {
      return execute().catch(reject);
    },

    finally(handler) {
      return execute().finally(handler);
    }
  };

  return api;
}

// helpers para tests
function resetMockData(seed) {
  DB = clone(seed || INITIAL_DB);
  Object.keys(FORCED_ERRORS).forEach(t => (FORCED_ERRORS[t] = {}));
}
function setError(table, op, message) {
  if (!FORCED_ERRORS[table]) FORCED_ERRORS[table] = {};
  FORCED_ERRORS[table][op] = ensureError(message) || { message: 'Forced error' };
}

module.exports = { from, __mock: { resetMockData, setError, _db: () => clone(DB) } };
