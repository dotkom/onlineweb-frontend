import { ReactStripeElements } from 'react-stripe-elements';

import { getUser } from 'authentication/api';
import { getAllPages, IBaseAPIParameters, patch, post } from 'common/utils/api';
import { IUserAttendee } from 'events/models/Attendee';
import { ICreatePaymentRelation, IPaymentRelation, IUpdatePaymentRelation } from 'payments/models/PaymentRelation';
import { IGenericReturn } from './paymentTransaction';

const API_URL = '/api/v1/payment/relations/';
const USER_ATTENDEES_API_URL = '/api/v1/registration/user-attendees/';

export interface IUserAttendeeParameters extends IBaseAPIParameters {
  event: number;
}

export const getEventUserAttendees = async (props: IUserAttendeeParameters) => {
  const user = await getUser();
  const data = await getAllPages<IUserAttendee>(USER_ATTENDEES_API_URL, { format: 'json', ...props }, { user });
  return data;
};

export const getAllRelations = async () => {
  const user = await getUser();
  const data = await getAllPages<IPaymentRelation>(API_URL, { format: 'json' }, { user });
  return data;
};

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
export const postRelation = async (relation: ICreatePaymentRelation) => {
  const user = await getUser();
  const data = await post<IPaymentRelation>(API_URL, relation, { format: 'json' }, { user });
  return data;
};

export interface ICreateRelationReturn extends IGenericReturn {
  relation?: IPaymentRelation;
}

export const createRelation = async (
  paymentId: number,
  priceId: number,
  // tslint:disable-next-line no-any
  paymentMethod: any
): Promise<ICreateRelationReturn> => {
  const relation = await postRelation({
    payment_price: priceId,
    payment: paymentId,
    payment_method_id: paymentMethod.id,
  });

  if (relation.status === 'done') {
    return {
      status: 'success',
      message: 'Betalingen var vellykket.',
    };
  } else if (relation.status === 'pending') {
    return {
      status: 'pending',
      message: 'Betalingen trenger videre behandling...',
      relation,
    };
  } else {
    return {
      status: 'error',
      message: 'Kunne ikke lagre betalingen!',
    };
  }
};

export const verifyPending = async (relationId: number, relation: IUpdatePaymentRelation) => {
  const user = await getUser();
  const data = await patch<IPaymentRelation, IUpdatePaymentRelation>({
    query: `${API_URL}${relationId}/`,
    data: relation,
    parameters: { format: 'json' },
    options: { user },
  });
  return data;
};

export interface IHandleCardVerificationReturn extends IGenericReturn {
  relation?: IPaymentRelation;
}

export const handleCardVerification = async (
  stripe: ReactStripeElements.StripeProps,
  relation: IPaymentRelation
): Promise<IHandleCardVerificationReturn> => {
  // @ts-ignore Stripe types are not up to spec.
  const { paymentIntent, error } = await stripe.handleCardAction(relation.payment_intent_secret);

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
      relation: verifiedRelation,
    };
  }

  return {
    status: 'error',
    message: 'Kunne ikke verifisere betalingen...',
  };
};
