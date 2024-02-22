export enum UserAction {
  LOGOUT
}

export interface UserOption {
  title: string,
  iconName?: string,
  routerLink?: string,
  action?: UserAction,
  hoverColor?: string,
  hoverText?: string,
  hasSpan?: string
}

export const NavbarConfig: {optionButtons: UserOption[]} = {
  optionButtons: [
    {
      title: 'Perfil',
      routerLink: '/user/profile',
      iconName: 'user'
    },
    // {
    //   title: 'Notificaciones',
    //   routerLink: '/user/notifications',
    //   iconName: 'bell-ring',
    //   hasSpan: 'animate-ping'
    // },
    {
      title: 'Ajustes',
      routerLink: '/user/settings',
      iconName: 'settings'
    },
    {
      title: 'Cerrar sesión',
      iconName: 'log-out',
      action: UserAction.LOGOUT,
      hoverColor: 'red-700',
      hoverText: 'white'
    },
  ] as UserOption[]
}
