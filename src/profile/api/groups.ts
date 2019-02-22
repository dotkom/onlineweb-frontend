export const getGroups = async (): Promise<string[]> => {
  // const { data } = await get(API_URL, { format: 'json' }) as { data: IGroup[] }
  const data: string[] = [
    'Alle grupper',
    'arrKom',
    'bedKom',
    'banKom',
    'dotKom',
    'fagKom',
    'Hovedstyret',
    'proKom',
    'seniorKom',
    'triKom',
    'Æresmedlemmer',
    'Eldsterådet',
    'Ex-Hovedstyre',
    'Fond',
    'itex',
    'jubKom',
    'Komiteer',
    'pangKom',
    'Realfagskjelleren',
    'Redaksjonen',
    'Riddere',
    'velKom',
  ];
  return data;
};
