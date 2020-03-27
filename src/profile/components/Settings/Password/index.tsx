import { Pane } from 'common/components/Panes';
import { putPasswords } from 'profile/api/password';
import { IChangePasswordData, IChangePasswordResponse } from 'profile/models/Password';
import React, { FormEvent, useState } from 'react';
import { ErrorMessage } from './ErrorMessage';
import style from './input.less';
import PasswordInput from './PasswordInput';
import SuccessMessage from './SuccessMessage';

const Password = () => {
  const [inputs, setInputs] = useState<IChangePasswordData>({
    current_password: '',
    new_password: '',
    new_password_confirm: '',
  });
  const [errors, setErrors] = useState<IChangePasswordResponse>({});
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await putPasswords(inputs);
    if (response) {
      setErrors(response);
    }
    setSubmitted(true);
  };

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Pane>
      <form id={style.editPasswordInput} onSubmit={handleSubmit}>
        <PasswordInput
          label="Skriv inn ditt nåverende passord"
          name="current_password"
          requiredMessage={errors.current_password}
          required
          autoComplete="current-password"
          onChange={handleOnChange}
        />
        <PasswordInput
          label="Skriv inn et nytt passord"
          name="new_password"
          requiredMessage={errors.new_password}
          required
          onChange={handleOnChange}
          autoComplete="new-password"
        />
        <PasswordInput
          label="Gjenta det nye passordet"
          name="new_password_confirm"
          requiredMessage={errors.new_password_confirm}
          required
          onChange={handleOnChange}
          autoComplete="new-password"
        />
        <ErrorMessage errors={errors.non_field_errors} />
        <SuccessMessage
          message="Passordet ditt har blitt endret!"
          success={isSubmitted && Object.entries(errors).length === 0}
        />
        <button type="submit" className={style.changePasswordButton}>
          Endre passord
        </button>
      </form>
    </Pane>
  );
};

export default Password;
