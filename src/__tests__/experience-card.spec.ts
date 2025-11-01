import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ExperienceCard from '@/components/molecules/experience-card.vue';
import VCard from '@/components/atoms/v-card.vue';
import VCompanyLogo from '@/components/atoms/v-company-logo.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import type { Experience } from '@/types';

describe('experience-card', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockExperience: Experience = {
    title: 'Senior Developer',
    company: 'Tech Corp',
    companyLogo: 'logo.png',
    location: 'Remote',
    startDate: '2020-01-01',
    endDate: '2022-12-31',
    description: '<p>Worked on various projects</p>',
  };

  it('renders experience card', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        experience: mockExperience,
      },
      global: {
        components: {
          VCard,
          VCompanyLogo,
          VHeading,
        },
      },
    });
    expect(wrapper.findComponent(VCard).exists()).toBe(true);
  });

  it('displays company logo', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        experience: mockExperience,
      },
      global: {
        components: {
          VCard,
          VCompanyLogo,
          VHeading,
        },
      },
    });
    const logo = wrapper.findComponent(VCompanyLogo);
    expect(logo.exists()).toBe(true);
    expect(logo.props('src')).toBe('logo.png');
  });

  it('displays job title', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        experience: mockExperience,
      },
      global: {
        components: {
          VCard,
          VCompanyLogo,
          VHeading,
        },
      },
    });
    expect(wrapper.text()).toContain('Senior Developer');
  });

  it('displays company name', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        experience: mockExperience,
      },
      global: {
        components: {
          VCard,
          VCompanyLogo,
          VHeading,
        },
      },
    });
    expect(wrapper.text()).toContain('Tech Corp');
  });

  it('displays location', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        experience: mockExperience,
      },
      global: {
        components: {
          VCard,
          VCompanyLogo,
          VHeading,
        },
      },
    });
    expect(wrapper.text()).toContain('Remote');
  });

  it('displays "Present" for current job', () => {
    const currentJob = { ...mockExperience, endDate: undefined };
    const wrapper = mount(ExperienceCard, {
      props: {
        experience: currentJob,
      },
      global: {
        components: {
          VCard,
          VCompanyLogo,
          VHeading,
        },
      },
    });
    expect(wrapper.text()).toContain('Present');
  });

  it('renders description as HTML', () => {
    const wrapper = mount(ExperienceCard, {
      props: {
        experience: mockExperience,
      },
      global: {
        components: {
          VCard,
          VCompanyLogo,
          VHeading,
        },
      },
    });
    expect(wrapper.html()).toContain('<p>Worked on various projects</p>');
  });
});
