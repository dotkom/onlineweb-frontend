import { DateTime } from 'luxon';
import React, { FC } from 'react';

import cross from 'common/components/ToggleSwitch/cross.svg';
import { useCountDown } from 'common/hooks/useCountDown';

import { DEFAULT_DURATION, getToastColor, IToastMessage } from './models';
import style from './toast.less';
import { useToast } from './useToast';

export const ToastMessages: FC = () => {
  const { messages, removeMessage } = useToast();
  return (
    <div className={style.toastContainer}>
      {messages.map((message) => (
        <Message key={message.id} message={message} onRemove={() => removeMessage(message.id)} />
      ))}
    </div>
  );
};

export interface IMessageProps {
  message: IToastMessage;
  onRemove: () => void;
}

const COUNTDOWN_SECONDS = DEFAULT_DURATION / 1000;

const Message: FC<IMessageProps> = ({ message, onRemove }) => {
  const rawCounter = useCountDown(DateTime.local().plus({ milliseconds: message.duration }));
  const counter = Math.round(rawCounter);

  const color = getToastColor(message.type);
  return (
    <div className={style.messageContainer}>
      <div className={style.messageContent}>
        <p style={{ color }}>{message.content}</p>
        <button className={style.cancelButton} onClick={onRemove}>
          <img src={cross} alt="cross" />
        </button>
      </div>
      <div className={style.countDownProgress}>
        {[...Array(COUNTDOWN_SECONDS)].map((_, i) =>
          COUNTDOWN_SECONDS - counter >= i ? <div key={i} style={{ background: '#fff' }} /> : <div key={i} />
        )}
      </div>
    </div>
  );
};
