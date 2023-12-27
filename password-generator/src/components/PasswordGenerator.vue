<template>
  <div>
    <ToastSuccess v-if="visible" aria-label="Password Copied" toastMessage="Password Copied Successfully." />
    <br />
    <div class="flex">
      <div>
        <div class="relative w-full">
          <input @input="updatePassword" ref="password" v-model="passwordStore.password" id="password"
            v-on:input="checkPasswordStrength"
            class="	shadow appearance-none border rounded w-full py-2 px-3 overflow-x-hidden text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :type="passwordStore.showPassword ? 'text' : 'password'" placeholder="***********"
            aria-label="Password Input Box" />


          <!-- Toggle Password Visibility Icon -->
          <span @click="passwordStore.togglePasswordVisibility"
            class="input-icon absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            aria-label="Toggle Password Visibility">
            <font-awesome-icon :icon="passwordStore.showPassword ? faEyeSlash : faEye" />
          </span>

          <!-- Copy Icon -->
          <span @click="copyPassword" class="input-icon absolute inset-y-0 right-10 flex items-center pr-3 cursor-pointer"
            aria-label="Copy Password to Clipboard">
            <font-awesome-icon :icon="faCopy" />
          </span>

          <!-- Repeat Icon -->
          <span @click="passwordStore.generatePassword"
            class="input-icon absolute inset-y-0 right-20 flex items-center pr-3 cursor-pointer"
            aria-label="Generate New Password">
            <font-awesome-icon icon="fa-solid fa-rotate-right" />
          </span>

        </div>
        <meter max="4" id="password-strength-meter" ref="meter"></meter>
        <p id="password-strength-text" ref="passwordStrengthText"></p>

        <PasswordOptions aria-label="Password Options" />
        <!-- <div>
          <p>Password: {{ passwordStore.password }}</p>
        </div>
        <button class="bg-[#3d53f6] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="passwordStore.generatePassword" aria-label="Generate Password">
          Generate Password
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import zxcvbn from 'zxcvbn'
import { ref } from 'vue'
import { usePasswordStore } from '../stores/password'
import ToastSuccess from '../components/ToastSuccess.vue'
import { faEye, faEyeSlash, faCopy } from '@fortawesome/free-solid-svg-icons'
import PasswordOptions from '../components/PasswordOptions.vue'
const passwordStore = usePasswordStore()
const visible = ref(false)

const show = () => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
}
async function copyPassword() {
  const passwordStore = usePasswordStore()
  const passwordToCopy = passwordStore.password
  try {
    await navigator.clipboard.writeText(passwordToCopy)
    show()
    console.log('Password copied to clipboard:', passwordToCopy)
  } catch (error) {
    console.error('Unable to copy password to clipboard:', error)
  }
}

const strength = {
  0: "Worst",
  1: "Bad",
  2: "Weak",
  3: "Good",
  4: "Strong"
}
const password = ref('')
const meter = ref('')
const passwordStrengthText = ref('')

function checkPasswordStrength() {
  try {
    let val = passwordStore.password
    let result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if (val !== "") {
      passwordStrengthText.value.innerHTML = "Strength: " + strength[result.score];
      console.log('Password strength:', strength[result.score])
    } else {
      passwordStrengthText.value.innerHTML = "Password Strength can't be calculated";
    }
  } catch (error) {
    console.error('Unable to get password strength', error)
  }
}

</script>

<style scoped>
.input-icon:hover {
  color: blue;
}

meter {
  /* Reset the default appearance */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  margin: 0 auto 1em;
  width: 100%;
  height: 0.5em;

  /* Applicable only to Firefox */
  background: none;
  background-color: rgba(0, 0, 0, 0.1);
}

meter::-webkit-meter-bar {
  background: none;
  background-color: rgba(0, 0, 0, 0.1);
}

/* Webkit based browsers */
meter[value="1"]::-webkit-meter-optimum-value {
  background: red;
}

meter[value="2"]::-webkit-meter-optimum-value {
  background: yellow;
}

meter[value="3"]::-webkit-meter-optimum-value {
  background: orange;
}

meter[value="4"]::-webkit-meter-optimum-value {
  background: green;
}

/* Gecko based browsers */
meter[value="1"]::-moz-meter-bar {
  background: red;
}

meter[value="2"]::-moz-meter-bar {
  background: yellow;
}

meter[value="3"]::-moz-meter-bar {
  background: orange;
}

meter[value="4"]::-moz-meter-bar {
  background: green;
}
</style>
