import React from 'react';

// DRAFT = true shows a visible "sample answers" label so the dummy text can never be
// mistaken for the real thing. Set it to false once the answers below are Akshay's own.
const DRAFT = true;

const FAQS = [
  {
    q: 'What kind of projects do you take on?',
    a: 'Video editing, motion design and creative direction for brands, creators and short films. If your idea sits somewhere in between, send it over and we can figure it out.',
  },
  {
    q: 'How does pricing work?',
    a: 'It depends on the length, complexity and number of deliverables. Share a few details about your project and I will send you a clear quote before we start.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most projects take one to two weeks from the moment I have your footage and brief. Bigger or more complex work takes longer, and I will tell you upfront.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Your raw footage or assets, a short brief, and a few references you like. The more context you share, the fewer revisions we need.',
  },
  {
    q: 'How many rounds of revisions are included?',
    a: 'Two rounds of revisions are included. Extra rounds can be added if the project needs them.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. Everything happens online, so location is not a problem. We just agree on a time zone that works for both of us.',
  },
];

export default function Faq() {
  const items = FAQS.filter((f) => f.a.trim());
  if (items.length === 0) return null;

  return (
    <section id="faq" className="w-full bg-[#FFFCFB] py-20 sm:py-28 px-5 sm:px-8">
      <div className="mx-auto w-full max-w-[760px]">
        

        {/* Heading on a slightly tilted pale-yellow "paper", like "Direction Work" */}
        <div className="mb-12 flex">
          <h2
            style={{ fontFamily: "'SquidBoy', sans-serif", lineHeight: 1.15 }}
            className="-rotate-1 bg-[#FFD84D] px-5 py-1.5 text-3xl sm:text-4xl text-[#D42C2C] shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
          >
            Questions, answered
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((f) => (
            <details
              key={f.q}
              className="group rounded-lg bg-white px-5 py-5 sm:px-7 sm:py-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_10px_32px_rgba(0,0,0,0.1)]"
            >
              <summary
                style={{ fontFamily: "'SquidBoy', sans-serif" }}
                className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-xl sm:text-2xl leading-snug text-[#D42C2C] [&::-webkit-details-marker]:hidden"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  style={{ fontFamily: 'sans-serif' }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFC300] text-lg font-bold leading-none text-[#D42C2C] transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              {/* small yellow dash, like the one under the stat numbers */}
              <span className="mt-4 block h-[3px] w-8 bg-[#FFC300]" aria-hidden="true" />
              <p
                style={{ fontFamily: "'HelveticaNeue', sans-serif" }}
                className="mt-3 max-w-[62ch] text-sm sm:text-[15px] leading-relaxed text-neutral-800"
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}