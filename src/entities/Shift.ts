export interface Shift {
  shiftId: number;
  dateOfShift: string;
  substitutedId: number;
  startTime?: string | null; //HH:mm:ss
  endTime?: string | null; //HH:mm:ss
  routeId: number;
  totalHours?: number | null; //decimal
}
