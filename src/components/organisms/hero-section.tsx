import type { ReactElement } from 'react';
import VAvatar from '@/components/atoms/v-avatar';
import VBlurText from '@/components/atoms/v-blur-text';
import VCard from '@/components/atoms/v-card';
import VHeading from '@/components/atoms/v-heading';
import VPrismBackground from '@/components/atoms/v-prism-background';
import SocialLinks from '@/components/molecules/social-links';
import { profile } from '@/data/content';

const userInfo = profile;
const fullName = `${userInfo.name} ${userInfo.surname}`;

export const HeroSection = (): ReactElement => (
  <section id="home" aria-labelledby="hero-name" className="relative overflow-hidden bg-base-300">
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <VPrismBackground
        animationType="hover"
        timeScale={0.15}
        height={2.6}
        baseWidth={5.5}
        scale={3}
        hueShift={140}
        colorFrequency={0.6}
        noise={0}
        glow={0.4}
        bloom={0.6}
      />
    </div>

    <div className="container relative z-10 py-10 md:py-16 lg:py-20">
      <VCard className="bg-base-100/60 backdrop-blur-sm" bordered>
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-8 md:py-6 md:text-left lg:gap-12">
          <div className="shrink-0">
            <VAvatar
              src={userInfo.profileImg}
              alt={fullName}
              size="xl"
              shape="rounded"
              ring
              priority
            />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <VHeading
              id="hero-name"
              level="1"
              weight="black"
              className="text-balance text-4xl leading-[1.05] tracking-[-0.04em] text-base-content sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <VBlurText text={fullName} animateBy="words" direction="top" />
            </VHeading>

            <VHeading
              level="3"
              weight="semibold"
              className="text-lg tracking-[-0.02em] text-secondary sm:text-xl"
            >
              {userInfo.title}
            </VHeading>

            <p className="max-w-prose text-base leading-relaxed text-base-content-muted sm:text-lg">
              {userInfo.tagline}
            </p>

            <div className="pt-2">
              <SocialLinks />
            </div>
          </div>
        </div>
      </VCard>
    </div>
  </section>
);

export default HeroSection;
