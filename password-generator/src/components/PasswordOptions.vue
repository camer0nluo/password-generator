<template>
    <div class="backdrop-blur-sm">
        <p>Password Generator Options</p>

        <br />
        <label for="length">Password Length:</label>
        <input id="length" type="number" v-model="passwordStore.passwordLength" :min="minPasswordLength"
            aria-label="Password Length" @change="passwordStore.generatePasswordOnOptionsChange" />

        <label for="password-length" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password
            Length</label>
        <input id="default-range" type="range" :min="minPasswordLength" max="100" v-model="passwordStore.passwordLength"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            @change="passwordStore.generatePasswordOnOptionsChange" />

        <span v-show="passwordStore.selectedType === 'Random'">
            <label for="includeLowercase">Include Lowercase:</label>
            <input id="includeLowercase" type="checkbox" v-model="passwordStore.includeLowercase"
                aria-label="Include Lowercase" @change="passwordStore.generatePasswordOnOptionsChange" />

            <label for="includeUppercase">Include Uppercase:</label>
            <input id="includeUppercase" type="checkbox" v-model="passwordStore.includeUppercase"
                aria-label="Include Uppercase" @change="passwordStore.generatePasswordOnOptionsChange" />

            <label for="includeNumbers">Include Numbers:</label>
            <input id="includeNumbers" type="checkbox" v-model="passwordStore.includeNumbers" aria-label="Include Numbers"
                @change="passwordStore.generatePasswordOnOptionsChange" />

            <label for="includeSymbols">Include Symbols:</label>
            <input id="includeSymbols" type="checkbox" v-model="passwordStore.includeSymbols" aria-label="Include Symbols"
                @change="passwordStore.generatePasswordOnOptionsChange" />
        </span>
    </div>
    <div class="gap-x-px">
        <button class="bg-[#3d53f6] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1.5"
            @click="passwordStore.resetDefaultOptions" aria-label="Reset Options">
            Reset Options
        </button>
        <button class="bg-[#3d53f6] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1.5"
            @click="passwordStore.setAsNewDefaultOptions" aria-label="Set as default options">
            Set as default
        </button>
    </div>

    <div>
        <label for="types" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose a password
            type</label>
        <select id="types" @change="handleTypeChange" v-model="passwordStore.selectedType"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled value="">Choose a password type</option>
            <option value="Random">Random</option>
            <option value="Memorable">Memorable</option>
            <option value="Pin">Pin</option>
        </select>
    </div>
</template>
  
<script setup>
import { usePasswordStore } from '../stores/password'

const passwordStore = usePasswordStore()


const minPasswordLength = 6
const handleTypeChange = () => {
    passwordStore.generatePasswordBasedOnType()
}
</script>
  
<style scoped>
div {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    margin-bottom: 10px;
}

.passage-blue {
    background-color: #3d53f6;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #3d53f6;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
  