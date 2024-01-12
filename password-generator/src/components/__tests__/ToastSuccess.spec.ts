import { describe, expect, it } from 'vitest'

import ToastSuccess from '../ToastSuccess.vue'
import { mount } from '@vue/test-utils'

describe('Toast Success ', () => {
  it('renders properly', () => {
    const wrapper = mount(ToastSuccess, { props: { toastMessage: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
