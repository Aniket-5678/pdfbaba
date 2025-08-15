// controllers/domainController.js
export const generateDomains = (req, res) => {
  const { name, category } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  // Category-based TLDs & suffixes
  const categories = {
    tech: {
      tlds: ['.dev', '.io', '.tech', '.app'],
      suffixes: ['', 'pro', 'hub', 'labs', 'tech', 'dev']
    },
    business: {
      tlds: ['.com', '.co', '.biz', '.org'],
      suffixes: ['', 'solutions', 'group', 'corp', 'inc', 'consulting']
    },
    personal: {
      tlds: ['.me', '.xyz', '.online', '.site'],
      suffixes: ['', 'portfolio', 'blog', 'diary', 'life']
    },
    shop: {
      tlds: ['.store', '.shop', '.com', '.online'],
      suffixes: ['', 'store', 'mart', 'shop', 'cart']
    },
    default: {
      tlds: ['.com', '.in', '.xyz', '.net'],
      suffixes: ['', 'web', 'site', 'online']
    }
  };

  // Pick category config or default
  const config = categories[category?.toLowerCase()] || categories.default;

  const suggestions = new Set();
  const baseName = name.trim().toLowerCase().replace(/\s+/g, '');

  // Generate at least 20 unique suggestions
  while (suggestions.size < 20) {
    const tld = config.tlds[Math.floor(Math.random() * config.tlds.length)];
    const suffix = config.suffixes[Math.floor(Math.random() * config.suffixes.length)];

    // Add a small chance of prefixing with "my", "the", etc. for variety
    const prefix = Math.random() < 0.3 ? ['my', 'the', 'best'][Math.floor(Math.random() * 3)] : '';

    suggestions.add(`${prefix ? prefix : ''}${baseName}${suffix}${tld}`);
  }

  res.json({ suggestions: Array.from(suggestions) });
};
