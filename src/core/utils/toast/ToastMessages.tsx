import React, { FC, useContext } from 'react';
import { animated, useTransition } from 'react-spring';

import cross from 'common/components/ToggleSwitch/cross.svg';

import { IToastMessage } from './models';
import { Progress } from './Progress';
import style from './toast.less';
import { ToastContext } from './ToastContext';

export const ToastMessages: FC = () => {
  const { messages, removeToast } = useContext(ToastContext);
  const transitions = useTransition(messages, (message) => message.id, {
    from: { opacity: 0, transform: 'translate3d(-30px, 0, 0)', maxHeight: '0px' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)', maxHeight: '500px' },
    leave: { opacity: 0, transform: 'translate3d(-30px, 0, 0)', maxHeight: '0px' },
  });
  return transitions.length > 0 ? (
    <div className={style.toastContainer}>
      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={{ ...props, transitionDuration: '100ms', height: '100%' }}>
          <Message key={item.id} message={item} remove={() => removeToast(item.id)} />
        </animated.div>
      ))}
    </div>
  ) : null;
};

export interface IMessageProps {
  message: IToastMessage;
  remove: () => void;
}

const Message: FC<IMessageProps> = ({ message, remove }) => {
  return (
    <div className={style.messageContainer}>
      <div className={style.messageContent}>
        <p>{message.content}</p>
        <button className={style.cancelButton} onClick={remove}>
          <img src={cross} alt="cross" />
        </button>
      </div>
      <Progress duration={message.duration} onFinish={remove} />
    </div>
  );
};
