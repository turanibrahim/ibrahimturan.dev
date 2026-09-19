import type { ReactElement } from 'react';
import VHeading from '@/components/atoms/v-heading';
import VSection from '@/components/atoms/v-section';
import { profile } from '@/data/content';

const userInfo = profile;

export const AboutSection = (): ReactElement => (
  <VSection id="about" ariaLabelledby="about-heading" paddingY="lg">
    <VHeading id="about-heading" level="2" className="mb-6 text-base-content">
      About Me
    </VHeading>
    <div className="space-y-6">
      <p className="max-w-prose text-lg leading-relaxed text-base-content">
        {userInfo.introduction}
      </p>

      <div className="grid grid-cols-1 gap-6 border-t border-base-300 pt-4 md:grid-cols-2">
        <div>
          <VHeading level="3" weight="semibold" className="mb-3 text-secondary">
            Current Position
          </VHeading>
          <div className="space-y-2">
            <p className="flex flex-wrap items-center gap-2 text-base-content">
              <span className="font-medium">{userInfo.title} at</span>
              <a
                href={userInfo.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
              >
                {userInfo.companyLogo && (
                  <img
                    src={userInfo.companyLogo}
                    alt={`${userInfo.company} logo`}
                    className="inline-block h-3"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span>{userInfo.company}</span>
              </a>
            </p>
            <p className="flex items-center gap-2 text-base-content-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fillRule="evenodd"
                  d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .757.433 6.943 6.943 0 0 0 .281.14l.018.008.006.003.002.001Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{userInfo.location}</span>
            </p>
          </div>
        </div>

        <div>
          <VHeading level="3" weight="semibold" className="mb-3 text-secondary">
            Education
          </VHeading>
          <div className="space-y-2">
            <p className="font-medium text-base-content">{userInfo.education.university}</p>
            <p className="text-base-content">{userInfo.education.department}</p>
            <p className="text-sm text-base-content-muted">
              {userInfo.education.startYear} - {userInfo.education.endYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  </VSection>
);

export default AboutSection;
