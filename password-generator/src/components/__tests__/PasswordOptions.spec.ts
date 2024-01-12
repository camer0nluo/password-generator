// add test suite for password options
import { beforeEach, describe, expect, it } from 'vitest'

import PasswordOptions from '../PasswordOptions.vue'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { usePasswordStore } from "../../stores/password";

let wrapper: any = null
beforeEach(() => {
    wrapper = mount(PasswordOptions, {
        global: {
            plugins: [createPinia()]
        }
    })
})



describe('Password Options ', () => {
    it('renders properly', () => {
        expect(wrapper.find('p').text()).toBe('Password Generator Options')
        expect(wrapper.find('label').text()).toBe('Password Length:')
        expect(wrapper.find('input').element.value).toBe('12')
    })
    it('updates password length', async () => {
        const passwordStore = usePasswordStore()
        await wrapper.find('input').setValue(15)
        expect(passwordStore.passwordLength).toBe(15)
    })
    it ('updates password length when slider is moved', async () => {
        const passwordStore = usePasswordStore()
        await wrapper.find('input[type="range"]').setValue(15)
        expect(passwordStore.passwordLength).toBe("15")
    })
    it('when uppercase is toggled to true pinia store should be updated as well', async () => {
        const passwordStore = usePasswordStore()
        await wrapper.find('input[type="checkbox"]').setChecked()
        expect(passwordStore.includeUppercase).toBe(true)
    })
})