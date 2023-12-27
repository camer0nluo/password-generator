import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import {usePasswordStore} from "../../stores/password";

describe('Password Store', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('Default Store', () => {
        const password = usePasswordStore()
        expect(password.password).toBe('Generated')
        expect(password.passwordLength).toBe(12)
        expect(password.includeUppercase).toBe(true)
        expect(password.includeNumbers).toBe(true)
        expect(password.includeSymbols).toBe(true)
    })
    it('Update Options', () => {
        const password = usePasswordStore()
        const options ={
            passwordLength: 16,
            includeUppercase: false,
            includeNumbers: false,
            includeSymbols: false
        }
        password.updateOptions(options)
        expect(password.passwordLength).toBe(16)
        expect(password.includeUppercase).toBe(false)
        expect(password.includeNumbers).toBe(false)
        expect(password.includeSymbols).toBe(false)
    })
})