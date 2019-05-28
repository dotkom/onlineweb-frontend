import React, { FC, useEffect, useState } from 'react';

import Spinner from 'common/components/Spinner';
import { Table } from 'common/components/Table';
import { useToast } from 'core/utils/toast/useToast';
import { getAllTransactions } from 'payments/api/paymentTransaction';
import { IPaymentTransaction } from 'payments/models/PaymentTransaction';

import { Transaction } from './Transaction';
import style from './transactions.less';

export const Transactions: FC = () => {
  const [ready, setReady] = useState(false);
  const [transactions, setTransactions] = useState<IPaymentTransaction[]>([]);
  const [addMessage] = useToast({ type: 'error', duration: 10000 });

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (err) {
      addMessage(String(err));
    }
    setReady(true);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className={style.transactionsContainer}>
      {ready ? (
        <Table headers={['Dato', 'Verdi', 'Betalt', 'Betalingsløsning']} title="Innskudd">
          {transactions.map((transaction) => (
            <Transaction key={transaction.datetime} transaction={transaction} />
          ))}
        </Table>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
