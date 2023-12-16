import emailjs from 'emailjs-com';

export const sendEmail = (form) => {
  const emailjsUserId = import.meta.env.VITE_APP_EMAILJS;

  return emailjs
    .sendForm('service_zjv1bbl', 'template_0344q91', form, emailjsUserId)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const sendMessage = (form) => {
  const emailjsUserId = import.meta.env.VITE_APP_EMAILJS;
  return emailjs
    .sendForm('service_zjv1bbl', 'template_kfn1egf', form, emailjsUserId)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export default { sendEmail, sendMessage };
