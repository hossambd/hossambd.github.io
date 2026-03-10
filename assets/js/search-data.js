// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-news",
          title: "News",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Peer‑reviewed papers and scholarly outputs.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Selected research and engineering projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "My Curriculum Vitaee",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-supervisor-at-les-cigales-2024-cirm-aix-marseille-university-promoting-scientific-culture-and-gender-parity-in-stem",
          title: '🎓 Supervisor at Les Cigales 2024, CIRM / Aix‑Marseille University — promoting scientific...',
          description: "",
          section: "News",},{id: "news-paper-at-lrec-coling-2024-torino-did-you-get-it-a-zero-shot-approach-to-locate-information-transfers-in-conversations-pdf",
          title: '📄 Paper at LREC‑COLING 2024 (Torino): Did You Get It? A Zero‑Shot Approach...',
          description: "",
          section: "News",},{id: "news-member-of-the-coria-taln-2025-organizing-committee-at-marseille-france",
          title: 'Member of the CORIA-TALN 2025 organizing committee at Marseille, France.',
          description: "",
          section: "News",},{id: "news-supervisor-at-les-cigales-2025-cirm-aix-marseille-university-residential-stem-school-promoting-gender-parity-among-high-school-girls-luminy-campus-marseille",
          title: '🎓 Supervisor at Les Cigales 2025, CIRM / Aix‑Marseille University — residential STEM...',
          description: "",
          section: "News",},{id: "news-paper-at-evalllm-coria-taln-2025-marseille-exploiter-le-prompting-pour-l-extraction-d-information-à-partir-de-textes-médicaux-français-avec-peu-de-ressources-hal",
          title: '📄 Paper at EvalLLM @ CORIA‑TALN 2025 (Marseille): Exploiter le prompting pour l’extraction...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-woah-acl-2025-vienna-implicit-hate-target-span-detection-in-zero-and-few-shot-settings-with-selective-sub-billion-parameter-models-pdf",
          title: '📄 Paper accepted at WOAH @ ACL 2025 (Vienna): Implicit Hate Target Span...',
          description: "",
          section: "News",},{id: "news-️-serving-as-program-committee-member-at-dhow-workshop-acm-multimedia-2025-workshop-on-diffusion-of-harmful-content-on-online-web-dublin-ireland",
          title: '🏛️ Serving as Program Committee member at DHOW Workshop @ ACM Multimedia 2025...',
          description: "",
          section: "News",},{id: "projects-arabic-nested-ner",
          title: 'Arabic Nested NER',
          description: "Nested named entity recognition in Arabic using MARBERT/AraBERT on WOJOOD.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/arabic-ner/";
            },},{id: "projects-evalllm-2025-information-extraction",
          title: 'EvalLLM 2025 — Information Extraction',
          description: "Model-centric IE approaches generative prompting and encoder-based modeling (BERT-style).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/eval-llm/";
            },},{id: "projects-implicit-hate-target-span-detection",
          title: 'Implicit Hate Target Span Detection',
          description: "Zero- and few-shot span detection for implicit hate with selective sub‑billion parameter models (WOAH @ ACL 2025).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hate-target-span/";
            },},{id: "projects-information-transfer-in-conversations",
          title: 'Information Transfer in Conversations',
          description: "Zero-shot approach to locate information transfers in natural conversations (LREC‑COLING 2024).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/info-transfer/";
            },},{id: "teaching-post-relational-databases",
          title: 'Post-Relational Databases',
          description: "",
          section: "Teaching",handler: () => {
              window.location.href = "/teaching/2024-09-01-post-relational-databases/";
            },},{id: "teaching-relational-database-systems",
          title: 'Relational Database Systems',
          description: "",
          section: "Teaching",handler: () => {
              window.location.href = "/teaching/2024-09-01-relational-database-systems/";
            },},{id: "teaching-advanced-databases",
          title: 'Advanced Databases',
          description: "",
          section: "Teaching",handler: () => {
              window.location.href = "/teaching/2025-09-01-advanced-databases/";
            },},{id: "teaching-relational-database-systems",
          title: 'Relational Database Systems',
          description: "",
          section: "Teaching",handler: () => {
              window.location.href = "/teaching/2025-09-01-relational-database-systems/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%6F%73%73%61%6D.%62%6F%75%64%72%61%61@%74%75%6E%69.%66%69", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/hossambd", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/hossam-boudraa", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0005-3815-4480", "_blank");
        },
      },{
        id: 'social-work',
        title: 'Work',
        section: 'Socials',
        handler: () => {
          window.open("https://www.tuni.fi/en/people/hossam-boudraa", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=iTz746oAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
