const express = require('express');
const router = express.Router();

// Optional stocks route stub — prevents startup warning when the real
// implementation is not present. This is intentionally minimal and safe
// to leave as-is; replace with real handlers if you implement stocks.
router.get('/', (req, res) => {
  return res.json({ success: true, message: 'Stocks endpoint placeholder' });
});

module.exports = router;
const express = require('express');
const router = express.Router();

// GET /api/stocks/quotes?symbols=NVDA,AMD
router.get('/quotes', async (req, res) => {
  try {
    const raw = (req.query.symbols || '').toString();
    const symbols = raw.split(',').map(s => (s||'').trim().toUpperCase()).filter(Boolean);
    if (!symbols.length) return res.json({ ok: true, data: {} });

    // Prefer server-side Yahoo query to avoid CORS and rate-limits on client
    const url = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + encodeURIComponent(symbols.join(','));
    const resp = await fetch(url, { cache: 'no-store' });
    if (!resp.ok) {
      const text = await resp.text().catch(()=>'');
      return res.status(502).json({ ok: false, error: 'provider_error', detail: text });
    }
    const j = await resp.json().catch(()=>null);
    const out = {};
    if (j && j.quoteResponse && Array.isArray(j.quoteResponse.result)) {
      j.quoteResponse.result.forEach(q => {
        out[q.symbol] = {
          price: (typeof q.regularMarketPrice === 'number') ? q.regularMarketPrice : null,
          changePct: (typeof q.regularMarketChangePercent === 'number') ? q.regularMarketChangePercent : null,
          raw: q
        };
      });
    }
    return res.json({ ok: true, data: out });
  } catch (err) {
    console.error('stocks proxy error', err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

module.exports = router;
