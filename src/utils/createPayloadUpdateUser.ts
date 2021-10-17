import { PayloadUpdateUser } from 'types';

export default function createPayloadUpdateUser(payload: PayloadUpdateUser) {
  const proofOfIncomeType = payload.proof_of_income_type.value;
  let bodyFormProofIncomeGuarantorGovIdDataDoc,
    bodyFormProofIncomeGuarantorCreditReportDataDoc,
    bodyFormProofIncomeGuarantorPaystubDataDoc,
    bodyFormProofIncomePaystubDataDoc,
    bodyFormGovermentDataDoc,
    bodyFormCreditScoreDataDoc;
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

  if (payload.government_id?.length > 0) {
    bodyFormGovermentDataDoc = new FormData();
    bodyFormGovermentDataDoc.set('document_type', '0');
    bodyFormGovermentDataDoc.set('document_files', payload.government_id[0]);
  }

  if (payload.credit_report?.length > 0) {
    bodyFormCreditScoreDataDoc = new FormData();
    bodyFormCreditScoreDataDoc.set('document_type', '1');
    bodyFormCreditScoreDataDoc.set('document_files', payload.credit_report[0]);
  }

  if (Number(proofOfIncomeType) === 0) {
    // paystubs document
    if (payload?.paystubs?.length) {
      bodyFormProofIncomePaystubDataDoc = new FormData();
      bodyFormProofIncomePaystubDataDoc.set('document_type', '6');
      bodyFormProofIncomePaystubDataDoc.set('document_files', payload?.paystubs?.[0]);
    }
  } else if (Number(proofOfIncomeType) === 1) {
    // guarantor_government_id + guarantor_credit_report + guarantor_paystubs document
    if (payload?.guarantor_government_id?.length) {
      bodyFormProofIncomeGuarantorGovIdDataDoc = new FormData();
      bodyFormProofIncomeGuarantorGovIdDataDoc.set('document_type', '3');
      bodyFormProofIncomeGuarantorGovIdDataDoc.set('document_files', payload?.guarantor_government_id?.[0]);
    }
    if (payload?.guarantor_credit_report?.length) {
      bodyFormProofIncomeGuarantorCreditReportDataDoc = new FormData();
      bodyFormProofIncomeGuarantorCreditReportDataDoc.set('document_type', '4');
      bodyFormProofIncomeGuarantorCreditReportDataDoc.set('document_files', payload?.guarantor_credit_report?.[0]);
    }
    if (payload?.guarantor_paystubs?.length) {
      bodyFormProofIncomeGuarantorPaystubDataDoc = new FormData();
      bodyFormProofIncomeGuarantorPaystubDataDoc.set('document_type', '5');
      bodyFormProofIncomeGuarantorPaystubDataDoc.set('document_files', payload?.guarantor_paystubs?.[0]);
    }
  }

  return {
    bodyFormDataUser,
    bodyFormGovermentDataDoc,
    bodyFormCreditScoreDataDoc,
    bodyFormProofIncomeGuarantorGovIdDataDoc,
    bodyFormProofIncomeGuarantorCreditReportDataDoc,
    bodyFormProofIncomeGuarantorPaystubDataDoc,
    bodyFormProofIncomePaystubDataDoc,
  };
}
