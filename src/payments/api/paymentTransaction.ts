import { getUser } from 'authentication/api';
import { getAllPages, patch, post } from 'common/utils/api';
import {
  ICreatePaymentTransaction,
  IPaymentTransaction,
  IUpdatePaymentTransaction,
} from 'payments/models/PaymentTransaction';
import { ReactStripeElements } from 'react-stripe-elements';

const API_URL = '/api/v1/payment/transactions/';

/**
 * Get all transactiont the current user has made.
 * Purchases in Nibble, updates to Saldo, etc.
 */
export const getAllTransactions = async () => {
  const user = await getUser();
  const data = await getAllPages<IPaymentTransaction>(API_URL, { format: 'json' }, { user });
  return data;
};

/**
 * Create a transaction for adding saldo to the user.
 * Requres a Stripe Intent.
 */
export const postTransaction = async (transaction: ICreatePaymentTransaction) => {
  const user = await getUser();
  const data = await post<IPaymentTransaction>(API_URL, transaction, { format: 'json' }, { user });
  return data;
};

/**
 * Verify a Transaction that is pending because Stripe needed more verification (3D Secure/SCA)
 */
export const verifyTransaction = async (transactionId: number, transaction: IUpdatePaymentTransaction) => {
  const user = await getUser();
  const data = await patch<IPaymentTransaction, IUpdatePaymentTransaction>({
    query: `${API_URL}${transactionId}/`,
    data: transaction,
    parameters: { format: 'json' },
    options: { user },
  });
  return data;
};

export interface IGenericReturn {
  status: 'error' | 'success' | 'pending';
  message: string;
}

export interface ICreatePaymentMethodReturn extends IGenericReturn {
  paymentMethod?: IPaymentTransaction;
}

export const createPaymentMethod = async (
  stripe: ReactStripeElements.StripeProps
): Promise<ICreatePaymentMethodReturn> => {
  const user = await getUser();

  if (!user) {
    return {
      status: 'error',
      message: 'Du er ikke logget inn, og kan derfor ikke betale.',
    };
  }

  const data = {
    billing_details: {
      name: user.profile.name,
    },
  };

  const { paymentMethod, error } = await stripe.createPaymentMethod('card', data);

  if (error) {
    return {
      status: 'error',
      message: 'Kunne ikke fullføre betalingen',
    };
  }

  return {
    status: 'success',
    message: 'Betalingen er under behandling...',
    paymentMethod,
  };
};

export interface ICreateTransactionReturn extends IGenericReturn {
  transaction?: IPaymentTransaction;
}

// tslint:disable-next-line no-any
export const createTransaction = async (amount: number, paymentMethod: any): Promise<ICreateTransactionReturn> => {
  const transaction = await postTransaction({ amount, payment_method_id: paymentMethod.id });

  if (transaction.status === 'done') {
    return {
      status: 'success',
      message: `Det ble lagt til ${transaction.amount} kr til saldo for din bruker`,
    };
  } else if (transaction.status === 'pending') {
    return {
      status: 'pending',
      message: 'Betalingen trenger videre behandling...',
      transaction,
    };
  } else {
    return {
      status: 'error',
      message: 'Kunne ikke lagre betalingen!',
    };
  }
};

export interface IHandleCardVerificationReturn extends IGenericReturn {
  transaction?: IPaymentTransaction;
}

export const handleCardVerification = async (
  stripe: ReactStripeElements.StripeProps,
  transaction: IPaymentTransaction
): Promise<IHandleCardVerificationReturn> => {
  // @ts-ignore Stripe types are not up to spec.
  const { paymentIntent, error } = await stripe.handleCardAction(transaction.payment_intent_secret);

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }

  const verifiedTransaction = await verifyTransaction(transaction.id, { payment_intent_id: paymentIntent.id });

  if (verifiedTransaction.status === 'done') {
    return {
      status: 'success',
      message: `Det ble lagt til ${transaction.amount} kr til saldo for din bruker`,
      transaction: verifiedTransaction,
    };
  }

  return {
    status: 'error',
    message: 'Kunne ikke verifisere betalingen...',
  };
};
