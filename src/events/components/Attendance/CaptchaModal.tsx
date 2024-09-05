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
}

const CaptchaModal: FC<ICaptchaModalProps> = (props: ICaptchaModalProps) => {
  const { showModal, toggleModal, setCaptcha, header, text, errorText } = props;
  const [showErrorText, setShowErrorText] = useState(true);

  const validCaptcha = (token: string | null) => {
    if (token) {
      setCaptcha(token);
      toggleModal();
    }
    //TODO Do something with unvalid token?
  };

  const onError = (error: Error) => {
    console.log('Error from captcha failure:', error);
    setShowErrorText(true);
  };

  if (!showModal) return null;

  return (
    <Modal open={showModal} onClose={toggleModal}>
      <h1>{header}</h1>
      <p>{text}</p>
      {showErrorText && <p>{errorText}</p>}
      <Turnstile sitekey={OW4_TURNSTILE_PUBLIC_KEY} onVerify={validCaptcha} onError={onError} />
    </Modal>
  );
};

export default CaptchaModal;
