import React, { useContext } from 'react';

import { UserProfileContext } from 'profile/providers/UserProfile';
import { toggleEMandRFID } from 'profile/utils/rfid';

import Barcode from './Barcode';

export interface IProps {
  barcode: string;
  code: string;
  id: string;
}

const CardBack = () => {
  const { user } = useContext(UserProfileContext);
  const emCode = user && toggleEMandRFID(user.rfid);
  return (
    <svg viewBox="0 0 344 216" width="100%" height="100%">
      <rect y="216" width="216" height="344" rx="15" transform="rotate(-90 0 216)" fill="#eeeeee" />
      <rect y="20" width="344" height="48" fill="#000000" />
      <g x="116" y="144">
        <Barcode barcode="NTNU000000" />
      </g>
      <text x="180" y="140" width="74" height="15" fontWeight="bold">
        {'NTNU000000'}
      </text>
      <text x="36" y="207" width="88" height="15">
        M {'0000000000'}
      </text>
      <text x="212" y="207" width="88" height="15">
        EM {emCode}
      </text>
      <rect x="16" y="90" width="40" height="8" fill="#000000" />
      <rect x="16" y="100" width="44" height="8" fill="#000000" />
      <rect x="16" y="110" width="64" height="8" fill="#000000" />
      <rect x="16" y="120" width="20" height="8" fill="#000000" />
      <rect x="16" y="130" width="74" height="8" fill="#000000" />
    </svg>
  );
};

export default CardBack;
