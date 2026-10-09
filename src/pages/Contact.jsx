import { useEffect, useRef, useState } from 'react';
import './Contact.css';

const MAX_MESSAGE = 300;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = { name: '', email: '', message: '' };

  if (!name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'That email address doesn’t look right.';
  }

  if (!message.trim()) {
    errors.message = 'Please write a message.';
  } else if (message.length > MAX_MESSAGE) {
    errors.message = `Please keep your message under ${MAX_MESSAGE} characters.`;
  }

  return errors;
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [helpOpen, setHelpOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const successRef = useRef(null);

  const errors = validate(values);
  const isValid = !errors.name && !errors.email && !errors.message;

  const used = values.message.length;
  const progress = Math.min(100, Math.round((used / MAX_MESSAGE) * 100));
  const isNearLimit = used >= MAX_MESSAGE * 0.85 && used <= MAX_MESSAGE;
  const isOverLimit = used > MAX_MESSAGE;

  const showError = (field) => (touched[field] ? errors[field] : '');

  useEffect(() => {
    if (sent && successRef.current) {
      successRef.current.focus();
    }
  }, [sent]);

  const handleChange = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) return;

    setSent(true);
  };

  const handleReset = () => {
    setValues({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });
    setHelpOpen(false);
    setSent(false);
  };

  const nameError = showError('name');
  const emailError = showError('email');
  const messageError = showError('message');

  const counterClasses = [
    'contact__counter',
    isOverLimit ? 'contact__counter--over' : '',
    isNearLimit ? 'contact__counter--near' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className="contact" aria-labelledby="contact-page-title">
      <div className="contact__card">
        <span className="contact__accent" aria-hidden="true" />
        <h1 id="contact-page-title" className="contact__title">
          Send me a message
        </h1>
        <p className="contact__lead">
          Tell me about a project, an internship or just say hello — I usually
          reply within a day or two.
        </p>

        {sent ? (
          <div className="contact__success" role="status">
            <span className="contact__badge">
              <CheckIcon />
            </span>
            <h2 className="contact__success-title" tabIndex={-1} ref={successRef}>
              Message sent
            </h2>
            <p className="contact__success-text">
              Thanks{values.name.trim() ? `, ${values.name.trim()}` : ''} — your
              message is on its way. I&apos;ll reply to{' '}
              <strong>{values.email.trim()}</strong> as soon as I can.
            </p>
            <button
              type="button"
              className="button button--ghost contact__reset"
              onClick={handleReset}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-name">
                Name <span className="contact__required">required</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className="contact__input"
                placeholder="Ada Lovelace"
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                aria-invalid={nameError ? true : undefined}
                aria-describedby={nameError ? 'contact-name-error' : undefined}
                required
              />
              {nameError ? (
                <p className="contact__error" id="contact-name-error" role="alert">
                  {nameError}
                </p>
              ) : null}
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-email">
                Email <span className="contact__required">required</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className="contact__input"
                placeholder="ada@example.com"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? 'contact-email-error' : undefined}
                required
              />
              {emailError ? (
                <p className="contact__error" id="contact-email-error" role="alert">
                  {emailError}
                </p>
              ) : null}
            </div>

            <div className="contact__field">
              <div className="contact__label-row">
                <label className="contact__label" htmlFor="contact-message">
                  Message <span className="contact__required">required</span>
                </label>

                <span className="contact__help">
                  <button
                    type="button"
                    className="contact__help-button"
                    aria-expanded={helpOpen}
                    aria-controls="contact-message-tip"
                    aria-label="What makes a good message?"
                    onClick={() => setHelpOpen((value) => !value)}
                  >
                    ?
                  </button>
                  <span
                    className="contact__tip"
                    id="contact-message-tip"
                    role="tooltip"
                    hidden={!helpOpen}
                  >
                    Keep it to a few sentences: what you&apos;d like to build,
                    a deadline, and any link worth sharing. {MAX_MESSAGE}{' '}
                    characters max.
                  </span>
                </span>
              </div>

              <textarea
                id="contact-message"
                name="message"
                rows={6}
                className="contact__input contact__textarea"
                placeholder="Hi Alex — I'm building …"
                value={values.message}
                onChange={handleChange('message')}
                onBlur={handleBlur('message')}
                aria-invalid={messageError ? true : undefined}
                aria-describedby={['contact-message-count', messageError && 'contact-message-error']
                  .filter(Boolean)
                  .join(' ')}
                required
              />

              <div className={counterClasses} id="contact-message-count">
                <span className="contact__progress" aria-hidden="true">
                  <span
                    className="contact__progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </span>
                <span className="contact__count">
                  {`${used} / ${MAX_MESSAGE} characters`}
                </span>
              </div>

              {messageError ? (
                <p
                  className="contact__error"
                  id="contact-message-error"
                  role="alert"
                >
                  {messageError}
                </p>
              ) : null}

              <p className="contact__preview" aria-hidden="true">
                <span className="contact__preview-label">Live preview</span>
                <span className="contact__preview-body">
                  {values.message.trim() ? (
                    values.message
                  ) : (
                    <span className="contact__preview-empty">
                      Your message appears here as you type…
                    </span>
                  )}
                </span>
              </p>
            </div>

            <div className="contact__actions">
              <button
                type="submit"
                className="button button--primary contact__submit"
                disabled={!isValid}
              >
                Send message
              </button>
              <p className="contact__hint">
                All fields are required &middot; {MAX_MESSAGE} character limit
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;
