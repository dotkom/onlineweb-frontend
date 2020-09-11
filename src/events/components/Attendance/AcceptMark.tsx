import React, { FC } from 'react';
import { Checkbox } from '@dotkomonline/design-system';

interface IProps {
  accepted: boolean;
  onChange: () => void;
}
const AcceptMark: FC<IProps> = ({ accepted, onChange }) => {
  return (
    <div>
      <Checkbox label="Jeg godkjenner prikkereglene" onChange={onChange} disabled={accepted} />
    </div>
  );
};

export default AcceptMark;
