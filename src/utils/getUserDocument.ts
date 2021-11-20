import { UserDocument } from 'types';
import { DOCUMENT_STATUS } from '../core/constants';

export const getDocumentFile = (
  documentType: number,
  documents?: UserDocument[]
): { name: string; isVerified: boolean } | undefined => {
  const document = (documents || []).find(({ document_type }) => document_type === documentType);
  return document?.document_path
    ? {
        name: getDocumentNameByPath(document.document_path),
        isVerified: document.document_status === DOCUMENT_STATUS.APPROVED,
      }
    : undefined;
};

export const DocumentMap: { [key: number]: string } = {
  0: 'guarantor_government_id',
  1: 'guarantor_credit_report',
  2: 'guarantor_paystubs',
  3: 'government_id',
  4: 'credit_report',
  5: 'paystubs',
};

function getDocumentNameByPath(path: string): string {
  const paths = path.split('/');
  return paths[paths.length - 1];
}
