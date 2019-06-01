import React, { FC, useEffect } from 'react';

import Spinner from 'common/components/Spinner';
import { DataTable, DataTableHeaders, DataTableSorters } from 'common/components/Table/DataTable';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { useToast } from 'core/utils/toast/useToast';
import { getAllTransactions } from 'payments/api/paymentTransaction';
import { PaymentStatus } from 'payments/models/Payment';
import { IPaymentTransaction } from 'payments/models/PaymentTransaction';
import { Type } from 'payments/reducers/transactions';

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
  datetime: (a, b) => Date.parse(b.datetime) - Date.parse(a.datetime),
  amount: (a, b) => b.amount - a.amount,
  used_stripe: (a, b) => Number(b.used_stripe) - Number(a.used_stripe),
  status: (a, b) => STATUS_SORT_ORDER.indexOf(b.status) - STATUS_SORT_ORDER.indexOf(a.status),
};

export const Transactions: FC = () => {
  const [addMessage] = useToast({ type: 'error', duration: 10000 });

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.payments.transactions.transactions);
  const fetching = useSelector((state) => state.payments.transactions.fetching);

  const fetchTransactions = async () => {
    dispatch({ type: Type.SET_FETCHING, status: true });
    try {
      const data = await getAllTransactions();
      dispatch({
        type: Type.SET_TRANSACTIONS,
        transactions: data,
      });
    } catch (err) {
      addMessage(String(err));
    }
    dispatch({ type: Type.SET_FETCHING, status: false });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className={style.transactionsContainer}>
      {transactions.length === 0 && fetching ? (
        <Spinner />
      ) : (
        <DataTable
          title="Innskudd"
          headers={tableHeaders}
          items={transactions}
          sorters={tableSorters}
          selectedHeader="datetime"
        >
          {(items) => items.map((transaction) => <Transaction key={transaction.datetime} transaction={transaction} />)}
        </DataTable>
      )}
    </div>
  );
};
