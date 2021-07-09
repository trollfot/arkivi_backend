import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import fr from "vee-validate/dist/locale/fr.json";
import * as rules from "vee-validate/dist/rules";


// Vee-Validate configuration
localize("fr", fr);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

const alphanum = new RegExp("^[a-zA-Z0-9]+$");

extend('alphanum', (value) => {
    if (alphanum.test(value)) {
        return true;
    }
    return 'Ce champ ne peut contenir que des chiffres et des lettres';
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
