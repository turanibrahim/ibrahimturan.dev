import VCard from './VCard.vue';

export default {
  component: VCard,
  title: 'Card',
};

// Always an empty list, not super interesting
const Template = (args) => ({
  components: { VCard },
  setup() {
    return { args };
  },
  template: `
    <v-card v-bind="args">
      <p>Phasellus mollis, dolor sit amet feugiat tincidunt, tellus nulla luctus nisl, a elementum orci massa non turpis. </p>
    </v-card>
  `,
});

// 👇 Each story then reuses that template
export const Card = Template.bind({});
Card.args = {
  height: '300px',
  width: '300px',
  title: 'This is a title of card',
};
