// store.js
import { defineStore } from 'pinia'

export const usePasswordStore = defineStore({
  id: 'password',
  state: () => ({
    password: 'Generated',
    showPassword: true,
    passwordLength: 12,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true,
    selectedType: 'Random',
    lowercaseCharacters: 'abcdefghijklmnopqrstuvwxyz',
    uppercaseCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numberCharacters: '0123456789',
    symbolCharacters: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    currentType: 'Random',
  }),
  actions: {
    updateOptions(options: {
      passwordLength: number
      includeLowercase: boolean
      includeUppercase: boolean
      includeNumbers: boolean
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
        this.passwordLength = parseInt(localStorage.getItem('passwordLength'));
        this.includeUppercase = localStorage.getItem('includeUppercase');
        this.includeLowercase = localStorage.getItem('includeLowercase');
        this.includeNumbers = localStorage.getItem('includeNumbers');
        this.includeSymbols = localStorage.getItem('includeSymbols');
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
      localStorage.setItem('passwordLength', this.passwordLength)
      localStorage.setItem('includeLowercase', this.includeLowercase)
      localStorage.setItem('includeUppercase', this.includeUppercase)
      localStorage.setItem('includeNumbers', this.includeNumbers)
      localStorage.setItem('includeSymbols', this.includeSymbols)
    },

    updatePassword(value) {
      this.password = value
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    generatePin() {
      let password = ''

      // Create an array to hold random values
      const randomValuesArray = new Uint32Array(this.passwordLength)
      crypto.getRandomValues(randomValuesArray)

      for (let i = 0; i < this.passwordLength; i++) {
        const characterIndex = randomValuesArray[i] % this.numberCharacters.length
        password += this.numberCharacters.charAt(characterIndex)
      }

      this.updatePassword(password)
    },
    generateMemorablePassword() {
      const words = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'flower', 'giraffe'];
      let password = '';
      const maxLength = this.passwordLength;

      while (password.length < maxLength) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];

        // Add the word to the password, ensuring it doesn't exceed the maxLength
        if (password.length + randomWord.length <= maxLength) {
          password += randomWord;
        } else {
          // If adding the whole word exceeds the maxLength, add a portion of the word
          const remainingLength = maxLength - password.length;
          password += randomWord.slice(0, remainingLength);
        }
      }

      this.updatePassword(password);
    },
    generatePassword() {
      let characterList = ''
      let password = ''
      if (this.includeLowercase) {
        characterList += this.lowercaseCharacters
      }

      if (this.includeUppercase) {
        characterList += this.uppercaseCharacters
      }

      if (this.includeNumbers) {
        characterList += this.numberCharacters
      }

      if (this.includeSymbols) {
        characterList += this.symbolCharacters
      }

      // Create an array to hold random values
      const randomValuesArray = new Uint32Array(this.passwordLength)
      // Populate the array with cryptographically secure random values
      crypto.getRandomValues(randomValuesArray)

      for (let i = 0; i < this.passwordLength; i++) {
        // https://stackoverflow.com/questions/68617403/how-to-properly-generate-a-random-password-with-the-window-crypto-property
        // Use the modulo operator to ensure the index is within the bounds of characterList
        const characterIndex = randomValuesArray[i] % characterList.length
        password += characterList.charAt(characterIndex)
      }

      this.updatePassword(password)
    },
    generatePasswordOnOptionsChange() {
      if (this.currentType === 'Random') {
        this.generatePassword()
      } else if (this.currentType === 'Pin') {
        this.generatePin()
      } else if (this.currentType === 'Memorable') {
        this.generateMemorablePassword()
      }
    },
    generatePasswordBasedOnType() {
      if (this.selectedType === 'Random') {
        this.currentType = 'Random'
        this.generatePassword()
      } else if (this.selectedType === 'Pin') {
        this.currentType = 'Pin'
        this.generatePin()
      } else if (this.selectedType === 'Memorable') {
        this.currentType = 'Memorable'
        this.generateMemorablePassword()
      }
    }
  }
})
