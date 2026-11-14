import { createContext, useCallback, useContext, useMemo, useState } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [state, setState] = useState({ open: false, prefill: {} });

  const openBooking = useCallback((prefill = {}) => setState({ open: true, prefill }), []);
  const closeBooking = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ ...state, openBooking, closeBooking }), [state, openBooking, closeBooking]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => useContext(BookingContext);
