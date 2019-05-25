import { DateTime } from 'luxon';
import React, { FC, useEffect } from 'react';

import cross from 'common/components/ToggleSwitch/cross.svg';
import { useCountDown } from 'common/hooks/useCountDown';

import { IToastMessage } from './models';
import style from './toast.less';
import { useToast } from './useToast';

export const ToastMessages: FC = () => {
  const { messages, removeMessage } = useToast();
  return messages.length > 0 ? (
    <div className={style.toastContainer}>
      {messages.map((message) => (
        <Message key={message.id} message={message} remove={() => removeMessage(message.id)} />
      ))}
    </div>
  ) : null;
};

export interface IMessageProps {
  message: IToastMessage;
  remove: () => void;
}

const COUNTDOWN_TICK = 200;

const Message: FC<IMessageProps> = ({ message, remove }) => {
  const countDownSeconds = message.duration / COUNTDOWN_TICK;
  const rawCounter = useCountDown(DateTime.local().plus({ milliseconds: message.duration }), COUNTDOWN_TICK);
  const counter = Math.round(rawCounter);

  useEffect(() => {
    if (counter === 0) {
      remove();
    }
  }, [counter]);

  return (
    <div className={style.messageContainer}>
      <div className={style.messageContent}>
        <p>{message.content}</p>
        <button className={style.cancelButton} onClick={remove}>
          <img src={cross} alt="cross" />
        </button>
      </div>
      <div className={style.countDownProgress} style={{ gridTemplateColumns: `repeat(${countDownSeconds}, 1fr)` }}>
        {[...Array(countDownSeconds)].map((_, i) =>
          countDownSeconds - counter >= i ? <div key={i} className={style.progressTick} /> : <div key={i} />
        )}
      </div>
    </div>
  );
};
