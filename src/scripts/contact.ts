// Contact section: the email address is not written in the page. The button holds it reversed and in
// base64; a click puts it back together and shows it as a link, next to a button that copies it.
const show = document.querySelector<HTMLButtonElement>('button.mail[data-mail]');
const template = document.querySelector<HTMLTemplateElement>('#mail-open');

if (show && template) {
  show.addEventListener('click', () => {
    const address = [...atob(show.dataset.mail ?? '')].reverse().join('');
    const [user, domain] = address.split('@');
    const box = template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    const link = box.querySelector<HTMLAnchorElement>('.mail-addr')!;
    link.href = `mailto:${address}`;
    link.append(user, document.createElement('wbr'), `@${domain}`);

    const copy = box.querySelector<HTMLButtonElement>('.mail-copy')!;
    const status = box.querySelector<HTMLElement>('[aria-live]')!;
    let timer = 0;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(address);
      } catch {
        return;
      }
      copy.classList.add('done');
      status.textContent = copy.dataset.copied ?? '';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        copy.classList.remove('done');
        status.textContent = '';
      }, 1800);
    });

    show.replaceWith(box);
    link.focus();
  });
}

// a module, not a global script: its names stay private
export {};
