export default function getCourseDuration(durationInMinutes: number): string {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const hoursText = hours === 1 ? 'hour' : 'hours';

  return `${formattedHours}:${formattedMinutes} ${hoursText}`;
}
