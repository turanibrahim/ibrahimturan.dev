import VButton from './VButton.vue';

export default {
  component: VButton,
  title: 'Button',
};

const Template = (args) => ({
  components: { VButton },
  setup() {
    return { args };
  },
  template: `
    <v-button>Button</v-button>
  `,
});

export const Button = Template.bind({});
Button.args = {
};
