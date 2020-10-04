export interface BatchData {
  link: string;
  numberBox: object;
  blocks: Array<string>;
  status: {
    name: string;
    color: string;
  };
  selected: boolean;
}

export interface ChipColor {
  name: string;
  color: string;
}
export interface Chip {
  value: string;
  selected: boolean;
}

export interface ConfirmedData {
  number: string;
  text: string;
}

export interface DataItem {
  label: string;
  value: string;
  strong: boolean;
  currency: boolean;
  infoFlag: string;
  info: any;
  infoTooltip: string;
}

export interface InfoBlock {
  label: string;
  title: string;
  description: string;
  secondDescription: string;
}

export interface InfoList {
  active: boolean;
  right: boolean;
  label: string;
  value: string;
  divider: boolean;
  moreData: [
    {
      label: string;
      value: string;
    }
  ];
}

export interface History {
  value: string;
  category: string;
}

export interface NumberBox {
  short: boolean;
  label: string;
  name: string;
  subName: string;
  number: string;
  logo: string;
  chip: {
    name: string; // SP / eCom / Quick
    type: string; // light-blue / purple / orange
  };
}

export interface ShipData {
  new: boolean;
  marker: string;
  link: string;
  numberBox: {
    short: boolean;
    label: string;
    name: string;
    subName: string;
    number: string;
    logo: string;
    chip: {
      name: string; // SP / eCom / Quick
      type: string; // light-blue / purple / orange
    };
  };
  from: {
    companyName: string;
    companyAddress: string;
    date: string;
  };
  to: {
    companyName: string;
    companyAddress: string;
    date: string;
  };
  blocks: object;
  status: {
    name: string;
    color: string;
  };
  saved: boolean;
  quoteItem: boolean;
  selected: boolean;
}

export interface Rate {
  image: string;
  title: string;
  description: string;
  date: string;
  value: string;
  details: object;
  selected: boolean;
}

export interface MainNavigation {
  id: string;
  name: string;
  icon: string;
  path: string;
  inner: [
    {
      id: string;
      name: string;
      path: string;
    }
  ];
}

export interface Notification {
  link: string;
  new: boolean;
  title: string;
  description: string;
  date: string;
  snooze: boolean;
  szoonedata: string;
}

export interface Service {
  name: string;
}
