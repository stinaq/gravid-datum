import { abdominalDiameter } from './abdominalDiameter';
import { bpd } from './bpd';
import { crl } from './crl';
import { femurLength } from './femurLength';
import { fetalWeight } from './fetalWeight';
import { symphysisFundus } from './symphysisFundus';
import type { ReferenceTable } from './types';

// Display order.
export const referenceTables: ReferenceTable[] = [
  symphysisFundus,
  crl,
  bpd,
  fetalWeight,
  abdominalDiameter,
  femurLength,
];
