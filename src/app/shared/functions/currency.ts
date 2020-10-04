import { formatCurrency } from '@angular/common';

export function currency(value) {
  return formatCurrency(value, 'en_US', '$', '1.2-2');
}
