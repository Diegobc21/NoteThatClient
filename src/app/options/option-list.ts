import {OptionType} from "./optionType.enum";

export const OPTION_LIST: any[] = [
  {
    label: OptionType.Home,
    route: '/home',
    type: OptionType.Home
  },
  {
    label: OptionType.Note,
    route: '/option/note',
    type: OptionType.Note
  },
  {
    label: OptionType.Friends,
    route: '/option/friends',
    type: OptionType.Friends
  }
];
