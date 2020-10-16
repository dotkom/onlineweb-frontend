import React, { FC, useState, useEffect } from 'react';
import { Button } from '@dotkomonline/design-system';
import style from './form.less';
import { IMail } from 'profile/models/Mail';
import Select, { ValueType } from 'react-select';

interface IProps {
  mails: IMail[];
  onSubmit: (mail: IMail) => void;
}

interface IOption {
  label: string;
  value: IMail;
}

const SelectPrimaryField: FC<IProps> = ({ mails, onSubmit }) => {
  const options: IOption[] = mails.map((mail) => ({
    label: mail.email,
    value: mail,
  }));

  const [selected, setSelected] = useState<IOption>(options[0]);

  useEffect(() => {
    const primaryOption = options.find((option) => option.value.primary);
    if (selected != primaryOption) {
      setSelected(selected);
    }
  }, [options]);

  const handleChange = (option: ValueType<IOption>) => {
    const selectedOption = option as IOption;
    setSelected(selectedOption);
  };

  const handleSubmit = () => {
    onSubmit(selected.value);
  };

  return (
    <div className={style.inputContainer}>
      <div>
        <label className={style.selectLabel}>Primærepost</label>
        <Select<IOption>
          options={options}
          defaultValue={selected}
          className={style.mailSelect}
          onChange={handleChange}
        />
      </div>
      <Button variant="outline" onClick={handleSubmit}>
        Lagre
      </Button>
    </div>
  );
};

export default SelectPrimaryField;
