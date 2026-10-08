// ⚠️ CHECK THESE 3 THINGS BEFORE LAUNCH
// 1. SITE_URL      = the real live domain (no trailing slash)
// 2. every `path`  = the real route in App.jsx  (also update public/sitemap.xml and public/404.html)
// 3. CONTACT_EMAIL = the client's real email (also shown on the privacy page)
export const SITE_URL = 'https://akshayshrivastava.com';
export const SITE_NAME = 'Akshay Shrivastava';
export const CONTACT_EMAIL = 'Connectwithakshayshri@gmail.com';

// 1200 x 630 px. Put the real file in /public with this exact name.
export const DEFAULT_SHARE_IMAGE = '/og-default.jpg';

// One unique title + description per page.
// Title = short, says what the page is, site name at the end. Description = 1-2 plain sentences.
export const PAGES = {
  home: {
    path: '/',
    title: `${SITE_NAME} | Video Editor, Motion Designer & Director`,
    description:
      'Portfolio of Akshay Shrivastava: video editing, motion design and direction for brands, creators and podcasts.',
  },
  editing: {
    path: '/editing',
    title: `Video Editing Work | ${SITE_NAME}`,
    description:
      'Video editing by Akshay Shrivastava: UGC ads, podcasts, documentaries, YouTube videos, reels and shorts.',
  },
  motion: {
    path: '/motion-design',
    title: `Motion Design Work | ${SITE_NAME}`,
    description:
      'Motion design by Akshay Shrivastava: animated typography, graphics, 2D and 3D work and visual experiments.',
  },
  direction: {
    path: '/direction',
    title: `Direction Work | ${SITE_NAME}`,
    description:
      'Direction work by Akshay Shrivastava: ideas turned into stories, from directing on set to the final cut.',
  },
  about: {
    path: '/about',
    title: `About | ${SITE_NAME}`,
    description:
      'The story of Akshay Shrivastava: from a failed math exam to a first After Effects video with 200K+ views, and a career in editing, motion and direction.',
  },
  privacy: {
    path: '/privacy',
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'What this website collects, which cookies it uses, and how to say no.',
  },
};