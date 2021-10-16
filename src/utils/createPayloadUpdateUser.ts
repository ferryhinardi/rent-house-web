import { PayloadUpdateUser } from 'types';

export default function createPayloadUpdateUser(payload: PayloadUpdateUser) {
  const proofOfIncomeType = payload.proof_of_income_type.value;
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
  bodyFormDataUser.set('social_media_url', payload.social_media_url);
  bodyFormDataUser.set('proof_of_income_type', proofOfIncomeType?.toString());

  if (payload.profile_picture?.length > 0) {
    bodyFormDataUser.set('profile_picture', payload.profile_picture[0]);
  }

  const bodyFormGovermentDataDoc = new FormData();
  if (payload.government_id?.length > 0) {
    bodyFormGovermentDataDoc.set('document_type', '0');
    bodyFormGovermentDataDoc.set('document_files', payload.government_id[0]);
  }

  const bodyFormCreditScoreDataDoc = new FormData();
  if (payload.credit_report?.length > 0) {
    bodyFormCreditScoreDataDoc.set('document_type', '1');
    bodyFormCreditScoreDataDoc.set('document_files', payload.credit_report[0]);
  }

  let bodyFormProofIncomeGuarantorDataDoc, bodyFormProofIncomeGuarantorCreditReportDataDoc;
  if (Number(proofOfIncomeType) === 0) {
    // guarantor_paystubs document
    if (payload?.guarantor_paystubs?.length) {
      bodyFormProofIncomeGuarantorDataDoc = new FormData();
      bodyFormProofIncomeGuarantorDataDoc.set('document_type', '5');
      bodyFormProofIncomeGuarantorDataDoc.set('document_files', payload?.guarantor_paystubs?.[0]);
    }
  } else if (Number(proofOfIncomeType) === 1) {
    // guarantor_government_id + guarantor_credit_report document
    if (payload?.guarantor_government_id?.length) {
      bodyFormProofIncomeGuarantorDataDoc = new FormData();
      bodyFormProofIncomeGuarantorDataDoc.set('document_type', '3');
      bodyFormProofIncomeGuarantorDataDoc.set('document_files', payload?.guarantor_government_id?.[0]);
    }
    if (payload?.guarantor_credit_report?.length) {
      bodyFormProofIncomeGuarantorCreditReportDataDoc = new FormData();
      bodyFormProofIncomeGuarantorCreditReportDataDoc.set('document_type', '4');
      bodyFormProofIncomeGuarantorCreditReportDataDoc.set('document_files', payload?.guarantor_credit_report?.[0]);
    }
  }

  return {
    bodyFormDataUser,
    bodyFormGovermentDataDoc,
    bodyFormCreditScoreDataDoc,
    bodyFormProofIncomeGuarantorDataDoc,
    bodyFormProofIncomeGuarantorCreditReportDataDoc,
  };
}
