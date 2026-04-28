/* =========================================================
   PROJECT 2 — AI Prompt Library
   main.js — Prompts data, search/filter, canvas, GSAP
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

// ==============================
// PROMPT DATA — 30+ curated prompts
// ==============================
const PROMPTS = [
  // CODING
  {
    id: 'c1', cat: 'coding', title: 'Debug Like a Senior Dev',
    desc: 'Paste any broken code and get a structured diagnosis — cause, fix, and explanation.',
    text: `You are a senior software engineer. I have a bug in my code. Please:\n1. Identify the root cause of the bug\n2. Explain why it's happening in plain English\n3. Provide a fixed version of the code\n4. Suggest how to prevent this type of bug in the future\n\nHere is my code:\n[PASTE YOUR CODE HERE]\n\nError message (if any):\n[PASTE ERROR HERE]`
  },
  {
    id: 'c2', cat: 'coding', title: 'Code Review Expert',
    desc: 'Get a thorough code review covering readability, performance, and security.',
    text: `Act as an experienced code reviewer. Review the following code and provide feedback on:\n1. Code quality and readability\n2. Performance issues or bottlenecks\n3. Security vulnerabilities\n4. Best practices violations\n5. Specific, actionable improvements\n\nBe constructive and explain the reasoning behind each suggestion.\n\nCode to review:\n[PASTE YOUR CODE HERE]\nLanguage/Framework: [SPECIFY]`
  },
  {
    id: 'c3', cat: 'coding', title: 'Algorithm Explainer',
    desc: 'Understand any algorithm step-by-step, like you\'re learning it for the first time.',
    text: `Explain the [ALGORITHM NAME] algorithm to me as if I have a basic understanding of programming but am new to algorithms. Include:\n1. What problem it solves\n2. Step-by-step walkthrough with a simple example\n3. Time and space complexity (in plain English)\n4. When to use it vs. alternatives\n5. A clean, commented code implementation in [LANGUAGE]`
  },
  {
    id: 'c4', cat: 'coding', title: 'Convert Code Between Languages',
    desc: 'Translate code from one language to another while preserving logic and style.',
    text: `Convert the following [SOURCE LANGUAGE] code to [TARGET LANGUAGE]. Requirements:\n- Preserve the exact same logic and behaviour\n- Use idiomatic [TARGET LANGUAGE] patterns and conventions\n- Add brief comments where the translation differs meaningfully\n- Note any limitations or differences in behaviour\n\nSource code:\n[PASTE CODE HERE]`
  },
  {
    id: 'c5', cat: 'coding', title: 'Write Unit Tests',
    desc: 'Generate comprehensive unit tests for any function or module.',
    text: `Write comprehensive unit tests for the following code in [TESTING FRAMEWORK e.g. Jest/PyTest/JUnit]. Include:\n1. Happy path tests (expected inputs)\n2. Edge case tests (empty, null, boundary values)\n3. Error/exception tests\n4. Mock external dependencies if needed\n5. Clear test names that describe what each test verifies\n\nCode to test:\n[PASTE YOUR CODE HERE]`
  },
  {
    id: 'c6', cat: 'coding', title: 'SQL Query Optimiser',
    desc: 'Paste a slow SQL query and get an optimised version with explanation.',
    text: `You are a database performance expert. Analyse and optimise the following SQL query:\n\n[PASTE SQL QUERY]\n\nDatabase: [MySQL/PostgreSQL/SQLite/etc]\nTable sizes approximately: [DESCRIBE]\n\nPlease:\n1. Identify performance bottlenecks\n2. Suggest index improvements\n3. Provide an optimised version of the query\n4. Explain each optimisation made`
  },
  // WRITING
  {
    id: 'w1', cat: 'writing', title: 'Cold Email That Gets Replies',
    desc: 'Write a personalised, non-spammy cold email for any outreach scenario.',
    text: `Write a cold email for the following situation:\n\nWho I am: [YOUR NAME, ROLE]\nWho I'm emailing: [RECIPIENT NAME, COMPANY, ROLE]\nMy goal: [WHAT YOU WANT - meeting, collaboration, job, etc]\nPersonalisation detail: [SOMETHING SPECIFIC ABOUT THEM/THEIR WORK]\n\nRequirements:\n- Subject line that doesn't sound like spam\n- Under 120 words in the body\n- One clear CTA\n- Friendly and human, not salesy\n- No "I hope this email finds you well"`
  },
  {
    id: 'w2', cat: 'writing', title: 'LinkedIn Post That Gets Engagement',
    desc: 'Turn any idea, lesson, or experience into a compelling LinkedIn post.',
    text: `Write a high-engagement LinkedIn post about the following:\n\nTopic/Experience: [DESCRIBE YOUR IDEA OR STORY]\nAudience: [WHO WILL READ THIS e.g. developers, marketers, founders]\nTone: [Thought-leader/Vulnerable/Educational/Inspirational]\n\nFormat requirements:\n- Strong hook in the first line (no "I'm excited to share")\n- Short paragraphs (1-2 sentences max)\n- Personal insight or lesson\n- End with a question to drive comments\n- 150-250 words\n- 3-5 relevant hashtags at the end`
  },
  {
    id: 'w3', cat: 'writing', title: 'Cover Letter Generator',
    desc: 'Write a tailored, honest cover letter that stands out without being cringe.',
    text: `Write a compelling cover letter for this job application:\n\nJob Title: [TITLE]\nCompany: [COMPANY NAME]\nKey Requirements from the JD: [LIST 3-4 REQUIREMENTS]\nMy Relevant Experience: [BRIEFLY DESCRIBE YOUR BACKGROUND]\nWhy this company specifically: [YOUR GENUINE REASON]\n\nTone: Professional but conversational — sounds like a real person, not a template.\nLength: 3 short paragraphs, max 280 words.\nDo NOT use: "I am writing to express my interest" or any generic opener.`
  },
  {
    id: 'w4', cat: 'writing', title: 'Blog Post Outline & Hook',
    desc: 'Create a detailed blog post outline with a compelling intro hook.',
    text: `Create a detailed blog post structure for the topic: "[BLOG TOPIC]"\n\nTarget reader: [DESCRIBE YOUR AUDIENCE]\nDesired outcome: What should the reader know/feel after reading?\n\nProvide:\n1. SEO-friendly title (and 2 alternatives)\n2. Meta description (under 160 characters)\n3. Opening hook paragraph (no "In today's world...")\n4. H2 sections with sub-points for each\n5. Closing CTA\n6. 5 relevant keywords to naturally include`
  },
  {
    id: 'w5', cat: 'writing', title: 'Simplify Technical Writing',
    desc: 'Turn complex technical content into clear, accessible language.',
    text: `Rewrite the following technical text so that someone with no technical background can understand it. Keep all the key information but use:\n- Plain, everyday language\n- Short sentences\n- A helpful analogy if the concept is abstract\n- No jargon (or explain any jargon that's unavoidable)\n\nOriginal text:\n[PASTE YOUR TECHNICAL CONTENT HERE]\n\nTarget audience: [DESCRIBE WHO WILL READ THIS]`
  },
  // DATA
  {
    id: 'd1', cat: 'data', title: 'Data Analysis Plan',
    desc: 'Generate a structured analysis plan for any dataset or business question.',
    text: `I need to analyse the following data to answer this business question:\n\nBusiness Question: [WHAT DO YOU WANT TO KNOW?]\nDataset Description: [DESCRIBE YOUR DATA — size, columns, format]\nData Quality: [Any known issues? Missing values? Duplicates?]\n\nCreate a step-by-step analysis plan including:\n1. Data cleaning steps needed\n2. Exploratory analysis to run first\n3. Key metrics to calculate\n4. Visualisations to create\n5. Statistical tests to apply (if relevant)\n6. How to interpret and present findings`
  },
  {
    id: 'd2', cat: 'data', title: 'Python Data Cleaning Script',
    desc: 'Generate a Pandas script to clean and prepare a messy dataset.',
    text: `Write a Python/Pandas script to clean the following dataset:\n\nDataset description: [DESCRIBE YOUR DATA]\nKnown issues:\n- [ISSUE 1 e.g. missing values in column X]\n- [ISSUE 2 e.g. inconsistent date formats]\n- [ISSUE 3 e.g. duplicate rows]\n\nThe cleaned data should be ready for analysis. Include:\n- Comments explaining each step\n- Print statements showing before/after row counts\n- Output as a cleaned CSV file`
  },
  {
    id: 'd3', cat: 'data', title: 'Insight Narrative Writer',
    desc: 'Turn a table of numbers into a compelling data story for stakeholders.',
    text: `Turn the following data/metrics into a clear narrative for business stakeholders:\n\n[PASTE YOUR DATA OR METRICS HERE]\n\nAudience: [TECHNICAL/NON-TECHNICAL, ROLE]\nContext: [WHAT DOES THIS DATA MEASURE?]\n\nWrite:\n1. Executive summary (3 sentences)\n2. Key findings (3-5 bullet points, each with a "so what")\n3. Recommended actions based on the data\n4. One risk or caveat to flag\n\nUse confident, clear language — no hedging phrases like "it appears that".`
  },
  {
    id: 'd4', cat: 'data', title: 'Dashboard Design Blueprint',
    desc: 'Design a KPI dashboard structure for any business function.',
    text: `Design a KPI dashboard for the following business function:\n\nFunction: [e.g. Customer Support, Sales, Marketing, Operations]\nPrimary audience: [WHO WILL USE THIS DASHBOARD DAILY?]\nKey decisions this dashboard should support: [LIST 2-3]\n\nProvide:\n1. Primary KPIs (3-5) with exact formulas\n2. Secondary supporting metrics (3-5)\n3. Recommended chart types for each metric\n4. Ideal refresh frequency\n5. Alert thresholds to set\n6. Suggested layout (describe sections)`
  },
  {
    id: 'd5', cat: 'data', title: 'Spreadsheet Formula Helper',
    desc: 'Get the exact Excel/Google Sheets formula for any calculation you need.',
    text: `Write a formula for [Excel/Google Sheets] that does the following:\n\nWhat I need: [DESCRIBE WHAT YOU WANT TO CALCULATE]\nMy data is in columns: [e.g. A=date, B=sales, C=category]\nData range: [e.g. rows 2 to 1000]\nEdge cases to handle: [e.g. blank cells, errors, duplicates]\n\nProvide:\n1. The formula\n2. How to use it (which cell to start in)\n3. A brief explanation of how it works\n4. Alternative simpler approach if one exists`
  },
  // CREATIVE
  {
    id: 'cr1', cat: 'creative', title: 'Brand Voice Document',
    desc: 'Define a complete brand voice and tone guide for any product or business.',
    text: `Create a brand voice and tone guide for:\n\nBrand/Product: [NAME AND BRIEF DESCRIPTION]\nTarget audience: [WHO ARE YOUR CUSTOMERS?]\nBrand personality adjectives: [e.g. Bold, Trustworthy, Playful]\nCompetitors to differentiate from: [LIST 2-3]\n\nInclude:\n1. Brand voice in 3 words with explanation for each\n2. Tone variations (how voice adapts to different situations)\n3. Language do's and don'ts (5 each)\n4. Writing examples: product copy, error message, onboarding email\n5. Words/phrases that are on-brand vs. off-brand`
  },
  {
    id: 'cr2', cat: 'creative', title: 'UI Microcopy Writer',
    desc: 'Write thoughtful, clear, and on-brand microcopy for any UI element.',
    text: `Write UI microcopy for the following interface elements. Tone: [FRIENDLY/PROFESSIONAL/PLAYFUL]\nProduct: [WHAT DOES YOUR PRODUCT DO?]\n\nWrite copy for:\n1. Empty state: [DESCRIBE THE FEATURE]\n2. Error message: [DESCRIBE WHAT WENT WRONG]\n3. Success message: [DESCRIBE WHAT SUCCEEDED]\n4. Onboarding tooltip for: [FEATURE NAME]\n5. CTA button: [WHAT ACTION DOES IT TRIGGER]\n6. Confirmation dialog: [WHAT ACTION IS BEING CONFIRMED]\n\nFor each: provide the copy and a 1-line rationale.`
  },
  {
    id: 'cr3', cat: 'creative', title: 'Product Naming Generator',
    desc: 'Generate creative, memorable names for any product, feature, or company.',
    text: `Generate 15 name options for the following:\n\nWhat it is: [DESCRIBE YOUR PRODUCT/FEATURE]\nTarget market: [WHO IS IT FOR?]\nFeel you want: [e.g. Professional, Playful, Technical, Simple]\nNames to avoid (competitors): [LIST]\nConstraints: [e.g. must be .com available, under 10 chars, no made-up words]\n\nFor each name provide:\n- The name\n- Why it works\n- Any risk or downside\n\nGroup by style: Literal, Evocative, Abstract, Compound words`
  },
  {
    id: 'cr4', cat: 'creative', title: 'Story Structure Architect',
    desc: 'Build a compelling 3-act narrative structure for any story or presentation.',
    text: `Create a detailed story structure for the following:\n\nMedium: [FILM/SHORT STORY/PRESENTATION/CASE STUDY]\nCore idea: [ONE SENTENCE DESCRIBING YOUR STORY]\nMain character/protagonist: [DESCRIBE]\nSetting: [WHERE AND WHEN]\nTheme: [THE DEEPER MESSAGE]\n\nProvide:\n1. Inciting incident\n2. Act 1 breakdown with key beats\n3. Midpoint turning point\n4. Act 2 complications\n5. Climax\n6. Resolution\n7. Thematic statement (what the audience takes away)`
  },
  // BUSINESS
  {
    id: 'b1', cat: 'business', title: 'SWOT Analysis Generator',
    desc: 'Get a rigorous SWOT analysis for any business, idea, or decision.',
    text: `Conduct a SWOT analysis for:\n\n[COMPANY/PRODUCT/IDEA/DECISION]\n\nContext: [INDUSTRY, SIZE, STAGE, KEY COMPETITORS]\nTimeframe: [SHORT TERM 0-1yr / LONG TERM 3-5yr]\n\nFor each quadrant provide 4-6 specific, actionable points — not generic platitudes. After the SWOT:\n1. Identify the 2-3 most critical issues\n2. Suggest strategic moves: how to leverage strengths, address weaknesses, capture opportunities, mitigate threats\n3. Overall assessment in 3 sentences`
  },
  {
    id: 'b2', cat: 'business', title: 'Meeting Summariser',
    desc: 'Convert messy meeting notes into a clean, action-oriented summary.',
    text: `Convert the following meeting notes into a professional summary:\n\n[PASTE YOUR MEETING NOTES HERE]\n\nFormat as:\n**Meeting:** [TITLE]\n**Date:** [DATE]\n**Attendees:** [NAMES/ROLES]\n\n**Key Decisions Made:**\n(numbered list)\n\n**Action Items:**\n| Action | Owner | Deadline |\n\n**Open Questions / Parking Lot:**\n(items to resolve later)\n\n**Next Meeting:**\n[DATE/AGENDA]\n\nKeep language crisp. Remove filler. Capture every decision and commitment.`
  },
  {
    id: 'b3', cat: 'business', title: 'OKR Framework Writer',
    desc: 'Create well-structured Objectives and Key Results for any team or company.',
    text: `Write OKRs for the following:\n\nTeam/Department: [e.g. Engineering, Marketing, Product]\nTime period: [Q1 2025 / Annual]\nCompany goal this supports: [DESCRIBE THE BROADER COMPANY GOAL]\nCurrent challenges: [WHAT ARE THE BIGGEST OBSTACLES?]\n\nProvide:\n- 2-3 Objectives (inspiring, qualitative)\n- 3-4 Key Results per objective (measurable, specific, time-bound)\n- One initiative (HOW to achieve) per Key Result\n- A confidence rating (1-10) for each KR with brief reasoning`
  },
  {
    id: 'b4', cat: 'business', title: 'Stakeholder Update Email',
    desc: 'Write a clear, concise stakeholder update for any project status.',
    text: `Write a stakeholder update email for the following project:\n\nProject: [PROJECT NAME]\nAudience: [STAKEHOLDER LEVEL e.g. C-suite, Client, Team]\nPeriod: [WEEK/MONTH/QUARTER]\nStatus: [ON TRACK / AT RISK / DELAYED]\n\nUpdate these areas:\n- Progress: [WHAT WAS COMPLETED]\n- Metrics: [KEY NUMBERS]\n- Issues: [ANY BLOCKERS OR RISKS]\n- Next steps: [WHAT HAPPENS NEXT]\n- Ask: [WHAT DO YOU NEED FROM THEM?]\n\nKeep it under 250 words. Lead with the status. Be direct about problems.`
  },
  {
    id: 'b5', cat: 'business', title: 'Job Description Writer',
    desc: 'Write an inclusive, compelling job description that attracts top candidates.',
    text: `Write a job description for the following role:\n\nRole Title: [TITLE]\nCompany: [COMPANY NAME + 1-line description]\nLevel: [JUNIOR/MID/SENIOR]\nLocation: [ON-SITE/REMOTE/HYBRID + LOCATION]\nKey responsibilities: [LIST 3-5]\nMust-have skills: [LIST]\nNice-to-have skills: [LIST]\nSalary range: [OPTIONAL]\n\nTone: Direct, warm, inclusive. Avoid buzzwords like "rockstar", "ninja", "fast-paced environment". Start with what the role will achieve, not a company description. Use gender-neutral language.`
  }
];

// ==============================
// RENDER PROMPT CARDS
// ==============================
function getCatClass(cat) {
  const map = { coding: 'cat-coding', writing: 'cat-writing', data: 'cat-data', creative: 'cat-creative', business: 'cat-business' };
  return map[cat] || '';
}
function getCatLabel(cat) {
  const map = { coding: 'Coding', writing: 'Writing', data: 'Data', creative: 'Creative', business: 'Business' };
  return map[cat] || cat;
}

function createCard(prompt) {
  const card = document.createElement('div');
  card.className = 'prompt-card';
  card.setAttribute('data-cat', prompt.cat);
  card.setAttribute('data-id', prompt.id);
  card.innerHTML = `
    <div class="prompt-card-header">
      <h3 class="prompt-title">${prompt.title}</h3>
      <span class="prompt-cat-badge ${getCatClass(prompt.cat)}">${getCatLabel(prompt.cat)}</span>
    </div>
    <p class="prompt-desc">${prompt.desc}</p>
    <div class="prompt-preview">${prompt.text.replace(/\n/g, '<br/>')}</div>
    <div class="prompt-actions">
      <button class="copy-btn" data-id="${prompt.id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        Copy Prompt
      </button>
      <button class="expand-btn" data-id="${prompt.id}">
        <span>View</span>
        <svg class="expand-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
    </div>
  `;
  return card;
}

let activeCategory = 'all';
let searchQuery = '';

function renderCards() {
  const grid = document.getElementById('prompt-grid');
  const noResults = document.getElementById('no-results');
  const searchTermEl = document.getElementById('search-term');

  const filtered = PROMPTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.cat === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.text.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  grid.innerHTML = '';
  if (filtered.length === 0) {
    noResults.style.display = 'flex';
    if (searchTermEl) searchTermEl.textContent = searchQuery;
  } else {
    noResults.style.display = 'none';
    filtered.forEach((p, i) => {
      const card = createCard(p);
      card.style.animationDelay = `${i * 0.05}s`;
      grid.appendChild(card);
    });
    attachCardEvents();
  }
}

function attachCardEvents() {
  // Expand/collapse
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.prompt-card');
      card.classList.toggle('expanded');
      btn.querySelector('span').textContent = card.classList.contains('expanded') ? 'Hide' : 'View';
    });
  });

  // Copy
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const prompt = PROMPTS.find(p => p.id === id);
      if (!prompt) return;
      navigator.clipboard.writeText(prompt.text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Prompt`;
        }, 2000);
      }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = prompt.text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy Prompt', 2000);
      });
    });
  });
}

// ==============================
// CATEGORY TABS
// ==============================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    activeCategory = btn.getAttribute('data-cat');
    renderCards();
  });
});

// ==============================
// SEARCH
// ==============================
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim();
  searchClear.classList.toggle('visible', searchQuery.length > 0);
  renderCards();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.classList.remove('visible');
  renderCards();
});

document.getElementById('reset-search-btn')?.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.classList.remove('visible');
  renderCards();
});

// Initial render
renderCards();

// ==============================
// CANVAS PARTICLES
// ==============================
(function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', () => { resize(); init(); });

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.r = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6 ? '57,255,20' : '155,89,182';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`; ctx.fill();
    }
  }
  function init() {
    particles = [];
    const n = Math.min(Math.floor((W * H) / 10000), 100);
    for (let i = 0; i < n; i++) particles.push(new P());
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(draw);
  }
  init(); draw();
})();

// ==============================
// NAV + HAMBURGER
// ==============================
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.background = window.scrollY > 60 ? 'rgba(5,8,14,0.95)' : 'rgba(5,8,14,0.7)';
});
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open'));
});

// ==============================
// GSAP ENTRANCE ANIMATIONS
// ==============================
gsap.timeline({ delay: 0.2 })
  .from('.hero-badge', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' })
  .from('.hero-title', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.4')
  .from('.hero-sub', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.5')
  .from('.hero-search', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4');

gsap.from('.stat-item', { scrollTrigger: { trigger: '.stats-bar', start: 'top 85%' }, opacity: 0, y: 30, duration: 0.6, stagger: 0.1 });
gsap.from('.step-card', { scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' }, opacity: 0, y: 40, duration: 0.6, stagger: 0.15 });

// ==============================
// COUNTER ANIMATION
// ==============================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  let current = 0;
  const step = Math.ceil(target / (1800 / 16));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 16);
}
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(animateCounter);
      e.target._done = true;
    }
  });
}, { threshold: 0.5 }).observe(document.getElementById('stats'));
