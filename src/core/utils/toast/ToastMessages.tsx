import React, { FC, useContext } from 'react';
import { animated, useTransition } from 'react-spring';

import cross from 'common/components/ToggleSwitch/cross.svg';

import { IToastMessage, ToastType } from './models';
import { Progress } from './Progress';
import style from './toast.less';
import { ToastContext } from './ToastContext';

export const ToastMessages: FC = () => {
  const { messages, removeToast } = useContext(ToastContext);
  const transitions = useTransition(messages, (message) => message.id, {
    from: { opacity: 0, transform: 'translate3d(-30px, 0, 0)', maxHeight: '0%' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)', maxHeight: '100%' },
    leave: { opacity: 0, transform: 'translate3d(-30px, 0, 0)', maxHeight: '0%' },
  });
  return transitions.length > 0 ? (
    <div className={style.toastContainer}>
      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          <Message key={item.id} type={item.type} message={item} remove={() => removeToast(item.id)} />
        </animated.div>
      ))}
    </div>
  ) : null;
};

export interface IMessageProps {
  message: IToastMessage;
  remove: () => void;
  type: ToastType;
}

const Message: FC<IMessageProps> = ({ message, remove, type }) => {
  const messageContent = typeof message.content === 'string' ? <p>{message.content}</p> : <div>{message.content}</div>;
  return (
    <div className={`${style.messageContainer} ${style[type]}`}>
      <div className={style.messageContent}>
        {messageContent}
        <button className={style.cancelButton} onClick={remove}>
          <img src={cross} alt="cross" />
        </button>
      </div>
      <Progress duration={message.duration} onFinish={remove} />
    </div>
  );
};
