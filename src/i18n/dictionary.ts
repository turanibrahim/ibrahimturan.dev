import type { ProjectEngagement } from '@/types/project';
import type { TechCategory } from '@/types/technology';
import type { Locale } from '@/types/locale';
import { defaultLocale } from '@/i18n/locale';

interface TechGroupCopy {
  label: string;
  blurb: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    work: string;
    projects: string;
    about: string;
    contact: string;
    blog: string;
    primaryLabel: string;
    skipToContent: string;
  };
  hero: {
    lineOne: string;
    lineTwo: string;
    startConversation: string;
    seeExperience: string;
    availability: string;
  };
  about: {
    basedIn: string;
    education: string;
    reachMe: string;
  };
  experience: {
    heading: string;
    yearsUnit: string;
    yearsSubject: string;
    intro: string;
    disciplinesLabel: string;
    current: string;
    present: string;
    techLabel: (company: string) => string;
    until: (label: string) => string;
  };
  projects: {
    heading: string;
    viewDetails: string;
    hideDetails: string;
    contributions: string;
    stack: string;
    stackLabel: (name: string) => string;
    linksLabel: (name: string) => string;
    linkLabel: (label: string, name: string) => string;
    engagement: Record<ProjectEngagement, string>;
  };
  technologies: {
    kicker: string;
    heading: string;
    intro: string;
    shipping: string;
    shippingStack: string;
    groups: Record<TechCategory, TechGroupCopy>;
  };
  blog: {
    title: string;
    description: string;
    heading: string;
    summary: (count: number) => string;
    readArticle: string;
    moreWriting: string;
    moreWritingBlurb: string;
    empty: string;
    readTime: (minutes: number) => string;
    readTimeShort: (minutes: number) => string;
    allWriting: string;
    readOnDevto: string;
    opensInNewTab: string;
  };
  social: {
    github: string;
    linkedin: string;
    devto: string;
    twitter: string;
  };
  footer: {
    label: string;
    rights: string;
  };
  language: {
    label: string;
    switchTo: (name: string) => string;
  };
}

const english: Dictionary = {
  meta: {
    title: 'İbrahim Turan — Full-Stack Engineer',
    description:
      'Full-stack engineer with 6+ years of experience building scalable web applications and modern user interfaces.',
  },
  nav: {
    about: 'about',
    blog: 'blog',
    contact: 'contact',
    home: 'home',
    primaryLabel: 'Primary navigation',
    projects: 'projects',
    skipToContent: 'Skip to main content',
    work: 'work',
  },
  hero: {
    availability: 'open to product engineering roles',
    lineOne: 'I turn ideas',
    lineTwo: 'into shipped products.',
    seeExperience: 'See experience',
    startConversation: 'Start a conversation',
  },
  about: {
    basedIn: 'based in',
    education: 'education',
    reachMe: 'reach me',
  },
  experience: {
    current: 'Currently here',
    disciplinesLabel: 'Core disciplines and technologies',
    heading: 'Six years of product engineering.',
    intro:
      'Building web and mobile products across startups and enterprise — frontend, backend, and the seams in between.',
    present: 'to present',
    techLabel: (company) => `${company} technologies`,
    until: (label) => `to ${label}`,
    yearsSubject: 'production products',
    yearsUnit: 'years shipping',
  },
  projects: {
    contributions: 'Principal contributions',
    engagement: {
      Company: 'Company',
      Freelance: 'Freelance',
      Internal: 'Internal',
    },
    heading: 'Project history.',
    hideDetails: 'Hide details',
    linkLabel: (label, name) => `${label} for ${name} (opens in a new tab)`,
    linksLabel: (name) => `${name} links`,
    stack: 'Technology stack',
    stackLabel: (name) => `${name} technology stack`,
    viewDetails: 'View details',
  },
  technologies: {
    groups: {
      backend: { blurb: 'APIs, services, and data layers.', label: 'Backend' },
      frontend: {
        blurb: 'Web apps, design systems, and component architecture.',
        label: 'Frontend',
      },
      mobile: { blurb: 'Cross-platform product builds.', label: 'Mobile' },
      tooling: { blurb: 'Build, test, ship, observe.', label: 'Tooling' },
    },
    heading: 'Full-stack, frontend-leaning.',
    intro:
      'React, Vue, React Native, and Node.js — paired with the build, test, and deploy systems that keep a product moving.',
    kicker: 'stack',
    shipping: 'Currently shipping',
    shippingStack: 'React · TypeScript · Node.js',
  },
  blog: {
    allWriting: 'All writing',
    description: 'Essays on frontend engineering, architecture, and tooling.',
    empty: 'No articles published yet.',
    heading: 'Notes on building software.',
    moreWriting: 'More writing',
    moreWritingBlurb: 'Practical notes, architectural decisions, and fixes worth remembering.',
    opensInNewTab: '(opens in a new tab)',
    readArticle: 'Read article',
    readOnDevto: 'Read on dev.to',
    readTime: (minutes) => `${minutes} min read`,
    readTimeShort: (minutes) => `${minutes} min`,
    summary: (count) =>
      `${count} articles on frontend architecture, tooling, and the occasional hard-won workaround.`,
    title: 'Writing — İbrahim Turan',
  },
  social: {
    devto: 'Dev.to profile',
    github: 'GitHub profile',
    linkedin: 'LinkedIn profile',
    twitter: 'X (Twitter) profile',
  },
  footer: {
    label: 'Site footer',
    rights: 'All rights reserved.',
  },
  language: {
    label: 'Language',
    switchTo: (name) => `Switch to ${name}`,
  },
};

