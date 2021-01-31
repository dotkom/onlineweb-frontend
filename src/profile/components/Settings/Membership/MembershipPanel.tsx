import { IMembershipApplication } from 'profile/models/Membership';
import { IUserProfile } from 'profile/models/User';
import style from './membership.less';

interface Props {
  membership: IMembershipApplication;
  profile: IUserProfile;
}

const MembershipPanel: React.FC<Props> = ({ membership, profile }) => {
  const months = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
  ];
  const convertDate = (dateString: string) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const date = d.getDate();
    const month = d.getMonth();

    return `${date}. ${months[month]}  ${year}`;
  };

  const { processed_date, started_date, field_of_study, new_expiry_date, message } = membership;
  return (
    <div className={style.membershipPanel}>
      <h1>
        Medlemsskaps- og studieretningssøknad for {profile.first_name} {profile.last_name}
      </h1>

      <div className={style.information}>
        <h3>Opprettet dato: </h3>
        <p>{convertDate(processed_date)}</p>

        <h3>Start på studiet: </h3>
        <p>{convertDate(started_date)}</p>

        <h3>Studieretning: </h3>
        <p>{field_of_study}</p>

        <h3>Utløpsdato for medlemsskap: </h3>
        <p>{convertDate(new_expiry_date)}</p>

        <h3>Melding fra godkjenner: </h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MembershipPanel;
