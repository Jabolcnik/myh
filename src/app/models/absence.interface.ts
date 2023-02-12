export interface AbsenceDefinition {
  userId: string;
  timestamp: string;
  absenceDefinitionId: string;
  origin?: number;
  comment?: string;
  partialTimeFrom: string;
  partialTimeTo?: string;
  partialTimeDuration?: number;
  isPartial?: boolean;
  overrideHolidayAbsence?: boolean;
}