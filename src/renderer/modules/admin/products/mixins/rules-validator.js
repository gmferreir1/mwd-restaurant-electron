export default {
  validators: {
    "form.code": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.quantity": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.description": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.value": function(value) {
      return Validator.custom(function() {
        var number = parseInt(value);
        if (number === 0) {
          return "Obrigatório";
        }
      });
    }
  },
  methods: {
    submitForm() {
      const self = this;
      this.$validate().then(function(success) {
        if (success) {
          if (!self.form.id) {
            self.create();
          } else {
            self.update();
          }
        }
      });
    }
  }
};
