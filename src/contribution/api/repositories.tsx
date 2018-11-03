import { get } from '../../common/utils/api';

export const getRepositories = async () => {
  try {
    const data = await get('/api/v1/repositories', { format: 'json' });

    // DUMMY DATA for testing without using the api
    /*
    const data = [
      {
        id: '1',
        name: 'TestRepo 1',
        description: 'OnlineGuru is an IRC bot running in #online @ freenode',
        update_at: '2016-12-09T19:04:26Z',
        url: 'https://github.com/dotkom/onlineweb-frontend',
        languages: [
            {
              type: 'Python',
              size: 15000
            },
            {
              type: 'HTML',
              size: 5000
            }
        ]
      },
      {
          id: '2',
          name: 'TestRepo 2',
          description: 'Online Notifier fetches stud.org. news, SiT cantina menus and AtB realtime bus for students in Trondheim.',
          update_at: '2016-12-09T19:04:26Z',
          url: 'https://github.com/dotkom/onlineweb-frontend',
          languages: [
              {
                  type: 'JavaScript',
                  size: 3000
              },
              {
                  type: 'CSS',
                  size: 2500
              }
          ]
      },
      {
          id: '3',
          name: 'TestRepo 3',
          description: 'A wiki system with complex functionality for simple integration and a superb interface. Store your knowledge with style: Use django models.',
          update_at: '2016-12-09T19:04:26Z',
          url: 'https://github.com/dotkom/onlineweb-frontend',
          languages: [
              {
                  type: 'Shell',
                  size: 23333
              },
              {
                  type: 'TypeScript',
                  size: 5000
              },
              {
                  type: 'Makefile',
                  size: 5000
              }
          ]
      }
    ];
    */

    return data;
  } catch (err) {
    console.error(err);
  }
};