const turkish: Dictionary = {
  meta: {
    title: 'İbrahim Turan — Full-Stack Mühendisi',
    description: 'Altı yıldır üretim ortamında web uygulamaları geliştiren full-stack mühendisi.',
  },
  nav: {
    about: 'hakkımda',
    blog: 'blog',
    contact: 'iletişim',
    home: 'ana sayfa',
    primaryLabel: 'Ana gezinme',
    projects: 'projeler',
    skipToContent: 'İçeriğe geç',
    work: 'deneyim',
  },
  hero: {
    availability: 'ürün mühendisliği fırsatlarına açık',
    lineOne: 'Fikirleri',
    lineTwo: 'ürünlere dönüştürüyorum.',
    seeExperience: 'Deneyimi gör',
    startConversation: 'İletişime geç',
  },
  about: {
    basedIn: 'konum',
    education: 'eğitim',
    reachMe: 'iletişim',
  },
  experience: {
    current: 'Şu an burada',
    disciplinesLabel: 'Temel disiplinler ve teknolojiler',
    heading: 'Altı yıldır ürün geliştiriyorum.',
    intro:
      'Startup’larda ve büyük şirketlerde web ve mobil ürünler geliştiriyorum; frontend, backend ve ikisini birleştiren her katman.',
    present: 'hâlen',
    techLabel: (company) => `${company} teknolojileri`,
    until: (label) => `${label}'ya kadar`,
    yearsSubject: 'geliştiriyorum',
    yearsUnit: 'yıldır ürün',
  },
  projects: {
    contributions: 'Katkılarım',
    engagement: {
      Company: 'Şirket',
      Freelance: 'Serbest',
      Internal: 'Şirket içi',
    },
    heading: 'Proje geçmişi.',
    hideDetails: 'Detayları kapat',
    linkLabel: (label, name) => `${name} için ${label} (yeni sekmede açılır)`,
    linksLabel: (name) => `${name} bağlantıları`,
    stack: 'Kullanılan teknolojiler',
    stackLabel: (name) => `${name} teknoloji yığını`,
    viewDetails: 'Detayları aç',
  },
  technologies: {
    groups: {
      backend: { blurb: 'API’ler, servisler ve veri katmanları.', label: 'Backend' },
      frontend: {
        blurb: 'Web uygulamaları, tasarım sistemleri ve bileşen mimarisi.',
        label: 'Frontend',
      },
      mobile: { blurb: 'Platformlar arası ürün geliştirme.', label: 'Mobil' },
      tooling: { blurb: 'Build, test, dağıtım ve izleme.', label: 'Araçlar' },
    },
    heading: 'Full-stack, frontend ağırlıklı.',
    intro:
      'React, Vue, React Native ve Node.js ile çalışıyorum; build, test ve dağıtım tarafını da kuruyorum.',
    kicker: 'stack',
    shipping: 'Şu anda kullandığım',
    shippingStack: 'React · TypeScript · Node.js',
  },
  blog: {
    allWriting: 'Tüm yazılar',
    description: 'Frontend mühendisliği, mimari ve araçlar üzerine yazılar.',
    empty: 'Henüz yazı yok.',
    heading: 'Yazılım geliştirme notları.',
    moreWriting: 'Diğer yazılar',
    moreWritingBlurb: 'Pratik notlar, mimari kararlar ve işe yarayan çözümler.',
    opensInNewTab: '(yeni sekmede açılır)',
    readArticle: 'Yazıyı oku',
    readOnDevto: 'dev.to’da oku',
    readTime: (minutes) => `${minutes} dk okuma`,
    readTimeShort: (minutes) => `${minutes} dk`,
    summary: (count) =>
      `${count} yazı: frontend mimarisi, araçlar ve zor yoldan öğrenilen çözümler.`,
    title: 'Yazılar — İbrahim Turan',
  },
  social: {
    devto: 'Dev.to profili',
    github: 'GitHub profili',
    linkedin: 'LinkedIn profili',
    twitter: 'X (Twitter) profili',
  },
  footer: {
    label: 'Site alt bilgisi',
    rights: 'Tüm hakları saklıdır.',
  },
  language: {
    label: 'Dil',
    switchTo: (name) => `${name} diline geç`,
  },
};

const dictionaries: Record<Locale, Dictionary> = {
  en: english,
  tr: turkish,
};

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale] ?? dictionaries[defaultLocale];
