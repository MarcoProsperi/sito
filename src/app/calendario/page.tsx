import { getAllMatches } from '@/lib/content';
import GlobalCalendar from './GlobalCalendar';

export default function CalendarPage() {
    const allMatches = getAllMatches();

    return <GlobalCalendar initialMatches={allMatches} />;
}
