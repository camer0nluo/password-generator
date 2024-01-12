// store.js
import { defineStore } from 'pinia';

export const usePasswordStore = defineStore({
  id: 'password',

  state: () => ({
    password: '',
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
    updateOptions(options) {
      Object.assign(this, options);
    },

    resetDefaultOptions() {
      const localStorageKeys = ['passwordLength', 'includeUppercase', 'includeLowercase', 'includeNumbers', 'includeSymbols'];

      if (localStorageKeys.some(key => localStorage.getItem(key) !== null)) {
        localStorageKeys.forEach(key => {
          this[key] = key === 'passwordLength' ? parseInt(localStorage.getItem(key)) : localStorage.getItem(key) === 'true';
        });
      } else {
        this.passwordLength = 12;
        this.includeUppercase = true;
        this.includeLowercase = true;
        this.includeNumbers = true;
        this.includeSymbols = true;
      }
    },

    setAsNewDefaultOptions() {
      const localStorageKeys = ['passwordLength', 'includeLowercase', 'includeUppercase', 'includeNumbers', 'includeSymbols'];

      localStorageKeys.forEach(key => localStorage.setItem(key, this[key]));
    },

    updatePassword(value) {
      this.password = value;
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    generatePin() {
      const password = this.generateRandomPassword(this.numberCharacters);
      this.updatePassword(password);
    },

    generateMemorablePassword() {
      const words = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'flower', 'giraffe'];
      const password = this.generatePasswordFromList(words);
      this.updatePassword(password);
    },

    generatePassword() {
      const characterList = this.buildCharacterList();
      const password = this.generateRandomPassword(characterList);
      this.updatePassword(password);
    },

    generateRandomPassword(characterList) {
      let password = '';
      const randomValuesArray = new Uint32Array(this.passwordLength);
      crypto.getRandomValues(randomValuesArray);

      for (let i = 0; i < this.passwordLength; i++) {
        const characterIndex = randomValuesArray[i] % characterList.length;
        password += characterList.charAt(characterIndex);
      }

      return password;
    },

    generatePasswordFromList(wordList) {
      let password = '';
      const maxLength = this.passwordLength;

      while (password.length < maxLength) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const randomWord = wordList[randomIndex];

        if (password.length + randomWord.length <= maxLength) {
          password += randomWord;
        } else {
          const remainingLength = maxLength - password.length;
          password += randomWord.slice(0, remainingLength);
        }
      }

      return password;
    },

    buildCharacterList() {
      let characterList = '';

      if (this.includeLowercase) {
        characterList += this.lowercaseCharacters;
      }

      if (this.includeUppercase) {
        characterList += this.uppercaseCharacters;
      }

      if (this.includeNumbers) {
        characterList += this.numberCharacters;
      }

      if (this.includeSymbols) {
        characterList += this.symbolCharacters;
      }

      return characterList;
    },

    generatePasswordOnOptionsChange() {
      this.generatePasswordBasedOnType();
    },

    generatePasswordBasedOnType() {
      const typeMapping = {
        'Random': this.generatePassword,
        'Pin': this.generatePin,
        'Memorable': this.generateMemorablePassword,
      };

      this.currentType = this.selectedType;
      typeMapping[this.selectedType]();
    },
  },
});
