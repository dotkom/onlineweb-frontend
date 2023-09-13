import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

import { Modal } from '@dotkomonline/design-system';

import { md } from 'common/components/Markdown';

const NEW_FUNCTION_ALERT = md`
# Hei! 👋 Har du noen gang glemt et arrangement du har meldt deg på?

Nå er løsningen her! Du kan nå automatisk få arrangementene du er meldt på rett inn i din kalender.

Hvis dette er noe du kunne tenkt deg - gå til din profil og trykk på "Kalender"-fanen helt nederst. Her kan du lese mer.

Hvis det fortsatt er noe du lurer på, ta kontakt med oss på slack eller send en mail til \`hjelp@dotkom.ntnu.no\`
`;

// 1. Create the context
interface CalendarNotificationContextValue {
  showCalendarNotification: boolean;
  closeNotification: () => void;
  openNotification: (options?: { oncePersistant?: boolean }) => void;
}

const CalendarNotificationContext = createContext<CalendarNotificationContextValue | undefined>(undefined);

// 2. Create the provider
export const CalendarNotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [showCalendarNotification, setShowCalendarNotification] = useState<boolean>(false);

  const closeNotification = () => {
    localStorage.setItem('calendarNotificationSeen', 'true');
    setShowCalendarNotification(false);
  };

  const openNotification = ({ oncePersistant }: { oncePersistant?: boolean } = {}) => {
    const userHasOpened = localStorage.getItem('calendarNotificationSeen') == 'true';
    if (oncePersistant && userHasOpened) return;
    setShowCalendarNotification(true);
  };

  return (
    <CalendarNotificationContext.Provider value={{ showCalendarNotification, closeNotification, openNotification }}>
      {children}
      {showCalendarNotification && (
        <Modal open={showCalendarNotification} onClose={closeNotification}>
          {NEW_FUNCTION_ALERT}
        </Modal>
      )}
    </CalendarNotificationContext.Provider>
  );
};

// 3. Create the hook to use the context
export const useCalendarNotification = (): CalendarNotificationContextValue => {
  const context = useContext(CalendarNotificationContext);
  if (!context) {
    throw new Error('useCalendarNotification must be used within a CalendarNotificationProvider');
  }
  return context;
};
