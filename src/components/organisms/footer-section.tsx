import type { ReactElement } from 'react';
import SocialLinks from '@/components/molecules/social-links';

export const FooterSection = (): ReactElement => (
  <footer className="bg-base-200" aria-label="Site footer">
    <div className="container py-12">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-base-content-muted">
            &copy; {new Date().getFullYear()} Ibrahim Turan. All rights reserved.
          </p>
        </div>
        <SocialLinks />
      </div>
    </div>
  </footer>
);

export default FooterSection;
