import React, { FC, useEffect, useState } from 'react';

import Spinner from 'common/components/Spinner';
import { DataTable, DataTableHeaders, DataTableSorters } from 'common/components/Table/DataTable';
import { useToast } from 'core/utils/toast/useToast';
import { getAllTransactions } from 'payments/api/paymentTransaction';
import { PaymentStatus } from 'payments/models/Payment';
import { IPaymentTransaction } from 'payments/models/PaymentTransaction';

import { Transaction } from './Transaction';
import style from './transactions.less';

const tableHeaders: DataTableHeaders = {
  datetime: 'Dato',
  amount: 'Verdi',
  status: 'Betalt',
  used_stripe: 'Betalingsløsning',
};

const STATUS_SORT_ORDER: PaymentStatus[] = ['pending', 'succeeded', 'done', 'refunded', 'removed'];

const tableSorters: DataTableSorters<typeof tableHeaders, IPaymentTransaction> = {
  datetime: (a, b) => Date.parse(a.datetime) - Date.parse(b.datetime),
  amount: (a, b) => b.amount - a.amount,
  used_stripe: (a, b) => Number(b.used_stripe) - Number(a.used_stripe),
  status: (a, b) => STATUS_SORT_ORDER.indexOf(b.status) - STATUS_SORT_ORDER.indexOf(a.status),
};

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
        <DataTable
          title="Innskudd"
          headers={tableHeaders}
          items={transactions}
          sorters={tableSorters}
          selectedHeader="datetime"
        >
          {(items) => items.map((transaction) => <Transaction key={transaction.datetime} transaction={transaction} />)}
        </DataTable>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
