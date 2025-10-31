// app/booking/page.tsx
import BookingClient from "./BookingClient";

// Keep this a simple server component wrapper with a single default export.
// Naming it `Page` avoids any accidental duplicate `BookingPage` symbol.
export default function Page() {
  return <BookingClient />;
}
