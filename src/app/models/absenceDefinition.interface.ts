export interface AbsenceDefinition {
  Id: number;
  Name: string;
  integrationId: number;
  code: number;
  type: number;
  isAvailableForAdminsOnly: boolean; 
  categoryDefinitionId: string;
  categoryDefinitionName: string;
  fraction: number;
  iconId: string;
}