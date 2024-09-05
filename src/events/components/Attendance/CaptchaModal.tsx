import React, { FC, useState } from 'react';
import { Modal } from '@dotkomonline/design-system';
import { OW4_TURNSTILE_PUBLIC_KEY } from 'common/constants/turnstile';
import Turnstile from 'react-turnstile';

interface ICaptchaModalProps {
  showModal: boolean;
  header?: string;
  text?: string;
  toggleModal: () => void;
  setCaptcha: (token: string | null) => void;
  errorText?: React.ReactNode | string;
  onError: (error: Error) => void;
}

const CaptchaModal: FC<ICaptchaModalProps> = (props: ICaptchaModalProps) => {
  const { showModal, toggleModal, setCaptcha, header, text, errorText, onError } = props;
  const [showErrorText, setShowErrorText] = useState(true);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const validCaptcha = (token: string | null) => {
    if (token) {
      setCaptcha(token);
      toggleModal();
    }
    //TODO Do something with unvalid token?
  };

  const _onError = (error: Error) => {
    console.log('Error from captcha failure:', error);
    onError(error);
    setShowErrorText(true);
    setTurnstileError(error.message || 'Ingen feilmelding');
  };

  if (!showModal) return null;

  return (
    <Modal open={showModal} onClose={toggleModal}>
      <h1>{header}</h1>
      <p>{text}</p>
      {showErrorText && <p>{errorText}</p>}
      {turnstileError && <p>Error message: {turnstileError}</p>}
      <Turnstile sitekey={OW4_TURNSTILE_PUBLIC_KEY} onVerify={validCaptcha} onError={_onError} />
    </Modal>
  );
};

export default CaptchaModal;
