import React, { FC, useState, useEffect } from 'react';
import { Modal } from '@dotkomonline/design-system';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_KEY } from 'common/constants/google';
//import { getMarksAcceptance } from 'events/api/marksAcceptance';
import AcceptMark from './AcceptMark';

interface ICaptchaModalProps {
  showModal: boolean;
  header?: string;
  toggleModal: () => void;
  setRecaptcha: (token: string | null) => void;
}

const CaptchaModal: FC<ICaptchaModalProps> = (props: ICaptchaModalProps) => {
  const { showModal, toggleModal, setRecaptcha, header } = props;
  const [marksAccepted, setMarksAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMarkAccepted = async () => {
      //const marksAcceptance = await getMarksAcceptance();
      setMarksAccepted(false);
    };
    fetchMarkAccepted();
  }, []);

  const handleAcceptMark = () => {
    console.log('kek');
    // TODO: Do a post request which indicates the user has accepted marks
  };

  const validCaptcha = (token: string | null) => {
    if (token) {
      setRecaptcha(token);
      toggleModal();
    }
    //TODO Do something with unvalid token?
  };

  if (!showModal) return null;
  if (marksAccepted == null) return null;
  return (
    <Modal open={showModal} onClose={toggleModal}>
      <h1>{header}</h1>
      <AcceptMark onChange={handleAcceptMark} accepted={marksAccepted} />
      <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={validCaptcha} />
    </Modal>
  );
};

export default CaptchaModal;
