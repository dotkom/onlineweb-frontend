import React, { FC, useState } from 'react';
import { TextField, Button } from '@dotkomonline/design-system';
import style from './form.less';

interface IProps {
  onSubmit: (email: string) => Promise<void>;
}

const AddMailField: FC<IProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    await onSubmit(input);
  };
  return (
    <>
      <div className={style.inputContainer}>
        <TextField
          label="Bytt e-post"
          className={style.textField}
          placeholder="E-postadresse"
          onChange={handleChange}
          value={input}
        />
        <Button variant="outline" onClick={handleClick}>
          Bytt
        </Button>
      </div>
    </>
  );
};

export default AddMailField;
