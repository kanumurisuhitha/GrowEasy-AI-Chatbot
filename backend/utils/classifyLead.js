const classifyLead = (chatHistory, profile) => {
  const fullChat = chatHistory.map(msg => msg.content.toLowerCase()).join(" ");

  // ✅ First: Extract metadata first
  const keywords = profile.keywords || {};
  const metadata = {};

  for (const [key, values] of Object.entries(keywords)) {
    for (const v of values) {
      if (fullChat.includes(v.toLowerCase())) {
        metadata[key] = v;
        break;
      }
    }
  }

  // 🚫 Invalid detection AFTER checking metadata
  const nonsenseWords = fullChat.match(/\b[a-z]{10,}\b/g);
  const shortSentences = fullChat.split(/[.?!]/).filter(s => s.trim().length > 3);
  const testTriggers = /(asdf|test user|qwerty|xcvb|zxczxc|123456|dummy|bot|^.{1,3}$)/i;

  const hasRealMetadata = Object.keys(metadata).length > 0;

  if (!hasRealMetadata && (
    (nonsenseWords && nonsenseWords.length > 2) ||
    testTriggers.test(fullChat) ||
    shortSentences.length < 2
  )) {
    return {
      status: 'Invalid',
      metadata: {
        reason: 'Gibberish or fake input',
        action: 'Flagged for review'
      }
    };
  }

  // 🎯 Per-Industry Classification
  const industry = (profile.industry || '').toLowerCase();
  const has = (keys) => keys.some(k => metadata[k]);

  let status = 'Cold';

  if (industry === 'real estate') {
    if (has(['propertyTypes', 'purposes']) && has(['urgency'])) {
      status = 'Hot';
    }
  } else if (industry === 'automobile') {
    if (has(['vehicleTypes', 'purposes']) && has(['urgency'])) {
      status = 'Hot';
    }
  } else if (industry === 'education') {
    if (has(['courseTypes', 'purposes']) && has(['urgency'])) {
      status = 'Hot';
    }
  } else {
    if (has(['budget', 'timeline', 'location', 'urgency'])) {
      status = 'Hot';
    }
  }

  return {
    status,
    metadata
  };
};

module.exports = { classifyLead };
