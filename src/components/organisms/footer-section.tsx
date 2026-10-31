import type { ReactElement } from 'react';
import SocialLinks from '@/components/molecules/social-links';
import type { Dictionary } from '@/i18n/dictionary';
import type { UserInfo } from '@/types/user';
import { getCurrentYear } from '@/utils/date';

interface Props {
  dictionary: Dictionary;
  profile: UserInfo;
}

export const FooterSection = ({ dictionary, profile }: Props): ReactElement => (
  <footer className="bg-base-200" aria-label={dictionary.footer.label}>
    <div className="container py-12">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-base-content-muted">
            &copy; {getCurrentYear()} İbrahim Turan. {dictionary.footer.rights}
          </p>
        </div>
        <SocialLinks labels={dictionary.social} profile={profile} />
      </div>
    </div>
  </footer>
);

export default FooterSection;
