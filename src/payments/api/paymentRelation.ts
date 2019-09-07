// TODO: Might want to refactor paymentRelation and paymentTransaction, they're very similar...
import { getUser } from 'authentication/api';
import { patch, post } from 'common/utils/api';
import { ICreatePaymentRelation, IPaymentRelation, IUpdatePaymentRelation } from 'payments/models/PaymentRelation';
import { ReactStripeElements } from 'react-stripe-elements';
import { IGenericReturn } from './paymentTransaction';

const API_URL = '/api/v1/payment/relations/';

export interface ICreatePaymentMethodReturn extends IGenericReturn {
  paymentMethod?: IPaymentRelation;
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

/**
 * Create a payment relation.
 */
export const postTransaction = async (relation: ICreatePaymentRelation) => {
  const user = await getUser();
  const data = await post<IPaymentRelation>(API_URL, relation, { format: 'json' }, { user });
  return data;
};

export interface ICreateRelationReturn extends IGenericReturn {
  transaction?: IPaymentRelation;
}

// tslint:disable-next-line no-any
export const createTransaction = async (
  paymentId: number,
  priceId: number,
  paymentMethod: any
): Promise<ICreateRelationReturn> => {
  const transaction = await postTransaction({
    payment_price: priceId,
    payment: paymentId,
    payment_method_id: paymentMethod.id,
  });

  if (transaction.status === 'done') {
    return {
      status: 'success',
      message: 'Betalingen var vellykket.',
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

export const verifyPending = async (transactionId: number, relation: IUpdatePaymentRelation) => {
  const user = await getUser();
  const data = await patch<IPaymentRelation, IUpdatePaymentRelation>({
    query: `${API_URL}${transactionId}/`,
    data: relation,
    parameters: { format: 'json' },
    options: { user },
  });
  return data;
};

export interface IHandleCardVerificationReturn extends IGenericReturn {
  transaction?: IPaymentRelation;
}

export const handleCardVerification = async (
  stripe: ReactStripeElements.StripeProps,
  relation: IPaymentRelation
): Promise<IHandleCardVerificationReturn> => {
  // @ts-ignore Stripe types are not up to spec.
  const { paymentIntent, error } = await stripe.handleCardAction(transaction.payment_intent_secret);

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }

  const verifiedRelation = await verifyPending(relation.id, { payment_intent_id: paymentIntent.id });

  if (verifiedRelation.status === 'done') {
    return {
      status: 'success',
      message: 'Betalingen var vellykket',
      transaction: verifiedRelation,
    };
  }

  return {
    status: 'error',
    message: 'Kunne ikke verifisere betalingen...',
  };
};
