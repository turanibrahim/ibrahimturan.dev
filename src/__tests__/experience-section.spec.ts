import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ExperienceSection from '@/components/organisms/experience-section.vue';
import ExperienceCard from '@/components/molecules/experience-card.vue';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';

vi.mock('@/data/experiences.json', () => ({
  default: {
    experiences: [
      {
        title: 'Developer',
        company: 'Company A',
        companyLogo: 'logo-a.png',
        location: 'Location A',
        startDate: '2020-01-01',
        endDate: '2022-12-31',
        description: 'Description A',
      },
      {
        title: 'Senior Developer',
        company: 'Company B',
        companyLogo: 'logo-b.png',
        location: 'Location B',
        startDate: '2023-01-01',
        description: 'Description B',
      },
    ],
  },
}));

describe('experience-section', () => {
  it('renders experience section', () => {
    const wrapper = mount(ExperienceSection, {
      global: {
        components: {
          ExperienceCard,
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.findComponent(VSection).exists()).toBe(true);
  });

  it('displays Experience heading', () => {
    const wrapper = mount(ExperienceSection, {
      global: {
        components: {
          ExperienceCard,
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.text()).toContain('Experience');
  });

  it('renders experience cards', () => {
    const wrapper = mount(ExperienceSection, {
      global: {
        components: {
          ExperienceCard,
          VSection,
          VHeading,
        },
      },
    });

    const cards = wrapper.findAllComponents(ExperienceCard);
    expect(cards.length).toBe(2);
  });

  it('applies base-300 background', () => {
    const wrapper = mount(ExperienceSection, {
      global: {
        components: {
          ExperienceCard,
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.findComponent(VSection).props('background')).toBe('base-300');
  });
});
