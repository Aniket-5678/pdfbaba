export const generateDomains = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const tlds = ['.com', '.in', '.dev', '.tech', '.xyz', '.io'];
  const suffixes = ['', 'pro', 'official', 'hub', 'web', 'online', 'portfolio', 'site'];

  const suggestions = new Set();

  while (suggestions.size < 10) {
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    suggestions.add(`${name.toLowerCase()}${suffix}${tld}`);
  }

  res.json({ suggestions: Array.from(suggestions) });
};
