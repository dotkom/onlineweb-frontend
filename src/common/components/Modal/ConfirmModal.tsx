import { Modal, Button } from '@dotkomonline/design-system';
import { FC } from 'react';
import style from './modal.less';

interface ConfirmModalProps {
  title?: string;
  message?: string;
  open: boolean;
  onClose: (retValue: boolean) => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  title = 'Er du sikker?',
  message = 'Er du sikker på at du ønsker å gjøre dette?',
  onClose,
  open,
}) => {
  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.message}>{message}</p>
      <div className={style.buttonContainer}>
        <Button onClick={() => onClose(true)}>Ja</Button>
        <Button variant="outline" onClick={() => onClose(false)}>
          Nei
        </Button>
      </div>
    </Modal>
  );
};
