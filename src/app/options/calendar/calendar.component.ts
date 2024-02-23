import {Component, OnInit} from '@angular/core';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns';
import {es} from 'date-fns/locale';
import {months_ES} from "../../utils/months_ES";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  currentMonth: string = months_ES[new Date().getUTCMonth()];
  currentDate: Date = new Date();
  daysInMonth: Date[] = [];
  referenceDate: Date = new Date();
  endOfMonth: Date = new Date();

  ngOnInit() {
    this.referenceDate = new Date(); // Inicializar con la fecha actual
    this.updateCalendar(this.referenceDate);
  }

  updateCalendar(date: Date) {
    this.currentMonth = format(date, 'MMMM yyyy', {locale: es});
    const firstDay = startOfWeek(startOfMonth(date), {weekStartsOn: 1});
    const lastDay = endOfWeek(endOfMonth(date), {weekStartsOn: 1});


    this.endOfMonth = endOfMonth(date);

    this.daysInMonth = [];

    for (let day: Date = firstDay; day <= lastDay; day = addDays(day, 1)) {
      this.daysInMonth.push(day);
    }
  }

  getTodayText(): string {
    if (this.currentDate) {
      const dayOfWeek = format(this.currentDate, 'cccc', {locale: es});
      const day = format(this.currentDate, 'd');
      const month = format(this.currentDate, 'MMMM', {locale: es});
      const year = format(this.currentDate, 'yyyy');
      return `Hoy es ${dayOfWeek}, ${day} de ${month} de ${year}`;
    }
    return '';
  }

  previousMonth() {
    this.referenceDate = subMonths(this.referenceDate, 1);
    this.updateCalendar(this.referenceDate);
  }

  nextMonth() {
    this.referenceDate = addMonths(this.referenceDate, 1);
    this.updateCalendar(this.referenceDate);
  }

  getCalendarClasses(day: Date): object {
    return {
      'bg-slate-100 dark:bg-slate-800 text-gray-800 dark:text-gray-100': this.isSameMonth(day) && !this.isToday(day),
      'dark:text-slate-400 dark:hover:text-gray-100': !this.isSameMonth(day),
      'font-bold': this.isSameMonth(day),
      'bg-cyan-200 text-gray-900': this.isToday(day)
    }
  }

  isSameMonth(day: Date): boolean {
    return isSameMonth(day, this.endOfMonth);
  }

  isToday(day: Date): boolean {
    return isToday(day);
  }

  selectDay(day: Date) {
    console.log(day)
  }
}
