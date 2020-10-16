import React, { FC, useState } from 'react';
import { TextField, Button } from '@dotkomonline/design-system';
import style from './form.less';
import { IMail } from 'profile/models/Mail';
interface IProps {
  onSubmit: (mail: Partial<IMail>) => Promise<void>;
}

const AddMailField: FC<IProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    await onSubmit({ email: input, primary: false, verified: false });
  };
  return (
    <>
      <div className={style.inputContainer}>
        <TextField
          label="Legg til ny e-post"
          className={style.textField}
          placeholder="E-postadresse"
          onChange={handleChange}
          value={input}
        />
        <Button variant="outline" onClick={handleClick}>
          Legg til
        </Button>
      </div>
    </>
  );
};

export default AddMailField;
