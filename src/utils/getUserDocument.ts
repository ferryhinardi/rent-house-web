import { UserDocument } from 'types';

export const getDocumentFile = (
  documentType: number,
  documents?: UserDocument[]
): { name: string; isVerified: boolean } | undefined => {
  const document = (documents || []).find(({ document_type }) => document_type === documentType);
  return document?.document_path
    ? {
        name: getDocumentNameByPath(document.document_path),
        isVerified: document.is_verified,
      }
    : undefined;
};

function getDocumentNameByPath(path: string): string {
  const paths = path.split('/');
  return paths[paths.length - 1];
}
