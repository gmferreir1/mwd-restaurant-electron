<template>
  <div>
    {{ dt }}
    <form-login/>
  </div>
</template>

<script>
import FormLogin from "./components/FormLogin";
export default {
  name: "Main",
  components: { FormLogin },
  data() {
    return {
      dt: ""
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
</style>