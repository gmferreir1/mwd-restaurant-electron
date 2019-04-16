import swal from 'sweetalert';
window.swal = swal;

export default {

  methods: {
    showAlert(message) {

      swal({
        text: message,
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          cancel: {
            text: "Não",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Sim",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      }).then((confirm) => {
        if (confirm) {
          this.confirmAlert();
        }
      })

    },
    confirmAlert() {}
  }

}