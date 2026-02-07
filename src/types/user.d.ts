export interface UserInfo {
  name: string;
  surname: string;
  title: string;
  company: string;
  companyLogo: string;
  companyUrl: string;
  introduction: string;
  email: string;
  github: string;
  location: string;
  profileImg: string;
  linkedin: string;
  twitter: string;
  devto: string;
  education: {
    university: string;
    department: string;
    startYear: string;
    endYear: string;
    location: string;
  };
}
