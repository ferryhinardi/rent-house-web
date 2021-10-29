import { EmergencyContactType } from 'types';

export default function createDefaultEmergencyContact(emergencyData: EmergencyContactType[]): EmergencyContactType[] {
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
