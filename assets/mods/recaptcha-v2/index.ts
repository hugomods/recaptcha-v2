const reCaptchaOnloadCallbacks: CallableFunction[] = []
reCaptchaOnloadCallbacks.push(() => {
  document.querySelectorAll('.g-recaptcha').forEach((el) => {
    const form = el.closest('form')
    const field = el.parentElement?.querySelector('textarea[name="g-recaptcha-v2-response"]') as HTMLTextAreaElement
    const opts = {
      sitekey: el.getAttribute('data-sitekey')
    }
    if (field != null) {
      opts.callback = (resp) => {
        field.value = resp
      }
      opts['expired-callback'] = () => {
        field.value = ''
      }
      opts['error-callback'] = () => {
        field.value = ''
      }
    }
    const id = grecaptcha.render(el, opts)
    form?.addEventListener('reset', () => {
      if (field != null) {
        field.value = ''
      }
      grecaptcha.reset(id)
    })
  })
});

(window as any).reCaptchaOnload = () => {
  reCaptchaOnloadCallbacks.forEach(callback => {
    callback()
  })
}
