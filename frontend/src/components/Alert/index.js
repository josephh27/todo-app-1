import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Alert = (icon, title, desc) => {
  Toast.fire({
    icon: icon,
    title: title,
    html: `<p class="alert-text">${desc}</p>`,
  });
};

export default Alert;