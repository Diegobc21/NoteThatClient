import {OptionType} from "./option-type.enum";

export let optionList: any[] = [
  {
    route: '/option/note',
    type: OptionType.Note,
    description: 'Escribe tus ideas'
  },
  {
    route: '/option/friends',
    type: OptionType.Friends,
    description: 'Encuentra a tus amigos'
  },
  {
    route: '/option/spotify',
    type: OptionType.Spotify,
    description: 'Comparte tu música'
  },
  {
    route: '/option/calendar',
    type: OptionType.Calendar,
    description: 'Organiza tus tareas'
  }
];
