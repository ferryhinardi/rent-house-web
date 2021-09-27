import { PayloadUpdateUser } from 'types';

export default function createPayloadUpdateUser(payload: PayloadUpdateUser) {
  const bodyFormDataUser = new FormData();
  bodyFormDataUser.set('name', payload.name);
  bodyFormDataUser.set('address', payload.address);
  bodyFormDataUser.set('bio', payload.bio);
  bodyFormDataUser.set('job', payload.job);
  bodyFormDataUser.set('annual_income', payload.annual_income?.toString());
  bodyFormDataUser.set('credit_score', payload.credit_score?.toString());
  bodyFormDataUser.set('gender', payload.gender.value?.toString());
  bodyFormDataUser.set('dob', payload.dob);
  bodyFormDataUser.set('phone', payload.phone);

  if (payload.profile_picture?.length > 0) {
    bodyFormDataUser.set('profile_picture', payload.profile_picture[0]);
  }

  const bodyFormDataDoc = new FormData();
  bodyFormDataDoc.set('document_type', '0');
  if (payload.government_id?.length > 0) {
    bodyFormDataDoc.set('document_files', payload.government_id[0]);
  }

  return { bodyFormDataUser, bodyFormDataDoc };
}
