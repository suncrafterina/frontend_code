export interface User {
  userID: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  userEmail: string;
  userPhone: string;
  fax: string;
  userMarkup: string;
  permissions: Array<string>;
  active: boolean;
  company: string;
  address1: string;
  address2: string;
  city: string;
  stateOrProvince: string;
  zipOrPostal: string;
  country: string;
  tymeZone: string;
  salesRep: string;
}

export interface UserAvatar {
  name: string;
  imageUrl: string;
  initialColor: string;
  initial: string;
}

export interface Broker {
  brokerCompanyName: string;
  taxIdBroker: string;
  brokerContactName: string;
  brokerEmail: string;
  brokerPhoneNumber: string;
}

export interface InvoiceTax {
  invoiceTaxCurrency: string;
  generateInvoicesPer: string;
  chargeLevel: string;
  taxId: string;
  invoiceEmail: Array<any>;
  refCodeMandatoryFlag: boolean;
  inBondCustomerFlag: boolean;
  applyTaxFlag: boolean;
}

export interface Shipment {
  defaultPackageType: string;
  defaultPickupLocation: string;
  insuranceType: string;
  signatureRequired: Array<string>;
  addResidentialByDefaultFlag: boolean;
  batchShippingFlag: boolean;
}
export interface Reference {
  reference1: string;
  reference2: string;
  reference3: string;
}

export interface Print {
  autoSizeFlag: boolean;
  shippingLabelSize: string;
}
