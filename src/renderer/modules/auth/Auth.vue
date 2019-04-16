<template>
  <div>
    <form-login/>
  </div>
</template>

<script>
import FormLogin from "./components/FormLogin";
export default {
  name: "Main",
  components: { FormLogin },
  mounted() {
    this.$electron.ipcRenderer.on("checkUpdate", (event, data) => {
      console.log("passou");
      //this.check_update = true;
    });
  }
};
</script>

<style scoped>
</style>