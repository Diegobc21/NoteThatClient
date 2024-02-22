export enum NavbarAction {
  LOGOUT
}

export interface Option {
  title: string,
  iconName?: string,
  routerLink?: string,
  action?: NavbarAction,
  hoverColor?: string,
  hoverText?: string,
  hasSpan?: string
}

export const NavbarConfig: {optionButtons: Option[]} = {
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
      action: NavbarAction.LOGOUT,
      hoverColor: 'red-700',
      hoverText: 'white'
    },
  ] as Option[]
}
