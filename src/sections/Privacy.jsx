import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from './Footer';
import { CONTACT_EMAIL, SITE_NAME } from '../seo/siteConfig';

// ⚠️ TEMPLATE: drafted only from what the site's code collects (Google Analytics after consent,
// YouTube embeds, a saved cookie choice). Read it, check it matches the site (Navbar / Footer /
// StatsCounter were not checked), add the date, then set IS_TEMPLATE to false.
const IS_TEMPLATE = false;
const LAST_UPDATED = '8 October 2026';

const Section = ({ title, children }) => (
  <section className="mt-8 sm:mt-10">
    <h2
      style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
      className="m-0 mb-2 text-xl sm:text-3xl text-[#D42C2C] font-normal leading-tight"
    >
      {title}
    </h2>
    <div className="text-sm sm:text-base leading-relaxed text-[#3b352e]">{children}</div>
  </section>
);

export default function Privacy() {
  return (
    <div className="w-full min-h-screen bg-[#FFFCFB] text-[#14120e]">
      <Seo page="privacy" />

      <style>{`
        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy.otf') format('opentype');
          font-display: swap;
        }
        @font-face {
          font-family: 'ParaFont';
          src: url('/ParaFont.ttf') format('truetype');
          font-display: swap;
        }
      `}</style>

      <main
        style={{ fontFamily: "'ParaFont', Helvetica, Arial, sans-serif" }}
        className="max-w-[760px] mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-16"
      >
        <Link
          to="/"
          className="inline-flex items-center min-h-11 mb-2 text-sm text-[#3b352e] no-underline hover:text-[#D42C2C] active:text-[#D42C2C] touch-manipulation"
        >
          &larr; Back to home
        </Link>

        <h1
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
          className="m-0 text-3xl sm:text-5xl text-[#FFC300] font-normal leading-tight"
        >
          Privacy Policy
        </h1>
        <p className="mt-2 mb-0 text-xs sm:text-sm text-[#3b352e]/70">Last updated: {LAST_UPDATED}</p>

        {IS_TEMPLATE && (
          <div className="mt-6 rounded-lg border-2 border-[#FFC300] bg-[#FFF9DB] p-4 text-sm">
            <strong>Template, review before publishing.</strong> This was drafted from what this
            website actually collects. It is not legal advice. Check it matches the site, then set{' '}
            <code>IS_TEMPLATE</code> to <code>false</code> in <code>Privacy.jsx</code>.
          </div>
        )}

        <Section title="Who runs this site">
          <p className="m-0">
            This website is run by {SITE_NAME}. You can reach me at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#D42C2C] underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="What this site collects">
          <p className="m-0">
            This site has no accounts, sign-up forms or comment sections. I don't ask you to type any
            personal details into it. The only data collected is described below.
          </p>
        </Section>

        <Section title="Google Analytics (only if you accept)">
          <p className="m-0">
            When you first visit, a banner asks if you accept analytics. If you click Accept, I load
            Google Analytics 4 to understand how the site is used: which pages are viewed, your
            approximate location, and your device and browser type. Google may set cookies (for
            example <code>_ga</code>) for this. If you click Decline, Google Analytics is not loaded
            at all.
          </p>
        </Section>

        <Section title="Embedded videos">
          <p className="m-0">
            Some videos are embedded from YouTube. When you play one, YouTube (Google) may set cookies
            and collect data under its own privacy policy. Other videos on this site are served from my
            own hosting.
          </p>
        </Section>

        <Section title="Your choice is saved in your browser">
          <p className="m-0">
            Your answer to the cookie banner is saved in your browser's local storage so the banner
            doesn't keep appearing. It stays on your device. To change your mind, clear this site's
            data in your browser and the banner will appear again.
          </p>
        </Section>

        <Section title="Links to other sites">
          <p className="m-0">
            This site links to Instagram, LinkedIn and email. Those services have their own privacy
            policies, and I'm not responsible for how they handle your data.
          </p>
        </Section>

        <Section title="Questions or deletion requests">
          <p className="m-0">
            If you have a question, or you'd like data connected to your visit removed, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#D42C2C] underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>{' '}
            and I'll help.
          </p>
        </Section>
      </main>

      
    </div>
  );
}