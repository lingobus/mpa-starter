import { createTest, createVue, destroyVM } from './util.js';

import ButtonSelect from "mpa-common-library/components/button-select.vue";

describe('button-select', function() {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('default select first', () => {
    vm = createVue({
      template: `
        <button-select v-model="value" :items="items" />
      `,
      components: {
        ButtonSelect
      },
      data () {
        return {
          value: {},
          items: [
            {
              label: 'btn 1',
            },
            {
              label: 'btn 2',
            }
          ],
        }
      },
    }, true);

    expect(vm.value.label).toEqual('btn 1');
  });

  it('select other', () => {
    const items = [
      {
        label: 'btn 1',
      },
      {
        label: 'btn 2',
      }
    ],
    vm = createVue({
      template: `
        <button-select v-model="value" :items="items" />
      `,
      components: {
        ButtonSelect
      },
      data () {
        return {
          value: items[1],
          items,
        }
      },
    }, false);

    expect(vm.value.label).toEqual('btn 2');
  });

  it('click', () => {
    vm = createVue({
      template: `
        <button-select v-model="value" :items="items" />
      `,
      components: {
        ButtonSelect
      },
      data () {
        return {
          value: {},
          items: [
            {
              label: 'btn 1',
            },
            {
              label: 'btn 2',
            }
          ],
        }
      },
    }, true);

    vm.$el.children[1].click()

    expect(vm.value.label).toEqual('btn 2');
  });
});