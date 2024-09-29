import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  BellRing,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleUserRound,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Lightbulb,
  LightbulbOff,
  Loader2,
  Lock,
  LogOut,
  LucideAngularModule,
  Mail,
  Menu,
  MoreVertical,
  Pencil,
  Plus,
  Quote,
  Settings,
  Trash,
  User,
  X
} from "lucide-angular";
import {LucideIconData} from "lucide-angular/icons/types";

const allIconList: { [key: string]: LucideIconData } = {
  'bell-ring': BellRing,
  'check': Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'circle-user-round': CircleUserRound,
  'copy': Copy,
  'eye': Eye,
  'eye-off': EyeOff,
  'key-round': KeyRound,
  'lightbulb': Lightbulb,
  'lightbulb-off': LightbulbOff,
  'loader-2': Loader2,
  'lock': Lock,
  'log-out': LogOut,
  'mail': Mail,
  'menu': Menu,
  'more-vertical': MoreVertical,
  'pencil': Pencil,
  'plus': Plus,
  'quote': Quote,
  'settings': Settings,
  'trash': Trash,
  'user': User,
  'x': X,
}

@Component({
  selector: 'app-lucide-icon',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './lucide-icon.component.html',
  styleUrl: './lucide-icon.component.scss'
})
export class LucideIconComponent implements OnInit {
  @Input() public name: string | LucideIconData | undefined;
  @Input() public size: string | number | undefined;

  private _icon: LucideIconData | undefined;

  public ngOnInit(): void {
    if (typeof this.name === 'string') {
      this._icon = this.name !== '' ? allIconList[this.name] : undefined;
    } else {
      this._icon = this.name;
    }
  }

  public get icon(): LucideIconData | undefined {
    return this._icon;
  }
}
