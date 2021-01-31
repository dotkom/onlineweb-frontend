import { Button } from '@dotkomonline/design-system';
import Select from '@dotkomonline/design-system/dist/components/select/Select';
import style from './membership.less';
import React from 'react';

const ManualSubmission = () => {
  const generateYearOptions = () => {
    const year = new Date().getFullYear();
    return [...Array(11)].map((_, i) => <option value={i}>{year - i}</option>);
  };
  return (
    <div className={style.manualSubmission}>
      <p className={style.ingress}>
        Med skjemaet under søker du om å få oppdatert studieretningen din. Starten på studieretningen er når du ble tatt
        opp. Om du tidligere har vært bachelor og ønsker å søke deg over på master, skal starttidspunkt være når du kom
        inn på mastergraden.{' '}
      </p>
      <p>
        Merk at det er viktig at du legger inn virkelig informasjon i dette skjemaet. Fusk med feil startdato og
        studieretning kan få svært alvorlige konsekvenser, og du risikerer utestengelse fra linjeforeningens
        arrangementer.{' '}
      </p>

      <h1>Hvilket semester startet du?</h1>
      <Select>
        <option>Høst</option>
        <option>Vår</option>
      </Select>

      <h1>Hvilket år startet du?</h1>
      <Select>{generateYearOptions()}</Select>

      <h1>Studieretning</h1>
      <Select>
        <option value="1">Bachelor i Informatikk</option>
        <option value="10">Programvaresystemer</option>
        <option value="11">Databaser og søk</option>
        <option value="12">Algoritmer og datamaskiner</option>
        <option value="13">Spillteknologi</option>
        <option value="14">Kunstig intelligens</option>
        <option value="15">Helseinformatikk</option>
        <option value="16">Interaksjonsdesign, spill- og læringsteknologi</option>
        <option value="30">Annen mastergrad</option>
        <option value="40">Sosialt medlem</option>
        <option value="80">PhD</option>
        <option value="90">International</option>
        <option value="100">Annet Onlinemedlem</option>
      </Select>

      <p>
        Manuell søknad om studieretning krever at du laster opp f.eks et screenshot av studentweb for å vise til at du
        studerer informatikk.
      </p>

      <h1>Dokumentasjon</h1>

      <Button color="success">Send søknad</Button>
    </div>
  );
};

export default ManualSubmission;
