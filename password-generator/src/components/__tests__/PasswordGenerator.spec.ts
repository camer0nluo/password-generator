// add test suite for password options
import { beforeEach, describe, expect, it } from 'vitest'

import PasswordGenerator from '../PasswordGenerator.vue'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

let wrapper: any = null
beforeEach(() => {
    wrapper = mount(PasswordGenerator, {
        global: {
            plugins: [createPinia()]
        }
    })
})



describe('Password Generator ', () => {
  it('renders properly', () => {
    expect(wrapper.find('input').element.value).toBe('Generated')
  })
})