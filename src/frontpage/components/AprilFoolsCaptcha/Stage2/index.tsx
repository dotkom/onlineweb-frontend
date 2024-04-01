import React, { useEffect } from 'react';
import style from './stage2.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSpinner, faSquare } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

function ImageToClick({
  src,
  wrong,
  checked,
  onClick,
  hint,
}: {
  src: string;
  wrong: boolean;
  checked: boolean;
  onClick: () => void;
  hint: boolean;
}) {
  return (
    <div
      className={classNames(style.imageToClick, wrong ? style.imageWrong : null, hint ? style.imageClickHelp : null)}
      onClick={() => onClick()}
    >
      <img src={src} alt="Interessegruppe" style={{ filter: 'grayscale(100%) brightness(0.8)' }} />
      <div className={style.imageCheck}>
        {checked && <FontAwesomeIcon icon={faCheckSquare} color="#3C8DEF" size={'2x'} />}
        {!checked && <FontAwesomeIcon icon={faSquare} color="lightgray" size={'2x'} />}
      </div>
    </div>
  );
}

const images = [
  {
    src:
      'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/sm/0990ab67-0f5b-4c4d-95f1-50a5293335a5.png',
    shouldCheck: false,
  },
  {
    src:
      'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/md/9e49416f-1148-4fe3-8573-f88cc7cd7aa7.png',
    shouldCheck: false,
  },
  {
    src:
      'https://online.ntnu.no/_next/image?url=https%3A%2F%2Fonlineweb4-prod.s3.eu-north-1.amazonaws.com%2Fmedia%2Fimages%2Fresponsive%2Flg%2F0b19a527-93fd-45bf-b348-59156ad158eb.png&w=1200&q=75',
    shouldCheck: true,
  },
  {
    src:
      'https://online.ntnu.no/_next/image?url=https%3A%2F%2Fonlineweb4-prod.s3.eu-north-1.amazonaws.com%2Fmedia%2Fimages%2Fresponsive%2Flg%2Faa578573-2cd5-4dd1-9eb4-2392373edd16.png&w=1200&q=75',
    shouldCheck: true,
  },
  {
    src:
      'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/sm/f4aea8d0-a8b3-48aa-b49f-2f7aa2a1ad08.png',
    shouldCheck: false,
  },
  {
    src:
      'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/sm/c3535390-05ed-40df-b155-8c4cade5ce47.png',
    shouldCheck: true,
  },
];

const AprilFoolsStage2 = ({ nextStage }: { nextStage: () => void }) => {
  const [checked, setChecked] = React.useState<boolean[]>(images.map(() => false));
  const [animate, setAnimate] = React.useState(false);
  const [state, setState] = React.useState('1');

  const [needsHelp, setNeedsHelp] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNeedsHelp(true);
    }, 12000);
  }, []);

  return (
    <>
      <h1>Trykk på alle interessegruppene</h1>

      {state === '1' && (
        <>
          <div className={style.imageToClickGrid}>
            {images.map((image, index) => (
              <ImageToClick
                key={index}
                src={image.src}
                checked={checked[index]}
                wrong={checked[index] !== images[index].shouldCheck && animate}
                hint={needsHelp && images[index].shouldCheck}
                onClick={() => {
                  const newChecked = [...checked];
                  newChecked[index] = !newChecked[index];
                  setChecked(newChecked);
                }}
              />
            ))}
          </div>

          <button
            className={style.checkCorrectButton}
            onClick={() => {
              if (checked.every((c, i) => c === images[i].shouldCheck)) {
                setTimeout(() => {
                  setState('3');
                }, 1500);
                setTimeout(() => {
                  nextStage();
                }, 3000);
                setState('2');
              } else {
                setAnimate(true);
                setTimeout(() => {
                  setAnimate(false);
                }, 500);
              }
            }}
          >
            Bekreft
          </button>
        </>
      )}
      {state === '2' && (
        <>
          <FontAwesomeIcon icon={faSpinner} color="#3C8DEF" size={'4x'} className={style.aprilfoolsSpinner} />
        </>
      )}
      {state === '3' && (
        <>
          <FontAwesomeIcon icon={faCheckSquare} color="#01B202" size={'4x'} />
        </>
      )}
    </>
  );
};

export default AprilFoolsStage2;
