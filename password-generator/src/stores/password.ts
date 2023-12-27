// store.js
import { defineStore } from 'pinia'

export const usePasswordStore = defineStore({
  id: 'password',
  state: () => ({
    password: 'Generated',
    showPassword: false,
    passwordLength: 12,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true,
  }),
  actions: {
    updateOptions(options: {
        passwordLength: number,
        includeLowercase: boolean,
        includeUppercase: boolean,
        includeNumbers: boolean,
        includeSymbols: boolean
    }) {
        this.passwordLength = options.passwordLength
        this.includeLowercase = options.includeLowercase
        this.includeUppercase = options.includeUppercase
        this.includeNumbers = options.includeNumbers
        this.includeSymbols = options.includeSymbols
    },
    resetDefaultOptions() {
      // check if local storage has values
      // if so, set them
      // else, set default values

      if (
        localStorage.getItem('passwordLength') !== null ||
        localStorage.getItem('includeUppercase') !== null ||
        localStorage.getItem('includeLowercase') !== null ||
        localStorage.getItem('includeNumbers') !== null ||
        localStorage.getItem('includeSymbols') !== null
      ) {
        this.passwordLength = localStorage.getItem('passwordLength')
        this.includeUppercase = localStorage.getItem('includeUppercase')
        this.includeLowercase = localStorage.getItem('includeLowercase')
        this.includeNumbers = localStorage.getItem('includeNumbers')
        this.includeSymbols = localStorage.getItem('includeSymbols')
      } else {
        this.passwordLength = 12
        this.includeUppercase = true
        this.includeLowercase = true
        this.includeNumbers = true
        this.includeSymbols = true
      }
    },

    setAsNewDefaultOptions() {
        // set local storage values
        localStorage.setItem('passwordLength', String(this.passwordLength))
        localStorage.setItem('includeLowercase', String(this.includeLowercase))
        localStorage.setItem('includeUppercase', String(this.includeUppercase))
        localStorage.setItem('includeNumbers',String(this.includeNumbers))
        localStorage.setItem('includeSymbols', String(this.includeSymbols))
    },

    updatePassword(value) {
        this.password = value
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    generatePassword() {
      // const { passwordLength, includeUppercase, includeNumbers, includeSymbols, includeLowercase } = this
      // console.log(passwordLength, includeUppercase, includeNumbers, includeSymbols, includeLowercase)

      const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
      const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const numberCharacters = '0123456789'
      const symbolCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-='
      let characterList = '';
      let password = '';
      if (this.includeLowercase) {
        characterList += lowercaseCharacters;
      }


      if (this.includeUppercase) {
        characterList += uppercaseCharacters;
      }


      if (this.includeNumbers) {
        characterList += numberCharacters;
      }


      if (this.includeSymbols) {
        characterList += symbolCharacters;
      }


      // Create an array to hold random values
      const randomValuesArray = new Uint32Array(this.passwordLength)
      // Populate the array with cryptographically secure random values
      crypto.getRandomValues(randomValuesArray)

      for (let i = 0; i < this.passwordLength; i++) {
        // Use the modulo operator to ensure the index is within the bounds of characterList
        const characterIndex = randomValuesArray[i] % characterList.length
        password += characterList.charAt(characterIndex)
      }

      this.updatePassword(password)
    }
  }
})
