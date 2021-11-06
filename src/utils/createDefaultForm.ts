import { EmergencyContactType, UserDocument } from 'types';
import { getDocumentFile, DocumentMap } from 'utils/getUserDocument';

export function createDefaultEmergencyContact(emergencyData: EmergencyContactType[]): EmergencyContactType[] {
  if (emergencyData.length === 0) {
    return [
      {
        name: '',
        email: '',
        phone: '',
        relationship: '',
      },
    ];
  }

  return emergencyData;
}

export function createDefaultDocument(documents: UserDocument[]) {
  return documents.reduce<{ [key: string]: string | undefined }>((returnValues, doc) => {
    const key = DocumentMap[doc.document_type];
    const document = getDocumentFile(doc.document_type, documents);
    returnValues[key] = document?.name;
    return returnValues;
  }, {});
}
