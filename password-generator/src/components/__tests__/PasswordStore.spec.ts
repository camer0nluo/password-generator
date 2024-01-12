import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { usePasswordStore } from "../../stores/password";

describe('Password Store', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('Default Store', () => {
        const password = usePasswordStore()
        expect(password.password).toBe('')
        expect(password.passwordLength).toBe(12)
        expect(password.includeLowercase).toBe(true)
        expect(password.includeUppercase).toBe(true)
        expect(password.includeNumbers).toBe(true)
        expect(password.includeSymbols).toBe(true)
    })
    it('Update Options', () => {
        const password = usePasswordStore()
        const options = {
            passwordLength: 16,
            includeLowercase: false,
            includeUppercase: false,
            includeNumbers: false,
            includeSymbols: false
        }
        password.updateOptions(options)
        expect(password.passwordLength).toBe(16)
        expect(password.includeLowercase).toBe(false)
        expect(password.includeUppercase).toBe(false)
        expect(password.includeNumbers).toBe(false)
        expect(password.includeSymbols).toBe(false)
    })
    it('Reset Default Options', () => {
        const password = usePasswordStore()
        password.resetDefaultOptions()
        expect(password.passwordLength).toBe(12)
        expect(password.includeLowercase).toBe(true)
        expect(password.includeUppercase).toBe(true)
        expect(password.includeNumbers).toBe(true)
        expect(password.includeSymbols).toBe(true)
    })
    it('Set As New Default Options', () => {
        const password = usePasswordStore()
        password.setAsNewDefaultOptions()
        expect(localStorage.getItem('passwordLength')).toBe('12')
        expect(localStorage.getItem('includeLowercase')).toBe('true')
        expect(localStorage.getItem('includeUppercase')).toBe('true')
        expect(localStorage.getItem('includeNumbers')).toBe('true')
        expect(localStorage.getItem('includeSymbols')).toBe('true')
    })
    it('Update Password', () => {
        const password = usePasswordStore()
        password.updatePassword('password')
        expect(password.password).toBe('password')
    })
    it('Toggle Password Visibility', () => {
        const password = usePasswordStore()
        password.togglePasswordVisibility()
        expect(password.showPassword).toBe(false)
    })
    it('Generate Pin', () => {
        const password = usePasswordStore()
        password.generatePin()
        expect(password.password).toMatch(/[0-9]{12}/)
        expect(password.password).not.toBe('')
    })
    it('Generate Password with Random Type', () => {
        const password = usePasswordStore()
        password.generatePassword()
        expect(password.password).toMatch(/[0-9a-zA-Z!@#$%^&*()_+~`|}{[\]:;?><,./-=]{12}/)
        expect(password.password).not.toBe('')
    })
})