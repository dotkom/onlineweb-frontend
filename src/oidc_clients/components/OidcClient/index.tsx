import { Button, Card } from '@dotkomonline/design-system';
import Markdown from 'common/components/Markdown/index';
import React from 'react';
import { IOidcClient } from '../../models/client';

interface IOidcClientProps {
  client: IOidcClient;
  manage?: boolean;
  onRemove?: () => void;
}

const OidcClient = ({ client, manage = false, onRemove }: IOidcClientProps) => {
  const clientDescriptionMd = `
  # ${client.name}
  - Client id: ${client.client_id}
  - Eier: ${client.owner ? client.owner.first_name : 'Ingen'}
  - Tilganger (scope): ${client.scope.length > 0 ? client.scope.join(', ') : 'Ingen'}
  - Website url: ${client.website_url}
  - Client type: ${client.client_type}
  - Response types: ${client.response_types.map((rt) => rt.description).join(', ')}

`;
  return (
    <Card>
      <img src={client.logo} alt={`App logo til ${client.name}`} />
      <Markdown source={clientDescriptionMd} />
      {manage ? (
        <Button onClick={onRemove}>Slett app</Button>
      ) : client.require_consent ? (
        <Button onClick={onRemove}>Fjern tilgang</Button>
      ) : null}
    </Card>
  );
};

export default OidcClient;
