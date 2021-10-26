import { UserDocument } from 'types';

export const getDocumentFile = (documentType: number, documents?: UserDocument[]): string | undefined => {
  const document = (documents || []).find(({ document_type }) => document_type === documentType);
  return document?.document_path ? getDocumentNameByPath(document.document_path) : undefined;
};

function getDocumentNameByPath(path: string): string {
  const paths = path.split('/');
  return paths[paths.length - 1];
}
