import React, { FC } from 'react';
import { TextField, Button } from '@dotkomonline/design-system';
import style from './form.less';

const AddMailField: FC = () => {
  return (
    <>
      <div className={style.inputContainer}>
        <TextField className={style.textField} placeholder="Epostadresse" />
        <Button variant="outline">Legg til</Button>
      </div>
    </>
  );
};

export default AddMailField;
